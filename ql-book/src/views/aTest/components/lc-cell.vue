<template>
<!-- 单元格 -->
    <div :class="{'body-wrap':true}" :style="{height:realHeight,fontSize:mTextSize,padding:'0 10px',justifyContent:justify}">
        <!-- 左侧内容 -->
        <slot name="left">
            <div class="left-wrap">
                <span :style="{color:leftTextColor}">{{leftText}}</span>
            </div>
        </slot>
        <!-- 中间内容 -->
        <slot name="middle">
            <div class="middle-wrap" :style="{maxWidth:'235px',overflow:'hidden',color: middleTextColor, fontWeight:middleFontw}" v-if="middleText">
                <span>{{middleText}}</span>
            </div>
        </slot>
        <!-- 右侧内容 -->
        <slot name="right">
            <div class="right-wrap">
                <span :style="{color: rightTextColor,fontWeight:rightFontw}">{{rightText}}</span>
            </div>
        </slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isHide: true,
            }
        },
        methods: {
            // 点击左侧事件
            clickLeft() {
                let that = this;
                console.log("进入checkLeft方法");
                that.$emit('click-left');
            },
            // 点击右侧事件
            clickRight(){
                let that = this;
                console.log("进入checkLeft方法");
                that.$emit('click-right')
            }
        },
        props: {
            realHeight:{
                type:String,
                default:'44px'
            },
            leftText:{
                type:String,
                default:''
            },
            middleText:{
                type:String,
                default:''
            },
            rightText:{
                type:String,
                default:''
            },
            mTextSize:{
                type:String,
                default:'14px'
            },
            leftTextColor:{
                type:String,
                default:'#565656'
            },
            rightTextColor:{
                type:String,
                default:'#000000'
            },
            middleTextColor:{
                type:String,
                default:'#000000'
            },
            rightFontw:{
                type:String,
            },
            middleFontw:{
                type:String,
            },
            justify:{
                type:String,
                default:'space-between'
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
    .body-wrap{
        display: flex;
        /* justify-content: space-between; */
        align-items: center;
        width: 100%;
        /* background-color: white; */
        box-sizing: border-box;
        border-bottom: 1px solid #ebebeb;
    }
</style>
