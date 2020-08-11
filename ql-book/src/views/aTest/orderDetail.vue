<template>
    <div class="container-wrap">
        <!-- <NewHead leftText="商品属性设置" leftTextColor="black" @click-left="pageBack()"></NewHead> -->
        <div>
            <img src="./img/huge2.jpg" alt="">
        </div>
        <div>
            <img src="./img/address.png" alt="">
            <div>
                <div>
                    <span>不需要收货人地址</span>
                </div>
                <div>
                    <span>电子票券</span>
                </div>
            </div>
        </div>
        <div>
            <div>
                <img src="" alt="">
                <div><span>晴动泉心靓衣坊</span></div>
                <img src="./img/qianjin.png" alt="">
            </div>
            <div>
                <img src="" alt="">
                <div>
                    <div>
                        <div>[张家界大峡谷-大门票+玻璃桥+游览车票]旅游景点门票-成人票</div>
                        <div>
                            <div>￥599</div>
                            <div>￥899</div>
                        </div>
                    </div>
                    <div>
                        <div>3排5号</div>
                        <div>&times;1</div>
                    </div>
                    <div>2020-10-1</div>
                </div>
            </div>
            <div>
                <div><span>查看票券</span></div>
                <div><span>申请售后</span></div>
            </div>
            <div>
                <div>
                    <div>运费</div>
                    <div>￥10.00</div>
                </div>
                <div>
                    <div>超值低价</div>
                    <div>-￥50.20</div>
                </div>
                <div>
                    <div>实付款（含运费）</div>
                    <div>￥16.80</div>
                </div>
            </div>
        </div>
        <div>
            <div>
                <img src="" alt="">
                <div>联系卖家</div>
            </div>
            <div>
                <img src="" alt="">
                <div>拨打电话</div>
            </div>
        </div>
        <div>
            <div>
                <div>订单编号：104983588888111555</div>
                <div><span>复制</span></div>
            </div>
            <div>交易号：20201212100010245652</div>
            <div>创建时间：2020-02-02 22:10:10</div>
            <div>付款时间：2020-02-02 22:10:10</div>
            <div>发货时间：2020-02-02 22:10:10</div>
        </div>
        <div>
            <div>
                <span>我的分享收益</span>
            </div>
            <div>
                <span>查看评论</span>
            </div>
            <div>
                <span>评论</span>
            </div>
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
