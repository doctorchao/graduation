<template>
  <div class="container">
	<div class="publish">
		<div class="input-wrap">
			<textarea  placeholder="输入你想说的话" class="text-input" v-model="editorContent"></textarea>
		</div>
		<div>
			<Button class="btn" size="small" @click="report">回复</Button>
		</div>
	</div>
	<div class="comment">
		<div class="comment-head">
			<div class="img">
				<img :src="comment.user.avatar||ningque" alt="">
				<div class="user">
					<div class="name">{{comment.user.username}}</div>
					<div class="desc">
						{{comment.user.desc || '在街角的咖啡店终会遇见你'}}
					</div>
				</div>
			</div>
		</div>
		<div class="comment-body">
			{{comment.content}}
		</div>
		<div class="foot-comment">
			<div>发表于</div>
			<div class="time">{{comment.createTime}}</div>
			<div class="reply">
				回复数 {{comment.returns.length}}
			</div>
		</div>
	</div>
	<div class="return-word">以下为回复内容</div>
	<div class="mid-line"></div>
	<div class="return-wrap" v-for="(item, index) in returns" :key="index">
		<div class="comment-head-return">
			<div class="img">
				<img :src="item.user.avatar||ningque" alt="">
				<div class="user">
					<div class="name">{{item.user.username}}</div>
					<div class="desc">
						{{item.user.desc || "在街角的咖啡店终会遇见你"}}
					</div>
				</div>
			</div>
		</div>
		<div class="comment-body">
			{{item.content}}
		</div>
		<div class="foot-comment-return">
			<div>回复于</div>
			<div class="time">{{item.createTime}}</div>
			<div class="reply"></div>
		</div>
	</div>
	
  </div>
</template>

<script>
import {Button, Toast} from 'mint-ui'
import ningque from '@/assets/head.jpg'
import moment from 'moment'
export default {
	name: 'ql-return',
	inject: ['reload'],
  data () {
    return {
      editorContent: '',
	//   isshow: true,
	  returns: [],
	  comment: {}
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
		getReturn(){
			const id = this.$route.params.id
			console.log(id, '评论的id')
			this.$axios.post(this.$api.getReturn,{
				id
			}).then( res =>{
				console.log(res)
				let resData = res.data
				resData = resData.map(item =>{
					item.createTime = moment(item.createTime).format('YYYY.M.D H:mm')
					return item
				})
				this.returns = resData
				res.comment.createTime = moment(res.comment.createTime).format('YYYY.M.D H:mm')
				this.comment = res.comment
			})
		},
		report () {
			if (this.editorContent){
				const id = this.$route.params.id
				console.log(id, '评论id')
				console.log(this.editorContent, '回复')
				this.$axios.post(this.$api.doReturn, {
					content: this.editorContent,
					id: this.$route.params.id
					}).then( res =>{
					Toast({
						message: '回复成功',
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
					message: '回复不能为空哦',
					position:'center',
					duration: 1000
				})
			}
		},
  },
  created () {
	this.getReturn()
	this.$emit('give','评论详情')
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
