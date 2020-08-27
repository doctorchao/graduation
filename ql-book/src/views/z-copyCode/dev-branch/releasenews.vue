<template>
  <div class="rn_container editor">
    <!-- 上传input框 -->
    <input style="display: none;" ref="files" type="file" accept="image/*" name="files" id="files" multiple />

    <div class="van-nav-bar van-hairline--bottom" style="font-size: 16px; z-index: 1;">
      <div class="van-nav-bar__left" @click="pageBack()">
        <i class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i>
        <span class="van-nav-bar__text" style="font-size: 16px;">发布地图新闻</span>
      </div>
      <div class="van-nav-bar__title van-ellipsis"></div>
      <div class="van-nav-bar__right">
        <span v-show="appFlag" @click="writeToPage()" style="margin-right: 20px; color: rgb(25, 137, 250); font-size: 16px;">粘贴链接</span>
        <!-- <span @click="goMyNew()" style="color: rgb(25, 137, 250); font-size: 16px;">我的资讯</span> -->
        <!-- <span @click="pageTo(`/orgReleaseNews/${orgId}`)" style="color: rgb(25, 137, 250); font-size: 16px;">单位资讯</span> -->
        <span @click="pageTo(`/thumbtackRelease/0/${orgId}`)" style="color: rgb(25, 137, 250); font-size: 16px;">发布图钉</span>
      </div>
    </div>

    <div class="rn_info">
      <div class="rn_info_item">
        <van-cell-group>
          <van-field v-model="info.res.title" type="textarea" rows="1" autosize placeholder="请输入新闻标题" maxlength="54" />
        </van-cell-group>
      </div>
      <!-- 编辑器 -->
      <div @click.stop style="background-color: #008200;position: relative;">
        <div v-show="isCopy" style="width: 100%; height: 20%; background-color: transparent;
					position: absolute; z-index: 999;"></div>
        <!-- 要修改背景颜色 -->
        <div class="rn_info_item" :class="changeColor">
          <Editor ref="editor" @getEditor="getEditor" @addImg="addImg" @paste="paste"></Editor>
        </div>
        <div class="break_wrap"></div>
        <div class="rn_info_item">
          <van-row type="flex" align="center">
            <van-col span="7">
              <div class="rn_info_item_head">
                <label class="rn_info_item_lab">上传新闻封面</label>
              </div>
            </van-col>
            <van-col span="15">
              <div class="rn_info_item_con avatar-list" @click="uploadImg()">
                <div v-if="!info.news.imageUrlList[0]">
                  <img src="../../assets/img/pub/tree_ico_photo_nor.png" width="30" height="30"/>
                </div>
                <!-- <template v-for="item in info.news.imageUrlList">
                  <img :src="item" width="30" height="30" />
                </template> -->
                <img :src="info.news.imageUrlList[0]" width="30" height="30" v-if="info.news.imageUrlList[0]"/>
              </div>
            </van-col>
            <van-col span="2">
              <div class="right-icon">
                <van-icon size="14px" name="arrow"></van-icon>
              </div>
            </van-col>
          </van-row>
        </div>
        <!-- <div class="rn_info_item">
          <van-cell :value="info.news.category" title="新闻类别" placeholder="请选择新闻类别" input-align="right" readonly is-link
            @click="clickXWLB" />
        </div> -->
        <componentLabel v-show="dwDetails.roleid" ref="componentLabel" :dwRoleId="dwDetails.roleid" :dwId="orgId" sortType='3' title="新闻类别/标签"></componentLabel>
        <div class="rn_info_item">
          <van-cell :value="address" title="新闻发生地" placeholder="请选择新闻发生地" input-align="right" :isLink="address?false:true" readonly  @click="selectMap">
              <template slot="right-icon" v-if="address">
                <img src="../../assets/img/pub/pub_ico_listaddressblus.png" alt="" width="18px" height="18px" style="margin-left:5px;vertical-align:bottom">
              </template>
          </van-cell>
        </div>
        <div class="break_wrap"></div>
        <div class="rn_info_item">
          <van-cell title="同时发布到" value="图钉/社区" input-align="right" readonly is-link @click="repostNews=true" />
        </div>
        <div class="break_wrap"></div>
        <!-- @click="select_author.show=true" -->
        <!-- <div class="rn_info_item">
          <van-cell title="作者" :value="info.news.author" readonly is-link />
        </div> -->
        <!-- <div class="rn_info_item">
          <van-row type="flex" align="center">
            <van-col span="10">
              <div class="rn_info_item_head">
                <label class="rn_info_item_lab">转发到我的图钉</label>
              </div>
            </van-col>
            <van-col span="14">
              <div class="rn_info_item_con">
                <van-switch v-model="zftd" size="22px" style="color: #3298FF;" />
              </div>
            </van-col>
          </van-row>
          <van-row type="flex" v-if="zftd==true" align="center">
            <van-cell-group>
              <van-field v-model="valuezf" placeholder="请输入转发内容" />
            </van-cell-group>
          </van-row>
        </div> -->
        <van-cell @click="starFlag = true"  title="我的传单" placeholder="" is-link>
          <template slot="icon">
            <img width="16" height="17" style="margin:auto 5px auto 0" src="../../assets/img/pub/tuding_label_luckystar.png" />
          </template>
          <div class="flex starFlag_wrap">
            <div v-if="banner && banner.select">
              <img v-lazy="banner.fileUrl" alt="">
            </div>
            <div class="gift-name">{{banner.title}}</div>
          </div>
        </van-cell>
        <van-cell @click="myCardShow = true"  title="智加有礼分享" placeholder="" is-link>
          <template slot="icon">
            <img width="16" height="17" style="margin:auto 5px auto 0" src="../../assets/img/goods/pub_ico_zjyfx.png" />
          </template>
          <div class="flex gift-wrap" v-if="giftShareCard && giftShareCard.id">
            <div class="gift-name">{{this.giftShareCard.name}}</div>
            <div class="gift-img-wrap">
              <img v-lazy="giftShareCard.header" alt="">
            </div>
          </div>
        </van-cell>
        <div class="break_wrap"></div>
        <!-- 新增加的，没有跳转链接 -->
        <!-- <div class="rn_info_item">
          <van-cell :value="dwName" title="发送到我的单位资讯" placeholder="请选择单位" input-align="right" readonly is-link @click="showSelectDW=true" />
        </div> -->


        <van-cell title="谁可以看" is-link @click="endWho()" v-if="!skykFlag">
          <div v-for="(item, index) in endWhoImages" :key="index" style="float: left;">
            <img v-lazy="item" style="width: 20px;height: 20px;margin-top: 2px;" />
          </div>
        </van-cell>
        <div class="rn_info_item" v-else>
          <van-cell :value="skykString" title="谁可以看" input-align="right" readonly is-link @click="endWho()" />
        </div>
        <van-cell title="@提醒谁看" is-link @click="remindWho()">
          <div v-for="(item, index) in remindWhoImages" :key="index" style="float: left;">
            <img v-lazy="item" style="width: 20px;height: 20px;margin-top: 2px;" />
          </div>
        </van-cell>
      </div>
    </div>

    <!-- <div class="rn_info_item" style="margin-top: 10px;">
      <van-row type="flex" align="left">
        <span style="margin:5px 5px 5px 5px">我的传单</span>
      </van-row>
    </div>
    <div class="rn_info_item" style="margin-bottom: 12px;">
      <van-row type="flex" align="center" style="background: #ff3131;">
        <van-col span="4">
          <img class="img" :src="banner.fileUrl" style="width:50px;height: 50px;" @click="starFlag = true" />
        </van-col>
        <van-col span="14">
          <span style="font-size: 10pt; color:#FFFFFF;">{{banner.title}}</span>
          <br />
          <span style="font-size: 8pt;background-color: #ff6f6f;">
            <template v-if="!bannerFlag">点我，把你的传单放在这里，小智帮你去宣传！</template>
            <template v-else>
              <input class="bannerslogan" placeholder="广告语" v-model="banner.slogan" />
            </template>
          </span>
        </van-col>
      </van-row>
    </div> -->
    <div style="margin-bottom:52px ;font-size: 14px;text-align: center;">
      <span>注意事项：实事求是，禁止无中生有，发布虚假消息！</span>
    </div>
    <div :style="checkWxDev()?'height:0.8rem':''"></div>
    <func-tabbar left-text="发布" @click-left="save()" :showRightImage="false" rightText="预览" @click-right="previewEvent"></func-tabbar>
    <van-dialog v-model="dialogParams.show" show-cancel-button :before-close="beforeClose">
      <div style="padding: 10px 0;">
        <van-field type="textarea" rows="1" autosize v-model="dialogParams.inputValue" :label="dialogParams.lab"
          :placeholder="dialogParams.ph" :maxlength="dialogParams.maxlength" />
      </div>
    </van-dialog>

    <van-popup v-model="showMap" position="bottom">
      <ShopMap @clickLeft="clickLeft" :showMap="showMap"></ShopMap>
    </van-popup>

    <!-- 新闻类别 弹出框div -->
    <div class="ssa_popup">
      <van-popup position="bottom" v-model="dialogXWLB">
        <div class="custom-popup">
          <div class="title">新闻类别</div>
          <div class="content">
            <div class="gpt_cy">
              <!-- 当选中时:class中的item.isAction变为true，增加选中样式.gpt_cy_item_action -->
              <div :class="{gpt_cy_item:true, gpt_cy_item_action: info.news.categoryId==item.id}" v-for="(item, index) in columns"
                :key="index">
                <van-button round size="small" @click="isAction(index)">{{item.title}}</van-button>
              </div>
            </div>
          </div>
          <div class="footer clearfix">
            <div class="cancel_button fleft">
              <span @click="cancelXWLB">取消</span>
            </div>
            <div class="confirm_button fright">
              <span @click="confirmXWLB">确定</span>
            </div>
          </div>
        </div>
      </van-popup>
    </div>

    <!-- 作者 -->
    <div class="sa_popup">
      <van-popup v-model="select_author.show" position="bottom">
        <SelectAuthor @setAuthor="setAuthor" @close="closePopupSelectAuthor"></SelectAuthor>
      </van-popup>
    </div>

    <!--  -->
    <div class="sa_popup">
      <van-popup :lazy-render="false" v-model="showSelectDW" position="bottom">
        <SelectDW ref="selectdw" @setDw="setDw" @close="showSelectDW=false"></SelectDW>
      </van-popup>
    </div>

    <!-- newsSow -->
    <div class="sa_popup">
      <previewResContent :title="info.res.title" :content="previewContent" :showPreview="showPreview? true : false"
        @hide="showPreview = false" :author="info.news.author"></previewResContent>
      <!-- <NewsShow  ref="newsShow" :item="jsonStr" :content="content" :title="info.res.title" :isHide="isCopy" @closeDialogNewsShow="closeDialogNewsShow"></NewsShow> -->
    </div>

    <!-- newsSow -->
    <div :class="{hide:isHide}">
      <div class="ssa_popup">
        <van-popup v-model="dialogNewsShow" position="right" style="width:100%;height:100%;" :overlay="false">
          <NewsShow ref="newsShow" :item="jsonStr" :content="content" :title="info.res.title" :isHide="!isCopy"
            @closeDialogNewsShow="closeDialogNewsShow"></NewsShow>
        </van-popup>
      </div>
    </div>

    <newsLuckStar :starFlag="starFlag? true : false" @starFlagMethod="starFlagMethod" @saveBanner="saveBanner"></newsLuckStar>
  
    <SelectVipCard :myCardShow='myCardShow'  @goback='myCardShow = false' @getVip='getVip' />

    <van-popup v-model="repostNews" round position="bottom" style="max-height:50%;color:black;border-radius: 20px 20px 0 0">
      <div class="repost_head">
        <span>同时发布到</span>
      </div>
      <div style="border-bottom:1px solid #f3f3f3">
        <van-cell title="社区资讯：" input-align="right" isLink readonly  @click="showSelectDW=true">
          <div>
            <span style="color:#d2d2d2">请选择单位</span>
            <!-- <span>(1)</span> -->
          </div>
        </van-cell>
      </div>
      <div class="repost_community">
        <img v-lazy="" alt="">
        <div>
          <span>{{dwName}}</span>
          <!-- <span>(默认社区)</span> -->
        </div>
      </div>
      <div style="height:0.1rem;background-color:#f3f3f3"></div>
      <div>
        <van-cell title="图钉：" :value="`${info.news.author}的图钉`" input-align="right" isLink readonly></van-cell>
      </div>
      <div class="repost_content">
        <van-field v-model="valuezf" type="textarea" maxlength="300" autosize placeholder="图钉标题：我关注的新闻，你们也看一看" class="repost_input"/>
      </div>
      <div class="savebtn" @click="repostNews=false" :style="checkWxDev()?'bottom:0.8rem':''">
        <span>确认</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
  // import FuncTabbar from "@/components/FuncTabbar.vue";
  import SelectVipCard from '../my/components/VipCardChoose'
  import FuncTabbar from "../../components/goods/FuncTabbar";
  import SelectDW from "./SelectDW";
  import FakeOpenWindow from "./FakeOpenWindow";
  import BackHead from "../../components/pub/NewHead";
  import {
    uploadFile
  } from "../api/mainApi";
  import {
    isEmptyStr
  } from "../../assets/js/assist";
  import ShopMap from "../shop/myShop/ShopMap";
  import Editor from "../../components/wanteditor/Editor.vue";
  import SelectAuthor from "./SelectAuthor";
  import {
    queryCommentList,
    saveRemindUser,
    saveRemindGroup,
    queryCategoryList,
    explainUrl
  } from "../api/wuApi.js";
  import SelectPerson from "../schedule/SelectPerson";
  import NewsShow from "./NewsShow";
  import {
    checkLoginTime,
    getLocation,
    checkWxDev,
    checkWx
  } from "../../assets/js/utils.js";
  import {
    saveSocial,
    saveZWNews,
    addZWNews,
    updateArticle
  } from "../api/newsApi.js";
  import {
    getCurrentRole
  } from "../api/friendApi";
  import newsLuckStar from "./NewsLuckStar.vue"
  import properties from "../../../config/properties.js"
  import {
    sendChatRoomCustomMsgByDwId,getDwDetails
  } from "../api/groupApi"
  import previewResContent from "./previewResContent.vue"
  import {wxGetClipboardData} from "../../assets/js/wxJsInterface"
  import componentLabel from '../wxscanRegister/componentLabel'
  import {
    queryShop
  } from '../api/shopApi'

  export default {
    data() {
      return {
        dwList: [],
        endWhoImages: [],
        remindWhoImages: [],
        showPreview: false,
        copyURL: "",
        isCopy: false, //判断用户粘贴新闻  还是 自己编辑新闻
        skykFlag: false, //true  显示头像    false显示字符串
        skykString: "", //谁可以看 v-model   所有参与人 仅发起人  任何人   aa，bb
        atskFlag: false,
        atskString: "",
        dialogSelectPerson: false, //谁可以看
        dialogSelectPerson2: false, //@谁看
        uploadPictureFlag: "rnews",
        refreshOnce: "0",
        jsonStr: "",
        isHide: true,

        content: "",
        dialogXWLB: false,
        dialogNewsShow: true,
        showMap: false,
        addressPoint: {},
        valuezf: "我关注的新闻你们也看一看",
        address: '',
        object: {},
        selectPerson: {
          showType: "", //组件显示类型
          callerName: "" //父组件类型
        },
        info: {
          res: {
            title: ""
          },
          authorizeList: [],
          reminderList: [],
          news: {
            author: checkLoginTime().username,
            category: "",
            categoryId: "",
            content: "",
            imageUrlList: [],
            userTagList: [],
            location: {},
            url: ""
          }
        },
        newsId: "",
        columns: [], //装载新闻类别的 数据
        firstColumns: [], //
        zcds: true, //是否支持打赏
        zftd: true, //转发到我的图钉
        article: {
          article_title: "",
          article_content: "",
          article_type: "请选择新闻类别",
          zcds: "", //是否支持打赏
          zftd: "", //转发到我的图钉
          xwfsd: "", //新闻发生地
          skykList: [], //谁可以看  头像
          atshuikan: [] //@谁看  头像
        },
        dialogParams: {
          type: "1",
          inputValue: "",
          show: false,
          lab: "",
          ph: "",
          maxlength: 16
        },
        temp: {
          xwlbTemp: "", //临时字段
          author: "", //作者名字
          xwlb: "", //新闻类别
          xwfsd: "", //新闻发生地
          atsk: [] //at谁看
        },
        select_author: {
          show: false,
          data: []
        },

        newReleaseFlag: false,
        changeColor: "white",
        showSelectDW: false,
        dwId: "",
        dwName: "",
        dwIds: [],
        bannerFlag: false,
        banner: {
          title: "选择传单商品",
          fileUrl: require("@/assets/img/pub/pub_default_shop_img.png"),
          slogan: "",
          select:false
        },
        starFlag: false,
        previewContent: "",
        appFlag : false,
        dwDetails:{},
        giftShareCard: {},
        myCardShow: false,
        repostNews:false
      };
    },
    watch: {
      zcds: function(nv, ov) {
        this.article.zcds = nv ? "1" : "0";
      },
      zftd: function(nv, ov) {
        this.article.zftd = nv ? "1" : "0";
      },
      showSelectDW: function(nv, ov) {
        if (nv) {
          console.log(this.$refs);
          this.$refs.selectdw.initDwList();
        }
      }
    },
    methods: {
      remindWho() {
        window.onRrmindSelectComplete = this.onRrmindSelectComplete;
        if (window.JsInterface) {
          window.JsInterface.remindWho();
        } else if (window.webkit) {} else {}
      },
      onRrmindSelectComplete(data) {
        var list = data;
        this.remindWhoImages = [];
        this.info.news.reminderList = list;
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          if (item["group"]) {
            this.remindWhoImages.push(item["group"].icon);
          } else if (item["user"]) {
            this.remindWhoImages.push(item["user"].icon);
          }
        }
      },
      endWho() {
        window.onPrivacySelectComplete = this.onPrivacySelectComplete;
        if (window.JsInterface) {
          window.JsInterface.privacySelect();
        } else if (window.webkit) {} else {}
      },
      onPrivacySelectComplete(data) {
        console.log(data);
        let list = data.list;
        let authorizeList = [];
        if (data.title == "公开") {
          this.skykFlag = true;
          this.skykString = "公开";
        } else if (data.title == "私密") {
          this.skykFlag = true;
          this.skykString = "私密";
          let user = {
            user: {
              roleId: checkLoginTime().role_id
            },
            whiteList: true
          };
          this.info.news.authorizeList = [];
          this.info.news.authorizeList.push(user);
        } else {
          this.skykFlag = false;
          list.forEach(item => {
            authorizeList.push(item);
          });
          this.info.news.authorizeList = authorizeList;
        }
        this.endWhoImages = [];
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          if (item["group"]) {
            this.endWhoImages.push(item["group"].icon);
          } else if (item["user"]) {
            this.endWhoImages.push(item["user"].icon);
          }
        }
      },
      setDw(obj) {
        this.dwIds = obj.dwIds;
        this.dwName = obj.dwName;
        console.log(this.dwName);
        // debugger;
      },

      //取中文
      getChinese(strValue) {
        if (strValue != null && strValue != "") {
          var reg = /[\u4e00-\u9fa5]/g;
          return strValue.match(reg).join("");
        } else return "";
      },
      //解析url的内容
      explainUrl(copyURL) {
        console.log("发送url地址到后台取源代码");
        let that = this;
        let param = {  url: copyURL };
        explainUrl(param, res => {
          let str = "";
          if (res.code == "1") {
            console.log("解释url错误");
          }else if (res.code == "0") {
            this.info.res.title = res.data.substring(
              res.data.indexOf("<title>") + 7,res.data.indexOf("</title>")
            );
            if (that.info.res.title.length == 0) {
              this.info.res.title = copyURL
            }
          }
        });
      },
      //预览事件
      previewEvent() {
        let that = this;
        let isCopy = this.isCopy;
        if (isCopy) {
            if(window.JsInterface){
              window.JsInterface.openWindow(this.copyURL)
            }else{
              window.location.href = this.copyURL
            }
        }else if (!isCopy) {
          //（非粘贴新闻）用户编辑新闻标题 内容等信息
          if (isEmptyStr(this.$refs.editor.getContent())) {
            this.$toast("请输入新闻内容");
            return;
          } else if (isEmptyStr(this.info.res.title)) {
            this.$toast("请输入新闻标题");
            return;
          }
          this.previewContent = this.$refs.editor.getContent();
          console.log(this.$refs.editor.getContent(),'新闻内容')
          this.showPreview = true;
        }
      },
      // goMyNew() {
        // this.pageTo("/MyNews");
      // },
      selectMap() {
        window.onSelectAddressComplete = this.onSelectAddressComplete;
        if (window.JsInterface) {
          window.JsInterface.selectAddress();
        } else if (window.webkit) {} else {
          this.showMap = true;
        }
      },

      //点击粘贴  触发事件
      writeToPage(event) {
        let str = "";
        if (window.JsInterface) {
          str = window.JsInterface.paste();
        }else {
          // str = "https://baijiahao.baidu.com/s?id=1597426561984570288&wfr=spider&for=pc";
        }
        //分割str  分别填充到标题和 文本编辑器
        if (str.indexOf("http") != -1) {
          if (str.slice(0, str.indexOf("http")).length > 0)
            this.info.res.title = str.slice(0, str.indexOf("http"));
          this.isCopy = true;
          this.copyURL = str.slice(str.indexOf("http"));
          //解析url地址的内容  填充标题  和 编辑框
          this.explainUrl(this.copyURL);
          this.$refs.editor.setContent(this.copyURL);

          //（1）填充默认值

          // let location = getLocation();
          // this.address = location.province + location.street + location.district;
          // this.info.newws.category = '自媒体新闻'
          this.info.news.author = checkLoginTime().username;
          this.changeColor = "silver";
        } else {}
      },

      //微信的粘贴
      paste(str){
        console.log(str,'粘贴内容')
        debugger
        if (str.indexOf("http") != -1) {
          let flag = false
          if (str.slice(0, str.indexOf("http")).length > 0){
            this.info.res.title = str.slice(0, str.indexOf("http"));
          }else{
            flag = true
          }
          str = str.replace(/<br>/,'')
          this.copyURL = str.slice(str.indexOf("http"));
          if(flag){
            this.explainUrl(this.copyURL);
          }
          //解析url地址的内容  填充标题  和 编辑框
          this.$refs.editor.setContent(this.copyURL);
          this.isCopy = true
          //（1）填充默认值
          // let location = getLocation();
          // this.address = location.province + location.street + location.district;
          this.info.news.author = checkLoginTime().username;
          this.changeColor = "silver";
        }
      },

      onSelectAddressComplete(data) {
        this.address = data.address; //页面显示的值
        this.info.news.location = data; //要发送到后台的数据
      },
      transformInfo() {
        if (this.$store.state.news.id) {
          this.refreshOnce = "1"; //缓存数据  刷新用
          console.log("有id()");
          let news = this.$store.state.news;
          this.info.res.title = news.title;
          this.info.res.id = news.id;
          this.info.res.url = news.url;
          console.log("news.url ==== " + news.url)
          // debugger;
          //预览的字段
          this.content = news.content;
          this.$refs.editor.setContent("<p>" + news.content + "</p>");
          this.info.news.comments = news.comments;
          this.info.news.author = news.author;
          this.info.news.time = news.time;
          this.info.news.imageUrlList = news.imageUrlList;
          this.info.news.category =
            news.categoryList.length == 0 ? "" : news.categoryList[0];
          if (news.location) {
            this.address = news.location.description + news.location.street;
            this.info.news.location = news.location;
          }
          this.jsonStr = JSON.stringify(this.info);
          this.$store.commit("clearNews");
        } else if (this.refreshOnce === "1") {
          this.refreshOnce === "0";
          this.$router.go(0);
        }
      },
      closeDialogNewsShow() {
        this.dialogNewsShow = false;
      },
      //点击新闻类别  发送请求获得所以类别
      //显示新闻类别弹窗
      clickXWLB() {
        this.columns = this.firstColumns;
        this.dialogXWLB = true;
      },
      closeDialogSelectPerson(status) {
        this.dialogSelectPerson = status;
        this.dialogSelectPerson2 = status;
      },
      changeAddress() {
        if (this.getSessionStorage("ShopMap_address")) {
          this.address = this.getSessionStorage("ShopMap_address");
          this.article.xwfsd = this.getSessionStorage("ShopMap_address");
          this.removeSessionStorage("ShopMap_address");
        }
        if (this.getSessionStorage("ShopMap_res")) {
          console.log(this.addressPoint);
          this.addressPoint = JSON.parse(this.getSessionStorage("ShopMap_res"));
          console.log(this.addressPoint);
          this.removeSessionStorage("ShopMap_res");
        }
      },
      clickLeft(status) {
        this.showMap = status;
        this.changeAddress();
      },
      cancelXWLB() {
        this.dialogXWLB = false;
      },
      confirmXWLB() {
        this.dialogXWLB = false;
      },
      openDialog(type) {
        let lab = "";
        let ph = "";
        let inputValue = "";
        let maxlength = 16;
        switch (type) {
          case "1":
            lab = "标题";
            ph = "请输入标题（30字内）";
            inputValue = this.article.article_title;
            maxlength = 30;
            break;
          default:
            break;
        }
        this.dialogParams = {
          type: type,
          inputValue: inputValue,
          show: true,
          lab: lab,
          ph: ph,
          maxlength: maxlength
        };
      },
      beforeClose(action, done) {
        if (action === "confirm") {
          switch (this.dialogParams.type) {
            case "1":
              this.article.article_title = this.dialogParams.inputValue;
              break;
            default:
              break;
          }
          done();
        } else {
          done();
        }
      },
      save() {
        // debugger
        // 发布新闻 news  复制的新闻
        if (this.isCopy) {
          this.addZWNews();
        } else {
          // 发布文章 article  手动输入的
          this.saveZWNews();
        }
      },
      saveZWNews() {
        let that = this;
        if (isEmptyStr(this.$refs.editor.getContent())) {
          this.$toast("请输入新闻内容");
          return;
        } else if (isEmptyStr(this.info.res.title)) {
          this.$toast("请输入新闻标题");
          return;
        } else if (isEmptyStr(this.info.news.category)) {
          this.$toast("请选择新闻的种类");
          return;
        } else {}
        this.info.news.content = Base64.encode(this.$refs.editor.getContent());
        let res = {
          title: this.info.res.title,
          viewType: "ALL"
        };
        let news = new Object();
        news.content = that.info.news.content;
        news.imageUrlList = that.info.news.imageUrlList;
        news.location = that.info.news.location;
        debugger
        news.userTagList = this.$refs.componentLabel.getSelectdItem()

        if (that.dwIds.length > 0) {
          news.organizationId = that.dwIds[0];
          // news.category = []
          // news.category.push(that.dwIds[0]);
          // //单位资讯 不能带新闻类别吗？？？
          // news.category = news.category.concat(that.info.news.category);
        } else {
          news.category = that.info.news.category;
        }
        let paramm = {
          res: res,
          news: news,
          authorizeList: this.info.news.authorizeList,
          reminderList: this.info.news.reminderList,
          // dwId: this.dwId
        };
        if (this.bannerFlag) {
          this.banner.slogan = this.slogan;
          paramm.banner = this.banner;
        }
        if (!this.newReleaseFlag) {
          this.newReleaseFlag = true;
        } else {
          this.$toast("您已点击提交，请勿再次点击");
          return;
        }
        saveZWNews(paramm, res => {
          if (res.success == true) {
            this.$toast("发布文章成功");
            console.log(res.data.item)
            let that = this;
            that.newsId = res.data.item.id

            if (that.dwIds.length > 0) {
              let params = new Object();
              params.desc = res.data.item.title;
              params.detailId = -1;
              params.header = "";
              params.link = res.data.item.url;
              params.mesgType = 5002;
              params.openTo = 0;
              params.time = new Date().getTime();
              params.title = "[" + res.data.item.user.nickname + "]推荐给您的新闻，快去看看…";
              console.log(params);
              let baseData = Base64.encode(JSON.stringify(params));
              console.log(baseData);
              let enBaseData = encodeURI(baseData);

              let sendParams = new Object();
              sendParams.dwId = that.dwIds[0];
              sendParams.msg = enBaseData;
              sendParams.roleId = checkLoginTime().role_id;
              sendParams.token = checkLoginTime().access_token;

              sendChatRoomCustomMsgByDwId(sendParams, (res) => {
                if (res.code != 0) {
                  that.$toast.fail(res.msg);
                }
              })
            }

            if (that.zftd == true) {
              let imgList = res.data.item.imageUrlList
              for (let index in imgList) {
                res.data.item.imageUrlList = imgList[index]
                console.log(res.data.item.imageUrlList);
              }
              let content = this.$refs.editor.getContent().replace(/<[^>]+>/g, "");
              let content1 = Base64.encode(content);
              // debugger;
              console.log(content1);
              let param = {
                res: {
                  title: res.data.item.title
                },

                news: {
                  content: Base64.encode(that.valuezf),
                  repost: {
                    id: res.data.item.id
                  },
                  imageUrlList: that.info.news.imageUrlList
                },
              };
              let extParameters = [{
                key: that.banner.url,
                value: that.banner.fileUrl
              }];
              if (that.bannerFlag) {
                param.news.extParameters = extParameters;
              }
              // //转发图钉api
              // debugger
              saveSocial(param, res => {
                console.log("res" + res);
              });
            }
            if(this.isWxdev){
              this.pageTo("/orgReleaseNews/"+this.orgId,true);
            }else{
              this.pageBack(true);
            }
          } else {
            this.$toast("发布出错,或许该article已经被其他人发布过了");
          }
        });
      },
      addZWNews() {
        let that = this;
        if (isEmptyStr(that.info.res.title)) {
          that.$toast.fail("请输入标题");
          return;
        }
        if (isEmptyStr(this.valuezf)) {
          this.$toast("请输入转发内容")
          return;
        }
        this.info.news.content = Base64.encode(this.valuezf);
        console.log("粘贴框内容" + this.info.news.content);
        this.info.news.time = new Date().getTime();
        console.log("当前时间" + this.info.news.time);
        let res = {
          title: this.info.res.title,
          url: Base64.encode(this.copyURL)
        };

        let news = new Object();
        if (that.dwIds.length > 0) {
          news.organizationId = that.dwIds[0];
        } else {
          news.category = this.info.news.category;
        }
        news.imageUrlList = this.info.news.imageUrlList;
        news.userTagList = this.$refs.componentLabel.getSelectdItem()
        news.location = getLocation();
        news.url = this.info.news.url;
        news.time = this.info.news.time;

        let paramm = {
          res: res,
          news: news,
          authorizeList: this.info.news.authorizeList,
          reminderList: this.info.news.reminderList,
          dwId: this.dwId
        };
        if (this.bannerFlag) {
          this.banner.slogan = this.slogan;
          paramm.banner = this.banner;
        }
        if (!this.newReleaseFlag) {
          this.newReleaseFlag = true;
        } else {
          this.$toast("您已点击提交，请勿再次点击");
          return;
        }
        addZWNews(paramm, res => {
          if (res.success == true) {
            if (that.dwIds.length > 0) {
              let params = new Object();
              params.desc = res.data.item.title;
              params.detailId = -1;
              params.header = "";
              params.link = res.data.item.url;
              params.mesgType = 5002;
              params.openTo = 0;
              params.time = new Date().getTime();
              params.title = "[" + res.data.item.user.nickname + "]推荐给您的新闻，快去看看…";
              console.log(params);
              let baseData = Base64.encode(JSON.stringify(params));
              console.log(baseData);
              let enBaseData = encodeURI(baseData);

              let sendParams = new Object();
              sendParams.dwId = that.dwIds[0];
              sendParams.msg = enBaseData;
              sendParams.roleId = checkLoginTime().role_id;
              sendParams.token = checkLoginTime().access_token;

              sendChatRoomCustomMsgByDwId(sendParams, (res) => {
                if (res.code != 0) {
                  that.$toast.fail(res.msg);
                }
              })
            }


            if (this.zftd == true) {
              let param = {
                res: {
                  title: res.data.item.title
                },
                news: {
                  content: this.info.news.content,
                  repost: {
                    id: res.data.item.id
                  }
                },
              };
              let extParameters = [{
                key: that.banner.url,
                value: that.banner.fileUrl
              }];
              if (that.bannerFlag) {
                param.news.extParameters = extParameters;
              }
              //转发图钉api
              saveSocial(param, res => {
                console.log("转发图钉api" + res.data);
              });

            }
            if(this.isWxdev){
              this.pageTo("/orgReleaseNews/"+this.orgId,true);
            }else{
              this.pageBack(true);
            }


          } else {
            this.$toast("资讯新闻发布出错,或许该新闻已经被其他人发布过了");
          }
        });
      },
      queryCategoryList() {
        queryCategoryList(null, res => {
          if (res.success == true) {
            let list = res.data;
            // this.columns = list;
            this.firstColumns = list;
            let coumnslist = [];
            for (let index in list) {
              this.info.news.category = list[20].title;
              let titlelist = {};
              titlelist.index = index;
              titlelist.name = list[index].title;
            }
          }
        });
      },
      uploadImg() {
        window.picUploadComplete = this.picUploadComplete;
        this.uploadPictureFlag = "rnews";
        if (window.JsInterface) {
          window.JsInterface.selectImages(1, "rnews");
        } else if (window.webkit) {
          window.webkit.messageHandlers.openWindow.postMessage({
            url: window.location.origin + "/" + href
          });
        } else {
          this.$refs.files.click();
        }
      },
      onRead(event) {
        console.log(event);
        let that = this;
        let fileList = event.target.files;
        console.log(fileList);
        that.uploadImage(fileList, url => {
          that.info.news.imageUrlList.push(url);
        });
      },
      picUploadComplete(event) {
        let that = this;
        if (event) {
          let editor = {};
          editor = that.object;
          event.forEach((val, key) => {
            if (val.extra === "rnews") {
              // alert("rrrrrrrrrrrrrrrrrr")
              that.info.news.imageUrlList.push(val.data);
            } else {
              let html = '<fs><img src="' + val.data + '" style="width:96%;margin:2%"></fs>';
              editor.txt.append(html);
              that.addImg(val.data);
            }
          });
        } else {
          that.$toast(event[0].msg);
        }
      },
      getEditor(editor) {
        this.object = editor;
      },
      //    点击新闻类别时样式改变
      isAction(index) {
        if (this.columns[index].subs.length == 0) {
          this.info.news.categoryId = this.columns[index].id;
          this.info.news.category = this.columns[index].title;
        } else {
          this.columns = this.columns[index].subs;
        }
      },
      // 关闭选择作者弹出框的方法
      closePopupSelectAuthor(status) {
        this.select_author.show = status;
      },
      setAuthor(data) {
        this.temp.author = "";
        data.forEach((val, key) => {
          this.temp.author = this.temp.author + "  " + val.name;
        });
        this.info.news.author = this.temp.author;
      },
      pageToMyInformation() {
        // this.$toast("调用安卓api")
        // this.pageTo('myInformation');

        //  that.getSessionStorage('abilityDetails')
        this.pageTo("NewsLuckStar");
      },
      starFlagMethod(info) {
        let that = this;
        console.log(info);
        if (info) {
          that.starFlag = true;
          that.bannerFlag = false;
        } else {
          that.starFlag = false;
          that.bannerFlag = false;
        }
      },
      saveBanner(info) {
        let that = this;
        that.banner = info;
        that.bannerFlag = true;
        that.starFlag = false;
        that.banner.select = true
      },
      //新闻的图片列表，封面 加一张图片
      addImg(img) {
        let that = this;
        if(that.info.news.imageUrlList.length<3){
          that.info.news.imageUrlList.push(img);
        }
      },
      getVip(giftShareCard) {
        this.giftShareCard = giftShareCard
        this.myCardShow = false
      },
    },
    beforeRouteEnter(to, from, next) {
      if (!to.params.orgId) {
        queryShop({
          userId: checkLoginTime().id
        }, (res) => {
          if (res.code == 0) {
            next(`/releaseNews/${res.data[0].shopDw}`,true);
          }
        })
      } else {
        next()
      }
    },
    activated() {
      Object.assign(this.$data, this.$options.data());
      if(window.JsInterface){
        this.appFlag = true;
      }
      this.$refs.editor.setContent("<p>" + "</p>");

      this.$refs.files.onchange = this.onRead;
      this.queryCategoryList();
      this.transformInfo();
      this.address = getLocation().address;
      this.info.news.author = checkLoginTime().username;

      getDwDetails(this.orgId,(res)=>{
        this.dwDetails = res
      })
      this.dwIds.push(this.orgId);
      // this.$refs.componentLabel.getMoreTag(this.orgId)
    },
    components: {
      ShopMap: ShopMap,
      // BackHead: BackHead,
      FuncTabbar: FuncTabbar,
      Editor: Editor,
      SelectAuthor: SelectAuthor,
      SelectPerson: SelectPerson,
      NewsShow: NewsShow,
      FakeOpenWindow: FakeOpenWindow,
      SelectDW: SelectDW,
      newsLuckStar: newsLuckStar,
      previewResContent: previewResContent,
      componentLabel,
      SelectVipCard
    },
    props: {
      orgId: {
        type: String,
        default: ""
      }
    }
  };
</script>

<style scoped="scoped">
  .rn_container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: #f1f1f1;
  }

  .rn_info {
    margin: 0px 0 0 0;
  }

  .rn_info_item {
    border-bottom: 1px solid #eee;
    /* overflow: hidden; */
    width: 100%;
    background-color: #fff;
  }

  .rn_info_item_lab {
    color: #333;
    font-size: 14px;
    line-height: 24px;
  }

  .rn_info_item_head {
    padding: 10px 10px;
    box-sizing: border-box;
  }

  .rn_info_item_con {
    text-align: right;
    padding: 10px 10px;
    box-sizing: border-box;
    word-break: break-all;
  }

  .rn_info_item_img {
    height: 40px;
  }

  .rn_info_item_rz_img {
    height: 20px;
    vertical-align: middle;
  }

  .rn_info_item_rz_span {
    font-size: 12px;
    color: #999;
  }

  .rn_info_tip {
    padding: 10px;
    text-align: center;
    font-size: 12px;
    color: #999;
  }

  /* 向上弹出 */
  .si_container {
    width: 100%;
    height: 100%;
    background-color: #ddd;
  }

  .si_main {
    padding: 50px 0 0 0;
    overflow: hidden;
    height: 100%;
    box-sizing: border-box;
  }

  .si_left {
    background-color: #f3f3f3;
    height: 100%;
    /* overflow-y: auto; */
    display: inline-block;
    width: 30%;
    vertical-align: top;
  }

  .si_left_item {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid #eee;
    text-shadow: 0.1px 0.1px 0 #000;
  }

  .si_right {
    display: inline-block;
    float: right;
    width: 70%;
    height: 100%;
    overflow-y: auto;
    vertical-align: top;
  }

  .si_right_item {
    display: inline-block;
    vertical-align: middle;
    float: left;
    margin: 5px 0 5px 2.5%;
    text-align: center;
    width: 30%;
    height: 38px;
    line-height: 38px;
    padding: 0 5px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #fff;
    text-shadow: 0.1px 0.1px 0 #000;
    font-size: 12px;
  }

  .si_left_item_act,
  .si_right_item_act {
    background-color: #3298ff;
    color: #fff;
    text-shadow: 0.1px 0.1px 0 #3298ff;
  }

  .gg_footer {
    position: absolute;
    bottom: 0;
    background-color: #fff;
    width: 100%;
  }

  /* 选择类型、权限弹出框 */
  .custom-dialog .title {
    position: absolute;
    z-index: 999;
    text-align: center;
    width: 100%;
    padding-top: 10%;
    background-color: #fff;
  }

  /* add */
  .avatar-list img {
    width: 30px;
    margin-right: 3px;
  }

  .avatar-list {
    overflow: hidden;
    max-height: 50px;
    cursor:pointer; 
  }

  .right-icon {
    /* margin-right: 5px; */
  }

  /* 选择新闻类别 */
  .custom-popup .title {
    text-align: center;
    padding: 10px 0;
  }

  .custom-popup .footer {
    border-top: 1px solid #ebebeb;
    padding: 10px 20px;
  }

  .custom-popup .confirm_button {
    color: #3298ff;
  }

  .gpt_cy {
    overflow: hidden;
    border-top: 1px solid #ddd;
    background-color: #fff;
  }

  .gpt_cy_item {
    width: 25%;
    float: left;
    text-align: center;
    padding: 5px 0;
    position: relative;
  }

  .gpt_cy_item_action .van-button--default {
    color: #3298ff;
    border: 1px solid #3298ff;
  }

  /* 设置弹出框高度 */
  /* 	.van-popup--bottom{
		height: auto;
	} */
  .van-popup--bottom {
    height: 100%;
  }

  .img {
    margin: 5px 5px 5px 5px;
  }

  .ssa_popup .van-popup--bottom {
    height: auto;
  }

  .hide {
    display: none;
  }

  .xxxbox {
    display: -webkit-flex;
    justify-content: center;
  }

  /**/
  .silver {
    background-color: silver;
    color: white;
  }

  .bannerslogan {
    width: 70%;
    background-color: indianred;
    border: none;
    color: white;
  }

  .bannerslogan::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .van-cell__value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  .starFlag_wrap{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .starFlag_wrap img{
    width: 0.44rem;
    height: 0.44rem;
    margin-right: 5px;
    vertical-align: middle;
  }
  .break_wrap{
    height: 0.14rem;
    background-color: #ebebeb;
  }
  .repost_head{
    height: 0.88rem;
    line-height: 0.88rem;
    background-color: #f3f3f3;
    text-align: center;
    border-radius: 10px 10px 0 0;
    color: #000;
  }
  .repost_community{
    height: 0.84rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.28rem;
  }
  .repost_community img{
    height: 0.5rem;
    width: 0.5rem;
    margin: 0 5px;
  }
  .repost_content{
    margin: 0.1rem 0.15rem;
    /* height: 1rem; */
    background-color: #f3f3f3;
    box-sizing: border-box;
  }
  .repost_input{
    background-color: #f3f3f3;
    max-height: 1.5rem;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .savebtn{
    height: 0.9rem;
    width: 100%;
    background-color: #3298ff;
    text-align: center;
    line-height: 0.9rem;
    position: fixed;
    bottom: 0;
    color: white;
  }
</style>
