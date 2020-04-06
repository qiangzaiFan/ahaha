<template>
  <div class="singer" ref="singer">
    <listview :data="singers" @select="selectSinger" ref="list"></listview>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Listview from 'base/listview/listview'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'


  const HOT_NAME = "热门"
  const HOT_SINGER_LEB = 10
  export default {
    mixins:[playlistMixin],
    data() {
      return {
        singers: [],
      }

    },
    created() {
      this._getSingerList()
    },
    methods: {
      handlePlayList(playList){
        const bottom = this.playList.length > 0 ? '60px' : '0'
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      selectSinger(singer){
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res)=>{
          if(res.code === ERR_OK){
              this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list){
        let map = {
          hot:{
            title:HOT_NAME,
            items:[]
          }
        }
        list.forEach((item,index)=>{
          if(index<HOT_SINGER_LEB){
            map.hot.items.push({
              id: item.Fsinger_mid,
              name:item.Fsinger_name,
              avatar:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
            })
          }
          const key = item.Findex
          if(!map[key]){
            map[key] ={
              title:key,
              items:[]
            }
          }
          map[key].items.push({
            id: item.Fsinger_mid,
            name:item.Fsinger_name,
            avatar:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
          })
        })
       //为了得到有序列表，我们处理 map
        let hot = []
        let ret = []
        for(let key in map) {
          let val = map[key]
          if(val.title.match(/[a-zA-Z]/)){
            ret.push(val)
          }else if(val.title == "热门"){
            hot.push(val)
          }
        }
        ret.sort((a,b)=>{
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components:{
      Listview
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer
      position:fixed
      top:88px
      bottom:0
      width:100%
</style>
