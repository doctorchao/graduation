<template>
<div class="container">
	<div class="box" @mouseenter="change"></div>
</div>
</template>

<script>
export default {
	name:'index',
	data () {
		return {
			width: 0
		}
	},
	methods: {
		change () {
			console.log('点击了')
		}
	}
}
</script>

<style scoped lang='scss'>
@import '@/globalcss/px-to-rem.scss';
  .box{
    width: 200px;
    height: 200px;
    background-color: rgb(223, 147, 147);
  }
</style>
