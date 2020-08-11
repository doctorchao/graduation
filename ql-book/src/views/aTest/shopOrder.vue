<template>
    <div class="container-wrap">
        <!-- <NewHead leftText="商品属性设置" leftTextColor="black" @click-left="pageBack()"></NewHead> -->
        <div>
            <van-tabs swipeable sticky v-model="tabIndex" @change="">
                <van-tab v-for="(item,index) in titles" :key="index" :title="item">
                    <div>
                        <div>
                            <div>
                                <img src="" alt="">
                                <div><span>alan的共享店</span></div>
                                <img src="./img/qianjin.png" alt="">
                            </div>
                            <div><span>交易成功</span></div>
                        </div>
                        <div>
                            <img src="" alt="">
                            <div>
                                <div>[张家界大峡谷-大门票+玻璃桥+游览车票]旅游景点门票-成人票</div>
                                <div>
                                    <div>
                                        <div>出售</div>
                                        <img src="" alt="">
                                        <div>599</div>
                                        <div>899</div>
                                    </div>
                                    <div>&times;1</div>
                                </div>
                                <div><span>交易方式：电子票券</span></div>
                                <div>
                                    <img src="" alt="">
                                    <div>珠海市香洲区人民东路225号A102室</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span>共1件商品 合计：0.00 （含运费：0.00）</span>
                        </div>
                        <div>
                            <div><span>评论</span></div>
                            <div><span>查看票券</span></div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import lccell from "./components/lc-cell";
    import NewHead from "./components/NewHead";
    import 'vant/lib/index.css';
    export default {
        data() {
            return {
                titles:['共享中','全部订单','未付款','待发货','待收货','待评价']
            }
        },
        methods: {
            // 点击左侧事件
        },
        components: {
            lccell:lccell,
            NewHead:NewHead
        },
        created() {
            // this.festival()
        },
        props: {
            // 标题文案
            title: {
                type: String,
                default: ''
            },
            
        },
    }
</script>

<style scoped>
    .container-wrap{
        /* background-color: #ebebeb; */
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    
</style>
