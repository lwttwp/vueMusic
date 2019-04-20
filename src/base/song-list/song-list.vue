<template>
    <div class="song-slit">
      <ul style="padding: 0" class="list-unstyled">
        <li  v-for="(song, index) in songs" :key="index" class="item" @click="selectItem(song,index)">
          <div class="content">
            <h2 class="name">{{song.name}}</h2>
            <h5 class="desc">{{getDesc(song)}}</h5>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>

export default {
  name: 'song-list',
  props: {
    songs: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    getDesc (song) {
      return `${song.singer} · ${song.album}`
    },
    selectItem (song, index) {
      this.$emit('selectSong', song, index)
    }
  }
}
</script>

<style scoped>
.song-slit{
  position: relative;;
  align-items: center;
  box-sizing: border-box;
  padding-top: 50px;
  width: auto;
  overflow-y: scroll;
  height: 800px;
  margin-bottom: 50px;
}
.item{
  align-items: center;
  box-sizing: border-box;
  height: 64px;
  font-size: 14px;
  width: auto;
  border-bottom: 1px solid #ddd;
}
.content{
  line-height: 20px;
  padding-left: 20px;
  margin: 0 0 5px 0;
}
.name{
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc{
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
