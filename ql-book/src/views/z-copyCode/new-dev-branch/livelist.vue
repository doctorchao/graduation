<template>
  <div class="sl_container">
    <!-- <header class="mui-bar mui-bar-nav">
      <div class="range" id="range1" @click="showLocationAction">
        珠海市
        <img style="width: 10px;position: absolute;top: 21px;" src="../../assets/img/search/pub_laber_topleftw.png">
        <h6>
          <template v-if="distance == '全网'">全网</template>
          <template v-else>{{distance}}km</template>
        </h6>
      </div>
      <div class="distanceProp"></div>
      <input type="text" id="search" v-model="keyWord" placeholder="搜索...">
      <div class="label" id="goSearch">
        [{{showName}}]
      </div>
      <div id="search1" class="back" @click="search">搜索</div>
    </header> -->

    <!-- <template v-if="chooseList.length > 0">
      <div class="largeLabel1" style>

        <img v-if="havePermission && modifyTagList.length>=2" @click="showSortTag=true"  src="../../assets/img/pub/pub_shareshop_ico_more.png" style="width:20px;height:20px;position: absolute;top: 12px;right: 0px;z-index: 2;">
        <div style="width: 3000px;">
          <div v-for="(choose1, index) in chooseList" :key="index">
            <div v-if="choose1 == chooseSecondType" class="labela1" @click="chooseBtn(choose1)"
              style="background-color: #3298FF;color: white;">{{choose1}}</div>
            <div v-else>
              <div class="labela1" @click="chooseBtn(choose1)">{{choose1}}</div>
            </div>
          </div>
        </div>

        <ul class="slide-box">
          <template>
            <li class="slide-item" v-for="(item,index) in chooseList" v-if="item" :key="index">
              <van-button :style="item==chooseSecondType?`background-color: #3298FF;color: #fff;`:''" style="background-color: #E3E3E3;"
                @click="chooseBtn(item)" round size="small">{{item}}</van-button>
            </li>
          </template>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </ul>
      </div>
    </template> -->

    <!-- <div class="count_num count_num1">
      <template v-if="distance == '全网'">全网</template>
      <template v-else>{{distance}}km</template>
      范围内搜索结果共有
      <template v-if="totalCount == ''">0</template>
      <template v-else>{{totalCount}}</template>
      个目标
    </div> -->

    <!-- 列表 -->
    <div class="tab_wrap">
      <van-tabs swipeable v-model="tabIndex">
        <section class="sl_main1">
          <van-pull-refresh v-model="refresh" @refresh="onRefresh">
            <!-- <van-list @load="loadRelease" v-model="loading" :finished="finished"> -->
              <van-tab v-for="(item,index) in chooseList" :key="index" :title="item">
                <div class="listBlock" v-for="(detail,index) in liveList" :key="index" @click="goLiveDetail(detail.id)">
                  <van-row>
                    <van-col span="8">
                      <div class="leftImgDiv">
                        <img :src="detail.faceurl" class="leftImg" />
                        <img src="../../assets/img/pub/pub_ico_play.png" class="playImg" />
                        <div class="liveStatus">
                          <template v-if="detail.islive">
                            正在直播...
                          </template>
                          <template v-else-if="nowTimeNum > detail.endtime">
                            已结束
                          </template>
                          <template v-else>
                            未开始
                          </template>
                        </div>
                      </div>
                    </van-col>
                    <van-col span="16">
                      <div class="rightDiv">
                        <div class="title">{{detail.name}}的直播间</div>
                        <div class="introduction">
                          {{detail.content}}
                        </div>
                        <div class="anchor">直播人：<span class="anchor_text">{{detail.ownername}}</span></div>
                        <div class="time">直播时间: <span class="anchor_text">{{detail.playTime}}</span></div>
                      </div>
                    </van-col>
                  </van-row>
                </div>
              </van-tab>
            <!-- </van-list> -->
            <div class="noLiveMsg" v-if="liveList.length == 0">没有更多了</div>
          </van-pull-refresh>
        </section>
      </van-tabs>
      <div class="tab_more" @click="havePermission?showMore():showAll()">
        <span>更多</span>
      </div>
      <div class="more_wrap" v-show="isShowMore">
        <div class="more_item flex_c" @click="showAll">
          <div><span>所有直播</span></div>
        </div>
        <div class="more_item flex_c" @click="showSortTag=true">
          <div><span>设置标签</span></div>
        </div>
      </div>
    </div>

    <!-- 滑动标签 -->
    <!-- <van-popup v-model="showSortTag" position="bottom" style="height: 100%;">
      <ZjHead left-text="标签排序(长按拖动)" @click-left="showSortTag=false" right-text="保存" @click-right="updateTagListSort()"></ZjHead>
      <ul>
        <template v-if="havePermission">
          <transition-group name="flip-list">
            <li class="slide-item" v-for="(item,index) in modifyTagList" v-if="item" :key="item" v-dragging="{item: item, list: modifyTagList}"
              style="float: left;">
              <van-button style="background-color: #E3E3E3;" round size="small">{{item}}</van-button>
            </li>
          </transition-group>
        </template>
      </ul>
    </van-popup> -->
    <!-- <van-popup v-model="showSortTag" position="bottom" style="height: 100%;"> -->
      <tagSetting :showSortTag="showSortTag" typeId='1' @closed="getTag" :dwId='dwId'></tagSetting>
    <!-- </van-popup> -->
  </div>
</template>

<script>
  import '../../assets/css/list.css'
  import '../../assets/css/search.css'
  import {
    current
  } from "../api/zhiLogin"
  import {
    checkLoginTime,
    checkDwManager,
    goLiveDetail
  } from "../../assets/js/utils"
  import {
    liveVideoRoom,
  } from "../api/zhiLiveApi"
  import {
    getDwTagList
  } from "../api/newsApi"
  import {
    formatNumberTime,
    pageToLive
  } from "../../assets/js/list"
  import ZjHead from '../../components/pub/NewHead'
  import tagSetting from '../../components/pub/tagSetting'
  import {
    getDwDetails,
  } from '../api/groupApi'

  export default {
    data() {
      return {
        distance: 3,
        showName: "云客智播",
        keyWord: "",
        totalCount: "",
        chooseList: [],
        chooseSecondType: "",
        refresh: false,
        loading: false,
        finished: true,
        userInfo: checkLoginTime(),
        currentInfo: {},
        liveList: [],
        nowTimeNum: new Date().getTime(),
        showSortTag: false,
        modifyTagList: [],
        havePermission: false, //换成false
        tabIndex: 0,
        isShowMore:false,
        moreTagList:{}
      }
    },
    methods: {
      showMore(){
        this.isShowMore = !this.isShowMore
      },
      showAll(){
        this.pageTo('/ZhiBo')
      },
      getTag(val,tagList,unMarkTagList){
        if(val){
          this.chooseList = tagList
          this.showSortTag = false
        }else{
          this.showSortTag = false
        }
        // this.onRefresh();
        console.log(val,tagList,'11112222233333')
      },
      chooseBtn(name) {
        let that = this;
        that.showName = name;
        that.chooseSecondType = name;
        that.onRefresh();
      },
      showLocationAction() {
        let that = this;
      },
      search() {
        let that = this;
        that.onRefresh();
      },
      onRefresh() {
        let that = this;
        that.liveList = [];
        that.liveVideoRoom();
      },
      loadRelease() {
        let that = this;
      },
      current() {
        let that = this;
        current(that.userInfo.access_token, {}, (res) => {
          that.currentInfo = res;
          that.liveVideoRoom();
        })
      },
      liveVideoRoom() {
        let that = this;
        let params = new Object();
        params.team = that.dwId;
        params.name = that.keyWord;
        if (that.chooseSecondType == "全部") {
          params.tag = "";
        } else {
          params.tag = that.chooseSecondType;
        }
        liveVideoRoom(params, (res) => {
          that.liveList = res;
          for (let i = 0; i < that.liveList.length; i++) {
            let startTime = formatNumberTime(that.liveList[i].starttime, "minute", ".");
            let endTime = formatNumberTime(that.liveList[i].endtime, "minute", ".");
            let playTime = startTime + "-" + endTime.substr(11);
            that.liveList[i].playTime = playTime;
          }
          that.totalCount = res.length;
          that.refresh = false;
        })
      },
      goLiveDetail(id) {
        let that = this;
        pageToLive(id);
      },
      getDwTagList() {
        let that = this;
        getDwTagList(that.dwId, (res) => {
          that.modifyTagList = res;
          that.chooseList = that.modifyTagList;
          if(that.chooseSecondType == ''){
            that.chooseSecondType = that.chooseList[0];
          }
          console.log(that.modifyTagList)
          that.current();
        })
      },
      // checkDwManager() {
      //   let that = this;
      //   checkDwManager(that.dwId, (res) => {
      //     console.log(res,'管理员')
      //     this.havePermission = true
      //   })
      // },
      getDwDetails(){
        getDwDetails(this.dwId, (res) => {
          console.log(res,'单位详情')
          console.log(checkLoginTime(),'用户详情')
          if(res.owner == checkLoginTime().id){
             this.havePermission = true
          }
        })
      },
    },
    components: {
      ZjHead: ZjHead,
      tagSetting:tagSetting
    },
    props: {
      dwId: {
        type: String
      }
    },
    watch: {
      tabIndex(val){
        this.chooseBtn(this.chooseList[val])
      }
    },
    activated() {
      let that = this;
      // let chooseList = [{
      //     "classifyName": "全部"
      //   },
      //   {
      //     "classifyName": "普通"
      //   },
      //   {
      //     "classifyName": "亲子"
      //   },
      //   {
      //     "classifyName": "旅游"
      //   },
      //   {
      //     "classifyName": "情侣"
      //   }
      // ];
      // that.chooseList = chooseList;

      that.getDwTagList();
      // that.getMoreTag()
      that.getDwDetails();
    }
  }
</script>

<style scoped="scoped">
  .sl_container {
    background-color: #ebebeb;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .sl_main1 {
    /* padding-top: 100px; */
    padding: 0.2rem;
  }

  .listBlock {
    padding: 10px;
    background-color: white;
    height: 124px;
    margin-bottom: 0.2rem;
    border-radius: 10px;
  }

  .listBlock .leftImgDiv {
    position: relative;
    height: 120px;
    width: 120px;
  }

  .listBlock .leftImgDiv .leftImg {
    height: 120px;
    width: 120px;
    object-fit: cover;
    border-radius: 10px;
  }

  .listBlock .leftImgDiv .playImg {
    position: absolute;
    width: 45%;
    height: 45%;
    top: 25%;
    left: 25%;
  }

  .listBlock .leftImgDiv .liveStatus {
    position: absolute;
    bottom: 3px;
    right: 5px;
    color: white;
  }

  .listBlock .rightDiv {
    padding-left: 10px;
  }

  .listBlock .rightDiv .title {
    font-size: 0.36rem;
    font-weight: bold;
  }

  .listBlock .rightDiv .introduction {
    color: #909090;
    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 22px;
    margin: 3px 0;
    font-size: 0.28rem;
    height: 44px;
  }

  .listBlock .rightDiv .anchor {
    color: #565656;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .listBlock .rightDiv .time {
    color: #565656;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .anchor_text{
    color: #909090;
    font-size: 0.24rem;
  }

  /*隐藏掉滚动条*/
  .slide-box::-webkit-scrollbar {
    display: none;
  }

  .borderbox {
    box-sizing: border-box
  }

  .flip-list-move {
    transition: transform 200ms;
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
    padding: 3px;
  }

  .slide-box {
    display: -webkit-box;
    overflow-x: auto;
    /*适应苹果*/
    -webkit-overflow-scrolling: touch;
  }

  .slide-item {}

  .noLiveMsg {
    top: 1rem;
    position: absolute;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
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
