<template>
    <div class="player" v-show="playList.length > 0">
      <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image" />
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back glyphicon glyphicon-chevron-down"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="cd-wrapper">
            <div class="cd" :class="cdClass">
              <img class="image img-response img-circle" :src="currentSong.image"/>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{formatTime(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent"></progress-bar>
            </div>
            <span class="time time-r">{{formatTime(currentSong.duration)}}</span>
          </div>
          <div class="operates">
              <div class="icon i-left">
                <i class="btn glyphicon glyphicon-random"></i>
              </div>
              <div class="icon i-left">
                <i class="glyphicon glyphicon-backward"  @click="prev"></i>
              </div>
              <div class="icon i-center">
                <i :class="playIcon" @click="isPlay" ></i> <!--pause: glyphicon glyphicon-pause-->
              </div>
              <div class="icon i-right" >
              <i class="icon-next glyphicon glyphicon-forward" @click="next"></i>
            </div>
              <div class="icon i-right">
              <i class="glyphicon glyphicon-heart" ></i>  <!--not love: glyphicon glyphicon-heart-empty -->
            </div>
          </div>
        </div>
      </div>
      </transition>
      <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="mini-icon">
          <img class="img-response img-circle" :src="currentSong.image" width="40" height="40">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i :class="playIcon" @click.stop="isPlay" ></i> <!--.stop:阻止父元素的冒泡时间 ，否则就会打开父元素normalplayer-->
        </div>
        <div class="control">
          <i class="icon-playList glyphicon glyphicon-list"></i>
        </div>
      </div>
      </transition>
      <audio ref="audio" :src="currentSong.url" @error="error" @timeupdate="updateTime"></audio> <!--timeUpdate：播放位置发生改变时触发，currentTime：当前播放位置，通过audio的currentTime属性来触发timeUpdate，获取当前播放位置-->
    </div>
</template>

<script>
import store from '../../store/index'
import ProgressBar from '../progress-bar/progress-bar'

export default {
  name: 'player',
  data () {
    return {
      error_code: '',
      currentTime: 0
    }
  },
  methods: {
    back () {
      store.commit('setFullScreen', false)
    },
    open () {
      store.commit('setFullScreen', true)
    },
    isPlay () {
      store.commit('setPlaying', !this.playing)
    },
    prev () {
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playList.length - 1
      }
      store.commit('setCurrentIndex', index)
      if (!this.playing) {
        this.isPlay()
      }
    },
    next  () {
      let index = this.currentIndex + 1
      if (index === this.currentIndex.length) {
        index = 0
      }
      store.commit('setCurrentIndex', index)
      if (!this.playing) {
        this.isPlay()
      }
    },
    error () {
      /*
      * error_code :
      * 1.取回过程被用户中止
      * 2.当下载时发生错误
      * 3.当解码时发生错误
      * 4.url错误，获取不到vkey
      * */
      this.error_code = this.$refs.audio.error.code
      console.log(this.error_code)
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    formatTime (interval) {
      interval = Math.floor(interval)
      const minute = Math.floor(interval / 60)
      const tmp = interval % 60
      var second = tmp.toString()
      if (second.length < 2) {
        second = '0' + second
      }
      return `${minute}:${second}`
    }
  },
  computed: {
    fullScreen () {
      return store.getters.fullScreen
    },
    playList () {
      return store.getters.playList
    },
    currentSong () {
      return store.getters.currentSong
    },
    playing () {
      return store.getters.playing
    },
    playIcon () {
      return this.playing ? 'glyphicon glyphicon-pause' : 'glyphicon glyphicon-play'
    },
    cdClass () {
      return this.playing ? 'play' : 'play pause'
    },
    currentIndex () {
      return store.getters.currentIndex
    },
    percent () {
      return this.currentTime / this.currentSong.duration
    }
  },
  watch: {
    currentSong () {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing (newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  components: {
    ProgressBar
  }
}
</script>

<style scoped>
.normal-player{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: #f4f4f4;
}
  .mini-player{
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: #43CD80;
  }
  .background{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
  }
  .top{
    position: relative;
    margin-bottom: 25px;
  }
  .back{
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
  }
  .icon-back{
    display: block;
    padding: 9px;
    font-size: 20px;
    color: #43CD80;
  }
  .title{
    width: 70%;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 20px;
    color: #43CD80;
  }
  .subtitle{
    line-height: 20px;
    text-align: center;
    font-size: 16px;
    color: #43CD80;
  }
  .image{
    display: block;
    margin: 0 auto;
  }
  .bottom{
    position: absolute;
    bottom: 50px;
    width: 100%;
  }
  .operates{
    display: flex;
    align-items: center;
  }
  .icon{
    flex: 1;
    width: 40px;
  }
  i{
    font-size: 30px;
    color: #43CD80;
  }
  .i-left{
    text-align: right;
  }
  .i-center{
    text-align: center;
  }
  .i-right{
    text-align: left;
  }
  .mini-player{
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: #dddddd;
  }
  .mini-icon{
    flex: 0 0 40px;
    width: 40px;
    padding: 0 10px 0 20px;
  }
  .text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    margin-left: 30px;
  }
  .name{
    margin-bottom: 2px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
    font-weight: bold;
  }
  .desc{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
    font-weight: bold;
  }
  .control{
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
    margin-right: 20px;
  }
  .icon-playList{
    font-size: 30px;
  }
  .normal-enter-active, .normal-leave-active{
    transition: all 0.4s;
  }
  .noral-enter, .normal-leave-to{
    opacity: 0;
    transform: translate3d(0,100px,0);
  }
  .mini-enter-active, .mini-leave-active{
    transition: all 0.4s;
  }
  .mini-enter, .mini-leave-to{
    opacity: 0;
    transform: translate3d(0,-100px,0);
  }
  .play{
    animation: rotateAnimation 22s linear infinite;
  }
  .pause{
    animation-play-state: paused
  }
@keyframes rotateAnimation{
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
  .progress-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    padding: 10px;
  }
  .time{
    flex: 0 0 30px;
    line-height: 30px;
    width: 30px;
  }
  .time-l{
    text-align: left;
  }
  .time-r{
    text-align: right;
  }
  .progress-bar-wrapper{
    flex-grow: 1;
    height: 30px;
    padding: 0 5px;
  }
</style>
