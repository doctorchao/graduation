<template>
	<div class="container-wrap">
    <!-- <div v-if="!isLogin"> -->
      <!-- 用户 openid  -->
      <!-- <div class="userinfo">
        <button open-type="getUserInfo" bindgetuserinfo="onGetUserInfo" class="userinfo-avatar" style="background-img:  url({{avatarUrl}})" size="default"></button>
      </div> -->

      <!-- 名称 -->
      <!-- <div class="name-container">
        <span class="name">{{userName}}</span>
      </div>
    </div> -->

    <!-- <div wx:else> -->
      <div class="head-wrap"> 
        <div class="avatar-wrap"> 
          <img class="avatar" src="../../assets/zw_ico_qrcode_white.png"> 
        </div> 
        <div class="information-wrap"> 
          <div class="name"> 
            <span>{{'红江农场燕子'}}</span> 
          </div> 
          <div class="phone"> 
            <div> 
              <span>绑定手机号 : {{18874702259}}</span> 
            </div> 
            <div class="qr-code"> 
              <img src="../../assets/zw_ico_qrcode_white.png">
            </div> 
          </div> 
        </div> 
      </div> 
      <div class="setting-wrap">
        <div class="tab-wrap"> 
          <div class="item" @click="jump" data-url="https://twx.zhijiashare.com/#/friendList"> 
              <div class="left"> 
                <img src="../../assets/zjxcx_ico_hyll.png" class="img-left">
                <div class="span-wrap"> 
                  <span>好友聊一聊</span> 
                </div> 
              </div> 
              <div class="right"> 
                <img src="../../assets/qianjin.png" class="img-right">
              </div> 
          </div> 
          <div class="item" @click="jump" data-url="https://twx.zhijiashare.com/#/orgCommunityList"> 
              <div class="left"> 
                <img src="../../assets/zjxcx_ico_zqgg.png" class="img-left">
                <div class="span-wrap"> 
                  <span>社区逛一逛</span> 
                </div> 
              </div> 
              <div class="right"> 
                <img src="../../assets/qianjin.png" class="img-right">
              </div> 
          </div> 
          <div class="item" @click="jump" data-url=""> 
              <div class="left"> 
                <img src="../../assets/zjxcx_ico_zwss.png" class="img-left">
                <div class="span-wrap"> 
                  <span>智物扫一扫</span> 
                </div> 
              </div> 
              <div class="right"> 
                <img src="../../assets/qianjin.png" class="img-right">
              </div> 
          </div> 
          <div class="item" @click="jump" data-url="https://twx.zhijiashare.com/#/"> 
              <div class="left"> 
                <img src="../../assets/zjxcx_ico_fxd.png" class="img-left">
                <div class="span-wrap"> 
                  <span>爱分享购-省钱赚钱</span> 
                </div> 
              </div> 
              <div class="right"> 
                <img src="../../assets/qianjin.png" class="img-right">
              </div> 
          </div> 
        </div> 
        <div class="tab-wrap"> 
          <div class="item" @click="jump" data-url=""> 
              <div class="left"> 
                <img src="../../assets/zjxcx_ico_td.png" class="img-left">
                <div class="span-wrap"> 
                  <span>图钉</span> 
                </div> 
              </div> 
              <div class="right"> 
                <img src="../../assets/qianjin.png" class="img-right">
              </div> 
          </div> 
          <div class="item" @click="jump" data-url=""> 
              <div class="left"> 
                <img src="../../assets/zjxcx_ico_djdzk.png" class="img-left">
                <div class="span-wrap"> 
                  <span>好友都在看</span> 
                </div> 
              </div> 
              <div class="right"> 
                <img src="../../assets/qianjin.png" class="img-right">
              </div> 
          </div> 
        </div> 
        <div class="tab-wrap"> 
          <div class="item" @click="jump" data-url=""> 
              <div class="left"> 
                <img src="../../assets/zjxcx_ico_ykzb.png" class="img-left">
                <div class="span-wrap"> 
                  <span>云客智播</span> 
                </div> 
              </div> 
              <div class="right"> 
                <img src="../../assets/qianjin.png" class="img-right">
              </div> 
          </div> 
          <div class="item" @click="jump" data-url=""> 
              <div class="left"> 
                <img src="../../assets/zjxcx_ico_xqhd.png" class="img-left">
                <div class="span-wrap"> 
                  <span>兴趣活动</span> 
                </div> 
              </div> 
              <div class="right"> 
                <img src="../../assets/qianjin.png" class="img-right">
              </div> 
          </div> 
        </div> 
        <div class="tab-wrap"> 
          <div class="item" @click="jump" data-url="https://twx.zhijiashare.com/#/receivePayment"> 
              <div class="left"> 
                <img src="../../assets/zjxcx_ico_sfk.png" class="img-left">
                <div class="span-wrap"> 
                  <span>优惠支付</span> 
                </div> 
              </div> 
              <div class="right"> 
                <img src="../../assets/qianjin.png" class="img-right">
              </div> 
          </div> 
          <div class="item" @click="jump" data-url="https://twx.zhijiashare.com/#/shoppingCar"> 
              <div class="left"> 
                <img src="../../assets/zjxcx_ico_gwc.png" class="img-left">
                <div class="span-wrap"> 
                  <span>购物车</span> 
                </div> 
              </div> 
              <div class="right"> 
                <img src="../../assets/qianjin.png" class="img-right">
              </div> 
          </div> 
        </div> 
        <div class="tab-wrap"> 
          <div class="item" @click="jump" data-url=""> 
              <div class="left"> 
                <img src="../../assets/zjxcx_ico_sz.png" class="img-left">
                <div class="span-wrap"> 
                  <span>关于</span> 
                </div> 
              </div> 
              <div class="right"> 
                <img src="../../assets/qianjin.png" class="img-right">
              </div> 
          </div> 
        </div> 
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import {Header,Toast} from 'mint-ui'
// import 'amfe-flexible/index'
export default {
	name:'zj-page',
	components: {
		Header
	},
	data () {
		return {
			
		}
	},
	methods: {
		jump (url) {
			console.log('点击了')
      }
      
		},
	computed: {
    
	},
	created () {
    
	}
}
// 15869937451
</script>

<style scoped lang='scss'>
@import './index.scss';
</style>
