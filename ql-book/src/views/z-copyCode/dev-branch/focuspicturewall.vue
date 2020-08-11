<template>
  <div class="ssss_container">
    <div class="imgListDiv">
      <van-row>
        <van-pull-refresh v-model="refresh" @refresh="onRefresh">
          <van-list @load="loadRelease" v-model="loading" :finished="finished" v-if="imgList[0]">
            <van-col span="8" v-for="(img,index) in imgList" :key="index">
              <!-- <div class="imgDiv" @click="enLarge(img.img)"> -->
              <div class="imgDiv" @click="goImgDetail(img.id)">
                <img :src="img.img" />
                <div class="imgNumDiv">
                  <div class="lookNum">
                    <img :src="img.photo" />
                    <div>{{img.hot}}次观看</div>
                  </div>
                  <div class="focusNum">
                    <div>{{img.likes}}</div>
                    <template v-if="img.like">
                      <img src="../../assets/img/pub/pub_ico_love_sel.png" @click.stop="likeCancel(img)" />
                    </template>
                    <template v-else>
                      <img src="../../assets/img/pub/pub_ico_love_white.png" @click.stop="likeAdd(img)" />
                    </template>
                  </div>
                </div>
              </div>
            </van-col>
          </van-list>
          <div v-else style="margin: 50px auto;width: 300px;text-align: center;">
            您暂未关注任何热图，快去关注吧
          </div>
        </van-pull-refresh>
      </van-row>
    </div>
  </div>
</template>

<script>
  import ZjHead from '../../components/pub/NewHead'
  import {
    checkLoginTime
  } from "../../assets/js/utils"
  import {
    focusSocialList,
    setNewsTop
  } from "../api/list_platform"
  import {
    getMembers,
    getShangquanOrGuke,
  } from "../api/groupApi"
  import {
    pageToPage,
    pageToThumbtack
  } from "../../assets/js/list"
  import {
    namecardRoleids
  } from "../api/zhiRoleApi"
  import {
    subscribeAdd,
    likeAdd,
    likeCancel
  } from "../api/thumbtackApi"
  import {
    newsTop
  } from "../api/listNoTokenApi"

  export default {
    data() {
      return {
        roleIdList: [],
        refresh: true,
        loading: true,
        finished: true,
        page: -1,
        getFlag: true,
        src: "",
        imgFlag: false,
        imgList: [],
        manage: false,
        setTopFlag: false,
        topFlag: false,
        newsId: "",
        topSocialList: [],
        dwId:''
      }
    },
    methods: {
      onRefresh() {
        let that = this;
        that.page = 0;
        that.finished = false;
        that.getFlag = true;
        that.topSocialList = [];
        that.imgList = [];
        that.getSocialList();
      },
      loadRelease() {
        let that = this;
        that.page++;
        that.getSocialList();
      },
      getSocialList() {
        let that = this;
        let params = new Object();
        let news = new Object();
        let userTag = new Object();
        userTag.id = "603971fffd8611e9b54b7cd30adfbf04";
        news.userTag = userTag;
        news.hot = true;
        news.organizationId = that.dwId;
        params.news = news;

        if (!that.getFlag) {
          that.page--;
          that.loading = false;
          return;
        }
        that.getFlag = false;

        focusSocialList(that.page, params, (res) => {
          if (res.success) {
            if (res.data.content.length == 0) {
              that.finished = true;
            }
            for (var i = 0; i < res.data.content.length; i++) {

              var list1 = that.topSocialList.filter(function(e) {
                return e.id == res.data.content[i].id
              });
              console.log(list1);
              if (list1.length != 0) {
                continue;
              }

              let params = new Object();
              params.photo = res.data.content[i].user.avatar;
              params.like = res.data.content[i].like;
              params.likes = res.data.content[i].likes;
              params.id = res.data.content[i].id;
              params.hot = res.data.content[i].hot;
              for (var j = 0; j < res.data.content[i].imageUrlList.length; j++) {
                if (!res.data.content[i].imageUrlList[j].endsWith(".mp4")) {
                  params.img = res.data.content[i].imageUrlList[j];
                  that.imgList.push(params);
                  console.log(that.imgList);
                  break;
                }
              }
            }
          } else {
            that.$toast.fail(res.msg);
            that.finished = true;
          }
          that.loading = false;
          that.refresh = false;
          that.getFlag = true;
        })
      },
      enLarge(src) {
        let that = this;
        console.log(src);
        that.imgFlag = true;
        that.src = src;
      },
      goDetail(detail) {
        pageToPage(detail);
      },
      goWebUrl(url) {
        let that = this;
        that.pageTo("/openWebUrl/" + Base64.encode(url));
      },
      likeAdd(item) {
        let that = this;
        let params = new Object();
        let res = new Object();
        res.id = item.id;
        params.res = res;
        likeAdd(params, (res) => {
          if (res.success) {
            item.like = true;
            item.likes++;
          } else {
            that.$toast.fail(res.message);
          }
        })
      },
      likeCancel(item) {
        let that = this;
        let params = new Object();
        let res = new Object();
        res.id = item.id;
        params.res = res;
        likeCancel(params, (res) => {
          if (res.success) {
            item.like = false;
            item.likes--;
          } else {
            that.$toast.fail(res.message);
          }
        })
      },
      goImgDetail(id) {
        let that = this;
        if(window.JsInterface){
          pageToThumbtack(id);
          return;
        }
        that.pageTo("/orgImgList/" + id);
      },
      notOk() {
        let that = this;
        that.$toast("暂未开发，敬请期待");
      },
    },
    components: {
      ZjHead: ZjHead
    },
    created() {
      let that = this;
      that.dwId = this.$route.query.dwId || ''
      that.onRefresh();
    },
  }
</script>

<style scoped="scoped">
  #app {
    background-color: #F3F3F3;
  }

  .ssss_container {
    width: 100%;
    height: 100%;
    /* overflow-x: hidden;
    overflow-y: auto; */
    background-color: #ebebeb;
  }

  .header {
    padding: 10px;
  }

  .header .shareIconDiv {
    float: right;
    width: 8%;
  }

  .header .shareIconDiv img {
    width: 100%;
  }

  .header .leftHeaderDiv img {
    float: left;
    width: 8%;
  }

  .header .leftHeaderDiv div {
    line-height: 27px;
    margin-left: 40px;
  }

  .monthAndCount {
    color: white;
    font-size: 12px;
    margin: 5px 12px;
  }

  .imgListDiv {
    margin-bottom: 100px;
    /* margin-top: 43px; */
  }

  .imgDiv {
    position: relative;
    width: 100%;
    height: 125px;
    /* padding-bottom: 98%; */
  }

  .imgDiv>img {
    position: absolute;
    top: 0;
    left: 0;
    width: 98%;
    height: 98%;
    object-fit: cover;
    vertical-align: bottom;
  }
  .imgDiv .imgNumDiv {
    font-size: 9px;
    position: absolute;
    bottom: 5px;
    width: 90%;
    padding: 1% 3%;
    line-height: 15px;
    color: white;
  }

  .imgDiv .imgNumDiv .lookNum {
    float: left;
    width: 59%;
  }

  .imgDiv .imgNumDiv .lookNum img {
    width: 12px;
    float: left;
    border-radius: 50%;
  }

  .imgDiv .imgNumDiv .focusNum {
    margin-left: 60%;
  }

  .imgDiv .imgNumDiv .focusNum img {
    width: 12px;
    float: right;
    margin-left: 2px;
    margin-right: 3px;
  }

  .imgDiv .imgNumDiv .focusNum div {
    float: right;
    margin-right: 5px;
  }

  .rightHeaderDiv img {
    width: 21px;
    position: relative;
    top: 5px;
    margin-right: 3px;
  }

  .van-nav-bar .rightHeaderDiv i {
    font-size: 21px;
    position: relative;
    top: -2px;
    margin-right: 20px;
    color: black;
  }

  .van-nav-bar__text {
    color: black;
  }

  .van-nav-bar .van-icon {
    color: black;
  }

  .topDiv {
    background-color: #99CCFF;
  }

  .van-list{
    display: inline-block;
    width: 100%;
  }
</style>
