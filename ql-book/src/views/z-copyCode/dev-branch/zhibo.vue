<template>
  <div class="container-wrap">
    <div class="fixed-wrap">
        <div class="head-wrap">
            <div class="head-first-wrap">
                <div class="left-wrap">
                    <div :class="pick1?'item-wrap pick':'item-wrap'" @click="pickTab('pick1')">热图</div>
                    <div :class="pick2?'item-wrap pick':'item-wrap'" @click="pickTab('pick2')">火视频</div>
                    <div :class="pick3?'item-wrap pick':'item-wrap'" @click="pickTab('pick3')">直播</div>
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
                    <div :class="pick4?'second-item-wrap pick':'second-item-wrap'" @click="pickTab('pick4')">关注</div>
                    <div class="line"></div>
                    <div :class="pick5?'second-item-wrap pick':'second-item-wrap'" @click="pickTab('pick5')">推荐</div>
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
	name: 'zhiBo',
  data () {
    return {
        pick1: false,
        pick2: true,
        pick3: false,
        pick4: false,
        pick5: true,
        startx: 0,
        starty: 0,
        endx: 0,
        endy:0,
        token:'',
        dwId: 102,
        zbId:''
    }
  },
  methods: {
    pickTab(val){
        if(val == 'pick1'){
            this.pick1 = true,
            this.pick2 = false,
            this.pick3 = false,
            this.pick4 = false,
            this.pick5 = true,
            // this.$router.push('/zhiBo/pictureWall')
            this.$router.replace(`/zhiBo/pictureWall?token=${this.token}`)
        }else if(val == 'pick2'){
            this.pick1 = false,
            this.pick2 = true,
            this.pick3 = false,
            this.pick4 = false,
            this.pick5 = true,
            this.$router.replace(`/zhiBo/shortVideo?token=${this.token}`)
        }else if(val == 'pick3'){
            this.pick1 = false,
            this.pick2 = false,
            this.pick3 = true,
            this.pick4 = false,
            this.pick5 = true,
            this.$router.replace(`/zhiBo/miniRecommendLiveList?token=${this.token}&dwId=${this.zbId}`)
        }else if(val == 'pick4'){
            this.pick4 = true,
            this.pick5 = false,
            this.$router.replace(this.pick1 ?`/zhiBo/focusPictureWall?token=${this.token}`:(this.pick2 ?`/zhiBo/focusShortVideo?token=${this.token}`:`/zhiBo/miniFocusLiveList?token=${this.token}&dwId=${this.zbId}`))
        }else if(val == 'pick5'){
            this.pick4 = false,
            this.pick5 = true,
            this.$router.replace(this.pick1 ?`/zhiBo/pictureWall?token=${this.token}`:(this.pick2 ?`/zhiBo/shortVideo?token=${this.token}`:`/zhiBo/miniRecommendLiveList?token=${this.token}&dwId=${this.zbId}`))
        }
    },
    checkUrl(){
      console.log(this.$route,'路由信息')
      if(this.$route.path == '/zhiBo/pictureWall'){
        this.pick1 = true,
        this.pick2 = false,
        this.pick3 = false,
        this.pick4 = false,
        this.pick5 = true
      }else if(this.$route.path == '/zhiBo/shortVideo'){
        this.pick1 = false,
        this.pick2 = true,
        this.pick3 = false,
        this.pick4 = false,
        this.pick5 = true
      }else if(this.$route.path == '/zhiBo/miniRecommendLiveList'){
        this.pick1 = false,
        this.pick2 = false,
        this.pick3 = true,
        this.pick4 = false,
        this.pick5 = true
      }else if(this.$route.path == `/zhiBo/focusPictureWall`){
        this.pick1 = true,
        this.pick2 = false,
        this.pick3 = false,
        this.pick4 = true,
        this.pick5 = false
      }else if(this.$route.path == `/zhiBo/focusShortVideo`){
        this.pick1 = false,
        this.pick2 = true,
        this.pick3 = false,
        this.pick4 = true,
        this.pick5 = false
      }else if(this.$route.path == '/zhiBo/miniFocusLiveList'){
        this.pick1 = false,
        this.pick2 = false,
        this.pick3 = true,
        this.pick4 = true,
        this.pick5 = false
      }
    },
    openScanWindow(){
        openScanWindow()
    },
  },
  activated () {
    document.title = '云客智播'
    var query = this.$route.query
    this.token = query.token
    console.log(query,'查询字符')
    console.log(query.dwId,'查询dwId')
    if(query.dwId){
      this.dwId = query.dwId
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
      if((this.reduceX<= (-20))&&(Math.abs(this.reduceY)<=80)){
        switch(true){
          case (this.pick1&&this.pick4):
            this.pick1 = true;
            this.pick2 = false;
            this.pick3 = false;
            this.pick4 = false;
            this.pick5 = true;
            this.$router.replace(`/zhiBo/pictureWall?token=${this.token}`)
          break;
          case (this.pick1&&this.pick5):
            this.pick1 = false;
            this.pick2 = true;
            this.pick3 = false;
            this.pick4 = true;
            this.pick5 = false;
            this.$router.replace(`/zhiBo/focusShortVideo?token=${this.token}`)
          break;
          case (this.pick2&&this.pick4):
            this.pick1 = false;
            this.pick2 = true;
            this.pick3 = false;
            this.pick4 = false;
            this.pick5 = true;
            this.$router.replace(`/zhiBo/shortVideo?token=${this.token}`)
          break;
          case (this.pick2&&this.pick5):
            this.pick1 = false;
            this.pick2 = false;
            this.pick3 = true;
            this.pick4 = true;
            this.pick5 = false;
            this.$router.replace(`/zhiBo/miniFocusLiveList?token=${this.token}&dwId=${this.zbId}`)
          break;
          case (this.pick3&&this.pick4):
            this.pick1 = false;
            this.pick2 = false;
            this.pick3 = true;
            this.pick4 = false;
            this.pick5 = true;
            this.$router.replace(`/zhiBo/miniRecommendLiveList?token=${this.token}&dwId=${this.zbId}`)
          break;
          // case (this.pick3&&this.pick5):
          //   this.pick1 = false;
          //   this.pick2 = false;
          //   this.pick3 = true;
          //   this.pick4 = false;
          //   this.pick5 = true;
          // break;
        }
      }else if((this.reduceX>= 20)&&(Math.abs(this.reduceY)<=80)){
        switch(true){
          case (this.pick3&&this.pick5):
            this.pick1 = false;
            this.pick2 = false;
            this.pick3 = true;
            this.pick4 = true;
            this.pick5 = false;
            this.$router.replace(`/zhiBo/miniFocusLiveList?token=${this.token}&dwId=${this.zbId}`)
          break;
          case (this.pick3&&this.pick4):
            this.pick1 = false;
            this.pick2 = true;
            this.pick3 = false;
            this.pick4 = false;
            this.pick5 = true;
            this.$router.replace(`/zhiBo/shortVideo?token=${this.token}`)
          break;
          case (this.pick2&&this.pick5):
            this.pick1 = false;
            this.pick2 = true;
            this.pick3 = false;
            this.pick4 = true;
            this.pick5 = false;
            this.$router.replace(`/zhiBo/focusShortVideo?token=${this.token}`)
          break;
          case (this.pick2&&this.pick4):
            this.pick1 = true;
            this.pick2 = false;
            this.pick3 = false;
            this.pick4 = false;
            this.pick5 = true;
            this.$router.replace(`/zhiBo/pictureWall?token=${this.token}`)
          break;
          case (this.pick1&&this.pick5):
            this.pick1 = true;
            this.pick2 = false;
            this.pick3 = false;
            this.pick4 = true;
            this.pick5 = false;
            this.$router.replace(`/zhiBo/focusPictureWall?token=${this.token}`)
          break;
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
