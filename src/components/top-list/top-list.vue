<!--排行详情组件-->
<template>
  <transition name="slide">
    <music-list :songs="songs" :title = "title" :bgImage = "bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {ERR_OK} from 'api/config'
  import MusicList from 'components/music-list/music-list'
  import {getSongList} from 'api/recommend'
  import {getMusicList} from 'api/rank'

  export default {
    name: 'top-list',
    data() {
      return {
        songs:[]
      }
    },
    components:{
      MusicList
    },
    computed: {
      title() {
        return this.topList.topTitle
      },
      bgImage(){
        return this.topList.picUrl
      },
      ...mapGetters([
        'topList'
      ])
    },
    created(){
      // this._getMusicList()
    },
    methods: {
      // _getMusicList(){
      //   getMusicList(this.topList.id).then((res) => {
      //     if(res.code === ERR_OK){
      //       console.log(res)
      //     }
      //
      //   })
      // }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d( 100%, 0, 0)

</style>
