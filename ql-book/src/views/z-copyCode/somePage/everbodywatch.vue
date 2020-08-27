<template>
  <div class="ssss_container">
    <van-nav-bar left-arrow left-text="大家都在看" @click-left="pageBack" style="background-color: #F3F3F3;">
      <div slot="right" v-if="!isHide">
        <img src="../../assets/img/pub/pub_ico_zxdh.png" style="width: 30%;float: right;margin-bottom: 8px;" @click="goNews1()" />
      </div>
    </van-nav-bar>
    <div class="content">
      <template v-if="newsUrlList.length > 0">
        <div class="largeLabel">
          <div style="width: 800px;">
            <div v-for="(newsUrl,index) in newsUrlList" :key="index">
              <div class="labela" @click="goUrl(news.id,newsUrl.url,news.categoryList)">{{newsUrl.name}}</div>
            </div>
          </div>
        </div>
      </template>
      <van-pull-refresh v-model="refresh" @refresh="onRefresh">
        <van-list @load="loadRelease" finished-text="没有更多了" v-model="loading" :finished="finished">
          <!-- 置顶新闻列表 -->
          <div v-for="(news,index) in newsList" :key="index" @click="goPageUrl(news.id, news.url)">
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
  </div>
</template>

<script>
  import {
    newsList,
    newsTop,
    linkList
  } from "../api/listNoTokenApi"
  import {
    checkLoginTime
  } from "../../assets/js/utils"
  import {
    setNewsTop,
    updateCmsTitle
  } from "../api/list_platform"
  import pro from "../../../config/properties.js"

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
        setTopFlag: false,
        topFlag: false,
        newsId: "",
        newsUrlList: [],
        manage: false,
        updateTitleFlag: false,
        updateTitle : "",
        isHide: true,
        lock:false
      }
    },
    methods: {
      onRefresh() {
        let that = this;
        that.getFlag = true;
        that.finished = false;
        that.topNewsList = [];
        that.newsList = [];
        that.page = 0;
        that.getNewsList();
      },
      loadRelease() {
        let that = this;
        that.page++;
        that.getNewsList();
      },
      getNewsList() {
        let that = this;

        if (!that.getFlag) {
          that.page--;
          that.loading = false;
          return;
        }
        that.getFlag = false;

        let params = new Object();
        let news = new Object();
        params.news = news;
        newsList(that.page, params, (res) => {
          if (res.success) {
            if (res.data.content.length == 0) {
              that.finished = true;
            }
            let list = [];
            for (var i = 0; i < res.data.content.length; i++) {
              var list1 = that.topNewsList.filter(function(e) {
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
            that.$toast.fail(res.message);
            that.finished = true;
          }
          that.refresh = false;
          that.loading = false;
          that.getFlag = true;
        },that.lock)
      },
      goPageUrl(id, url) {
        let that = this;
        if (url == "" || url == null || url == undefined) {
          that.$toast.fail("未获取到url");
          return;
        }
        if(window.JsInterface){
          window.JsInterface.showNewsDetail(id, url, "大家都在看");
          return;
        }
        if(!url.startsWith("http")){
          url = "http://" + url;
        }
		if(url.startsWith("http://")){
		  url = "https" + url.substr(4);
		}
		console.log(url);
        document.location.href = url;
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
        document.location.href = url;
      },
      //长按事件
      gotouchstart(object, topFlag) {
        let that = this;
        clearTimeout(that.timeOutEvent); //清除定时器
        that.timeOutEvent = 0;
        that.timeOutEvent = setTimeout(function() {
          if (that.manage) {
            that.setTopFlag = true;
            that.topFlag = topFlag;
            that.newsId = object.id;
            that.updateTitle = object.title;
            console.log(that.updateTitle);
          }
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
      goUrl(id,url,categoryList) {
        let that = this;
        if(window.JsInterface){
          window.JsInterface.showNewsDetail(id, url, "大家都在看");
          return;
        }
        if(!url.startsWith("http")){
          url = "http://" + url;
        }
        document.location.href = url;
      },
      updateCmsTitle(){
        let that = this;
        let params = new Object();
        let res = new Object();
        res.id = that.newsId;
        res.title = that.updateTitle;
        params.res = res;
        updateCmsTitle(params, (res) => {
          if(res.success){
            that.updateTitleFlag = false;
            that.setTopFlag = false;
            that.onRefresh();
          }else{
            that.$toast.fail(res.message);
          }
        })
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
    },
    activated() {
      let that = this;
      var val1 = localStorage.getItem('isShow') //微信环境
      var val2 = localStorage.getItem('realShow') //小程序环境
      if( val1 && (!val2)){
        that.isHide = false
      }
      if(val2){
        that.lock = true
      }
      that.onRefresh();
    },
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
</style>
