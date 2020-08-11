<template>
    <div class="container-wrap">
        <!-- <NewHead leftText="商品属性设置" leftTextColor="black" @click-left="pageBack()"></NewHead> -->
        <div class="ticket-item">
            <div class="flex-between ticket-item-top">
                <div>
                    <img src="./img/Cristal1.jpg" alt="">
                </div>
                <div class="ticket-item-info flex-column">
                    <div style="font-size:14px;padding-bottom:10px"><span>[张家界大峡谷-大门票+玻璃桥+游览车票]旅游景点门票-成人票</span></div>
                    <div style="padding-bottom:5px">
                        <span style="color:red;font-size:15px;font-weight:600">￥599</span>
                        <span style="color:#909090;text-decoration: line-through;font-size:10px">￥899</span>
                    </div>
                    <div class="flex-between" style="color:#909090;font-size:10px;width:100%">
                        <div>
                            <div style="padding-bottom:2px">
                                <span>3排5号</span>
                                <span>2020-6-1</span>
                            </div>
                            <div>
                                使用人：李小花 15875688989
                            </div>
                        </div>
                        <div>&times;1</div>
                    </div>
                </div>
            </div>
            <div class="flex-between" style="height:40px">
                <div style="color:#3298ff;margin-left:15px"><span>未使用</span></div>
                <div style="margin-right:50px" class="change-user"><span>修改使用人</span></div>
            </div>
        </div>
        <div class="ticket-item">
            <div class="flex-between ticket-item-top">
                <div>
                    <img src="./img/Cristal1.jpg" alt="">
                </div>
                <div class="ticket-item-info flex-column">
                    <div style="font-size:14px;padding-bottom:10px"><span>[张家界大峡谷-大门票+玻璃桥+游览车票]旅游景点门票-成人票</span></div>
                    <div style="padding-bottom:5px">
                        <span style="color:red;font-size:15px;font-weight:600">￥599</span>
                        <span style="color:#909090;text-decoration: line-through;font-size:10px">￥899</span>
                    </div>
                    <div class="flex-between" style="color:#909090;font-size:10px;width:100%">
                        <div>
                            <div style="padding-bottom:2px">
                                <span>3排5号</span>
                                <span>2020-6-1</span>
                            </div>
                            <div>
                                使用人：李小花 15875688989
                            </div>
                        </div>
                        <div>&times;1</div>
                    </div>
                </div>
            </div>
            <div class="flex-between" style="height:40px">
                <div style="color:#3298ff;margin-left:15px"><span>未使用</span></div>
                <div style="margin-right:50px" class="change-user"><span>修改使用人</span></div>
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
            
        },
    }
</script>

<style scoped>
    .container-wrap{
        background-color: #F3F3F3;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .ticket-item{
        background-color: #FEFDF9;
        border-radius: 20px;
        margin: 10px;
    }
    .flex-between{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .flex-column{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    .ticket-item-top{
        padding: 8px 13px 12px;
        border-bottom: 0.5px solid #ebebeb;
    }
    .ticket-item-top img{
        width: 90px;
        height: 90px;
        vertical-align: bottom;
        border-radius: 15px;
    }
    .ticket-item-info{
        width: 100%;
        margin-left: 10px;
        height: 100%;
    }
    .change-user{
        border: 0.5px solid #BDBDBD;
        height: 25px;
        border-radius: 20px;
        padding: 0 6px;
        line-height: 25px;
    }
</style>
