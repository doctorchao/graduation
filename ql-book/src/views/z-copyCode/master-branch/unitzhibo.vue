<template>
  <div class="container-wrap">
    <div class="fixed-wrap">
        <div class="head-wrap">
            <!-- <div class="head-first-wrap">
                <div class="left-wrap">
                    <div :class="pick1?'item-wrap pick':'item-wrap'" @click="pickTab('pick1')">热图</div>
                    <div :class="pick2?'item-wrap pick':'item-wrap'" @click="pickTab('pick2')">火视频</div>
                    <div :class="pick3?'item-wrap pick':'item-wrap'" @click="pickTab('pick3')">直播</div>
                </div>
                <div class="right-wrap">
                    <div class="search-img">
                        <img class="" src="../../assets/img/miniProgramMe/pub_ico_souhui50.png" alt="">
                    </div>
                    <div class="scan-img">
                        <img  class="" src="../../assets/img/miniProgramMe/pub_ico_richscan.png" alt="" @click="openScanWindow">
                    </div>
                </div>
            </div> -->
            <div class="head-second-wrap">
                <div class="middle-wrap">
                    <div :class="pick1?'second-item-wrap pick':'second-item-wrap'" @click="pickTab('pick1')">关注</div>
                    <div class="line"></div>
                    <div :class="pick2?'second-item-wrap pick':'second-item-wrap'" @click="pickTab('pick2')">推荐</div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="empty-wrap"></div> -->
    <div class="footer-wrap">
      <keep-alive>
        <router-view ></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import {
    openScanWindow
  } from '../../assets/js/utils'
export default {
	name: 'unitZhiBo',
  data () {
    return {
        pick1: false,
        pick2: true,
        startx: 0,
        starty: 0,
        endx: 0,
        endy:0,
        token:'',
        zbId:''
    }
  },
  methods: {
    pickTab(val){
      if(val == 'pick1'){
          this.pick1 = true,
          this.pick2 = false,
          this.$router.replace(`/unitZhiBo/miniFocusLiveList?token=${this.token}&dwId=${this.zbId}`)
      }else if(val == 'pick2'){
          this.pick1 = false,
          this.pick2 = true,
          this.$router.replace(`/unitZhiBo/miniRecommendLiveList?token=${this.token}&dwId=${this.zbId}`)
      }
    },
    checkUrl(){
      if(this.$route.path == '/unitZhiBo/miniFocusLiveList'){
        this.pick1 = true,
        this.pick2 = false
      }else if(this.$route.path == '/unitZhiBo/miniRecommendLiveList'){
        this.pick1 = false,
        this.pick2 = true
      }
    },
    // openScanWindow(){
    //     openScanWindow()
    // },
  },
  activated () {
    document.title = '云客智播'
    var query = this.$route.query
    this.token = query.token
    console.log(query,'查询字符')
    if(query.dwId){
      console.log('到这了',query.dwId)
      this.zbId = query.dwId
      if(query.dwName == 'jiahua'){
        document.title = '云课'
      }
    }
    localStorage.setItem('miniToken',query.token)
    this.checkUrl()
  },
  mounted() {
    let footer = document.getElementsByClassName('footer-wrap')
    footer[0].ontouchstart =(e)=>{
      e.stopPropagation();
      this.startx = e.touches[0].clientX
      this.starty = e.touches[0].clientY
    }
    footer[0].ontouchend =(e)=>{
      e.stopPropagation();
      this.endx = e.changedTouches[0].clientX
      this.endy = e.changedTouches[0].clientY
      if((this.reduceX<= (-20))&&(Math.abs(this.reduceY)<=50)){
        if(this.pick1){
          this.pick1 = false; 
          this.pick2 = true;
          this.$router.replace(`/unitZhiBo/miniRecommendLiveList?token=${this.token}&dwId=${this.zbId}`)
        }
      }else if((this.reduceX>= 20)&&(Math.abs(this.reduceY)<=50)){
        if(this.pick2){
          this.pick1 = true;
          this.pick2 = false;
          this.$router.replace(`/unitZhiBo/miniFocusLiveList?token=${this.token}&dwId=${this.zbId}`)
        }
      }
    }
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
        padding-top: 44px;
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
        height: 35px;
        line-height: 40px;
    }
    
    .van-list{
      display: inline-block;
    }
</style>
