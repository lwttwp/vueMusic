<template>
    <div class="singer" >
      <list-view :singer="singer" @select="selectSinger"></list-view>
      <router-view></router-view>
    </div>
</template>

<script>
import {getSingerList} from '../../api/singer'
import {ERR_OK} from '../../api/config'
import ListView from '../../base/list-view/list-view'
import store from '../../store'

export default {
  name: 'singer',
  data () {
    return {
      singer: []
    }
  },
  created () {
    this._getSingerList()
  },
  computed: {
  },
  methods: {
    _getSingerList () {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singer = this._handleList(res.data.list)
        }
      })
    },
    _handleList (list) {
      let map = {
        hot: {
          title: '热门',
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < 10) {
          map.hot.items.push({
            name: item.Fsinger_name,
            id: item.Fsinger_mid,
            avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + item.Fsinger_mid + '.jpg?max_age=2592000'
          })
        }
        let key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
          name: item.Fsinger_name,
          id: item.Fsinger_mid,
          avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + item.Fsinger_mid + '.jpg?max_age=2592000'
        })
      })
      // 对map进行处理
      let hot = []
      let all = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          all.push(val)
        } else if (val.title === '热门') {
          hot.push(val)
        }
      }
      // 排序
      all.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(all)
    },
    selectSinger (singers) {
      this.$router.push({
        path: `/singer/${singers.id}`
      })
      store.commit('setSinger', singers)
    }
  },
  mounted () {
  },
  components: {
    ListView
  }
}
</script>

<style scoped>
.singer{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
