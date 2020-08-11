<template>
    <div class="container-wrap">
        <NewHead leftText="确认验票信息" leftTextColor="black" @click-left="pageBack()"></NewHead>
        <div class="body-wrap">
            <div class="qrCode-wrap flex-c">
                <div class="qrCode-number flex-c">
                    <div class="text">券号编号：</div>
                    <div class="number">65465652225113154445</div>
                </div>
                <div class="qrCode" ref="qrcode" @click="toggle">
                    <!-- <img src="./img/Cristal2.jpg" alt=""> -->
                </div>
            </div>
            <div style="height:1px;width:100%;background-color:#ebebeb"></div>
            <div class="ticket-user flex-c">
                <div>
                    持票人
                </div>
                <div class="user-info flex-c">
                    <img  class="first" src="./img/huge1.jpg" alt="">
                    <span>李小花</span>
                    <img class="second" src="./img/qianjin.png" alt="">
                </div>
            </div>
            <div class="service-header flex-c service-field">
                <div>
                    服务项目内容
                </div>
                <div>可用次数</div>
                <div>状态</div>
                <div>余</div>
            </div>
            <div class="service-item flex-c service-field">
                <div>
                    大门口入园
                </div>
                <div>1</div>
                <div>已使用</div>
                <div>0</div>
            </div>
            <div class="service-item flex-c service-field">
                <div>
                    大门口入园
                </div>
                <div>1</div>
                <div>已使用</div>
                <div>0</div>
            </div>
            <div class="service-item flex-c service-field">
                <div>
                    大门口入园
                </div>
                <div>1</div>
                <div>已使用</div>
                <div>0</div>
            </div>
            <div style="height:5px;width:100%;background-color:#ebebeb"></div>
            <div class="tips-wrap">
                <div><span class="tips-header">使用说明：</span></div>
                <div><span>使用次数：1次 早上8:30-晚上10:30</span></div>
                <div><span>指定日期当天有效</span></div>
                <div><span>事项说明：缆车一次最多只能2人，一人一票</span></div>
                <div><span>天上的星星不说话</span></div>
                <div><span>地上的娃娃想妈妈</span></div>
            </div>
        </div>
        <div style="color:#909090;font-size:11px;margin:30px auto;text-align:center"><span>到底了~</span></div>
        <!-- <van-popup v-model="qrcodePopup" :lazy-render="false">
            <div style="background: #fff;width:240px;height:270px;padding: 20px;" class="mybox">
                <div class="qr_qrcode_image">
                <div
                    style="width: 240px;height: 240px;position: relative;"
                    id="qrcode1"
                    ref="qrcode"
                    class="er_qr_image"
                ></div>
                <div class="qr_qrcode_logo">
                    <img src="../../assets/img/pub/pub_default_shop_img.png" width="50" height="50" />
                </div>
                </div>
                <span style="margin-top: 10px;">智加扫我，聊一聊</span>
            </div>
        </van-popup> -->
    </div>
</template>

<script>
    import lccell from "./components/lc-cell";
    import NewHead from "./components/NewHead";
    export default {
        data() {
            return {
                qrcodePopup: false
            }
        },
        methods: {
            // 点击左侧事件
            createQrImage(){
                console.log("11");
                // let qrtext = properties.shortAPI + "/i/r#" + this.currentUser.id;
                console.log(this.$refs.qrcode)
                this.$refs.qrcode.innerHTML = "";
                let QRCode = this.QRCode;
                let qrcode = new QRCode(this.$refs.qrcode, {
                    width: 200,
                    height: 200,
                    correctLevel: QRCode.CorrectLevel.H,
                    // text: qrtext
                    text: "https://www.baidu.com/"
                });
            },
            toggle(){
                this.qrcodePopup = !this.qrcodePopup
            }
        },
        components: {
            lccell:lccell,
            NewHead:NewHead
        },
        mounted() {
            this.createQrImage()
        },
    }
</script>

<style scoped>
    .container-wrap{
        background-color: #f3f3f3;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .body-wrap{
        background-color: white;
        margin: 0 10px;
        border-radius: 10px;
        padding-bottom: 200px;
    }
    .qrCode-wrap{
        flex-direction: column;
        padding: 17px;
    }
    .qrCode{
        min-width: 150px;
        min-height: 150px;
    }
    .qrCode-number{
        margin: 12px 0;
    }
    .qrCode-number .text{
        font-size: 12px;
        
    }
    .qrCode-number .number{
        font-size: 18px;
        font-weight: 600;
        line-height: 1;

    }
    .ticket-user{
        height: 50px;
        font-size: 14px;
        padding: 0 10px;

    }
    .ticket-user .first{
        width: 25px;
        height: 25px;
        vertical-align: bottom;
        border-radius: 50%;
    }
    .ticket-user .second{
        width: 20px;
        height: 20px;
        vertical-align: bottom;
    }
    .user-info{
        width: 30%;
    }
    .flex-c{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .service-header{
        height: 18px;
        background-color: #ebebeb;
        padding: 0 15px;
        font-size: 10px;
        color: #565656;
    }
    .service-field div:nth-child(1){
        flex: 0 0 40%;
    }
    .service-field div:nth-child(2){
        flex: 0 0 15%;
        text-align: center;
    }
    .service-field div:nth-child(3){
        flex: 0 0 15%;
        text-align: center;
    }
    .service-field div:nth-child(4){
        flex: 0 0 5%;
        text-align: center;
    }
    .service-item{
        padding: 0 15px;
        height: 32px;
        font-size: 13px;
    }
    .tips-wrap{
        padding: 15px;
        font-size: 10px;
        color: #565656;
        line-height: 1.5;
    }
    .tips-header{
        font-size: 11px;
        color: black;
        font-weight: 600;
    }
    .qr_qrcode_image {
        background-color: #fff;
        position: relative;
    }

    /* 二维码图片 */
    #qrcode1 {
        background-color: #fff;
        width: 120px;
        height: 120px;
    }

    .qr_qrcode_logo {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        padding: 3px;
        background-color: #fff;
        top: 95px;
        left: 95px;
        position: absolute;
    }

    .qr_qrcode_logo img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
</style>
