<template>
    <div class="container-wrap">
        <!-- <van-calendar ref="calendar" :poppable="false" :show-subtitle="false"
        :show-title="false" :show-confirm="false" :max-date="maxDate()"
        :show-mark="false" :formatter="formatter" @select="select">
        
        </van-calendar> -->
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
        <div class="preview-wrap" v-show="toggleType">
            <span>指定周期设置</span>
        </div>
        <div class="save-wrap">
            <div class="save-text">
                <span>完成</span>
            </div>
            <div class="save-img" @click="showPreview">
                <img src="./img/copy.png" alt="">
            </div>
        </div>
        <!-- <div  @click="showPreview">周青蓉</div> -->
        <van-popup v-model="daySetting" round position="bottom" @close="closePop">
            <div class="bottom-wrap">
                <div class="item-wrap">
                    <lccell class="temp" leftText="" middleText="指定日期单价设置" rightText="" middleFontw=600
                    mTextSize="16px" leftTextColor="#1A1A1A"
                    ></lccell>
                    <lccell class="temp" leftText="日期" middleText="" rightText="请输入服务项目名称"
                    mTextSize="16px" leftTextColor="#1A1A1A" rightTextColor="#CCCCCC"
                    >
                        <template v-slot:right>
                            <div class="prop-wrap">
                                <span>6月13日</span>
                                <img src="./img/qianjin.png" alt="">
                            </div>
                        </template>
                    </lccell>
                    <lccell class="temp" leftText="价格" middleText="" rightText="￥599"
                    mTextSize="16px" leftTextColor="#1A1A1A" rightTextColor="red" rightFontw="600"
                    >
                        <template v-slot:right>
                            <span style="color: red;font-weight:600;margin-right:15px">￥599</span>
                        </template>
                    </lccell>
                </div>
                <div class="item-wrap empty-wrap">
                    <lccell class="temp" leftText="限售数量" middleText="" rightText="3000"
                    mTextSize="16px" leftTextColor="#1A1A1A"
                    >
                        <template v-slot:right>
                            <span style="font-weight:600;margin-right:15px">3000</span>
                        </template>
                    </lccell>
                    <lccell class="temp" leftText="设置占位" middleText=""
                    mTextSize="16px" leftTextColor="#1A1A1A"
                    >
                    <template v-slot:right>
                        <div class="prop-wrap">
                            <span style="color:#CCCCCC">未设置占位</span>
                            <img src="./img/qianjin.png" alt="">
                        </div>
                    </template>
                    </lccell>
                </div>
                <div class="save-btn">
                    <span>确认</span>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="weekSetting" round position="bottom" @close="closePop">
            <div class="bottom-wrap">
                <div class="item-wrap">
                    <lccell class="temp" leftText="" middleText="指定周期单价设置" rightText="" middleFontw=600
                    mTextSize="16px" leftTextColor="#1A1A1A"
                    ></lccell>
                    <lccell class="temp" leftText="周期时间段" middleText="" rightText="请输入服务项目名称"
                    mTextSize="16px" leftTextColor="#1A1A1A" rightTextColor="#CCCCCC"
                    >
                        <template v-slot:right>
                            <div class="prop-wrap">
                                <span>2020-6-1至2020-12-30</span>
                                <img src="./img/qianjin.png" alt="">
                            </div>
                        </template>
                    </lccell>
                    <lccell class="temp" leftText="日期" middleText="" rightText="请输入服务项目名称"
                    mTextSize="16px" leftTextColor="#1A1A1A" rightTextColor="#CCCCCC"
                    >
                        <template v-slot:right>
                            <div class="prop-wrap">
                                <span>周六、周日</span>
                                <img src="./img/qianjin.png" alt="">
                            </div>
                        </template>
                    </lccell>
                    <lccell class="temp" leftText="价格" middleText="" rightText="￥599"
                    mTextSize="16px" leftTextColor="#1A1A1A" rightTextColor="red" rightFontw="600"
                    >
                        <template v-slot:right>
                            <span style="color: red;font-weight:600;margin-right:15px">￥599</span>
                        </template>
                    </lccell>
                </div>
                <div class="item-wrap empty-wrap">
                    <lccell class="temp" leftText="限售数量" middleText="" rightText="3000"
                    mTextSize="16px" leftTextColor="#1A1A1A"
                    >
                        <template v-slot:right>
                            <span style="font-weight:600;margin-right:15px">3000</span>
                        </template>
                    </lccell>
                    <lccell class="temp" leftText="设置占位" middleText=""
                    mTextSize="16px" leftTextColor="#1A1A1A"
                    >
                    <template v-slot:right>
                        <div class="prop-wrap">
                            <span style="color:#CCCCCC">未设置占位</span>
                            <img src="./img/qianjin.png" alt="">
                        </div>
                    </template>
                    </lccell>
                </div>
                <div class="save-btn">
                    <span>确认</span>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import 'vant/lib/index.css';
    import lccell from "./components/lc-cell";
    export default {
        data() {
            return {
                tabIndex:0,
                show: true,
                daySetting:false,
                weekSetting: false,
                week: true,
                month: 0,
                active:-1,
                days:[],
                toggleType:false
            }
        },
        methods: {
            showPreview(){
                this.toggleType = !this.toggleType
            },
            setting(index){
                this.active = index
                if(this.week){
                    this.daySetting = !this.daySetting
                    
                }else{
                    this.weekSetting = !this.weekSetting
                }
                // this.days[index].festival='端午'
                this.days[index].price='￥600'
                this.days[index].tikNum='余3000'
            },
            closePop(){
                this.active = -1
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
            // festival(){
            //     this.days[1].festival='端午'
            //     this.days[1].price='￥600'
            //     this.days[1].tikNum='余3000'
            // }
        },
        components: {
            lccell:lccell,
        },
        created() {
            this.calendar(0)
            // this.festival()
        },
    }
</script>

<style scoped>
    
    .container-wrap{
        height: 100%;
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
    .item-wrap{
        width: 100%;
        /* display: flex;
        flex-grow: 1; */
        margin-bottom: 10px;
    }
    .empty-wrap{
        padding-bottom: 100px;
        margin: 0;
    }
    .temp{
        background-color: #FEFDF9;
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
        background-color: #ebebeb;
    }
    .save-btn{
        height: 44px;
        width: 100%;
        background-color: #3298ff;
        /* position: fixed; */
        text-align: center;
    }
    .save-btn span{
        color: white;
        line-height: 44px;
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
</style>
