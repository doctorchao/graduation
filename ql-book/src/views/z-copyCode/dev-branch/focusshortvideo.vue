<template>
  <div class="ssss_container">
    
    <div class="imgListDiv">
      <div>
        <van-row gutter="4">
          <template v-if="videoList.length == 0">
            <div style="width: 100%;text-align: center;">没有更多了</div>
          </template>
          <van-pull-refresh v-model="refresh" @refresh="onRefresh">
            <van-list @load="loadRelease" v-model="loading" :finished="finished" v-if="videoList[0]">
              <van-col span="12" v-for="(video,index) in videoList" :key="index">
                <div class="imgDiv" @click="goVideoDetail(video.id)">
                  <video :class="'img' + index%2" :src="video.video" :poster="video.img" style="" />

                  <!-- <template v-if="video.extParameters != null && video.extParameters.length != 0">
                    <div class="starImgDiv" @click.stop="goDetail(video.extParameters[0].key)">
                      <div>
                        <img class="starTitleImg" :src="video.extParameters[0].value" />
                        <img class="starImg" src="../../assets/img/pub/tuding_label_luckystar.png" />
                      </div>
                    </div>
                  </template> -->

                  <div class="imgBottomDiv">
                    <div class="title">{{video.content}}</div>
                    <div class="imgNumDiv">
                      <div class="lookNum">
                        <img :src="video.photo" />
                        <div>{{video.hot}}次观看</div>
                      </div>
                      <div class="focusNum">
                        <template v-if="video.like">
                          <img src="../../assets/img/pub/pub_ico_love_sel.png" @click.stop="likeCancel(video)" />
                        </template>
                        <template v-else>
                          <img src="../../assets/img/pub/pub_ico_love_white.png" @click.stop="likeAdd(video)" />
                        </template>
                        <div>{{video.likes}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </van-col>
            </van-list>
            <div v-else style="margin: 50px auto;width: 300px;text-align: center;">
            您暂未关注任何火视频，快去关注吧
          </div>
          </van-pull-refresh>
        </van-row>
      </div>
    </div>

    <!-- 置顶弹窗 -->
    <van-popup v-model="setTopFlag" style="width: 70%">
      <template v-if="!topFlag">
        <van-button size="small" style="width: 100%;" @click="setNewsTop(true)">置顶</van-button>
      </template>
      <template v-else>
        <van-button size="small" style="width: 100%;" @click="setNewsTop(false)">取消置顶</van-button>
      </template>
    </van-popup>
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
        // socialList: [],
        roleIdList: [],
        refresh: true,
        loading: true,
        finished: true,
        page: -1,
        getFlag: true,
        src: "",
        imgFlag: false,
        videoList: [],
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
        that.videoList = [];
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
        userTag.id = "69322138fd8611e9b54b7cd30adfbf04";
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
              params.extParameters = res.data.content[i].extParameters;
              params.id = res.data.content[i].id;
              params.content = res.data.content[i].content;
              params.hot = res.data.content[i].hot;
              for (var j = 0; j < res.data.content[i].imageUrlList.length; j++) {
                if (res.data.content[i].imageUrlList[j].endsWith(".mp4")) {
                  params.video = res.data.content[i].imageUrlList[j];
                  console.log("图片index:" + res.data.content[i].imageUrlList.length + "," + Number(j + 1));
                  if (res.data.content[i].imageUrlList.length > Number(j + 1)) {
                    params.img = res.data.content[i].imageUrlList[Number(j + 1)];
                  } else {
                    params.img = "https://python-server.oss-cn-shenzhen.aliyuncs.com/app_wx_video_bg.png";
                  }
                  that.videoList.push(params);
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
      goVideoDetail(id) {
        let that = this;
        if(window.JsInterface){
          pageToThumbtack(id);
          return;
        }
        that.pageTo("/orgVideoList/" + id);
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
  .ssss_container {
    width: 100%;
    height: 100%;
    /* overflow-x: hidden;
    overflow-y: auto; */
    background-color: #ebebeb;
  }

  #app {
    background-color: #F3F3F3;
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
    color: white;
    line-height: 27px;
    margin-left: 40px;
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

  .rightHeaderDiv img {
    width: 21px;
    position: relative;
    top: 5px;
  }

  .imgListDiv {
    margin-bottom: 100px;
    /* margin-top: 43px; */
  }

  .imgDiv {
    position: relative;
    height: 248px;
    overflow: hidden;
  }

  .imgDiv>video {
    height: 99%;
    object-fit: cover;
    width: 99%;
  }

  .imgDiv>img {
    width: 99%;
  }

  .imgDiv .imgBottomDiv {
    position: absolute;
    bottom: 2px;
    padding: 5px;
    color: white;
    width: 95%;
  }

  .imgDiv .imgBottomDiv .title {
    color: white;
    font-size: 13px;
    margin-bottom: 24px;
  }

  .imgDiv .imgNumDiv {
    font-size: 9px;
    width: 96%;
    line-height: 15px;
  }

  .imgDiv .imgNumDiv .lookNum {
    float: left;
    width: 59%;
  }

  .imgDiv .imgNumDiv .lookNum img {
    width: 12px;
    float: left;
    border-radius: 50%;
    margin-right: 5px;
  }

  .imgDiv .imgNumDiv .focusNum {
    margin-left: 60%;
    text-align: right;
  }

  .imgDiv .imgNumDiv .focusNum img {
    width: 12px;
    margin-right: 3px;
  }

  .imgDiv .imgNumDiv .focusNum div {
    float: right;
  }

  .starImgDiv {
    width: 20%;
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .starImgDiv .starTitleImg {
    border-radius: 50%;
    width: 70%;
    margin: 15%;
  }

  .starImgDiv .starImg {
    width: 78%;
    position: absolute;
    z-index: 1;
    right: -2px;
    top: 0px;
  }
  
  .van-list{
    display: inline-block;
  }
</style>
