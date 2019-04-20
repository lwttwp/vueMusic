<template>
  <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li v-for="(item, index) in url" :key="index" data-target="#carousel-example-generic" :data-slide-to="index" :class="[index==0 ? 'active' : '']"></li>
    </ol>
    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
      <div v-for="(item, index) in url" :key="index" class="item" :class="[index == 0 ? 'active' : '']">
        <a :href="item.linkUrl">
          <img class="img-responsive" :src="item.picUrl">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    url: {
      required: true
    }
  },
  created () {
  }
}
</script>

<style scoped>
@import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
</style>
