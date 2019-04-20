<template>
    <div class="music-list">
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container header" >
          <h3 class="glyphicon glyphicon-chevron-left back" @click="back" ></h3><h3 v-html="title" class="title"></h3>
        </div>
      </nav>
      <song-list :songs="songs" @selectSong="selectItem"></song-list>
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </div>
</template>

<script>
import SongList from '../../base/song-list/song-list'
import Loading from '../../base/loading/loading'
import store from '../../store'

export default {
  name: 'music-list',
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: function () {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    bgStyle () {
      return `background-image: url(${this.bgImage})`
    }
  },
  components: {
    SongList,
    Loading
  },
  methods: {
    back () {
      this.$router.back()
    },
    selectItem (item, index) {
      store.dispatch('selectPlay', {
        list: this.songs,
        playIndex: index
      })
    }
  }
}
</script>

<style scoped>
  .music-list{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #f4f4f4;
    height: 100%;
    margin-bottom: 50px;
  }
  .back{
    color: #43CD80;
    margin-top: 10px;
  }
  .icon-back{
    display: block;
    padding: 10px;
    color: white;
  }
  .title{
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    color: #43CD80;
    text-align: center;
    margin: 0;
    padding-top: 10px;
  }
  .bg-image{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
  }
  .list{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #f4f4f4;
  }
  .filter{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.4);
  }
</style>
