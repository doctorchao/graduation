<template>
  <div class="content_wrap">
    <!-- <NewHead leftText="商品属性设置" leftTextColor="black" @click-left="pageBack()"></NewHead> swipeable-->
    <ZjHead left-text="标签设置(长按拖动)" @click-left="cancelTag" right-text="保存" @click-right="confirmTag"></ZjHead>
    <div class="header_text_wrap">
      <div @click="editText=='编辑'?editTagCopy():complete()">
        <span class="right_text">{{editText}}</span>
      </div>
    </div>
    <div class="header_wrap flex-s" id="box">
      <template v-for="(item,index) in copyTagList">
        <div :key="index" class="tag_item_wrap">
          <div class="tag_item top_tag_border" v-longtap="editTag()" @click="isEdit?deleteCurrTag(index):''">
            <div class="tag_item_text">
              {{item}}
            </div>
            <img  class="tag_item_img" src="./img/delete.png" alt="" v-show="isEdit">
          </div>
        </div>
      </template>
    </div>
    <div class="middle_cell">
      <span>更多标签菜单</span>
    </div>
    <div class="footer_wrap flex-s">
      <template v-for="(item,index) in badTagList">
        <div :key="index" class="tag_item_wrap">
          <div class="tag_item bottom_tag_border" v-longtap="changeTag(index,item)" @click="addToShow(item,index)">
            <div class="tag_item_text">
              {{item}}
            </div>
          </div>
        </div>
      </template>
      <div class="tag_item add_tag_border" @click="addTag">
        <img src="./img/addItem.png" alt="">
        <div class="tag_add_text">
          添加
        </div>
      </div>
    </div>
    <van-popup v-model="showTagEdit" round style="width:90%">
      <div class="header_title">
        <span>活动分类标签</span>
      </div>
      <div class="input_field_wrap">
        <van-field v-model="tagName" placeholder="请输入标签名称" maxlength= 20 input-align="center" class="input_field"/>
      </div>
      <div class="select_wrap">
        <div class="select_text" @click="deleteTag()">
          <van-button type="default" class="select_button">删除此项</van-button>
        </div>
        <div class="middle_line"></div>
        <div class="select_text" @click="saveTag()">
          <van-button type="default" class="select_button" style="color:#3298FF">保存</van-button>
        </div>
      </div>
  </van-popup>
  </div>
</template>

<script>
    // import lccell from "./components/lc-cell";
    // import NewHead from "./components/NewHead";
    import ZjHead from '../../components/pub/NewHead'
    import Sortable from 'sortablejs';
    export default {
        data() {
            return {
                tabIndex:1,
                isShowMore:false,
                showTagEdit:false,
                isEdit:false,
                tagName:'',
                editText:'编辑',
                sortable:{},
                badTagList:[],
                lock:true,
                changeIndex:-1,
                issAddTag:false,
                copyTagList:[]
            }
        },
        methods: {
            confirmTag(){
              this.$emit('closed',true,this.copyTagList,this.badTagList)
            },
            cancelTag(){
              let that = this
              // that.$dialog.confirm({
              //   message: '是否保存'
              // }).then(() => {
              //   that.$emit('closed',true,this.copyTagList,this.badTagList)
              // }).catch(() => {
                that.initData()
                that.$emit('closed',false)
              // })
            },
            addTag(){
              this.showTagEdit = !this.showTagEdit
              this.issAddTag = true
              this.changeIndex = -1
            },
            saveTag(){
              if(this.tagName != ''){
                if(this.issAddTag){
                  this.issAddTag=false
                  if(this.badTagList.indexOf(this.tagName) ==-1 && this.copyTagList.indexOf(this.tagName) ==-1){
                    this.badTagList.push(this.tagName)
                    this.showTagEdit = !this.showTagEdit
                    this.tagName = ''
                  }else{
                    this.$toast('已存在同名标签')
                  }
                }else{
                  if(this.badTagList.indexOf(this.tagName) ==-1 && this.copyTagList.indexOf(this.tagName) ==-1){
                    console.log(11888)
                    this.badTagList[this.changeIndex] = this.tagName
                    this.showTagEdit = !this.showTagEdit
                    this.tagName = ''
                  }else{
                    this.$toast('已存在同名标签')
                  }
                }
              }else{
                this.$toast('标签名不能为空')
              }
            },
            deleteTag(){
              if(this.changeIndex != -1){
                this.badTagList.splice(this.changeIndex,1)
              }
              this.showTagEdit = !this.showTagEdit
            },
            changeTag(index,item){
              let that = this
              let callbackFunc=()=>{
                that.changeIndex = index
                that.tagName = item
                that.showTagEdit = !that.showTagEdit
              }
              return callbackFunc
            },
            addToShow(item,index){
              console.log('添加显示')
              this.copyTagList.push(item)
              this.badTagList.splice(index,1)
            },
            editTagCopy(){
              let that = this
              if(!that.isEdit){
                that.editText = '完成'
                that.isEdit = true
                let el = document.getElementById('box');
                that.sortable = Sortable.create(el,{
                  onEnd(val) {  //拖拽结束发生该事件
                    console.log(val,'变了')
                    let oldIndex = val.oldIndex;
                    let newIndex = val.newIndex;
                    let temp = that.copyTagList[oldIndex]
                    let newList = [...that.copyTagList]
                    newList.splice(oldIndex,1)
                    newList.splice(newIndex,0,temp)
                    that.copyTagList = [];
                    that.$nextTick(function () {
                      that.copyTagList = newList;
                    });
                  },
                });
              }
            },
            editTag(){
              let that = this
              let callbackFunc=()=>{
                if(!that.isEdit){
                  that.editText = '完成'
                  that.isEdit = true
                  var el = document.getElementById('box');
                  that.sortable = Sortable.create(el,{
                    onEnd(val) {  //拖拽结束发生该事件
                      console.log(val,'变了')
                      let oldIndex = val.oldIndex;
                      let newIndex = val.newIndex;
                      let temp = that.copyTagList[oldIndex]
                      let newList = [...that.copyTagList]
                      newList.splice(oldIndex,1)
                      newList.splice(newIndex,0,temp)
                      that.copyTagList = [];
                      that.$nextTick(function () {
                        that.copyTagList = newList;
                      });
                    },
                  });
                }
              }
              return callbackFunc
            },
            deleteCurrTag(index){
              console.log(this.copyTagList[index],'移出项目')
              if(this.copyTagList.length > 1){
                this.badTagList.unshift(this.copyTagList[index])
                this.copyTagList.splice(index,1)
              }else{
                this.$toast('请至少保留一个标签')
              }
            },
            complete(){
              this.isEdit = !this.isEdit
              this.editText = '编辑'
              this.sortable.destroy()
            },
            initData(){
              let that = this
              that.copyTagList = [...new Set(that.tagList)]
              if(that.moreTagList.unSortTagList){
                that.badTagList = [...new Set(that.moreTagList.unSortTagList)]
              }
            }
        },
        components: {
          ZjHead: ZjHead,
        },
        props:{
          tagList:{
            type:Array,
            default:[]
          },
          moreTagList:{
            type:Object,
            default:{}
          }
        },
        watch: {
          tagList(val){
            this.copyTagList = [...new Set(val)]
          },
          moreTagList(item){
            if(item.unSortTagList){
              this.badTagList = [...new Set(item.unSortTagList)]
            }
          }
        },
        created() {
          let that = this
          this.initData()
        }
    }
</script>

<style scoped>
    .content_wrap{
        background-color: #EBEBEB;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    * {
      -webkit-touch-callout:none;
      -webkit-user-select:none;
      -khtml-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none;
    }
    .header_text_wrap{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0.3rem 0.3rem;
    }
    .left_text{
      color: black;
      font-weight: 600;
    }
    .middle_text{
      color: #565656;
      font-size: 0.2rem;
      margin-left: 0.15rem;
    }
    .right_text{
      font-size: 0.28rem;
      color: #3298ff;
    }
    .flex-s{
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
    }
    .header_wrap{
      padding: 0 0.21rem 0.48rem;
      width: 100%;
      box-sizing: border-box;
    }
    .tag_item_wrap{
      width: 25%;
    }
    .tag_item{
      /* flex: 0 0 22%; */
      flex: 1;
      min-width: 1.2rem;
      height: 0.62rem;
      box-sizing: border-box;
      /* padding: 5px 10px; */
      margin: 5px;
      border: 1px solid #3298FF;
      text-align: center;
      border-radius: 0.62rem;
      position: relative;
    }
    .top_tag_border{
      border: 1px solid #3298FF;
      background-color: #E3F4FE;
    }
    .tag_item_text{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 0.62rem;
      font-size: 0.26rem;
      width: 80%;
      margin: 0 auto;
    }
    .tag_add_text{
      font-size: 0.26rem;
    }
    .tag_item_img{
        position: absolute;
        width: 16px;
        height: 16px;
        top: -7px;
        right: 0;
    }
    .middle_cell{
        background-color: #F3F3F3;
        height: 0.4rem;
        font-size: 0.2rem;
        line-height: 0.4rem;
        color: #565656;
        padding-left: 0.2rem;
    }
    .footer_wrap{
      padding: 0.16rem 0.21rem;
      width: 100%;
      box-sizing: border-box;
    }
    .bottom_tag_border{
      border: 1px solid #D2D2D2;
    }
    .add_tag_border{
      border: 1px solid #D2D2D2;
      background-color: #D2D2D2;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0;
    }
    .add_tag_border img{
      width: 15px;
      height: 15px;
      margin-right: 3px;
    }
    .header_title{
      height: 0.9rem;
      text-align: center;
      background-color: #F3F3F3;
      line-height: 0.9rem;
      font-size: 0.32rem;
    }
    .input_field_wrap{
      height: 2.2rem;
      position: relative;
      width: 100%;
    }
    .input_field{
      /* width: 100%; */
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .select_wrap{
      height: 0.87rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex: auto;
      background-color: #F3F3F3;
      border-top: 0.5px solid #ebebeb;
    }
    .middle_line{
      height: 0.87rem;
      width: 1px;
      background-color: #ebebeb;
    }
    .select_text{
      line-height: 0.87rem;
      /* width: 150px; */
      width: 50%;
      text-align: center;
      height: 100%;
    }
    .select_button{
      background-color: #FEFDF9;
      border: none;
      width: 99%;
      height: 98%;
    }
</style>
