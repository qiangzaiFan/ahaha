<!-- 排行页组件 -->

<template>
  <div class="rank" ref="rank">
    <!-- 排行榜数据 -->
    <scroll class="toplist" ref="toplist" :data="toplist">
      <ul>
        <li class="item" v-for="(item,index) in toplist" :key="index" @click="selectItem(item)">
          <!-- 左图 -->
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl">
          </div>

          <!-- 右歌 -->
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.songList" :key="index">
              <span>{{ index + 1 }}</span>
              <span>{{ song.songname }}</span>
              <span class="singername"> - {{ song.singername }}</span>
            </li>
          </ul>
        </li>
      </ul>

      <!-- loading 组件 -->
      <div v-show="!toplist.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>

    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ERR_OK} from 'api/config'
  import {getTopList} from 'api/rank'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {playlistMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'
  export default {
    mixins:[playlistMixin],
    data () {
      return {
        toplist: []
      }
    },
    props: {},
    watch: {},
    filters: {},
    mounted () {},
    computed: {},
    created () {
      this._getTopList()
    },
    methods: {
      handlePlayList(playList){
        const bottom = playList.length > 0 ? '60px' : '0'
        this.$refs.rank.style.bottom = bottom
        this.$refs.toplist.refresh()
      },
      selectItem(item){
        this.$router.push({
          path:`/rank/${item.id}`
        })
        this.setTopList(item)
      },
      _getTopList(){
        getTopList().then((res)=> {
          if(res.code === ERR_OK){
            this.toplist = res.data.topList
          }
        })
      },
      ...mapMutations({  //它是一个对象
        setTopList: 'SET_TOPLIST'
      })
    },
    destroyed () {},
    components: {
      Scroll,
      Loading
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .rank {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .toplist {
      height: 100%;
      overflow: hidden;
      .item {
        display: flex;
        margin: 0 20px;
        padding-top: 20px;
        height: 100px;
        &:last-child {
          padding-bottom: 20px;
        }
        .icon {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
        }
        .songlist {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          height: 100px;
          overflow: hidden;
          background: $color-highlight-background;
          color: $color-text-d;
          font-size: $font-size-small;
          .song {
            no-wrap()
            line-height: 26px;
            .singername {
              color: rgba(255, 255, 255, 0.2);
            }
          }
        }
      }
      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
