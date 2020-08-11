<template>
  <div class="ssss_container">
    <van-nav-bar v-show="showTagListAndNav" :left-arrow= isHide v-bind:left-text="isHide?'社区资讯(' + totalCount + ')':''" @click-left="isHide?pageBack():''" style="background-color: #F3F3F3;" v-if="isHide">
      <!-- <div slot="right">
        <img src="../../assets/img/pub/pub_ico_zxdh.png" style="width: 30%;float: right;margin-bottom: 8px;" @click="goNews1()" />
      </div> -->
    </van-nav-bar>
    <div class="content">
      <div v-show="showTagListAndNav" class="display" style="background-color: #fff;padding: 2px;position: sticky;top: 0px;z-index: 2;width: 100%;height: 44px;">
        <ul class="slide-box">
          <li class="slide-item" v-for="(item,index) in newsUrlList" v-if="item.name" :key="index">
            <van-button  style="background-color: #E3E3E3;"
             @click="goUrl(item.url)" round size="small">{{item.name}}</van-button>
          </li>
          <li class="slide-item" v-for="(item,index) in tagList" v-if="item">
            <van-button :style="index==selectedIndex?`background-color: #3298FF;color: #fff;`:''"  style="background-color: #E3E3E3;"
            @click="selectedIndex=index;selectedvalue=item;getNewsList(item.id)" round size="small">{{item.name}}</van-button>
          </li>
          <li class="slide-item">
            <van-button :style="-1==selectedIndex?`background-color: #3298FF;color: #fff;`:''"  style="background-color: #E3E3E3;"
           @click="selectedIndex=-1;selectedvalue='';newsList=[];getNewsList()" round size="small">全部</van-button>
          </li>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </ul>
        <div v-if="lock">
          <img src="../../assets/img/pub/pub_ico_zxdh.png" style="width: 33px;height:33px;vertical-align: bottom;margin-right:15px" @click="goNews1()" />
        </div>
      </div>
      <van-pull-refresh v-model="refresh" @refresh="onRefresh">
        <div v-if="(topNewsList.length==0)&&(computed_list.length==0)" style="margin: 80px auto;width: 300px;text-align: center;">
          社区暂未发布资讯
        </div>
        <van-list @load="loadRelease" finished-text="没有更多了" v-model="loading" :finished="finished" v-else>
          <!-- 置顶新闻列表 -->
          <div v-for="(news,index) in topNewsList" :key="index" @click="goPageUrl(news.url)" @touchstart="gotouchstart(news,true)"
            @touchmove="gotouchmove" @touchend="gotouchend">
            <template v-if="news.imageUrlList.length > 0 && news.imageUrlList.length < 3">
              <div class="twoImgDiv topDiv">
                <div class="leftImgDiv">
                  <img :src="news.imageUrlList[0]" />
                </div>
                <div class="wordDiv">
                  <div class="title">{{news.title}}</div>
                  <div class="bottomWordDiv">
                    <div class="bottomLeftWordDiv">
                      <span>{{news.author}}</span><span>{{news.formatTime}}</span>
                    </div>
                    <div class="bottomRightWordDiv">
                      <span>打赏</span><span>关注({{news.likes}})</span><span>评论({{news.comments}})</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="otherWordDiv topDiv">
                <div>{{news.title}}</div>
                <template v-if="news.imageUrlList.length >= 3">
                  <div class="imgLine">
                    <div v-for="(img,index) in news.imageUrlList.slice(0,3)" :key="index">
                      <template v-if="index < 3">
                        <img :src="img" />
                      </template>
                    </div>
                  </div>
                </template>
                <div class="bottomWordDiv">
                  <div class="bottomLeftWordDiv">
                    <span>{{news.author}}</span><span>{{news.formatTime}}</span>
                  </div>
                  <div class="bottomRightWordDiv">
                    <span>打赏</span><span>关注({{news.likes}})</span><span>评论({{news.comments}})</span>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- 普通新闻列表 -->
          <div v-for="(news,index) in computed_list"  @click="goPageUrl(news.url)" @touchstart="gotouchstart(news,false)"
            @touchmove="gotouchmove" @touchend="gotouchend">
            <template v-if="news.imageUrlList.length > 0 && news.imageUrlList.length < 3">
              <div class="twoImgDiv">
                <div class="leftImgDiv">
                  <img :src="news.imageUrlList[0]" />
                </div>
                <div class="wordDiv">
                  <div class="title">{{news.title}}</div>
                  <div class="bottomWordDiv">
                    <div class="bottomLeftWordDiv">
                      <span>{{news.author}}</span><span>{{news.formatTime}}</span>
                    </div>
                    <div class="bottomRightWordDiv">
                      <span>打赏</span><span>关注({{news.likes}})</span><span>评论({{news.comments}})</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="otherWordDiv">
                <div>{{news.title}}</div>
                <template v-if="news.imageUrlList.length >= 3">
                  <div class="imgLine">
                    <div v-for="(img,index) in news.imageUrlList.slice(0,3)" :key="index">
                      <template v-if="index < 3">
                        <img :src="img" />
                      </template>
                    </div>
                  </div>
                </template>
                <div class="bottomWordDiv">
                  <div class="bottomLeftWordDiv">
                    <span>{{news.author}}</span><span>{{news.formatTime}}</span>
                  </div>
                  <div class="bottomRightWordDiv">
                    <span>打赏</span><span>关注({{news.likes}})</span><span>评论({{news.comments}})</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <van-popup v-model="longtapFlag">
      <div v-show="manager">
        <template v-if="!topFlag">
          <van-button size="small" style="width: 100%;" @click="setNewsTop(true)">置顶</van-button>
        </template>
        <template v-else>
          <van-button size="small" style="width: 100%;" @click="setNewsTop(false)">取消置顶</van-button>
        </template>
        <van-button size="small" style="width: 100%;" @click="deleteNews(longTapNewsInfo)">删除资讯</van-button>
        <van-button size="small" style="width: 100%;" @click="showNewsClass=true;longtapFlag=false;setSelectedTag(longTapNewsInfo)">新闻归类</van-button>
        <van-button size="small" style="width: 100%;" @click="updateTitleFlag = true">修改新闻标题</van-button>
      </div>
      <van-button v-show="!manager" size="small" style="width: 100%;" @click="newsAdd()">收藏到我的默认社区</van-button>

    </van-popup>

    <van-popup v-model="updateTitleFlag" style="width: 60%;">
      <div class="updateTitle">更新标题</div>
      <van-field placeholder="请输入标题" v-model="updateTitle" type="textarea"  rows="2" autosize />
      <van-button type="info" style="width: 100%;" @click="updateCmsTitle">确定</van-button>
    </van-popup>

    <template v-if="manager">
      <div class="releaseTack" @click="pageTo(`/releaseNews/${orgId}`)" >
        <img src="../../assets/img/pub/pub_ico_tianjiay.png" width="55" height="55">
      </div>
    </template>

    <van-dialog v-model="showAddTag" show-cancel-button @confirm="addUserTag(tempText)" @cancel="tempText=''">
      <div style="width: 100%;height:45px;line-height: 45px;text-align: center;">新增标签</div>
      <van-field v-if="showAddTag"  v-model="tempText" autofocus />
    </van-dialog>

    <van-action-sheet v-model="showNewsClass">
      <div class="flex" style="justify-content: space-between;padding: 10px;">
        <span>新闻归类</span>
        <span @click="addTagOnNews()" style="color: #0078FF;">确认</span>
      </div>
      <span class="vantbtn">
        <van-button style="background: #E3E3E3;" round  size="small" @click="showAddTag=true">添加新标签</van-button>
      </span>
      <span class="vantbtn" v-for="item in dwTagList" >
        <div class="delbtn" v-show="item.selected" @click="item.selected=false;sortTagList()">x</div>
        <van-button :class="{blueBackground:item.selected,greyBackground:!item.selected}" round  size="small" @click="item.selected=true;sortTagList()">{{item.name}}</van-button>
      </span>
    </van-action-sheet>
  </div>
</template>

<script>
  import {
    newsList,
    newsTop,
    linkList,
    getDwNwsList
  } from "../api/listNoTokenApi"
  import {
    checkLoginTime,checkDwManager
  } from "../../assets/js/utils"
  import {
    setNewsTop,
    updateCmsTitle
  } from "../api/list_platform"
  import pro from "../../../config/properties"
  import {
    selectManagerInfoByDwIdAndRoleId,getDwDetails
  } from "../api/groupApi"
  import {
    deleteNews2,addTagOnNews,newsAdd,collectSQ,getDwNewsTagList,setTop
  } from "../api/newsApi"
  import {
    getUserTagList,
    deleteUserTag,
    addUserTag
  } from '../api/wuApi'
  import {
    def_shop_dw
  } from '../api/zhiTeamApi'

  export default {
    data() {
      return {
        topNewsList: [],
        newsList: [],
        refresh: true,
        loading: true,
        finished: false,
        getFlag: true,
        totalCount: 0,
        page: 0,
        timeOutEvent: 0,
        longtapFlag: false,
        topFlag: false,
        newsId: "",
        newsUrlList: [],
        manager: false,
        updateTitleFlag: false,
        updateTitle : "",
        selectedIndex:-1,
        showNewsClass:false,
        showAddTag:false,
        tempText:'',
        dwRoleId:'',
        dwTagList:[],
        setSelectedItemFlag:false,
        //长按选中的新闻
        longTapNewsInfo:{},
        //是否显示标签  和 顶部导航
        showTagListAndNav:true,
        isHide: true,
        dwNewsTagList:[],
        lock:true,
        unit: false
      }
    },
    methods: {
      //新闻转发到我的社区
      newsAdd(){
        def_shop_dw((result)=>{
          let params = {"news":{"organizationId":result.id},"res":{"id":this.longTapNewsInfo.id}}
          collectSQ(params,(res)=>{
            this.$toast("新闻转发成功！")
          })
        })
      },
      addTagOnNews(){
        let array = []
        for (let j = 0; j < this.dwTagList.length; j++) {
          if(this.dwTagList[j].selected){
             array.push(this.dwTagList[j].id)
          }
        }
        let params = {"tags":array,"res":this.longTapNewsInfo.id,items:this.longTapNewsInfo.itemsId}
        addTagOnNews(params,(res)=>{
          this.$toast("新闻归类完成！")
          this.onRefresh();
          getDwNewsTagList({"news":{"organizationId":this.orgId}},res=>{
            if(res.success){
              this.dwNewsTagList = res.data
            }
          })
          this.showNewsClass = false
        })
      },
      sortTagList(){
        this.dwTagList.sort((item1,item2)=>{
          if(item1.selected && !item2.selected){
            return -1
          }
          if(!item1.selected && item2.selected){
            return 1
          }
          if((item1.selected && item2.selected) || (!item1.selected && !item2.selected)){
            return 0
          }
        })
      },
      setSelectedTag(longTapNewsInfo){
        if(longTapNewsInfo.tagList){
          //设置新闻的标签 已选中
          for (let i = 0; i < longTapNewsInfo.tagList.length; i++) {
            inner:for (let j = 0; j < this.dwTagList.length; j++) {
              if(longTapNewsInfo.tagList[i] == this.dwTagList[j].name){
                this.dwTagList[j].selected = true
                break inner
              }
            }
          }
        }
        this.sortTagList()
      },
      getUserTagList(dwRoleId){
        getUserTagList({user:{roleId:dwRoleId}},(res)=>{
          this.dwTagList = res.data.filter((item)=>{
            let array = ['普通','亲子','旅游','情侣','图片','视频','直播','智直播','长视频','音频','']
            return array.indexOf(item.name)==-1
          })
          this.setSelectedTag(this.longTapNewsInfo)
        })

      },
      addUserTag(name){
        if(!name){
          this.showAddTag = false
          return
        }
        name = name.replace(/,/g,'，')
        addUserTag({userTagForm:{name:name},user:{roleId:this.dwRoleId}},(res)=>{
          if(res.success){
            this.showAddTag=false;
            this.getUserTagList(this.dwRoleId)
          }else{
            this.$toast("新增标签失败！")
          }
        })
      },
      deleteNews(longTapNewsInfo) {
        deleteNews2({
            news: {organizationId:this.orgId},res:{id:longTapNewsInfo.id}
          },(res) => {
          this.longtapFlag = false
          if (res.success) {
            this.$toast("删除成功")
            this.onRefresh();
          }
        })
      },
      checkDwManager(dwId) {
        checkDwManager(dwId, () => {
          this.manager = true
        })
      },
      onRefresh() {

        let that = this;
        that.getFlag = true;
        that.finished = true;
        that.topNewsList = [];
        that.newsList = [];
        that.page = 0;

        //刷新 置顶新闻列表 ， 普通新闻列表
        that.newsTop();
        //查询单位的自定义资讯标签
        that.linkList();
      },
      loadRelease() {
        let that = this;
        that.page++;
        console.log(that.page,'上拉加载page1')
        that.getNewsList();
        console.log(that.page,'上拉加载page2')
      },
      newsTop() {
        let that = this;
        let params = new Object();
        let news = new Object();
        news.organizationId = that.orgId;
        params.news = news;
        newsTop(params, (res) => {
          if (res.success) {
            let filterNews = res.data.filter(function(e){return e.type == "res.type.news"});
            that.topNewsList = that.formatJson(filterNews);
            that.page = 0;
            console.log(that.page,'置顶page1')
            that.getNewsList();
            console.log(that.page,'置顶page2')
            that.finished = false;
          } else {
            that.$toast.fail(res.message);
          }
        },that.unit)
      },

      //获取新闻列表
      getNewsList(tagId) {
        let that = this;
        if (!that.getFlag) {
          that.page--;
          that.loading = false;
          return;
        }
        that.getFlag = false;

        let params = new Object();
        let news = new Object();
        news.organizationId = that.orgId;
        if(tagId){
          that.newsList = []
          news.userTag = {"id":tagId}
          that.page = 0
        }
        params.news = news;
        console.log(that.page,'普通资讯page1')

        getDwNwsList(that.page, params, (res) => {
          console.log(that.page,'普通资讯page2')
          if (res.success) {
            if (res.data.content.length == 0) {
              that.finished = true;
            }
            let list = [];
            for (let i = 0; i < res.data.content.length; i++) {
              let list1 = that.topNewsList.filter(function(e) {
                return e.id == res.data.content[i].id
              });
              console.log(list1);
              if (list1.length == 0) {
                list.push(res.data.content[i]);
              }
            }
            that.newsList = that.newsList.concat(that.formatJson(list));
            that.totalCount = res.data.totalCount;
          } else {
            // that.$toast.fail(res.message);
            that.finished = true;
          }
          that.refresh = false;
          that.loading = false;
          that.getFlag = true;
        },that.unit)
      },
      //查询单位的自定义资讯标签
      linkList() {
        let that = this;
        let params = new Object();
        let organization = new Object();
        organization.orgId = that.orgId;
        params.organization = organization;

        linkList(params, (res) => {
          if (res.code == 0) {
            that.newsUrlList = res.data;
          } else {
            that.$toast.fail(res.msg);
          }
        })
      },
      goPageUrl(url) {
        let that = this;
        if (url == "" || url == null || url == undefined) {
          that.$toast.fail("为获取到url");
          return;
        }
        // that.pageTo("/openWebUrl/" + Base64.encode(url));
        if((url.toLowerCase().indexOf('https') == -1)&&!that.isHide){
          document.location.href = url.replace(/http/,'https')
        }else{
          document.location.href = url;
        }
      },
      formatJson(jsonList) {
        console.log(jsonList)
        for (var i = 0; i < jsonList.length; i++) {
          console.log(jsonList[i].time);
          let date = new Date(jsonList[i].time);
          let formatTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() +
            " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
          jsonList[i].formatTime = formatTime;
        }
        return jsonList;
      },
      goNews1() {
        let that = this;
        let url = pro.shortAPI + "/zj_web/index(2).html";
        // let codeUrl = Base64.encode(encodeURIComponent(url));
        // if (window.jsInterface) {
        //   window.jsInterface.openWindow(codeUrl);
        //   return;
        // }
        document.location.href = url;
        // that.pageTo("/openWebUrl/" + codeUrl);
      },
      //长按事件
      gotouchstart(news, topFlag) {
        let that = this;
        clearTimeout(that.timeOutEvent); //清除定时器
        that.timeOutEvent = 0;
        that.timeOutEvent = setTimeout(function() {
            that.longtapFlag = true;
            that.topFlag = topFlag;
            that.newsId = news.id;
            that.longTapNewsInfo = news;
            that.updateTitle = news.title;
        }, 1000); //这里设置定时
      },
      gotouchend() {
        let that = this;
        clearTimeout(that.timeOutEvent);
      },
      gotouchmove() {
        let that = this;
        clearTimeout(that.timeOutEvent); //清除定时器
      },
      setNewsTop(topFlag) {
        let that = this;
        let params = new Object();
        let res = new Object();
        res.id = that.newsId;
        params.res = res;

        let news = new Object();
        news.organizationId = that.orgId;
        news.top = topFlag;
        params.news = news;

        setTop(params, (res) => {
          if (res.success) {
            if (topFlag) {
              that.$toast("置顶成功");
            } else {
              that.$toast("取消置顶成功");
            }
            that.longtapFlag = false;
            that.onRefresh();
          } else {
            that.$toast.fail(res.message);
          }
        })
      },
      goUrl(url) {
        let that = this;
        if(!url.startsWith("http")){
          url = "http://" + url;
        }
        // let eUrl = encodeURIComponent(url);
        // // console.log(eUrl);
        // let baseUrl = Base64.encode(eUrl);
        // // console.log(baseUrl);
        // that.pageTo("/openWebUrl/" + baseUrl);
        document.location.href = url;
      },
      updateCmsTitle(){
        let that = this;
        let params = new Object();
        let news = new Object();
        news.id = that.longTapNewsInfo.itemId;
        news.dwNewsName = that.updateTitle;
		news.organizationId = that.orgId;
        params.news = news;
        updateCmsTitle(params, (res) => {
          if(res.success){
            that.updateTitleFlag = false;
            that.longtapFlag = false;
            that.onRefresh();
          }else{
            that.$toast.fail(res.message);
          }
        })
      },
    },
    activated() {
      let that = this;
      var query = this.$route.query
      var val = localStorage.getItem('isShow')
      if(val){
        that.isHide = false
        document.title = '社区资讯'
      }
      if(query.filte == 1){
        that.lock = false
        that.unit = true
        document.title = '资讯'
      }
      that.checkDwManager(that.orgId)
      getDwDetails(that.orgId, (res) => {
        that.dwRoleId = res.roleid
        that.onRefresh();
        that.getUserTagList(that.dwRoleId)
      })
      //获取顶部新闻标签
      getDwNewsTagList({"news":{"organizationId":that.orgId}},res=>{
        if(res.success){
          debugger
          this.dwNewsTagList = res.data
        }
      })
    },
    props: {
      orgId: {
        type: String,
        default: ""
      }
    },
    computed: {
      computed_list() {
        // if (this.selectedIndex != -1) {
        //   return this.newsList.filter((item) => {
        //     return item.tagList.indexOf(this.tagList[this.selectedIndex]) != -1
        //   })
        // }
        // else {
        //   return this.newsList
        // }
        return this.newsList
      },
      //二维数组
      tagList() {
        let arr = this.dwNewsTagList
        let array = []
        arr.forEach(item => {
          if (item.name != "") {
            array = array.concat(item)
          }
        })
        let res = []
        //去重  去空
        array.forEach(item => {
          if (res.indexOf(item) == -1&&item!='') {
            res.push(item)
          }
        })
        if (this.$route.query.tag) {
          if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1) {
            this.showTagListAndNav = false
            document.title = "资讯-" + this.$route.query.tag
            res.forEach((item,index)=>{
            if(item.name==this.$route.query.tag){
              this.selectedIndex = index
            }
          })
          }
        }
        return res
      },


    }
  }
</script>

<style scoped="scoped">
  .ssss_container {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .van-nav-bar .van-icon {
    color: black;
  }

  .van-nav-bar__text {
    color: black;
  }

  .releasedFlyer {
    background-color: white;
    color: #3298FF;
    font-size: 12px;
    height: 25px;
    line-height: 25px;
    width: 81px;
    border-radius: 3px;
    margin-bottom: 10px;
  }

  .content {
    background-color: white;
  }

  .twoImgDiv {
    border-bottom: 0.5px solid gainsboro;
    min-height: 72px;
  }

  .leftImgDiv {
    max-width: 30%;
    padding: 8px;
    max-height: 60px;
    float: left;
  }

  .leftImgDiv img {
    max-width: 100%;
    max-height: 50px;
  }

  .wordDiv {
    /* margin-left: 31%; */
    padding: 5px;
    /* height: 60px; */
  }

  .bottomWordDiv {
    font-size: 10px;
    color: #565656;
    margin-top: 5px;
  }

  .bottomLeftWordDiv {
    float: left;
  }

  .bottomLeftWordDiv span {
    margin-right: 5px;
  }

  .bottomRightWordDiv {
    text-align: right;
  }

  .bottomRightWordDiv span {
    margin-right: 10px;
  }

  .otherWordDiv {
    padding: 10px;
    border-bottom: 0.5px solid gainsboro;
  }

  .imgLine {
    height: 70px;
    padding: 5px;
  }

  .imgLine>div {
    width: 32%;
    height: 60px;
    padding-right: 3px;
    float: left;
  }

  .imgLine img {
    width: 100%;
    height: 100%;
    object-fit: cover
  }

  .wordDiv .title {
    height: 41px;
    overflow: hidden;
  }

  .topDiv {
    background-color: #eaf4ff;
  }


  .content .largeLabel {
    height: 40px;
    background-color: #f3f3f3;
    border-radius: unset;
    width: 100%;
    margin-top: -6px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    position: relative;
    /* position: fixed; */
    /* top: 50px; */
    z-index: 5;
    border-top: 0.5px solid silver;
  }

  .content .largeLabel .labela {
    /* width: 80px; */
    background-color: white;
    height: 30px;
    position: relative;
    top: 5px;
    margin-left: 5px;
    float: left;
    border-radius: 20px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    padding: 0 15px;
  }

  .releaseTack {
    position: fixed;
    bottom: 12%;
    right: 5%;
    background-color: transparent;
  }

  .updateTitle {
    text-align: center;
    border-bottom: 0.5px solid;
    line-height: 35px;
    font-size: 16px;
  }

  .tag {
    background: #E3E3E3;
    padding: 7px;
    border-radius: 10em;
    color: #000;
    min-width: 35px;
    text-align: center;
  }

  ul,
  li {
    list-style: none;
    padding: 4px;
  }
  .display{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .slide-box {
    display: -webkit-box;
    overflow-x: auto;
    /*适应苹果*/
    -webkit-overflow-scrolling: touch;
  }

  .slide-item {}

  /*隐藏掉滚动条*/
  .slide-box::-webkit-scrollbar {
    display: none;
  }
  .vantbtn{
    position: relative;margin: 5px;line-height: 40px;
  }
  .delbtn {
    position: absolute;
    right: -11px;
    top: -9px;
    z-index: 1;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #aaa;
    text-align: center;
    line-height: 20px;
  }
  .blueBackground{
    background-color: #3298FF;
  }
  .greyBackground{
    background-color: #E3E3E3;
  }
</style>
