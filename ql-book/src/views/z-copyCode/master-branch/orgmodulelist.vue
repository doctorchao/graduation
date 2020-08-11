<template>
  <div class="sl_container" id="scrollDiv">
    <div class="topDiv">


        <van-nav-bar :left-text="groupInfo.dwZuName" v-if="showNavBar" left-arrow @click-left="pageBack()" style="background-color: #3297FF;">
          <div slot="right">
            <img src="../../assets/img/pub/pub_ico_soubai.png" class="rightSearchIcon" @click="pageTo('/communityList')" />
            <img src="../../assets/img/pub/pub_ico_more_white.png" class="rightHeadIcon" @click="headBtnFlag = true" />
          </div>
        </van-nav-bar>

      <!-- <van-nav-bar :left-text="groupInfo.dwZuName" left-arrow @click-left="pageBack()" style="background-color: #3297FF;">
        <div slot="right">
          <img src="../../assets/img/pub/pub_ico_soubai.png" class="rightSearchIcon" @click="pageTo('/communityList')" />
          <img src="../../assets/img/pub/pub_ico_more_white.png" class="rightHeadIcon" @click="headBtnFlag = true" />
        </div>
      </van-nav-bar> -->

      <marquee direction="left" class="stripe" scrollamount="2">
        <span class="residentNum">居民{{numMap.residentNum}}</span>
        <span class="fansNum">粉丝{{numMap.fansNum}}</span>
        <span class="touristNum">游客{{numMap.touristNum}}</span>
        <span>
          社区公告：
          <template v-if="groupInfo.dwZuNotice">
            {{groupInfo.dwZuNotice}}
          </template>
          <template v-else>
            欢迎大家来到{{groupInfo.dwZuName}}
          </template>
        </span>
      </marquee>

      <!-- 跳转的图片列表 -->
      <commonModules :orgId="orgInfo.id" :groupId="groupInfo.id" :friendFlag="friendFlag? true : false" @friendFunction="friendFunction" />
    </div>

    <div class="content" :style="checkWxDev() ? 'margin-bottom:100px' : ''">
      <van-pull-refresh v-model="refresh" @refresh="onRefresh">
        <!-- <van-list @load="loadRelease" v-model="loading" :finished="finished"> -->
        <div v-for="(message,index) in messageList" :key="index">
          <van-row>
            <!-- 左侧 -->
            <van-col span="3">
              <template v-if="message.from != userInfo.useruuid">
                <template v-if="message.photo">
                  <img class="header" :src="message.photo" @click="goRoleDetail(message.roleId)" />
                </template>
                <template v-else>
                  <img class="header" src="https://python-server.oss-cn-shenzhen.aliyuncs.com/app_mrtx_role.png" />
                </template>
              </template>
            </van-col>
            <!-- 中间 -->
            <van-col span="18">
              <!-- 自定义消息但不是红包 -->
              <template v-if="message.type == 'TIMCustomElem' && message.data.mesgType != '6001'">
                <div class="msgShareDiv" @click="goUrl(message.data)">
                  <div class="shareTitleDiv">
                    <div class="shareTitle">{{message.data.title}}</div>
                    <div class="shareAdertisement">{{message.data.desc}}</div>
                    <div class="shareHeader">
                      <template v-if="message.data.header">
                        <img :src="message.data.header" />
                      </template>
                      <template v-else>
                        <img src="../../assets/img/pub/app_mrtx_zj.png" />
                      </template>
                    </div>
                  </div>
                  <div class="shareBottom">
                    <div class="shareBottomImgDiv">
                      <img src="../../assets/img/pub/app_mrtx_zj.png" />
                    </div>
                    <div class="orgName">智加分享</div>
                  </div>
                </div>
              </template>

              <!-- 红包 -->
              <template v-else-if="message.type == 'TIMCustomElem' && message.data.mesgType == '6001'">
                <div class="redPackageDiv" @click="clickRedPackage(message)">
                  <template v-if="message.from != userInfo.useruuid">
                    <template v-if="!message.receiveFlag">
                      <img src="../../assets/img/pub/hongbao_bg_pp_left_nor.png" />
                    </template>
                    <template v-else>
                      <img src="../../assets/img/pub/hongbao_bg_pp_left_sel.png" />
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="!message.receiveFlag">
                      <img src="../../assets/img/pub/hongbao_bg_pp_right_nor.png" />
                    </template>
                    <template v-else>
                      <img src="../../assets/img/pub/hongbao_bg_pp_right_sel.png" />
                    </template>
                  </template>
                  <div class="redContentDiv">
                    <div class="redContentText">{{message.data.remark}}</div>
                    <div class="redReceiveText">
                      <template v-if="!message.receiveFlag">未领取</template>
                      <template v-else-if="message.overdue">{{message.redData.timeOffSet}}</template>
                      <template v-else>已领取</template>
                    </div>
                  </div>
                  <div class="redBottomDiv">
                    智加分享-地图红包
                  </div>
                </div>
              </template>

              <!-- 地图消息 -->
              <template v-else-if="message.type == 'TIMLocationElem'">
                <div class="mapDiv">
                  <div class="address">{{message.description}}</div>
                  <baidu-map class="map" :center="message.position" :zoom="15" style="height: 100px;">
                    <bm-marker :position="message.position" :dragging="false" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
                  </baidu-map>
                  <div class="mapProp" @click="goPointMap(message)"></div>
                </div>
              </template>

              <!-- 普通消息或者图片 -->
              <template v-else>
                <div :class="message.from == userInfo.useruuid ? 'rightIconDiv' : 'leftIconDiv'">
                  <template v-if="message.type == 'TIMTextElem'">
                    <div class="contentDiv" :class="message.from == userInfo.useruuid ? 'rightIconContent': 'leftIconContent'" v-html="message.msg"></div>
                  </template>
                  <template v-if="message.type == 'TIMImageElem'">
                    <div class="contentDiv contentImgDiv" :class="message.from == userInfo.useruuid ? 'rightIconContent': 'leftIconContent'"
                      @click="showImg(message.imageList[0].imageUrl)">
                      <img :src="message.imageList[0].imageUrl" />
                      <template v-if="message.loading">
                        <div class="imgProp">上传中</div>
                      </template>
                    </div>
                  </template>
                </div>
              </template>
            </van-col>

            <!-- 右侧 -->
            <van-col span="3">
              <template v-if="message.from == userInfo.useruuid">
                <template v-if="message.photo">
                  <img class="header" :src="message.photo" @click="goRoleDetail(message.roleId)" />
                </template>
                <template v-else>
                  <img class="header" src="https://python-server.oss-cn-shenzhen.aliyuncs.com/app_mrtx_role.png" />
                </template>
              </template>
            </van-col>
          </van-row>
        </div>
      </van-pull-refresh>
    </div>


    <template v-if="headBtnFlag">
      <div class="chatRoomDiv" :style="checkWxDev() ? 'bottom:85px':''">
        <!-- <div class="topImg">
          <img src="../../assets/img/pub/apptop_bg_tchj_w.png" />
        </div> -->
        <div class="whiteDiv">
          <!-- <div @click="headBtnFlag = false;wxShowTips()">
            <img src="../../assets/img/shopDetail/rightshare_ico_wx.png" />
            <div>分享给微信好友</div>
          </div>
          <div @click="headBtnFlag = false;goFriendShare()">
            <img src="../../assets/img/shopDetail/rightshare_ico_zj.png" />
            <div>分享给智加好友</div>
          </div> -->
          <div @click="headBtnFlag = false;pageTo('/communityWalkList')">
            <img src="../../assets/img/shopDetail/rightshare_ico_zj.png" />
            <div>更多Z社区</div>
          </div>
          <div @click="headBtnFlag = false;goShare()">
            <img src="../../assets/img/pub/pub_ico_shq.png" />
            <div>分享</div>
          </div>
          <!-- <div @click="headBtnFlag = false;pageTo('/chatRoomSetting/' + groupInfo.id + '/' + orgInfo.id)">
            <img src="../../assets/img/pub/pub_ico_shezhi.png" />
            <div>设置/二维码</div>
          </div> -->
          <!-- <template v-if="!friendFlag&&isHide">
            <div @click="wxCollect">
              <img src="../../assets/img/pub/pub_ico_shq.png" />
              <div>添加到微信收藏</div>
            </div>
          </template> -->
          <!-- <template v-else>
            <div @click="delfriendrole(); headBtnFlag = false">
              <img src="../../assets/img/pub/pub_ico_jchfriend.png" />
              <div>删除好友</div>
            </div>
          </template> -->
          <template v-if="!focusFlag">
            <div @click="danwencon(); headBtnFlag = false">
              <img src="../../assets/img/pub/pub_ico_gzzq_nor.png" />
              <div>关注社区</div>
            </div>
          </template>
          <template v-else>
            <div @click="danwencon(); headBtnFlag = false">
              <img src="../../assets/img/pub/pub_ico_gzzq_sel.png" />
              <div>已关注</div>
            </div>
          </template>
          <template v-if="!resident">
            <div @click="applyIntoGroupByOrgId(); headBtnFlag = false">
              <img src="../../assets/img/pub/pub_ico_zqzm_nor.png" />
              <div>申请成为居民</div>
            </div>
          </template>
          <template v-else>
            <div>
              <img src="../../assets/img/pub/pub_ico_zqzm_sel.png" />
              <div>已是居民</div>
            </div>
          </template>
          <div @click="headBtnFlag = false;pageTo('/chatRoomSetting/' + groupInfo.id + '/' + orgInfo.id)">
            <img src="../../assets/img/pub/pub_ico_shezhi.png" />
            <div>设置</div>
          </div>
          <!-- <div @click="headBtnFlag = false;focusThePublic()">
            <img src="../../assets/img/pub/pub_ico_gzzq.png" />
            <div>关注公众号</div>
          </div> -->
          <!-- <template v-if="!iosFlag">
            <div @click="headBtnFlag = false;downloadApp()">
              <img src="../../assets/img/pub/pub_ico_xiazai.png" />
              <div>下载APP</div>
            </div>
          </template> -->
        </div>
      </div>
      <div class="prop" @click="headBtnFlag = false"></div>
    </template>
    <div class="buttomDiv" :style="checkWxDev() ? 'bottom:40px' : isIos?'bottom:70px':''  " @click="fileBtnFlag = false">
      <div class="bottomBtnDiv">
        <template v-if="bottomBtnFlag">
          <van-row>
            <van-col span="3" class="oneFour">
              <img src="../../assets/img/pub/talk_ioc_0jianpan_sel.png" @click="bottomBtnFlag = false" />
            </van-col>
            <van-col span="9" class="centerDiv">
              <div @click="toDwDetail()">去团队看看</div>
            </van-col>
            <van-col span="9" class="centerDiv">
              <template v-if="isBusinessStreet">
                <div @click="goBusinessStreet()">到商业街逛逛</div>
              </template>
              <template v-else>
                <div @click="goShop()">到福利社逛逛</div>
              </template>
            </van-col>
            <van-col span="3" class="oneFour">
              <img src="../../assets/img/pub/pub_ico_more.png" @click="headBtnFlag = true" />
            </van-col>
          </van-row>
        </template>
        <template v-else>
          <van-row>
            <van-col span="3" style="border-right: 0.5px solid #D2D2D2;" class="oneFour">
              <img src="../../assets/img/pub/talk_ioc_0menu_sel.png" @click="bottomBtnFlag = true" />
            </van-col>
            <!-- <van-col span="3">
              <img src="../../assets/img/pub/talk_ico_0yuyin_nor.png" @click="notSupport()" />
            </van-col> -->
            <van-col span="18">
              <div style="padding: 5px;">
                <van-field v-model="message" @keyup="changeIcon()" @input="changeIcon()"
                style="padding: 5px;border-radius: 5px;background-color: #F3F3F3;border-bottom: 0.5px solid #95999C;"
                rows="1" :autosize="{maxHeight:72}" type="textarea"/>
              </div>
            </van-col>
            <!-- <van-col span="3">
              <img src="../../assets/img/pub/talk_ico_0biaoqing_nor.png" />
            </van-col> -->
            <van-col span="3" class="oneFour">
              <template v-if="addBtnFlag">
                <img src="../../assets/img/pub/talk_ico_0gengduo_nor.png" @click.stop="fileBtnFlag = true" />
              </template>
              <template v-else>
                <div class="sendBtn" @click="sendMsg()">发送</div>
              </template>
            </van-col>
          </van-row>
        </template>
      </div>
      <template v-if="fileBtnFlag">
        <div class="fileBtn">
          <van-row>
            <van-col span="6">
              <div @click="wxUploadImg()">
                <img src="../../assets/img/pub/talk_ico_01xiangze_nor.png" />
                <div class="title">图片</div>
              </div>
            </van-col>
            <!-- <van-col span="6">
              <div @click="notSupport()">
                <img src="../../assets/img/pub/talk_ico_02paizhao_nor.png" />
                <div class="title">拍摄</div>
              </div>
            </van-col>
            <van-col span="6">
              <div @click="notSupport()">
                <img src="../../assets/img/pub/talk_ico_03shipintonghua_nor.png" />
                <div class="title">火视频</div>
              </div>
            </van-col> -->
            <van-col span="6">
              <div @click="sendRedPackage()">
                <img src="../../assets/img/pub/talk_ico_05dthb_sel.png" />
                <div class="title">地图红包</div>
              </div>
            </van-col>
          </van-row>
        </div>
        <div class="prop1" @click="fileBtnFlag = false"></div>
      </template>
    </div>
    <van-popup v-model="qrcodeShow" @opened="createQrImage" position="center" :style="{width: '80%',maxHeight: '100%'}">
      <div @touchstart.prevent="showEditImage" @touchend="clearLoop" ref="ewmImage" class="se_ewm_wrap">
        <div class="se_ewm_main flex">
          <span class="se_em_title">欢迎扫描进我们的社区</span>
          <div class="se_ewm_image">
            <div id="qrcode2" ref="qrcode2"></div>
            <div class="se_ewm_logo">
              <img src="../../assets/img/pub/pub_default_shop_img.png" />
            </div>
          </div>
          <div class="se_shop_name">
            {{groupInfo.dwZuName}}
          </div>
        </div>
        <div class="se_bottom_image flex">
          <img src="../../assets/img/pub/logo_tu_zjiotshare.png" />
        </div>
      </div>
    </van-popup>
    <van-share-sheet v-model="showMore" title="分享到" :options="shareOptions" @select="onSelectShareOptions" cancel-text="取消分享" />

    <van-dialog v-model="friendFlagShow" :showConfirmButton="true" @confirm="addfriendrole()" @cancel="friendFlag=false"
      show-cancel-button cancel-button-text="返回" confirm-button-text="是的">
      <div style="font-size: 17px;padding: 30px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您确认要申请成为我们的VIP吗？</div>
    </van-dialog>
    <van-dialog v-model="cancelfriendFlagShow" :showConfirmButton="true" @confirm="delfriendrole()" @cancel="friendFlag=false"
      show-cancel-button cancel-button-text="返回" confirm-button-text="是的">
      <div style="font-size: 17px;padding: 30px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您确认要取消VIP吗？</div>
    </van-dialog>
    <van-dialog v-model="isFriendShow" :showConfirmButton="true" @confirm="isFriendShow = false" confirm-button-text="是的">
      <div style="font-size: 17px;padding: 30px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您已经是vip了!</div>
    </van-dialog>

    <!-- <div class="liveBroadDiv" :class="checkWxDev() ? 'bottom100' : ''">
      <img src="../../assets/img/pub/shareshop_ico_delete.png" class="cancelImg" />
      <img src="https://python-server.oss-cn-shenzhen.aliyuncs.com/function_ico_tuding.png" />
    </div> -->

    <input style="display: none;" ref="files" type='file' accept="image/*" name="files" id="files" />

    <van-popup v-model="imgFlag" position="right" style="width: 100%;background-color: rgba(0,0,0,0.3);">
      <template v-if="src.endsWith('.mp4')">
        <video :src="src" controls="controls" style="width: 100%;"></video>
      </template>
      <template v-else>
        <!-- <div style="display: table;">
          <div style="display: table-cell;vertical-align: middle;">

          </div>
        </div> -->
        <img v-lazy="src" style="width: 100%;max-height: 100%;object-fit: cover;" @click="imgFlag = false" />
      </template>
    </van-popup>

    <orgLuckStar :starFlag="starFlag"></orgLuckStar>

    <WxShareTips v-model="showWxTips" />

    <!-- 公众号图片 -->
    <van-popup v-model="publicFlag" style="width: 80%;">
      <div>
        <img src="../../assets/img/pub/qrcode_for_gh_6e8515ad2d67_1280.jpg" style="width: 100%;" />
      </div>
      <div class="thePublicWord">长按识别二维码，关注智加分享社区公众号</div>
    </van-popup>

    <!-- 红包模块 -->
    <van-popup v-model="redPackageShow" style="background-color: rgba(0,0,0,0);width: 70%;">
      <div class="redPackageModel" @click="receiveRedPackage(chooseData)">
        <img class="backImg" src="../../assets/img/pub/hongbao_bg_kai_01.png" />
        <div class="redPackageContent" align="center">
          <img :src="chooseData.senderHeader" />
          <div class="redPackageName">{{chooseData.title}}</div>
          <div class="sendUserName">{{chooseData.senderName}}</div>
        </div>
        <div class="redPackageBottom" @click.stop="goPackageReceive(chooseData.packageId)">查看其他人手气>></div>
      </div>
    </van-popup>

    <van-popup v-model="addColletFlag" @click="addColletFlag=false" style="background-color: rgba(0,0,0,0.3);width: 100%;height: 100%;">
      <div style="height: 100%;">
        <img style="width: 100%;" src="../../assets/img/pub/wx_open_gshq.png" @click="addColletFlag=false" />
      </div>
    </van-popup>
  </div>
</template>

<script>
  import ZjHead from '../../components/pub/NewHead'
  import pro from '../../../config/properties.js'
  import {
    groupGet
  } from "../api/detailApi.js"
  import {
    arefriends,
    addfriendrole
  } from '../api/detailApi'
  import {
    delfriendrole
  } from "../api/friendApi"
  import {
    checkLoginTime,
    sdkAppId,
    isIOSDev
  } from '../../assets/js/utils.js'
  import {
    yunim
  } from '../api/yunApi'
  import TIM from 'tim-js-sdk'
  import COS from 'cos-js-sdk-v5'
  import {
    getChatRoomByOrgIdAndRoomName,
    getChatRoomByOrgIdAndZuType,
    joinChatRoom,
    createChatRoom,
    getGroupDetails,
    checkGroupZuFocus,
    focusGroupZu,
    deleteGroupZuFocus,
    getGroupZuTypeNum,
    signOutChatRoom,
    getGroupAndOrgById,
    applyIntoGroupByOrgId,
    getGroupIdAndOrgIdByTypeAndId
  } from "../api/groupApi"
  import {
    current,
    uuidGetUserInfo,
    dwcon,
    dwcancelcon
  } from "../api/zhiChatRoomApi"
  import {
    sendChatRoomMsg
  } from "../api/sendMsgApi"
  import {
    namecardRoleids,
    danwencon
  } from "../api/zhiRoleApi"
  import {
    getMembers,
    getShangquanOrGuke
  } from "../api/groupApi"
  import {
    wxUploadImg,
    wxChooseImg,
    wxCollect
  } from "../../assets/js/wxJsInterface"
  import commonModules from "./component/commonModules"
  import {
    pageToOrg,
    pageToShareShop,
    downloadPage,
    pageToRole,
    pageToPage,
    // pageToLive
  } from "../../assets/js/list"
  import { pageTo } from '../../assets/js/utils';
  import orgLuckStar from "./component/orgLuckStar"
  import chatRoomSetting from "./chatRoomSetting"
  import WxShareTips from '../base/WxShareTips'
  import {
    checkWxDev,
    checkIosDev,
    checkWx
  } from "../../assets/js/utils"
  import {
    redPackageDetail,
    receiveRedPackage
  } from "../api/redPackageApi"
  import {
    getRoleById,
  } from '../api/detailApi'

  export default {
    data() {
      return {
        orgInfo: {},
        shopDetail: {},
        friendFlagShow: false,
        cancelfriendFlagShow: false,
        isFriendShow: false,
        friendFlag: false,
        bottomBtnFlag: true,
        message: "",
        addBtnFlag: true,
        yunUserID: "",
        yunUserSig: "",
        chatRoomConversationID: "",
        nextReqMessageID: "",
        tim: {},
        messageList: [],
        userInfo: "",
        finished: false,
        loading: true,
        refresh: true,
        refreshFlag: true,
        memberList: [],
        groupInfo: {},
        roleIdList: [],
        groupGetFlag: true,
        loading1: {},
        fileBtnFlag: false,
        headBtnFlag: false,
        loading1Flag: true,
        focusFlag: false,
        imgFlag: false,
        src: "",
        numMap: {
          "residentNum": 0,
          "fansNum": 0,
          "touristNum": 0
        },
        starFlag: false,
        fans: false,
        resident: false,
        settingFlag: true,
        showWxTips: false,
        iosFlag: false,
        publicFlag: false,
        isBusinessStreet: false,
        redPackageShow: false,
        chooseData: {},
        addColletFlag: false,
        isHide: true,
        showNavBar:false,
        isIos:isIOSDev(),
        showMore:false,
        shareOptions:[
          [
            { name: '智加', icon: 'poster' },
            { name: '微信', icon: 'wechat' },
            { name: '复制链接', icon: 'link' },
            { name: '二维码', icon: 'qrcode' },
          ]
        ],
        qrcodeShow: false,
      }
    },
    ///ios
    mounted() {
      this.showNav();
    },
    methods: {

      ///ios添加
      showNav(){
        if(window.webkit&& !checkWx())
        {
          this.showNavBar = true;
        }
      },
      /**
       * 去单位详情
       */
      toDwDetail() {
        let that = this;
        if (!that.orgInfo.id) {
          that.$toast("正在读取数据中...");
          return;
        }
        pageToOrg(that.orgInfo.id);
      },
      /**
       * 去店铺
       */
      goShop() {
        let that = this;
        if (!that.orgInfo.shopid) {
          that.$toast("正在读取数据中...");
          return;
        }
        pageToShareShop(that.orgInfo.shopid);
      },
      goShare(){
        let that = this;
        that.showMore = !that.showMore
      },
      onSelectShareOptions(data){
        let that = this
        console.log(data,'分享按钮')
        console.log(document.location.href,'路由链接')
        if ('微信' == data.name) {
          that.wxShowTips()
        } else if ('智加' == data.name) {
          that.goFriendShare()
        } else if ('复制链接' == data.name) {
          let that = this;
          var input = document.createElement('input');
          input.setAttribute('readonly', 'readonly');
          input.setAttribute('value', document.location.href);
          document.body.appendChild(input);
          input.select();
          input.setSelectionRange(0, 9999);
          document.execCommand('Copy');

          if (document.execCommand('Copy')) {
            // 复制成功
            that.$toast("复制成功");
            
          }
        } else if ('二维码' == data.name) {
          that.qrcodeShow = !that.qrcodeShow
        }
        that.showMore = !that.showMore
      },
      createQrImage() {
        let that = this;
        let QRCode = that.QRCode;
        this.$refs.qrcode2.innerHTML = '';
        let url = pro.shortAPI + "/i/v#" + that.id;
        let qrcode = new QRCode('qrcode2', {
          width: 200,
          height: 200,
          correctLevel: QRCode.CorrectLevel.H,
          text: url
        })
      },
      showEditImage() {
        let that = this;
        clearInterval(that.Loop);
        that.Loop = setTimeout(function() {
          that.showEdit = true;
        }, 1000);
      },
      clearLoop() {
        clearInterval(this.Loop);
      },
      //简略的方法
      getGroupIdAndOrgIdByTypeAndId() {
        let that = this;
        let params = new Object();
        params.type = that.type;
        params.id = that.id;
        params.token = checkLoginTime().access_token;
        params.roleA = checkLoginTime().role_id;
        getGroupIdAndOrgIdByTypeAndId(params, (res) => {
          if (res.code == 0) {
            that.getGroupAndOrgById();
            that.orgInfo.id = res.data.orgId;
            that.groupInfo.id = res.data.groupId;
            that.chatRoomConversationID = "GROUP" + that.groupInfo.id;
            localStorage.setItem("timTypeAndId", that.type + that.id);
            localStorage.setItem("timPageValue", JSON.stringify(res.data));
            that.namecardRoleids();
            setTimeout(function() {
              that.getMsgList();
            }, 300)
          } else {
            that.$toast.fail(res.msg);
          }
        })
      },
      /**
       * 根据type和id获取单位和组详情
       */
      getGroupAndOrgById() {
        let that = this;
        let params = new Object();
        params.type = that.type;
        params.id = that.id;
        params.token = checkLoginTime().access_token;
        params.roleA = checkLoginTime().role_id;
        getGroupAndOrgById(params, (res) => {
          if (res.code == 0) {
            that.getPageValue(res.data);
          } else {
            that.$toast.fail(res.msg);
          }
        })
      },
      getPageValue(data) {
        let that = this;
        that.orgInfo = data.org;
        that.groupInfo = data.group;
        that.memberList = that.groupInfo.members;
        that.numMap = data.numMap;
        that.friendFlag = data.friend;
        that.focusFlag = data.focus;
        that.fans = data.numMap.fans;
        that.resident = data.numMap.resident;
        that.isBusinessStreet = data.numMap.isBusinessStreet;

        console.log("groupInfoName");
        document.title = that.groupInfo.dwZuName;
      },
      /**
       * 加好友
       */
      addfriendrole() {
        const loading = this.$toast.loading({
          duration: 1500
        })
        addfriendrole(this.orgInfo.roleid + "/", {}, (res) => {
          loading.clear();
          console.log(res);
          if (res.status == 400) {
            console.log(res.data.msg);
            console.log(res.data.err);
            if (res.data.msg == "" || res.data.msg == null || res.data.msg == undefined) {
              this.$toast.fail(res.data.err);
              return;
            }
            this.$toast.fail(res.data.msg);
          } else {
            this.$toast("申请VIP成功");
          }
        })
      },
      /**
       * 取消好友
       */
      delfriendrole() {
        let that = this;
        const loading = this.$toast.loading({
          duration: 1500
        })
        delfriendrole(this.orgInfo.roleid, {}, (res) => {
          loading.clear();
          console.log(res);
          if (res.status == 400) {
            this.$toast.fail(res.data.msg);
          } else {
            this.$toast("取消VIP成功");
            // that.moduleList[4].name = "申请Vip";
            // that.moduleList[4].page = "applyVip";
            that.friendFlag = false;
          }
        })
      },
      /**
       * 判断关注群组
       */
      checkGroupZuFocus() {
        let that = this;
        let params = new Object();
        params.roleId = that.userInfo.id;
        params.groupId = that.groupInfo.id;
        checkGroupZuFocus(params, (res) => {
          if (res.code == 0) {
            that.focusFlag = res.data;
          } else {
            that.$toast.fail(res.data);
          }
        })
      },
      /**
       * 关注群组
       */
      // focusGroupZu() {
      //   let that = this;
      //   let params = new Object();
      //   params.roleId = that.userInfo.id;
      //   params.groupId = that.groupInfo.id;
      //   params.token = checkLoginTime().access_token;
      //   focusGroupZu(params, (res) => {
      //     if (res.code == 0) {
      //       that.focusFlag = true;
      //       that.$toast(res.data);
      //     } else {
      //       that.$toast.fail(res.msg);
      //     }
      //   })
      // },
      // /**
      //  * 取消关注群组
      //  */
      // deleteGroupZuFocus() {
      //   let that = this;
      //   let params = new Object();
      //   params.roleId = that.userInfo.id;
      //   params.groupId = that.groupInfo.id;
      //   params.token = checkLoginTime().access_token;
      //   deleteGroupZuFocus(params, (res) => {
      //     if (res.code == 0) {
      //       that.focusFlag = false;
      //       that.$toast(res.data);
      //     } else {
      //       that.$toast.fail(res.msg);
      //     }
      //   })
      // },
      /**
       * 三合一关注
       */
      danwencon(){
        let that = this;
        let params = new Object();
        params.dwId = that.orgInfo.id;
        danwencon(params, (res) => {
          if(res.concern){
            that.focusFlag = true;
            that.$toast("关注成功");
          }else{
            that.focusFlag = false;
            that.$toast("取消关注成功");
          }
        })
      },
      /**
       * 显示发送按钮
       */
      changeIcon() {
        let that = this;
        if (that.message.trim().length > 0) {
          that.addBtnFlag = false;
        } else {
          that.addBtnFlag = true;
        }
      },
      //云通讯
      /**
       * 获取云通讯登录信息
       */
      getIdentity() {
        let that = this;
        yunim({}, function(data) {
          // console.log(data);
          that.yunUserID = data.identifier;
          that.yunUserSig = data.sig;

          let timYunUser = new Object();
          timYunUser.identifier = data.identifier;
          timYunUser.sig = data.sig;
          localStorage.timToken = checkLoginTime().access_token;
          localStorage.timYunUser = JSON.stringify(timYunUser);

          that.getLogin();
        })
      },
      /**
       * 云通讯登录
       */
      getLogin() {
        let that = this;

        console.log("sdkAppId:" + sdkAppId())
        let options = {
          SDKAppID: sdkAppId()
        }

        let tim = TIM.create(options);
        tim.setLogLevel(1);
        tim.registerPlugin({
          'cos-js-sdk': COS
        });

        let login1 = tim.login({
          userID: that.yunUserID,
          userSig: that.yunUserSig
        });

        let a1 = {
          userID: that.yunUserID,
          userSig: that.yunUserSig
        };
        console.log(a1);
        console.log("用户登录");
        console.log(login1);


        login1.then(function(imResponse) {
          console.log(imResponse.data); // 登录成功
          if (imResponse.data == "重启消息通道") {
            window.location.reload();
          }
          if (imResponse.data.errorInfo.indexOf("已经登录") != "-1") {
            tim.logout();
            that.getLogin();
          }

          that.tim = tim;

          //如果被踢出
          let onKickedOut = function(event) {
            console.log(event.data.type); // mutipleAccount(同一设备，同一帐号，多页面登录被踢)
          };
          tim.on(TIM.EVENT.KICKED_OUT, onKickedOut);


          let onMessageReceived = function(event) {
            console.log(event);

            let messageList = event.data;

            let list = that.formatMsg(messageList);

            that.messageList = that.messageList.concat(list);
            console.log(that.messageList);
            //下滑到最底部
            that.scrollDown();
            // event.data - 存储 Message 对象的数组 - [Message]
          };

          tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);

          tim.on(TIM.EVENT.SDK_READY, function(event) {
            that.refreshFlag = false;

            // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
            // event.name - TIM.EVENT.SDK_READY
            if (!that.groupGetFlag) {
              return;
            }
            that.groupGetFlag = false;
            console.log("groupGet");


            let timTypeAndId = localStorage.timTypeAndId;
            if (timTypeAndId == (that.type + that.id)) {
              let timPageValue = localStorage.timPageValue;
              let pageValueJson = JSON.parse(timPageValue);
              that.getGroupAndOrgById();
              that.orgInfo.id = pageValueJson.orgId;
              that.groupInfo.id = pageValueJson.groupId;
              that.chatRoomConversationID = "GROUP" + that.groupInfo.id;
              that.namecardRoleids();
              setTimeout(function() {
                that.getMsgList();
              }, 300)
            } else {
              that.getGroupIdAndOrgIdByTypeAndId();
            }
          });
        }).catch(function(imError) {
          console.warn('login error:', imError); // 登录失败的相关信息
          console.log(imError.code);
          //如果是登录错误，则重新登录
          if (imError.code == 70013 || imError.code == 70003 || imError.code == 70001) {
            localStorage.removeItem("timYunUser");
            localStorage.removeItem("timTypeAndId");
            that.$toast.fail("身份出错，重新登录中");
            that.getIdentity();
          }
        });
      },
      /**
       * 对信息进行整理
       * @param {Object} messageList
       */
      formatMsg(messageList) {
        let that = this;
        let list = [];
        console.log(messageList);
        for (var i = 0; i < messageList.length; i++) {
          console.log("i:" + i);
          let params = new Object();
          //普通文字
          if (messageList[i].type == "TIMTextElem") {
            params.type = "TIMTextElem";
            let msg = messageList[i].payload.text;
            if(!msg || msg.length == 0){
              continue;
            }
            msg = msg.replace(/\n/g,"<br/>");
            params.msg = msg;
          } else if (messageList[i].type == "TIMImageElem") {
            //图片
            params.type = "TIMImageElem";
            let imageList = messageList[i].payload.imageInfoArray;
            params.imageList = imageList;
          } else if (messageList[i].type == "TIMCustomElem") {
            if(messageList[i].payload.description != "zj msg" && messageList[i].payload.description != "red packet"){
              continue;
            }
            params.type = "TIMCustomElem";
            try {
              let data = Base64.decode(messageList[i].payload.data);
              let dataJson = data.replace(/'/g, "\"").replace("None", "\"\"");
              let jsonData = JSON.parse(dataJson)
              params.data = jsonData;
              if (jsonData.mesgType == "6001") {
                that.getRedPackageInfo(jsonData);
              }
            } catch (e) {
              console.log("出错");
              console.log(messageList[i].payload.data);
              continue;
            }
          } else if (messageList[i].type == "TIMLocationElem") {
            params.type = "TIMLocationElem";
            params.description = messageList[i].payload.description;
            let position = new Object();
            position.lat = messageList[i].payload.latitude;
            position.lng = messageList[i].payload.longitude;
            params.position = position;
          } else {
            continue;
          }

          //头像
          let memberList = that.memberList.filter(function(e) {
            return e.zuMemberUuid == messageList[i].from;
          });

          console.log("membersList");
          console.log(memberList);

          params.from = messageList[i].from;
          if (messageList[i].from == that.userInfo.useruuid) {
            params.photo = that.userInfo.photo;
            params.roleId = checkLoginTime().role_id;
          } else if (messageList[i].from == "admin") {
            params.photo = "https://python-server.oss-cn-shenzhen.aliyuncs.com/app_mrtx_kefu1.png";
            params.roleId = "";
          } else if (memberList.length > 0) {
            params.photo = memberList[0].zuMemberHeader;
            params.roleId = memberList[0].zuMember;
          } else {
            params.photo = "https://python-server.oss-cn-shenzhen.aliyuncs.com/app_mrtx_kefu1.png";
            params.roleId = "";
            that.uuidGetUserInfo(messageList[i].from);
          }
          list.push(params);
        }
        return list;
      },
      /**
       * 获取信息列表
       */
      getMsgList() {
        let that = this;
        let tim = that.tim;
        console.log(tim);
        let promise = tim.getMessageList({
          conversationID: that.chatRoomConversationID,
          count: 100,
          nextReqMessageID: that.nextReqMessageID
        });

        let a = {
          conversationID: that.chatRoomConversationID,
          count: 100,
          nextReqMessageID: that.nextReqMessageID
        };
        console.log(a);

        console.log("是否是在这里断掉")
        console.log(promise);

        if (promise == undefined || promise == null) {
          that.$toast.fail("已超时!");
          setTimeout(function() {
            window.location.reload();
          }, 2000)
        }

        promise.then(function(imResponse) {
          console.log(imResponse.data);
          const messageList = imResponse.data.messageList; // 消息列表。
          console.log(messageList);

          //停止加载图标
          // that.loading1.clear();
          that.loading1Flag = false;

          if (that.nextReqMessageID == "") {
            that.scrollDown();
            // that.$toast("往下走")
            setTimeout(function() {
              that.scrollDown();
              // that.$toast("往下走")
            }, 500)
          }

          let list = that.formatMsg(messageList);

          let list1 = list.filter(function(e) {
            return that.messageList.indexOf(e) == -1;
          })

          that.messageList = list1.concat(that.messageList);
          console.log(that.messageList);
          that.nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
          const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
          setTimeout(function() {
            that.refresh = false;
          }, 1000)
        });
      },

      /**
       * 获取用户信息
       */
      current() {
        let that = this;
        current({}, (res) => {
          that.userInfo = res;
          console.log(that.userInfo)
        })
      },

      /**
       * 发送文本信息
       */
      sendMsg() {
        // 发送文本消息，Web 端与小程序端相同
        // 1. 创建消息实例，接口返回的实例可以上屏
        let that = this;
        let tim = that.tim;
        if(!that.message || that.message.length == 0){
          that.$toast.fail("发送消息不得为空");
          return;
        }
        console.log(that.chatRoomConversationID);
        let message = tim.createTextMessage({
          to: that.groupInfo.id,
          conversationType: TIM.TYPES.CONV_GROUP,
          payload: {
            text: that.message
          }
        });
        // 2. 发送消息
        let promise = tim.sendMessage(message);
        promise.then(function(imResponse) {
          // 发送成功
          console.log(imResponse);
          let params = new Object();
          params.type = "TIMTextElem";
          let msg = that.message.replace(/\n/g,"<br/>");
          params.msg = msg;
          params.from = that.userInfo.useruuid;
          params.photo = that.userInfo.photo;
          that.messageList.push(params);
          that.message = "";
          that.addBtnFlag = true;
          // window.scrollTo(0, document.documentElement.clientHeight);
          that.scrollDown();
        }).catch(function(imError) {
          // 发送失败
          console.warn('sendMessage error:', imError);
        });
      },
      /**
       * 上拉获取历史消息
       */
      onRefresh() {
        let that = this;
        that.getMsgList();
      },
      /**
       * 判断是否离开
       */
      setLogOut() {
        let that = this;
        let interval = setInterval(function() {
          let href = document.location.href;
          if (href.indexOf("orgModuleList") == -1) {
            let tim = that.tim;
            tim.logout();
            clearInterval(interval);

            document.title = "用分享，传递爱心与正能量…";

            // let params = new Object();
            // params.groupId = that.groupInfo.id;
            // params.uuid = that.userInfo.useruuid;
            // params.roleId = that.userInfo.id;
            // params.dwId = that.orgInfo.id;
            // params.token = checkLoginTime().access_token;

            // signOutChatRoom(params, (res) => {
            //   if (res.code == 0) {} else {
            //     that.$toast.fail(res.msg);
            //   }
            // })
          }
        }, 2000)
      },

      //获取roleId的列表
      namecardRoleids() {
        let that = this;
        namecardRoleids(that.orgInfo.id, {}, (res) => {
          that.roleIdList = that.roleIdList.concat(res);
          console.log(that.roleIdList);
          localStorage.setItem("orgRoleIdList", JSON.stringify(that.roleIdList));
        })
      },
      //发送图片消息
      wxUploadImg() {
        let that = this;
        that.$refs.files.onchange = that.createImageMessage;
        that.$refs.files.click();
      },
      createImageMessage(res) {
        // Web 端发送图片消息
        // 1. 创建消息实例，接口返回的实例可以上屏
        let that = this;
        let tim = that.tim;
        console.log("开始上传");
        console.log(tim);
        console.log(res);

        let num = 0;

        var fileReader = new FileReader();
        fileReader.onload = () => {
          console.log(fileReader.result);
          let addMsg = new Object();
          addMsg.from = that.userInfo.useruuid;
          addMsg.photo = that.userInfo.photo;
          let imageList = [];
          let imageUrlObject = new Object();
          imageUrlObject.imageUrl = fileReader.result;
          imageList.push(imageUrlObject);
          addMsg.imageList = imageList;
          addMsg.type = "TIMImageElem";
          addMsg.loading = true;
          num = that.messageList.length;
          that.messageList.push(addMsg);
          that.scrollDown();
        };
        fileReader.readAsDataURL(res.srcElement.files[0]);


        let message = tim.createImageMessage({
          to: that.groupInfo.id,
          conversationType: TIM.TYPES.CONV_GROUP,
          payload: {
            file: document.getElementById("files"),
          },
          onProgress: function(event) {
            console.log('file uploading:', event);
          }
        });
        // 3. 发送图片
        let promise = tim.sendMessage(message);
        promise.then(function(imResponse) {
          // 发送成功
          console.log(imResponse);
          that.messageList[num].loading = false;
        }).catch(function(imError) {
          // 发送失败
          console.warn('sendMessage error:', imError);
        });
      },

      //基础方法
      //设置到最底部
      scrollDown() {
        this.$nextTick(function() {
          var div = document.getElementById('scrollDiv');
          if (div) {
            div.scrollTop = div.scrollHeight;
          }
        })
      },
      //放大图片
      showImg(img) {
        let that = this;
        that.src = img;
        that.imgFlag = true;
      },
      //跳转链接
      goUrl(object) {
        if (object.link) {
          document.location.href = object.link;
        } else {
          pageToPage(object.detailId);
        }
      },
      //表示不支持的信息
      notSupport() {
        let that = this;
        that.$toast("Web端不支持此功能，请下载APP");
      },
      //表示未开发
      notOk() {
        let that = this;
        that.$toast("暂未开发，敬请期待");
      },
      friendFunction(type) {
        let that = this;
        if (type == "applyVip") {
          that.friendFlagShow = true;
          return;
        }
        if (type == "cancelVip") {
          that.cancelfriendFlagShow = true;
          return;
        }
      },
      applyIntoGroupByOrgId() {
        let that = this;
        let params = new Object();
        params.dwId = that.orgInfo.id;
        params.token = checkLoginTime().access_token;
        applyIntoGroupByOrgId(params, (res) => {
          if (res.code != 0) {
            that.$toast.fail(res.msg);
          } else {
            // that.resident = true;
            that.$toast("已提交申请");
          }
        })
      },
      downloadApp() {
        downloadPage();
      },
      goFriendShare() {
        let that = this;
        that.pageTo("/friendShareList/v/" + that.orgInfo.id);
      },
      wxShowTips() {
        let that = this;
        if (checkWx()) {
          that.showWxTips = true;
        } else {
          if(window.webkit&& !checkWx())
          {

            let title = "["+checkLoginTime().username +"]推荐给您的活动，快去看看吧";
            let url = document.location.href;
            let content = that.groupInfo.dwZuName +",点击查看详情>>";
            let image = that.groupInfo.dwZuHeader;
            console.log(title);
            alert(title)
            window.webkit.messageHandlers.shareWX.postMessage({title:title,content:content,image:image,url:url});
            return;
          }
          that.$toast("请在APP或微信中使用该功能");

        }
      },
      uuidGetUserInfo(uuid) {
        let that = this;
        uuidGetUserInfo(uuid, {}, (res) => {
          console.log(res);
          for (var i = 0; i < that.memberList.length; i++) {
            if (that.memberList[i].from == uuid) {
              that.memberList[i].photo = res.image;
              that.memberList[i].roleId = res.roleid;
            }
          }
          for (var i = 0; i < that.messageList.length; i++) {
            if (that.messageList[i].from == uuid) {
              that.messageList[i].photo = res.image;
              that.messageList[i].roleId = res.roleid;
            }
          }
        })
      },
      focusThePublic() {
        let that = this;
        that.publicFlag = true;
      },
      goRoleDetail(roleId) {
        pageToRole(roleId);
      },
      goPointMap(message) {
        let that = this;
        console.log(message);
        that.pageTo("/pointMap/" + message.position.lng + "," + message.position.lat + "/" + message.description);
      },
      goBusinessStreet() {
        let that = this;
        if (!that.orgInfo.id) {
          that.$toast("正在读取数据中...");
          return;
        }
        that.pageTo("/orgCommercialStreet/" + that.orgInfo.id);
      },
      getRedPackageInfo(object) {
        let that = this;
        let params = new Object();
        params.token = checkLoginTime().access_token;
        params.packageId = object.packageId;
        params.roleId = checkLoginTime().role_id;
        redPackageDetail(params, (res) => {
          console.log(res);
          if (res.code == 0) {
            let receiveList = res.data.receiveList;
            let redData = res.data;

            for (var i = 0; i < that.messageList.length; i++) {
              if (that.messageList[i].data && that.messageList[i].data.packageId == object.packageId) {
                that.messageList[i].redData = redData;

                if (res.data.packageStatus == "3") {
                  that.messageList[i].overdue = true;
                }

                let userReceiveList = receiveList.filter(function(e) {
                  return e.receiverRole == checkLoginTime().role_id
                });
                console.log(userReceiveList);
                if (userReceiveList.length > 0 || res.data.packageStatus == "3") {
                  that.messageList[i].receiveFlag = true;
                } else {
                  that.messageList[i].receiveFlag = false;
                }
                break;
              }
            }
          } else {
            that.$toast.fail(res.msg);
          }
        })
      },
      clickRedPackage(message) {
        let that = this;
        if (!message.redData) {
          that.$toast("数据加载中，请稍等……");
          return;
        }
        if (message.receiveFlag) {
          that.pageTo("/redPackageReceive/" + message.data.packageId);
        } else {
          that.chooseData = message.data;
          that.redPackageShow = true;
        }
      },
      goPackageReceive(packageId) {
        let that = this;
        that.pageTo("/redPackageReceive/" + packageId);
      },
      receiveRedPackage(object) {
        let that = this;
        let params = new Object();
        params.token = checkLoginTime().access_token;
        params.receiver = checkLoginTime().role_id;
        params.packageId = object.packageId;
        receiveRedPackage(params, (res) => {
          if (res.code == 0) {
            that.pageTo("/redPackageReceive/" + object.packageId);
          } else {
            that.$toast.fail(res.msg);
          }
        })
      },
      sendRedPackage() {
        let that = this;
        that.pageTo("/sendRedPackage/" + that.groupInfo.id);
      },
      wxCollect() {
        let that = this;
        if (checkWx()) {
          console.log("开始收藏");
          console.log(document.location.href);
          wxCollect(that.groupInfo.dwZuName, document.location.href, that.orgInfo.header);
        }
        that.addColletFlag = true;
        that.headBtnFlag = false
      }
    },
    components: {
      ZjHead: ZjHead,
      commonModules: commonModules,
      orgLuckStar: orgLuckStar,
      chatRoomSetting: chatRoomSetting,
      WxShareTips: WxShareTips
    },
    props: {
      type: {
        type: String,
        default: ""
      },
      id: {
        type: String,
        default: ""
      },
      personal: {
        type: String,
        default: ''
      }
    },
    beforeRouteEnter(to, from, next) {
      console.log(from, '从哪来')
      console.log(to, '去哪')
      if (to.params.personal == '1') {
        let item = {};
        let params = [];
        params.push(checkLoginTime().id);
        item.members = params;
        getRoleById(item, (res) => {
          console.log(res, '角色信息');
          var teamId = res[0].team;
          pageTo(`/orgModuleList/org/${teamId}`)
          // window.location.href = `${pro.shortAPI}/#/orgModuleList/org/${teamId}`
        })
      }else{
        next()
      }
    },
    activated() {
      let that = this;
      console.log(that.personal,'是多少')
      if(!that.personal){
        var val = localStorage.getItem('realShow')
        if(val){
            that.isHide = false
        }
        that.orgId = "";
        that.groupId = "";
        let loadFlag = true;
        if (!loadFlag) {
          console.log("停止");
          return;
        }

        that.iosFlag = checkIosDev();

        // that.loading1 = that.$toast.loading({
        //   mask: true,
        //   message: '数据加载中...',
        //   duration: 6000
        // })

        that.loading1Flag = true;

        that.groupGetFlag = true;
        that.refreshFlag = true;
        that.roleIdList = [];

        let timToken = localStorage.timToken;
        let timYunUser = localStorage.getItem("timYunUser");

        //如果已经有数据了则直接请求
        if (timToken == checkLoginTime().access_token && timYunUser != undefined && timYunUser != null) {
          let yunUserJson = JSON.parse(timYunUser);
          that.yunUserID = yunUserJson.identifier;
          that.yunUserSig = yunUserJson.sig;
          console.log(that.yunUserSig);
          that.getLogin();
        } else {
          that.getIdentity();
        }

        that.current();
        that.messageList = [];
        that.nextReqMessageID = "";
        that.setLogOut();

        console.log(document.title);
      }
    }
  }
</script>

<style scoped="scoped">
  #app {
    background-color: #EBEBEB;
  }

  .sl_container {
    background-color: #ebebeb;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .orgShop {
    margin: 10px;
    background-color: white;
    border-radius: 5px;
    height: 29px;
    padding: 20px 0px;
  }

  .orgShop>div {
    width: 49%;
    text-align: center;
  }

  .orgDiv {
    float: left;
    border-right: 0.5px solid gainsboro;
  }

  .shopDiv {
    float: right;
  }

  .orgShop .name {
    font-size: 13px;
    font-weight: bold;
    text-align: center;
  }

  .orgShop .goTitle {
    text-align: center;
    font-size: 10px;
    color: #565656;
  }

  .van-tabbar-item {
    font-size: 14px;
  }

  .buttomDiv {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #F3F3F3;
  }

  .bottomBtnDiv {
    /* height: 44px; */
  }

  .buttomDiv img {
    width: 60%;
    margin: 20%;
  }

  .buttomDiv .van-col {
    /* height: 44px; */
  }

  .talkInput {
    width: 40px;
  }

  .van-field__left-icon .van-icon,
  .van-field__right-icon .van-icon {
    font-size: 24px;
  }


  .van-nav-bar__text {
    color: white;
  }

  .van-nav-bar .van-icon {
    color: white;
  }

  .stripe {
    font-size: 9px;
    padding: 3px;
    background-color: rgba(179, 210, 241, 1);
  }

  .stripe span {
    margin-right: 10px;
  }

  .stripe .residentNum {
    color: #DB000D;
  }

  .stripe .fansNum {
    color: #FA5E00;
  }

  .stripe .touristNum {
    color: #2B7BF9;
  }

  .centerDiv {
    line-height: 44px;
    text-align: center;
  }

  .bottomBtnDiv .van-col {
    border-right: 0.5px solid #D2D2D2;
  }
  .bottomBtnDiv .oneFour {
    height: 0.88rem;
  }

  .liveBroadDiv {
    width: 20%;
    position: absolute;
    bottom: 60px;
    right: 10px;
  }

  .bottom100 {
    bottom: 100px;
  }

  .liveBroadDiv img {
    width: 100%;
  }

  .liveBroadDiv .cancelImg {
    width: 10px;
    position: absolute;
    right: 3px;
    top: 3px;
  }

  .content {
    margin-bottom: 150px;
    padding-top: 150px;
  }

  .content .header {
    width: 80%;
    padding: 10%;
  }

  .content .van-col--18 {
    padding: 5px;
  }

  .content .contentDiv {
    padding: 9px;
    border-radius: 6px;
    font-size: 16px;
    position: relative;
    top: 5px;
  }

  .contentImgDiv {
    width: 30%;
  }

  .content .contentDiv img {
    width: 100%;
  }

  .content .rightIconContent {
    background-color: #3298ff;
    color: white;
    display: inline;
    float: right;
  }

  .content .rightIconContent:hover {
    background-color: #1683f2;
  }

  .content .leftIconContent {
    background-color: #ffffff;
    display: inline;
    float: left;
    max-width: 100%;
    word-break: break-all;
  }

  .content .leftIconContent:hover {
    background-color: #f3f3f3;
  }

  .sendBtn {
    background-color: #3298FF;
    text-align: center;
    font-size: 14px;
    line-height: 30px;
    border-radius: 7px;
    margin: 7px 2px;
    color: white;
  }

  .topDiv {
    position: fixed;
    top: 0;
    z-index: 1;
    left: 0;
    width: 100%;
  }

  .fileBtn {
    height: 150px;
    border-top: 0.5px solid gainsboro;
  }

  .fileBtn img {
    width: 50%;
    margin: 20% 25%;
    margin-bottom: 1%;
    border-radius: 5px;
  }

  .fileBtn .title {
    text-align: center;
    font-size: 12px;
    color: #909090;
    margin-top: -5px;
  }

  .rightHeadIcon {
    height: 18px;
    position: relative;
    top: 3px;
  }

  .headBtn {
    top: 75px;
    width: 100px;
    text-align: center;
    font-size: 15px;
    height: 60px;
  }

  .headBtn div {
    height: 30px;
    line-height: 30px;
    border-bottom: 0.5px solid gainsboro;
  }

  .headBtn div:last-child {
    border-bottom: none;
  }

  .rightIconDiv {
    padding-right: 10px;
    background-image: url("../../assets/img/pub/talk_bg_h5ppright_nor.png");
    background-repeat: no-repeat;
    height: 32px;
    background-position: 98% 12px;
    background-size: 7px;
  }

  .rightIconDiv:hover {
    background-image: url("../../assets/img/pub/talk_bg_h5ppright_sel.png");
  }

  .leftIconDiv {
    padding-left: 10px;
    background-image: url("../../assets/img/pub/talk_bg_h5ppleft_nor.png");
    background-repeat: no-repeat;
    height: 32px;
    background-position: 3px 8px;
    background-size: 7px;
  }

  .leftIconDiv:hover {
    background-image: url("../../assets/img/pub/talk_bg_h5ppleft_sel.png");
  }

  .prop1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 62%;
  }

  .msgShareDiv {
    background-color: white;
    padding: 5px;
  }

  .msgShareDiv .shareTitle {
    font-size: 15px;
  }

  .msgShareDiv .shareAdertisement {
    font-size: 11px;
    color: #999;
    width: 80%;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .msgShareDiv .shareHeader {
    width: 20%;
    /* float: right; */
    margin-left: 80%;
  }

  .msgShareDiv .shareHeader img {
    width: 90%;
    margin: 5%;
  }

  .msgShareDiv .shareTitleDiv {
    border-bottom: 0.5px solid gainsboro;
    /* height: 75px; */
  }

  .msgShareDiv .shareBottom .shareBottomImgDiv {
    width: 5%;
    float: left;
    margin-left: 3px;
  }

  .msgShareDiv .shareBottom .shareBottomImgDiv img {
    width: 100%;
  }

  .msgShareDiv .shareBottom .orgName {
    font-size: 10px;
    color: slateblue;
    position: relative;
    top: 2px;
    left: 5px;
  }

  .postScript .van-dialog__header {
    padding: 10px
  }

  .imgProp {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
    padding-top: 40%;
  }

  .chatRoomDiv {
    width: 45%;
    position: absolute;
    right: 0;
    z-index: 10;
    /* top: 32px; */
    bottom: 0.88rem;
  }

  .chatRoomDiv .topImg {
    float: right;
    margin-right: 12px;
    height: 10px;
  }

  .chatRoomDiv .whiteDiv {
    background-color: white;
    margin-top: 14px;
  }

  .chatRoomDiv .whiteDiv>div {
    height: 45px;
    overflow: hidden;
    border-bottom: 0.5px solid gainsboro;
  }

  .chatRoomDiv .whiteDiv>div img {
    float: left;
    height: 26px;
    margin: 10px 6px;
    margin-left: 10px;
  }

  .chatRoomDiv .whiteDiv>div div {
    height: 45px;
    line-height: 45px;
  }

  .prop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 8;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .rightSearchIcon {
    height: 18px;
    position: relative;
    top: 3px;
    right: 5px;
  }

  .thePublicWord {
    font-size: 14px;
    text-align: center;
    margin-bottom: 12px;
    color: #1572F9;
  }

  .mapDiv {
    background-color: white;
    padding: 8px;
    border-radius: 5px;
    position: relative;
  }

  .mapDiv .address {
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mapDiv .mapProp {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .redPackageDiv {
    width: 100%;
    position: relative;
  }

  .redPackageDiv img {
    width: 100%;
  }

  .redPackageDiv .redBottomDiv {
    position: absolute;
    bottom: 0;
    line-height: 25px;
    font-size: 12px;
    padding-left: 5px;
  }

  .redPackageDiv .redContentDiv {
    position: absolute;
    right: 0;
    top: 0;
    padding: 12px;
    width: 72%;
  }

  .redPackageDiv .redContentDiv .redContentText {
    color: white;
    font-size: 18px;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .redPackageDiv .redContentDiv .redReceiveText {
    color: white;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .redPackageModel {
    background-color: rgba(0, 0, 0, 0);
    position: relative;
  }

  .redPackageModel .backImg {
    width: 100%;
  }

  .redPackageModel .redPackageContent {
    position: absolute;
    top: 10%;
    width: 100%;
  }

  .redPackageModel .redPackageContent img {
    width: 20%;
    margin-bottom: 3px;
  }

  .redPackageModel .redPackageContent .redPackageName {
    font-size: 13px;
    color: gold;
    margin-bottom: 15px;
  }

  .redPackageModel .redPackageContent .sendUserName {
    font-size: 18px;
    color: gold;
  }

  .redPackageModel .redPackageBottom {
    position: absolute;
    bottom: 5%;
    text-align: center;
    width: 100%;
    color: gold;
    font-size: 14px;
  }
  #qrcode2>img {
    width: 100%;
  }

  /** 二维码拷贝 **/
  .se_ewm_wrap {
    width: 100%;
    /* height: 9rem; */
    background-color: #3298FF;
    font-size: .55rem;
    color: #fff;
    padding-bottom: 90px;
  }

  .se_ewm_main {
    flex-flow: column nowrap;
    align-items: center;
    height: 7.62rem;
  }

  .se_em_title {
    padding: .6rem 0;
    width: 100%;
    text-align: center;
    font-size: 22px;
  }

  .se_ewm_image {
    padding: .3rem;
    position: relative;
    background-color: #fff;
  }

  .se_ewm_logo {
    width: 45px;
    height: 45px;
    padding: 3px;
    border-radius: 5px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -25.5px;
    margin-left: -25.5px;
  }

  .se_ewm_logo img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .edit_button {
    font-size: .28rem;
    height: .9rem;
    width: 50vw;
    align-items: center;
    justify-content: center;
    border-bottom: .5px solid #ebebeb;
  }

  .se_shop_name {
    width: 100%;
    color: #fff;
    padding: .28rem 0;
    text-align: center;
    font-size: 21px;
    margin-top: 20px;
  }

  .se_bottom_image {
    background-color: #fff;
    height: 1.4rem;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .se_bottom_image img {
    width: 3.85rem;
  }
</style>
