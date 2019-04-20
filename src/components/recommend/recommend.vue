<template>
    <div class="recommend" v-if="songLists">
        <div class="slider_wrapper">
          <div v-if="sliders">
            <b-slider :url="sliders"></b-slider>
          </div>
        </div>
        <div class="container-fluid">
          <div class="songList">
            <div class="row">
              <div class="col-md-12">
                <h1 class="list_title">热门歌单</h1>
              </div>
            </div>
            <div class="row" >
              <div class="col-md-6 col-xs-6 col-sm-6" v-for="item in songLists" :key="item.id">
                <img class="img-responsive img" v-lazy="item.picUrl">
                <h5 class="author">{{item.songListAuthor}}</h5>
                <p :title="item.songListDesc" class="desc">{{item.songListDesc.length > 9 ? item.songListDesc.substr(0,9)+'...' : item.songListDesc}}</p>
                <p>
                  <span class="glyphicon glyphicon-headphones"></span>
                  {{item.accessnum / 10000}}w
                </p>
              </div>
            </div>
          </div>
          <div class="loading-container" v-show="!songLists.length">
            <loading></loading>
          </div>
        </div>
    </div>
</template>

<script>
import {getRecommend} from '../../api/recommend'
import {ERR_OK} from '../../api/config'
import bSlider from '../../base/slider/bSlides'
import loading from '../../base/loading/loading'
import BScroll from '../../base/scroll/scroll'

export default {
  name: 'recommend',
  created () {
    this._getRecommend()
  },
  data () {
    return {
      sliders: '',
      songLists: '',
      radio: ''
    }
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.sliders = res.data.slider
          this.songLists = res.data.songList
          // this.radio = res.data.radioList
        }
      })
    }
  },
  components: {
    bSlider,
    loading,
    BScroll

  }
}
</script>

<style scoped>

.slider_wrapper{
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-top: 100px;
}
.list_title{
  text-align: center;
  font-size: 14px;
  }
.author{
  text-align: left;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
}
  .img{
    width: 100%;
  }
  .desc{
    text-align: left;
  }
.loading-container{
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>
