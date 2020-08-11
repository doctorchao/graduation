<template>
    <div class="container-wrap">
        <!-- <NewHead leftText="商品属性设置" leftTextColor="black" @click-left="pageBack()"></NewHead> -->
        <div class="header-wrap">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item>
                    <img src="./img/Cristal1.jpg" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="./img/Cristal2.jpg" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="./img/huge1.jpg" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="./img/huge2.jpg" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="body-wrap">
            <div class="tik-title-wrap tik-padding">
                <div class="tik-title tik-width">
                    <span>[张家界大峡谷-大门票+玻璃桥+游览车票]旅游景点门票-成人票</span>
                </div>
                <div class="tik-title-price tik-flex-e tik-width">
                    <div class="price-wrap">
                        <div style="font-size:13px;color:gray">出售</div>
                        <div style="font-size:18px;color:red">￥899</div>
                        <div style="font-size:13px;color:gray;text-decoration:line-through">￥8300</div>
                    </div>
                    <div>
                        <img src="./img/qrQode.png" alt="">
                    </div>
                </div>
                <div class="tik-title-info tik-flex-e tik-width">
                    <span>电子票券</span>
                    <div>
                        <img src="./img/position.png" alt="">
                        <span>广东省珠海市人民西路758号</span>
                    </div>
                </div>
            </div>
            <div class="between-line"></div>
            <div class="tik-good-wrap tik-padding">
                <div class="tik-flex-c">
                    <div>
                        <div class="tik-flex-s" style="margin-bottom:20px">
                            <div class="good-title"  style="margin-bottom:10px">
                                <span>促销</span>
                            </div>
                            <div class="good-content">
                                <div><span>每满300减30，每满600减80</span></div>
                                <div><span class="date">2018.03.12-2018.08.20</span></div>
                            </div>
                        </div>
                        <div class="tik-flex-s">
                            <div class="good-title">
                                <span>公益</span>
                            </div>
                            <div class="good-content"><span>购买可得300公益值</span></div>
                        </div>
                    </div>
                    <div class="good-arrow">
                        <img src="./img/qianjin.png" alt="">
                    </div>
                </div>
            </div>
            <div class="tik-flex-c tik-good-item tik-padding">
                <div class="tik-flex-c">
                    <img src="./img/right.png" alt="">
                    <span>15天退货</span>
                </div>
                <div class="tik-flex-c">
                    <img src="./img/right.png" alt="">
                    <span>运费险</span>
                </div>
                <div class="tik-flex-c">
                    <img src="./img/right.png" alt="">
                    <span>公益宝贝</span>
                </div>
                <div class="good-arrow">
                    <img src="./img/qianjin.png" alt="">
                </div>
            </div>
            <div class="between-line"></div>
            <div class="tik-choose-wrap tik-padding">
                <div class="tik-flex-c">
                    <span class="choose-left">请选择时间</span>
                    <div class="tik-flex-c" @click="showChooseDate">
                        <span class="choose-right">更多</span>
                        <img src="./img/doubleArrow.png" alt="">
                    </div>
                </div>
            </div>
            <div class="middle-line">
                <div class="line"></div>
                <span>详情</span>
                <div class="line"></div>
            </div>
        </div>
        <div class="save-wrap">
            <div class="save-left">
                <div class="flex-col">
                    <img src="./img/shop.png" alt="">
                    <div>店铺</div>
                </div>
                <div class="flex-col">
                    <img src="./img/chat.png" alt="">
                    <div>聊一聊</div>
                </div>
                <div class="flex-col">
                    <img src="./img/car.png" alt="">
                    <div>订单选购</div>
                </div>
            </div>
            <div class="save-right tik-flex-c">
                <div class="right-left">
                    <span>加入购物订单</span>
                </div>
                <div class="right-right">
                    <span>立即购买</span>
                </div>
            </div>
        </div>
        <van-popup v-model="chooseDate" position="bottom" @close="closePop" style="height:80%">
            <div class="pop-date-wrap">
                <div class="title-wrap">
                    <div class="title-left">
                        <img src="./img/Cristal2.jpg" alt="">
                    </div>
                    <div class="title-right">
                        <div class="title-text">
                            <span>[张家界大峡谷-大门票+玻璃桥+游览车票]旅游景点门票-成人票</span>
                        </div>
                        <div class="rest-num">
                            <span>库存85465件</span>
                        </div>
                    </div>
                </div>
                <div class="scroll-wrap">
                    <div>
                        <span style="color:#282828;font-size:13px">请选择时间</span>
                    </div>
                    <div style="border-bottom:1px solid #ebebeb">
                        <van-tabs swipeable sticky v-model="tabIndex" @change="changeMonth(tabIndex)">
                            <van-tab v-for="index in 6" :key="index" :title="(month+index)+'月'">
                                <div class="calendar-wrap">
                                    <div class="week-wrap">
                                        <div class="week-item">日</div>
                                        <div class="week-item">一</div>
                                        <div class="week-item">二</div>
                                        <div class="week-item">三</div>
                                        <div class="week-item">四</div>
                                        <div class="week-item">五</div>
                                        <div class="week-item">六</div>
                                    </div>
                                    <div class="day-wrap">
                                        <div v-for="(item,index) in days" :key="index" :class="active == index ?'day-item-wrap day-item-active':'day-item-wrap'" @click="setting(index)">
                                            <div class="day-item" v-if="item">
                                                <div class="item-festival fixed-h">
                                                    <span>{{item.festival}}</span>
                                                </div>
                                                <div class="item-day fixed-h">
                                                    <span>{{item.day}}</span>
                                                </div>
                                                <div class="item-price fixed-h">
                                                    <span>{{item.price}}</span>
                                                </div>
                                                <div class="item-tikNum fixed-h">
                                                    <span>{{item.tikNum}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </van-tab>
                        </van-tabs>
                    </div>
                    <div>
                        <span>服务项目说明</span>
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="chooseSeat" position="bottom" @close="closePop2">
            <div class="header-wrap">
                <div style="padding:10px">
                    <span>请选择位置</span>
                </div>
                <div class="flex-row header-bottom" style="width: 37%">
                    <div class="seat-img">
                        <img src="./img/seat_emp.png" alt="">
                        <div>可选</div>
                    </div>
                    <div class="seat-img">
                        <img src="./img/seat_dis.png" alt="">
                        <div>已占</div>
                    </div>
                    <div class="seat-img">
                        <img src="./img/seat_sel.png" alt="">
                        <div>选中</div>
                    </div>
                    <div class="seat-img">
                        <img src="./img/seat.png" alt="">
                        <div>有位</div>
                    </div>
                </div>
            </div>
            <div style="height: 20px;background-color: #ebebeb">
            <span style="font-size:10px;color:gray;line-height:20px;margin-left:10px">设置位置</span>
        </div>
        <div class="seat-wrap">
            <div v-for="(item,index) in rowSeat" :key="index">
                <div class="seat-row">
                    <div class="left-wrap">
                        <div class="num-wrap">
                            {{index}}
                        </div>
                    </div>
                    <div class="right-wrap">
                        <div v-for="num in item.number" :key="num">
                            <div v-if="!item.empty">
                            <img src="./img/seat_emp.png" alt="">
                            </div>
                            <div v-if="!item.empty">
                                <img src="./img/seat_dis.png" alt="">
                            </div>
                            <div v-if="!item.empty">
                                <img src="./img/seat_sel.png" alt="">
                            </div>
                            <div v-if="item.empty">
                                <img src="./img/seat.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </van-popup>
    </div>
</template>

<script>
    import lccell from "./components/lc-cell";
    import NewHead from "./components/NewHead";
    import 'vant/lib/index.css';
    export default {
        data() {
            return {
                chooseDate:false,
                tabIndex:0,
                show: true,
                month: 0,
                active:-1,
                days:[],
                chooseSeat:false,
                rowSeat:[
                    {
                        // colSeat:[
                        //     {
                        //         empty:true
                        //     }
                        // ]
                        number:7,
                        empty:true

                    },
                    {
                        number:9,
                        empty:true

                    },
                    {
                        number:11,
                        empty:true

                    },
                    {
                        number:11,
                        empty:true

                    },
                ],
            }
        },
        methods: {
            // 点击左侧事件
            showChooseDate(){
                this.chooseDate = !this.chooseDate
            },
            setting(index){
                this.active = index
                this.chooseSeat = !this.chooseSeat
                // this.chooseDate = !this.chooseDate
                // this.days[index].festival='端午'
                this.days[index].price='￥600'
                this.days[index].tikNum='余3000'
                
            },
            closePop(){
                this.active = -1
            },
            closePop2(){
                // this.chooseSeat = false
                // this.chooseDate = false
            },
            changeMonth(val){
                console.log(val,'索引')
                this.calendar(val)
            },
            calendar(val){
                const now = new Date();
                const day = new Date(now.getFullYear(), now.getMonth()+1+val,0)
                const date = new Date(now.getFullYear(), now.getMonth()+val,1)
                var nowMonth = now.getMonth() //本月数
                var nowDay = now.getDay() // 星期几
                var nowDate = now.getDate() // 本月几号
                var nowDays = day.getDate() //本月天数
                var firstDay = date.getDay() //本月一号星期几
                this.month = nowMonth
                var arr = new Array(date.getDay())
                // for(let i = 0;i<date.getDate();i++){
                //     // const obj1 = new Object()
                //     arr.push(0)
                // }
                for(let i = 1;i<=day.getDate();i++){
                    const obj2 = new Object()
                    obj2.day = i
                    // console.log(obj2)
                    arr.push(obj2)
                }
                this.days = arr
            },
        },
        components: {
            lccell:lccell,
            NewHead:NewHead
        },
        created() {
            this.calendar(0)
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
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
    .my-swipe img{
        height: 240px;
    }
    .tik-title-wrap{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        /* height: 100px; */

    }
    .tik-title{
        font-size: 16px;
    }
    .price-wrap{
        line-height: 17px;
    }
    .tik-flex-e{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    .tik-flex-c{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .tik-flex-s{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .tik-title-price{
        margin-bottom: 20px;
    }
    .tik-title-price .price-wrap{
        width: 35%;
        display: flex;
        justify-content: space-between;
        align-items: center ;
    }
    .tik-title-price img{
        width: 35px;
        height: 35px;
        vertical-align: bottom;
    }
    .tik-title-info span{
        font-size: 9px;
        color: #bebebe;
    }
    .tik-title-info img{
        /* vertical-align: bottom; */
        width: 10px;
        height: 10px;
        display: inline-block;
    }
    .tik-width{
        width: 100%;
    }
    .tik-good-wrap{
        border-bottom: 1px solid #ebebeb;
    }
    .good-title{
        background-color: rgb(250, 200, 200);
        padding: 1px 5px;
        border-radius: 3px;
        margin-right: 10px;
    }
    .good-title span{
        color: red;
        font-size: 12px;
    }
    .good-content{
        font-size: 11px;
    }
    .good-content .date{
        font-size: 9px;
        color: #bebebe;
    }
    .tik-padding{
        padding: 12px;
    }
    .tik-good-item{
        color: gray;
    }
    .tik-good-item img{
        width: 20px;
        height: 20px;
        vertical-align: bottom;
        margin-right: 3px;
    }
    .good-arrow{
        width: 20px;
        height: 20px;
        padding-left: 50px;
    }
    /* .tik-choose-wrap .choose-left{
        font-size: 15px;
    } */
    .tik-choose-wrap img{
        width: 20px;
        height: 20px;
        /* vertical-align: bottom; */
    }
    .tik-choose-wrap .choose-right{
        font-size: 11px;
        color: #bebebe;
    }
    .middle-line{
        height: 30px;
        width: 100%;
        background-color: #ebebeb;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 400px;
    }
    .middle-line span{
        margin: 0 10px;
    }
    .line{
        width: 35px;
        height: 1px;
        background-color: #b3b3b3;
        transform: scaleY(0.4);
    }
    .between-line{
        height: 10px;
        width: 100%;
        background-color: #ebebeb;
    }
    .save-wrap{
        display: flex;
        align-items: center;
        width: 100%;
        position: fixed;
        bottom: 0;
        /* height: 50px; */
        border-top: 1px solid #ebebeb;
    }
    .save-left{
        width: 50%;
        /* padding: 0 15px; */
        font-size: 11px;
        box-sizing: content-box;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .save-left img{
        width: 23px;
        height: 23px;
        margin-bottom: 5px;
    }
    .save-right{
        width: 50%;
        color: white;
    }
    .right-left{
        width: 50%;
        height: 50px;
        background-color: orange;
        text-align: center;
        line-height: 55px;
    }
    .right-right{
        width: 50%;
        height: 50px;
        background-color: red;
        text-align: center;
        line-height: 55px;
    }
    .flex-col{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 30%;
    }
    .pop-date-wrap{
        padding: 0 12px;
        height: 100%;
    }
    .title-wrap{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        z-index: 9999;
        background-color: white;
    }
    .container-wrap /deep/ .van-hairline--top-bottom::after{
        border: none;
    }
    .title-right{
        margin-left: 15px;
        height: 65px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px 0 20px 0; 
    }
    .title-left img{
        width: 115px;
        height: 115px;
        float: left;
        margin-top: -40px;
        border-radius: 10px;
    }
    .title-text{
        font-weight: 600;
    }
    .rest-num{
        color: #565656;
        font-size: 13px;
    }
    .container-wrap /deep/ .van-ellipsis{
        flex-basis:15% !important
    }
    .calendar-wrap{
        padding: 15px;
    }
    .week-wrap{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 30px;
        /* width: 90%; */
        margin: 0 auto;
    }
    .week-item{
        flex: 0 0 14%;
        text-align: center;
    }
    .day-wrap{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        margin: 0 auto;
    }
    .day-item-wrap{
        flex: 0 0 14%;
        text-align: center;
        height: 80px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .day-item-active{
        border: 1px solid #ebebeb;
        border-radius: 5px;
        background-color: #e4e4e4;
    }
    .day-item{
        vertical-align: middle;
    }
    .fixed-h{
        min-height: 15px;
    }
    .item-festival{
        color: orange;
        font-size: 11px;
    }
    .item-day{
        font-size: 16px;
        font-weight: 600;
    }
    .item-price{
        color: red;
        font-size: 13px;
        font-weight: 600;
    }
    .item-tikNum{
        color: #3298ff;
        font-size: 9px;
    }
    .scroll-wrap{
        height: 100%;
        /* overflow-y: auto; */
        padding-top: 100px;
    }
    .flex-row{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header-bottom{
        margin: 20px auto;
    }
    .seat-img{
        font-size: 9px;
    }
    .seat-img img{
        width: 22px;
        height: 22px;
    }
    .seat-wrap{
        padding: 10px;
        margin-bottom: 100px;
    }
    .seat-row{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .seat-img{
        font-size: 9px;
    }
    .seat-img img{
        width: 22px;
        height: 22px;
    }
    .right-wrap img{
        width: 20px;
        height: 20px;
        margin: 0 5px;
    }
    .left-wrap{
        /* width: 30px; */
        text-align: center;
    }
    .num-wrap{
        min-width:14px;
        height: 18px;
        border-radius: 18px;
        background-color: #3298ff;
        text-align: center;
        line-height: 18px;
        color: white;
        margin-right: 10px;
        font-size: 12px;
        padding: 0 2px;
    }
    .right-wrap{
        width: 100%;
        /* background-color: rgb(241, 237, 229); */
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .inputNumber{
        border: 1px solid #3298FF;
        background-color: #CEE6FF;
        border-radius: 5px;
        text-align: center;
        padding: 3px;
    }
    .inputNumber span{
        color: #3298FF;
        font-size: 10px;
    }
</style>
