<template>
    <div class="container-wrap">
        <!-- <NewHead leftText="商品属性设置" leftTextColor="black" @click-left="pageBack()"></NewHead> -->
        <div>
            <div class="photo-select">
                <label>
                    <input type="file" class="photo-input" @change="change">
                    <div class="photo-wrap">
                        <img src="./img/photo.png" alt="">
                        <div>拍照/图片</div>
                    </div>
                </label>
            </div>
            <div class="tips-wrap">
                <span>可在商品编辑展示中增加更多商品轮播图</span>
            </div>
        </div>
        <div class="item-wrap">
            <lccell class="temp" leftText="商品名称" middleText="[张家界大峡谷-大门票+玻璃桥+游览车票]旅游景点门票-成人票" rightText="" realHeight="59px">
                <template v-slot:right>
                    <img src="./img/pub_ico_richscan.png" alt="" style="width:25px;height:25px">
                </template>
            </lccell>
        </div>
        <div class="item-wrap">
            <lccell class="temp" leftText="属性类别" middleText="" rightText="">
                <template v-slot:right>
                    <div class="prop-wrap">
                        <span>电子票券-服务</span>
                        <img src="./img/qianjin.png" alt="">
                    </div>
                </template>
            </lccell>
            <lccell class="temp" leftText="商品分类" middleText="" rightText="">
                <template v-slot:right>
                    <div class="prop-wrap">
                        <span>旅游 服务 景点</span>
                        <img src="./img/qianjin.png" alt="">
                    </div>
                </template>
            </lccell>
        </div>
        <div class="item-wrap">
            <lccell class="temp" leftText="零售价" middleText="" rightText="￥0.00" rightTextColor="red" rightFontw=600></lccell>
            <lccell class="temp" leftText="好友价（好友直接购买的价格）" middleText="" rightText="￥0.00" rightTextColor="red" rightFontw=600></lccell>
        </div>
        <div class="item-wrap">
            <lccell class="temp" leftText="电子票券-服务项目" middleText="" rightText="">
                <template v-slot:right>
                    <div class="prop-wrap">
                        <span style="color: #CCCCCC">请设置电子票券服务项目内容</span>
                        <img src="./img/qianjin.png" alt="">
                    </div>
                </template>
            </lccell>
        </div>
        <div class="bottom-wrap">
            <span>展示更多商品信息</span>
            <img src="./img/qianjin.png" alt="" style="width:18px;height:18px;transform:rotate(90deg)">
        </div>
    </div>
</template>

<script>
    import lccell from "./components/lc-cell";
    import NewHead from "./components/NewHead";
    export default {
        data() {
            return {
                isHide: true,
                realHeight:true
            }
        },
        methods: {
            // 点击左侧事件
            
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
        background-color: white;
    }
    .temp:nth-last-child(1){
        border:none
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
    .bottom-wrap{
        max-width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #0081FF;
        margin: 0 auto;
        margin-bottom: 100px;
    }
    .photo-wrap{
        /* text-align: center; */
        background-color: #cecece;
        width: 54px;
        height: 54px;
        box-sizing: border-box;
        padding: 5px;
        margin: 10px;
        border-radius: 5px;
        position: absolute;
        font-size: 9px;
        color: #565656;
    }
    .photo-wrap img{
        width: 30px;
        height: 30px;
        vertical-align: bottom;
        margin: 0 auto;
    }
    .tips-wrap{
        max-width: 250px;
        margin: 0 auto;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 3px;
        font-size: 8px;
        color: #909090;
    }
    .photo-input{
        display: none;
    }
    .photo-select{
        width: 54px;
        height: 54px;
        position: relative;
    }
</style>
