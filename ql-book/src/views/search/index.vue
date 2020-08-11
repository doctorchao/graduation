<template>
	<div class="container">
			<div class="content-item" v-if="result">
				<div v-for="(item,index) in findList" :key="index">
					<router-link :to="{name: 'details',params: {id: item._id}}" class="conten-item-row2">
						<div class="img-wrap">
							<img :src="item.img" :alt="item.img">
						</div>
						<div class="article">
							<div class="article-title">
								{{item.title}}
							</div>
							<div class="article-preview">
								{{item.desc}}
							</div>
							<div class="article-msg">
								<div class="author">
									{{item.author}}
								</div>
								<div class="date">
									{{item.updateTime}}
								</div>
								<div class="looknums">
									{{item.looknums}}喜欢看
								</div>
							</div>
						</div>
					</router-link>
				</div>
			</div>
      <div class="noresult" v-else>
        <div>暂时没有您要找的书籍哦</div>
        <i class="iconfont iconicon-test-copy"></i>
      </div>
	</div>
</template>

<script>
import moment from 'moment'
import {Toast} from 'mint-ui'
export default {
	name: 'ql-content-item',
	components: {
    Toast
	},
  data () {
    return {
			books: [],
			result: true
      // allLoaded: false
    }
  },
  methods: {
    getmuchbooks () {
      this.$emit('give','搜索结果')
      const {title} = this.$route.params
      console.log(title, 'title')
      // this.$store.dispatch('findBook',title)
      this.$axios.post(this.$api.findBook,{
        titlemsg: title
      }).then(res => {
        let resData = res.data
        if (resData.length == 0){
          this.result = false
        }
        resData = resData.map(it => {
							it.updateTime = moment(it.updateTime).format('YYYY年MM月DD日')
							return it
						})
        this.books = [...this.books,...resData]
        this.$store.state.findList = this.books
      })
		}
  },
  created () {
    this.getmuchbooks()
  },
  computed: {
    findList () {
      return this.$store.state.findList
    }
  }
}
</script>

<style scoped lang='scss'>
  @import '@/globalcss/px-to-rem.scss';
  .content-item {
    // margin-top: 15px;
    .content-item-row1 {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-left: 4px solid #000;
      padding: 4px 0px 4px 10px; // 上 右 下 左
    }
    .conten-item-row2 {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .img-wrap {
        width: px-to-rem(200);
        height: px-to-rem(260);
      }
      .article {
        position: relative;
        margin-left: 10px;
        flex: 1;
        .article-title {
          color: rgb(85, 83, 83);
          font-size: 15px;
          font-weight: 500;
        }
        .article-preview {
          margin-top: 10px;
          display: -webkit-box;
           /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 3;
          overflow: hidden;
          font-size: 12px;
          line-height: 1.5;
          color: rgba(122, 130, 136, 0.856)
        }
        .article-msg {
          position: absolute;
          display: flex;
          justify-content: space-between;
          bottom: 0;
          left: 0;
          right: 0;
          font-size: 12px;
          color: skyblue
        }
      }
    }
  }
  .noresult {
    margin-top: 100px;
    text-align: center;
    font-size: 20px;
    color: skyblue;
    .iconicon-test-copy{
      font-size: 100px;
    }
  }
</style>
