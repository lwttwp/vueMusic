<template>
  <transition name="slide" v-if="songs" class="detail">
     <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import store from '../../store'
import {getSingerDetail} from '../../api/singer'
import {ERR_OK} from '../../api/config'
import {getVkey} from '../../api/vkey'
import {createSong} from '../../common/js/song'
import MusicList from '../music-list/music-list'

export default {
  name: 'singer_details',
  components: {MusicList},
  data () {
    return {
      vkey: '',
      songs: ''
    }
  },
  computed: {
    singer () {
      return store.getters.singer
    },
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    }
  },
  methods: {
    _getDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return false
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._handleMusicData(res.data.list)
        }
      })
    },
    _handleMusicData (list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        getVkey(musicData.songmid).then((res) => {
          let v = res.data.items[0].vkey
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData, v))
          }
        })
      })
      return ret
    }
  },
  created () {
    this._getDetail()
  }
}
</script>

<style scoped>
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0);
  }
</style>
