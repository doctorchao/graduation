<template>
	<div class="container">
    <p>吴芊盈世界第一好看</p>
    <Test @click="move"></Test>
	</div>
</template>

<script>
import moment from 'moment'
import {Toast} from 'mint-ui'
import Test from '@/components/test1'
export default {
	name: 'like',
	components: {
    Toast,
    Test
	},
  data () {
    return {
		books: []
    }
  },
  methods: {
    getcollection(){
        this.$axios.get(this.$api.addcollection).then(res =>{
			for(let i = 0; i<res.data.length; i++){
        res.data[i].book.updateTime= moment(res.data[i].book.updateTime).format('YYYY年M月D日')
				this.books.push(res.data[i].book)
			}
        })
    },
    move() {
      console.log('滑动了')
    }
  },
  created () {
    this.$emit('give','喜欢的书')
    this.getcollection()
  }
}
</script>

<style scoped lang='scss'>
  @import '@/globalcss/px-to-rem.scss';

</style>
