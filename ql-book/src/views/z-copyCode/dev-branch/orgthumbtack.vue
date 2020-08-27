<template>
  <div class="ssss_container">
    <!-- <zj-head @click-left="pageBack(true)" left-text="图钉" v-if="isHide"/> -->
    <div>
      <div class="tab_wrap">
        <van-tabs swipeable v-model="tabIndex" >
          <van-pull-refresh v-model="refresh" @refresh="onRefresh(selectedTag)">
              <!-- 置顶 -->
            <van-tab v-for="(item,index1) in dwNewsTagList" :key="index1" :title="item">
              <van-list @load="loadRelease" v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check= true>
                <div class="listDiv topDiv" v-for="(social,index) in topSocialList" :key="index" @click="goThumbtackDetail(social.id)"
                  @touchstart="gotouchstart(social,true)" @touchmove="gotouchmove" @touchend="gotouchend">
                  <!-- 头像 -->
                  <div class="leftImg">
                    <template v-if="social.user != null && social.user.avatar != null">
                      <img :src="social.user.avatar" @click.stop="goRoleDetail(social.user.roleId)" />
                    </template>
                    <template v-else>
                      <img src="https://python-server.oss-cn-shenzhen.aliyuncs.com/app_mrtx_role.png" />
                    </template>
                  </div>
                  <!-- 右侧的文字 -->
                  <div class="listRightDiv">
                    <!-- 第一大层 -->
                    <div>
                      <div class="nameDiv">
                        <div>
                          <div class="userName">{{social.author}}</div>
                          <div class="fansNum">粉丝<span class="fans_color">{{social.user.fans}}</span></div>
                          <template v-if="social.user.subscribe">
                            <div class="focus">
                              已关注
                            </div>
                          </template>
                          <template v-else>
                            <div class="noFocus">
                              未关注
                            </div>
                          </template>
                        </div>
                        <div class="timeDiv">
                          <img src="../../assets/img/pub/pub_ico_mapdz.png" v-if="social.location"/>
                          <div>
                            <span v-if="social.location">{{`${social.location.city}.${social.location.street}`}}</span>&nbsp;&nbsp;
                            <span>{{social.formatTime}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="starImgDiv">
                        <template v-if="social.extParameters != null && social.extParameters.length != 0">
                          <!-- <div @click.stop="goDetail(social.extParameters[0].key)"> -->
                          <div @click.stop="goDetail(social.extParameters[0].key)">
                            <img class="starTitleImg" :src="social.extParameters[0].value" />
                            <img class="starImg" src="../../assets/img/pub/tuding_label_luckystar.png" />
                          </div>
                        </template>
                      </div>
                    </div>
                    <!-- 第二层 -->
                    <div class="newsExtensionTitle">{{social.content}}</div>
                    <!-- 第三层 -->
                    <template v-if="social.repost">
                      <div class="newsDiv" @click.stop="goWebUrl(social.repost.url)">
                        <img :src="social.repost.img" />
                        <div class="hasImgText">{{social.repost.title}}</div>
                      </div>
                    </template>
                  </div>
                  <!-- 心情标签 -->
                  <div class="leftImg">
                    <template v-if="social.emoticonList != null && social.emoticonList.length> 0">
                      <img :src="social.emoticonList[0]" />
                    </template>
                  </div>
                  <!-- 图片层 -->
                  <template v-if="social.imageUrlList">
                    <div class="imgDiv">
                      <van-row class="img-row">
                        <van-col span="8" v-for="(img,index) in social.imageUrlList" :key="index">
                          <template v-if="img.endsWith('.mp4')">
                            <!-- <video :src="img" @click.stop="enLarge(img)" :tackVideo="true"></video> -->
                            <div class="video_play">
                              <!-- <video :src="img" :poster="social.imageUrlList[index+1]" @click.stop="enLarge(img)" :tackVideo="true"></video> -->
                              <!-- <video :src="img" :poster="social.imageUrlList[index+1]" :tackVideo="true"></video> -->
                              <img :src="social.imageUrlList[index+1]" style="width: 1.95rem;height: 1.95rem;" />
                              <div class="video_play_ico">
                                <img src="../../assets/img/pub/pub_ico_play.png" style="width:100%; height:100%" />
                              </div>
                            </div>
                          </template>
                          <template v-else-if="img.endsWith('.jpeg') || img.endsWith('.jpg') || img.endsWith('.png')">
                            <div class="pushpin-img">
                              <!-- <img :src="img" @click.stop="enLarge(img)" :tackImg="true" /> -->
                              <img :src="img" :tackImg="true" />
                            </div>
                          </template>
                        </van-col>
                      </van-row>
                    </div>
                  </template>
                  <!-- 关注评论层 -->
                  <div class="commonDiv">
                    <div class="commonType">{{social.viewTypeName}}</div>
                    <div class="tackType">
                      <div v-for="(tag,index) in social.tagList" :key="index" class="tagDiv">
                        {{tag}}
                      </div>
                      <!-- <van-tag v-show="social.tackImg">图片</van-tag>
                      <van-tag v-show="social.tackVideo">视频</van-tag> -->
                    </div>
                    <div class="loveCommmonDiv">
                      <div>
                        <template v-if="!social.like">
                          <img src="../../assets/img/pub/pub_ico_love_nor.png" />
                        </template>
                        <template v-else>
                          <img src="../../assets/img/pub/pub_ico_love_sel.png" />
                        </template>
                        <div>{{social.likes}}</div>
                      </div>
                      <div>
                        <img src="../../assets/img/pub/pub_ico_comment_sel.png" />
                        <div>{{social.comments}}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="listDiv" v-for="(social,index) in socialList" :key="index" @click="goThumbtackDetail(social.id)"
                  @touchstart="gotouchstart(social,false)" @touchmove="gotouchmove" @touchend="gotouchend">
                  <!-- 头像 -->
                  <div class="leftImg">
                    <template v-if="social.user != null && social.user.avatar != null">
                      <img :src="social.user.avatar" @click.stop="goRoleDetail(social.user.roleId)" />
                    </template>
                    <template v-else>
                      <img src="https://python-server.oss-cn-shenzhen.aliyuncs.com/app_mrtx_role.png" />
                    </template>
                  </div>
                  <!-- 右侧的文字 -->
                  <div class="listRightDiv">
                    <!-- 第一大层 -->
                    <div>
                      <div class="nameDiv">
                        <div>
                          <div class="userName">{{social.author}}</div>
                          <div class="fansNum">粉丝<span class="fans_color">{{social.user.fans}}</span></div>
                          <template v-if="social.user.subscribe">
                            <div class="focus">
                              已关注
                            </div>
                          </template>
                          <template v-else>
                            <div class="noFocus">
                              未关注
                            </div>
                          </template>
                        </div>
                        <div class="timeDiv">
                          <img src="../../assets/img/pub/pub_ico_mapdz.png" v-if="social.location"/>
                          <div>
                            <span v-if="social.location">{{`${social.location.city}.${social.location.street}`}}</span>&nbsp;&nbsp;
                            <span>{{social.formatTime}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="starImgDiv">
                        <template v-if="social.extParameters != null && social.extParameters.length != 0">
                          <!-- <div @click.stop="goDetail(social.extParameters[0].key)"> -->
                          <div @click.stop="goDetail(social.extParameters[0].key)">
                            <img class="starTitleImg" :src="social.extParameters[0].value" />
                            <img class="starImg" src="../../assets/img/pub/tuding_label_luckystar.png" />
                          </div>
                        </template>
                      </div>
                    </div>
                    <!-- 第二层 -->
                    <div class="newsExtensionTitle">{{social.content}}</div>
                    <!-- 第三层 -->
                    <template v-if="social.repost">
                      <div class="newsDiv" @click.stop="goWebUrl(social.repost.url)">
                        <img :src="social.repost.img" />
                        <div class="hasImgText">{{social.repost.title}}</div>
                      </div>
                    </template>
                  </div>
                  <!-- 心情标签 -->
                  <div class="leftImg">
                    <template v-if="social.emoticonList != null && social.emoticonList.length> 0">
                      <img :src="social.emoticonList[0]" />
                    </template>
                  </div>
                  <!-- 图片层 -->
                  <template v-if="social.imageUrlList">
                    <div class="imgDiv">
                      <van-row class="img-row">
                        <van-col span="8" v-for="(img,index) in social.imageUrlList" :key="index">
                          <template v-if="img.endsWith('.mp4')">
                            <!-- <video :src="img" @click.stop="enLarge(img)" :tackVideo="true"></video> -->
                            <div class="video_play">
                              <!-- <video :src="img" :poster="social.imageUrlList[index+1]" @click.stop="enLarge(img)" :tackVideo="true"></video> -->
                              <!-- <video :src="img" :poster="social.imageUrlList[index+1]" :tackVideo="true"></video> -->
                              <img :src="social.imageUrlList[index+1]" style="width: 1.95rem;height: 1.95rem;" />
                              <div class="video_play_ico">
                                <img src="../../assets/img/pub/pub_ico_play.png" style="width:100%; height:100%" />
                              </div>
                            </div>
                          </template>
                          <template v-else-if="img.endsWith('.jpeg') || img.endsWith('.jpg') || img.endsWith('.png')">
                            <div class="pushpin-img">
                              <!-- <img :src="img" @click.stop="enLarge(img)" :tackImg="true" /> -->
                              <img :src="img" :tackImg="true" />
                            </div>
                          </template>
                        </van-col>
                      </van-row>
                    </div>
                  </template>
                  <!-- 关注评论层 -->
                  <div class="commonDiv">
                    <div class="commonType">{{social.viewTypeName}}</div>
                    <div class="tackType">
                      <div v-for="(tag,index) in social.tagList" :key="index" class="tagDiv">
                        {{tag}}
                      </div>
                      <!-- <van-tab v-for="tag in social.tagList">{{tag}}</van-tab> -->
                      <!-- <van-tag v-show="social.tackImg">图片</van-tag>
                      <van-tag v-show="social.tackVideo">视频</van-tag> -->
                    </div>
                    <div class="loveCommmonDiv">
                      <div>
                        <template v-if="!social.like">
                          <img src="../../assets/img/pub/pub_ico_love_nor.png" />
                        </template>
                        <template v-else>
                          <img src="../../assets/img/pub/pub_ico_love_sel.png" />
                        </template>
                        <div>{{social.likes}}</div>
                      </div>
                      <div>
                        <img src="../../assets/img/pub/pub_ico_comment_sel.png" />
                        <div>{{social.comments}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </van-list>
            </van-tab>
            <template v-if="manage">
              <div class="releaseTack" @click="pageToReleaseTacks">
                <img src="../../assets/img/pub/pub_ico_tianjiay.png" width="55" height="55">
              </div>
            </template>
          </van-pull-refresh>
        </van-tabs>
        <div class="tab_more" @click="havePermission?showMore():showAll()">
          <span>更多</span>
        </div>
        <div class="more_wrap" v-show="isShowMore">
          <div class="more_item flex_c" @click="showAll">
            <div><span>所有图钉</span></div>
          </div>
          <div class="more_item flex_c" @click="showSortTag=true">
            <div><span>设置标签</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- <van-popup v-model="showSortTag" position="bottom" style="height: 100%;"> -->
      <!-- <ZjHead left-text="标签排序(长按拖动)" @click-left="showSortTag=false" right-text="保存" @click-right="updateTagListSort()"></ZjHead> -->
      <tagSetting :showSortTag="showSortTag" typeId='2' @closed="getTag" :dwId='orgId'></tagSetting>
    <!-- </van-popup> -->

    <van-popup v-model="imgFlag" style="width: 60%;background-color: rgba(0,0,0,-0.7);">
      <template v-if="src.endsWith('.mp4')">
        <video :src="src" controls="controls" style="width: 100%;"></video>
      </template>
      <template v-else>
        <img :src="src" style="width: 100%;" />
      </template>
    </van-popup>

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
    checkLoginTime,
    handleTime
  } from "../../assets/js/utils"
  import {
    socialList,
    dwSocialList
  } from "../api/list_platform"
  import {
    getMembers,
    getShangquanOrGuke,
    selectManagerInfoByDwIdAndRoleId,
    selectManagerInfoByDwIdAndUserId,
    getDwDetails
  } from "../api/groupApi"
  import {
    pageToPage,
    pageToRole
  } from "../../assets/js/list"
  import {
    namecardRoleids
  } from "../api/zhiRoleApi"
  import {
    subscribeAdd
  } from "../api/thumbtackApi"
  import {
    setNewsTop
  } from "../api/list_platform"
  import {
    newsTop
  } from "../api/listNoTokenApi"
  import {
    getDwTagList
  } from "../api/newsApi"
  import tagSetting from '../../components/pub/tagSetting'

  export default {
    data() {
      return {
        socialList: [],
        roleIdList: [],
        refresh: true,
        loading: false,
        finished: true,
        page: 0,
        getFlag: true,
        src: "",
        imgFlag: false,
        manage: false,
        setTopFlag: false,
        topFlag: false,
        newsId: "",
        topSocialList: [],
        isHide: true,
        dwNewsTagList:['全部'],
        tabIndex:0,
        isShowMore:false,
        moreTagList:{},
        showSortTag:false,
        havePermission:false,
        selectedTag:''
      }
    },
    methods: {
      showMore(){
        this.isShowMore = !this.isShowMore
      },
      showAll(){
        this.pageTo('/thumbtackList')
      },
      getTag(val,tagList,unMarkTagList){
        if(val){
          this.dwNewsTagList = tagList
          this.showSortTag = false
        }else{
          this.showSortTag = false
        }
        console.log(val,tagList,'11112222233333')
      },
      onRefresh(selectedTag) {
        let that = this;
        // that.page = 1;
        that.page = 0;
        that.finished = true;
        that.getFlag = true;
        that.socialList = [];
        that.newsTop(selectedTag);
      },
      loadRelease() {
        console.log('999999')
        let that = this;
        that.page++;
        let lock = true
        that.getSocialList(this.selectedTag,lock);
      },
      newsTop(selectedTag) {
        let that = this;
        let params = new Object();
        let news = new Object();
        let userTag = new Object()
        if(selectedTag != '全部'){
          userTag.name = selectedTag
          news.userTag = userTag
        }
        news.organizationId = that.orgId;
        params.news = news;
        newsTop(params, (res) => {
          if (res.success) {
            let filterNews = res.data.filter(function(e) {
              return e.type == "res.type.social"
            });
            that.topSocialList = that.formatJson(filterNews);
            that.page = 0;
            that.getSocialList(selectedTag);
            that.finished = false;
          } else {
            that.$toast.fail(res.message);
          }
        })
      },
      getSocialList(selectedTag,lock) {
        let that = this;
        let params = new Object();
        let news = new Object();
        let userTag = new Object()
        if(selectedTag != '全部'){
          userTag.name = selectedTag
          news.userTag = userTag
        }
        news.organizationId = that.orgId;
        params.news = news;
        if (!that.getFlag) {
          that.page--;
          that.loading = false;
          return;
        }
        that.getFlag = false;
        // const loading = this.$toast.loading({
        //   mask: true,
        //   duration: 3000
        // })

        dwSocialList(that.page, params, (res) => {
          if (res.success) {
            // loading.clear()
            if (res.data.content.length == 0) {
              that.finished = true;
            }
            let list = [];
            for (var i = 0; i < res.data.content.length; i++) {
              var list1 = that.topSocialList.filter(function(e) {
                return e.id == res.data.content[i].id
              });
              console.log(list1,'11111');
              if (list1.length == 0) {
                list.push(res.data.content[i]);
              }
            }
            console.log(list,'2222')
            if(lock){
              that.socialList = that.socialList.concat(that.formatJson(list));
            }else{
              that.socialList = that.formatJson(list)
            }
            var i;
            for (i = 0; i < that.socialList.length; i++) {
              var imgList = that.socialList[i]["imageUrlList"];
              var j;
              for (j = 0; j < imgList.length; j++) {
                if (imgList[j].endsWith(".mp4")) {
                  that.$set(that.socialList[i], "tackVideo", true)
                } else if (imgList[j].endsWith("jpeg") || imgList[j].endsWith("jpg") || imgList[j].endsWith("png")) {
                  that.$set(that.socialList[i], "tackImg", true)
                }
              }
            }
            console.log("socialList ==== " + that.socialList)
          } else {
            that.$toast.fail(res.msg);
            that.finished = true;
          }
          that.loading = false;
          that.refresh = false;
          that.getFlag = true;
        })
      },
      formatJson(jsonList) {
        console.log(jsonList,'333')
        for (var i = 0; i < jsonList.length; i++) {
          // console.log(jsonList[i].time);
          // let date = new Date(jsonList[i].time);
          // let formatTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() +
          //   " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
          let formatTime = handleTime(jsonList[i].time)
          jsonList[i].formatTime = formatTime;
          let viewType = jsonList[i].viewType;
          if (viewType == "PUBLIC") {
            jsonList[i].viewTypeName = "公开";
          }
        }
        return jsonList;
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
      goThumbtackDetail(id) {
        let that = this;
        that.pageTo("/orgThumbtackDetail/" + id);
      },
      subscribeAdd(item) {
        let that = this;
        subscribeAdd(item.user.roleId, {}, (res) => {
          if (res.success) {
            item.user.subscribe = true;
          } else {
            that.$toast.fail(res.message);
          }
        })
      },
      pageToReleaseTacks() {
        this.pageTo(`/thumbtackRelease/0/${this.orgId}`);
      },
      selectManagerInfoByDwIdAndUserId() {
        let that = this;

        let params = new Object();
        params.dwId = that.orgId;
        params.userId = checkLoginTime().id;
        selectManagerInfoByDwIdAndUserId(params, (res) => {
          if (res.code == 0) {
            that.manage = res.data;
          } else {
            that.$toast.fail(res.msg);
          }
        })
      },
      gotouchstart(object, topFlag) {
        let that = this;
        clearTimeout(that.timeOutEvent); //清除定时器
        that.timeOutEvent = 0;
        that.timeOutEvent = setTimeout(function() {
          if (that.manage) {
            that.setTopFlag = true;
            that.topFlag = topFlag;
            that.newsId = object.id;
            console.log(that.newsId);
            // that.updateTitle = object.title;
            // console.log(that.updateTitle);
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

        setNewsTop(params, (res) => {
          if (res.success) {
            if (topFlag) {
              that.$toast("置顶成功");
            } else {
              that.$toast("取消置顶成功");
            }
            that.setTopFlag = false;
            that.onRefresh(that.selectedTag);
          } else {
            that.$toast.fail(res.message);
          }
        })
      },
      goRoleDetail(id) {
        pageToRole(id);
      },
      getDwDetails(){
        getDwDetails(this.orgId, (res) => {
          console.log(res,'单位详情')
          console.log(checkLoginTime(),'用户详情')
          if(res.owner == checkLoginTime().id){
            //  this.havePermission = true
             this.manage = true
          }
        })
      },
    },
    components: {
      ZjHead: ZjHead,
      tagSetting:tagSetting
    },
    watch: {
      tabIndex(val){
        this.selectedTag = this.dwNewsTagList[val]
        console.log('改动了')
        this.onRefresh(this.dwNewsTagList[val])
      }
    },
    activated() {
      let that = this
      var val = localStorage.getItem('isShow')
      if(val){
          that.isHide = false
          document.title = 'z社区图钉'
      }
      that.selectManagerInfoByDwIdAndUserId();
      // getDwTagList(that.orgId,2,res=>{
      //   console.log(res,'kkkkkkkk')
      //   this.dwNewsTagList = res.data
      //   if(this.selectedTag == ''){
      //     that.selectedTag = res.data[0]
          that.onRefresh('全部');
      //   }
      // })
      this.getDwDetails()
    },
    props: {
      groupId: {
        type: String,
        default: ""
      },
      orgId: {
        type: String,
        default: ""
      }
    }
  }
</script>

<style>
  * {
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }

  .ssss_container {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    margin-bottom: 80px;
  }

  .listDiv {
    background-color: white;
    border-bottom: 0.5px solid gainsboro;
  }

  .leftImg {
    width: 12%;
    float: left;
  }

  .leftImg img {
    width: 80%;
    margin-left: 15%;
    margin-top: 15%;
  }

  .listRightDiv {
    margin-left: 12.5%;
    padding: 5px;
  }

  .nameDiv {
    width: 85%;
    float: left;
  }

  .nameDiv>div {
    width: 100%;
    height: 22px;
  }

  .nameDiv>div>div {
    margin-right: 10px;
  }

  .nameDiv .userName {
    color: #0B97C4;
    float: left;
    line-height: 22px;
    max-width: 62%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .nameDiv .fansNum {
    font-size: 12px;
    float: left;
    line-height: 22px;
  }

  .fans_color{
    color: red;
  }

  .nameDiv .focus {
    float: left;
    font-size: 8px;
    margin-top: 5px;
    width: 0.7rem;
    text-align: center;
    background-color: red;
    color: white;
    border-radius: 2px;
  }

  .nameDiv .yesFocus {
    background-color: red;
    color: white;
  }

  .nameDiv .noFocus {
    float: left;
    border: 0.5px solid red;
    font-size: 8px;
    margin-top: 5px;
    width: 0.7rem;
    text-align: center;
    border-radius: 2px;
  }

  .starImgDiv {
    width: 13%;
    margin-left: 85%;
    height: 43px;
    position: relative;
  }

  .starImgDiv .starTitleImg {
    border-radius: 50%;
    /* width: 70%; */
    width: 0.75rem;
    height: 0.75rem;
    margin: 15%;
  }

  .starImgDiv .starImg {
    width: 70%;
    position: absolute;
    z-index: 1;
    right: -5px;
    top: 0px;
  }

  .nameDiv>.timeDiv {
    margin: 3px 0;
    height: 15px;
  }

  .timeDiv img {
    width: 10px;
    float: left;
    margin-top: 2px;
  }

  .timeDiv div {
    font-size: 11px;
    color: #999;
  }

  .newsExtensionTitle {
    font-size: 15px;
  }

  .newsDiv {
    background-color: #ccc;
    min-height: 28px;
  }

  .newsDiv img {
    height: 20px;
    float: left;
    margin: 3px;
  }

  .newsDiv .hasImgText {
    font-size: 12px;
    padding: 6px 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #006666;
  }

  /* .imgDiv > div{
    width: 33%;
    float: left;
  } */

  .imgDiv img {
    width: 90%;
    margin-left: 5%;
    /* margin-right: 5%; */
  }

  /* === added, 2019-12-3 === */
  .img-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    justify-items: center;
    align-content: center;
  }

  .imgDiv {
    margin-left: 12.5%;
    margin-right: 5%;
    /* padding-bottom: 0.15rem; */
  }

  .pushpin-img {
    width: 1.95rem;
    height: 1.95rem;
    margin-bottom: 0.1rem;
  }

  .imgDiv img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .tackType {
    position: absolute;
    margin-left: 14.5%;
  }

  .video_play {
    position: relative;
  }

  .video_play_ico {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 50%;
    left: 50%;
    margin: -15px 0 0 -15px;
  }

  .releaseTack {
    position: fixed;
    bottom: 12%;
    right: 5%;
    background-color: transparent;
    z-index:3
  }

  /* === added by the other ===*/

  .imgDiv video {
    width: 90%;
    margin: 5%;
  }

  .commonDiv {
    height: 30px;
  }

  .commonType {
    float: left;
    font-size: 12px;
    font-size: #fff;
    margin-left: 12px;
    padding-top: 2px;
  }

  .loveCommmonDiv {
    font-size: 12px;
    padding-top: 0.2em;
  }

  .loveCommmonDiv>div {
    float: right;
    width: 30px;
    margin-right: 10px;
  }

  .loveCommmonDiv img {
    height: 12px;
    float: left;
    margin-right: 7px;
  }

  .topDiv {
    background-color: #eaf4ff;
  }

  .tagDiv {
    float: left;
    font-size: 10px;
    height: 0.3rem;
    line-height: 0.3rem;
    padding: 2px 10px;
    margin: 2px;
    /* min-width: 0.9rem; */
    background-color: #ebebeb;
    border-radius: 0.3rem;
    color: #3298ff;
    text-align: center;
  }
  .tab_wrap /deep/ .van-tab{
    /* flex-basis:15% !important */
    flex: none !important;
    /* min-width: 12%; */
    padding: 0 8px;
    color: black;
    font-size: 0.30rem;
  }
  .tab_wrap /deep/ .van-tab--active{
    color: rgb(255, 50, 50);
    font-weight: bold;
  }
  .tab_wrap /deep/ .van-tabs__nav--line{
    background-color: white;
    margin-right: 12%;
  }
  .tab_wrap /deep/ .van-tabs__wrap{
    position: fixed;
    top: 0;
    z-index: 2!important;
    width: 100%;
    height: 0.84rem;
  }
  .tab_wrap /deep/ .van-tabs__content{
    margin-top: 0.84rem;
  }
  .tab_wrap /deep/ .van-tab__pane{
    min-height: 10rem;
  }
  /* .tab_wrap{
    position: relative;
  } */
  .tab_more{
    position: fixed;
    top: 0;
    right: 0;
    height: 0.84rem;
    width: 12%;
    background-color: #f3f3f3;
    text-align: center;
    line-height: 0.84rem;
    box-shadow: -10px 0 10px -3px #ebebeb;
    color: #646566;
    font-size: 0.28rem;
    z-index: 3;
  }
  .more_wrap{
    max-width: 30%;
    position: fixed;
    background-color: #f3f3f3;
    border-radius: 0 0 0 10px;
    top: 0.84rem;
    right: 0;
    font-size: 0.28rem;
    color: #646566;
    z-index: 3;
  }
  .more_item{
    border-top: 0.5px solid #ebebeb;
    padding: 10px 20px;
  }
</style>
