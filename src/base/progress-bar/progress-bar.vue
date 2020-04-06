<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>

      <!-- 小球 -->
      <div class="progress-btn-wrapper">
        <div class="progress-btn"
             ref="progressBtn"
             @touchstart.prevent="progressTouchStart"
             @touchmove.prevent="progressTouchMove"
             @touchend.prevent="progressTouchEnd"
        ></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from 'common/js/dom'

  const btnWidth = 16
  const transform = prefixStyle('transform')

  export default {
    name: 'progress-bar',
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created(){
      this.touch = {}
    },
    watch: {
      percent(newPercent) {
        if (newPercent > 0  && ! this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - btnWidth
          const offsetWidth = newPercent * barWidth
          this._offset(offsetWidth)
        }
      }
    },
    methods:{
      progressClick(e){
        const  rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        // 这里点击小球的时候出现进度条回到原点，e.offsetX获取不对
        // this._offset(e.offsetX)
        this._triggerPercent()

      },
      progressTouchStart(e){
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e){
        if(!this.touch.initiated){
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - btnWidth,Math.max(0,this.touch.left + deltaX))
        this._offset(offsetWidth)
      },
      progressTouchEnd(){
        this.touch.initiated = false
        this._triggerPercent()
      },
      _triggerPercent(){
        const barWidth = this.$refs.progressBar.clientWidth - btnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('changePercent',percent)
      },
      _offset(offsetWidth){
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar {
    height: 30px;

    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);

      .progress {
        position: absolute;
        height: 100%;
        background: $color-theme;
      }

      .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;

        .progress-btn {
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid $color-text;
          border-radius: 50%;
          background: $color-theme;
        }
      }
    }
  }
</style>
