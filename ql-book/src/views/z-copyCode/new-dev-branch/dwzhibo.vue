<template>
  <div class="container-wrap">
    <div class="fixed-wrap">
        <div class="head-wrap">
            <div class="head-first-wrap">
                <div class="left-wrap">
                    <div :class="firstIndex == 0?'item-wrap pick':'item-wrap'" @click="pickTab(0)">热图</div>
                    <div :class="firstIndex == 1?'item-wrap pick':'item-wrap'" @click="pickTab(1)">火视频</div>
                    <div :class="firstIndex == 2?'item-wrap pick':'item-wrap'" @click="pickTab(2)">直播</div>
                </div>
                <div class="right-wrap">
                    <!-- <div class="search-img">
                        <img class="" src="../../assets/img/miniProgramMe/pub_ico_souhui50.png" alt="">
                    </div> -->
                    <div class="scan-img">
                        <img  class="" src="../../assets/img/miniProgramMe/pub_ico_richscan.png" alt="" @click="openScanWindow">
                    </div>
                </div>
            </div>
            <div class="head-second-wrap">
                <div class="middle-wrap">
                    <div :class="(currIndex == 0||currIndex == 2||currIndex == 4)?'second-item-wrap pick':'second-item-wrap'" @click="pickTab(3)">关注</div>
                    <div class="line"></div>
                    <div :class="(currIndex == 1||currIndex == 3||currIndex == 5)?'second-item-wrap pick':'second-item-wrap'" @click="pickTab(4)">推荐</div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="empty-wrap"></div> -->
    <div class="footer-wrap">
        <!-- <router-view></router-view> -->
        <van-swipe class="my-swipe" @change="onChange" :show-indicators="false" ref="swiper" :loop="false">
          <van-swipe-item>
            <div v-if="focusPW"></div>
            <focusPW :orgId="dwId" v-else/>
          </van-swipe-item>
          <van-swipe-item>
            <div v-if="orgPW"></div>
            <orgPW :orgId="dwId" v-else/>
          </van-swipe-item>
          <van-swipe-item>
            <div v-if="focusSV"></div>
            <focusSV :orgId="dwId" v-else/>
          </van-swipe-item>
          <van-swipe-item>
            <orgSV :orgId="dwId"/>
          </van-swipe-item>
          <van-swipe-item>
            <div v-if="focusLL"></div>
            <focusLL v-else/>
          </van-swipe-item>
          <van-swipe-item>
            <div v-if="rLL"></div>
            <rLL v-else/>
          </van-swipe-item>
        </van-swipe>
    </div>
  </div>
</template>

<script>
import {
    openScanWindow
  } from '../../assets/js/utils'
  import orgShortVideo from './orgShortVideo'
  // const orgShortVideo = resolve => require.ensure([], () => resolve(require('./orgShortVideo.vue')))
  // const focusShortVideo = resolve => require.ensure([], () => resolve(require('./focusShortVideo.vue')))
  // const orgPictureWall = resolve => require.ensure([], () => resolve(require('./orgPictureWall.vue')))
  // const focusPictureWall = resolve => require.ensure([], () => resolve(require('./focusPictureWall.vue')))
  // const miniRecommendLiveList = resolve => require.ensure([], () => resolve(require('./miniRecommendLiveList.vue')))
  // const miniFocusLiveList = resolve => require.ensure([], () => resolve(require('./miniFocusLiveList.vue')))
  import focusShortVideo from './focusShortVideo'
  import orgPictureWall from './orgPictureWall'
  import focusPictureWall from './focusPictureWall'
  import miniRecommendLiveList from './miniRecommendLiveList'
  import miniFocusLiveList from './miniFocusLiveList'
export default {
	name: 'dwZhiBo',
  data () {
    return {
        token:'',
        dwId: '',
        currIndex:3,
        firstIndex:1,
        focusPW:true,
        orgPW:true,
        orgSV:true,
        focusSV:true,
        focusLL:true,
        rLL:true,
    }
  },
  components:{
    orgSV:orgShortVideo,
    focusSV:focusShortVideo,
    orgPW:orgPictureWall,
    focusPW:focusPictureWall,
    rLL:miniRecommendLiveList,
    focusLL:miniFocusLiveList,
  },
  methods: {
    onChange(index){
      console.log(index)
      this.currIndex = index
      console.log(this.$refs.swiper.children[0],'轮播对象')
    },
    pickTab(val){
        switch(val){
          case (0):
            this.currIndex = 1
            this.firstIndex = 0
            this.$refs.swiper.swipeTo(1)
          break;
          case (1):
            this.currIndex = 3
            this.firstIndex = 1
            this.$refs.swiper.swipeTo(3)
          break;
          case (2):
            this.currIndex = 5
            this.firstIndex = 2
            this.$refs.swiper.swipeTo(5)
          break;
          case (3):
            if(this.firstIndex == 0){
              this.currIndex = 0
              this.$refs.swiper.swipeTo(0)
            }else if(this.firstIndex == 1){
              this.currIndex = 2
              this.$refs.swiper.swipeTo(2)
            }else{
              this.currIndex = 4
              this.$refs.swiper.swipeTo(4)
            }
          break;
          case (4):
            if(this.firstIndex == 0){
              this.currIndex = 1
              this.$refs.swiper.swipeTo(1)
            }else if(this.firstIndex == 1){
              this.currIndex = 3
              this.$refs.swiper.swipeTo(3)
            }else{
              this.currIndex = 5
              this.$refs.swiper.swipeTo(5)
            }
          break;
        }
    },
    openScanWindow(){
        openScanWindow()
    },
  },
  // pops:[
  //     'orgId'
  // ],
  created () {
    document.title = '云课'
    var query = this.$route.query
    this.token = query.token
    // console.log(this.dwId,'动态参数')
    console.log(query,'查询字符')
    console.log(query.dwId,'查询dwId')
    if(query.dwName){
      document.title = '加华云课'
    }
    if(query.dwId){
      this.dwId = query.dwId
    }
    localStorage.setItem('miniToken',query.token)
  },
  mounted() {
    this.$refs.swiper.swipeTo(3)
  },
  watch: {
    currIndex(val){
      console.log(val,'监听currindex')
      switch(val){
        case (0):
          this.firstIndex = 0
          this.focusPW = false
        break;
        case (1):
          this.firstIndex = 0
          this.orgPW = false
        break;
        case (2):
          this.firstIndex = 1
          this.focusSV = false
        break;
        case (3):
          this.firstIndex = 1
          this.orgSV = false
        break;
        case (4):
          this.firstIndex = 2
          this.focusLL = false
        break;
        case (5):
          this.firstIndex = 2
          this.rLL = false
        break;
      }
    }
  },
}
</script>

<style scoped lang='scss'>
    .container-wrap{
        background-color: #ebebeb;
        height: 100%;
        width: 100%;
    }
    .fixed-wrap{
        position: fixed;
        width: 100%;
        z-index: 999;
    }
    .head-wrap{
        position:absolute;
        // background-color: #ebebeb;
        top: 0;
        width: 100%;
    }
    // .empty-wrap{
    //     height: 41px;
    //     width: 100%;
    //     background-color: #ebebeb;
    // }
    .footer-wrap{
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
        width: 100%;
        padding-top: 84px;
        box-sizing: border-box;
        background-color: #ebebeb;
    }
    .head-first-wrap{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #d2d2d2;
        height: 40px;
        overflow: hidden;
        background-color: #ebebeb;
    }
    .left-wrap{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .item-wrap{
        margin-left: 27px;
        font-size: 16px;
        height: 100%;
        line-height: 40px;
    }
    .pick{
        border-bottom: 2px solid #3298FF;
        color: #3298FF;
    }
    .right-wrap{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .right-wrap img{
        width: 25px;
        height: 25px;
        vertical-align: bottom;
    }
    .scan-img{
        margin: 0 13px 0 20px;
    }
    .head-second-wrap{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        overflow: hidden;
        text-align: center;
        vertical-align: center;
        background: rgba($color: #ebebeb, $alpha: 0);

    }

    .middle-wrap{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .line{
        width: 2px;
        height: 18px;
        background-color: #000000;
        margin: 0 22px;
        transform: translateX(-1px)
    }
    .second-item-wrap{
        font-size: 18px;
        height: 32px;
        line-height: 40px;
    }
    .van-list{
      display: inline-block;
    }
</style>
