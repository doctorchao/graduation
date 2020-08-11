<template>
  <div>
    <!-- 搜索框 -->
    <!-- <van-search class="search" v-model="value" shape="round" background="#ebebeb" placeholder="请输入搜索关键词" show-action>
      <template #action>
        <img src="../../assets/scan.png" alt="" class="img-scan" @click="onSearch">
      </template>
      <template #right-icon >
        <span @click="onSearch">搜索</span>
      </template>
    </van-search> -->
    <!-- 不同数据分别渲染 -->
    <!-- <div class="box">
      <div  class="span" v-for="(item, index) in arr" :key="index" @click="item.lock?onSearch('1'):onSearch('2')" >
        <h1 v-if="item.lock">{{item.age}}</h1>
        <h3 v-else> {{item.age}}</h3>
      </div>
    </div> -->
    <!-- 树形选择器picker -->
    <!-- <van-tree-select class='abc'
      :items="items"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
    ></van-tree-select> -->
    <div class="container-wrap">
      <div class="search-wrap">
        <div class="left-wrap">
          <div class="input-wrap">
            <img class="search-img" src="../../assets/search.png" alt="">
            <!-- <form action=""> -->
              <input class="find" type="search" placeholder="搜索..." v-model="searchWord"/>
            <!-- </form>  -->
          </div>
          <div class="search-text-wrap">
            <span class="search-text" size="small">搜索</span>
          </div>
        </div>
        <div class="scan-wrap" @click="isShow? '': word = '456'">
          <img class="scan-img" src="../../assets/scan.png" alt="">
          <!-- <div class="redbox"></div> -->
        </div>
      </div>
    </div>
    <div>{{word}}</div>
    <!-- <van-nav-bar title="标题"
    left-text="返回"
    right-text="按钮"
    :left-arrow= isShow
    @click-left="onClickLeft"
    @click-right="onClickRight" v-if="word&&isShow"/> -->
    <!-- <div class="box"></div>
    <div class="box2"></div> -->
    
    <img src="https://wx4.sinaimg.cn/large/59853be1ly1gekzwmpj9wj20f408i11j.jpg" alt="" class="img-wrap" @click="stop1">
    <video src="../../assets/VID_20191215_210202.mp4" controls="controls" class="img-wrap"></video>
    <div>{{word}}</div>
    <div class="box3"></div>
    <!-- <van-nav-bar :left-text="isHide?'返回':''" :left-arrow = isHide  
    @click-left="isHide?onClickLeft():''" style="background-color: #dbdbdb;" /> -->
    
  </div>

</template>

<script>
import {Tab, Tabs, Search,TreeSelect,NavBar } from 'vant'
import 'vant/lib/index.css'
export default {
	name: 'like',
	components: {
    "van-tab": Tab,
    "van-tabs": Tabs,
    "van-search": Search,
    "van-tree-select": TreeSelect,
    "van-nav-bar": NavBar
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
    isShow: true,
    word: '',
    isHide: false
    }
  },
  methods: {
    onSearch(val){
      console.log(val)
    },
    onClickLeft(){
      console.log('往左')
    },
    onClickRight(){
      console.log('往右')
    },
    stop1(){
      console.log('点击了')
      var video = document.getElementsByClassName('img-wrap')
      console.log(video[1])
      if(video[1].paused){
        video[1].play()
      }else {
        video[1].pause()
      }
    }
  },
  created () {
    
  }
}
</script>

<style scoped lang='scss'>
  // .span{
  //   color: red;
  // }
  // .img-scan{
  //   width: 24px;
  //   height: 24px;
  //   margin: 0 10px
  // }
  // .search{
  //   margin: 0;
  //   padding: 5px;
  // }
  .container-wrap{
    position: fixed;
    width: 100%;
  }
  .search-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    // margin: 15px 0px;
    // background-color: #ebebeb;
    padding: 6px 0;
    // opacity: 0.5;
    background: rgba($color: #ebebeb, $alpha: 0.5);
    
  }

  .box3{
    height: 1200px;
    width: 100%;
    background-color: #9af038;
  }
  .img-wrap{
    height: 300px;
    width: 100%;
    transform: translateY(1px);
  }
  .left-wrap{
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-radius: 15px;
    margin-left: 18px;
    flex-grow: 1;
    align-items: center;
    font-size: 16px;
  }
  .input-wrap{
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 2px;
    
  }
  .search-img{
    margin-left: 8px;
    height: 22px;
    width: 22px;
  }
  
  .find{
    border: none;
    width: 100%;
    height: 30px;
    outline: none;
    // margin-right: 15px;
    
  }
  .search-text-wrap{
    margin-right: 15px;
    white-space: nowrap;
  }
  .scan-img{
    height: 22px;
    width: 22px;
    vertical-align: bottom;
  }
  .scan-wrap{
    margin: 0 15px;
    position: relative;
  }
  .redbox{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #f02222;
    top: 0;
    right: 0;
  }
  .find::-webkit-search-cancel-button{
    display: none;
  }
</style>
