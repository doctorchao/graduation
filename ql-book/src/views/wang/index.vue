<template>
  <div class="container">
	<div class="publish">
		<div class="input-wrap">
			<textarea  placeholder="输入你想说的话" class="text-input" v-model="editorContent"></textarea>
		</div>
		<div>
			<Button class="btn" size="small" @click="report">发表</Button>
		</div>
	</div>
	<div class="comment" v-for="(item, index) in comment" :key="index">
		<div class="comment-head">
			<div class="img">
				<img :src="item.user.avatar||ningque" alt="">
				<div class="user">
					<div class="name">{{item.user.username}}</div>
					<div class="desc">
						{{item.user.desc || '在街角的咖啡店终会遇见你'}}
					</div>
				</div>
			</div>
			
		</div>
		<router-link :to="{name: 'return', params: {id: item._id}}">
			<div class="comment-body">
				{{item.content}}
			</div>
		</router-link>
		<div class="foot-comment">
			<div>发表于</div>
			<div class="time">{{item.createTime}}</div>
			<div class="reply">
				回复数 {{item.returns.length}}
			</div>
		</div>
		
	</div>
  </div>
</template>

<script>
import {Button, Toast} from 'mint-ui'
import ningque from '@/assets/head.jpg'
import moment from 'moment'
export default {
	name: 'ql-wang',
	inject: ['reload'],
  data () {
    return {
      editorContent: '',
			// isshow: true,
			comment: []
    }
  },
  components: {
		Button,
		Toast
  },
  methods: {
	// show () {
	// 	this.isshow = !this.isshow
	// },
		getcomment(){
			const bookId = this.$route.params.id
			console.log(bookId, '书的id')
			this.$axios.post(this.$api.getComment, {
				id: bookId
			}).then( res =>{
				console.log(res)
				let resData = res.data
				// for(let i = 0; i<resData.length; i++){
				// 	resData[i].createTime = moment(resData.createTime).format('YYYY.M.D H:mm')
				// }
				resData = resData.map(item =>{
					item.createTime = moment(item.createTime).format('YYYY.M.D H:mm')
					return item
				})
        this.comment = resData

			})
		},
		report () {
			if (this.editorContent){
				const id = this.$route.params.id
				console.log(id, '书id')
				console.log(this.editorContent, '评论')
				this.$axios.post(this.$api.doComment, {
					content: this.editorContent,
					id: this.$route.params.id
					}).then( res =>{
					Toast({
						message: res.msg,
						position:'center',
						duration: 1000
					})
					this.reload()
					// this.editorContent = ''
					// setTimeout(() => {
					// 	this.isshow = true
					// },600)
					// this.$axios.get()
				})
			} else {
				Toast({
					message: '评论不能为空哦',
					position:'center',
					duration: 1000
				})
			}
		},
		return(){

		}
  },
  created () {
		this.getcomment()
		this.$emit('give','评论区')
  },
  // mounted (){
  //   var editor = new E('#wang')
  //   editor.customConfig.onchange = (html) => {
  //       this.editorContent = html
  //   }
  //   editor.customConfig.menus = [
  //   ]
  //   editor.create()
    
  // }
}
</script>

<style scoped lang="scss">
@import './index.scss'
</style>
