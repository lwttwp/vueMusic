<template>
  <div class="progressBar" ref="progressBar">
    <div class="bar-inner" ref="barinner" >
      <div class="progress" ref="progress"></div>
      <div class="buffer" ref="buffer"></div>
      <div class="progress-ball" ref="progressball"></div>
    </div>
  </div>
</template>

<script>
const bufferWidth = 16
export default {
  name: 'progress-bar',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  methods: {
    _offset (offsetWidth) {
      this.$refs.progress.style.width = offsetWidth + 'px'
      this.$refs.progressball.style.left = offsetWidth + 'px'
    }
  },
  watch: {
    percent (newPercent) {
      if (newPercent >= 0) {
        const barWidth = this.$refs.barinner.clientWidth - bufferWidth
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
      }
    }
  }
}
</script>

<style scoped>
  .progressBar{
    height: 30px;
  }
  .bar-inner{
    position: relative;
    height: 4px;
    top: 13px;
    background: rgba(255,255,255,.3);
  }
  .bar-inner .progress{
    position: absolute;
    height: 100%;
    background: #31c27c;
  }
  .bar-inner .buffer{
    position: absolute;
    height: 100%;
    background: rgba(255,255,255,.3);
  }
  .bar-inner .progress-ball{
    position: absolute;
    left: 0;
    top: -6px;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #31c27c;
  }
</style>
