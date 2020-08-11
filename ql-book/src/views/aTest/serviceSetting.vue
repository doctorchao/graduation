<template>
    <div class="container-wrap">
        <!-- <NewHead leftText="商品属性设置" leftTextColor="black" @click-left="pageBack()"></NewHead> -->
        <div class="item-wrap">
            <lccell class="temp" leftText="票券名称" middleText="" rightText="景点门票" realHeight="59px"></lccell>
            <lccell class="temp" leftText="票券使用有效时长" middleText="" rightText="1天">
                <template v-slot:right>
                    <div class="prop-wrap">
                        <span>1天</span>
                        <img src="./img/qianjin.png" alt="">
                    </div>
                </template>
            </lccell>
        </div>
        <div class="item-wrap">
            <lccell class="temp" leftText="指定使用人" middleText="" rightText="" @click.native="showTheUser">
                <template v-slot:right>
                    <div class="prop-wrap">
                        <span>无需指定/指定使用</span>
                        <img src="./img/qianjin.png" alt="">
                    </div>
                </template>
            </lccell>
        </div>
        <div class="middle-wrap">
            <span>服务内容</span>
        </div>
        <div class="item-wrap">
            <lccell class="temp" leftText="项目名称" middleText="可用次数" rightText="验票员"
                justify="space-around" middleTextColor="#565656" rightTextColor="#565656"
                realHeight="40px"
            ></lccell>
            <template v-for="(item,index) in serviceContent">
                <lccell class="temp" leftText="" middleText="1" rightText="" :key="index">
                    <template v-slot:left>
                        <span class="item-title">{{item.item}}</span>
                    </template>
                    <template v-slot:right>
                        <div class="prop-wrap">
                            <img :src="item.tester.avatar||'./img/lyt.jpg'" alt="" style="width:18px;height:18px;border-radius:50%">
                            <span>{{item.tester.name}}</span>
                            <img src="./img/qianjin.png" alt="">
                        </div>
                    </template>
                </lccell>
            </template>
            <!-- <lccell class="temp" leftText="" middleText="1" rightText="">
                <template v-slot:left>
                    <span class="item-title">大门口入园</span>
                </template>
                <template v-slot:right>
                    <div class="prop-wrap">
                        <img src="./img/lyt.jpg" alt="" style="width:18px;height:18px;border-radius:50%">
                        <span>红江农场燕子</span>
                        <img src="./img/qianjin.png" alt="">
                    </div>
                </template>
            </lccell>
            <lccell class="temp" leftText="" middleText="1" rightText="">
                <template v-slot:left>
                    <span class="item-title">坐缆车</span>
                </template>
                <template v-slot:right>
                    <div class="prop-wrap">
                        <img src="./img/lyt.jpg" alt="" style="width:18px;height:18px;border-radius:50%">
                        <span>红江农场燕子</span>
                        <img src="./img/qianjin.png" alt="">
                    </div>
                </template>
            </lccell>
            <lccell class="temp" leftText="" middleText="1" rightText="">
                <template v-slot:left>
                    <span class="item-title">玻璃桥</span>
                </template>
                <template v-slot:right>
                    <div class="prop-wrap">
                        <img src="./img/lyt.jpg" alt="" style="width:18px;height:18px;border-radius:50%">
                        <span>红江农场燕子</span>
                        <img src="./img/qianjin.png" alt="">
                    </div>
                </template>
            </lccell> -->
            <lccell class="temp" leftText="" middleText="" rightText="" realHeight="59px" @click.native="showService">
                <template v-slot:left>
                    <div class="prop-wrap">
                        <img src="./img/addItem.png" alt="" style="width:20px;height:20px;margin-right:5px">
                        <span>添加更多服务项目</span>
                    </div>
                </template>
            </lccell>
        </div>
        <van-popup v-model="service" round>
            <div class="popup-wrap">
                <lccell class="temp" leftText="" middleText="服务项目录入" rightText=""
                mTextSize="16px" leftTextColor="#1A1A1A" rightTextColor="#CCCCCC"
                ></lccell>
                <lccell class="temp" leftText="项目名称" middleText="" rightText="请输入服务项目名称"
                mTextSize="16px" leftTextColor="#1A1A1A" rightTextColor="#CCCCCC"
                ></lccell>
                <lccell class="temp" leftText="可用次数" middleText="" rightText="请输入核销次数"
                mTextSize="16px" leftTextColor="#1A1A1A" rightTextColor="#CCCCCC"
                ></lccell>
                <lccell class="temp" leftText="验票员" middleText=""
                mTextSize="16px" leftTextColor="#1A1A1A"
                >
                <template v-slot:right>
                    <div class="prop-wrap">
                        <span style="color:#CCCCCC">请选择核销员</span>
                        <img src="./img/qianjin.png" alt="">
                    </div>
                </template>
                </lccell> 
            </div>
            <div class="select-wrap">
                <div class="select-text">
                    <span>取消</span>
                </div>
                <div class="middle-line"></div>
                <div class="select-text">
                    <span style="color:#3298FF">确认</span>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="theUser" round>
            <div class="popup-wrap">
                <van-checkbox-group v-model="checked">
                    <lccell class="temp" leftText="" middleText="请选择指定使用人信息录入项" rightText=""
                    mTextSize="16px" leftTextColor="#1A1A1A" rightTextColor="#CCCCCC"
                    >
                    </lccell>
                    <lccell class="temp" leftText="头像" middleText="" rightText=""
                    mTextSize="16px" leftTextColor="#1A1A1A" rightTextColor="#CCCCCC"
                    >
                        <template v-slot:right>
                            <div class="prop-wrap">
                                <van-checkbox name="a" shape="square"></van-checkbox>
                            </div>
                        </template>
                    </lccell>
                    <lccell class="temp" leftText="姓名" middleText="" rightText=""
                    mTextSize="16px" leftTextColor="#1A1A1A" rightTextColor="#CCCCCC"
                    >
                        <template v-slot:right>
                            <div class="prop-wrap">
                                <van-checkbox name="b" shape="square"></van-checkbox>
                            </div>
                        </template>
                    </lccell>
                    <lccell class="temp" leftText="证件号" middleText=""
                    mTextSize="16px" leftTextColor="#1A1A1A"
                    >
                        <template v-slot:right>
                            <div class="prop-wrap">
                                <van-checkbox name="c" shape="square"></van-checkbox>
                            </div>
                        </template>
                    </lccell> 
                    <lccell class="temp" leftText="手机号" middleText=""
                    mTextSize="16px" leftTextColor="#1A1A1A"
                    >
                    <template v-slot:right>
                        <div class="prop-wrap">
                            <van-checkbox name="d" shape="square"></van-checkbox>
                        </div>
                    </template>
                    </lccell> 
                </van-checkbox-group>
            </div>
            <div class="tips">
                <div>
                    <span>选择指定使用人后，用户购买时将要输入相关信息确认；指定使用人信息用户只能修改一次。</span>
                </div>
            </div>
            <div class="select-wrap">
                <div class="select-text">
                    <span>取消</span>
                </div>
                <div class="middle-line"></div>
                <div class="select-text">
                    <span style="color:#3298FF">确认</span>
                </div>
            </div>
        </van-popup>
        <div class="attention-wrap">
            <div>
                <span>注意事项说明</span>
            </div>
            <textarea class="text-content" maxlength="300" placeholder="请输入项目使用注意事项内容~可为空"></textarea>
        </div>
        <div class="preview-wrap" v-show="preview">
            <span>预览</span>
        </div>
        <div class="save-wrap">
            <div class="save-text">
                <span>确认保存</span>
            </div>
            <div class="save-img" @click="showPreview">
                <img src="./img/copy.png" alt="">
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
                isHide: true,
                serviceContent:[
                    {
                        item: '大门口入园',
                        useNumber: 1,
                        tester:{
                            avatar:'../img/lyt.jpg',
                            name:'红江农场燕子'
                        }
                    },
                    {
                        item: '坐缆车',
                        useNumber: 1,
                        tester:{
                            avatar:'../img/lyt.jpg',
                            name:'红江农场燕子'
                        }
                    },
                    {
                        item: '玻璃桥',
                        useNumber: 1,
                        tester:{
                            avatar:'../img/lyt.jpg',
                            name:'红江农场燕子'
                        }
                    }
                ],
                preview:false,
                service:false,
                theUser: false,
                checked:['a','b','d']
            }
        },
        methods: {
            // 点击左侧事件
            showPreview(){
                this.preview = !this.preview
            },
            showService(){
                this.service = !this.service
            },
            showTheUser(){
                this.theUser = !this.theUser
            },
        },
        components: {
            lccell:lccell,
            NewHead:NewHead
        },
        props: {
            // 标题文案
            title: {
                type: String,
                default: ''
            },
            
        },
        // created() {
        //     let val = localStorage.getItem('realShow')
        //     if(val){
        //         this.isHide = false
        //     }
        // },
    }
</script>

<style scoped>
    .container-wrap{
        background-color: #ebebeb;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .item-wrap{
        width: 100%;
        /* display: flex;
        flex-grow: 1; */
        margin-bottom: 10px;
    }
    .temp{
        background-color: #FEFDF9;
    }
    /* .temp:nth-last-child(1){
        border:none
    } */
    .tips{
        height: 53px;
        background-color: #FEFDF9;
        font-size: 10px;
        color: #909090;
        /* text-align: center; */
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 15px;
    }
    .prop-wrap{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .prop-wrap img{
        width:18px;
        height:18px;
        margin-left:5px
    }
    .middle-wrap{
        width: 100%;
        height: 70px;
        font-size: 10px;
        color: #565656;
    }
    .middle-wrap span{
        line-height: 120px;
        margin-left: 10px;
    }
    .item-title{
        margin-left: 25px;
        width: 120px;
        color: black;
    }
    .attention-wrap{
        padding: 10px;
        background-color: #FEFDF9;
        color: #565656;
        /* margin-bottom: 44px; */
    }
    .attention-wrap .text-content{
        padding: 0;
        margin-top: 10px;
        border: none;
        outline: none;
        width: 100%;
        color: black;
        background-color: #FEFDF9;
        min-height: 100px;
        overflow-x: hidden;
        resize: none;
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
        width: 85%;
        text-align: center;
    }
    .save-text{
        font-size: 16px;
        color: white;
        line-height: 44px;
    }
    .save-img{
        width: 15%;
        height: 44px;
        position: relative;
        background-color: #F3F3F3;
    }
    .save-img img{
        position: absolute;
        width: 25px;
        height: 25px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
    .preview-wrap{
        width: 130px;
        height: 40px;
        background-color: #F3F3F3;
        text-align: center;
        position: fixed;
        bottom: 44px;
        right: 0;
        border: 1px solid #D2D2D2;
        border-radius: 5px;
    }
    .preview-wrap span{
        line-height: 40px;
    }
    .popup-wrap{
        width: 345px;
        border-radius: 30px;
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
</style>
