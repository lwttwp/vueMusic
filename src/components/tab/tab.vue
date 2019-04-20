<template>
    <div class="tab">
        <router-link tag="div" class="tab-item" to="/recommend">
          <span  ref="recommends" >推荐</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/singer">
          <span  >歌手</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/rank">
          <span  >排行</span>
        </router-link>
        <router-link tag="div" ref="recommend" class="tab-item" to="/search">
          <span > 搜索</span>
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {is_active: null}
  },
  methods: {
  }
}
</script>

<style scoped lang="css">
  .tab{
    display: flex;
    top: 0;
    left: 0;
    z-index: 2;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
  }
  .tab-item{
    flex: 1;
    text-align: center;
  }
/*  .tab_link{
    padding-bottom: 5px;
    color:rgba(255, 255, 255, 0.5);
  }*/
  .my_active{
    color: #00FF60;
    border-bottom: 2px solid #00FF60
  }
</style>
