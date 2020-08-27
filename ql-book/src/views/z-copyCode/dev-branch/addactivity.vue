<template>
  <div class="sa_container">
    <FuncTabbar ref="functabbar" leftText="保存发布" :showRightImage="true" leftBackgroundColor="#3297ff" @click-left="addActivity(dwId)"  >
      <template>
        <div @click="previewActivityDetails()">预览</div>
        <div @click="showFormwork=true">导入模板</div>
        <div @click="saveDraft(dwId)">存草稿</div>
        <div @click="clearCache();removeDraft()">删除草稿</div>
      </template>
    </FuncTabbar>
    <input style="display: none;" ref="files" type='file' accept="image/*" name="files" id="files" />
    <!-- right-text="选择已有模板" @click-right="showFormwork=true"-->
    <ZjHead left-text="活动发布"  @click-left="pageBack()" style="position: sticky;top: 0px;z-index: 2;"></ZjHead>
    <van-field v-model="info.name" label="活动标题" required placeholder="请输入活动标题，文字不超30字" maxlength="30" />
    <!-- <van-cell title="活动类别" is-link :value="info.catagary" style="z-index: 1;" /> -->
    <van-cell title="分类及标签" is-link :value="typeAndLabelText" style="z-index: 1;"  @click="showActions=true" value-class="flex_value_2"/>

    <van-action-sheet v-model="showActions" @opened="getLabelList(dwId,activitylabel)" :lazy-render="false">
      <div class="van-hairline--bottom lineHeight44" style="font-weight: bold;background: #F3F3F3;">分类及标签</div>
      <van-cell title="活动分类" is-link :value="activityType1?activityType1:'请选择活动分类'" @click="showActivityType1=false">
      </van-cell>
      <div style="margin-bottom: 10px;">
        <componentLabel ref="componentLabel" :dwRoleId="dwDetails.roleid" :dwId="dwId" sortType='2' :defaultStyle="false" @saveLabel="confirmLabel"></componentLabel>
      </div>
      <div class="van-hairline--top flex lineHeight44 van-hairline--top" style="background: rgb(243, 243, 243);">
        <div class="lineHeight44 van-hairline--right" style="flex: 1;" @click="showActions=false">取消</div>
        <div class="lineHeight44 van-hairline--left" style="flex: 1;color:#1989fa;" @click="showActions=false;">确认</div>
      </div>
    </van-action-sheet>

    <van-popup v-model="showActivityType1"style="border-radius: 10px">
      <div style="width: 220px;text-align: center;line-height: 40px;" @click="showActivityType1=false">
        <div style="border-bottom: 1px solid #E3E3E3;" @click="activityType1='业务活动'">
          业务活动
        </div>
        <div style="border-bottom: 1px solid #E3E3E3;" @click="activityType1='赚钱活动'">
          赚钱活动
        </div>
        <div @click="" style="position: relative;"  @click="activityType1='省钱活动'">
          省钱活动
          <!-- <i class="van-icon van-icon-arrow van-cell__right-icon" style="position: absolute;top: 8px;right: 18px;"></i> -->
        </div>
      </div>
    </van-popup>

    <van-popup v-model="showActivityType2"style="border-radius: 10px">
      <div style="width: 220px;text-align: center;line-height: 40px;" @click="showActivityType2=false">
        <div style="border-bottom: 1px solid #E3E3E3;" @click="activityType2='公开活动'">
          公开活动
        </div>
        <div style="border-bottom: 1px solid #E3E3E3;" @click="activityType2='团队活动'">
          团队活动
        </div>
        <div @click="" style="position: relative;"  @click="activityType2='z社区活动'">
          z社区活动
          <!-- <i class="van-icon van-icon-arrow van-cell__right-icon" style="position: absolute;top: 8px;right: 18px;"></i> -->
        </div>
      </div>
    </van-popup>

    <div style="font-size: 13px;height: 17px;line-height: 17px;padding: 2px 16px;background: rgb(235, 235, 235);color: #909090;">活动宣传图片</div>

    <van-field label="上传封面" required readonly>
       <template #button>
          <img src="../../assets/img/pub/tree_ico_photo_nor.png" @click="uploadOneImg" style="width: 40px;height: 40px;">
          <template v-for="item in info.websites" @click="uploadOneImg">
            <img :src="item.url" width="40" height="40" />
          </template>
        </template>
    </van-field>

    <!-- 图片 -->
    <!-- <div class="tack_images" style="margin-bottom: 0px;">
      <div @click="previewPicture" v-for="(item, index) in info.websites" :key="index" class="tack_images_wrap">
        <img v-lazy="item.url" />
        <div @click.stop="deleteImg(index)" class="delete_image">
          <van-icon name="clear" size="16px" color="#9e9e9e" />
        </div>
      </div>
      <div @click="uploadImg" v-show="info.websites.length < 8" class="add_tack_images"></div>
    </div> -->
    <van-cell title="活动介绍推广" is-link :value="activityIntroductionAndPromotionText" @click="showActions4=true" style="margin-bottom: 10px;"/>


    <van-cell title="组织形式" is-link :value="typeAndLimitText" @click="showActions3=true"/>
    <van-cell v-if="info.start_time && info.end_time" title="活动时效" is-link :value="`${info.start_time} 至 ${info.end_time}`" @click="showActions2=true"/>
    <van-cell v-else title="活动时效" is-link value="长期有效" @click="showActions2=true"/>
    <van-cell title="活动地点" is-link :value="(info.position && info.position.address)?info.position.address:'未设置'"  @click="showMap = true"  />
    <!-- <van-cell title="智加有礼分享" is-link value="燕子vip美食特权"  @click=""  /> -->
    <van-cell @click="myCardShow = true" :icon="require('../../assets/img/goods/pub_label_zjyfx.png')" title="智加有礼分享" placeholder="" is-link  style="margin-bottom: 10px;">
        <div class="flex gift-wrap" v-if="info.presentShare && info.presentShare.id">
          <div class="gift-name">{{info.presentShare.name}}</div>
          <div class="gift-img-wrap">
            <img v-lazy="info.presentShare.header" alt="">
          </div>
        </div>
    </van-cell>
    <SelectVipCard :myCardShow='myCardShow' :shopId='dwDetails.shopid' @goback='myCardShow = false' @getVip='getVip' />


    <div style="font-size: 13px;height: 17px;line-height: 17px;padding: 2px 16px;background: rgb(235, 235, 235);color: #909090;">活动任务</div>
    <template v-for="(item,index) in hdlc" style="margin: 5px 0px;">
      <template v-if="item.id==0">
        <van-cell :title="item.acName?item.acName:'签到'" title-style="flex:1.8;" is-link :value="item.activityType=='sign'?'签到':(item.activityType=='pay')?'付款':(item.activityType=='join')?'报名':'设置'"
          @click="showSetSubActivity=true;currentItemIndex=index;$refs.setSubActivity.showCache(hdlcCache[index])" />
      </template>
    </template>
    <van-cell title="添加活动任务" is-link @click="addSubAcitvity()"/>

    <div style="height: 100px;"></div>


    <van-action-sheet v-model="showActions2" >
      <div class="van-hairline--bottom lineHeight44" style="font-weight: bold;background: #F3F3F3;">活动时效</div>
      <SelectDateTimeNew :tValue="(info.start_time && info.end_time)?`${info.start_time} 至 ${info.end_time}`:''" @setKSSJ="setKSSJ" @setJSSJ="setJSSJ" ref="selectDateTimeNew"></SelectDateTimeNew>
      <van-cell title="重复参与" >
        <div slot="default" class="flex" style="align-items: center;flex-flow: row-reverse;">
          <van-switch v-model="info.loopSign" size="20px" @change="changeloopSign"/>
        </div>
      </van-cell>
      <van-cell title="活动频次" title-style="max-width:140px;" is-link  :value="activityCycle"   @click="showSetLoop=true" />

      <div class="van-hairline--top flex lineHeight44 van-hairline--top" style="background: rgb(243, 243, 243);">
        <div class="lineHeight44 van-hairline--right" style="flex: 1;" @click="showActions2=false">取消</div>
        <div class="lineHeight44 van-hairline--left" style="flex: 1;color:#1989fa;" @click="showActions2=false">确认</div>
      </div>
    </van-action-sheet>

    <van-action-sheet v-model="showActions3" >
      <div class="van-hairline--bottom lineHeight44" style="font-weight: bold;background: #F3F3F3;">组织形式</div>
      <van-cell title="活动方式" is-link :value="activityType2" @click="showActivityType2=true"/>
      <van-cell title="选择参与团队" v-if="activityType2=='团队活动'" is-link :value="seeGroupsName" @click="showSelectSeeGroup=true"/>

      <van-cell v-if="info.num_limit>=0 && info.num_limit!=''" title="限定人数" is-link :value="info.num_limit+'人'" @click="showNumLimit=true"/>
      <van-cell v-else title="限定人数"  value="不限制" @click="showNumLimit=true"/>

      <van-cell title="管理团队" is-link @click="showSignPusher=true">
        <div v-if="hdmanager.length==1" slot="default" class="flex" style="align-items: center;flex-flow: row-reverse;">
          <img v-for="item in hdmanager" :src="item.photo" style="width: 24px;margin: 0 1.5px;border-radius: 50%;">
        </div>
        <div v-else slot="default" class="flex" style="align-items: center;">
          <div class="hdmanager" style="height: 24px;position: relative;width: 100%;">
            <img v-for="(item,index) in hdmanager" :src="item.photo" :style="'width: 24px;margin: 0 1.5px;border-radius: 50%;position:absolute;'+`right:${(hdmanager.length-index)*12+10}px`">
            <span>{{`(${hdmanager.length})`}}</span>
          </div>
        </div>
      </van-cell>
      <div class="van-hairline--top flex lineHeight44 van-hairline--top" style="background: rgb(243, 243, 243);">
        <div class="lineHeight44 van-hairline--right" style="flex: 1;" @click="showActions3=false">取消</div>
        <div class="lineHeight44 van-hairline--left" style="flex: 1;color:#1989fa;" @click="showActions3=false;">确认</div>
      </div>
    </van-action-sheet>

    <van-dialog show-cancel-button v-model="showNumLimit" @confirm="info.num_limit=tempLimit" @open="info.num_limit>0?tempLimit=info.num_limit:tempLimit=''" >
      <div class="flex">
        <span style="flex: 1;text-align: center;line-height: 30px;height: 30px;">允许参与人数</span>
      </div>
      <div style="padding: 15px 0px;" >
        <van-field v-model="tempLimit" placeholder="请输入可参与活动人数" type="number" input-align="center"/>
      </div>
    </van-dialog>

    <!-- 指定参与团队设置-->
    <van-popup v-model="showSelectSeeGroup" position="bottom" style="max-height:400px;">
      <ZjHead style="position: sticky; top: 0;" :left-text="zuList.length>0?'请选择参与团队':''" right-text="确定" @click-left="showSelectSeeGroup=false" @click-right="showSelectSeeGroup=false"></ZjHead>
      <van-tabs v-model="active" style="z-index: -1!important">
        <van-tab title="团队" style="position: sticky; top: 0;">
          <van-checkbox-group v-model="selectCheckboxSee">
            <div class="flex" v-for="item in zuListTD" style="height: 50px;align-items: center;border-bottom: 0.5px solid #e3e3e3;padding-left: 15px;"
              @click="">
              <van-checkbox :name="item">
                <div style="width: 245px;justify-content: space-around;flex-direction: column;" class="flex">
                  <span>
                    {{item.dwZuName}}
                  </span>
                </div>
              </van-checkbox>
            </div>
          </van-checkbox-group>
        </van-tab>
        <van-tab title="分享圈" style="position: sticky; top: 0;">
          <van-checkbox-group v-model="selectCheckboxSee">
            <div class="flex" v-for="item in zuListFXQ" style="height: 50px;align-items: center;border-bottom: 0.5px solid #e3e3e3;padding-left: 15px;"
              @click="">
              <van-checkbox :name="item">
                <div style="width: 245px;justify-content: space-around;flex-direction: column;" class="flex">
                  <span>
                    {{item.dwZuName}}
                  </span>
                </div>
              </van-checkbox>
            </div>
          </van-checkbox-group>
        </van-tab>
      </van-tabs>
    </van-popup>

    <van-action-sheet v-model="showActions4" >
      <div class="van-hairline--bottom lineHeight44" style="font-weight: bold;background: #F3F3F3;">活动介绍推广</div>
      <!-- <van-field label="概要" v-model="introductionAndPromotion.content" readonly rows="2" autosize type="textarea" maxlength="200" placeholder="请输入活动概要"
        @click="showComponentActivityContent=true"/> -->

      <div class="van-cell van-field" @click="showComponentActivityContent=true">
        <div class="van-cell__title van-field__label"><span>概要</span></div>
        <div class="van-cell__value van-field__value" style="text-align: left" v-html="introductionAndPromotion.content">概要</div>
      </div>








      <van-cell title="链接" is-link :value="introductionAndPromotion.link" @click="showActivityContentLink=true"/>
      <van-cell title="活动幸运星" value="未设置" is-link @click="showLuckyStar=true;">
        <div v-if="introductionAndPromotion.luckyStar && introductionAndPromotion.luckyStar.value" slot="default" class="flex" style="align-items: center;flex-flow: row-reverse;">
          <img :src="introductionAndPromotion.luckyStar.value" style="width:25px;height:25px;margin: 0 1.5px;border-radius: 50%;">
        </div>
      </van-cell>
      <van-cell title="显示接龙"> <!--  @click.stop="introductionAndPromotion.showSignInfo=!introductionAndPromotion.showSignInfo"-->
        <div slot="default" class="flex" style="align-items: center;flex-flow: row-reverse;">
          <van-switch v-model="introductionAndPromotion.showSignInfo" size="20px"/>
        </div>
      </van-cell>
      <van-cell title="开启评论互动"> <!--  @click.stop="introductionAndPromotion.openComments=!introductionAndPromotion.openComments"-->
        <div slot="default" class="flex" style="align-items: center;flex-flow: row-reverse;">
          <van-switch v-model="introductionAndPromotion.openComments" size="20px"/>
        </div>
      </van-cell>
      <div class="van-hairline--top flex lineHeight44 van-hairline--top" style="background: rgb(243, 243, 243);">
        <div class="lineHeight44 van-hairline--right" style="flex: 1;" @click="showActions4=false">取消</div>
        <div class="lineHeight44 van-hairline--left" style="flex: 1;color:#1989fa;" @click="showActions4=false;confirmActivityIntroductionAndPromotion()">确认</div>
      </div>
    </van-action-sheet>

    <van-dialog v-model="showSetLoop" show-cancel-button >
      <div style="height: 44px;line-height: 44px;text-align: center;">设置活动循环周期</div>
      <div style="border: 1px #e3e3e3 solid;padding: 15px;">
        <div style="color: #A6A6A6;font-size: 13px;">活动总次数:</div>
        <div style="padding: 20px">
          <input  v-model="info.totalLoopCount" class="custinput"> 次数
        </div>
        <div style="color: #A6A6A6;font-size: 13px;">活动循环周期：</div>
        <div style="padding: 20px">
          <input v-model="circleday" class="custinput"> 天
          <input v-model="circlehour" class="custinput"> 时
          <input v-model="circlemin" class="custinput"> 分
        </div>
      </div>
    </van-dialog>

    <!-- <van-popup v-model="showA" position="bottom" style="height: 100%;">
      <componentJoinSetting @close="showA=false" @setJoinSetting="setJoinSetting" :currentItemIndex="currentItemIndex"></componentJoinSetting>
    </van-popup> -->
    <!-- 活动经费设置 -->
    <!-- <van-popup v-model="showB" position="bottom" style="height: 100%;" :lazy-render="false">
      <componentMoneySetting @close="showB=false" :dwId="dwId" ref="componentMoneySetting" @setAcFeeSetting="setAcFeeSetting"
        :currentItemIndex="currentItemIndex"></componentMoneySetting>
    </van-popup> -->
    <!-- 签名设置 -->
    <!-- <van-popup v-model="showC" position="bottom" style="height: 100%;">
      <componentSignSetting @close="showC=false" @setSignSetting="setSignSetting" :currentItemIndex="currentItemIndex"></componentSignSetting>
    </van-popup> -->

    <!-- 默认添加流程设置 -->
    <van-popup v-model="showSetSubActivity" position="bottom" style="height: 100%;background-color: #ffa;" :lazy-render="false" get-container="#app" >
      <setSubActivity ref="setSubActivity" :hdlc="hdlc" :dwId="dwId" @close="showSetSubActivity=false" @setActivity="setActivity" @delete="()=>{hdlc.splice(arguments[0],1);showSetSubActivity=false}"
        :currentItemIndex="currentItemIndex" @setActivityData="setActivityData"    @setActionData="setActionData"   >
      </setSubActivity>
    </van-popup>

    <van-popup v-model="showComponentActivityContent" position="bottom" style="height: 100%;background-color: #ffa;" :lazy-render="false" get-container="#app" >
      <componentActivityContent v-model="info.name" @close="showComponentActivityContent=false" @setContent="(value)=>{introductionAndPromotion.content = value}"></componentActivityContent>
    </van-popup>



    <!-- 地图弹窗 -->
    <van-popup v-model="showMap" position="bottom" style="height: 100%;">
      <Map @clickLeft="closeMap" :showMap="showMap"></Map>
    </van-popup>

    <!-- <van-popup v-model="showMyNews" position="bottom" style="height: 100%;" :lazy-render="true">
      <MyNews @close="showMyNews=false" @getSelectedItem="getSelectedNews"></MyNews>
    </van-popup> -->

    <van-dialog v-model="showActivityContentLink" title="添加活动介绍" show-cancel-button @cancel="introductionAndPromotion.link=''">
      <div style="padding: 20px;">
        <van-cell title="选择已发布的本地资讯" is-link @click="showMyNews=true" />
        <van-cell title="粘贴复制的新闻链接" is-link @click="parseUrl()" />
        <van-field label="网页:" v-model="introductionAndPromotion.link" rows="4" type="textarea" placeholder="请输入网页url" label-width="35px" />
      </div>
    </van-dialog>

    <componentPusherList v-model="showSignPusher" :dwId="dwId" getItem @confirmSelectItem="confirmSignPusher" showSelectRecord @close="showSignPusher=false"></componentPusherList>
    <componentLuckStar :dwId="dwId" v-model="showLuckyStar" @close="showLuckyStar=false" @resultnew="getLuckStarData"></componentLuckStar>

    <div class="custom-popup">
      <van-popup v-model="showFormwork" position="bottom">
        <div style="background-color: #fff;width: 100%;">
          <div @click="" class="custom_item" style="font-weight: bold;">
            选择活动流程模板
          </div>
          <div @click="setFormWork(1);showFormwork=false" class="custom_item">
            单位外来人员来访登记表模板
          </div>
          <div @click="setFormWork(2);showFormwork=false" class="custom_item">
            小区疫情防控来往人员信息检查表模板
          </div>
          <div @click="setFormWork(3);showFormwork=false" class="custom_item">
            企业园区疫情防控来往人员信息检查表
          </div>
          <div @click="setFormWork(4);showFormwork=false" class="custom_item">
            测试活动模板结构
          </div>
        </div>
        <van-field rows="1" value="取消" readonly @click="showFormwork=false" autosize input-align="center" />
      </van-popup>
    </div>

    <div v-if="checkWxDev()" style="height:65px"></div>
  </div>
</template>

<script>
  import ZjHead from '../../components/pub/NewHead'
  import openResContent from '../news/openResContent'
  import MyNews from '../news/component_MyNews'
  import SelectDateTime from './SelectDateTime'
  import SelectDateTimeNew from './SelectDateTimeNew'
  import Map from '../shop/myShop/ShopMap'
  import AddItem from './AddItem'
  import {
    isNotEmptyStr,
    formatDate,
    parseStrToDate
  } from '../../assets/js/assist'
  import {
    checkLoginTime
  } from '../../assets/js/utils'
  import {
    getDwDetails,
    selectOrgResidentGroupByDwId,
    addGroupZuMemberAndFriend,
    checkDwManager,
    createGroup,
    addGrouper,
    asyncCreateGroup
  } from '../api/groupApi'
  import {
    addActivity,
    groupZuListOfDw,
    updateActivityDetail
  } from '../api/zhiWuApi'
  import {
    uploadFile
  } from '../api/mainApi'
  import componentLabel from './componentLabel'
  import componentJoinSetting from './componentJoinSetting'
  import componentMoneySetting from './componentMoneySetting'
  import componentSignSetting from './componentSignSetting'
  import componentPusherList from './componentPusherList'
  import componentActivityContent from './componentActivityContent'
  import setSubActivity from './setSubActivity2'
  import { queryShop } from '../api/shopApi'
  import componentLuckStar from './componentLuckStar'
  import FuncTabbar from '../../components/goods/FuncTabbar'
  import SelectVipCard from '../my/components/VipCardChoose'


  export default {
    data() {
      return {
        myCardShow:false,
        noSaveDraft:false,
        //当前操作的item下标
        currentItemIndex: -1,
        //活动添加项
        showJoiner: false,
        showFBNR: false,
        //活动流程
        showA: false,
        showB: false,
        showC: false,
        showSetSubActivity: false,
        showComponentActivityContent: false,
        //活动管理员弹窗
        showSignPusher: false,
        //选择模板 弹窗
        showFormwork: false,
        showStartTime: false,
        showEndTime: false,
        showAddress: false,
        showActivityContentLink: false,

        showLinkContent: false,
        // link:"http://twx.zhijiashare.com/#/openResContent/2c92e53e6f927589016fa320088e0254",
        link: "",
        linkContent: "",

        formatter: 'yyyy-MM-dd HH:mm:ss',
        dwDetail: {},
        zuList: [],
        currentUser: checkLoginTime(),
        allday: false,
        showMap: false,
        showMyNews: false,
        selectCheckbox: [],
        info: {
          num_limit: -100,
          content_url: "",
          publick: false,
          name: "",
          title: "",
          content: "",
          puber: checkLoginTime().id,
          team: '',
          groups: "",
          catagary: "",
          start_time: "",
          end_time: "",
          pid: "",
          websites: [],
          totalLoopCount:0,
          loopSign:false,
          hideNameAndPhone:false,
          addGroupMemFriends:false,
          showSignInfo:false,
          luckyStar : {},
          acSignSet : {
            "start_time": "",
            "end_time": "",
            "timelimit": false,
            "signtip": "",
            "pushers": "",
            "fillForm":true,
            "needPw":false,
            "extParameters":'[]',
            "opActivs":'',
            "acAfterSign":1,
            "toAction":""
          },
          presentShare:{shareCardId:'',shareNum:0}
        },
        //活动管理员
        hdmanager: [],
        //活动流程和子活动流程
        hdlc: [{
          id: 0,
        }],
        hdlcCache: [],
        template_DWWLRYDJB: {},
        dwDetails:{},
        active:0,
        showSetLoop:false,
        //活动方式   z社区活动
        showActivityType1:false,
        showActivityType2:false,
        activityType1:'业务活动',//默认 业务活动
        activityType2:'公开活动',//默认 公开活动
        activitylabel:"",

        showKeyBord:false,
        circleday:0,
        circlehour:0,
        circlemin:0,
        showActions:false,
        showActions2:false,
        showActions3:false,showActions4:false,showActions5:true,
        showNumLimit:false,tempLimit:'',showSelectSeeGroup:false,
        selectCheckboxSee: [],showLuckyStar:false,luckStar:[],
        activityIntroductionAndPromotionText:'',
        introductionAndPromotion:{
          content:'',
          link:'',
          openComments:false,
          showSignInfo:false,
          luckyStar:{}
        }
      }
    },
    methods: {
      //预览活动详情
      previewActivityDetails(){

      },

      getVip(giftShareCard) {
        this.info.presentShare = giftShareCard
        this.info.shareCardId = giftShareCard.id
        this.info.shareNum = giftShareCard.shareNum
        this.myCardShow = false
      },

      removeDraft(){
        localStorage.removeItem("addActivityDraft"+"-dwId-"+this.dwId)
      },


      saveDraft(dwId){
        this.noSaveDraft = true
        this.$toast("本地已经保存内容为草稿！")
        let data = {}

        data.info = this.info
        data.dwDetails = this.dwDetails
        data.hdlc = this.hdlc
        data.hdlcCache = this.hdlcCache
        data.introductionAndPromotion = this.introductionAndPromotion
        data.activityType1 = this.activityType1
        data.activityType2 = this.activityType2
        data.activitylabel = this.activitylabel
        data.selectCheckboxSee = this.selectCheckboxSee
        data.zuList = this.zuList

        localStorage.setItem("addActivityDraft"+"-dwId-"+this.dwId,JSON.stringify(data))

      },
      getDraft(dwId){
        let data = localStorage.getItem("addActivityDraft"+"-dwId-"+dwId)
        if(data!=null){
          data = JSON.parse(data)

          this.info = data.info
          this.dwDetails = data.dwDetails
          this.hdlc = data.hdlc
          this.hdlcCache = data.hdlcCache
          this.introductionAndPromotion = data.introductionAndPromotion
          this.activityType1 = data.activityType1
          this.activityType2 = data.activityType2
          this.activitylabel = data.activitylabel

          this.selectCheckboxSee = data.selectCheckboxSee
          this.zuList = data.zuList
          if(data.selectCheckboxSee.length>0){
            this.groupZuListOfDwAndSelectCheckboxSee(this.groupsee.split(','))
          }

        }
      },
      confirmActivityIntroductionAndPromotion(){
        debugger
        this.activityIntroductionAndPromotionText = '已设置'
      },
      confirmLabel(data){
        this.activitylabel = data
      },
      //子组件 查数据
      getLabelList(id,activitylabel){
        this.$refs.componentLabel.getUserTagList(id,activitylabel)
        // this.$refs.componentLabel.getMoreTag(id,activitylabel)
      },
      getLuckStarData(data) {
        let obj = data
        let type = obj.cust_type
        let luckstarItem = {}
        luckstarItem.value = obj.cust_header
        luckstarItem.name = obj.cust_name
        luckstarItem.luckTitle = obj.luckTitle
        if (type == 'shop') {
          luckstarItem.key = `s#${obj.id}`
        } else if (type == 'good') {
          luckstarItem.key = `m#${obj.id}`
        } else if (type == 'org') {
          luckstarItem.key = `o#${obj.id}`
        } else if (type == 'prop') {
         luckstarItem.key = `z#${obj.id}`
        } else if (type == 'zhibo') {
          luckstarItem.key = `j#${obj.id}`
        } else if (type == 'activity') {
          luckstarItem.key = `y#${obj.id}`
        }else if (type == 'shequ') {
          luckstarItem.key = `v#${obj.id}`
        }
        this.introductionAndPromotion.luckyStar = JSON.parse(JSON.stringify(luckstarItem))
      },
      addActivityPLDZ(){
        debugger
      },
      changeloopSign(nv){
//         //校验 开始时间 和结束时间
//         if(nv){
//           if(this.info.start_time && this.info.end_time){
//             let  st = parseStrToDate(this.info.start_time,"yyyy-MM-dd HH:mm:ss")
//             let  end = parseStrToDate(this.info.end_time,"yyyy-MM-dd HH:mm:ss")
//
//             if(st.getTime()>end.getTime()){
//               this.$toast("结束时间不能早于开始时间！")
//             }
//           }else{
//             this.$toast("请先设置活动有效期，再设置多次参与！")
//           }
//         }
      },
      setFormWork(index) {
        debugger
        return
        this.currentItemIndex = 0
        this.info.websites = []
        this.$http.get(`/static/activityFormwork/formwork${index}.json`).then(res => {
          this.template_DWWLRYDJB = res.body
          this.$refs.setSubActivity.setTemplate(res.body)
          // if(!this.info.name && res.body.activityName){
          //   this.info.name = res.body.activityName
          // }
          this.info.name = res.body.activityName
          // if(!this.info.content && res.body.activityContent){
          //   this.info.content = res.body.activityContent
          // }
          this.info.content = res.body.activityContent
          for (let i = 0; i < res.body.urls.length; i++) {
            let item = {
              name: '',
              url: res.body.urls[i]
            }
            this.info.websites.push(item);
          }
        })

      },
      confirmSignPusher(data) {
        let tArr = data.map(item => {
          return {
            photo: item.zuMemberHeader,
            roleId: item.zuMember
          }
        })
        // this.initHdmanager()
        this.hdmanager = []
        this.hdmanager = this.hdmanager.concat(tArr)
      },
      parseUrl() {
        let str = "";
        if (window.JsInterface) {
          str = window.JsInterface.paste();
        }
        //分割str  分别填充到标题和 文本编辑器
        if (str.indexOf("http") != -1) {
          this.introductionAndPromotion.link = str.slice(str.indexOf("http"));
        }
      },
      getSelectedNews(item) {
        console.log(item)
        this.introductionAndPromotion.link = item.url
      },
      addSubAcitvity() {
        let index = this.hdlc.length
        let obj = {
          id: 0
        }
        this.hdlc = this.hdlc.concat(obj)
        this.showSetSubActivity = true
        this.currentItemIndex = this.hdlc.length - 1
        this.hdlcCache.push({})
        this.$refs.setSubActivity.clearCache()
      },


      setActionData(index, object){
        // object.table.signTable
        // object.table.ifRequireAddress
        //
        // object.join.ifNeedPassword
        // object.join.ifWriteTable
        // object.join.luckyStar
        // object.join.selectedAction
        //
        // object.service.addFriend
        // object.service.addGroups
        // object.service.nextAction
        //
        // object.service.operation
        // object.service.operationText
        debugger
        let obj = {}

        obj.name = object.info.activityName
        obj.activityType = object.info.activityType

        //活动幸运星
        obj.luckyStarArray = object.action.luckyStarArray


//
//         if(object.action.limit>0){
//           obj.num_limit = object.action.limit
//         }else{
//           obj.num_limit = -100
//         }

        if (object.info.activityType == 'sign') {
          obj.pushers = ""
          obj.addGroupMemFriends = false
          if (object.action.startTime) {
            obj.timelimit = true
            obj.startTime = object.action.startTime
            obj.endTime = object.action.endTime
          } else {
            obj.timelimit = false
          }

          obj.signtip = JSON.stringify(object.table.signTable)
          obj.requestAddress = object.table.ifRequireAddress
          obj.addfriends = object.service.addFriend
          obj.groups = object.service.addGroups

          obj.needPw = object.join.ifNeedPassword
          obj.fillForm = object.join.ifWriteTable
          //参与幸运星
          obj.joinLuckyStar = object.join.luckyStar

           console.log("object.join.selectedAction",object.join.selectedAction)
          // let nameArray = object.join.selectedAction.map(item=>item.acName)
          let acActivsName = object.join.selectedAction.join(',')
          obj.opActivs = acActivsName
          console.log("object.service.nextAction",object.service.nextAction)
          obj.toAction = object.service.nextAction.join(',')
          //签到后通知  还是确认 1.仅通知 2.填写确认 3.选择操作
          if(obj.toAction){
            obj.acAfterSign = 2
          }else{
            obj.acAfterSign = object.service.operation
          }
          debugger
          //选择操作  转到指定任务


          this.setSignSetting(index, obj)
        } else if (object.info.activityType == 'pay') {
          obj.price = object.info.acFeeSet.fee
          obj.content = object.info.acFeeSet.des
          obj.skdw = object.info.acFeeSet.skdw
          obj.fixed = object.info.acFeeSet.fixed
          this.setAcFeeSetting(index, obj)
        }
      },

      setActivity(index, info) {
        debugger
        let obj = {}
        obj.name = info.activityName
        obj.activityType = info.activityType
        obj.luckyStarArray = info.luckyStarArray
        obj.num_limit = info.num_limit

        if (info.activityType == 'sign') {
          if (info.acSignSet.timelimit) {
            obj.timelimit = info.acSignSet.timelimit
            obj.startTime = info.acSignSet.start_time
            obj.endTime = info.acSignSet.end_time
          } else {
            obj.timelimit = false
          }
          obj.signtip = info.acSignSet.signtip
          obj.pushers = info.acSignSet.pushers
          obj.groupsee = info.groupsee
          obj.addfriends = info.addfriends
          obj.groups = info.groups
          obj.requestAddress = info.requestAddress
          obj.hideNameAndPhone = info.hideNameAndPhone
          obj.addGroupMemFriends = info.addGroupMemFriends
          obj.showSignInfo = info.showSignInfo
          this.setSignSetting(index, obj)
        } else if (info.activityType == 'pay') {
          obj.price = info.acFeeSet.fee
          obj.content = info.acFeeSet.des
          obj.skdw = info.acFeeSet.skdw
          obj.fixed = info.acFeeSet.fixed
          this.setAcFeeSetting(index, obj)
        } else if (info.activityType == 'join') {
          this.setJoinSetting(index, obj)
        }
      },
      setActivityData(index, data) {
        debugger
        this.hdlcCache[index] = JSON.parse(JSON.stringify(data))
        for (let i = 0; i < this.hdlcCache.length; i++) {
          if (this.hdlcCache[i].info) {
            console.log(i, this.hdlcCache[i].info.activityName)
          }
        }
      },
      deleteHDLC(index) {
        this.hdlc.splice(index, 1)
        this.hdlcCache.splice(index, 1)
      },
      setHDLC(obj) {
        // this.hdlc = obj
        let index = this.hdlc.length
        this.hdlc = this.hdlc.concat(obj)
        let flow = []
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].id == 1) {
            flow.push("acJoinSet")
            let acJoinSet = {
              "start_time": "",
              "end_time": "",
              "jointip": "bm",
              "des": "",
              "count": 500
            }
            this.setJoinSetting(index + i, acJoinSet)
          }
          //签名设置
          if (obj[i].id == 2) {
            flow.push("acSignSet")
            let acSignSet = {
              "start_time": "",
              "end_time": "",
              "timelimit": false
            }
            this.setSignSetting(index + i, acSignSet)
          }
          if (obj[i].id == 3) {
            flow.push("acFeeSet")
            let acFeeSet = {
              "price": 0
            }
            this.setAcFeeSetting(index + i, acFeeSet)
          }
        }
        // this.info.flow = flow.join(',')
      },



      setSignSetting(index, obj) {
        debugger
        console.log(obj)
        let acSignSet = {
          start_time: obj.startTime,
          end_time: obj.endTime,
          timelimit: obj.timelimit == false ? false : true,
          signtip: obj.signtip,
          pushers: obj.pushers,
          needPw:obj.needPw,
          fillForm:obj.fillForm,
          extParameters:JSON.stringify(obj.joinLuckyStar),
          acAfterSign:obj.acAfterSign,
          opActivs:obj.opActivs,
          toAction:obj.toAction
        }
        this.$set(this.hdlc[index], 'acSignSet', acSignSet)
        this.$set(this.hdlc[index], 'acName', obj.name)
        this.$set(this.hdlc[index], 'activityType', obj.activityType)
        this.$set(this.hdlc[index], 'groups', obj.groups)
        this.$set(this.hdlc[index], 'luckyStarArray', obj.luckyStarArray)
        this.$set(this.hdlc[index], 'num_limit', obj.num_limit)
        this.$set(this.hdlc[index], 'groupsee', obj.groupsee)
        this.$set(this.hdlc[index], 'addfriends', obj.addfriends)
        this.$set(this.hdlc[index], 'requestAddress', obj.requestAddress)
        this.$set(this.hdlc[index], 'hideNameAndPhone', obj.hideNameAndPhone)
        this.$set(this.hdlc[index], 'addGroupMemFriends', obj.addGroupMemFriends)

        this.$set(this.hdlc[index], 'fillForm', obj.fillForm)
        this.$set(this.hdlc[index], 'acAfterSign', obj.acAfterSign)
        this.$set(this.hdlc[index], 'opActivs', obj.opActivs)
        this.$set(this.hdlc[index], 'toAction', obj.toAction)
      },
      setAcFeeSetting(index, obj) {
        let acFeeSet = {
          "skdw": obj.skdw,
          "fee": obj.price,
          "des": obj.content,
          "fixed": obj.fixed
        }
        this.$set(this.hdlc[index], 'acFeeSet', acFeeSet)
        this.$set(this.hdlc[index], 'acName', obj.name)
        this.$set(this.hdlc[index], 'activityType', obj.activityType)
        this.$set(this.hdlc[index], 'groups', obj.groups)
        this.$set(this.hdlc[index], 'luckyStarArray', obj.luckyStarArray)
        this.$set(this.hdlc[index], 'num_limit', obj.num_limit)
      },


      setJoinSetting(index, obj) {
        let acJoinSet = {
          "start_time": obj.startTime,
          "end_time": obj.endTime,
          "jointip": "bm",
          "des": obj.content,
          "num_limit": obj.count
        }
        this.$set(this.hdlc[index], 'acJoinSet', acJoinSet)
        this.$set(this.hdlc[index], 'acName', obj.name)
        this.$set(this.hdlc[index], 'activityType', obj.activityType)
        this.$set(this.hdlc[index], 'luckyStarArray', obj.luckyStarArray)
        this.$set(this.hdlc[index], 'num_limit', obj.num_limit)
      },

      //设置活动地点
      changeAddress() {
        if (this.getSessionStorage('ShopMap_address')) {
          let addressObj = JSON.parse(this.getSessionStorage('ShopMap_res'))
          let position = {
            "longitude": "",
            "latitude": "",
            "address": ""
          }
          position.longitude = addressObj.point.lng
          position.latitude = addressObj.point.lat
          position.address = this.getSessionStorage('ShopMap_address')
          this.$set(this.info, 'position', position)
          this.removeSessionStorage('ShopMap_address')
          this.removeSessionStorage('ShopMap_point')
          this.removeSessionStorage('ShopMap_fw')
          this.removeSessionStorage('ShopMap_res')
        }
      },
      closeMap(status) {
        this.showMap = status;
        this.changeAddress();
      },
      setKSSJ(value,value2) {
        this.info.start_time = value
        this.$refs.selectDateTimeNew.dialogShow2 = true
        this.$refs.selectDateTimeNew.minDate = new Date(value2.getTime() + 1000 * 60);
      },
      setJSSJ(value) {
        this.info.end_time = value
        this.$refs.selectDateTimeNew.minDate = new Date(2019,1,1)
      },
      onRead(event) {
        let that = this;
        let fileList = event.target.files
        if (fileList && fileList.length > 0) {
          const loading = that.$toast.loading({
            mask: true,
            message: '上传中...',
            duration: 10000
          })
          // alert("从这里开始上传");
          let formData = new FormData()
          formData.append("file", fileList[0])
          uploadFile(formData, (res) => {
            // alert(JSON.stringify(res));
            try {
              if (res.code == 0) {
                //只能上传一张封面图片
                this.info.websites = []
                let item = {
                  name: '',
                  url: ''
                }
                item.url = res.data
                this.info.websites.push(item);
              } else {
                this.$toast(res.msg)
              }
            } finally {
              loading.clear();
            }
          })
        }
      },
      onePicUploadComplete(event) {
        this.$toast("上传图片完成")
        let that = this;
        if (event) {
          //只能上传一张封面图片
          that.info.websites = []
          event.forEach((val, key) => {
            let item = {
              name: '',
              url: ''
            }
            item.url = val.data
            that.info.websites.push(item);
          })
        } else {
          that.$toast(event[0].msg)
        }
      },
      picUploadComplete(event) {
        this.$toast("上传图片完成")
        let that = this;
        if (event) {
          event.forEach((val, key) => {
            let item = {
              name: '',
              url: ''
            }
            item.url = val.data
            that.info.websites.push(item);
          })
        } else {
          that.$toast(event[0].msg)
        }
      },
      videoUploadComplete(event){
        // this.forbidUploadVedio = true
        //把视频地址放到轮播图第一个位置
        //视频截图 在录播显示，视频地址
        if(event.length>0){
          let item = {
            name: 'video',
            url: event[0].data,
          }
          this.info.websites.unshift(item)
          this.$toast("上传视频完成")
        }else{
          this.$toast("回调结果："+JSON.stringify(event))
          // this.forbidUploadVedio = true
          this.$toast("上传视频失败")
        }
      },
      videoUploadError(event){
        this.$toast("上传视频出错...")
        this.$toast(JSON.stringify(event))
      },
      // 上传图片
      uploadImg() {
        // let item = {
        //   name: 'vedio',
        //   url: "https://python-server.oss-cn-shenzhen.aliyuncs.com/VIDEO_20200409_172630.mp4"
        // }
        // this.info.websites.unshift(item)
        window.picUploadComplete = this.picUploadComplete
        window.videoUploadComplete = this.videoUploadComplete
        window.videoUploadError = this.videoUploadError
        if (window.JsInterface) {
          if(!this.forbidUploadVedio && window.JsInterface.selectAllMedia){
            window.JsInterface.selectAllMedia(8-this.info.websites.length,"")
          }else{
            window.JsInterface.selectImages(8-this.info.websites.length, "");
          }
        }else{
            this.$refs.files.click()
        }
      },
      // 上传图片
      uploadOneImg() {
        window.picUploadComplete = this.onePicUploadComplete
        window.videoUploadError = this.videoUploadError
        if (window.JsInterface) {
          window.JsInterface.selectImages(1, "");
        }else{
            this.$refs.files.click()
        }
      },


      //发布活动
      //1 校验参数
      checkParameter(){
        let flag = false
        if (!this.info.name) {
          this.$toast("请输入活动标题！")
          flag = true
        }else if (this.info.websites.length==0) {
          this.$toast("请上传活动封面照片！")
          flag = true
        }else if (this.info.websites.length==1 && this.info.websites[0].name == "vedio"){
          this.$toast("您已上传了活动视频，请上传活动封面照片！")
          flag = true
        }else if (this.hdlc.length == 0) {
          this.$toast("请设置一个活动流程!")
          flag = true
        }

        //检验所有收费活动 是否设置正确的费用
        for (let i = 0; i < this.hdlc.length; i++) {
          let totalFee = 0
          let item = this.hdlc[i]
          if (item.activityType == 'pay') {
            if (!item.acFeeSet.fee) {
              this.$toast.fail({
                message: "请确保所有活动经费流程的费用已设置！",
                duration: 3000
              })
              flag = true
              break
            }
          }
        }

        //判断活动周期时间是否正确
        if(this.info.totalLoopCount != 0 && this.info.totalLoopCount != -1){
          // 判断周期 是否大于等于活动时间
          if(this.info.start_time && this.info.end_time){
            let  start = parseStrToDate(this.info.start_time,"yyyy-MM-dd HH:mm:ss")
            let  end = parseStrToDate(this.info.end_time,"yyyy-MM-dd HH:mm:ss")

            if(start.getTime()>=end.getTime()){
              this.$toast("结束时间必须大于开始时间！")
              flag = true
            }
            if(this.loopCircle>=Math.floor((end.getTime()-start.getTime())/1000)){
              this.info.loopCircle = this.loopCircle
            }else{
              this.$toast("活动开放的时间段不能超过活动周期时间")
              flag = true
            }
          }else{
            this.$toast("如果要开启活动循环，请设置具体的活动开始时间和结束时间")
            flag = true
          }
        }else{
          this.info.totalLoopCount = -1
        }

        //没有设置活动时间  默认开始时间为当天    结束时间为 2022/1/1
        if(!this.info.start_time){
          this.info.start_time = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
        }
        if(!this.info.end_time){
          this.info.end_time = formatDate(new Date(2032,2,2), 'yyyy-MM-dd HH:mm:ss')
        }
        if(this.info.start_time>this.info.end_time){
          this.$toast("开始时间不能晚于结束时间！")
          flag = true
        }
        if(this.info.start_time==this.info.end_time){
          this.$toast("开始时间不能等于结束时间！")
          flag = true
        }
        if(this.info.end_time<=formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')){
          this.$toast("活动的结束时间不能早于当前时间！")
          flag = true
        }

        return flag
      },

      async addActivity(dwId) {
        //校验必填参数
        if(this.checkParameter()){
          //停止发布活动
          return
        }
        //处理活动标签
        let labelResult = this.$refs.componentLabel.getResult()
        if(labelResult){
          this.info.userTagList = labelResult.replace(/、/g,",")
        }
        //活动类型1
        this.info.catagary = this.activityType1
        //活动类型2
        if (this.activityType2 == '公开活动') {
          this.info.seetype = 1
        } else if (this.activityType2 == '团队活动') {
            this.info.seetype = 2
            if(this.groupsee){
              this.info.groupsee = this.groupsee
            }else{
              this.$toast("活动类型为团队活动，必选选择参与团队！")
              this.showActions3=true
              return
            }
        } else if('z社区活动') {
          this.info.seetype = 3
        }
        //*******************活动介绍推广*******************
        /*
        introductionAndPromotion:{
          content:'',
          link:'',
          openComments:false,
          showSignInfo:false,
          luckyStar:{}
        }
        */
        if (this.introductionAndPromotion.link) {
          this.info.content_url = this.introductionAndPromotion.link
        }
        if(this.introductionAndPromotion.content){
          this.info.content = this.introductionAndPromotion.content
          // this.info.content = this.introductionAndPromotion.content.replace(/\n/g, "<br/>");
          // this.info.content = this.introductionAndPromotion.content.replace(/\r\n/g, "<br/>");
          // this.info.content = this.introductionAndPromotion.content.replace(/\s/g, "&nbsp;");
        }
        this.info.openComments = this.introductionAndPromotion.openComments
        this.info.showSignInfo = this.introductionAndPromotion.showSignInfo
        //活动幸运星
        if(this.introductionAndPromotion.luckyStar.key){
          let array = []
          array.push(this.introductionAndPromotion.luckyStar)
          this.info.extParameters = JSON.stringify(array)
        }
        //*******************活动介绍推广*******************
        // 活动管理员
        this.info.activityManager = this.hdmanager.map(item=>item.roleId).join(",")
        //活动单位
        this.info.team = dwId

        //取第一个活动流程
        let item = this.hdlc[0]

        if (item.activityType == 'sign') {
          this.info.acSignSet = item.acSignSet
        } else if (item.activityType == 'pay') {
          this.info.acFeeSet = item.acFeeSet
          delete this.info.acSignSet
          console.log(this.info.acSignSet)
        }
        if (item.groups) {
          this.info.groups = item.groups
        }
        if (item.addfriends) {
          this.info.addfriends = item.addfriends
        }
        if (item.requestAddress) {
          this.info.requestAddress = item.requestAddress
        }
        if(item.luckyStarArray && item.luckyStarArray.length>0){
          this.info.extParameters = JSON.stringify(item.luckyStarArray)
        }

        if(item.hideNameAndPhone){
          this.info.hideNameAndPhone = item.hideNameAndPhone
        }
        if(item.addGroupMemFriends){
          this.info.addGroupMemFriends = item.addGroupMemFriends
        }else{
          this.info.addGroupMemFriends = false
        }
        if(item.showSignInfo){
          this.info.showSignInfo = item.showSignInfo
        }
        if (!item.acName) {
          this.$toast("请设置一个具体的任务!")
          return
        }
        if(this.info.presentShare) {
          delete this.info.presentShare
        }
        this.info.title = "0" + item.acName

        debugger
        // debugger
        const loading = this.$toast.loading({
          mask: true,
          message: '发布活动中...',
          duration: 3000
        })

        //把后勤组的id和主活动关联起来
        let hqgroupid = await this.createHQGroup()
        this.info.hqgroupid = hqgroupid

        //创建活动参与者管理群
        let signgroupid = await this.createGroup(this.info.title.substr(1))
        this.info.signgroupid = signgroupid
        //创建后勤组
        //创建空群,非聊天群，加多一组type， 签到人签到完后  拉进去统一管理，发布者为群主,统一管理。

        addActivity(this.info, async(res) => {
          localStorage.removeItem("addActivityDraft"+"-dwId-"+this.dwId)
          //item  为this.hdlc[0]
          item.id = res.id
          loading.clear()
          if (this.hdlc.length == 1) {
            this.noSaveDraft = true
            this.pageTo(`/dwActivityList/${dwId}`,true)
          } else {
            this.info.pid = res.id
            for(let i = 0; i < this.hdlc.length; i++) {
              let item = this.hdlc[i]
              if (i > 0) {
                let obj = {
                  "name": this.info.name,
                  "title": i + item.acName,
                  "pid": this.info.pid,
                  "publick": false,
                  "puber": this.currentUser.id,
                  "team": dwId,
                  "catagary": "业务活动",
                  "websites": this.info.websites,
                  "groups": item.groups,
                  "content_url": "",
                  "num_limit": this.info.num_limit,
                  "activityManager":this.info.activityManager,
                  "start_time":this.info.start_time,
                  "end_time":this.info.end_time,
                  "totalLoopCount":this.info.totalLoopCount,
                  "loopSign":this.info.loopSign,
                  "hideNameAndPhone":false,
                  "addGroupMemFriends":true,
                  "showSignInfo":false,

                }
                if(item.luckStar && item.luckStar.length>0){
                  obj.extParameters = JSON.stringify(item.luckStar)
                }
                if(item.hideNameAndPhone){
                  obj.hideNameAndPhone = item.hideNameAndPhone
                }
                if(item.addGroupMemFriends){
                  obj.addGroupMemFriends = item.addGroupMemFriends
                }
                if(item.showSignInfo){
                  obj.showSignInfo = item.showSignInfo
                }

                obj.seetype = "1"
                obj.groupsee = ""
                if(item.groupsee){
                  obj.seetype = "2"
                  obj.groupsee = item.groupsee
                }
                obj.addfriends = item.addfriends
                if (item.activityType == 'join') {
                  obj.acJoinSet = item.acJoinSet
                } else if (item.activityType == 'sign') {
                  obj.acSignSet = item.acSignSet
                } else if (item.activityType == 'pay') {
                  obj.acFeeSet = item.acFeeSet
                }
                //创建活动参与者管理群
                let signgroupid = await this.createGroup(obj.title.substr(1))
                obj.signgroupid = signgroupid

                addActivity(obj, (res) => {
                  item.id = res.id
                  if ((i + 1) == this.hdlc.length) {
                    //发布到最后一个子活动     遍历找父活动 修改 选择操作id  和 下个活动id
                    for (let i = 0; i < this.hdlc.length; i++) {
                      console.log(this.hdlc[i].id)
                      if(this.hdlc[i].opActivs){
                        //split
                        let tp = {}
                        tp.id = this.hdlc[i].id
                        tp.acSignSet = {}
                        tp.acSignSet.opActivs = this.hdlcNameToId(this.hdlc,this.hdlc[i].opActivs)
                        tp.acSignSet.toAction = this.hdlcNameToId(this.hdlc,this.hdlc[i].toAction)
                        updateActivityDetail(tp,(resss)=>{
                          console.log(resss)
                        })
                        // localStorage.getItem()
                        console.log("遍历找父活动 修改 选择操作id  和 下个活动id")
                      }
                    }

                    this.$toast("发布活动成功！")
                    setTimeout(() => {
                      this.noSaveDraft = true
                      this.pageTo(`/dwActivityList/${dwId}`,true)
                    }, 800)
                  }
                })
              }
            }
          }
        })
      },

      hdlcNameToId(hdlc,name){
        let nameArray = name.split(",")
        let idArray = []
        for (let i = 0; i < nameArray.length; i++) {
          for (let ii = 0; ii < hdlc.length; ii++) {
            if(nameArray[i] == hdlc[ii].acName){
              idArray.push(hdlc[ii].id)
              break
            }
          }
        }
        return idArray.join(',')
      },
      groupZuListOfDw(dwId) {
        groupZuListOfDw(dwId, (res) => {
          if (res.code == 0) {
            this.zuList = res.data
          }
        })
      },
      groupZuListOfDwAndSelectCheckboxSee(zuIds) {
        this.selectCheckboxSee = []
        if (this.zuList == 0) {
          groupZuListOfDw(this.dwId, (res) => {
            if (res.code == 0) {
              this.zuList = res.data
              this.zuList.forEach(item => {
                if (zuIds.indexOf(item.id) != -1) {
                  this.selectCheckboxSee.push(item)
                }
              })
            }
          })
        } else {
          this.zuList.forEach(item => {
            if (zuIds.indexOf(item.id) != -1) {
              this.selectCheckboxSee.push(item)
            }
          })
        }
      },
      // 预览图片
      previewPicture() {
        let that = this;
        that.$imgPre({
          images: that.info.websites.map(item => item.url)
        })
      },
      // 删除图片
      deleteImg(index) {
        this.info.websites.splice(index, 1)
      },
      initHdmanager() {
        let obj = {}
        obj.roleId = this.currentUser.role_id
        obj.photo = this.currentUser.avatar
        this.hdmanager = []
        this.hdmanager.push(obj)
      },
      //创建活动参与者管理群
      async createGroup(name){
        debugger
        let params = {
          "name":name+"流程参与者",
          "type":"23",
          "dwId":this.info.team,
          "members":[
            {
              "remark": "无",
              "zuIdentity": "3",
              "zuMember": checkLoginTime().role_id,
              "zuMemberType": "1",
              "zuWork": ""
            },
          ]
        }
        let res = await asyncCreateGroup(params)
        console.log("createGroup ok")
        return res.data.id
      },
      //活动后勤人员聊天群,普通的游离群
      async createHQGroup(){
        debugger
        let params = {
          "name":this.info.name+"-活动后勤组",
          "type":"6",
          "chatType":"6",
          "members":[
            {
              "remark": "无",
              "zuIdentity": "3",
              "zuMember": checkLoginTime().role_id,
              "zuMemberType": "1",
              "zuWork": ""
            },
          ]
        }
        let res = await asyncCreateGroup(params)
        console.log("createHQGroup ok")
        if(res.code==0){
          //先建群后拉人
          //建群  把所有后勤人员 拉在一起  并且记录在活动字段中
          //遍历活动流程里面的相关人员
          let roleIdArray = []
          for (let i = 0; i < this.hdlc.length; i++) {
            //推送人
            if(this.hdlc[i].acSignSet && this.hdlc[i].acSignSet.pushers ){
              roleIdArray = roleIdArray.concat(this.hdlc[i].acSignSet.pushers.split(','))
            }
            //完成任务加好友的人
            if(this.hdlc[i].addfriends){
              roleIdArray = roleIdArray.concat(this.hdlc[i].addfriends.split(','))
            }
          }
          //活动管理员
          for (let i = 0; i < this.hdmanager.length; i++) {
            roleIdArray.push(this.hdmanager[i].roleId)
          }
          console.log(roleIdArray)
          let params1 = {
            zuId: res.data.id,
            roleIds: roleIdArray.join(','),
          }
          if(params1.roleIds){
            addGrouper(params1, (res) => {
              if (res.code != 0) {
                this.$toast(res.msg)
              }
            })
          }
        }
        return res.data.id
      },
      clearCache(){
        Object.assign(this.$data, this.$options.data())
      }
    },
    computed: {
      typeAndLimitText(){
        return this.activityType2 + "（"  + (this.info.num_limit>0?(this.info.num_limit+'人'):'不限人数') + ")"
      },
      typeAndLabelText(){
        if(this.activitylabel){
          return this.activitylabel.replace(/、/g,"/") +"["+this.activityType1+"]"
        }else{
          return "["+this.activityType1+"]"
        }
      },
      groupsee() {
        let groups = this.selectCheckboxSee.map(item => item.id)
        return groups.join(',')
      },
      seeGroupsName() {
        let groups = this.selectCheckboxSee.map(item => item.dwZuName)
        return groups.join(',')
      },
      zuListFXQ() {
        let array = ["2", "3", "9", "10", "12","14"]
        return this.zuList.filter(item => {
          return array.indexOf(item.dwZuType) != -1
        })
      },
      zuListTD() {
        let array = ["2", "3", "9", "10", "12","14"]
        return this.zuList.filter(item => {
          return array.indexOf(item.dwZuType) == -1
        })
      },
      forbidUploadVedio(){
        // for(this.info.websites)
        //遍历轮播图  查看是否有视频  有视频 返回false 没有视频返回true
        let haveVideo = false
        for (let i = 0; i < this.info.websites.length; i++) {
          if(this.info.websites[i].name == "vedio" || this.info.websites[i].name == "video"){
            haveVideo = true
          }
        }
        return haveVideo
      },
      groups() {
        let groups = this.selectCheckbox.map(item => item.id)
        return groups.join(',')
      },
      groupsName() {
        let groups = this.selectCheckbox.map(item => item.dwName + item.dwZuName)
        return groups.join(',')
      },
      activityCycle(){
        if(this.info.totalLoopCount==-1 || this.info.totalLoopCount==0){
          return "不循环"
        }else{
          let i = `每${this.circleday}天${this.circlehour}小时${this.circlemin}分钟(${this.info.totalLoopCount}次)`
          return i;
        }
      },
      loopCircle(){
        let i = ((24*parseInt(this.circleday)+parseInt(this.circlehour))*60+parseInt(this.circlemin))*60
        return i
      },
    },
    components: {
      ZjHead,
      SelectDateTime,SelectDateTimeNew,
      Map,
      AddItem,
      componentLabel,
      componentJoinSetting,
      componentMoneySetting,
      componentSignSetting,
      componentPusherList,componentLuckStar,FuncTabbar,componentActivityContent,
      setSubActivity,
      openResContent,
      MyNews,SelectVipCard
    },
    watch: {
      tempLimit(nv){
        if(nv){
          this.tempLimit = nv.replace(/\D/g,'')
        }
        if(nv.length==1 && nv.length==0){
          this.tempLimit = 1
        }
      },
      showB(nv) {
        if(nv){
          this.$refs.componentMoneySetting.getDwDetails(this.dwId)
        }
      },
      'info.totalLoopCount':{
         handler: function(nv,ov) {
           if(nv){
             this.info.totalLoopCount = nv.replace(/\D/g,'')
           }
           if(nv.length>4){
             this.info.totalLoopCount = '9999'
           }
           if(nv==0&&nv.length>1){
             this.info.totalLoopCount = '0'

           }

         },
      },
      circleday(nv,ov) {
        if(nv){
          this.circleday = nv.replace(/\D/g,'')
        }
        if(nv.length>4){
          this.circleday = '9999'
        }
        if(nv==0&&nv.length>1){
          this.circleday = '0'
        }
      },
      circlehour(nv,ov) {
        if(nv.length>2){
          this.circlehour = ov
          return
        }
        if(nv){
          this.circlehour = nv.replace(/\D/g,'')
        }
        if(nv>23){
          this.circlehour = '23'
        }
        if(nv==0&&nv.length>1){
          this.circlehour = '0'
        }
      },
      circlemin(nv,ov) {
        if(nv.length>2){
          this.circlemin = ov
          return
        }
        if(nv){
          this.circlemin = nv.replace(/\D/g,'')
        }
        if(nv>59){
          this.circlemin = '59'
        }
        if(nv==0&&nv.length>1){
          this.circlemin = '0'
        }
      },
    },
    props: {
      dwId: {
        type: String,
        default: ''
      },
    },
    activated() {
      this.clearCache()
      this.$refs.files.onchange = this.onRead
      getDwDetails(this.dwId,(res)=>{
        this.dwDetails = res
      })
      this.getDraft(this.dwId)
      this.groupZuListOfDw(this.dwId)
      this.initHdmanager()
    },
    beforeRouteEnter(to, from, next) {
      if (!to.params.dwId) {
        queryShop({
          userId: checkLoginTime().id
        }, (res) => {
          if (res.code == 0) {
            next(`/addActivity2/${res.data[0].shopDw}`,true);
          }
        })
      } else {
        next()
      }
    },
    beforeRouteLeave(to, from, next) {
      console.log(this)
      //查看编辑的内容是否已经发布了
      debugger
      if ((!this.noSaveDraft) && (this.info.name ||this.hdlc.length>1)) {
        this.$dialog.confirm({
          message: '已有内容输入,是否保存草稿再离开页面？',
          showCancelButton: true,
          confirmButtonText: '保存',
          cancelButtonText: '否'
        }).then(() => {
          this.saveDraft()
          next()
        }).catch(() => {
          this.$dialog.close();
          next()
        })
      } else {
        next()
      }
    },
  }
</script>

<style scoped>
  .sa_container {
    background-color: #ebebeb;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .xycenter {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: center;
  }

  .lineHeight44{
    line-height: 44px;height: 44px;text-align: center;position: relative;
  }
  /* 图钉图片 */
  .tack_images {
    padding: 10px;
    display: flex;
    display: -webkit-flex;
    background-color: #fff;
    flex-flow: row wrap;
  }

  /* 添加图片 */
  .add_tack_images {
    background-image: url('../../assets/img/pub/tree_ico_photo_nor.png');
    width: 20%;
    height: 0;
    padding-bottom: 20%;
    background-size: 100%;
  }

  /* 图片列表 */
  .tack_images_wrap {
    width: 20%;
    height: 0;
    padding-bottom: 20%;
    position: relative;
    /* overflow: hidden; */
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .tack_images_wrap img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 删除图片按钮 */
  .delete_image {
    position: absolute;
    top: -5px;
    right: -5px;
  }

  .hdlccss {
    font-size: 13px;
    justify-content: space-between;
    padding: 5px 10px
  }

  .custom_item {
    padding: 10px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
  }

  .custom_item::after {
    content: ' ';
    position: absolute;
    pointer-events: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    left: 10px;
    right: 0;
    bottom: 0;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    border-bottom: 1px solid #ebedf0;
  }

  .custom_item_img {
    width: 20px;
    position: absolute;
    top: 16px;
    left: 75px;
  }
  .tag{
    margin: 5px;
    background: #E3E3E3;
    padding: 5px;
    border-radius: 45%;
    color: #000;
  }
  .onepxitem::after{
    content: ' ';
    position: absolute;
    pointer-events: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    border-top: 1px solid #ebedf0;
    border-bottom: 1px solid #ebedf0;
  }
  ul,li {
  	list-style: none;
    padding: 2px;
  }

  .slide-box {
  	display: -webkit-box;
  	overflow-x: auto;
  	/*适应苹果*/
  	-webkit-overflow-scrolling: touch;
  }
  .slide-item {

  }
  /*隐藏掉滚动条*/
  .slide-box::-webkit-scrollbar {
  	display: none;
  }
  .custinput{
    outline-style: none;border: 0px;width: 40px;color: #3298FF;text-align: center;
  }

  .selectedClass{
    background-color: #3298FF;color: #fff;
  }
  .unselectClass{
    background-color: #E3E3E3;
  }
  .flex_value_2{
    flex: 2;
  }
  .gift-wrap {
    flex-direction: row-reverse;
  }
  .gift-name {
    max-width: 4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
  .gift-img-wrap {
     height: 25px;
    width: 33px;
  }
  .gift-wrap img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
</style>
