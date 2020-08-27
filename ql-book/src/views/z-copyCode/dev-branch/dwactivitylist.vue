<template>
  <div class="sl_container shopList" :style="!hideHeadAndTagList?`padding-top: 45px;`:''">
    <div v-if="havePermission" @click="pageTo(`/addactivity/${dwId}`,true)" style="width:1rem;height:1rem;position: fixed;bottom: 100px;right: 30px;z-index: 2;">
      <img src="../../assets/img/pub/pub_ico_tianjia_nor.png" style="width: 100%;">
    </div>
    <template v-if="showData && !hideHeadAndTagList">
      <header class="mui-bar mui-bar-nav">
        <div class="range" id="range1" @click="">
          珠海市
          <img style="width: 10px;position: absolute;top: 21px;" src="../../assets/img/search/pub_laber_topleftw.png">
          <h6>
            <template v-if="distance == '全网'">全网</template>
            <template v-else>{{distance}}km</template>
          </h6>
        </div>
        <div class="distanceProp"></div>
        <input type="text" id="search" v-model="keyWord" placeholder="搜索...">
        <div class="label" id="goSearch" @click="">
          [活动]
        </div>
        <div id="search1" class="back" @click="">搜索</div>
      </header>
    </template>
    <div v-show="showData && !hideHeadAndTagList" :class="{borderbox:havePermission && tagList.length>=2}"
      style="background-color: #fff;position: absolute;top: 44px;z-index: 2;width: 100%;height: 44px;">
      <img v-if="havePermission && tagList.length>=2" @click="showSortTag=true"  src="../../assets/img/pub/pub_shareshop_ico_more.png"
       style="width:20px;height:20px;position: absolute;top: 12px;right: 0px;z-index: 2;">
      <ul class="slide-box">
        <li class="slide-item">
          <van-button :class="{selectedClass:selectedIndex==-1,unselectClass:selectedIndex!=-1}"
            @click="selectedIndex=-1;selectedvalue='';selectActivityList(dwId,'')"  round size="small">全部</van-button>
        </li>
        <template>
          <li class="slide-item"  v-for="(item,index) in tagList" v-if="item"  >
            <van-button :class="{selectedClass:selectedIndex==index,unselectClass:selectedIndex!=index}"
              @click="selectedIndex=index;selectedvalue=item;"  round size="small">{{item}}</van-button>
          </li>
        </template>
        &nbsp;&nbsp;&nbsp;&nbsp;
      </ul>
    </div>
    <GetList ref="load" @getMore="$refs.load.onLoadDone(true)" @refresh="selectActivityList(dwId,selectedvalue)" v-swipeleft="swipeleft" v-swiperight="swiperight">
      <!-- 主体 -->
      <section>
        <div class="sl_shop_list" v-show="showData" style="margin-top: 44px;">
          <div @click="pageTo(`/dwActivityDetails/${item.id}`)" v-for="(item, index) in computed_activityList" :key="index" v-longtap="longtap(item)"
            class="sl_shop_item flex">
            <div class="sl_shop_head">
              <img v-if="item.websites &&  (item.websites.length==0 || (item.websites.length==1 && item.websites[0].name=='vedio'))" src="https://python-server.oss-cn-shenzhen.aliyuncs.com/huodong_top_tu.jpg" />
              <img v-else-if="item.websites && item.websites.length>0 && item.websites[0].name!='vedio' " :src="item.websites[0].url" />
              <img v-else-if="item.websites && item.websites.length>=2 && item.websites[0].name=='vedio'" :src="item.websites[1].url" />
            </div>
            <div class="sl_shop_info flex">
              <div class="sl_shop_name overr">{{item.name}}</div>
              <div class="overr2" style="font-size: 13px;color: GREY;">
                {{item.computedContent}}
              </div>
              <div class="sl_address_distance flex">
                <div class="sl_address">
                  <span v-if="item.activityStatus=='进行中'" style="padding-right: 3px;color:#ff7c12">{{item.activityStatus}}</span>
                  <span v-if="item.activityStatus=='未开始'" style="padding-right: 3px;color:#3298ff">{{item.activityStatus}}</span>
                  <span v-if="item.activityStatus=='已结束'" style="padding-right: 3px;color:#909090">{{item.activityStatus}}</span>
                  <span>{{item.start_time.substr(0,item.start_time.length-3)}}-{{item.end_time.substr(0,item.end_time.length-3)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 100%;height: 30px;line-height: 30px;font-size: 12px;text-align: center;">{{message}}</div>
        <template v-if="checkWxDev()">
          <div style="height: 40px;"></div>
        </template>
      </section>
    </GetList>

    <van-popup v-model="showSortTag" position="bottom" style="height: 100%;">
      <ZjHead left-text="标签排序(长按拖动)" @click-left="showSortTag=false" right-text="保存" @click-right="updateTagListSort()" ></ZjHead>
      <ul>
       <template  v-if="havePermission">
         <transition-group name="flip-list">
          <li class="slide-item" v-for="(item,index) in tagList"  v-if="item"  :key="item"   v-dragging="{item: item, list: tagList}" style="float: left;" >
            <van-button   style="background-color: #E3E3E3;"  round size="small">{{item}}</van-button>
          </li>
         </transition-group>
        </template>
      </ul>
    </van-popup>

    <van-popup v-model="showToppingItem" round style="border-radius: 10px">
      <div style="width: 200px;text-align: center;line-height: 40px;" @click="showToppingItem=false">
        <div v-if="!longtapItem.top" @click="toppingActivity">置顶</div>
        <div v-else  @click="toppingActivity">取消置顶</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import {
    checkLoginTime,
    checkDwManager
  } from '../../assets/js/utils'
  import {
    isNotEmptyStr,
    fuzzySearch,
    formatDate
  } from '../../assets/js/assist'
  import ZjHead from '../../components/pub/NewHead'
  import SearchHead from '../../components/pub/SearchHead'
  import '../../assets/css/search.css'
  import {
    queryShopByMe
  } from '../api/shopApi.js'
  import {
    selectActivityList,getTagListByDwId,updateTagListSort,activBetop
  } from '../api/zhiWuApi.js'
  import {
    getDwDetails,
  } from '../api/groupApi'
  import pro from '../../../config/properties.js'
  import GetList from '../group/GetList'



  export default {
    data() {
      return {
        shops: [],
        keyWord: '',
        refresh: false,
        loading: false,
        finished: false,
        distance: 3,
        message: "",
        activityList: [],
        selectedIndex: -1,
        selectedvalue: '',
        showData: false,
        hideHeadAndTagList: false,
        havePermission: false,
        tagList:[],
        showSortTag:false,
        showToppingItem:false,
        longtapItem:{},
      }
    },
    methods: {
      swipeleft() {
        console.log("swipeleft")
        if (this.selectedIndex<this.tagList.length-1) {
          this.selectedIndex = this.selectedIndex+1
        }
      },
      swiperight() {
        console.log("swiperight")
        if (this.selectedIndex!=-1) {
          this.selectedIndex = this.selectedIndex-1
        }
      },
      toppingActivity(){
        //z社区管理员调用置顶活动接口
        activBetop(this.longtapItem.id,(res)=>{
          if(res){
            if(!this.longtapItem.top){
              this.$toast("置顶成功")
            }else{
              this.$toast("取消置顶")
            }
          }
        })
      },
      longtap(item){
        let callbackFunc=()=>{
          if(this.havePermission){
            this.longtapItem = item
            this.showToppingItem = true
          }
        }
        return callbackFunc
      },
      getDwDetails(dwId){
        getDwDetails(dwId, (res) => {
          if(res.owner == checkLoginTime().id){
             this.havePermission = true
          }
        })
      },
      search() {

      },
      selectActivityList(dwId,selectedvalue) {
        const loading = this.$toast.loading({
          mask: true,
          duration: 3000
        })
        selectActivityList({
          team: dwId,
          roleid: checkLoginTime().role_id,
          tag:selectedvalue
        }, (res) => {
          this.activityList = res
          // if(res.length==0 && this.tagList.length>this.selectedIndex+1){
          //   this.selectedIndex=this.selectedIndex+1;
          //   this.selectedvalue=this.tagList[this.selectedIndex];
          //   return
          // }
          this.showData = true
          loading.clear()
          for (let i = 0; i < this.activityList.length; i++) {
            let time = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
            let time2 = this.activityList[i].start_time
            let time3 = this.activityList[i].end_time
            if (time < time2) {
              this.activityList[i].activityStatus = '未开始'
            } else if (time2 <= time && time <= time3) {
              this.activityList[i].activityStatus = '进行中'
            } else if (time > time3) {
              this.activityList[i].activityStatus = '已结束'
            } else {
              this.activityList[i].activityStatus = ''
            }
            if(this.activityList[i].catagary=='业务活动'){
              // let str = this.activityList[i].content.replace(/&nbsp;/g,'').replace(/<br\/>/g,'').replace(/<br>/g,'')
              this.$set(this.activityList[i],"computedContent",'')
            }else{
              this.$set(this.activityList[i],"computedContent",'')
            }
          }
          if (res.length == 0) {
            this.message = "没有可参与的内容";
          }else{
            this.message = "";
          }
        })
        setTimeout(() => {
          this.$refs.load.onRefreshDone()
        }, 300)
      },
      checkDwManager(dwId) {
        checkDwManager(dwId, () => {
          this.havePermission = true
        })
      },
      getTagListByDwId(dwId){
        getTagListByDwId(dwId,(res)=>{
          console.log(res,'777888')
          this.tagList = res
          if (this.$route.query.tag) {
            if (this.isWxdev) {
              document.title = "业务活动-" + this.$route.query.tag
              this.hideHeadAndTagList = true
            }
          }
          if(this.tagList.length>0){
            let flag = false
            for (let i = 0; i < this.tagList.length; i++) {
              if(this.tagList[i]==this.$route.query.tag){
                this.selectedvalue = this.tagList[i]
                this.selectedIndex = i
                flag = true
                this.selectActivityList(this.dwId,this.tagList[i])
              }
            }
            if(!flag){
              // this.selectActivityList(this.dwId,this.tagList[0])
              this.selectActivityList(this.dwId)
            }
          }else{
            this.selectActivityList(this.dwId)
          }
        })
      },
      updateTagListSort(){
        console.log(this.tagList.join(','))
        debugger
        updateTagListSort({
            team_id:this.dwId,
            sort_type:'2',
            userTagList:this.tagList.join(',')
          },(res)=>{
            this.$toast("保存成功")
            this.showSortTag=false;
          })
      }
    },
    mounted () {
        this.$dragging.$on('dragend', (item) => {
        })
        this.$dragging.$on('draged', (item) => {
        })
    },
    watch:{
      selectedvalue(nv){
        this.selectActivityList(this.dwId,nv)
      }
    },
    activated() {
      let that = this;
      Object.assign(that.$data, that.$options.data())
      that.getTagListByDwId(this.dwId)
      // that.selectActivityList(this.dwId)
      that.checkDwManager(this.dwId)
      that.getDwDetails(this.dwId)
    },
    computed: {
      computed_activityList() {
        let array = []
        if (this.selectedIndex != -1) {
          array = this.activityList.filter((item) => {
            return item.userTagList.indexOf(this.tagList[this.selectedIndex]) != -1
          })
        }else{
          array = this.activityList
        }
        if (this.keyWord) {
          array = array.filter((item) => {
            return item.name.indexOf(this.keyWord) != -1
          })
        }
        return array
      },
    },
    components: {
      ZjHead: ZjHead,
      SearchHead: SearchHead,
      GetList: GetList,
    },
    props: {
      dwId: {
        type: String,
        default: ''
      }
    },
    beforeRouteLeave(to, from, next) {
      document.title = "用分享，传递爱心与正能量…"
      next()
    },
  }
</script>

<style scoped>
  .sl_main {
    padding-top: 90px;
  }

  .sl_main1 {
    padding-top: 100px;
  }

  .sl_container {
    background-color: #ebebeb;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .sl_shop_item {
    background-color: #fff;
    align-items: stretch;
    border-bottom: 1px solid #ebebeb;
  }

  .sl_shop_head {
    width: 1.65rem;
    height: 1.65rem;
    overflow: hidden;
    margin-right: 0.1rem;
    flex-shrink: 0;
    padding: 10px;
  }

  .sl_shop_head img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .sl_shop_info {
    flex-grow: 1;
    flex-flow: column wrap;
    justify-content: space-around;
    padding-right: 0.15rem;
    width: 66%;
  }

  .sl_shop_name {
    font-size: 0.3rem;
  }

  .sl_credit_time {
    font-size: 0.24rem;
    color: #909090;
    justify-content: space-between;
  }

  .sl_address_distance {
    font-size: 0.24rem;
    color: #909090;
    justify-content: space-between;
    align-items: center;
  }

  .sl_address_distance img {
    width: 0.2rem;
    height: 0.2rem;
  }

  .sl_address {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 6.5rem;
  }

  .sl_distance {
    flex-shrink: 0;
  }

  .topZero {
    top: 0;
  }

  .topTen {
    padding-top: 16px;
  }

  .overr {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .overr2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
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
  .borderbox{
    padding-right: 35px;
    box-sizing: border-box;
  }
  .flip-list-move {
    transition: transform 200ms;
  }
  .selectedClass{
    background-color: #3298FF;color: #fff;
  }
  .unselectClass{
    background-color: #E3E3E3;
  }
</style>
