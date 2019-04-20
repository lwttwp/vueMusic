<template>
  <div class="m-header">
    <div>
      <div class="icon"></div>
      <h1 class="text">Vue Music</h1>
    </div>
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
  </div>
</template>

<script>

</script>

<style scoped lang="css">
  .m-header{
    position: fixed;
    top: 0;
    height: 80px;
    text-align: left;
    color: #43CD80;
    font-size: 0;
    z-index: 3;
    background: #f4f4f4;
    width: 100%;
    margin-bottom: 100px;
  }
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
    background: #f4f4f4;
    color: #000;
  }
  .icon{
    display: inline-block;
    vertical-align: top; /*垂直对齐为与行内最高元素对齐*/
    margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-right: 9px;
    background: url("logo.png");
    background-size: 30px 32px;
  }
  .text{
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: 18px;
    margin-bottom: 6px;
    margin-top: 0;
   }
  .my_active{
    color: #43CD80;
    border-bottom: 2px solid #43CD80
  }
</style>
