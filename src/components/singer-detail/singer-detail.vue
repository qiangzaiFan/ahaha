<template>
  <transition name="slide">
   <!--<div class="singer-detail"></div>-->
    <music-list :songs = "songs" :title = "title" :bgImage = "bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/songs'
  import MusicList from 'components/music-list/music-list'

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
        return this.singer.name
      },
      bgImage(){
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created(){
      this._getDetail()
    },
    methods:{
      _getDetail(){
        // if(!this.singer.id){
        //   this.$router.push('./singer')
        //   return
        // }
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) =>{
          if(res.code === ERR_OK){
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list){
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if(musicData.songid && musicData.songmid){
            ret.push(createSong(musicData))
          }
        })
        return ret
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
