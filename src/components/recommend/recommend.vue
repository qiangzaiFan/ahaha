<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-item">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,index) in discList" @click="selectItem(item)" :key="index" class="recommend-list-li">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60" alt="">
              </div>
              <div class="text">
                <span class="name">{{item.creator.name}}</span>
                <span class="dissname">{{item.dissname}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
          <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {playlistMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'

  export default {
    mixins:[playlistMixin],
    data() {
      return {
        recommends: [],
        discList: [ ]
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      selectItem(item){
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      handlePlayList(playList){
        const bottom = this.playList.length > 0 ? '60px' : '0'
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
           this.discList = res.data.list;
          }
        })
      },
      loadImage(){
        //设个标志位让逻辑执行一次，因为轮播图有很多，我们只需要知道一张改变，就行了。
        if(!this.checkLoaded){
          this.$refs.scroll.refresh();
          this.checkLoaded = true;
        }
      },
      ...mapMutations({
        'setDisc': 'SET_DISC'
      })
    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0

    .recommend-content
      height: 100%
      overflow: hidden

      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden

      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme

      .recommend-list-li
        display: flex
        align-items:center
        padding: 0px 20px 20px 20px;
        .icon
          flex: 0 0 60px
          margin-right 15px
        .text
          display: flex
          flex-direction: column
          justify-content: cente
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color:$color-text

      .list-item
        text-align: center
        margin:20px 0

      .loading-container
        position: absolute
        top: 50%
        transform : translateY(-50%)
        left: 50%;
        transform: translateX(-50%);


</style>
