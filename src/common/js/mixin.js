import {mapGetters} from 'vuex'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  // activated这个钩子是用来监测keep-alive完成后触发的
  activated() {
    this.handlePlayList(this.playList)
  },
  watch: {
    playList(newWal) {
      this.handlePlayList(newWal)
    }
  },
  methods: {
    // 这个就是上面的钩子完成后必须要走这个方法，一旦组件内引用了这个mixin，那么组件内就必须实现这个方法
    handlePlayList() {
      throw new Error ('compontent must implement handlePlayList method')
    }
  }
}
