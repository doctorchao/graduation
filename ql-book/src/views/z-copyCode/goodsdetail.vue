<template>
	<div class="gd_container">
		<!-- 头部 -->
		<header class="gd_head">
			<!-- 左侧按钮 -->
			<div @click="pageBack()" class="gd_head_left">
				<img src="../../../assets/img/pub/shareshop_ico_goback64_nor.png" class="gd_head_left_icon" />
			</div>
			<!-- 右侧按钮 -->
			<div class="gd_head_right">
				<img @click="goodsCollect(goodsId)" v-if="!isCollect" src="../../../assets/img/shopManage/goods/shareshop_ico_love64_nor.png" class="gd_head_right_icon" />
				<img @click="goodsCollect(goodsId)" v-else src="../../../assets/img/shopManage/goods/shareshop_ico_love64_sel.png" class="gd_head_right_icon" />
				<img @click="showMoreList" src="../../../assets/img/goods/shareshop_ico_fx64_sel.png" class="gd_head_right_icon" />
				<div @click="showMore = false" v-if="showMore" class="gd_head_right_list">
          <template v-if="bottomBtnFlag">

          </template>
          <template v-else>
            <div @click="shareGoods" class="gd_head_right_item click-color">
            	<img src="../../../assets/img/shopDetail/rightshare_ico_wx.png" />
            	<span>分享给微信好友</span>
            </div>
            <div @click="show_FriendList = true" style="border-top: .5px solid #ebebeb" class="gd_head_right_item click-color">
            	<img src="../../../assets/img/shopDetail/rightshare_ico_zj.png" />
            	<span>分享给智加好友</span>
            </div>
            <div @click="" style="border-top: .5px solid #ebebeb" class="gd_head_right_item click-color">
            	<img src="../../../assets/img/pub/pub_ico_share.png" />
            	<span v-if="shyFlag==1 || true" @click="$refs.goodsReport.showActions=true">审查</span><!--  -->
            </div>

            <div @click="" style="border-top: .5px solid #ebebeb" class="gd_head_right_item click-color">
            	<img src="../../../assets/img/pub/pub_ico_share.png" />
            	<span v-if="true" @click="$refs.goodsReport.showJBContent=true">审查2</span>
            </div>

            <div @click="" style="border-top: .5px solid #ebebeb" class="gd_head_right_item click-color">
            	<img src="../../../assets/img/pub/pub_ico_share.png" />
            	<span v-if="shyFlag==-1 || true" @click="$refs.goodsReport.showReport=true">举报</span>
            </div>

            <div @click="" style="border-top: .5px solid #ebebeb" class="gd_head_right_item click-color">
            	<img src="../../../assets/img/pub/pub_ico_share.png" />
            	<span v-if="true" @click="$refs.goodsReport.showRecheckGoods=true">申诉</span>
            </div>

            <div v-if="user.id == goods.userId"  @click="askFriendToshare(goods.shopId)" style="border-top: .5px solid #ebebeb" class="gd_head_right_item click-color">
            	<img src="../../../assets/img/pub/pub_ico_share.png" />
            	<span>邀请好友加分享</span>
            </div>
          </template>
				</div>
			</div>
		</header>
		<!-- 主体 -->
		<section style="padding-bottom: 2.8rem" class="gd_main">
			<!-- 商品图片 -->
			<goods-image
				:goods-id="goodsId"
				:info="images"
			/>
			<div class="gd_goods_recommend">
				<goods-recommend :count="recommend" :goods="goods" v-model="isRecommend" />
			</div>
			<!-- 商品基本信息 -->
			<goods-info
				:info="goods"
			/>
			<!-- 购物保障 -->
			<goods-security
				v-show="goodsItem.indexOf('3') != -1"
				:goods-id="goodsId"
				:security="security"
			/>
			<!-- 票券时间座位选择 -->
			<div v-show="showDate" style="padding: 12px;background-color:white">
				<div style="display: flex;justify-content: space-between;align-items: center;">
					<span>请选择时间</span>
					<div @click="showChooseDate">
						<span style="font-size: 11px;color: #bebebe;">更多</span>
					</div>
				</div>
			</div>
			<!-- 商品套餐 -->
			<goods-package
				ref="goodsPackage"
				v-show="goodsItem.indexOf('2') != -1"
				:goods-id="goodsId"
				:goods="goods"
				:friend="selectedFriend"
				@changeOrderCount="$refs.goodsTabbar.queryOrdersCar()"
        :sinceAddressJSON="sinceAddressJSON"
			/>
			<!-- 产品参数 -->
			<goods-params
				v-show="goodsItem.indexOf('0') != -1"
				:goods-id="goodsId"
			/>
			<!-- 资质认证 -->
			<goods-rz
				v-show="goodsItem.indexOf('6') != -1"
				:goods-id="goodsId"
			/>
			<!-- 收费标准 -->
			<goods-standard
				v-show="goodsItem.indexOf('5') != -1"
				:goods-id="goodsId"
				:sfbz="goods.saleStandard"
			/>
			<!-- 经营方式 -->
			<goods-service
				v-show="goodsItem.indexOf('4') != -1"
				:info="goods"
			/>
			<!-- 评论 -->
			<goods-comment
				:info="JSON.stringify(comments)"
				:showComment="goodsItem.indexOf('7') != -1"
				:showQuestion="goodsItem.indexOf('8') != -1"
			/>
			<!-- 店介 -->
			<shop-detail
				v-show="goodsItem.indexOf('9') != -1"
				:info="shop"
				:goods-count="goodsCount"
			/>
			<!-- 产品说明 -->
			<div v-show="goodsItem.indexOf('1') != -1" class="goods_explain_title">
				<span>——</span>
				<span class="title">详情</span>
				<span>——</span>
			</div>
			<goods-detail
				v-show="goodsItem.indexOf('1') != -1"
				:content="goods.details"
			/>
			<!-- 商品推荐 -->
			<best-goods
				v-show="goodsItem.indexOf('11') != -1"
				:info="bests"
				:goods-id="goodsId"
				:shop-id="selectedFriend.sid?selectedFriend.sid:goods.shopId"
			/>

		</section>
		<ShareGoodsToFriend v-model="showShareGoods" :goods-id="goodsId"/>
		<!-- 分享优惠 -->
		<Fxyh :shopId="goods.shopId" :goodsId="goodsId" :goods="goods" @change="changeOffer" @selfPriceData="getSelfPriceData" v-if="showFxyh" />
		<!-- 底部 -->
		<footer class="gd_foot">
			<GoodsTabbar ref="goodsTabbar" :shopId="goods.shopId" :user="user" :goods="goods" 	@open-package="openPackage" />
		</footer>

    <FriendList v-model="show_FriendList" roleid="" @confirmSelectFriend="confirmSelectFriend">
    </FriendList>

    <GoodsReport ref="goodsReport" :goods="goods"></GoodsReport>


		<wx-share-tips v-model="showWxTips"/>
		<van-popup v-model="chooseDate" position="bottom" @closed="closePop">
            <div class="pop-date-wrap">
                <div class="title-wrap">
                    <div class="title-left">
                        <img src="./img/Cristal1.jpg" alt="">
                    </div>
                    <div class="title-right">
                        <div class="title-text">
                            <span>[张家界大峡谷-大门票+玻璃桥+游览车票]旅游景点门票-成人票</span>
                        </div>
                        <div class="rest-num">
                            <span>库存85465件</span>
                        </div>
                    </div>
                </div>
                <div class="scroll-wrap">
                    <div>
                        <span style="color:#282828;font-size:13px">请选择时间</span>
                    </div>
                    <div style="border-bottom:1px solid #ebebeb">
                        <van-tabs swipeable sticky v-model="tabIndex">
                            <van-tab v-for="index in 12" :key="index" :title="((month[index-1])<=12)?`${month[index-1]}月`:`${month[index-1]-12}月`">
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
                                        <div v-for="(item,index1) in allDays[index-1]" :key="index1" :class="active == index1 ?'day-item-wrap day-item-active':'day-item-wrap'" @click="setting(index1,item.date,item.price)">
                                            <div class="day-item" v-if="item">
                                                <div class="item-festival fixed-h">
                                                    <div>{{item.festival}}</div>
                                                </div>
                                                <div class="item-day fixed-h">
                                                    <div>{{item.day}}</div>
                                                </div>
                                                <div class="item-price fixed-h">
                                                    <div v-show="item.price">￥{{item.price}}</div>
                                                </div>
                                                <div class="item-tikNum fixed-h">
                                                    <div v-show="item.tikNum">余{{item.tikNum}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </van-tab>
                        </van-tabs>
                    </div>
                    <div class="tips-wrap">
                        <div class="tips-header">
                            <span>服务项目说明</span>
                        </div>
                        <div class="tips-body">
                            <div><span>服务项目名称：景点门票</span></div>
                            <div><span>使用次数：1次 早上8:30-晚上10:30</span></div>
                            <div><span>指定日期当天有效</span></div>
                            <div><span>事项说明：缆车一次最多只能2人，一人一票</span></div>
                            <div><span>天上的星星不说话</span></div>
                            <div><span>地上的娃娃想妈妈</span></div>
                        </div>
                    </div>
                    <div class="pick-goods">
                        <div class="pick-text">提货方式</div>
                        <div class="pick-tag">
                            <div><span>电子票券</span></div>
                        </div>
                    </div>
                    <div class="buy-number tik-flex-c">
                        <div>购买数量</div>
                        <div>
                            <van-stepper v-model="buyNumber" min="1"/>
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="chooseSeat" position="bottom" @closed="closePop">
            <div class="header-wrap">
                <div style="padding:10px">
                    <span>请选择位置</span>
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
								{{item.row}}
							</div>
						</div>
						<div class="right-wrap">
							<div v-for="num in item.number" :key="num">
								<!-- <div class="seat-item" @click="pickSeat">
									<img src="./img/seat_emp.png" alt="">
									<span class="seat-number">{{num}}</span>
								</div> -->
								<div class="seat-item" v-if="exist.indexOf(`${item.row}-${num}`) != -1">
									<img src="./img/seat_dis.png" alt="">
									<span class="seat-number">{{num}}</span>
								</div>
								<div class="seat-item" @click="noPickSeat(`${item.row}-${num}`,tDate)" v-else-if="seats.indexOf(`${item.row}-${num}`) != -1">
									<img src="./img/seat_sel.png" alt="">
									<span class="seat-number">{{num}}</span>
								</div>
								<div class="seat-item" @click="pickSeat(`${item.row}-${num}`)" v-else>
									<!-- // v-if="(seats.indexOf(`${item.row}-${num}`) == -1)&&(exist.indexOf(`${item.row}-${num}`) == -1)" -->
									<img src="./img/seat.png" alt="">
									<span class="seat-number">{{num}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        </van-popup>
	</div>
</template>

<script>

	import { isNotEmptyStr,getUUID } from '../../../assets/js/assist'
	import { queryGoodsItem ,goodsCollect, queryGoodsCollect, goodsInfo, resultSecurity, bestGoods, store, goodsFriendsRecommendCount, queryFriendsRecomendGoods, sendGoodsToFriend,getztaddress } from '../../api/goodsApi'
	import { queryShop } from '../../api/shopApi'
  import { makeFriend } from '../../api/friendApi'
	import { orderPjList, addOrdersCar, submitOrders } from '../../api/orderApi'
  import { queryIdentOfCurrentInCheckGroup } from '../../api/goodsReportApi'
	import { wxShareFriend } from '../../../assets/js/wxJsInterface'
	import { checkLoginTime,validateRequest } from '../../../assets/js/utils'
	import GoodsImage from '../../../components/goods/Imgs'
	import GoodsInfo from '../../../components/goods/BaseInfo'
	import GoodsSecurity from '../../../components/goods/Security'
	import GoodsPackage from '../../../components/goods/Package'
	import GoodsParams from '../../../components/goods/Params'
	import GoodsRz from '../../../components/goods/Zzrz'
	import GoodsDetail from '../../../components/goods/Explain'
	import GoodsStandard from '../../../components/goods/Sfbz'
	import GoodsService from '../../../components/goods/Service'
	import GoodsComment from '../../../components/goods/Comment'
	import ShopDetail from '../../../components/goods/ShopDetail'
	import BestGoods from '../../../components/goods/BestGoods'
	import Fxyh from '../../../components/goods/Fxyh'
	import GoodsTabbar from '../../../components/goods/GoodsTabbar'
  import FriendList from '../../../components/shop/FriendList'
	import GoodsRecommend from '../../../components/goods/GoodsRecommend'
	import ShareGoodsToFriend from '../../shop/shopManage/goods/ShareGoodsToFriend'
	import properties from '../../../../config/properties'
	import ShopShareSelectShop from '../../shop/shopExten/ShopShareSelectShop'
	import WxShareTips from '../../base/WxShareTips'
  import GoodsReport from './component/GoodsReport'
  import { tAllInfoGet, seatListGet, seatSavePost } from '../../api/ticketsApi'

	export default {
		data() {
			return {
				// 商品显示选项
				goodsItem: [],
				// 是否收藏
				isCollect: false,
				// 商品图片
				images: [],
				// 商品信息
				goods: {},
				// 购物保障列表
				security: [],
				// 评论
				comments: {},
				// 店铺信息
				shop: {},
				// 商品推荐
				bests: [],
				// 用户信息
				user: {},
				// 商品数量
				goodsCount: 0,
				orders: {},
				// 选中的好友优惠
				selectedFriend: {},
				orderGoods: {},
				recommend: 0,
				isRecommend: 'true',
				showMore: false,
				showShareGoods: false,
				show_FriendList: false,
				showWxTips: false,
				//自己购买的价格
				selfPriceData:{},
				bottomBtnFlag : false,
				sinceAddressJSON:{},
				shyFlag:-1,
				showFxyh:true,
				showDate:false,
				tickets:{},
				chooseDate:false,
				tabIndex:0,
				show: true,
				year:[],
				month: [0],
				active:-1,
				allDays:[],
				empty: [0],
				chooseSeat:false,
				buyNumber:1,
				rowSeat:[],
				exist:[],
				tDate:'',
				tMoney:0,
				isPick:false,
				seats:[],
				tiketUserId:'35',
				tdateId:'',
				allTickets:[]
			}
		},
		methods: {
      getSelfPriceData(info){
        this.selfPriceData = Object.assign({},info)
      },
			askFriendToshare(shopId){
				validateRequest(shopId,"AWZPTXDK",()=>{
				this.showShareGoods = true
				})
			},
			pickSeat(val){
				this.seats.push(val)
				var obj = new Object()
				obj.seatStr = val
				obj.tDate = this.tDate
				obj.tdateId = this.tdateId
				obj.tinfoId = this.tickets.ticketInfo.id
				obj.tseatMoney = this.tMoney
				obj.userId = this.tiketUserId
				this.allTickets.push(obj)
			},
			noPickSeat(val,date){
				this.seats = this.seats.filter((item)=>{
					return item != val
				})
				this.allTickets = this.allTickets.filter((item1)=>{
					return !((item1.tDate == date)&&(item1.seatStr == val))
				})
			},
			shareGoods(){
				let that = this;
        let key = "GOODSDETAILS-"+getUUID()
				let link = `${properties.shortAPI}/i/m#${that.goods.id}?senderRoleId=${that.user.role_id}&key=${key}`
        console.log(link)
				if(window.JsInterface) {
          let t = Number(Number(that.goods.salesPrice) - Number(that.goods.friendPrice)).toFixed(2)
          let senderRoleName = checkLoginTime().username
          let imgUrl = that.goods.goodsImg.split(',').length>0?that.goods.goodsImg.split(',')[0]:that.goods.goodsImg
					window.JsInterface.shareLink(`[${senderRoleName}]推荐给您的好货，快去看看，选他买省钱…`, `${that.goods.goodsName}/原价:${that.goods.salesPrice}元/选他买省:${t}元>>`,imgUrl, link)
				}else if(window.webkit )
         {
           let t = Number(Number(that.goods.salesPrice) - Number(that.goods.friendPrice)).toFixed(2)
           let title =  checkLoginTime().username +"推荐给您的好货，快去看看，选他买省钱…";
           let content = that.goods.goodsName +"/原价:$"+that.goods.salesPrice+"元/选他买省:$"+t+"元>>";
            let image = that.goods.goodsImg.split(',').length>0?that.goods.goodsImg.split(',')[0]:that.goods.goodsImg
           window.webkit.messageHandlers.shareWX.postMessage({title:title,content:content,image:image,url:link});
         }else {
					that.showWxTips = true;
				}
			},
			initData(){
				let that = this;
				Object.assign(this.$data, this.$options.data())
			},
			showMoreList() {
				let that = this;
				try{
					that.showMore = !that.showMore
				}catch(err) {
					alert(err)
				}
			},
			// 仓库接口
			store(info, status){
				let that = this;
				store(info, (res) => {
					if(res.code == 0){
						that.goodsCount = res.data.totalCount;
						that.loading.clear();
					}else{
						that.$toast.fail(res.msg);
					}
				})
			},
			// 查询商品显示项接口
			queryGoodsItem(id, status){
				let that = this;
				that.goodsItem = [];
				queryGoodsItem({goodsId: id}, (res) => {
					if(res.code == 0){
						for(let val of res.data){
              if(val.itemName!='9'){
                that.goodsItem.push(val.itemName)
              }else{
                if(val.goodsId == val.baseGoodsId){
                  that.goodsItem.push(val.itemName)
                }
              }
						}
						if(status){
							that.queryGoodsCollect(id, status)
							that.goodsInfo(id, status);
              window.scrollTo(0, 0)
						}
					}else{
						that.$toast.fail(res.msg)
					}
				})
			},
			// 查询收藏状态接口
			queryGoodsCollect(id, status) {
				let that = this;
				queryGoodsCollect({goodsId: id}, (res) => {
					if(res.code == 0){
						that.isCollect = res.data;
						// if(status){
						// 	that.goodsInfo(id, status);
						// }
					}else{
						// that.$toast.fail(res.msg)
					}
				})
			},
			// 商品收藏接口
			goodsCollect(id){
				let that = this;
				goodsCollect({goodsId: id}, (res) => {
					if(res.code == 0){
						that.$toast.success(res.data);
						that.isCollect = !that.isCollect;
					}else{
						// that.$toast.success(res.msg)
					}
				})
			},
			// 获取商品信息接口
			goodsInfo(id, status){
				let that = this;
        that.loading = that.$toast.loading({
        	mask: true,
        	message: '加载中...',
        	duration: 3000
        })
				that.images = [];
				goodsInfo({goodsId: id, token: checkLoginTime().access_token}, (res) => {
					try{
						if(res.code == 0){
              that.loading.clear();
							that.goods = res.data;

              if(this.$route.query.showActions){
                this.$refs.goodsReport.showActions=true
                this.showFxyh = false
              }else if(this.$route.query.showJBContent){
                this.$refs.goodsReport.showJBContent=true
                this.showFxyh = false
              }

              // getztaddress({token:checkLoginTime().access_token,userId:that.goods.userId},(res)=>{
              //   debugger
              //   if(res.code==0){
              //   }
              // })
							that.goods.goodsType = that.goods.goodsShowType.split('=')[0];
							if(isNotEmptyStr(that.goods.images)) {
								for(let val of that.goods.images.split(',')) {
									that.images.push({url: val});
								}
							}else {
								that.images = [];
							}
							if(status){
								that.resultSecurity(id, status);
							}
              if(window.navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1) {
              	let imageUrl = 'https://python-server.oss-cn-shenzhen.aliyuncs.com/app_mrtx_share.png';
              	if(isNotEmptyStr(that.goods.images)) {
              		imageUrl = that.goods.images.split(',')[0];
              	}
                let t = Number(Number(that.goods.salesPrice) - Number(that.goods.friendPrice)).toFixed(2)
                let senderRoleName = checkLoginTime().username
                let imgUrl = that.goods.goodsImg.split(',').length>0?that.goods.goodsImg.split(',')[0]:that.goods.goodsImg
              	wxShareFriend(properties.vueDomainName,`[${senderRoleName}]推荐给您的好货，快去看看，选他买省钱…`,`${that.goods.goodsName}/原价:${that.goods.salesPrice}元/选他买省:${t}元>>`, imgUrl ,window.location.href)
			  }
			  				that.getTicket(that.goods.goodsCode)
						}else{
							that.$toast.fail(res.msg)
						}
					} finally {
						that.loading.clear();
					}

				})
			},
			// 获取票券信息
			getTicket(goodsCode){
				console.log(goodsCode,'商品码')
				let that = this
				tAllInfoGet(goodsCode,(res)=>{
					console.log(res,'查询主票和座位信息')
					if(res.code == '0'){
						var ticketArr = res.data
						ticketArr.ticketDates.forEach(item =>{
							if(item.seatSet){
								item.seatSet = JSON.parse(item.seatSet)
							}
						})
						that.tickets = ticketArr
						if(ticketArr.ticketInfo.tType == '0'){
							that.showDate = true
						}
						// that.$nextTick(()=>{
						// 	seatListGet(item.id,that.tickets.ticketInfo.id,(response)=>{
						// 		console.log(response,'获取占位列表信息')
						// 		if(response.code == '0'){
						// 			var arr =  []
						// 			res.data.forEach((val)=>{
						// 				if(val.seatStr){
						// 					arr.push(val.seatStr)
						// 				}
						// 			})
						// 			that.exist = arr
						// 		}else{
						// 			that.$toast.fail(response.msg);
						// 		}
						// 	})
						// })
					}else{
						that.$toast.fail(res.msg);
					}
				})
			},
			// 获取购物保障
			resultSecurity(id, status){
				let that = this;
				resultSecurity({goodsId: id}, (res) => {
					if(res.code == 0){
						that.security = res.data;
						if(status){
							let info = {};
							info.shopId = that.goods.shopId;
							info.goodsId = that.goods.id;
							info.page = 1;
							info.limit = 1;
							that.orderPjList(info, status)
						}
					}else{
						that.$toast.fail(res.msg)
					}
				})
			},
			// 订单评价列表接口
			orderPjList(info, status){
				let that = this;
				orderPjList(info, (res) => {
					if(res.code == 0){
						if(res.data.totalCount == 0){
							res.data.page = [];
						}
						that.comments.totalCount = res.data.totalCount;
						that.comments.comment = res.data.page[0];
						that.comments.goodsId = that.goodsId;
						that.comments.shopId = that.goods.shopId;
						if(status){
							that.queryShop(status);
						}
					}else{
						that.$toast.fail(res.msg)
					}
				})
			},
			// 查询店铺接口
			queryShop(status){
				let that = this;
				queryShop({shopId: that.goods.shopId}, (res) => {
					if(res.code == 0){
						that.shop = res.data[0];
						if(status){
							// that.bestGoods(that.goods.shopId, status);
						}
					}else{
						that.$toast.fail(res.msg)
					}
				})
			},
			// 加入购物车接口
			addOrdersCar(info,type){
				let that = this;
				const loading = that.$toast.loading({
					mask: true,
					message: '正在加入购物车',
					duration: 10000
				})
        debugger
				addOrdersCar(info, (res) => {
					if(res.code == 0){
						loading.clear();
						if(type == 0){
							that.$toast.success('加入购物车成功');
							that.$refs.goodsTabbar.queryOrdersCar();
						}else{
							let sid = that.selectedFriend.sid?that.selectedFriend.sid:that.goods.shopId;
							// that.pageTo('/orderBuy/'+sid, true)
              that.pageTo(`/orderBuy/${sid}?selectedGoodsId=${info.sourceId}`,true)
						}
					}else{
						that.$toast.fail(res.msg)
					}
				})
			},
			// 生成订单接口
			submitOrders(info) {
				let that = this;
				submitOrders({sources: info}, (res) => {
					const loading = that.$toast.loading({
						mask: true,
						message: '正在生成订单...',
						duration: 10000
					})
					try{
						if(res.code == 0) {
							that.pageTo('/payment/'+res.data[0].orderNo)
						}else{
							that.$toast.fail(res.msg)
						}
					} finally{
						loading.clear();
					}
				})
			},
			// 商品推荐接口
			bestGoods(id, status){
				let that = this;
				that.bests = [];
				bestGoods({shopId: id}, (res) => {
					if(res.code == 0){
						for(let val of res.data){
							if(isNotEmptyStr(val.imgList)){
								val.imgList = val.imgList.split(',')[0];
							}else{
								val.imgList = require('../../../assets/img/pub/fabu_ico_loading.png')
							}
							that.bests.push(val)
						}
						if(status){
							let info = {};
							info.shopId = that.goods.shopId;
							info.type = 2;
							info.page = 1;
							info.limit = 1;
							that.store(info);
						}
					}else{
						that.$toast.fail(res.msg)
					}
				})
			},
			// 点击加入购物车  打开套餐弹出层
			openPackage(type){
				var params = JSON.stringify(this.allTickets)
				seatSavePost(params,(res)=>{
					console.log(res,'占位信息保存')
				})
        debugger
				let that = this;
        let sinceAddressJSON={}
        if(that.goods.sinceAddress){
          sinceAddressJSON = {
            id:that.goods.sinceAddress,
            info:{
              position:{
                address:that.goods.sinceAddressText
              }
            }
          }
          this.sinceAddressJSON = sinceAddressJSON
        }

				if(that.goodsItem.indexOf('2') != -1 && !Object.keys(that.orders).length){
					that.$refs.goodsPackage.popup.showSku = true
				}else if(that.goodsItem.indexOf('2') == -1 && !Object.keys(that.orders).length){
					let info = {};
          let json = {}
					info.sourceId = that.goods.id;
					info.sourceName = that.goods.goodsName;
					info.count = 1;
					info.flag = that.goods.id;

          if(!that.selectedFriend.fid){
            that.selectedFriend = Object.assign({},that.selfPriceData)
          }
          if(that.selectedFriend.uid){
            json.showSelfPrice = true
            json.selfPriceData = that.selfPriceData
          }else{
            json.hyjsData=that.selectedFriend
            json.showSelfPrice = false
          }
          if(that.goods.sinceAddress){
            json.sinceAddressJSON = sinceAddressJSON
          }
          info.cacheData = JSON.stringify(json)
          if(that.selectedFriend.uid){
            info.hyjs = ''
          }else{
            info.hyjs = that.selectedFriend.fid
          }
					that.addOrdersCar(info, type?1:0);
				}
			},
			changeOffer(info) {
				let that = this;
				that.selectedFriend = info;
			},
			goodsFriendsRecommendCount() {
				let that = this;
				goodsFriendsRecommendCount({goodsId: that.goodsId}, (res) => {
					if(res.code == 0) {
						that.recommend = res.data;
						that.queryFriendsRecomendGoods();
					} else {
						that.$toast.fail(res.msg)
					}
				})
			},
			queryFriendsRecomendGoods() {
				let that = this;
				queryFriendsRecomendGoods({goodsId: that.goodsId, userId: checkLoginTime().id}, (res) => {
					if(res.code == 0) {
						that.isRecommend = res.data;
					} else {
						that.$toast.fail(res.msg)
					}
				})
			},
			confirmSelectFriend(userIds) {
				let that = this;
				sendGoodsToFriend({token: checkLoginTime().access_token, formUser: checkLoginTime().id, userIds:userIds.join(','), goodsId: that.goodsId}, (res) => {
					if(res.code == 0) {
						that.$toast.success('已分享商品给好友！')
					} else {
						that.$toast.fail(res.msg)
					}
				})
			},
      //进入该页面的当前角色自动和该商品的店铺角色  成为好友关系
      autoBeFriend(senderRoleId,key) {
        // 如果是微信 点开该页面  先取到微信用户信息 点击加分享， 取到微信用户的所有店
        // if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {}
          setTimeout(async () => {
            makeFriend({
              "role_token": this.user.role_id,
              "role_no_token": senderRoleId,
              "key":key
            }, (res) => {})
          }, 10);
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
				if(nowMonth+1+val<=12){
					this.month[val] = nowMonth+1+val
					this.year[val] = now.getFullYear()
				}else{
					this.month[val] = nowMonth+1+val-12
					this.year[val] = now.getFullYear()+1
				}
				this.empty[val] = firstDay - 1
				var arr = new Array(date.getDay())
				for(let i = 1;i<=day.getDate();i++){
					const obj2 = new Object()
					obj2.day = i
					obj2.date = `${this.year[val]}-${this.month[val]}-${i}`
					// console.log(obj2)
					arr.push(obj2)
				}
				this.allDays[val] = arr
			},
			showChooseDate(){
				let that = this
				this.chooseDate = !this.chooseDate
				this.allDays.forEach((month)=>{
					month.forEach((day)=>{
						that.tickets.ticketDates.forEach((item)=>{
							if(item.tDate == day.date){
								day.price = item.tMoney
								day.tikNum = item.remainNum
							}
						})
					})
				})
			},
			setting(index,date,price){
				let that = this
				this.seats = []
				if(price){
					this.active = index
					this.tDate = date
					this.tMoney = price
					this.chooseSeat = !this.chooseSeat
					this.tickets.ticketDates.forEach((item)=>{
						if(item.tDate == date){
							this.rowSeat = item.seatSet
							this.tdateId = item.id
							seatListGet(that.tickets.ticketInfo.id,item.id,(response)=>{
								console.log(response,'获取占位列表信息')
								if(response.code == '0'){
									var arr =  []
									response.data.forEach((val)=>{
										if(val.seatStr){
											arr.push(val.seatStr)
										}
									})
									that.exist = arr
								}else{
									that.$toast.fail(response.msg);
								}
							})
						}
					})
				}else{
					this.$toast('该日暂未开放购票')
				}
				
			},
			closePop(){
				this.active = -1
			},
		},
		components:{
			GoodsImage: GoodsImage,
			GoodsInfo: GoodsInfo,
			GoodsSecurity: GoodsSecurity,
			GoodsPackage: GoodsPackage,
			GoodsParams: GoodsParams,
			GoodsRz: GoodsRz,
			GoodsStandard: GoodsStandard,
			GoodsService: GoodsService,
			GoodsComment: GoodsComment,
			ShopDetail: ShopDetail,
			BestGoods: BestGoods,
			Fxyh: Fxyh,
			GoodsTabbar: GoodsTabbar,
      FriendList:FriendList,
			GoodsDetail: GoodsDetail,
			GoodsRecommend: GoodsRecommend,
			ShareGoodsToFriend: ShareGoodsToFriend,
			ShopShareSelectShop: ShopShareSelectShop,
			WxShareTips: WxShareTips,
      GoodsReport:GoodsReport
		},
		props: {
			goodsId: {
				type: String,
				default: ''
			}
		},
		watch: {
			goodsId(newValue, oldValue) {
				let that = this;
				that.initData();
				that.queryGoodsItem(newValue, 1);
			},
		},
		activated() {
			let that = this;
			that.queryGoodsItem(that.goodsId, 1);
      // that.goodsInfo(that.goodsId, 1);
      if(checkLoginTime().id){
        that.user = checkLoginTime();
        that.goodsFriendsRecommendCount();
        if (this.$route.query.senderRoleId) {
          console.log("自动加好友")
          this.autoBeFriend(this.$route.query.senderRoleId,this.$route.query.key)
        }
        queryIdentOfCurrentInCheckGroup({},(res)=>{
          console.log(res)
          if(res.code==0){
            if(res.data.ident>0){
              this.shyFlag =  1
            }
          }
        })
	  }
			for(let i = 0; i<12; i++){
				this.calendar(i)
			}
		},
	}
</script>

<style scoped>
	.gd_container{
		background-color: #ebebeb;
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;
		width: 100%;
		height: 100%;
	}
	.gd_head{
		position: fixed;
		width: 100%;
		display: -webkit-flex;
		display: flex;
		align-items: center;
		z-index: 999;
		top: 0;
	}
	.gd_head img{
		height: 0.7rem;
		margin: 10px;
	}
	.gd_head .gd_head_left{
		flex-grow: 1;
	}
	.gd_head .gd_head_right_list {
		background-color: #f3f3f3;
		min-width: 2rem;
		border-radius: 5px;
		font-size: .28rem;
		position: absolute;
		right: 10px;
	}
	.gd_head .gd_head_right_list .gd_head_right_item{
		height: .9rem;
		line-height: .9rem;
		text-align: center;
		padding: 0 .2rem;
	}
	.gd_head_right_item img{
		width: .6rem;
		height: .6rem;
		margin: 0;
		vertical-align: middle;
	}
	.gd_head_right_item span{
		vertical-align: middle;
	}
	.gd_main{
		margin-bottom: 2.2rem;
		position: relative;
	}
	.goods_explain_title{
		text-align: center;
		padding: 5px 0;
	}
	.goods_explain_title span{
		font-size: 14px;
		color: #909090;
	}
	.goods_explain_title .title{
		font-size: 14px;
		color: #282828;
	}
	.gd_foot{
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9;
	}
	.gd_goods_recommend{
		top: 5rem;
		right: 1.7rem;
		background-color: transparent;
		position: absolute;
		z-index: 1;
	}
	/* .gd_goods_collect {
		top: 5.2rem;
		left: .2rem;
		background-color: transparent;
		position: absolute;
		z-index: 1;
	}
	.gd_goods_collect img {
		width: .7rem;
		height: .7rem;
	} */
	.pop-date-wrap{
        padding: 0 12px;
        height: 100%;
        overflow: hidden;
    }
    .title-wrap{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        z-index: 9999;
        background-color: white;
    }
    .gd_container /deep/ .van-hairline--top-bottom::after{
        border: none;
    }
    .van-popup{
        /* overflow: visible; */
        max-height:80%
    }
    .title-right{
        margin-left: 15px;
        height: 65px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px 0 20px 0; 
    }
    .title-left img{
        width: 115px;
        height: 115px;
        float: left;
        margin-top: -40px;
        border-radius: 10px;
    }
    .title-text{
        font-weight: 600;
    }
    .rest-num{
        color: #565656;
        font-size: 13px;
    }
    .gd_container /deep/ .van-tab{
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
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width: 45px;
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
    .scroll-wrap{
        height: 100%;
        overflow-y: auto;
        margin-top: 100px;
        -webkit-overflow-scrolling:touch
    }
    .flex-row{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header-bottom{
        margin: 20px auto;
    }
    .seat-img{
        font-size: 9px;
    }
    .seat-img img{
        width: 22px;
        height: 22px;
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
        vertical-align: bottom;
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
    .seat-item{
        position: relative;
    }
    .seat-number{
        position: absolute;
        font-size: 8px;
        color: white;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0 auto;
        min-width: 10px;
        height: 10px;
        text-align: center;
    }
    .tips-wrap{
        padding: 12px 3px;
        font-size: 10px;
        color: black;
        line-height: 1.5;
        border-bottom:1px solid #ebebeb
    }
    .tips-header{
        font-size: 13px;
        color: #282828;
    }
    .tips-body{
        padding: 7px;
    }
    .pick-goods{
        padding: 10px 3px;
        border-bottom:1px solid #ebebeb
    }
    .pick-goods .pick-text{
        font-size: 13px;
        color: #282828;
        margin-bottom: 13px;
    }
    .pick-goods .pick-tag{
        font-size: 12px;
        color: #FF5300;
        background-color: #F9EDE1;
        width: 95px;
        height: 30px;
        text-align: center;
        border: 0.5px solid #FF5300;
        border-radius: 5px;
        line-height: 30px;
    }
    .gd_container /deep/ .van-stepper__input{
        background-color: #FEFDF9;
    }
    .buy-number{
        font-size: 13px;
        padding: 13px;
        border-bottom:1px solid #ebebeb
    }
</style>
