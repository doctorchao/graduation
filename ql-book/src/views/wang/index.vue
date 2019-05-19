<template>
  <div class="container">
		<div class="publish">
			<div class="wang-wrap">
				<input type="text" placeholder="请输入你想说的话" class="wang-input" 
					@focus="show"  v-show="isshow"/>
				<div id="wang" class="wang" @blur="show" v-show="!isshow" style="min-height: 50px"></div>
			</div>
			<div>
				<Button class="btn" size="small" @click="report">发表</Button>
			</div>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import {Button, Toast} from 'mint-ui'
export default {
  name: 'ql-wang',
  data () {
    return {
      editorContent: '',
      isshow: true
    }
  },
  components: {
		Button,
		Toast
  },
  methods: {
		show () {
			this.isshow = !this.isshow
		},
		report () {
			if (this.editorContent){
				this.$axios.post(this.$api.doComment, {content: this.editorContent}).then( res =>{
					Toast({
						message: '发表成功',
						position:'center',
						duration: 1000
					})
					this.editorContent = ''
					setTimeout(() => {
						this.isshow = true
					},600)
					this.$axios.get()
				})
			} else {
				Toast({
					message: '评论不能为空哦',
					position:'center',
					duration: 1000
				})
			}
		}
  },
  created () {

  },
  mounted (){
    var editor = new E('#wang')
    editor.customConfig.onchange = (html) => {
        this.editorContent = html
    }
    editor.customConfig.menus = [
    ]
    editor.create()
    
  }
}
</script>

<style scoped lang="scss">
@import "@/globalcss/px-to-rem.scss";
.publish{
    display: flex;
    flex-direction:column;
    align-items: flex-end;
}
.content{
    height: 200px;
    width: 300px;
    border: 1px solid #000;
}
.wang-wrap{
    width: 100%;
    overflow: hidden;
    border: 1px solid #000;
    border-radius: 5px;
    height: px-to-rem(200);
    margin-bottom: 15px;
}
.wang-input{
    margin-top: 3px;
    border: none;
    outline: none;
}
.wang{
    border: none;
}
.btn{
    border: none;
    background-color: rgb(240, 240, 240);
    margin-right: 5px;
}
</style>
