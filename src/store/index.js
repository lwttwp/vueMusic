import Vue from 'vue'
import VueX from 'vuex'
import createLogger from 'vuex/dist/logger'
import {playMode} from '../common/js/config'

Vue.use(VueX)

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
}
const mutations = {
  setSinger (state, singer) {
    state.singer = singer
  },
  setPlaying (state, flag) {
    state.playing = flag
  },
  setFullScreen (state, flag) {
    state.fullScreen = flag
  },
  setPlayList (state, list) {
    state.playList = list
  },
  setSequenceList (state, list) {
    state.sequenceList = list
  },
  setMode (state, mode) {
    state.mode = mode
  },
  setCurrentIndex (state, index) {
    state.currentIndex = index
  }
}

const getters = {
  singer () {
    return state.singer
  },
  playing () {
    return state.playing
  },
  fullScreen () {
    return state.fullScreen
  },
  playList () {
    return state.playList
  },
  sequenceList () {
    return state.sequenceList
  },
  mode () {
    return state.mode
  },
  currentIndex () {
    return state.currentIndex
  },
  currentSong () {
    return state.playList[state.currentIndex] || {}
  }
}
const actions = {
  selectPlay ({commit, state}, {list, playIndex}) {
    commit('setSequenceList', list)
    commit('setPlayList', list)
    commit('setCurrentIndex', playIndex)
    commit('setFullScreen', true)
    commit('setPlaying', true)
  }
}
const debug = process.env.NODE_ENV !== 'production' // 开启线下模式的调试模式
export default new VueX.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
