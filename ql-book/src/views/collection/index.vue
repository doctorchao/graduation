<template>
	<div class="container">
      <div class="content-item">
          <div v-for="(item,index) in books" :key="index">
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
	</div>
</template>

<script>
import moment from 'moment'
import {Toast} from 'mint-ui'
export default {
	name: 'collection',
	components: {
        Toast
	},
  data () {
    return {
		books: [],
    unit:''
    }
  },
  // props:{
  //   dwId:{
  //     type: Number
  //   }
  // },
  props:[
    'dwId'
  ],
  methods: {
    getcollection(){
        this.$axios.get(this.$api.addcollection).then(res =>{
			for(let i = 0; i<res.data.length; i++){
        res.data[i].book.updateTime= moment(res.data[i].book.updateTime).format('YYYY年M月D日')
				this.books.push(res.data[i].book)
			}
        })
    }
  },
  created () {
    this.$emit('give','收藏书单')
    this.getcollection()
    // var dwId = this.$route
    var query = this.$route.query
    console.log(this.dwId,'我是动态路由dwId')
    console.log(query.dwId,'我是查询字符dwId')
    this.unit = query.dwId
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
          font-size: 12px;
          line-height: 1.5;
          color: rgba(122, 130, 136, 0.856);
           /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 3;
          overflow: hidden;
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
</style>
