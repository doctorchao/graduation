<template>
  <div>
    <van-collapse v-if="defaultStyle" v-model="activeNames">
      <van-collapse-item :title="title" :value="computed_selectedTags" name="1">
        <div style="height: 35px;">
          <ul class="slide-box">
            <li class="slide-item" v-for="(item,index) in tagList" @click="clickTag(item)">
              <van-button :class="{selectedClass:item.selected,unselectClass:!item.selected}"  v-longtap="longtap(item,index)"  round size="small">{{item.name}}</van-button>
            </li>
            <li class="slide-item" @click="tempText='';showAddTag=true" style="padding-top: 5px;">
              <img src="../../assets/img/pub/apptop_pub_ico_tianjia_nor.png" style="width: 25px;height: 23px;margin: 0 5px;">
            </li>
          </ul>
        </div>
      </van-collapse-item>
    </van-collapse>

    <div v-else>
      <van-cell title="活动标签" class="van-hairline--bottom" title-style="max-width: 65px;" input-align="left">
          <div class="flex" style="text-align: left;flex-wrap: wrap;">
            <van-button style="margin: 4px;" v-for="(item,index) in tagList" :key="item.id" @click="clickTag(item)"  v-longtap="longtap(item,index)"
              :class="{selectedClass:item.selected,unselectClass:!item.selected}" round size="small">
              {{item.name}}
            </van-button>
            <div @click="tempText='';showAddTag=true"  style="padding-top: 5px;display: inline-block;">
              <img src="../../assets/img/pub/apptop_pub_ico_tianjia_nor.png" style="width: 25px;height: 23px;margin: 4px;">
            </div>
          </div>
      </van-cell>
    </div>

    <van-dialog v-model="showAddTag" show-cancel-button @confirm="addUserTag(tempText)" @cancel="tempText=''">
      <div style="width: 100%;height:45px;line-height: 45px;text-align: center;">新增标签</div>
      <van-field v-if="showAddTag" class="onepxitem" v-model="tempText" autofocus maxlength="12" />
    </van-dialog>
    <van-popup v-model="showDeleteTag">
      <div style="width: 150px;height: 40px;line-height: 40px;text-align: center;" @click="deleteUserTag(deleteItem)">
        删除
      </div>
    </van-popup>
  </div>
</template>

<script>
  import {
    checkLoginTime,removeEMOJI,removeSpecialCharacter
  } from '../../assets/js/utils'
  import {
    getUserTagList,
    deleteUserTag,
    addUserTag
  } from '../api/wuApi'

  export default {
    data() {
      return {
        activeNames: [],
        tagList: [],
        deleteItem: {},
        showDeleteTag: false,
        showAddTag: false,
        tempText: '',
        setSelectedItemFlag:false,
        setSelectedItemTags:''
      }
    },
    activated:function() {
      Object.assign(this.$data, this.$options.data());
    },
    methods: {
      setSelectedItem(tags){
        let arr = tags.split(',')
        if(this.tagList.length==0){
          this.setSelectedItemFlag = true
          this.setSelectedItemTags = tags
        }else{
          this.tagList.forEach(item=>{
            for (let i = 0; i < arr.length; i++) {
              if(arr[i]==item.name){
                // this.clickTag(item)
                this.$set(item, 'selected', true)
              }
            }
          })
          this.setSelectedItemFlag = false
        }
      },
      getSelectdItem(){
        return this.tagList.filter(item => item.selected)
      },
      getResult(){
        return this.computed_selectedTags
      },
      addUserTag(name){
        if(!name){
          this.showAddTag = false
          return
        }
        name = name.replace(/,/g,'，')
        name = removeEMOJI(name)
        addUserTag({userTagForm:{name:name},user:{roleId:this.dwRoleId}},(res)=>{
          if(res.success){
            this.showAddTag=false;
            // this.getUserTagList(this.dwRoleId)
          }else{
            this.$toast("新增标签失败！")
          }
        })
      },
      clickTag(item) {
        if (item.selected) {
          this.$set(item, 'selected', false)
        } else {
          this.$set(item, 'selected', true)
        }
        this.$emit("saveLabel",this.getResult())
      },
      longtap(item, index) {
        return () => {
          this.deleteItem = item
          this.deleteItem.index = index
          this.showDeleteTag = true;
        }
      },
      // getUserTagList(dwRoleId,setSelectedItemTags){
      //   if(!dwRoleId){
      //     return
      //   }
      //   if(this.tagList.length==0){
      //     getUserTagList({user:{roleId:dwRoleId}},(res)=>{
      //       this.tagList = res.data.filter((item)=>{
      //         let array = ['普通','亲子','旅游','情侣','图片','视频','直播','云客智播','长视频','音频','']
      //         return array.indexOf(item.name)==-1
      //       })
      //       if(setSelectedItemTags){
      //         this.setSelectedItem(setSelectedItemTags)
      //       }
      //     })
      //   }else{
      //     this.setSelectedItem(setSelectedItemTags)
      //   }
      // },
      getMoreTag(dwId){
        let that = this;
        moreTagListByDwId(dwId,(res)=>{
          // that.moreTagList = res
          console.log(res,'55559999')
        })
      },
      deleteUserTag(item){
        deleteUserTag({userTagForm:{id:item.id},user:{roleId:this.dwRoleId}},(res)=>{
          if(res.success){
            this.tagList.splice(item.index,1)
            this.showDeleteTag=false;
            // this.getUserTagList()
            this.$toast("删除成功")
          }else{
            this.$toast("删除失败")
          }
        })
      },
    },
    props: {
      dwRoleId: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: '活动标签'
      },
      defaultStyle:{
        type: Boolean,
        default: true
      },
      dwId:{
        type: String,
        default: ''
      },
    },
    watch:{
      // dwRoleId(nv,ov){
      //   if(nv){
      //     this.getUserTagList(nv)
      //   }
      // },
      tempText(nv,ov){
        if(nv){
          this.tempText = removeSpecialCharacter(nv,ov)
        }
      },
      dwId(nv,ov){
        if(nv){
          this.getMoreTag(nv)
        }
      },
    },
    model: {
      prop: 'show',
      event: 'close'
    },
    computed: {
      computed_selectedTags() {
        let array = this.tagList.filter(item => {
          if (item.selected)
            return item.name
        })
        array = array.map(item => {
          return item.name
        })
        return array.join('、')
      },
    }
  }
</script>

<style scoped>
  .tag {
    margin: 5px;
    background: #E3E3E3;
    padding: 5px;
    border-radius: 45%;
    color: #000;
  }

  ul,
  li {
    list-style: none;
    padding: 2px;
  }

  .slide-box {
    display: -webkit-box;
    overflow-x: auto;
    /*适应苹果*/
    -webkit-overflow-scrolling: touch;
  }

  .slide-item {}

  /*隐藏掉滚动条*/
  .slide-box::-webkit-scrollbar {
    display: none;
  }
  .selectedClass{
    background-color: #3298FF;color: #fff;
  }
  .unselectClass{
    background-color: #E3E3E3;
  }
</style>
