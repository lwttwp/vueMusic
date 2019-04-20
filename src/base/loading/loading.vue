<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style scoped>
.loading{
  width: 100%;
  text-align: center;
  margin-top: 100px;
}
.desc{
  line-height: 20px;
  font-size: 10px;
  color: #000;
}
</style>
