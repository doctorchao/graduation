<template>
  <div class="container-wrap">
    <div class="head-first-wrap">
        <div class="left-wrap">
            <div :class="pick1?'item-wrap pick':'item-wrap'" @click="pickTab('pick1')">热图</div>
            <div :class="pick2?'item-wrap pick':'item-wrap'" @click="pickTab('pick2')">火视频</div>
            <div :class="pick3?'item-wrap pick':'item-wrap'" @click="pickTab('pick3')">直播</div>
        </div>
        <div class="right-wrap">
            <div class="search-img">
                <img class="" src="../../assets/search.png" alt="">
            </div>
            <div class="scan-img">
                <img  class="" src="../../assets/scan.png" alt="">
            </div>
        </div>
    </div>
    <div class="head-second-wrap">
        <div class="middle-wrap">
            <div :class="pick4?'second-item-wrap pick':'second-item-wrap'" @click="pickTab('pick4')">关注</div>
            <div class="line"></div>
            <div :class="pick5?'second-item-wrap pick':'second-item-wrap'" @click="pickTab('pick5')">推荐</div>
        </div>
    </div>
    <div class="footer-wrap">
        <router-view ></router-view>
    </div>
    <!-- <swiper :options="swiperOption" ref="mySwiper" class="swiper-wrap">
      <div class="swiper-item">风</div>
      <div class="swiper-item">林</div>
      <div class="swiper-item">火</div>
      <div class="swiper-item">山</div>
      <div class="swiper-item">阴</div>
      <div class="swiper-item">雷</div>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper> -->
    <!-- <van-tabs  swipeable>
      <van-tab title='选项 1'></van-tab>
      <van-tab title='选项 2'></van-tab>
      <van-tab title='选项 3'></van-tab>
      <van-tab title='选项 4'></van-tab>
    </van-tabs>
    <van-tabs  swipeable>
      <van-tab title='选项 1'></van-tab>
      <van-tab title='选项 2'></van-tab>
    </van-tabs> -->
    <!-- <van-tabs v-model="active" :swipeable= true>
        <van-tab title="一包子">
            <van-tabs v-model="active2" swipeable>
                <van-tab title="二瑞雪">
                  <div class="item1">

                  </div>
                </van-tab>
                <van-tab title="二瑞雪">
<div class="item2">

                  </div>
                </van-tab>
            </van-tabs>
        </van-tab>
        <van-tab title="一包子">
            <van-tabs v-model="active2" swipeable>
                <van-tab title="二瑞雪">
                  <div class="item1">

                  </div>
                </van-tab>
                <van-tab title="二瑞雪">
                  <div class="item2">

                  </div>
                </van-tab>
            </van-tabs>
        </van-tab>
        <van-tab title="一包子">
            <van-tabs v-model="active2" swipeable>
                <van-tab title="二瑞雪">
                  <div class="item1">

                  </div>
                </van-tab>
                <van-tab title="二瑞雪">
                  <div class="item2">

                  </div>
                </van-tab>
            </van-tabs>
        </van-tab>
    </van-tabs> -->
    <!-- <van-tabs v-model="active2" swipeable>
        <van-tab title="二瑞雪">
          <div class="item1">

          </div>
        </van-tab>
        <van-tab title="二瑞雪">
          <div class="item2">

          </div>
        </van-tab>
    </van-tabs> -->
    <div>
      {{isshow?'显示':'不显示'}}
    </div>
  </div>
</template>

<script>
// import {Tab, Tabs, Search,TreeSelect } from 'vant'
import 'vant/lib/index.css';
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
	name: 'zhibo',
  data () {
    return {
      pick1: false,
      pick2: true,
      pick3: false,
      pick4: false,
      pick5: true,
      swiperOption: {
        // pagination: {
        //   el: '.swiper-pagination'
        // },
        // loop:true,
        autoplay: {
          delay: 1500
        },
        // observer:true,
        // observerParents:true
      },
      swiperdata: [],
      // active:0,
      // active2:0,
      startx: 0,
      starty: 0,
      endx: 0,
      endy:0,
      isshow: false,
      dwId:''
    }
  },
  components: {
    // vanTabs: Tabs,
    // vanTab: Tab,
    swiper,
    swiperSlide
  },
  // props:{
  //   dwId:{
  //     type: Number
  //   }
  // },
  methods: {
    onSearch(val){
      console.log(val)
    },
    pickTab(val){
      if(val == 'pick1'){
        this.pick1 = true,
        this.pick2 = false,
        this.pick3 = false,
        this.pick4 = false,
        this.pick5 = true,
        this.$router.push(`/like/change?${this.dwId}`)
      }else if(val == 'pick2'){
        this.pick1 = false,
        this.pick2 = true,
        this.pick3 = false,
        this.pick4 = false,
        this.pick5 = true,
        this.$router.push(`/like/changepsw/${this.dwId}?${this.dwId}`)
      }else if(val == 'pick3'){
        this.pick1 = false,
        this.pick2 = false,
        this.pick3 = true,
        this.pick4 = false,
        this.pick5 = true,
        this.$router.push(`/like/changename?${this.dwId}`)
      }else if(val == 'pick4'){
        this.pick4 = true,
        this.pick5 = false,
        this.$router.push(this.pick1 ?'/like/changedesc':(this.pick2 ?'/like/login':'/like/register'))
      }else if(val == 'pick5'){
        this.pick4 = false,
        this.pick5 = true,
        this.$router.push(this.pick1 ?'/like/change':(this.pick2 ?`/like/changepsw/${this.dwId}?murl=https://wx.zhijiashare.com/#/orgModuleList/org/396`:'/like/changename'))
      }
    },
    checkUrl(){
      console.log(this.$route.options,'这是route')
      var fullpath = this.$route.query.murl + this.$route.hash
      console.log(fullpath,'解析路由')
      if(this.$route.path == '/like/changedesc'){
        this.pick1 = true,
        this.pick2 = false,
        this.pick3 = false,
        this.pick4 = true,
        this.pick5 = false
      }else if(this.$route.path == '/like/login'){
        this.pick1 = false,
        this.pick2 = true,
        this.pick3 = false,
        this.pick4 = true,
        this.pick5 = false
      }else if(this.$route.path == '/like/register'){
        this.pick1 = false,
        this.pick2 = false,
        this.pick3 = true,
        this.pick4 = true,
        this.pick5 = false
      }else if(this.$route.path == `/like/changepsw/${this.dwId}`){
        this.pick1 = false,
        this.pick2 = true,
        this.pick3 = false,
        this.pick4 = false,
        this.pick5 = true
      }
    }
  },
  created () {
    document.title = '周青蓉'
    this.checkUrl()
    this.dwId = this.$route.query.dwId
    console.log(this.dwId,'我是dwId')
    if(this.dwId){
      document.title = '包子'
    }
  },
  mounted() {
    //封装pick修改函数  根据当前路由修改pick数
    let footer = document.getElementsByClassName('footer-wrap')
    console.log(footer,'监听元素')
    footer[0].ontouchstart =(e)=>{
      e.stopPropagation();
      console.log(e,'触摸开始对象')
      this.startx = e.touches[0].clientX
      this.starty = e.touches[0].clientY
    }
    footer[0].ontouchend =(e)=>{
      e.stopPropagation();
      console.log(e,'触摸结束对象')
      this.endx = e.changedTouches[0].clientX
      this.endy = e.changedTouches[0].clientY
      if((this.reduceX<= (-20))&&(Math.abs(this.reduceY)<=30)){ // 朝右走
        switch(true){
          case (this.pick1&&this.pick4):
            this.pick1 = true;
            this.pick2 = false;
            this.pick3 = false;
            this.pick4 = false;
            this.pick5 = true;
            this.$router.push('/like/change')
          break;
          case (this.pick1&&this.pick5):
            this.pick1 = false;
            this.pick2 = true;
            this.pick3 = false;
            this.pick4 = false;
            this.pick5 = true;
            this.$router.push('/like/changepsw')
          break;
          case (this.pick2&&this.pick4):
            this.pick1 = false;
            this.pick2 = true;
            this.pick3 = false;
            this.pick4 = false;
            this.pick5 = true;
            this.$router.push('/like/changepsw')
          break;
          case (this.pick2&&this.pick5):
            this.pick1 = false;
            this.pick2 = false;
            this.pick3 = true;
            this.pick4 = false;
            this.pick5 = true;
            this.$router.push('/like/changename')
          break;
          case (this.pick3&&this.pick4):
            this.pick1 = false;
            this.pick2 = false;
            this.pick3 = true;
            this.pick4 = false;
            this.pick5 = true;
            this.$router.push('/like/changename')
          break;
          // case (this.pick3&&this.pick5):
          //   this.pick1 = false;
          //   this.pick2 = false;
          //   this.pick3 = true;
          //   this.pick4 = false;
          //   this.pick5 = true;
          // break;
        }
      }else if(this.reduceX>= 20){ //朝左走
        switch(true){
          case (this.pick3&&this.pick5):
            this.pick1 = false;
            this.pick2 = false;
            this.pick3 = true;
            this.pick4 = true;
            this.pick5 = false;
            this.$router.push('/like/register')
          break;
          case (this.pick3&&this.pick4):
            this.pick1 = false;
            this.pick2 = true;
            this.pick3 = false;
            this.pick4 = false;
            this.pick5 = true;
            this.$router.push('/like/changepsw')
          break;
          case (this.pick2&&this.pick5):
            this.pick1 = false;
            this.pick2 = true;
            this.pick3 = false;
            this.pick4 = true;
            this.pick5 = false;
            this.$router.push('/like/login')
          break;
          case (this.pick2&&this.pick4):
            this.pick1 = true;
            this.pick2 = false;
            this.pick3 = false;
            this.pick4 = false;
            this.pick5 = true;
            this.$router.push('/like/change')
          break;
          case (this.pick1&&this.pick5):
            this.pick1 = true;
            this.pick2 = false;
            this.pick3 = false;
            this.pick4 = true;
            this.pick5 = false;
            this.$router.push('/like/changedesc')
          break;
        }
      }
      
    }
  },
  watch: {
    // active(){
    //   console.log(this.active,'包子index')
    // },
    // active2(){
    //   console.log(this.active2,'瑞雪index')
    // }
    // endx(val){
    //   if(val-this.startx > 50){
    //     console.log('右滑动了')
    //   }
    //   if(val-this.startx < 50){
    //     console.log('左滑动了')
    //   }
    // }
  },
  computed: {
    reduceX(){
      return this.endx - this.startx
    },
    reduceY(){
      return this.endy- this.starty
    },
  },
}
</script>

<style scoped lang='scss'>
@import './index.scss'
</style>
