<template>
    <div class="container-wrap">
        <div class="header-wrap">
            <div class="flex-row header-top" style="width: 80%">
                <span>限售数量 <span class="num-text">3000</span></span>
                <div>有位数量 <span class="num-text">300</span></div>
                <div>无位数量 <span class="num-text">2700</span></div>
            </div>
            <div class="flex-row header-middle" style="width: 38%">
                <div class="outer-wrap">
                    <div class="inner-wrap"></div>
                </div>
                <span>允许顾客挑选占位</span>
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
                    <div class="right-wrap" v-if="item.number">
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
                    <div v-else>
                        <div class="inputNumber" @click="setSeat">
                            <span>请输入占位数量</span>
                        </div>
                    </div>
                </div>
            </div>
            <div @click="addSeat">
                <img src="./img/addItem.png" alt="" style="width:18px;height:18px">
            </div>
        </div>
        <div class="save-wrap">
            <div class="save-text">
                <span>确认保存</span>
            </div>
        </div>
        <van-popup v-model="showSetSeat" round>
            <div class="popup-wrap">
                <lccell class="temp" leftText="" middleText="设置占位" rightText=""
                mTextSize="16px"
                ></lccell>
            </div>
            <div class="addAndReduce">
                <div>
                    <img src="./img/add.png" alt="">
                </div>
                <span>10</span>
                <div>
                    <img src="./img/reduce.png" alt="">
                </div>
            </div>
            <div class="select-wrap">
                <div class="select-text">
                    <span>删除该行</span>
                </div>
                <div class="middle-line"></div>
                <div class="select-text">
                    <span style="color:#3298FF">确认</span>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import 'vant/lib/index.css';
    import lccell from "./components/lc-cell";
    export default {
        name:'seatSetting',
        data() {
            return {
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
                showSetSeat:false
            }
        },
        methods: {
            addSeat(){
                var obj={ number:0 }
                this.rowSeat.push(obj)
            },
            setSeat(){
                this.showSetSeat=!this.showSetSeat
            }
        },
        components: {
            lccell:lccell
        },
    }
</script>

<style scoped>
    
    .container-wrap{
        height: 100%;
    }
    .header-wrap{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        height: 95px;
        padding: 10px;
    }
    .flex-row{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header-bottom{
        font-size: 9px;
    }
    .header-wrap .num-text{
        color: #3298ff;
    }
    .outer-wrap{
        width: 16px;
        height: 16px;
        border: 1px solid #3298ff;
        border-radius: 50%;
        position: relative;
    }
    .inner-wrap{
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #3298ff;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
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
    .save-wrap{
        display: flex;
        align-items: center;
        width: 100%;
        position: fixed;
        bottom: 0;
        
    }
    .save-wrap .save-text{
        background-color: #3298FF;
        height: 44px;
        width: 100%;
        text-align: center;
        font-size: 16px;
        color: white;
        line-height: 44px;
    }
    .popup-wrap{
        width: 345px;
        /* border-radius: 30px; */
    }
    .select-wrap{
        height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex: auto;
        background-color: #FEFDF9;
        border-top: 1px solid #ebebeb;
    }
    .middle-line{
        height: 30px;
        width: 1px;
        background-color: #ebebeb;
    }
    .select-text{
        /* line-height: 50px; */
        width: 150px;
        text-align: center;
    }
    .temp{
        background-color: #FEFDF9;
    }
    .addAndReduce{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 70px;
        background-color: #FEFDF9;
        padding: 0 30px;
    }
    .addAndReduce img{
        width:30px;
        height:30px
    }
</style>
