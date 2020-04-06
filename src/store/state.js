import {playMode} from 'common/js/config'
const state = {
  singer: {},
  fullScreen: false,  //全屏
  playing: false,  //播放
  playList: [],
  sequenceList: [],  //这个就是随机播放，顺序播放等列表
  playMode: playMode.sequence,
  currentIndex: -1,  //当前播放的索引
  disc:{},
  topList:{},   //排行榜详情数据
}

export default state
