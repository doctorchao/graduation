<template>
	<div class="header">
		<Header class="header-back" fixed :title="this.doctitle">
			<router-link to="" slot="left">
				<Button @click="$router.back()">
					<i class="iconfont iconBackwardarrowsmall"></i>
					<span class="back-word">返回</span>
				</Button>
			</router-link>
		</Header>
	</div>
</template>

<script>
import {Header, Button} from 'mint-ui'
export default {
	props: {
		doctitle: String
	},
	name:'index',
	components: {
		Header,
		Button
	},
}
</script>

<style scoped lang='scss'>
@import '@/globalcss/px-to-rem.scss';
.header {
	margin-bottom: px-to-rem(100);
	.header-back {
		background-color: rgb(90, 88, 88);
		// color: rgb(38, 148, 238);
		color: #656b79;
		// box-shadow: 0px 5px 0px #3298ff;
		i {
			font-size: 20px;
			// color: rgb(38, 148, 238)
		}
	}
	.back-word {
		font-size: 16px
	}
}
</style>
