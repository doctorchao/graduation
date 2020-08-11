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
