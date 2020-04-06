import * as types from './mutation-types'
const mutations = {
  [types.SET_SINGER](state,singer){
    state.singer = singer
  },
  [types.SET_FULLSCREEN](state,fullScreen){
    state.fullScreen = fullScreen
  },
  [types.SET_PLAYING](state,playing){
    state.playing = playing
  },
  [types.SET_PLAYLIST](state,playList){
    state.playList = playList
  },
  [types.SET_SEQUENCE_LIST](state,sequenceList){
    state.sequenceList = sequenceList
  },
  [types.SET_PLAY_MODE](state,playMode){
    state.playMode = playMode
  },
  [types.SET_CURRENT_INDEX](state,currentIndex){
    state.currentIndex = currentIndex
  },
  [types.SET_DISC](state,disc){
    state.disc = disc
  },
  [types.SET_TOPLIST](state,topList){
    state.topList = topList
  }
}
export default mutations
