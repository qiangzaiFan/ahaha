<!--推荐详情组件-->
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

  export default {
    name: 'singer-detail',
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
        return this.disc.dissname
      },
      bgImage(){
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    created(){
      this._getSongList()
    },
    methods: {
      _getSongList(){
        // getSongList(this.disc.dissid).then((res) => {
        //   if(res.code === 0){
        //     debugger
        //     console.log(res.data.list)
        //   }
        //
        // })
      }
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
