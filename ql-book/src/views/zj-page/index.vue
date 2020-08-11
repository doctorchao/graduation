<template>
	<div class="container-wrap">
    <!-- <div v-if="!isLogin"> -->
      <!-- 用户 openid  -->
      <!-- <div class="userinfo">
        <button open-type="getUserInfo" bindgetuserinfo="onGetUserInfo" class="userinfo-avatar" style="background-image:  url({{avatarUrl}})" size="default"></button>
      </div> -->

      <!-- 名称 -->
      <!-- <div class="name-container">
        <text class="name">{{userName}}</text>
      </div>
    </div> -->

    <!-- <div wx:else> -->
      <div class="head-wrap"> 
        <div class="avatar-wrap"> 
          <img class="avatar" :src="avatarUrl"></img> 
        </div> 
        <div class="information-wrap"> 
          <div class="name"> 
            <text>{{userName}}</text> 
          </div> 
          <div class="phone"> 
            <div> 
              <text>绑定手机号 : {{text}}</text> 
            </div> 
            <div class="qr-code" bindtap="larger"> 
              <image src="../../images/tabBar/zw_ico_qrcode_white.png"></image>
            </div> 
          </div> 
        </div> 
      </div> 
      <div class="tab-wrap"> 
        <div class="item" bindtap="jump" data-url="https://twx.zhijiashare.com/#/friendList"> 
            <div class="left"> 
              <image src="../../images/tabBar/zjxcx_ico_hyll.png" class="img-left"></image>
              <div class="text-wrap"> 
                <text>好友聊一聊</text> 
              </div> 
            </div> 
            <div class="right"> 
              <image src="../../images/tabBar/qianjin.png" class="img-right"></image>
            </div> 
        </div> 
        <div class="item" bindtap="jump" data-url="https://twx.zhijiashare.com/#/orgCommunityList"> 
            <div class="left"> 
              <image src="../../images/tabBar/zjxcx_ico_zqgg.png" class="img-left"></image>
              <div class="text-wrap"> 
                <text>社区逛一逛</text> 
              </div> 
            </div> 
            <div class="right"> 
              <image src="../../images/tabBar/qianjin.png" class="img-right"></image>
            </div> 
        </div> 
        <div class="item" bindtap="jump" data-url=""> 
            <div class="left"> 
              <image src="../../images/tabBar/zjxcx_ico_zwss.png" class="img-left"></image>
              <div class="text-wrap"> 
                <text>智物扫一扫</text> 
              </div> 
            </div> 
            <div class="right"> 
              <image src="../../images/tabBar/qianjin.png" class="img-right"></image>
            </div> 
        </div> 
        <div class="item" bindtap="jump" data-url="https://twx.zhijiashare.com/#/"> 
            <div class="left"> 
              <image src="../../images/tabBar/zjxcx_ico_fxd.png" class="img-left"></image>
              <div class="text-wrap"> 
                <text>爱分享购-省钱赚钱</text> 
              </div> 
            </div> 
            <div class="right"> 
              <image src="../../images/tabBar/qianjin.png" class="img-right"></image>
            </div> 
        </div> 
      </div> 
      <div class="tab-wrap"> 
        <div class="item" bindtap="jump" data-url=""> 
            <div class="left"> 
              <image src="../../images/tabBar/zjxcx_ico_td.png" class="img-left"></image>
              <div class="text-wrap"> 
                <text>图钉</text> 
              </div> 
            </div> 
            <div class="right"> 
              <image src="../../images/tabBar/qianjin.png" class="img-right"></image>
            </div> 
        </div> 
        <div class="item" bindtap="jump" data-url=""> 
            <div class="left"> 
              <image src="../../images/tabBar/zjxcx_ico_djdzk.png" class="img-left"></image>
              <div class="text-wrap"> 
                <text>好友都在看</text> 
              </div> 
            </div> 
            <div class="right"> 
              <image src="../../images/tabBar/qianjin.png" class="img-right"></image>
            </div> 
        </div> 
      </div> 
      <div class="tab-wrap"> 
        <div class="item" bindtap="jump" data-url=""> 
            <div class="left"> 
              <image src="../../images/tabBar/zjxcx_ico_ykzb.png" class="img-left"></image>
              <div class="text-wrap"> 
                <text>云客智播</text> 
              </div> 
            </div> 
            <div class="right"> 
              <image src="../../images/tabBar/qianjin.png" class="img-right"></image>
            </div> 
        </div> 
        <div class="item" bindtap="jump" data-url=""> 
            <div class="left"> 
              <image src="../../images/tabBar/zjxcx_ico_xqhd.png" class="img-left"></image>
              <div class="text-wrap"> 
                <text>兴趣活动</text> 
              </div> 
            </div> 
            <div class="right"> 
              <image src="../../images/tabBar/qianjin.png" class="img-right"></image>
            </div> 
        </div> 
      </div> 
      <div class="tab-wrap"> 
        <div class="item" bindtap="jump" data-url="https://twx.zhijiashare.com/#/receivePayment"> 
            <div class="left"> 
              <image src="../../images/tabBar/zjxcx_ico_sfk.png" class="img-left"></image>
              <div class="text-wrap"> 
                <text>优惠支付</text> 
              </div> 
            </div> 
            <div class="right"> 
              <image src="../../images/tabBar/qianjin.png" class="img-right"></image>
            </div> 
        </div> 
        <div class="item" bindtap="jump" data-url="https://twx.zhijiashare.com/#/shoppingCar"> 
            <div class="left"> 
              <image src="../../images/tabBar/zjxcx_ico_gwc.png" class="img-left"></image>
              <div class="text-wrap"> 
                <text>购物车</text> 
              </div> 
            </div> 
            <div class="right"> 
              <image src="../../images/tabBar/qianjin.png" class="img-right"></image>
            </div> 
        </div> 
      </div> 
      <div class="tab-wrap"> 
        <div class="item" bindtap="jump" data-url=""> 
            <div class="left"> 
              <image src="../../images/tabBar/zjxcx_ico_sz.png" class="img-left"></image>
              <div class="text-wrap"> 
                <text>关于</text> 
              </div> 
            </div> 
            <div class="right"> 
              <image src="../../images/tabBar/qianjin.png" class="img-right"></image>
            </div> 
        </div> 
      </div> 
    <!-- </div> -->
  </div>
</template>

<script>
import {Header,Toast} from 'mint-ui'
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
		changeavatar (url) {
			
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
@import './information.scss';
</style>
