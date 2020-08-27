<template>
  <div class="box">
      <!-- <div v-if="computed_activityList[0]"></div>
      <div v-else style="margin: 50px auto;width: 300px;text-align: center;">
        您暂未关注任何活动，快去关注吧
      </div> -->
      <van-cell title="单元格" is-link center>
        <template #title>
          <span class="custom-title">周青蓉</span>
        </template>
        <template #right-icon>
          <span class="custom-title">包子</span>
          <span class="custom-title">包子</span>
          <img src="../../assets/qianjin.png" alt="">
        </template>
      </van-cell>
      <!-- <div class="item" @click="goWishTree" data-url=""> 
          <div class="left"> 
            <img src="https://python-server.oss-cn-shenzhen.aliyuncs.com/function_ico_wishtree.png" class="img-left">
            <div class="span-wrap"> 
              <span>许愿树</span> 
            </div> 
          </div> 
          <div class="right"> 
            <img src="../../assets/img/miniProgramMe/qianjin.png" class="img-right">
          </div> 
      </div> -->
      <img class="backImg" v-if="groupInfo.dwZuBackImg" :src="groupInfo.dwZuBackImg" />
    <div class="sl_container" id="scrollDiv">
      <div class="topDiv">
        <van-nav-bar :left-text="groupInfo.dwZuName" v-if="showNavBar" left-arrow @click-left="pageBack()" style="background-color: #3297FF;">
          <div slot="right">
            <img src="../../assets/img/pub/pub_ico_soubai.png" class="rightSearchIcon" @click="pageTo('/communityList')" />
            <img src="../../assets/img/pub/pub_ico_more_white.png" class="rightHeadIcon" @click="headBtnFlag = true" />
          </div>
        </van-nav-bar>

        <marquee direction="left" class="stripe" scrollamount="2">
          <span class="residentNum">居民{{numMap.residentNum}}</span>
          <span class="fansNum">粉丝{{numMap.fansNum}}</span>
          <span class="touristNum">游客{{numMap.touristNum}}</span>
          <span>
            z社区公告：
            <template v-if="groupInfo.dwZuNotice">
              {{groupInfo.dwZuNotice}}
            </template>
            <template v-else>
              欢迎大家来到{{groupInfo.dwZuName}}
            </template>
          </span>
        </marquee>

        <!-- 跳转的图片列表  :orgId="orgInfo.id"-->
        <commonModules :orgId="orgInfo.id" :groupId="groupInfo.id" :friendFlag="friendFlag? true : false" @friendFunction="friendFunction" />
      </div>
  </div>
  
</template>

<script>
import {Tab, Tabs, Search,TreeSelect,Cell } from 'vant'
import 'vant/lib/index.css'
export default {
	name: 'like',
	components: {
    "van-tab": Tab,
    "van-tabs": Tabs,
    "van-search": Search,
    "van-tree-select": TreeSelect,
    "van-cell": Cell
	},
  data () {
    return {
    //   arr: [
    //     {
    //       age: 10,
    //       sex: 1,
    //       lock: true,
          
    //     },
    //     {
    //       age: 20,
    //       sex: 0,
    //       lock: false
    //     },
    //     {
    //       age: 30,
    //       sex: 1,
    //       lock: true
    //     }
    //   ],
    //   value: '',
    searchWord:'',
    isShow: false
    }
  },
  methods: {
    onSearch(val){
      console.log(val)
    },
    goWishTree() {
        window.location.href = 'https://api.zhijiashare.com/wxapi/WXAuthorization?returnUrl=http://zjfx.vip/wishtree/index.html?treeId=2c92e53e6f882efb016fc6036af3069d'
      },
  },
  mounted () {
    console.log('haha')
    document.title = '资讯'
    setTimeout(() => {
      window.open(this.$route.params.url);
    }, 1000);
    
  }
}
</script>

<style scoped lang='scss'>
    .search-img{
    margin-left: 8px;
    height: 20px;
    width: 20px;
    }
    .box img{
      width: 20px;
      height: 20px;
    }
</style>
