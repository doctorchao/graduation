<template>
<!-- 头部组件 -->
    <div :class="{nh_container: true, page_head: isPageHead}">
        <van-nav-bar :fixed="fixed" :title="title" @click-left="clickLeft" @click-right="clickRight" >
            <!-- 自定义左侧样式 -->
            <div class="custom-left click-color" slot="left" v-if="isHide">
                <!-- 图标 -->
                <van-icon :color="leftIconColor" :size="leftIconSize" :name="leftIcon"></van-icon>
                <!-- 文字 -->
                <span :style="{color: leftTextColor, fontSize: leftTextSize}" class="head_text left-text">{{leftText}}</span>
                <slot name="left"></slot>
            </div>
            <!-- 自定义右侧样式 -->
            <div class="custom-right click-color" slot="right">
                <!-- 文字 -->
                <span :style="{color: rightTextColor, fontSize: rightTextSize}" class="head_text right-text">{{rightText}}</span>
                <!-- 图标 -->
                <van-icon :size="rightIconSize" :color="rightIconColor" :name="rightIcon" v-if="transformIcon" style="transform:rotate(90deg);"></van-icon>
                <van-icon :size="rightIconSize" :color="rightIconColor" :name="rightIcon" v-else></van-icon>
                <slot name="right"></slot>
            </div>
        </van-nav-bar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isHide: true
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
            // 标题文案
            title: {
                type: String,
                default: ''
            },
            // 左侧按钮
            leftIcon: {
                type: String,
                default: 'arrow-left'
            },
            // 右侧按钮
            rightIcon:{
                type: String,
                default: ''
            },
            // 左侧文案
            leftText:{
                type: String,
                default: ''
            },
            // 右侧文案
            rightText:{
                type: String,
                default: ''
            },
            // 左侧图标大小
            leftIconSize:{
                type: String,
                default: '.32rem'
            },
            // 右侧图标大小
            rightIconSize:{
                type: String,
                default: '.32rem'
            },
            // 左边图标颜色
            leftIconColor:{
                type: String,
                default: '#505050'
            },
            rightIconColor:{
                type: String
            },
            // 左边文案颜色
            leftTextColor:{
                type: String,
                default: '#505050'
            },
            // 右边文案颜色
            rightTextColor:{
                type: String,
                default: '#38f'
            },
            // 左边文案大小
            leftTextSize:{
                type: String,
                default: '0.32rem'
            },
            // 右边文案大小
            rightTextSize:{
                type: String,
                default: '0.32rem'
            },
            // 是否固定顶部
            fixed:{
                type: Boolean,
                default: false
            },
            // 是否为页面头部组件
            isPageHead:{
                type: Boolean,
                default: true
            },
            // 是否旋转90度 右边的图标
            transformIcon:{
                type: Boolean,
                default: false
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
    .nh_container .head_text{
        font-size: 14px;
        color: #505050;
        vertical-align: -1px;
    }
    .custom-left {
        display: flex;
        align-items: center;
    }
    .nh_container .van-nav-bar{
        background-color: #f3f3f3;
    }
    .page_head .van-nav-bar{
        height: 1rem;
        line-height: 1rem;
    }
    .van-nav-bar__left{
        left: 10px!important;
    }
</style>
