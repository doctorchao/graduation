<template>
  <div class="person">
    <div class="top-box">
      <div class="login-box" v-if="!usermsg.user" @click="jumplogin">
        <div class="login-box-left">
          <h2>点击登录</h2>
          <div class="login-desc">摘星揽月会有时，我辈岂是蓬蒿人</div>
        </div>
        <div class="login-box-right">
          <img :src="ningque" alt="">
          <i class="iconfont iconqianjin"></i>
        </div>
      </div>                      <!-- login-box-end-->
      <div class="online-box" v-else>
        <div class="online-img">
          <img :src="usermsg.user.avatar||ningque" alt="">
        </div>
        <div class="online-msg">
          <h2>{{usermsg.user.username||usermsg.user.phone||'青兰'}}</h2>
          <div class="online-msg-desc">
            {{usermsg.user.desc||'我爱的人呐,你是否还在天涯'}}
          </div>
        </div>
      </div>    <!-- online-box-end-->
      <div class="readdata-box">
        <div class="readdata-finished">
          <div class="readdata-finished-num">
            {{usermsg.read||0}} 本
          </div>
          <div class="readdata-finished-msg">已读书籍</div>
        </div>
        <div class="line"></div>
        <div class="readdata-collection">
          <div class="readdata-collection-num">
            {{usermsg.collection||0}} 本
          </div>
          <div class="readdata-collection-msg">收藏书籍</div>
        </div>
        <div class="line"></div>
        <div class="readdata-like">
          <div class="readdata-like-num">
            {{usermsg.like||0}} 本
          </div>
          <div class="readdata-like-msg">喜欢</div>
        </div>
      </div>    <!-- readdata-box-end-->
    </div>
    <div class="middle-line"></div>
    <div class="tabs-box">
      <ul class="tabs-items">
        <li class="tabs-item" @click="changemsg">
          <div class="tabs-revise">
            <i class="iconfont iconxiugai"></i>
            修改个人信息
          </div>
          <i class="iconfont iconqianjin"></i>
        </li>
        <li @click="getCol">
          <div class="tabs-collection">
            <i class="iconfont iconshoucang"></i>
            收藏书单
          </div>
          <i class="iconfont iconqianjin"></i>
        </li>
        <li @click="getLike">
          <div class="tabs-like">
            <i class="iconfont iconaihao-"></i>
            喜欢的书
          </div>
          <i class="iconfont iconqianjin"></i>
        </li>
        <li @click="getTest('/useCell')">
          <div class="tabs-like">
            <i class="iconfont iconaihao-"></i>
            测试单元1
          </div>
          <i class="iconfont iconqianjin"></i>
        </li>
        <li @click="getTest('/serviceSetting')">
          <div class="tabs-like">
            <i class="iconfont iconaihao-"></i>
            测试单元2
          </div>
          <i class="iconfont iconqianjin"></i>
        </li>
        <li @click="getTest('/dateAndPrice')">
          <div class="tabs-like">
            <i class="iconfont iconaihao-"></i>
            测试单元3
          </div>
          <i class="iconfont iconqianjin"></i>
        </li>
        <li @click="getTest('/seatSetting')">
          <div class="tabs-like">
            <i class="iconfont iconaihao-"></i>
            测试单元4
          </div>
          <i class="iconfont iconqianjin"></i>
        </li>
        <li @click="getTest('/buyGoods')">
          <div class="tabs-like">
            <i class="iconfont iconaihao-"></i>
            测试单元5
          </div>
          <i class="iconfont iconqianjin"></i>
        </li>
        <li @click="getTest('/orderDetail')">
          <div class="tabs-like">
            <i class="iconfont iconaihao-"></i>
            测试单元6
          </div>
          <i class="iconfont iconqianjin"></i>
        </li>
        <li @click="getTest('/tiketsList')">
          <div class="tabs-like">
            <i class="iconfont iconaihao-"></i>
            测试单元7
          </div>
          <i class="iconfont iconqianjin"></i>
        </li>
        <li @click="getTest('/shopOrder')">
          <div class="tabs-like">
            <i class="iconfont iconaihao-"></i>
            测试单元8
          </div>
          <i class="iconfont iconqianjin"></i>
        </li>
      </ul>
    </div>  <!-- tabs-box-end-->
    <div class="loginout" v-if="usermsg.user">
      <Button type="danger" size="large" class="btn-loginout" @click="handleloginout">退出登录</Button>
    </div>
  </div>
</template>

<script>
import ningque from '@/assets/head.jpg'
import {Button} from 'mint-ui'
export default {
  name:'ql-person',
  components:{
    Button
  },
  data () {
    return {
      // usermsg: {},
      ningque,
    }
  },
  methods: {
    jumplogin () {
      this.$router.push({
        name: 'login'
      })
    },
    handleloginout () {
      localStorage.clear()
      this.$store.state.usermsg = {}
      // this.$store.commit('CHANGE_USER_MSG', {})
    },
    changemsg () {
      var url = 'https://wx.zhijiashare.com/#/personcard'
      this.$router.push({
        name:'note',
        params:{
          url:url
        }
      })
    },
    getCol (){
      this.$router.push('/collection?dwId="云课"')
    },
    getLike (){
      this.$router.push('/like/123?dwId=12345')
    },
    getTest (val){
      this.$router.push(val)
    }
  },
  created () {
    document.title = '个人中心'
    let token = localStorage.getItem('token')
    if(token) {
      this.$store.dispatch('getusermsg')
    }
  },
  computed: {
    usermsg () {
      return this.$store.state.usermsg
    }
  }
}
</script>

<style scoped lang='scss'>
@import './person.scss'
</style>

