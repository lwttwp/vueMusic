<template>
  <div id="app">
    <div class="">
    <MHeader></MHeader>
     </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header.vue' // 引入header组件
import Tab from './components/tab/tab.vue' // 引入tab组件
import Player from './components/player/player'

export default {
  name: 'App',
  components: {
    Player,
    MHeader,
    Tab
  }
}
</script>

<style lang="css">
  body{
    background: #f4f4f4;
  }
</style>
