<template>
  <div class="container-wrap">
    <div class="head-wrap">
        <video src="https://python-server.oss-cn-shenzhen.aliyuncs.com/liuyitong.mp4"
            controls
            width="100%"
            webkit-playsinline="true"
            x5-video-player-type="h5-page"
            x5-video-player-fullscreen="true"
            x5-video-orientation="portraint"
            playsinline
            poster="https://python-server.oss-cn-shenzhen.aliyuncs.com/newfirstimg.jpg">
        您的浏览器不支持当前视频播放
        </video>
    </div>
    <div class="foot-wrap">
        <div class="flex-c">
          <div class="share flex-c" @click="copy(4)">
            <img src="../../assets/img/miniProgramMe/share.png" alt="">
            <span>复制链接分享</span>
          </div>
        </div>
        <div class="resume">
            <div class="top-wrap">
                <div class="left-wrap">
                  <div class="name-wrap">
                    <span>刘一统</span>
                    <img src="../../assets/img/miniProgramMe/vip.png" alt="">
                  </div>
                  <div>
                  <!-- <p class="account">秀才号: 10100113</p> -->
                  <p class="account">文化创意产业园管理、孵化器运营/网络营销、教育培训、心理咨询/网络营销、教育培训、心理咨询</p>
                  </div>
                </div>
                <div class="right-wrap">
                  <img src="../../assets/img/miniProgramMe/lyt.jpg" alt="">
                </div>
            </div>
            <div class="middle-line"></div>
            <div class="bottom-wrap">
              <p>珠海壹拾贰文化创意产业园投资 | 总裁</p>
              <p>珠海纬尔奇科技有限公司 | 董事长</p>
              <p>珠海市香洲区海源教育技术培训学校 | 校长</p>
              <div v-if="!isshow">
                <p>加华国际英语培训学校 | 校长</p>
              </div>
              <div class="showMore" @click="show" v-if="isshow">
                <span>更多</span>
                <img src="../../assets/img/miniProgramMe/bottom.png" alt="">
              </div>
              <div class="showMore" @click="show" v-else>
                <span>收起</span>
                <img src="../../assets/img/miniProgramMe/top.png" alt="">
              </div>
            </div>
        </div>
        <div class="item-wrap communite">
            <div class="fir-title">联系方式</div>
            <div class="display">
              <div>
                <span class="communite-head">电话：</span>
                <span id="phone">{{phone}}</span>
              </div>
              <div>
                <img src="../../assets/img/miniProgramMe/phone.png" alt="" @click="call">
                <img src="../../assets/img/miniProgramMe/copy.png" alt="" @click="copy(1)">
              </div>
            </div>
            <div class="display">
              <div>
                <span class="communite-head">邮箱：</span>
                <span id="email">{{email}}</span>
              </div>
              <img src="../../assets/img/miniProgramMe/copy.png" alt="" @click="copy(2)">
            </div>
            <div class="display">
              <div>
                <span class="communite-head">微信：</span>
                <span id="weixin">{{weixin}}</span>
              </div>
              <img src="../../assets/img/miniProgramMe/copy.png" alt="" @click="copy(3)">
            </div>
        </div>
        <div class="item-wrap society">
            <div class="fir-title">组织/协会</div>
            <div class="society-content">
              <img src="../../assets/img/miniProgramMe/team.png" alt="">
              <div>北师大珠海校友会 执行会长</div>
            </div>
        </div>
        <div class="item-wrap">
            <div class="fir-title">个人简介</div>
            <div>刘一统，北京师范大学文学硕士，现任珠海V12文化创意产业园总裁、珠海纬尔奇孵化中心董事长、珠海市香洲区海源教育技术培训学校校长、珠海加华国际英语培训学校校长，现兼任北京师范大学珠海校友会副会长、西北师范大学广东省校友会副会长、珠海甘肃商会常务副会长、北京师范大学珠海分校客座教授等</div>
        </div>
        <div class="item-wrap experience">
            <div class="fir-title">个人经历</div>
            <div class="experience-item">
              <div class="sec-title">珠海壹拾贰文化创意产业园投资</div>
              <div class="time">2014.03-至今 总裁</div>
              <div class="experience-content">自2014年全民面负责v12文化创意产业园的管理工作,为园区企业带来网络营销等管理运营理念,极大地提升了园区企业的发展。任职期间，v12获得了国家级科技企业孵化器和国家小型微型企业创业创新示范基地等两大荣誉。</div>
            </div>
            <div class="experience-item">
              <div class="sec-title">珠海纬尔奇科技有限公司</div>
              <div class="time">2001.10-至今 董事长</div>
              <div></div>
            </div>
            <div class="experience-item">
              <div class="sec-title">珠海市香洲区海源教育技术培训学校</div>
              <div class="time">2001.03-至今 校长</div>
              <div></div>
            </div>
            <div class="experience-item">
              <div class="sec-title">加华国际英语培训学校</div>
              <div class="time">2015.10-至今 校长</div>
              <div></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import {
    checkWxDev,
  } from "../../assets/js/utils"
  export default {
    
    data() {
      return {
        isshow: true,
        phone:'13823075741',
        email:'lyt@hy3636.com',
        weixin:'liuyitong2008',
        shareUrl:'https://wx.zhijiashare.com/i/kj'
      }
    },
    methods: {
      show(){
        this.isshow = !this.isshow
      },
      // controls(e){
      //   console.log(e,'对象')
      //   e.target.controls = true
      // },
      call(){
        if (checkWxDev()) {
          document.location.href = "tel: 13823075741 mp.weixin.qq.com"
        } else {
          document.location.href = "tel:13823075741";
        }
      },
      copy(val){
        // var obj1 = document.getElementById('phone').innerText
        // var obj2 = document.getElementById('email').innerText
        // var obj3 = document.getElementById('weixin').innerText
        var ele = document.createElement('input')
        ele.style.opacity = 0
        document.body.appendChild(ele)
        switch(val){
          case 1:
            ele.value = this.phone
            ele.select()
            document.execCommand("Copy")
            document.body.removeChild(ele)
            this.$toast('复制成功')
          break;
          case 2:
            ele.value = this.email
            ele.select()
            document.execCommand("Copy")
            document.body.removeChild(ele)
            this.$toast('复制成功')
          break;
          case 3:
            ele.value = this.weixin
            ele.select()
            document.execCommand("Copy")
            document.body.removeChild(ele)
            this.$toast('复制成功')
          break;
          case 4:
            ele.value = this.shareUrl
            ele.select()
            document.execCommand("Copy")
            document.body.removeChild(ele)
            this.$toast('分享链接己复制，您可以粘贴到对话信息或浏览器中打开！')
          break;
        }
      }
    },
    activated: function() {

    },
  }
</script>

<style scoped lang="scss">
.container-wrap{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
}
.foot-wrap{
    background-color: white;
    padding: 0 15px;
    // width: 100%;
    font-size: 14px;
    margin-bottom: 50px;
}
.flex-c{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.share{
  font-size: 12px;
  margin-top: 20px;
  width: 30%;
}
.share img{
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.resume{
    // width: 100%;
    padding: 20px 17px;
    box-shadow: 0 0 10px rgb(121, 192, 250);
    margin: 20px 0 40px 0;
    border-radius: 5px;
}
.resume img{
    vertical-align: bottom;
}
.resume .top-wrap{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.resume .name-wrap{
    font-size: 22px
}
.name-wrap img{
    height: 25px;
    width: 25px;
    margin-bottom: 2px
}
.right-wrap img{
    width: 64px;
    height: 64px;
    border-radius: 50%;
    vertical-align: bottom;

}
.resume p{
    font-size: 12px;
    color: gray;
    margin:0 0 5px 0;
}
.resume .account{
    // font-size: 14px;
    margin-top: 10px;
}
.resume .middle-line{
    width: 100%;
    height: 1px;
    background-color: gray;
    margin: 10px 0 15px 0;
    transform: scaleY(0.4)
}
.resume .showMore{
  font-size: 14px;
  margin-top: 10px;
}
.showMore img{
  width: 10px;
  height: 10px;
  vertical-align: bottom;
}
.fir-title{
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 20px;
}
.sec-title{
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 10px;
}
.item-wrap{
    margin-bottom: 40px;
}
.display{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}
.item-wrap .communite-head{
    color: gray;
    margin-left: 5px;
}
.communite img{
    width: 14px;
    height: 14px;
    margin-left: 10px;
}
.item-wrap .society-content{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.society img{
    height: 17px;
    width: 17px;
    border-radius: 50%;
    margin-right: 3px;
}
.experience .time{
    margin-bottom: 5px;
}
.experience .experience-item{
    margin-bottom: 20px;
}

.item-wrap .experience-content{
    color: gray;
}


</style>
