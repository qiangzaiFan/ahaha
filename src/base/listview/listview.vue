<template>
  <scroll class="listview"
          :data="data"
          ref="listview"
          :listenScroll="listenScroll"
          @scroll="scroll"
          :probeType="probeType"
  >
    <ul>
      <li v-for="(group,index) in data" :key="index" class="list-view" ref="listGroup">
        <h2>{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="(item,item_index) in group.items" :key="item_index" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut"  @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(shortItem,index) in shortCutList"
            :key="index"
            :data-index="index"
            :class="{'active': currentIndex === index}"
        >
          {{shortItem}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1>{{fixedTitle}}</h1>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'
  import Loading from 'base/loading/loading'

  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30

  export default {
    name: 'listview',

    props:{
      data:{
        type: Array,
        default: [],
      },

    },
    data() {
      return {
        scrollY: -1,
        currentIndex:0,
        diff:-1  //标题往上有一个顶的动作
      }
    },
    watch:{
      data(){
        setTimeout(()=>{
           this._calculateHeight();
        },20)
      },
      scrollY(newY){
        //newY 往上拉的时候会变成正值,分成2部分来做
        //当滚动到顶部，newY>0
        const listHeight = this.listHeight
        if(newY > 0){
          this.currentIndex = 0
          return
        }
        //在中间部分滚动
        for(let i = 0;i<listHeight.length-1;i++){
          let height1 = listHeight[i]
          let height2 = listHeight[i+1]
          if(-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        //当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length-2
      },
      diff(newWal){
        // console.log(newWal)
        let fixedTop = (newWal > 0 && newWal<TITLE_HEIGHT) ? newWal - TITLE_HEIGHT : 0
        if(this.fixedTop === fixedTop){
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    created(){
      this.touch = {}
      this.listenScroll = true;
      this.listHeight = []
      this.probeType = 3
    },
    computed:{
      shortCutList() {
        return this.data.map((group)=>{
          return group.title.substring(0,1)
        })
      },
      fixedTitle(){
        if(this.scrollY > 0){
          return ""
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ""
      }
    },
    methods:{
      selectItem(item){
        this.$emit("select",item)
      },
      onShortcutTouchStart(e){
        let anchorIndex = getData(e.target,'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
        // this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex],0)
      },
      onShortcutTouchMove(e){
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta    //记录从第一次触碰的位置+delta表示 滚动了几个index
        this._scrollTo(anchorIndex)
      },
      scroll(pos){
        this.scrollY = pos.y   //滚动y的距离
        // currentIndex
      },
      refresh(){
        this.$refs.listview.refresh()
      },
      _scrollTo(index){
        // this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
      },
      _calculateHeight(){  //计算每一个模块的高度，字母所对应左边的总高度
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for(let i = 0;i<list.length;i++){
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }

      }
    },
    components:{
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .listview
      position: relative
      width: 100%
      height: 100%
      overflow: hidden
      background-color :$color-background
      box-sizing: border-box
    .list-view>h2
      background-color: $color-highlight-background
      padding-left: 20px
      color: $color-text-l
      font-size: 14px
      height: 30px
      line-height: 30px
     /*.list-view*/
      /*&:nth-child(1)*/
        /*>h2*/
          /*margin-top:0 !important*/
    .avatar
      width:50px
      height:50px
      border-radius :50%
    .list-group-item
      display: flex;
      align-items: center;
      margin-left: 35px;
      height: 70px;
    .name
      margin-left 15px
      color:$color-text-l
    .list-shortcut
      position: fixed;
      top: 26%;
      right: 5px;
      font-size: $font-size-small
      line-height: 18px;
      z-index: 30;
      color:$color-text-l
    .list-shortcut li
      height:18px

    .active
      color: #ffcd32;

    .list-fixed
      position:absolute
      top:-1px
      background-color: #333;
      padding-left: 20px;
      color: rgba(255,255,255,0.5);
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      width:100%

    .loading-container
      position:absolute
      top: 50%
      transform:translateY(-50%)
      left: 50%
      transform translateX(-50%)
</style>
