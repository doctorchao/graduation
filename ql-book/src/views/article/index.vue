<template>
  <div class="container">
    <div class="content markdown" v-html="html"
      :style="{fontSize: fontSize + 'px'}">
    </div>
    <div class="title-wrap" v-show="isshow" @click="hidetitles">
      <transition name='slide'>
        <ul class="titles" v-show="isactive" @click.stop>
          <li v-for="(item,index) in titles" :key="index" class="title-item" @click="handlejump(item._id)">
            {{item.title}}
          </li>
        </ul>
      </transition>
    </div>
    <div class="btns">
      <i class="iconfont iconhoutui" slot="icon" @click="handlejump('prev')"></i>
      <i class="iconfont iconmulu" slot="icon" @click="showtitles"></i>
      <i class="iconfont iconWord-add" slot="icon" @click="handleadd"></i>
      <i class="iconfont iconWord-minus" slot="icon" @click="handlereduce"></i>
      <i class="iconfont iconqianjin" slot="icon" @click="handlejump('next')"></i>
    </div>
    <div class="toTop" @click="toTop">
      <!-- <a href="#"> -->
        <i class="iconfont icontop" slot="icon"></i>
        <div>
          TOP
        </div>
      <!-- </a> -->
    </div>
  </div>
</template>

<script>
import Showdown from 'showdown'
import {Toast} from 'mint-ui'
export default {
  props: {
    options: Object
  },
  name: 'ql-article',
  data () {
    return {
      article: {},
      html: '',
      fontSize: 40,
      titles: [],
      index: -1,
      isshow: false,
      isactive: false,
      bookId: ''
    }
  },
  components: {
    Toast
  },
  methods: {
    getarticle (itemid) {// 老师的后台数据多了一层article 得要是res.data.article
      return new Promise((reslove) => {
        const id = itemid ? itemid : this.$route.params.id
        this.$axios.get(this.$api.getarticle + id).then(res => {
          // console.log(res)
          const converter = new Showdown.Converter()
          this.html = converter.makeHtml(res.data.content.trim())
          this.article = res.data// 个人接口返回的data是个数组
          this.bookId = res.data.bookId
          // document.title = res.data.titleId.title
          this.$emit('give', res.data.titleId.title)
          // console.log(res)
          this.index = res.data.index
          reslove()
        })
      })
    },
    handle () {
      console.log('我爱豆沙包')
    },
    // 5be2ce07522f254167830e16
    handleadd () {
      if (this.fontSize >= 74) {
        Toast({
          message: '已经是最大啦',
          position: 'center',
          duration: 1000
        })
      } else {
        this.fontSize += 4
      }
    },
    handlereduce () {
      if (this.fontSize <= 28) {
        Toast({
          message: '已经最小啦',
          position: 'center',
          duration: 1000
        })
      } else {
        this.fontSize -= 4
      }
    },
    gettitles () { // 得先拿到文章内容再能拿目录 所以要一个promise
      const id = this.article.bookId
      this.$axios.get(this.$api.gettitle + id).then(res => {
        this.titles = res.data
      })
    },
    handlejump (isprev) { // 传参式调用
      const _this = this
      function getarticleByIndex () {
        const item = _this.titles.find(item => item.index === _this.index)
        const id = item._id
        _this.getarticle(id)
        _this.$router.push({
          name: 'article',
          params: {
            id
          }
        })
      }
      if (isprev === 'prev') {
        if (this.index === 0) {
          Toast({
            message: '到第一章了哦',
            position: 'center',
            duration: 1000
          })
        } else {
          this.index--
          getarticleByIndex()
        }
      } else if (isprev === 'next') {
        if (this.index === this.titles.length - 1) {
          Toast({
            message: '没有更多章节了呢',
            position: 'center',
            duration: 1000
          })
        } else {
          this.index++
          getarticleByIndex()
        }
      } else {
        const itemid = isprev
        console.log(itemid)
        this.getarticle(itemid)
        this.hidetitles()
      }
    },
    showtitles () {
      this.isshow = true
      this.isactive = true
    },
    hidetitles () {
      this.isactive = false
      setTimeout(() => {
        this.isshow = false
      }, 500)
    },
    toTop (){
      document.documentElement.scrollTop = document.body.scrollTop = 0
    }
  },
  created () {
    this.getarticle().then(() => {
      this.gettitles()
    })
  }
}
</script>

<style scoped lang="scss">
@import '@/globalcss/px-to-rem.scss';
.container {
  margin-bottom: px-to-rem(90);
}
.toTop{
  left: px-to-rem(650);
  bottom: px-to-rem(200);
  position: fixed;
  color: rgb(29, 160, 242);
  opacity: 0.6;
  &:active{
    color: rgb(255, 0, 0)
  }
}
.content{
  overflow-x: hidden;
}
.btns {
  padding: px-to-rem(20);
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgb(223, 221, 221);
  .iconfont {
    flex: 1;
    font-size: px-to-rem(50);
    text-align: center;
  }
}
.title-wrap {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,.5);
  .titles {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    color: rgb(83, 81, 81);
    background: white;
    width: 70%;
    height: 100%;
    overflow: auto;
    .title-item {
      padding: 20px;
      border-bottom: 1px solid #eee;
    }
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(-100%,0,0)
  }
  .slide-enter-active, .slide-leave-active{
    transition: transform ease 0.5s
  }
}
</style>

<style lang="scss">
@import './markdown.scss'
</style>
