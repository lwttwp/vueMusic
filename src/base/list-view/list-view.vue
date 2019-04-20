<template>
  <div class="list-view">
    <ul class="list-unstyled"  ref="list">
      <li v-for="group in singer" :key="group.title" class="list-group" >
        <h2 class="list-group-title" :id="group.title.substr(0,1)">{{group.title}}</h2>
        <ul class="list-unstyled" ref="list_index">
          <li v-for="singers in group.items" :key="singers.id" class="list-group-item" @click="selectItem(singers)">
            <img class="img-response img-circle avatar" :src="singers.avatar">
            <span class="name">{{singers.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="list-unstyled list-index">
      <li v-for="(title, index) in getShortcutList" :key="index" ref="shortcut" :id="title" @touchstart="setScroll(title,index)" >{{title}}</li>
    </ul>
    <div v-show="!singer.length" class="loading-container">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Loading from '../loading/loading'

export default {
  name: 'list-view',
  props: {
    singer: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    getShortcutList () {
      return this.singer.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
    setScroll (title, index) {
      var aP = this.$refs.list.getElementsByTagName('h2')
      for (var i = 0; i < aP.length; i++) {
        if (aP[i].innerHTML.substr(0, 1) === title) {
          document.documentElement.scrollTop = aP[i].offsetTop // 滚动条距离顶部的距离为h2元素距离顶部的距离相同实现滚动
          this.$refs.shortcut[index].style.color = '#00FF60'
          setTimeout(() => {
            this.$refs.shortcut[index].style.color = '#000'
          }, 500)
        }
      }
    },
    selectItem (singers) {
      this.$emit('select', singers)
    }
  },
  components: {
    Loading
  }
}
</script>

<style scoped>
  .list-view{
    position: relative;
    width: 100%;
    overflow: hidden;
    margin-top: 100px;
    margin-bottom: 50px;
  }
  .list-group{
    padding-bottom: 0;
  }
  .list-group-title{
    height: 20px;
    line-height: 20px;
    padding-left: 20px;
    font-size: 14px;
    background: #f4f4f4;
    margin: 0px 0 5px 0;
  }
  .list-group-item{
    display: flex;
    align-items: center;
    padding: 10px 0 10px 30px;
  }
  .avatar {
    width: 50px;
    height: 50px;
  }
  .name{
    margin-left: 20px;
    font-size: 14px;
  }
  .list-index{
    position: fixed;
    right: 10px;
    top: 15%;
    border-radius: 10px;
    background: #f4f4f4;
    padding: 5px;
  }
  .loading-container{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
