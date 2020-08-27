<template>
  <div class="sl_container">
    <header class="mui-bar mui-bar-nav">
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
    </header>

    <template v-if="chooseList.length > 0">
      <div class="largeLabel1" style>
        <!-- <img v-if="havePermission && modifyTagList.length>=2" @click="showSortTag=true"  src="../../assets/img/pub/pub_shareshop_ico_more.png" style="width:20px;height:20px;position: absolute;top: 12px;right: 0px;z-index: 2;"> -->
        <!-- <div style="width: 3000px;">
          <div v-for="(choose1, index) in chooseList" :key="index">
            <div v-if="choose1 == chooseSecondType" class="labela1" @click="chooseBtn(choose1)"
              style="background-color: #3298FF;color: white;">{{choose1}}</div>
            <div v-else>
              <div class="labela1" @click="chooseBtn(choose1)">{{choose1}}</div>
            </div>
          </div>
        </div> -->
        <ul class="slide-box">
          <template>
            <li class="slide-item" v-for="(item,index) in chooseList" :key="index">
              <van-button :class="item == chooseSecondType ? 'select_btn':''" style="background-color: #E3E3E3;"
                @click="chooseBtn(item)" round size="small">{{item}}</van-button>
            </li>
          </template>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </ul>
      </div>
    </template>

    <div class="count_num count_num1">
      <template v-if="distance == '全网'">全网</template>
      <template v-else>{{distance}}km</template>
      范围内搜索结果共有
      <template v-if="totalCount == ''">0</template>
      <template v-else>{{totalCount}}</template>
      个目标
    </div>

    <!-- 列表 -->
    <section class="sl_main1">
      <van-pull-refresh v-model="refresh" @refresh="onRefresh">
        <!-- <van-list @load="loadRelease" v-model="loading" :finished="finished"> -->
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
                <div class="anchor">直播人：{{detail.ownername}}</div>
                <div class="time">直播时间:{{detail.playTime}}</div>
              </div>
            </van-col>
          </van-row>
        </div>
        <!-- </van-list> -->
        <div class="noLiveMsg" v-if="liveList.length == 0">没有更多了</div>
      </van-pull-refresh>
    </section>

    <!-- 滑动标签 -->
    <van-popup v-model="showSortTag" position="bottom" style="height: 100%;">
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
    </van-popup>
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
    liveTagByTeam
  } from "../api/zhiLiveApi"
  import {
    formatNumberTime,
    pageToLive
  } from "../../assets/js/list"
  import ZjHead from '../../components/pub/NewHead'

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
        havePermission: false //换成false
      }
    },
    methods: {
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
      liveTagByTeam() {
        let that = this;
        liveTagByTeam(that.dwId, (res) => {
          that.modifyTagList = res;
          that.chooseList = that.modifyTagList;
          that.chooseSecondType = that.chooseList[0];
          console.log(that.modifyTagList)
          that.current();
        })
      },
      updateTagListSort() {
        let that = this;
        console.log(that.modifyTagList);
        console.log(that.modifyTagList.join(","));
      },
      // checkDwManager() {
      //   let that = this;
      //   checkDwManager(that.dwId, () => {
      //     this.havePermission = true
      //   })
      // },
    },
    components: {
      ZjHead: ZjHead
    },
    props: {
      dwId: {
        type: String
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

      that.liveTagByTeam();
      // that.checkDwManager();
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
    padding-top: 100px;
  }

  .listBlock {
    padding: 10px;
    background-color: white;
    height: 124px;
    margin-bottom: 10px;
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
  }

  .listBlock .leftImgDiv .playImg {
    position: absolute;
    width: 50%;
    height: 50%;
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
    font-size: 21px;
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
    font-size: 17px;
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
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
  }
  .select_btn{
    background-color: #3298FF!important;
    color: #fff;
  }
</style>
