<template>
  <div class="container-wrap">
    <div class="head-wrap">
      <div class="head-button" @click="pageTo('/mysharing')">
        <div class="avatar-wrap">
          <img class="avatar" :src="currentUser.photo||checkUser.avatar" />
        </div>
        <div class="information-wrap">
          <div class="name">
            <span>{{wholeUser.username||checkUser.username||'未登录'}}</span>
          </div>
          <div class="phone">
            <div>
              <span>绑定手机号 : {{wholeUser.phone_number||'未绑定'}}</span>
            </div>
            <div class="qr-code" @click.stop="qrcodePopup=true">
              <img src="../../assets/img/miniProgramMe/zw_ico_qrcode_white.png" />
            </div>
          </div>
      </div>
      </div> 
    </div>
    <div class="setting-wrap">
      <div class="tab-wrap"> 
        <div class="item" @click="pageTo('/oneChatList')" data-url="https://twx.zhijiashare.com/#/oneChatList"> 
            <div class="left"> 
              <img src="../../assets/img/miniProgramMe/tab_ico_dt_sel.png" class="img-left">
              <div class="span-wrap"> 
                <span>动态</span> 
              </div> 
            </div> 
            <div class="right"> 
              <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right">
            </div> 
        </div> 
        <div class="item" @click="pageTo('/miniChat')" data-url="https://twx.zhijiashare.com/#/miniChat"> 
            <div class="left"> 
              <img src="../../assets/img/miniProgramMe/zjxcx_ico_hyll.png" class="img-left">
              <div class="span-wrap"> 
                <span>好友聊一聊</span> 
              </div> 
            </div> 
            <div class="right"> 
              <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right">
            </div> 
        </div> 
        <div class="item" @click="pageTo('/communityWalkList')" data-url="https://twx.zhijiashare.com/#/orgCommunityList"> 
            <div class="left"> 
              <img src="../../assets/img/miniProgramMe/zjxcx_ico_zqgg.png" class="img-left">
              <div class="span-wrap"> 
                <span>社区逛一逛</span> 
              </div> 
            </div> 
            <div class="right"> 
              <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right">
            </div> 
        </div> 
        <div class="item" @click="pageTo('/nearObject')" data-url=""> 
            <div class="left"> 
              <img src="../../assets/img/miniProgramMe/zjxcx_ico_zwss.png" class="img-left">
              <div class="span-wrap"> 
                <span>智物扫一扫</span> 
              </div> 
            </div> 
            <div class="right"> 
              <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right">
            </div> 
        </div> 
        <div class="item" @click="pageTo('/')" data-url="https://twx.zhijiashare.com/#/"> 
            <div class="left"> 
              <img src="../../assets/img/miniProgramMe/zjxcx_ico_fxd.png" class="img-left">
              <div class="span-wrap"> 
                <span>爱分享购-省钱赚钱</span> 
              </div> 
            </div> 
            <div class="right"> 
              <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right">
            </div> 
        </div> 
      </div> 
      <div class="tab-wrap"> 
        <div class="item" @click="pageTo('/tuDing')" data-url=""> 
            <div class="left"> 
              <img src="../../assets/img/miniProgramMe/zjxcx_ico_td.png" class="img-left">
              <div class="span-wrap"> 
                <span>图钉-分享快乐生活点滴...</span> 
              </div> 
            </div> 
            <div class="right"> 
              <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right">
            </div> 
        </div> 
        <div class="item" @click="pageTo('/everybodyWatch')" data-url=""> 
            <div class="left"> 
              <img src="../../assets/img/miniProgramMe/zjxcx_ico_djdzk.png" class="img-left">
              <div class="span-wrap"> 
                <span>好友都在看</span> 
              </div> 
            </div> 
            <div class="right"> 
              <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right">
            </div> 
        </div> 
      </div> 
      <div class="tab-wrap"> 
        <div class="item" @click="pageTo('/zhiBo')" data-url=""> 
            <div class="left"> 
              <img src="../../assets/img/miniProgramMe/zjxcx_ico_ykzb.png" class="img-left">
              <div class="span-wrap"> 
                <span>云客智播</span> 
              </div> 
            </div> 
            <div class="right"> 
              <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right">
            </div> 
        </div> 
        <div class="item" @click="pageTo('/myActivityList')" data-url=""> 
            <div class="left"> 
              <img src="../../assets/img/miniProgramMe/zjxcx_ico_xqhd.png" class="img-left">
              <div class="span-wrap"> 
                <span>兴趣活动</span> 
              </div> 
            </div> 
            <div class="right"> 
              <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right">
            </div> 
        </div> 
        <div class="item" @click="goWishTree" data-url=""> 
            <div class="left"> 
              <img src="../../assets/img/miniProgramMe/zjxcx_ico_wishtree.png" class="img-left">
              <div class="span-wrap"> 
                <span>许愿树</span> 
              </div> 
            </div> 
            <div class="right"> 
              <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right">
            </div> 
        </div> 
      </div> 
      <div class="tab-wrap"> 
        <div class="item" @click="pageTo('/receivePayment')" data-url="https://twx.zhijiashare.com/#/receivePayment"> 
            <div class="left"> 
              <img src="../../assets/img/miniProgramMe/zjxcx_ico_sfk.png" class="img-left">
              <div class="span-wrap"> 
                <span>优惠支付</span> 
              </div> 
            </div> 
            <div class="right"> 
              <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right">
            </div> 
        </div> 
        <div class="item" @click="pageTo('/shoppingCar')" data-url="https://twx.zhijiashare.com/#/shoppingCar"> 
            <div class="left"> 
              <img src="../../assets/img/miniProgramMe/zjxcx_ico_gwc.png" class="img-left">
              <div class="span-wrap"> 
                <span>购物车</span> 
              </div> 
            </div> 
            <div class="right"> 
              <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right">
            </div> 
        </div> 
        <div class="item" @click="pageTo('/myCard')" data-url>
          <div class="left">
            <img src="../../assets/img/miniProgramMe/zjxcx_ico_kb.png" class="img-left" />
            <div class="span-wrap">
              <span>卡包</span>
            </div>
          </div>
          <div class="right">
            <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right" />
          </div>
        </div>
      </div> 
      <div class="tab-wrap tab-bottom"> 
        <div class="item" @click="pageTo('/setting')" data-url=""> 
          <div class="left"> 
            <img src="../../assets/img/miniProgramMe/zjxcx_ico_sz.png" class="img-left">
            <div class="span-wrap"> 
              <span>设置</span> 
            </div> 
          </div> 
          <div class="right"> 
            <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right">
          </div> 
        </div> 
      </div>
    </div>
    <van-popup v-model="qrcodePopup" :lazy-render="false">
      <div style="background: #fff;width:240px;height:270px;padding: 20px;" class="mybox">
        <div class="qr_qrcode_image">
          <div
            style="width: 240px;height: 240px;position: relative;"
            id="qrcode"
            ref="qrcode"
            class="er_qr_image"
          ></div>
          <div class="qr_qrcode_logo">
            <img src="../../assets/img/pub/pub_default_shop_img.png" width="50" height="50" />
          </div>
        </div>
        <span style="margin-top: 10px;">智加扫我，聊一聊</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getCurrentRole } from "../api/friendApi";
import { usersMe } from "../api/zhiRoleApi";
import { checkLoginTime } from "../../assets/js/utils";
import properties from "../../../config/properties.js";
import { pageToWishTree } from "../../assets/js/list"

export default {
  data() {
    return {
      currentUser: {},
      wholeUser: {},
      checkUser: {},
      qrcodePopup: false
    };
  },
  mounted() {
   
  },
  methods: {
    //获取当前账号的信息
    getCurrentUser() {
      getCurrentRole(res => {
        this.currentUser = res;
        console.log(res, "当前用户");
        this.createQrImage();
      });
      usersMe(response => {
        this.wholeUser = response;
        console.log(response, "完整用户");
      });
      var val = checkLoginTime();
      this.checkUser = val;
      console.log(val, "检测用户");
    },
    createQrImage() {
      console.log("11");
      let qrtext = properties.shortAPI + "/i/r#" + this.currentUser.id;
      this.$refs.qrcode.innerHTML = "";
      let QRCode = this.QRCode;
      let qrcode = new QRCode("qrcode", {
        width: 240,
        height: 240,
        correctLevel: QRCode.CorrectLevel.H,
        // text: qrtext
        text: "https://www.baidu.com/"
      });
    },
    goWishTree() {
        window.location.href = 'https://api.zhijiashare.com/wxapi/WXAuthorization?returnUrl=http://zjfx.vip/wishtree/index.html?treeId=2c92e53e6f882efb016fc6036af3069d'
      },
  },
  activated: function() {
    //获取当前账号信息
    this.getCurrentUser();
  }
};
</script>

<style scoped lang="scss">
.container-wrap {
  background-color: #ebebeb;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}
.head-wrap {
  background-color: #3298ff;
  padding: 32px 0 18px 0;
}

.head-button {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
.head-button .avatar-wrap {
  margin-left: 12px;
  margin-right: 6px;
}
.head-button .avatar {
  height: 64px;
  width: 64px;
  border-radius: 10px;
  vertical-align: bottom;
}
.head-button .information-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 6px 0;
  color: #fff;
  width: 100%;
}
.information-wrap .phone {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.phone img {
  width: 10px;
  height: 10px;
  margin-right: 25px;
}
.name {
  // width: 400px;
  font-size: 21px;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.phone span {
  font-size: 12px;
}
.tab-wrap {
  margin-top: 0.26rem;
}
.tab-wrap:last-of-type {
  margin-bottom: 44px;
}
.item {
  box-sizing: border-box;
  border-bottom: 0.5px solid #ebebeb;
  background-color: #fff;
  height: 0.88rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item:nth-last-of-type(1) {
  border: none;
}
.item .left {
  display: flex;
  align-items: center;
}
.item .img-left {
  width: 25px;
  height: 25px;
  margin-left: 12px;
  margin-right: 6px;
}
.item .img-right {
  width: 18px;
  height: 18px;
  margin-right: 13px;
}
.item .span-wrap {
  font-size: 14px;
}

.qr_qrcode_image {
  background-color: #fff;
  position: relative;
}

/* 二维码图片 */
#qrcode {
  background-color: #fff;
  width: 120px;
  height: 120px;
}

.qr_qrcode_logo {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  padding: 3px;
  background-color: #fff;
  top: 95px;
  left: 95px;
  position: absolute;
}

.qr_qrcode_logo img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.mybox {
  display: -webkit-flex;
  flex-direction: column;
  -webkit-align-items: center;
  justify-content: center;
}
</style>
