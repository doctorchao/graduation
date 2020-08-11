import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import axios from 'axios'

import {
  checkLoginTime,
  setUser,
  validateRequest,
  smallProgramLoginMethod
} from '../assets/js/utils'
import {
  isEmptyStr,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  removeLoginUser,
  setLoginUser
} from '../assets/js/assist'
import {
  resolve
} from 'upath';
import properties from '../../config/properties.js'
import {
  toast,
  Dialog
} from 'vant'
import {
  getUserByUnionid
} from '../pages/api/mainApi.js'
import { callMiniProgram } from "../assets/js/miniProgramHybrid"

// import Home from '../pages/shop/home/Home'

const getUserFromIOS = resolve => require.ensure([], () => resolve(require('../pages/base/getUserFromIOS.vue')))

// 首页
const Home = resolve => require.ensure([], () => resolve(require('../pages/shop/home/Home.vue')));
const NoneLogin = resolve => require.ensure([], () => resolve(require('../pages/shop/home/None.vue')));

const CurrShop = resolve => require.ensure([], () => resolve(require('../pages/shop/home/CurrShop.vue')));

// 店铺首页
const ShopIndex = resolve => require.ensure([], () => resolve(require('../pages/shop/shopIndex/ShopIndex.vue')));
// 店铺展示(管理员)
const ShopShow = resolve => require.ensure([], () => resolve(require('../pages/shop/shopShow/ShopShow.vue')));
// 我的栏目(店铺首页店铺卡片)
const ShopColumn = resolve => require.ensure([], () => resolve(require('../pages/shop/shopShow/ShopColumn.vue')));
// 店内管理
const ShopManage = resolve => require.ensure([], () => resolve(require('../pages/shop/shopManage/ShopManage.vue')));
// 我的分享店(店铺列表)
const MyShop = resolve => require.ensure([], () => resolve(require('../pages/shop/myShop/MyShop.vue')));
// 当前角色在分享店的权限列表
const CurRoleShopPermission = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/myShop/CurRoleShopPermission.vue')));
// 开店(添加新店铺)
const OpenShop = resolve => require.ensure([], () => resolve(require('../pages/shop/myShop/OpenShop.vue')));
// 选择行业分类
const SelectIndustry = resolve => require.ensure([], () => resolve(require('../pages/shop/myShop/SelectIndustry.vue')));
// 选择行业分类2
const SelectIndustry2 = resolve => require.ensure([], () => resolve(require('../pages/shop/myShop/SelectIndustry2.vue')));
// 店铺营业时间
const ShopTime = resolve => require.ensure([], () => resolve(require('../pages/shop/myShop/ShopTime.vue')));
// 地图
const ShopMap = resolve => require.ensure([], () => resolve(require('../pages/shop/myShop/ShopMap.vue')));
// 我的仓库(店铺商品)
const ShopGoods = resolve => require.ensure([], () => resolve(require('../pages/shop/shopManage/ShopGoods.vue')));
// 订单选购添加商品
const AddOrderList = resolve => require.ensure([], () => resolve(require('../pages/gr/order/AddOrderList.vue')))
// 物品库存管理
const ShopGoodsStock = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/ShopGoodsStock.vue')));
// 物品库存商品详细信息
const ShopGoodsStockDetail = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/ShopGoodsStockDetail.vue')));
// 店员管理
const ShopStaff = resolve => require.ensure([], () => resolve(require('../pages/shop/shopManage/ShopStaff.vue')));
// 需求登记
const ShopNeedAdd = resolve => require.ensure([], () => resolve(require('../pages/shop/shopManage/ShopNeedAdd.vue')));
// 需求分类
const ShopNeedClass = resolve => require.ensure([], () => resolve(require('../pages/shop/shopManage/ShopNeedClass.vue')));
// 需求详情
const ShopNeedDetail = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/ShopNeedDetail.vue')));
// 需求详情(用户看)
const NeedDetail = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/NeedDetail.vue')))
// 商品简易登记
const ShopGoodsSimple = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/ShopGoodsSimple.vue')));
// 商品分类
const ShopGoodsClass = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/goods/GoodsClass.vue')));
// 商品登记选择商品类型
const ShopGoodsPubType = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/goods/GoodsPubType.vue')));
// 商品登记
const ShopGoodsBase = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/goods/GoodsBase.vue')));
// 商品展示(管理员)
const ShopGoodsDetail = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/goods/GoodsDetail.vue')));
// 店铺财务管理
const ShopFinance = resolve => require.ensure([], () => resolve(require('../pages/shop/shopFinance/ShopFinance.vue')));
// 店铺推广
const ShopExten = resolve => require.ensure([], () => resolve(require('../pages/shop/shopExten/ShopExten.vue')));
// 签到管理
const ShopSignTable = resolve => require.ensure([], () => resolve(require('../pages/shop/shopExten/ShopSignTable.vue')));
// 选择分享店
const ShopShareSelectShop = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/ShopShareSelectShop.vue')));
// 添加分享商品
const ShopShareGoodsAdd = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareGoods/ShopShareGoodsAdd.vue')));
// 分享销售设置
const ShopShareGoodsSet = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareGoods/ShopShareGoodsSet.vue')));
const ShopShareGoodsManage = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareGoods/ShopShareGoodsManage.vue')));
const ShopShareGoodsHwSet = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareGoods/ShopShareGoodsHwSet.vue')));
const ShopShareGoodsTotal = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareGoods/ShopShareGoodsTotal.vue')));
const ShopShareJoinGoods = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareJoin/ShopShareJoinGoods.vue')));
const ShopShareJoinShop = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareJoin/ShopShareJoinShop.vue')));
const ShopShareJoinShopTotal = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareJoin/ShopShareJoinShopTotal.vue')));
const ShopShareDistShop = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareDist/ShopShareDistShop.vue')));
const ShopShareDistGoodsAdd = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareDist/ShopShareDistGoodsAdd.vue')));
const ShopShareDistShopTotal = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareDist/ShopShareDistShopTotal.vue')));
const ShopShareDistShopSet = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareDist/ShopShareDistShopSet.vue')));
const ShopShareDistHdSet = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareDist/ShopShareDistHdSet.vue')));
// 签到表
const UserSign = resolve => require.ensure([], () => resolve(require('../pages/shop/UserSign/UserSign.vue')))
// 好友分享店
const FriendShop = resolve => require.ensure([], () => resolve(require('../pages/gr/shop/FriendShop.vue')));
// 店铺详情(用户看)
const ShopDetail = resolve => require.ensure([], () => resolve(require('../pages/gr/shop/ShopDetail.vue')));

const GoodsList = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/GoodsList.vue')));
// 商品展示(用户)
const GoodsDetail = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/GoodsDetail.vue')));
// 订单选购
const OrderBuy = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/OrderBuy.vue')));
// 扫描进入订单购
const CustomerOrderBuy = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/CustomerOrderBuy.vue')))
// 购物车
const ShoppingCar = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/ShoppingCar.vue')));
// 我的订单
const OrderList = resolve => require.ensure([], () => resolve(require('../pages/gr/order/OrderList.vue')));
// 订单详情
const OrderDetail = resolve => require.ensure([], () => resolve(require('../pages/gr/order/OrderDetail.vue')));
const ExpressDetail = resolve => require.ensure([], () => resolve(require('../pages/gr/order/ExpressDetail.vue')));
const OrderLogisticsComment = resolve => require.ensure([], () => resolve(require(
  '../pages/gr/order/OrderLogisticsComment.vue')));
const OrderComment = resolve => require.ensure([], () => resolve(require('../pages/gr/order/OrderComment.vue')));
const OrderCommentDetail = resolve => require.ensure([], () => resolve(require(
  '../pages/gr/order/OrderCommentDetail.vue')));

// 智物转商品
const ZwGoods = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/ZwGoods.vue')))

// 好物求分享
const ShareDetail = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/ShareDetail.vue')));
// 确认订单
const ConfirmOrder = resolve => require.ensure([], () => resolve(require('../pages/gr/order/ConfirmOrder.vue')));
// 选择收货地址
const SelectAddress = resolve => require.ensure([], () => resolve(require('../pages/gr/order/SelectAddress.vue')));
// 添加收货地址
const AddAddress = resolve => require.ensure([], () => resolve(require('../pages/gr/order/AddAddress.vue')));
// 物品归还(选择归还人)
const ReturnGoods = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/ReturnGoods.vue')));
// 物品归还(归还详情)
const ShareReturn = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/ShareReturn.vue')));
// 物品交换
const GoodsExchange = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/GoodsExchange.vue')));
// 平台送(选择配送人)
const SelectPeople = resolve => require.ensure([], () => resolve(require('../pages/gr/order/SelectPeople.vue')));
// 平台送详情
const PlatformSend = resolve => require.ensure([], () => resolve(require('../pages/gr/order/PlatformSend.vue')));
// 赠送
const GiftGoods = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/GiftGoods.vue')));
// 订单详情(付款成功)
const PaymentSuccess = resolve => require.ensure([], () => resolve(require('../pages/gr/order/PaymentSuccess.vue')));
// 选择需求类型
const SearchNeed = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/SearchNeed.vue')));
// 全部评价
const AllAssess = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/AllAssess.vue')));
// 申请退款
const RequestRefund = resolve => require.ensure([], () => resolve(require('../pages/gr/order/RequestRefund.vue')));
// 退款详情(卖家)
const ShopRefundDetail = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/order/RefundDetail.vue')));
// 退款详情(买家)
const RefundDetail = resolve => require.ensure([], () => resolve(require('../pages/gr/order/RefundDetail.vue')))
// 协商历史
const ConsultHistory = resolve => require.ensure([], () => resolve(require('../pages/gr/order/ConsultHistory.vue')));
// 需求列表
const NeedList = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/NeedList.vue')));
// 二维码发送订单
const EwmReceipt = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/EwmReceipt.vue')));
// 二维码收款
const QrReceipt = resolve => require.ensure([], () => resolve(require('../pages/gr/order/QrReceipt.vue')))
// 扫码结果
const ScanResult = resolve => require.ensure([], () => resolve(require('../pages/goods/scanResult/ScanResult.vue')))
// 订单详情(管理人)
const ShopOrderDetail = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/order/OrderDetail.vue')))
// 我的订单(卖家)
const ShopOrderList = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/order/ShopOrderList.vue')))
// 拒绝退款
const RejectRefund = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/order/RejectRefund.vue')))
//发布新闻页面
const ReleaseNews = resolve => require.ensure([], () => resolve(require('../pages/news/ReleaseNews.vue')));
const ReleaseNewsList = resolve => require.ensure([], () => resolve(require('../pages/news/ReleaseNewsList.vue')));

//我发布的传单列表
const MyInformation = resolve => require.ensure([], () => resolve(require('../pages/news/MyInformation.vue')));
//编辑传单
const EditLeaflet = resolve => require.ensure([], () => resolve(require('../pages/news/EditLeaflet.vue')));
// 预览页面
const NewsShow = resolve => require.ensure([], () => resolve(require('../pages/news/NewsShow.vue')));
//新闻详情页面
const NewsDetails = resolve => require.ensure([], () => resolve(require('../pages/news/NewsDetails.vue')));
//选择共享店、商品以及智物的页面
const NewsLuckStar = resolve => require.ensure([], () => resolve(require('../pages/news/NewsLuckStar.vue')));
//选择作者页面
const SelectAuthor = resolve => require.ensure([], () => resolve(require('../pages/news/SelectAuthor.vue')));
//我发布的新闻列表
const MyNews = resolve => require.ensure([], () => resolve(require('../pages/news/MyNews.vue')));

//发布日程页面（总的）
const ReleaseSchedule = resolve => require.ensure([], () => resolve(require('../pages/schedule/ReleaseSchedule.vue')));
//选择好友（个人  群组）页面
const SelectPerson = resolve => require.ensure([], () => resolve(require('../pages/schedule/SelectPerson.vue')));
// 谁可以看
const SKYK = resolve => require.ensure([], () => resolve(require('../pages/schedule/SKYK.vue')));
const TXSK = resolve => require.ensure([], () => resolve(require('../pages/schedule/TXSK.vue')));
//查看日程详情页面
const ScheduleDetails = resolve => require.ensure([], () => resolve(require('../pages/schedule/ScheduleDetails.vue')));
//添加工作流程页面
const AddScheduleFlow = resolve => require.ensure([], () => resolve(require('../pages/schedule/AddScheduleFlow.vue')));
//日历组件
const Calendar = resolve => require.ensure([], () => resolve(require('../pages/schedule/Calendar.vue')));
//我发布的日程
const MySchedule = resolve => require.ensure([], () => resolve(require('../pages/schedule/MySchedule.vue')));
//发布日程提醒页面（细分）
const ScheduleReminder = resolve => require.ensure([], () => resolve(require('../pages/schedule/ScheduleReminder.vue')));
//发布群组活动页面（细分）
const GroupSchedule = resolve => require.ensure([], () => resolve(require('../pages/schedule/GroupSchedule.vue')));
//发布工作排班页面（细分）
const ScheduleJob = resolve => require.ensure([], () => resolve(require('../pages/schedule/ScheduleJob.vue')));
// 邀请好友付款页面
const FriendOrderPay = resolve => require.ensure([], () => resolve(require('../pages/gr/order/FriendOrderPay.vue')))

//职位技能列表页面
const AbilityList = resolve => require.ensure([], () => resolve(require('../pages/ability/AbilityList.vue')));
//职位技能详情页面
const AbilityDetails = resolve => require.ensure([], () => resolve(require('../pages/ability/AbilityDetails.vue')));
//技能认证页面
const AbilityCertify = resolve => require.ensure([], () => resolve(require('../pages/ability/AbilityCertify.vue')));
//分享信息列表
const ReleaseAbility = resolve => require.ensure([], () => resolve(require('../pages/ability/ReleaseAbility.vue')));
const ShareList = resolve => require.ensure([], () => resolve(require('../pages/ability/ShareList.vue')));
const SA = resolve => require.ensure([], () => resolve(require('../pages/ability/SA.vue')));
const Last = resolve => require.ensure([], () => resolve(require('../pages/ability/Last.vue')));
//岗位列表
const OfficeList = resolve => require.ensure([], () => resolve(require('../pages/ability/OfficeList.vue')));
//人才列表
const PersonList = resolve => require.ensure([], () => resolve(require('../pages/ability/PersonList.vue')));
//招聘成功
const ZPCG = resolve => require.ensure([], () => resolve(require('../pages/ability/ZPCG.vue')));
//职位管理
const PositionManagement = resolve => require.ensure([], () => resolve(require(
  '../pages/ability/PositionManagement.vue')));



//单独页面  需求列表
const OnlyNeedList = resolve => require.ensure([], () => resolve(require('../pages/news/OnlyNeedList.vue')));
//好友列表
const FriendList = resolve => require.ensure([], () => resolve(require('../pages/friend/FriendList.vue')));
const BindPhone = resolve => require.ensure([], () => resolve(require('../pages/friend/BindPhone.vue')));
const AddFriend = resolve => require.ensure([], () => resolve(require('../pages/friend/AddFriend.vue')));
const SearchFriend = resolve => require.ensure([], () => resolve(require('../pages/friend/SearchFriend.vue')));
const ScanInterface = resolve => require.ensure([], () => resolve(require('../pages/friend/ScanInterface.vue')));


//
const GroupList = resolve => require.ensure([], () => resolve(require('../pages/group/GroupList.vue')));
const BusinessStreet = resolve => require.ensure([], () => resolve(require('../pages/group/BusinessStreet.vue')));
const ParkTeam = resolve => require.ensure([], () => resolve(require('../pages/group/ParkTeam.vue')));
const SelectGrouper = resolve => require.ensure([], () => resolve(require('../pages/group/SelectGrouper.vue')));
const SelectGrouper2 = resolve => require.ensure([], () => resolve(require('../pages/group/SelectGrouper2.vue')));
const GrouperDetails = resolve => require.ensure([], () => resolve(require('../pages/group/GrouperDetails.vue')));
const GroupSetting = resolve => require.ensure([], () => resolve(require('../pages/group/GroupSetting.vue')));
const GroupManager = resolve => require.ensure([], () => resolve(require('../pages/group/GroupManager.vue')));
const GroupNotice = resolve => require.ensure([], () => resolve(require('../pages/group/GroupNotice.vue')));
const SimpleGroupSetting = resolve => require.ensure([], () => resolve(require('../pages/group/SimpleGroupSetting.vue')));

const DanWeiDetails = resolve => require.ensure([], () => resolve(require('../pages/group/DanWeiDetails.vue')));
const RoleDetails = resolve => require.ensure([], () => resolve(require('../pages/group/RoleDetails.vue')));
const SelectDanWei = resolve => require.ensure([], () => resolve(require('../pages/group/SelectDanWei.vue')));
const SelectRole = resolve => require.ensure([], () => resolve(require('../pages/group/SelectRole.vue')));
const Handle = resolve => require.ensure([], () => resolve(require('../pages/group/application/handle.vue')));




//我的钱袋
const MyWallet = resolve => require.ensure([], () => resolve(require('../pages/wallet/MyWallet.vue')));
//充值钱袋
const ChargeMoney = resolve => require.ensure([], () => resolve(require('../pages/wallet/ChargeMoney.vue')));
//添加银行卡
const AddBankCard = resolve => require.ensure([], () => resolve(require('../pages/wallet/AddBankCard.vue')));
//选择卡片类型
const SelectBankCardType = resolve => require.ensure([], () => resolve(require('../pages/wallet/SelectBankCardType.vue')));
//充值成功页面
const RechargeSuccess = resolve => require.ensure([], () => resolve(require('../pages/wallet/RechargeSuccess.vue')));
//钱袋设置页面
const WalletSetting = resolve => require.ensure([], () => resolve(require('../pages/wallet/WalletSetting.vue')));
//提现页面
const GetCash = resolve => require.ensure([], () => resolve(require('../pages/wallet/GetCash.vue')));
//收款设置
const CollectionSetting = resolve => require.ensure([], () => resolve(require('../pages/wallet/CollectionSetting.vue')));
//我的银行卡
const MyBankCard = resolve => require.ensure([], () => resolve(require('../pages/wallet/MyBankCard.vue')));
//添加支付方式
const AddPayWay = resolve => require.ensure([], () => resolve(require('../pages/wallet/AddPayWay.vue')));
//钱袋账单
const MyBill = resolve => require.ensure([], () => resolve(require('../pages/wallet/MyBill.vue')));
//结果详情
const Result = resolve => require.ensure([], () => resolve(require('../pages/wallet/Result.vue')));
//初始化支付密码（支付密码设置）
const InitPayPassword = resolve => require.ensure([], () => resolve(require('../pages/wallet/InitPayPassword.vue')));
//修改支付密码
const UpdatePayPassword = resolve => require.ensure([], () => resolve(require('../pages/wallet/UpdatePayPassword.vue')));
//找回支付密码
const FindPassword = resolve => require.ensure([], () => resolve(require('../pages/wallet/FindPassword.vue')));
// 超值精选
const HomeBestGoods = resolve => require.ensure([], () => resolve(require('../pages/shop/home/BestGoods.vue')))
// 周边店
const LocaitonBestShop = resolve => require.ensure([], () => resolve(require('../pages/shop/home/LocationBestShop.vue')))
// 就近租
const NearRent = resolve => require.ensure([], () => resolve(require('../pages/shop/home/NearRent.vue')))
// 好物求分享
const BestGoodsShare = resolve => require.ensure([], () => resolve(require('../pages/shop/home/BestGoodsShare.vue')))
// 付款页面
const Payment = resolve => require.ensure([], () => resolve(require('../pages/gr/order/Payment.vue')))
// 分享商品
const ShareGoods = resolve => require.ensure([], () => resolve(require('../pages/shop/shopManage/goods/ShareGoods.vue')))
// 我参与的分销商
const MyShareShop = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/goods/MyShareShop.vue')))
// 我参与的分享
const MyJoinShare = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/goods/MyJoinShare.vue')))
// 分享销售商品属性设置
const ShareGoodsBase = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/goods/ShareGoodsBase.vue')))
// 分享销售商品详情
const ShareGoodsDetail = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/goods/ShareGoodsDetail.vue')))
// 现金支付
const CashPayment = resolve => require.ensure([], () => resolve(require('../pages/gr/order/CashPayment.vue')))
// 配货
const BindGoods = resolve => require.ensure([], () => resolve(require('../pages/shop/shopManage/order/BindGoods.vue')))
// 配货清单
const BindGoodslist = resolve => require.ensure([], () => resolve(require('../pages/gr/order/BindGoodsList.vue')))
// 初始化交易密码
const InitTranPassword = resolve => require.ensure([], () => resolve(require('../pages/ability/InitTranPassword.vue')))
// 收付款
const ReceivePayment = resolve => require.ensure([], () => resolve(require('../pages/ability/ReceivePayment.vue')))
// 二维码收款
const EwmReceive = resolve => require.ensure([], () => resolve(require('../pages/ability/EwmReceive.vue')))
// 微信授权
const WxAuthor = resolve => require.ensure([], () => resolve(require('../pages/shop/home/WxAuthor.vue')))
// 设置金额
const SetAmount = resolve => require.ensure([], () => resolve(require('../pages/ability/SetAmount.vue')))
// 收款记录
const PostRecord = resolve => require.ensure([], () => resolve(require('../pages/ability/PostRecord.vue')))
// 输入交易密码解锁
const UnlockWallet = resolve => require.ensure([], () => resolve(require('../pages/wallet/UnlockWallet.vue')))
// 输入金额
const InputAmount = resolve => require.ensure([], () => resolve(require('../pages/wallet/InputAmount.vue')))
// 收钱码
const MoneyCode = resolve => require.ensure([], () => resolve(require('../components/wallet/MoneyCode.vue')))
// 付款完成
const PaymentComplete = resolve => require.ensure([], () => resolve(require('../pages/wallet/PaymentComplete.vue')))
// 邀请分享店设置详情
const ShopShareDistDetail = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareDist/ShopShareDistDetail.vue')))
// 邀请分享店设置详情(扫码)
const HdDetail = resolve => require.ensure([], () => resolve(require('../pages/gr/shop/HdDetail.vue')))
// 配货/发货
const ExpressBindGoods = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/order/ExpressBindGoods.vue')))
// 卖家分享商品详情
const ShopShareGoodsDetail = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/goods/ShopShareGoodsDetail.vue')))
// 好店求分享详情
const HdShareDetail = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/HdShareDetail.vue')))
// 成功参与好店求分享
const joinShopSuccess = resolve => require.ensure([], () => resolve(require('../pages/gr/shop/JoinShopSuccess.vue')))
// 用户看分享商品详情
const UserShareGoodsDetail = resolve => require.ensure([], () => resolve(require(
  '../pages/gr/goods/UserShareGoodsDetail.vue')))
// 好店求分享详情
const ShopHdShareDetail = resolve => require.ensure([], () => resolve(require('../pages/gr/shop/ShopHdShareDetail')))
// 分享信息列表
const ShareInfoList = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/ShareInfoList')))
// 参与邀请的商品属性设置
const JoinGoodsBase = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareGoods/JoinGoodsBase')))
// 编辑商品展示详情
const EditGoodsDetail = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/goods/EditGoodsDetail')))
// 店管理好物求分享列表
const HwList = resolve => require.ensure([], () => resolve(require('../pages/shop/shopManage/goods/HwList')))
// 店管理好店求分享列表
const HdList = resolve => require.ensure([], () => resolve(require('../pages/shop/shopManage/HdList')))
// 店管理我的商圈
const MyShopRadius = resolve => require.ensure([], () => resolve(require('../pages/shop/shopManage/goods/MyShopRadius')))
// 邀请好友参与好店求分享
const InviteHd = resolve => require.ensure([], () => resolve(require('../pages/gr/shop/InviteHd')))
// 邀请好友参与分享商品
const InviteHw = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/InviteHw')))
const MyCustomer = resolve => require.ensure([], () => resolve(require('../pages/shop/shopManage/MyCustomer')))
// 分享商品给好友
const ShareGoodsToFriend = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/goods/ShareGoodsToFriend')))
// 我的分享好友
const MyShareFriend = resolve => require.ensure([], () => resolve(require('../pages/shop/shopManage/MyShareFriend')))
// 查看下级分享
const QueryNextShare = resolve => require.ensure([], () => resolve(require('../pages/shop/shopExten/QueryNextShare')))
// 分享店管理
const ShareShopManage = resolve => require.ensure([], () => resolve(require('../pages/shop/shopExten/ShareShopManage')))
// 首页好店求分享
const BestShopShare = resolve => require.ensure([], () => resolve(require('../pages/shop/home/BestShopShare')))
// 好友优惠购商品管理
const ShareGoodsSalesStatic = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/ShareGoodsSalesStatic.vue')))
// 参与的分享商品统计
const JoinGoodsStatic = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/JoinGoodsStatic.vue')))
// 细分类页面
const DetailClassify = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/goods/DetailClassify.vue')))
// 收藏列表
const CollectGoodsList = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/CollectGoodsList.vue')))
//我的商圈
const myBussinessCircle = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/home/myBussinessCircle.vue')))
const friendRecommendGoods = resolve => require.ensure([], () => resolve(require(
  '../pages/gr/goods/friendRecommendGoods.vue')))
const surroundGoods = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/surroundGoods.vue')))
const friendRecommendShop = resolve => require.ensure([], () => resolve(require(
  '../pages/gr/shop/friendRecommendShop.vue')))
const GoodsType = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/GoodsType.vue')))
const searchHead = resolve => require.ensure([], () => resolve(require('../pages/search/searchHead.vue')))
const location = resolve => require.ensure([], () => resolve(require('../pages/search/location.vue')))
const WxShareTips = resolve => require.ensure([], () => resolve(require('../pages/base/WxShareTips.vue')))
// 查看分享
const ViewShare = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/ViewShare.vue')))
// 编辑、新增好物求分享
const EditShopShareGoodsHwSet = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopExten/shareGoods/editShopShareGoodsHwSet.vue')))

const test = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/test.vue')))

//好友分享
const friendShareGoods = resolve => require.ensure([], () => resolve(require('../pages/shop/home/friendShareGoods.vue')))

//我的共享店列表
const myShopList = resolve => require.ensure([], () => resolve(require('../pages/gr/shop/myShopList.vue')))

//雷锋包
const leifengPackage = resolve => require.ensure([], () => resolve(require('../pages/list/leifengPackage.vue')))

//随身享
const carryPackage = resolve => require.ensure([], () => resolve(require('../pages/list/carryPackage.vue')))

//我的雷锋包
const myLeifengPackage = resolve => require.ensure([], () => resolve(require('../pages/list/myLeifengPackage.vue')))

//我的关注
const myFollow = resolve => require.ensure([], () => resolve(require('../pages/list/myFollow.vue')))
//录入台号
const inputDeskNumber = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/InputDeskNumber.vue')))
//管理台号
const managementPlatform = resolve => require.ensure([], () => resolve(require(
  '../pages/gr/goods/ManagementPlatform.vue')))
//管理台号详情
const mantform = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/Mantform.vue')))

const modifyMachine = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/modifyMachine.vue')))

//商家管理台号详情
const mantstoretable = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/Mantstoretable.vue')))
//转换台号
const taiwannumber = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/Taiwannumber.vue')))
//选择服务人员
const selectservice = resolve => require.ensure([], () => resolve(require('../pages/gr/goods/Selectservice.vue')))

//附近的人
const nearPeople = resolve => require.ensure([], () => resolve(require('../pages/list/nearPeople.vue')))

//附近的物
const nearObject = resolve => require.ensure([], () => resolve(require('../pages/list/nearObject.vue')))

//有用拿走
const usefulTakeAway = resolve => require.ensure([], () => resolve(require('../pages/list/usefulTakeAway.vue')))

//借一个
const borrowOne = resolve => require.ensure([], () => resolve(require('../pages/list/borrowOne.vue')))



//权限设置
const QuanXianSZ = resolve => require.ensure([], () => resolve(require('../pages/shop/myShop/QuanXianSZ.vue')))
//权限管理
const QuanXianGL = resolve => require.ensure([], () => resolve(require('../pages/shop/myShop/QuanXianGL.vue')))

//寻宝
const treasurehunt = resolve => require.ensure([], () => resolve(require('../pages/list/treasurehunt.vue')))
// 发送给好友的店铺二维码
const SendShopToFriend = resolve => require.ensure([], () => resolve(require('../pages/gr/shop/SendShopToFriend.vue')))

//愿望森林列表
const treeList = resolve => require.ensure([], () => resolve(require('../pages/list/treeList.vue')))

//保质期物品列表
const qualityPeriod = resolve => require.ensure([], () => resolve(require('../pages/list/qualityPeriod.vue')))

//保质期物品选项
const qualityPeriodFirst = resolve => require.ensure([], () => resolve(require('../pages/list/qualityPeriodFirst.vue')))

//好友列表
const friendShareList = resolve => require.ensure([], () => resolve(require('../pages/list/friendShareList.vue')))

//单位详情
const orgDetail = resolve => require.ensure([], () => resolve(require('../pages/list/sharePage/orgDetail.vue')))

//系统消息
const systemMsg = resolve => require.ensure([], () => resolve(require('../pages/list/home/systemMsg.vue')))

//消息详情页面
const msgDetail = resolve => require.ensure([], () => resolve(require('../pages/list/home/msgDetail.vue')))

//通讯录详情
const contactsDetail = resolve => require.ensure([], () => resolve(require('../pages/list/sharePage/contactsDetail.vue')))

//好友详情
const friendDetail = resolve => require.ensure([], () => resolve(require('../pages/list/sharePage/friendDetail.vue')))

//智物详情
const zhiwuDetail = resolve => require.ensure([], () => resolve(require('../pages/list/sharePage/zhiwuDetail.vue')))

//转账选择分享店
const chooseShop = resolve => require.ensure([], () => resolve(require('../pages/transferAccounts/chooseShop.vue')))

//转账金额及方式
const transferMoney = resolve => require.ensure([], () => resolve(require('../pages/transferAccounts/transferMoney.vue')))

//转账成功页面
const transferSuccess = resolve => require.ensure([], () => resolve(require('../pages/wallet/transferSuccess.vue')))

//绑定公司银行卡
const addCompanyBankCard = resolve => require.ensure([], () => resolve(require(
  '../pages/transferAccounts/addCompanyBankCard.vue')))

//店铺默认推荐加商品
const ShopDefaultRecommend = resolve => require.ensure([], () => resolve(require(
  '../pages/shop/shopManage/ShopDefaultRecommend.vue')))

//扫描付款
const scanPay = resolve => require.ensure([], () => resolve(require('../pages/wallet/scanPay.vue')))

//银行卡详情
const BankCardInfo = resolve => require.ensure([], () => resolve(require('../pages/wallet/BankCardInfo.vue')))

//我的好店分享
const myGoodsShopShare = resolve => require.ensure([], () => resolve(require('../pages/goodShopShare/myGoodsShopShare')))

const friendSharingStore = resolve => require.ensure([], () => resolve(require(
  '../pages/goodShopShare/FriendSharingStore.vue')))
const goodsShopManage = resolve => require.ensure([], () => resolve(require(
  '../pages/goodShopShare/goodsShopManage.vue')))
const shopManagement = resolve => require.ensure([], () => resolve(require('../pages/goodShopShare/ShopManagement.vue')))
const goodShopSet = resolve => require.ensure([], () => resolve(require('../pages/goodShopShare/GoodShopSet.vue')))
const restPayPassword = resolve => require.ensure([], () => resolve(require('../pages/wallet/restPayPassword')))
const restTranPassword = resolve => require.ensure([], () => resolve(require('../pages/ability/restTranPassword')))
//转账给其他钱包
const transferWalletMoney = resolve => require.ensure([], () => resolve(require(
  '../pages/wallet/transferWalletMoney.vue')))

//地图的店
const pointMap = resolve => require.ensure([], () => resolve(require('../pages/list/pointMap.vue')))

//店铺活动列表
const shopActivityList = resolve => require.ensure([], () => resolve(require('../pages/list/activityList.vue')))

//微信外边加好友
const addFriendVip = resolve => require.ensure([], () => resolve(require('../pages/tools/addFriendVip.vue')))

//热门商品列表
const hotList = resolve => require.ensure([], () => resolve(require('../pages/list/hotList.vue')))

//扫描页面
const scanBuy = resolve => require.ensure([], () => resolve(require('../pages/tools/scanBuy.vue')))

//打开openUrl
const openWebUrl = resolve => require.ensure([], () => resolve(require('../pages/news/openWebUrl.vue')))

//猜你喜欢
const ulikeList = resolve => require.ensure([], () => resolve(require('../pages/list/ulikeList.vue')))

//店家推荐
const bestList = resolve => require.ensure([], () => resolve(require('../pages/list/bestList.vue')))

//新品专区列表
const newGoodsList = resolve => require.ensure([], () => resolve(require('../pages/list/newGoodsList.vue')))

//我的栏目
const myColumn = resolve => require.ensure([], () => resolve(require("../pages/shop/label/myColumn.vue")))

//单位资讯
const orgNews = resolve => require.ensure([], () => resolve(require('../pages/news/orgNews.vue')))

//单位模块列表
const orgModuleList = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgModuleList.vue")))

//单位模块测试列表
const orgModuleListTest = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgModuleListTest.vue")))

//我发布的资讯
const orgReleaseNews = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgReleaseNews.vue")))

//单位许愿树列表
const orgTreeList = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgTreeList.vue")))

//单位雷锋包
const orgLeifengPackage = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgLeifengPackage.vue")))

//单位随身享
const orgCarryPackage = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgCarryPackage.vue")))

//单位有用拿走
const orgUsefulTakeAway = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgUsefulTakeAway.vue")))

//单位互帮互助
const orgHelp = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgHelp")))

//单位图钉
const orgThumbtack = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgThumbtack")))

//单位热图
const orgPictureWall = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgPictureWall")))

//单位火视频
const orgShortVideo = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgShortVideo")))

//单位视频详情
const orgVideoDetail = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgVideoDetail")))

//单位图钉详情
const orgThumbtackDetail = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgThumbtackDetail")))

//图钉发布
const thumbtackRelease = resolve => require.ensure([], () => resolve(require("../pages/orgShare/thumbtackRelease")))

//本地登录

//本地登录
const localLogin = resolve => require.ensure([], () => resolve(require("../pages/localpage/LocalLogin")))

//社区列表
const orgCommunityList = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgCommunityList")))

//图片详情
const orgImgDetail = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgImgDetail")))

//图片详情
const orgImgList = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgImgList")))

//视频详情
const orgVideoList = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgVideoList")))

//聊天室设置
const chatRoomSetting = resolve => require.ensure([], () => resolve(require("../pages/orgShare/chatRoomSetting")))

//我的愿望森林列表
const myTreeList = resolve => require.ensure([], () => resolve(require('../pages/list/myTreeList.vue')))

//社区列表
const communityList = resolve => require.ensure([], () => resolve(require("../pages/orgShare/communityList")))

//打开新闻详情
const openResContent = resolve => require.ensure([], () => resolve(require("../pages/news/openResContent")))

//登录
const login = resolve => require.ensure([], () => resolve(require("../pages/login/login")))

//注册
const register = resolve => require.ensure([], () => resolve(require("../pages/login/register")))

//忘记密码
const forgetPassword = resolve => require.ensure([], () => resolve(require("../pages/login/forgetPassword")))

//活动报名页面
const ActivityJoinForm = resolve => require.ensure([], () => resolve(require("../pages/wxscanRegister/ActivityJoinForm")))
//活动微信支付页面
const activityPay = resolve => require.ensure([], () => resolve(require("../pages/wxscanRegister/activityPay")))

//活动扫码认证页面
const realNameForm = resolve => require.ensure([], () => resolve(require("../pages/wxscanRegister/realNameForm")))
//活动签到列表页面
const activitySignList = resolve => require.ensure([], () => resolve(require("../pages/wxscanRegister/activitySignList")))
//活动总签到列表页面
const activitySignListAll = resolve => require.ensure([], () => resolve(require(
  "../pages/wxscanRegister/activitySignListAll")))

//聊一聊聊天
const groupChat = resolve => require.ensure([], () => resolve(require("../pages/group/groupChat")))
//发布活动
const addActivity = resolve => require.ensure([], () => resolve(require("../pages/wxscanRegister/addActivity")))
//修改活动
const editActivity = resolve => require.ensure([], () => resolve(require("../pages/wxscanRegister/editActivity")))
//活动列表
const dwActivityList = resolve => require.ensure([], () => resolve(require("../pages/wxscanRegister/dwActivityList")))
//与我有关的活动列表
const myActivityList = resolve => require.ensure([], () => resolve(require("../pages/wxscanRegister/myActivityList")))
//与我有关的活动列表
const signerManage = resolve => require.ensure([], () => resolve(require("../pages/wxscanRegister/signerManage")))
//活动详情
const dwActivityDetails = resolve => require.ensure([], () => resolve(require(
  "../pages/wxscanRegister/dwActivityDetails")))
//填写体温弹窗页面
const rewriteSignerTW = resolve => require.ensure([], () => resolve(require("../pages/wxscanRegister/rewriteSignerTW")))


//商业街
const orgCommercialStreet = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgCommercialStreet")))

//会话列表
const groupChatList = resolve => require.ensure([], () => resolve(require("../pages/group/groupChatList")))

//购物会话列表
const groupChatBuy = resolve => require.ensure([], () => resolve(require("../pages/group/groupChatBuy")))

//根据钱包id进行转账
const chargeMoneyByWalletId = resolve => require.ensure([], () => resolve(require(
  "../pages/wallet/chargeMoneyByWalletId")))

//社区列表
const chatRoomList = resolve => require.ensure([], () => resolve(require("../pages/orgShare/chatRoomList.vue")))

//分享页面
const sharePage = resolve => require.ensure([], () => resolve(require("../pages/orgShare/sharePage")))

//根据userId的钱包详情
const myWalletByUserId = resolve => require.ensure([], () => resolve(require("../pages/wallet/myWalletByUserId.vue")))

//根据userId验证钱包密码
const UnlockWalletByUserId = resolve => require.ensure([], () => resolve(require(
  "../pages/wallet/UnlockWalletByUserId.vue")))

//选择社区分享链接
const chooseCommunity = resolve => require.ensure([], () => resolve(require("../pages/orgShare/chooseCommunity.vue")))

//钱包记录详情
const billDetail = resolve => require.ensure([], () => resolve(require("../pages/wallet/billDetail.vue")))

//红包收到页面
const redPackageReceive = resolve => require.ensure([], () => resolve(require(
  "../pages/redPackage/redPackageReceive.vue")))

//红包获取记录页面
const redPackageColletLog = resolve => require.ensure([], () => resolve(require(
  "../pages/redPackage/redPackageColletLog.vue")))

//红包支出记录页面
const redPackagePayLog = resolve => require.ensure([], () => resolve(require("../pages/redPackage/redPackagePayLog.vue")))

//三个聊天列表
const threeChatList = resolve => require.ensure([], () => resolve(require("../pages/group/threeChatList.vue")))

//我的图钉列表
const myThumbtack = resolve => require.ensure([], () => resolve(require("../pages/list/myThumbtack")))

//团队列表
const teamList = resolve => require.ensure([], () => resolve(require("../pages/list/teamList.vue")))

//图钉列表
const thumbtackList = resolve => require.ensure([], () => resolve(require("../pages/list/thumbtackList.vue")))

//发送红包页面
const sendRedPackage = resolve => require.ensure([], () => resolve(require("../pages/redPackage/sendRedPackage.vue")))

//新闻评论页面
const newsDetailCommit = resolve => require.ensure([], () => resolve(require("../pages/news/newsDetailCommit.vue")))

//选择组
const chooseGroup = resolve => require.ensure([], () => resolve(require("../pages/orgShare/chooseGroup.vue")))

//选择角色
const chooseRole = resolve => require.ensure([], () => resolve(require("../pages/orgShare/chooseRole.vue")))

//爱分享的我
const mySharing = resolve => require.ensure([], () => resolve(require("../pages/list/sharePage/mySharing.vue")))

//密码设置
const passwordSetting = resolve => require.ensure([], () => resolve(require("../pages/setting/passwordSetting.vue")))

//修改登录密码
const changeAccountPassword = resolve => require.ensure([], () => resolve(require(
  "../pages/setting/changeAccountPassword.vue")))

//修改支付密码
const changePayPassword = resolve => require.ensure([], () => resolve(require(
  "../pages/setting/changePayPassword.vue")))

//修改交易密码
const changeTransationPassword = resolve => require.ensure([], () => resolve(require(
  "../pages/setting/changeTransationPassword.vue")))

//修改登录手机号
const changePhone = resolve => require.ensure([], () => resolve(require(
  "../pages/setting/changePhone.vue")))

//修改登录手机号
const changeSafePhone = resolve => require.ensure([], () => resolve(require(
  "../pages/setting/changeSafePhone.vue")))

//设置
const setting = resolve => require.ensure([], () => resolve(require("../pages/setting/setting.vue")))

//选择周边感知模式
const chooseAroundModel = resolve => require.ensure([], () => resolve(require("../pages/setting/chooseAroundModel.vue")))

//选择默认社团
const chooseDefaultTeam = resolve => require.ensure([], () => resolve(require("../pages/setting/chooseDefaultTeam.vue")))

//反馈
const feedback = resolve => require.ensure([], () => resolve(require("../pages/setting/feedback.vue")))

//关于
const about = resolve => require.ensure([], () => resolve(require("../pages/setting/about.vue")))

//收款
const collectMoney = resolve => require.ensure([], () => resolve(require("../pages/wallet/collectMoney.vue")))

//付款成功
const collectPaySuccess = resolve => require.ensure([], () => resolve(require("../pages/wallet/collectPaySuccess.vue")))

//直播列表
const liveList = resolve => require.ensure([], () => resolve(require("../pages/liveBroadCast/liveList")))

//直播详情
const liveDetail = resolve => require.ensure([], () => resolve(require("../pages/liveBroadCast/liveDetail")))

//直播回放
const livePlayBack = resolve => require.ensure([], () => resolve(require("../pages/liveBroadCast/livePlayBack")))

//直播详情-新直播样例
const liveDetailDemo = resolve => require.ensure([], () => resolve(require("../pages/liveBroadCast/liveDetailDemo")))

//大家都在看
const everybodyWatch = resolve => require.ensure([], () => resolve(require("../pages/list/everybodyWatch")))

//热图
const pictureWall = resolve => require.ensure([], () => resolve(require("../pages/list/pictureWall")))

//火视频
const shortVideo = resolve => require.ensure([], () => resolve(require("../pages/list/shortVideo")))

//所有的直播列表
const allLiveList = resolve => require.ensure([], () => resolve(require("../pages/list/allLiveList")))

//所有的直播列表
const allLivePlayList = resolve => require.ensure([], () => resolve(require("../pages/list/allLivePlayList")))
//空白页面
const BlankPage = resolve => require.ensure([], () => resolve(require("../pages/shop/home/BlankPage")))

//视频图钉测试
const orgVideoListDemo = resolve => require.ensure([], () => resolve(require("../pages/orgShare/orgVideoListDemo")))

//小程序登录
const smallProgramLogin = resolve => require.ensure([], () => resolve(require("../pages/login/smallProgramLogin")))
//活动视频全面页面
const ActivityVideo = resolve => require.ensure([], () => resolve(require("../pages/liveBroadCast/ActivityVideo")))
//小程序我的页面
const miniProgramMe = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/miniProgramMe")))
//小程序动态消息页面
const oneChatList = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/oneChatList")))
//小程序智播页面
const zhiBo = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/zhiBo")))
const unitZhiBo = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/unitZhiBo")))
const dwZhiBo = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/dwZhiBo")))
//小程序火视频页面
const miniShortVideo = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/shortVideo")))
//小程序单位火视频页面
const miniOrgShortVideo = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/orgShortVideo")))
//小程序关注火视频
const focusShortVideo = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/focusShortVideo")))
//小程序热图页面
const miniPictureWall = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/pictureWall")))
//小程序关注热图
const focusPictureWall = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/focusPictureWall")))
//小程序单位热图页面
const miniOrgPictureWall = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/orgPictureWall")))

//社区逛一逛
const communityWalkList = resolve => require.ensure([], () => resolve(require("../pages/orgShare/communityWalkList")))

//小程序关注的直播
const miniFocusLiveList = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/miniFocusLiveList")))

//小程序好友聊一聊
const miniChat = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/miniChat")))
//小程序好友聊一聊好友页面
const miniFriendList = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/miniFriendList")))
// //小程序好友聊一聊团队页面
const miniTeamList = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/miniTeamList")))
// //小程序好友聊一聊群组页面
const miniGroupList = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/miniGroupList")))
//小程序推荐直播页面
const miniRecommendLiveList = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/miniRecommendLiveList")))
//小程序图钉页面
const tuDing = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/tuDing")))
//用户协议、隐私条款
const userAgree = resolve => require.ensure([], () => resolve(require("../pages/setting/userAgree")))
//个人简历h5页面
const personCard = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/personCard")))
//资讯显示容器页面
const showReleaseNews = resolve => require.ensure([], () => resolve(require("../pages/miniProgram/showReleaseNews")))

// 卡包管理
const cardManage = resolve => require.ensure([], () => resolve(require('../pages/my/ShopCardManage')))
// 卡包管理
const shopCardDetail = resolve => require.ensure([], () => resolve(require('../pages/my/ShopCardDetail.vue')))

// 卡包管理
const shopCardEdit = resolve => require.ensure([], () => resolve(require('../pages/my/ShopCardEdit')))

// 我的
const my = resolve => require.ensure([], () => resolve(require('../pages/my/My')))
// 我的卡包
const myCard = resolve => require.ensure([], () => resolve(require('../pages/my/MyCard')))
// 我的卡包-卡包详情
const cardDetail = resolve => require.ensure([], () => resolve(require('../pages/my/CardDetail')))
// 我的卡包-卡包详情-卡使用说明
const cardInstructions = resolve => require.ensure([], () => resolve(require('../pages/my/CardInstructions')))
// 我的卡包-优惠券详情
const couponDetail = resolve => require.ensure([], () => resolve(require('../pages/my/ShopCouponDetail')))
// 充值优惠
const rechargeOffer = resolve => require.ensure([], () => resolve(require('../pages/my/RechargeOffer')))
// 添加充值方式
const addRecharge = resolve => require.ensure([], () => resolve(require('../pages/my/AddRecharge')))

// vip会员充值
const vipRecharge = resolve => require.ensure([], () => resolve(require('../pages/my/VipRecharge')))

// vip会员充值记录
const vipRecord = resolve => require.ensure([], () => resolve(require('../pages/my/VipRecord')))
// 会员积分制度
const vipIntegralSystem = resolve => require.ensure([], () => resolve(require('../pages/my/VipIntegralSystem')))
// 赚积分规则设置
const integralRuleSetting = resolve => require.ensure([], () => resolve(require('../pages/my/IntegralRuleSetting')))
// 用户兑换
const pointExchange = resolve => require.ensure([], () => resolve(require('../pages/my/PointExchange')))
// 用户兑换记录
const pointExchangeRecord = resolve => require.ensure([], () => resolve(require('../pages/my/PointExchangeRecord')))
// /shopDetail/:shopId?/:friendFlag?
Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/pointExchangeRecord',
      name: 'pointExchangeRecord',
      component: pointExchangeRecord
    },
    {
      path: '/pointExchange',
      name: 'pointExchange',
      component: pointExchange
    },
    {
      path: '/integralRuleSetting',
      name: 'integralRuleSetting',
      component: integralRuleSetting
    },
    {
      path: '/vipRecord',
      name: 'vipRecord',
      component: vipRecord
    },
    {
      path: '/vipRecharge',
      name: 'vipRecharge',
      component: vipRecharge
    },
    {
      path: '/cardManage',
      name: 'cardManage',
      component: cardManage
    },
    {
      path: '/vipIntegralSystem',
      name: 'vipIntegralSystem',
      component: vipIntegralSystem
    },
    {
      path: '/couponDetail/:cardId?',
      name: 'couponDetail',
      component: couponDetail
    },
    {
      path: '/shopCardDetail/:cardId?',
      name: 'shopCardDetail',
      component: shopCardDetail
    },
    {
      path: '/shopCardEdit/:cardId?',
      name: 'shopCardEdit',
      component: shopCardEdit
    },
    {
      path: '/rechargeOffer',
      name: 'rechargeOffer',
      component: rechargeOffer
    },
    {
      path: '/addRecharge',
      name: 'addRecharge',
      component: addRecharge
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/myCard',
      name: 'myCard',
      component: myCard
    },
    {
      path: '/cardDetail/:cardId?',
      name: 'cardDetail',
      component: cardDetail
    },
    {
      path: '/cardInstructions',
      name: 'cardInstructions',
      component: cardInstructions
    },
     {
      path: '/BlankPage',
      name: 'BlankPage',
      component: BlankPage
    },
     {
      path: '/localLogin',
      name: 'localLogin',
      component: localLogin
    },
    {
      path: '/getUserFromIOS',
      name: 'getUserFromIOS',
      component: getUserFromIOS,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/inputDeskNumber/:shopId?',
      name: 'inputDeskNumber',
      component: inputDeskNumber,
      props: true
    },
    {
      path: '/managementPlatform/:shopId?',
      name: 'managementPlatform',
      component: managementPlatform,
      props: true
    },
    {
      path: '/mantform/:shopId/:orderDeskNo?',
      name: 'mantform',
      component: mantform,
      props: true
    },
    {
      path: '/mantstoretable/:shopId?',
      name: 'mantstoretable',
      component: mantstoretable,
      props: true
    },
    {
      path: '/taiwannumber/:shopId?',
      name: 'taiwannumber',
      component: taiwannumber,
      props: true
    }, {
      path: '/selectservice/:shopId/:orderDeskNo/:carId?',
      name: 'selectservice',
      component: selectservice,
      props: true
    },
    {
      path: '/NoneLogin',
      name: 'NoneLogin',
      component: NoneLogin,
    },
    {
      path: '/CurrShop/:uid',
      name: 'CurrShop',
      component: CurrShop
    },
    {
      path: '/shopIndex/:shopId?',
      name: 'ShopIndex',
      component: ShopIndex,
      props: true,
      meta: {
        requiresAuth: false
      },
      children: [{
          path: '/shopShow/:shopId?',
          name: 'ShopShow',
          component: ShopShow,
          props: true,
        },
        {
          path: '/shopColumn/:shopId?',
          name: 'ShopColumn',
          component: ShopColumn,
          props: true,
        },
        {
          path: '/shopManage/:shopId?',
          name: 'ShopManage',
          component: ShopManage,
          props: true
        },
        {
          path: '/shopFinance',
          name: 'ShopFinance',
          component: ShopFinance
        },
      ]
    },
    {
      path: '/myShop',
      name: 'MyShop',
      component: MyShop
    },
    {
      path: '/curRoleShopPermission/:shopId',
      name: 'CurRoleShopPermission',
      component: CurRoleShopPermission,
      props: true
    },
    {
      path: '/openShop/:shopId',
      name: 'OpenShop',
      component: OpenShop,
      props: true
    },
    {
      path: '/selectIndustry',
      name: 'SelectIndustry',
      component: SelectIndustry
    },
    {
      path: '/selectIndustry2/:selected?',
      name: 'SelectIndustry2',
      component: SelectIndustry2
    },
    {
      path: '/shopTime/:businessTime',
      name: 'ShopTime',
      component: ShopTime,
      props: true
    },
    {
      path: '/shopMap',
      name: 'ShopMap',
      component: ShopMap
    },
    {
      path: '/shopGoods/:tabtype/:shopId?',
      name: 'ShopGoods',
      component: ShopGoods,
      props: true
    },
    {
      path: '/shopGoodsStock',
      name: 'ShopGoodsStock',
      component: ShopGoodsStock
    },
    {
      path: '/shopGoodsStockDetail/:goodsId',
      name: 'ShopGoodsStockDetail',
      component: ShopGoodsStockDetail,
      props: true
    },
    {
      path: '/shopStaff',
      name: 'ShopStaff',
      component: ShopStaff
    },
    {
      path: '/shopNeedAdd',
      name: 'ShopNeedAdd',
      component: ShopNeedAdd
    },
    {
      path: '/shopNeedClass',
      name: 'ShopNeedClass',
      component: ShopNeedClass
    },
    {
      path: '/shopNeedDetail/:goodsId',
      name: 'ShopNeedDetail',
      component: ShopNeedDetail,
      props: true
    },
    {
      path: '/needDetail/:goodsId',
      name: 'NeedDetail',
      component: NeedDetail,
      props: true
    },
    {
      path: '/shopGoodsSimple',
      name: 'ShopGoodsSimple',
      component: ShopGoodsSimple
    },
    {
      path: '/shopGoodsClass',
      name: 'ShopGoodsClass',
      component: ShopGoodsClass
    },
    {
      path: '/shopGoodsPubType',
      name: 'ShopGoodsPubType',
      component: ShopGoodsPubType
    },
    {
      path: '/shopGoodsBase/:goodsType/:goodsId?',
      name: 'ShopGoodsBase',
      component: ShopGoodsBase,
      props: true
    },
    {
      path: '/shopGoodsDetail/:goodsId/:isShare?',
      name: 'ShopGoodsDetail',
      component: ShopGoodsDetail,
      props: true
    },
    {
      path: '/shopSignTable',
      name: 'ShopSignTable',
      component: ShopSignTable
    },
    {
      path: '/shopShareGoodsAdd/:shopId?',
      name: 'ShopShareGoodsAdd',
      component: ShopShareGoodsAdd,
      props: true,
      meta: {
        manage: true
      }
    },
    {
      path: '/shopShareGoodsSet/:ids/:shareId?',
      name: 'ShopShareGoodsSet',
      component: ShopShareGoodsSet,
      props: true,
      meta: {
        manage: true
      }
    },
    {
      path: '/shopShareGoodsManage/:syId',
      name: 'ShopShareGoodsManage',
      component: ShopShareGoodsManage,
      props: true,
      meta: {
        manage: true
      }
    },
    {
      path: '/shopShareGoodsHwSet/:syId/:hwId?',
      name: 'ShopShareGoodsHwSet',
      component: ShopShareGoodsHwSet,
      props: true,
      meta: {
        manage: true
      }
    },
    {
      path: '/shopShareGoodsTotal/:goodsId',
      name: 'ShopShareGoodsTotal',
      component: ShopShareGoodsTotal,
      props: true
    },
    {
      path: '/shopShareSelectShop',
      name: 'ShopShareSelectShop',
      component: ShopShareSelectShop
    },
    {
      path: '/shopShareJoinGoods',
      name: 'ShopShareJoinGoods',
      component: ShopShareJoinGoods
    },
    {
      path: '/shopShareJoinShop/:shopId',
      name: 'ShopShareJoinShop',
      component: ShopShareJoinShop,
      props: true
    },
    {
      path: '/shopShareJoinShopTotal/:shopId',
      name: 'ShopShareJoinShopTotal',
      component: ShopShareJoinShopTotal,
      props: true
    },
    {
      path: '/shopShareDistShop/:shopId',
      name: 'ShopShareDistShop',
      component: ShopShareDistShop,
      props: true
    },
    {
      path: '/shopShareDistGoodsAdd',
      name: 'ShopShareDistGoodsAdd',
      component: ShopShareDistGoodsAdd
    },
    {
      path: '/shopShareDistShopTotal/:shopId',
      name: 'ShopShareDistShopTotal',
      component: ShopShareDistShopTotal,
      props: true
    },
    {
      path: '/shopShareDistShopSet/:shopId?',
      name: 'ShopShareDistShopSet',
      component: ShopShareDistShopSet,
      props: true
    },
    {
      path: '/shopShareDistHdSet/:hdId?',
      name: 'ShopShareDistHdSet',
      component: ShopShareDistHdSet,
      props: true
    },
    {
      path: '/friendShop',
      name: 'FriendShop',
      component: FriendShop,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/shopDetail/:shopId?/:friendFlag?',
      name: 'ShopDetail',
      component: ShopDetail,
      props: true
    },
    {
      path: '/goodsList/:shopId',
      name: 'GoodsList',
      component: GoodsList,
      props: true
    },
    {
      path: '/userSign/:shopId',
      name: 'UserSign',
      component: UserSign,
      props: true
    },
    {
      path: '/goodsDetail/:goodsId',
      name: 'GoodsDetail',
      component: GoodsDetail,
      props: true
    },
    {
      path: '/orderBuy/:shopId',
      name: 'OrderBuy',
      component: OrderBuy,
      props: true
    },
    {
      path: '/shareDetail/:shareId',
      name: 'shareDetail',
      component: ShareDetail,
      props: true
    },
    {
      path: '/confirmOrder/:orderId',
      name: 'ConfirmOrder',
      component: ConfirmOrder,
      props: true
    },
    {
      path: '/selectAddress',
      name: 'SelectAddress',
      component: SelectAddress
    },
    {
      path: '/addAddress',
      name: 'AddAddress',
      component: AddAddress
    },
    {
      path: '/orderDetail/:orderId',
      name: 'OrderDetail',
      component: OrderDetail,
      props: true
    },
    {
      path: '/shoppingCar',
      name: 'ShoppingCar',
      component: ShoppingCar,
      props: true
    },
    {
      path: '/orderList/:tabIndex',
      name: 'OrderList',
      component: OrderList,
      props: true
    },
    {
      path: '/returnGoods/:orderNo',
      name: 'ReturnGoods',
      component: ReturnGoods,
      props: true
    },
    {
      path: '/shareReturn/:orderId',
      name: 'ShareReturn',
      component: ShareReturn,
      props: true
    },
    {
      path: '/expressDetail/:orderId',
      name: 'ExpressDetail',
      component: ExpressDetail,
      props: true
    },
    {
      path: '/orderComment/:goodsId/:orderId',
      name: 'OrderComment',
      component: OrderComment,
      props: true
    },
    {
      path: '/orderLogisticsComment',
      name: 'OrderLogisticsComment',
      component: OrderLogisticsComment,
      props: true
    },
    {
      path: '/orderCommentDetail/:goodsId/:orderId',
      name: 'OrderCommentDetail',
      component: OrderCommentDetail,
      props: true
    },
    {
      path: '/goodsExchange',
      name: 'GoodsExchange',
      component: GoodsExchange
    },
    {
      path: '/selectPeople',
      name: 'SelectPeople',
      component: SelectPeople
    },
    {
      path: '/platformSend',
      name: 'PlatformSend',
      component: PlatformSend
    },
    {
      path: '/giftGoods',
      name: 'GiftGoods',
      component: GiftGoods
    },
    {
      path: '/paymentSuccess/:orderId',
      name: 'PaymentSuccess',
      component: PaymentSuccess,
      props: true
    },
    {
      path: '/searchNeed',
      name: 'SearchNeed',
      component: SearchNeed
    },
    {
      path: '/allAssess/:goodsId/:shopId',
      name: 'AllAssess',
      component: AllAssess,
      props: true
    },
    {
      path: '/requestRefund/:orderId',
      name: 'RequestRefund',
      component: RequestRefund,
      props: true
    },
    {
      path: '/shopRefundDetail/:orderId',
      name: 'ShopRefundDetail',
      component: ShopRefundDetail,
      props: true
    },
    {
      path: '/refundDetail/:orderId',
      name: 'RefundDetail',
      component: RefundDetail,
      props: true
    },
    {
      path: '/consultHistory/:orderId',
      name: 'ConsultHistory',
      component: ConsultHistory,
      props: true
    },
    {
      path: '/needList',
      name: 'NeedList',
      component: NeedList
    },
    {
      path: '/ewmReceipt/:shareNo',
      name: 'EwmReceipt',
      component: EwmReceipt,
      props: true
    },
    {
      path: '/releaseNews/:orgId?',
      name: 'ReleaseNews',
      component: ReleaseNews,
      props: true
    },
    {
      path: '/ReleaseNewsList/:newsId',
      name: 'ReleaseNewsList',
      component: ReleaseNewsList,
      props: true
    },

    {
      path: '/myInformation',
      name: 'MyInformation',
      component: MyInformation
    },
    //修改台号
    {
      path: '/modifyMachine',
      name: 'modifyMachine',
      component: modifyMachine
    },
    {
      path: '/editLeaflet',
      name: 'EditLeaflet',
      component: EditLeaflet
    },
    {
      path: '/NewsDetails',
      name: 'NewsDetails',
      component: NewsDetails
    },
    {
      path: '/newsShow',
      name: 'NewsShow',
      component: NewsShow
    },
    {
      path: '/selectAuthor',
      name: 'SelectAuthor',
      component: SelectAuthor
    }, {
      path: '/myNews',
      name: 'MyNews',
      component: MyNews,
    },
    {
      path: '/releaseSchedule',
      name: 'ReleaseSchedule',
      component: ReleaseSchedule
    },
    {
      path: '/selectPerson',
      name: 'SelectPerson',
      component: SelectPerson
    },
    {
      path: '/SKYK',
      name: 'SKYK',
      component: SKYK
    },
    {
      path: '/TXSK',
      name: 'TXSK',
      component: TXSK
    },
    {
      path: '/scheduleDetails',
      name: 'ScheduleDetails',
      component: ScheduleDetails
    },
    {
      path: '/addScheduleFlow',
      name: 'AddScheduleFlow',
      component: AddScheduleFlow
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/mySchedule',
      name: 'MySchedule',
      component: MySchedule
    },
    {
      path: '/abilityList',
      name: 'AbilityList',
      component: AbilityList
    },
    {
      path: '/abilityDetails/:entity_type?',
      name: 'AbilityDetails',
      component: AbilityDetails,
      props: true
    },
    {
      path: '/scanResult',
      name: 'ScanResult',
      component: ScanResult
    },
    {
      path: '/abilityCertify',
      name: 'AbilityCertify',
      component: AbilityCertify
    },
    {
      path: '/scheduleReminder',
      name: 'ScheduleReminder',
      component: ScheduleReminder
    },
    {
      path: '/groupSchedule',
      name: 'GroupSchedule',
      component: GroupSchedule
    },
    {
      path: '/scheduleJob',
      name: 'ScheduleJob',
      component: ScheduleJob
    },
    {
      path: '/zwGoods/:wuId/:wuName',
      name: 'ZwGoods',
      component: ZwGoods,
      props: true
    },
    {
      path: '/myWallet/:userId?',
      name: 'MyWallet',
      component: MyWallet,
      props: true
    },
    {
      path: '/chargeMoney/:userId?',
      name: 'ChargeMoney',
      component: ChargeMoney,
      props: true
    },
    {
      path: '/addBankCard',
      name: 'AddBankCard',
      component: AddBankCard
    },
    {
      path: '/selectBankCardType',
      name: 'SelectBankCardType',
      component: SelectBankCardType
    },
    {
      path: '/rechargeSuccess',
      name: 'RechargeSuccess',
      component: RechargeSuccess
    },
    {
      path: '/walletSetting',
      name: 'WalletSetting',
      component: WalletSetting
    },
    {
      path: '/getCash',
      name: 'GetCash',
      component: GetCash
    },
    {
      path: '/collectionSetting',
      name: 'CollectionSetting',
      component: CollectionSetting
    },
    {
      path: '/myBankCard',
      name: 'MyBankCard',
      component: MyBankCard
    },
    {
      path: '/addPayWay',
      name: 'AddPayWay',
      component: AddPayWay
    },
    {
      path: '/updatePayPassword',
      name: 'UpdatePayPassword',
      component: UpdatePayPassword
    },
    {
      path: '/myBill',
      name: 'MyBill',
      component: MyBill
    },
    {
      path: '/myBill1/:userId',
      name: 'MyBill1',
      component: MyBill,
      props: true
    },
    {
      path: '/result/:wId',
      name: 'Result',
      component: Result,
      props: true
    },
    {
      path: '/initPayPassword',
      name: 'InitPayPassword',
      component: InitPayPassword
    },
    {
      path: '/initPayPassword1/:pageName',
      name: 'InitPayPassword1',
      component: InitPayPassword,
      props: true
    },
    {
      path: '/findPassword',
      name: 'FindPassword',
      component: FindPassword
    },
    {
      path: '/shareList',
      name: 'ShareList',
      component: ShareList
    },
    {
      path: '/Last/:groupId?',
      name: 'Last',
      component: Last,
      props: true
    },
    {
      path: '/SA',
      name: 'SA',
      component: SA
    },
    {
      path: '/ReleaseAbility/:groupId?',
      name: 'ReleaseAbility',
      component: ReleaseAbility,
      props: true
    },
    {
      path: '/PersonList',
      name: 'PersonList',
      component: PersonList
    },
    {
      path: '/OfficeList',
      name: 'OfficeList',
      component: OfficeList
    },
    {
      path: '/ZPCG',
      name: 'ZPCG',
      component: ZPCG
    },
    {
      path: '/OnlyNeedList',
      name: 'OnlyNeedList',
      component: OnlyNeedList
    },
    {
      path: '/shopOrderDetail/:orderId',
      name: 'ShopOrderDetail',
      component: ShopOrderDetail,
      props: true
    },
    {
      path: '/shopOrderList/:tabIndex/:shopId',
      name: 'ShopOrderList',
      component: ShopOrderList,
      props: true
    },
    {
      path: '/rejectRefund/:orderId',
      name: 'RejectRefund',
      component: RejectRefund,
      props: true
    },
    {
      path: '/customerOrderBuy/:shareNoAndshopId',
      name: 'CustomerOrderBuy',
      component: CustomerOrderBuy,
      props: true
    },
    {
      path: '/addOrderList/:shopId',
      name: 'AddOrderList',
      component: AddOrderList,
      props: true
    },
    {
      path: '/qrReceipt/:orderId',
      name: 'QrReceipt',
      component: QrReceipt,
      props: true
    },
    {
      path: '/friendOrderPay/:orderId',
      name: 'FriendOrderPay',
      component: FriendOrderPay,
      props: true
    },
    {
      path: '/homeBestGoods',
      name: 'HomeBestGoods',
      component: HomeBestGoods,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/locationBestShop',
      name: 'LocaitonBestShop',
      component: LocaitonBestShop,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/nearRent',
      name: 'NearRent',
      component: NearRent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/shopExten/:tabtype',
      name: 'ShopExten',
      component: ShopExten,
      props: true
    },
    {
      path: '/bestGoodsShare',
      name: 'BestGoodsShare',
      component: BestGoodsShare,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/payment/:orderId',
      name: 'Payment',
      component: Payment,
      props: true
    },
    {
      path: '/shareGoods/:addHw?',
      name: 'ShareGoods',
      component: ShareGoods,
      props: true
    },
    {
      path: '/myShareShop/:groupId',
      name: 'MyShareShop',
      component: MyShareShop,
      props: true
    },
    {
      path: '/myJoinShare/:tabIndex?',
      name: 'MyJoinShare',
      component: MyJoinShare,
      props: true
    },
    {
      path: '/friendList/:shopId?',
      name: 'FriendList',
      component: FriendList,
      props: true
    },
    {
      path: '/BindPhone',
      name: 'BindPhone',
      component: BindPhone
    },
    {
      path: '/AddFriend',
      name: 'AddFriend',
      component: AddFriend
    },
    {
      path: '/SearchFriend',
      name: 'SearchFriend',
      component: SearchFriend
    },
    {
      path: '/ScanInterface',
      name: 'ScanInterface',
      component: ScanInterface
    },
    {
      path: '/shareGoodsBase/:idType/:shareId',
      name: 'ShareGoodsBase',
      component: ShareGoodsBase,
      props: true
    },
    {
      path: '/shareGoodsDetail/:syId/:manage?',
      name: 'ShareGoodsDetail',
      component: ShareGoodsDetail,
      props: true
    },
    {
      path: '/shareGoodsDetail1/:syId/:shopFlag',
      name: 'ShareGoodsDetail1',
      component: ShareGoodsDetail,
      props: true
    },
    {
      path: '/cashPayment/:orderId',
      name: 'CashPayment',
      component: CashPayment,
      props: true
    },
    {
      path: '/GroupNotice',
      name: 'GroupNotice',
      component: GroupNotice
    },
    {
      path: '/bindGoods/:orderId',
      name: 'BindGoods',
      component: BindGoods,
      props: true
    },
    {
      path: '/bindGoodsList/:orderId',
      name: 'BindGoodsList',
      component: BindGoodslist,
      props: true
    },
    {
      path: '/GrouperDetails/:zuId?',
      name: 'GrouperDetails',
      component: GrouperDetails,
      props: true
    },
    {
      path: '/GroupSetting',
      name: 'GroupSetting',
      component: GroupSetting
    },
    {
      path: '/GroupList',
      name: 'GroupList',
      component: GroupList
    },
    {
      path: '/BusinessStreet/:dwId',
      name: 'BusinessStreet',
      component: BusinessStreet,
      props: true
    }, {
      path: '/ParkTeam/:dwId',
      name: 'ParkTeam',
      component: ParkTeam,
      props: true
    },
    {
      path: '/SelectGrouper',
      name: 'SelectGrouper',
      component: SelectGrouper
    },
    {
      path: '/SelectGrouper2',
      name: 'SelectGrouper2',
      component: SelectGrouper2
    },
    {
      path: '/GroupManager',
      name: 'GroupManager',
      component: GroupManager
    },
    {
      path: '/SimpleGroupSetting',
      name: 'SimpleGroupSetting',
      component: SimpleGroupSetting
    },
    {
      path: '/initTranPassword',
      name: 'InitTranPassword',
      component: InitTranPassword
    },
    {
      path: '/initTranPassword1/:type',
      name: 'InitTranPassword1',
      component: InitTranPassword,
      props: true
    },
    {
      path: '/receivePayment',
      name: 'ReceivePayment',
      component: ReceivePayment
    },
    {
      path: '/ewmReceive',
      name: 'EwmReceive',
      component: EwmReceive
    },
    {
      path: '/wxAuthor/:params',
      name: 'WxAuthor',
      component: WxAuthor
    },
    {
      path: '/setAmount',
      name: 'SetAmount',
      component: SetAmount
    },
    {
      path: '/postRecord',
      name: 'PostRecord',
      component: PostRecord
    },
    {
      path: '/DanWeiDetails',
      name: 'DanWeiDetails',
      component: DanWeiDetails
    },
    {
      path: '/RoleDetails/:zuId?',
      name: 'RoleDetails',
      component: RoleDetails,
      props: true
    },
    {
      path: '/SelectRole',
      name: 'SelectRole',
      component: SelectRole
    },
    {
      path: '/SelectDanWei',
      name: 'SelectDanWei',
      component: SelectDanWei
    },
    {
      path: '/unlockWallet',
      name: 'UnlockWallet',
      component: UnlockWallet
    },
    {
      path: '/inputAmount/:qrCode',
      name: 'InputAmount',
      component: InputAmount,
      props: true
    },
    {
      path: '/moneyCode',
      name: 'MoneyCode',
      component: MoneyCode,
      props: true
    },
    {
      path: '/paymentComplete/:orderId',
      name: 'PaymentComplete',
      component: PaymentComplete,
      props: true
    },
    {
      path: '/shopShareDistDetail/:shopId?',
      name: 'ShopShareDistDetail',
      component: ShopShareDistDetail,
      props: true
    },
    {
      path: '/hdDetail/:hdId',
      name: 'HdDetail',
      component: HdDetail,
      props: true
    },
    {
      path: '/expressBindGoods/:orderId',
      name: 'ExpressBindGoods',
      component: ExpressBindGoods,
      props: true
    },
    {
      path: '/shopShareGoodsDetail/:goodsId',
      name: 'ShopShareGoodsDetail',
      component: ShopShareGoodsDetail,
      props: true
    },
    {
      path: '/hdShareDetail/:hdId/:join?',
      name: 'HdShareDetail',
      component: HdShareDetail,
      props: true
    },
    {
      path: '/group/application/handle/:dataid',
      name: 'Handle',
      component: Handle,
      props: true
    },
    {
      path: '/joinShopSuccess/:shopId',
      name: 'JoinShopSuccess',
      component: joinShopSuccess,
      props: true
    },
    {
      path: '/userShareGoodsDetail/:syId',
      name: 'UserShareGoodsDetail',
      component: UserShareGoodsDetail,
      props: true
    },
    {
      // path: '/shopHdShareDetail/:shopId/:hdId?',
      path: '/shopHdShareDetail/:hdId',
      name: 'ShopHdShareDetail',
      component: ShopHdShareDetail,
      props: true
    },
    {
      path: '/NewsLuckStar',
      name: 'NewsLuckStar',
      component: NewsLuckStar
    },
    {
      path: '/shareInfoList/:wuZu/:isComponent?',
      name: 'ShareInfoList',
      component: ShareInfoList,
      props: true
    },
    {
      path: '/joinGoodsBase/:goodsId',
      name: 'JoinGoodsBase',
      component: JoinGoodsBase,
      props: true
    },
    {
      path: '/editGoodsDetail/:goodsId/:isShare?',
      name: 'EditGoodsDetail',
      component: EditGoodsDetail,
      props: true
    },
    {
      path: '/shareGoodsToFriend/:goodsId',
      name: 'ShareGoodsToFriend',
      component: ShareGoodsToFriend,
      props: true
    },
    {
      path: '/myBussinessCircle',
      name: 'myBussinessCircle',
      component: myBussinessCircle
    },
    {
      path: '/friendRecommendGoods',
      name: 'friendRecommendGoods',
      component: friendRecommendGoods
    },
    {
      path: '/surroundGoods',
      name: 'surroundGoods',
      component: surroundGoods
    },
    {
      path: '/friendRecommendShop',
      name: 'friendRecommendShop',
      component: friendRecommendShop
    },
    {
      path: '/hwList/:shopId?',
      name: 'HwList',
      component: HwList,
      props: true
    },
    {
      path: '/hdList/:shopId?',
      name: 'HdList',
      component: HdList,
      props: true
    },
    {
      path: '/myShopRadius',
      name: 'MyShopRadius',
      component: MyShopRadius
    },
    {
      path: '/GoodsType/:typeId',
      name: 'GoodsType',
      component: GoodsType,
      props: true
    },
    {
      path: '/inviteHd',
      name: 'InviteHd',
      component: InviteHd
    },
    {
      path: '/inviteHw',
      name: 'InviteHw',
      component: InviteHw
    },
    {
      path: '/myCustomer',
      name: 'MyCustomer',
      component: MyCustomer
    },
    {
      path: '/searchHead',
      name: 'searchHead',
      component: searchHead
    },
    {
      path: '/myShareFriend',
      name: 'MyShareFriend',
      component: MyShareFriend
    },
    {
      path: '/queryNextShare/:wuZu/:hiddenHead?',
      name: 'QueryNextShare',
      component: QueryNextShare,
      props: true
    },
    {
      path: '/shareShopManage/:shopId/:enterType?',
      name: 'ShareShopManage',
      component: ShareShopManage,
      props: true
    },
    {
      path: '/bestShopShare',
      name: 'BestShopShare',
      component: BestShopShare,
      props: true
    },
    {
      path: '/PositionManagement/:zuId',
      name: 'PositionManagement',
      component: PositionManagement,
      props: true
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      props: true
    },
    {
      path: '/location',
      name: 'location',
      component: location
    },
    {
      path: '/ShareGoodsSalesStatic/:goodsId',
      name: 'ShareGoodsSalesStatic',
      component: ShareGoodsSalesStatic,
      props: true
    },
    {
      path: '/joinGoodsStatic/:shopId',
      name: 'JoinGoodsStatic',
      component: JoinGoodsStatic,
      props: true
    },
    {
      path: '/detailClassify/:goodsType/:selectedClassify?',
      name: 'DetailClassify',
      component: DetailClassify,
      props: true
    },
    {
      path: '/collectGoodsList',
      name: 'CollectGoodsList',
      component: CollectGoodsList
    },
    {
      path: '/friendShareGoods',
      name: 'friendShareGoods',
      component: friendShareGoods
    },
    {
      path: "/myShopList",
      name: "myShopList",
      component: myShopList
    },
    {
      path: "/myShopList1/:type",
      name: "myShopList1",
      component: myShopList,
      props: true
    },
    {
      path: "/leifengPackage",
      name: "leifengPackage",
      component: leifengPackage
    },
    {
      path: '/wxShareTips',
      name: 'WxShareTips',
      component: WxShareTips
    },
    {
      path: '/carryPackage',
      name: 'carryPackage',
      component: carryPackage
    },
    {
      path: '/myLeifengPackage',
      name: 'myLeifengPackage',
      component: myLeifengPackage
    },
    {
      path: '/myFollow',
      name: 'myFollow',
      component: myFollow
    },
    {
      path: '/nearPeople',
      name: 'nearPeople',
      component: nearPeople
    },
    {
      path: '/nearObject',
      name: 'nearObject',
      component: nearObject
    },
    {
      path: '/usefulTakeAway',
      name: 'usefulTakeAway',
      component: usefulTakeAway
    },
    {
      path: '/borrowOne',
      name: 'borrowOne',
      component: borrowOne
    },
    {
      path: '/QuanXianSZ/:shopId/:qxid',
      name: 'QuanXianSZ',
      component: QuanXianSZ,
      props: true
    },
    {
      path: '/QuanXianGL/:shopId',
      name: 'QuanXianGL',
      component: QuanXianGL,
      props: true
    },
    {
      path: '/treasurehunt',
      name: "treasurehunt",
      component: treasurehunt
    },
    {
      path: '/sendShopToFriend/:shopId',
      name: 'SendShopToFriend',
      component: SendShopToFriend,
      props: true
    },
    {
      path: "/treeList",
      name: "treeList",
      component: treeList
    },
    {
      path: '/qualityPeriod/:active',
      name: 'qualityPeriod',
      component: qualityPeriod,
      props: true
    },
    {
      path: '/qualityPeriodFirst',
      name: 'qualityPeriodFirst',
      component: qualityPeriodFirst
    },
    {
      path: "/friendShareList/:type/:objectId",
      name: "friendShareList",
      component: friendShareList,
      props: true
    },
    {
      path: "/orgDetail/:orgId",
      name: "orgDetail",
      component: orgDetail,
      props: true
    },
    {
      path: "/systemMsg",
      name: "systemMsg",
      component: systemMsg
    },
    {
      path: "/msgDetail/:conversionId",
      name: "msgDetail",
      component: msgDetail,
      props: true
    },
    {
      path: '/viewShare/:wuIds/:hiddenHead?',
      name: 'ViewShare',
      component: ViewShare,
      props: true
    },
    {
      path: '/editShopShareGoodsHwSet/:syId/:hwId?',
      name: 'EditShopShareGoodsHwSet',
      component: EditShopShareGoodsHwSet,
      props: true
    },
    {
      path: '/contactsDetail/:contactId',
      name: 'contactsDetail',
      component: contactsDetail,
      props: true
    },
    {
      path: '/friendDetail/:roleId',
      name: 'friendDetail',
      component: friendDetail,
      props: true
    },
    {
      path: '/zhiwuDetail/:zhiwuId',
      name: 'zhiwuDetail',
      component: zhiwuDetail,
      props: true
    },
    {
      path: '/chooseShop',
      name: 'chooseShop',
      component: chooseShop
    },
    {
      path: '/transferMoney/:roleId',
      name: 'transferMoney',
      component: transferMoney,
      props: true
    },
    {
      path: '/transferSuccess/:successFlag/:info',
      name: 'transferSuccess',
      component: transferSuccess,
      props: true
    },
    {
      path: '/addCompanyBankCard',
      name: 'addCompanyBankCard',
      component: addCompanyBankCard
    },
    {
      path: '/shopDefaultRecommend/:shopId',
      name: 'ShopDefaultRecommend',
      component: ShopDefaultRecommend,
      props: true
    },
    {
      path: '/scanPay/:fkCode',
      name: 'scanPay',
      component: scanPay,
      props: true
    },
    {
      path: '/BankCardInfo/:cardId',
      name: 'BankCardInfo',
      component: BankCardInfo,
      props: true
    },
    {
      path: "/myGoodsShopShare/:shopId",
      name: 'myGoodsShopShare',
      component: myGoodsShopShare,
      props: true
    },
    {
      path: "/friendSharingStore",
      name: 'friendSharingStore',
      component: friendSharingStore
    },
    {
      path: "/goodsShopManage",
      name: 'goodsShopManage',
      component: goodsShopManage
    },
    {
      path: "/shopManagement/:shopId",
      name: 'shopManagement',
      component: shopManagement,
      props: true,
    },
    {
      path: "/goodShopSet",
      name: 'goodShopSet',
      component: goodShopSet
    },
    {
      path: "/restPayPassword",
      name: "restPayPassword",
      component: restPayPassword
    },
    {
      path: "/restTranPassword",
      name: "restTranPassword",
      component: restTranPassword
    },
    {
      path: "/transferWalletMoney/:userId",
      name: "transferWalletMoney",
      component: transferWalletMoney,
      props: true
    },
    {
      path: "/pointMap/:point/:title",
      name: "pointMap",
      component: pointMap,
      props: true
    },
    {
      path: "/activityList/:shopId",
      name: "shopActivityList",
      component: shopActivityList,
      props: true
    },
    {
      path: "/addFriendVip/:shopRoleId",
      name: "addFriendVip",
      component: addFriendVip,
      props: true
    },
    {
      path: "/hotList/:shopId",
      name: "hotList",
      component: hotList,
      props: true
    },
    {
      path: "/scanBuy",
      name: "scanBuy",
      component: scanBuy
    },
    {
      path: "/openWebUrl/:url",
      name: "openWebUrl",
      component: openWebUrl,
      props: true
    },
    {
      path: "/ulikeList/:shopId",
      name: "ulikeList",
      component: ulikeList,
      props: true
    },
    {
      path: "/bestList/:shopId",
      name: "bestList",
      component: bestList,
      props: true
    },
    {
      path: "/newGoodsList/:shopId",
      name: "newGoodsList",
      component: newGoodsList,
      props: true
    },
    {
      path: "/myColumn",
      name: "myColumn",
      component: myColumn
    },
    {
      path: "/orgNews",
      name: "orgNews",
      component: orgNews
    },
    {
      path: "/orgModuleList/:type/:id",
      name: "orgModuleList",
      component: orgModuleList,
      props: true
    },
    {
      path: "/orgModuleListTest/:type/:id",
      name: "orgModuleListTest",
      component: orgModuleListTest,
      props: true
    },
    {
      path: "/orgReleaseNews/:orgId",
      name: "orgReleaseNews",
      component: orgReleaseNews,
      props: true
    },
    {
      path: "/orgTreeList/:groupId?/:orgId",
      name: "orgTreeList",
      component: orgTreeList,
      props: true
    },
    {
      path: "/orgLeifengPackage/:orgId",
      name: "orgLeifengPackage",
      component: orgLeifengPackage,
      props: true
    },
    {
      path: "/orgCarryPackage/:orgId",
      name: "orgCarryPackage",
      component: orgCarryPackage,
      props: true
    },
    {
      path: "/orgUsefulTakeAway/:orgId",
      name: "orgUsefulTakeAway",
      component: orgUsefulTakeAway,
      props: true
    },
    {
      path: "/orgHelp/:groupId/:orgId",
      name: "orgHelp",
      component: orgHelp,
      props: true
    },
    {
      path: "/orgThumbtack/:orgId",
      name: "orgThumbtack",
      component: orgThumbtack,
      props: true
    },
    {
      path: "/orgPictureWall/:orgId",
      name: "orgPictureWall",
      component: orgPictureWall,
      props: true
    },
    {
      path: "/orgShortVideo/:orgId",
      name: "orgShortVideo",
      component: orgShortVideo,
      props: true
    },
    {
      path: "/orgVideoDetail/:id",
      name: "orgVideoDetail",
      component: orgVideoDetail,
      props: true
    },
    {
      path: "/thumbtackRelease/:type?/:id?",
      name: "thumbtackRelease",
      component: thumbtackRelease,
      props: true
    },
    {
      path: "/orgThumbtackDetail/:id",
      name: "orgThumbtackDetail",
      component: orgThumbtackDetail,
      props: true
    },
    {
      path: "/orgCommunityList",
      name: "orgCommunityList",
      component: orgCommunityList,
      props: true
    },
    {
      path: "/orgImgDetail/:id",
      name: "orgImgDetail",
      component: orgImgDetail,
      props: true
    },
    {
      path: "/orgImgList/:id",
      name: "orgImgList",
      component: orgImgList,
      props: true
    },
    {
      path: "/orgVideoList/:id",
      name: "orgVideoList",
      component: orgVideoList,
      props: true
    },
    {
      path: "/chatRoomSetting/:groupId/:orgId",
      name: "chatRoomSetting",
      component: chatRoomSetting,
      props: true
    },
    {
      path: "/myTreeList",
      name: "myTreeList",
      component: myTreeList
    },
    {
      path: "/openResContent/:id",
      name: "openResContent",
      component: openResContent,
      props: true
    },
    {
      path: "/communityList",
      name: "communityList",
      component: communityList
    },
    {
      path: "/login/:returnUrl?",
      name: "login",
      component: login,
      props: true
    },
    {
      path: "/register",
      name: "register",
      component: register
    },
    {
      path: "/forgetPassword",
      name: "forgetPassword",
      component: forgetPassword
    },
    {
      path: "/activityPay",
      name: "activityPay",
      component: activityPay
    },
    {
      path: "/realNameForm",
      name: "realNameForm",
      component: realNameForm
    },
    {
      path: "/editActivity/:activityId/:dwId",
      name: "editActivity",
      component: editActivity,
      props: true
    },
    {
      path: "/activitySignList",
      name: "activitySignList",
      component: activitySignList
    },
    {
      path: "/activitySignListAll",
      name: "activitySignListAll",
      component: activitySignListAll
    },
    {
      path: "/groupChat/:type/:id",
      name: "groupChat",
      component: groupChat,
      props: true
    },
    {
      path: "/addActivity/:dwId?",
      name: "addActivity",
      component: addActivity,
      props: true
    },
    {
      path: "/dwActivityList/:dwId",
      name: "dwActivityList",
      component: dwActivityList,
      props: true
    },{
      path: "/myActivityList/:dwId?",
      name: "myActivityList",
      component: myActivityList,
      props: true
    },{
      path: "/signerManage",
      name: "signerManage",
      component: signerManage,
      props: true
    },
    {
      path: "/dwActivityDetails/:activityId",
      name: "dwActivityDetails",
      component: dwActivityDetails,
      props: true
    },
    {
      path: "/orgCommercialStreet/:dwId",
      name: "orgCommercialStreet",
      component: orgCommercialStreet,
      props: true
    },
    {
      path: "/groupChatList",
      name: "groupChatList",
      component: groupChatList,
      props: true
    },
    {
      path: "/groupChatBuy/:goodsId/:shopId",
      name: "groupChatBuy",
      component: groupChatBuy,
      props: true
    },
    {
      path: "/chargeMoneyByWalletId/:walletId",
      name: "chargeMoneyByWalletId",
      component: chargeMoneyByWalletId,
      props: true
    },
    {
      path: "/chatRoomList",
      name: "chatRoomList",
      component: chatRoomList
    },
    {
      path: "/sharePage/:type/:id",
      name: "sharePage",
      component: sharePage,
      props: true
    },
    {
      path: "/myWalletByUserId/:userId",
      name: "myWalletByUserId",
      component: myWalletByUserId,
      props: true
    },
    {
      path: "/UnlockWalletByUserId/:userId",
      name: "UnlockWalletByUserId",
      component: UnlockWalletByUserId,
      props: true
    },
    {
      path: "/chooseCommunity/:type/:id",
      name: "chooseCommunity",
      component: chooseCommunity,
      props: true
    },
    {
      path: "/billDetail/:billId",
      name: "billDetail",
      component: billDetail,
      props: true
    },
    {
      path: "/redPackageReceive/:packageId",
      name: "redPackageReceive",
      component: redPackageReceive,
      props: true
    },
    {
      path: "/redPackageColletLog",
      name: "redPackageColletLog",
      component: redPackageColletLog
    },
    {
      path: "/redPackagePayLog",
      name: "redPackagePayLog",
      component: redPackagePayLog
    },
    {
      path: "/threeChatList",
      name: "threeChatList",
      component: threeChatList
    },
    {
      path: "/myThumbtack/:roleId?",
      name: "myThumbtack",
      component: myThumbtack,
      props: true
    },
    {
      path: "/teamList",
      name: "teamList",
      component: teamList
    },
    {
      path: "/thumbtackList",
      name: "thumbtackList",
      component: thumbtackList
    },
    {
      path: "/sendRedPackage/:zuId",
      name: "sendRedPackage",
      component: sendRedPackage,
      props: true
    },
    {
      path: "/newsDetailCommit/:id",
      name: "newsDetailCommit",
      component: newsDetailCommit,
      props: true
    },
    {
      path: "/chooseGroup/:type/:id",
      name: "chooseGroup",
      component: chooseGroup,
      props: true
    },
    {
      path: "/chooseRole",
      name: "chooseRole",
      component: chooseRole
    },
    {
      path: "/mySharing",
      name: "mySharing",
      component: mySharing
    },
    {
      path: "/passwordSetting",
      name: "passwordSetting",
      component: passwordSetting
    },
    {
      path: "/changeAccountPassword",
      name: "changeAccountPassword",
      component: changeAccountPassword
    },
    {
      path: "/activityJoinForm",
      name: "ActivityJoinForm",
      component: ActivityJoinForm
    }, {
      path: "/rewriteSignerTW/:recordId/:activityId",
      name: "rewriteSignerTW",
      component: rewriteSignerTW,
      props: true
    },
    {
      path: "/changePayPassword",
      name: "changePayPassword",
      component: changePayPassword
    },
    {
      path: "/changeTransationPassword",
      name: "changeTransationPassword",
      component: changeTransationPassword
    },
    {
      path: "/changePhone",
      name: "changePhone",
      component: changePhone
    },
    {
      path: "/changeSafePhone",
      name: "changeSafePhone",
      component: changeSafePhone
    },
    {
      path: "/setting",
      name: "setting",
      component: setting
    },
    {
      path: "/chooseAroundModel",
      name: "chooseAroundModel",
      component: chooseAroundModel
    },
    {
      path: "/chooseDefaultTeam",
      name: "chooseDefaultTeam",
      component: chooseDefaultTeam
    },
    {
      path: "/feedback",
      name: "feedback",
      component: feedback
    },
    {
      path: "/about",
      name: "about",
      component: about
    },
    {
      path: "/collectMoney/:code",
      name: "collectMoney",
      component: collectMoney,
      props: true
    },
    {
      path: "/collectPaySuccess/:successFlag/:info",
      name: "collectPaySuccess",
      component: collectPaySuccess,
      props: true
    },
    {
      path: "/liveList/:dwId",
      name: "liveList",
      component: liveList,
      props: true
    },
    {
      path: "/liveDetail/:id",
      name: "liveDetail",
      component: liveDetail,
      props: true
    },{
      path: "/ActivityVideo",
      name: "ActivityVideo",
      component: ActivityVideo,
    },
    {
      path: "/livePlayBack/:roomId/:videoId",
      name: "livePlayBack",
      component: livePlayBack,
      props: true
    },
    {
      path: "/liveDetailDemo/:id",
      name: "liveDetailDemo",
      component: liveDetailDemo,
      props: true
    },
    {
      path: "/everybodyWatch",
      name: "everybodyWatch",
      component: everybodyWatch
    },
    {
      path: "/pictureWall",
      name: "pictureWall",
      component: pictureWall
    },
    {
      path: "/shortVideo",
      name: "shortVideo",
      component: shortVideo
    },
    {
      path: "/allLiveList/:tag?",
      name: "allLiveList",
      component: allLiveList,
      props: true
    },
    {
      path: "/allLivePlayList",
      name: "allLivePlayList",
      component: allLivePlayList
    },
    {
      path: "/orgVideoListDemo/:id",
      name: "orgVideoListDemo",
      component: orgVideoListDemo,
      props: true
    },
    {
      path: "/smallProgramLogin/:baseHeader",
      name: "smallProgramLogin",
      component: smallProgramLogin,
      props: true
    },
    {
      path: "/miniProgramMe",
      name: "miniProgramMe",
      component: miniProgramMe,
      props: true
    },
    {
      path: "/oneChatList",
      name: "oneChatList",
      component: oneChatList,
      props: true
    },
    {
      path: "/zhiBo",
      name: "zhiBo",
      redirect: '/zhiBo/shortVideo',
      component: zhiBo,
      props: true,
      children:[
        {
          path: 'shortVideo',
          name: 'shortVideo',
          component: miniShortVideo,
          props: true,
        },
        {
          path: 'focusShortVideo',
          name: 'focusShortVideo',
          component: focusShortVideo,
          props: true,
        },
        {
          path: 'pictureWall',
          name: 'pictureWall',
          component: miniPictureWall,
          props: true,
        },
        {
          path: 'focusPictureWall',
          name: 'focusPictureWall',
          component: focusPictureWall,
          props: true,
        },
        {
          path : "miniFocusLiveList",
          name : "miniFocusLiveList",
          component : miniFocusLiveList
        },
        {
          path : "miniRecommendLiveList",
          name : "miniRecommendLiveList",
          component : miniRecommendLiveList
        }
      ]
    },
    {
      path: "/dwZhiBo",
      name: "dwZhiBo",
      redirect: to =>{
        var {query} = to
        console.log(to,'路由参数')
        if(query.dwId){
          console.log(query.dwId,'查询参数')
          return `/dwZhiBo/orgShortVideo/${query.dwId}`
        }
      },
      component: dwZhiBo,
      props: true,
      children:[
        {
          path: 'focusShortVideo',
          name: 'focusShortVideo',
          component: focusShortVideo,
          props: true,
        },
        {
          path: 'orgShortVideo/:orgId',
          name: 'orgShortVideo',
          component: miniOrgShortVideo,
          props: true,
        },
        {
          path: 'focusPictureWall',
          name: 'focusPictureWall',
          component: focusPictureWall,
          props: true,
        },
        {
          path: 'orgPictureWall/:orgId',
          name: 'orgPictureWall',
          component: miniOrgPictureWall,
          props: true,
        },
        {
          path : "miniFocusLiveList",
          name : "miniFocusLiveList",
          component : miniFocusLiveList
        },
        {
          path : "miniRecommendLiveList",
          name : "miniRecommendLiveList",
          component : miniRecommendLiveList
        }
      ]
    },
    {
      path: "/unitZhiBo",
      name: "unitZhiBo",
      redirect: '/unitZhiBo/miniRecommendLiveList',
      component: unitZhiBo,
      props: true,
      children:[
        {
          path : "miniFocusLiveList",
          name : "miniFocusLiveList",
          component : miniFocusLiveList
        },
        {
          path : "miniRecommendLiveList",
          name : "miniRecommendLiveList",
          component : miniRecommendLiveList
        }
      ]
    },
    {
      path : "/communityWalkList",
      name : "communityWalkList",
      component : communityWalkList
    },
    {
      path: '/miniChat',
      name: 'miniChat',
      component: miniChat,
      redirect: '/miniChat/miniFriendList/:shopId?',
      props: true,
      children:[
        {
          path: "miniFriendList/:shopId?",
          name: "miniFriendList",
          component: miniFriendList,
          props: true
        },
        {
          path: "miniTeamList",
          name: "miniTeamList",
          component: miniTeamList,
          props: true
        },
        {
          path: "miniGroupList",
          name: "miniGroupList",
          component: miniGroupList,
          props: true
        },
      ]
    },
    {
      path : "/tuDing",
      name : "tuDing",
      component : tuDing
    },
    {
      path : "/userAgree",
      name : "userAgree",
      component : userAgree
    },
    {
      path : "/personCard",
      name : "personCard",
      component : personCard
    },
    {
			path : "/showReleaseNews",
			name : "showReleaseNews",
			component : showReleaseNews
    },
  ]
})


var getUserByUnionidTimer = ''
var getUserByUnionidCount = 0

const listenGetUserByUnionid = function (unionid, time) {
  getUserByUnionidTimer = setTimeout(() => {
    getUserByUnionid({
      unionid
    }, (res) => {
      if (res.code == 0) {
        let openid = getSessionStorage("openid")
        if (openid != null && openid) {
          res.data.openid = openid
        }
        setUser(res.data)
        clearTimeout(getUserByUnionidTimer)
      } else if (getUserByUnionidCount >= 10) {
        clearTimeout(getUserByUnionidTimer)
        toast("获取用户信息失败！")
        localStorage.clear()
        //把unionid-时间-存到后台日志
      } else {
        if (!checkLoginTime().access_token) {
          getUserByUnionidCount++
          if (getUserByUnionidCount < 2) {
            listenGetUserByUnionid(unionid, time)
          } else if (getUserByUnionidCount < 5) {
            listenGetUserByUnionid(unionid, time + 3000)
          }
        }
      }
    })
  }, time);
}

import wx from 'weixin-js-sdk'

//判断是否在小程序中
const checkSmallProgram = function () {
  let returnFlag = "abc";
  wx.miniProgram.getEnv(function (res) {
    if (res.miniprogram) {
      //ISSHOW  判断微信环境
      //realShow  判断小程序环境
      // localStorage.setItem('isShow','true')
      // localStorage.setItem('realShow','true')
      returnFlag = true;
    } else {
      returnFlag = false;
    }
  })
}

//判断是否需要调起微信授权接口
const ifSendWxAuthor = function () {
  let WEIXIN_WINDOW = window.navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1;
  if (checkSmallProgram()) {
    // setTimeout(function(){
    //   alert("到这里停下");
    // },3000)
    return false;
  }
  let wxUnionid = getSessionStorage("wxUnionid")
  if (wxUnionid == null) {
    wxUnionid = false
  }
  let openid = getSessionStorage("openid")
  if (openid == null) {
    openid = false
  }
  if (wxUnionid && !checkLoginTime().access_token) {
    listenGetUserByUnionid(wxUnionid, 1500)
  }
  //微信客户端， localStorage没有wxUnionid  并且 娶不到token   返回true
  return WEIXIN_WINDOW && (!wxUnionid || !openid) && (!checkLoginTime().access_token || !checkLoginTime().openid)
}

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
  // debugger
  if( 
    (to.name.toLowerCase() == 'home'.toLowerCase()) ||
    (to.name.toLowerCase() == 'userAgree'.toLowerCase()) ||
    (to.name.toLowerCase() == 'personCard'.toLowerCase()) ||
    (to.name.toLowerCase() == 'showReleaseNews'.toLowerCase())
    ){
		next();
    return;
  }
  //微信端flag
  let WEIXIN_WINDOW = window.navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1;
  //小程序flag
  let SMALL_PROGRAM = false;
  if(WEIXIN_WINDOW){
    //isShow  判断微信环境
    //realShow  判断小程序环境
    localStorage.setItem('isShow','true')
    wx.miniProgram.getEnv(function(res) {
      if (res.miniprogram) {
        localStorage.setItem('realShow', 'true')
        SMALL_PROGRAM = true;
        let miniToken = localStorage.getItem('miniToken')
        if (miniToken && (document.location.href.indexOf("token=") == -1)) {
          document.location.href = document.location.href + '?token=' + miniToken
        }
        let token = localStorage.token;
        if (document.location.href.indexOf("token=") == -1) {
          Dialog.confirm({
            message: "未检测到登录信息，是否登录?"
          }).then(() => {
            smallProgramLoginMethod();
          }).catch(() => {
            wx.miniProgram.navigateBack();
          })
          return;
        }
        let tokenArray = document.location.href.split("token=");
        let headerToken = decodeURIComponent(tokenArray[tokenArray.length - 1].split("&")[0]);
        if (token != headerToken) {
          // toast("token不正确，正在重新获取，请稍候");
          //把token截出
          let user = new Object();

          //切换token
          token = headerToken;
          localStorage.token = token;
          user.access_token = token;

          //从小程序中获取参数
          axios.get(properties.zj_zhi + '/szrole/current/', {
            headers: {
              "Authorization": token
            }
          }).then(function (response) {
            if (response.status >= 200 && response.status < 300) {
              let currentUser = response.data;
              user.id = currentUser.userid
              user.username = currentUser.name
              user.avatar = currentUser.photo
              user.role_id = currentUser.id
              user.account_level = 1;
              user.account_score = 1;
              user.identification_idnumber = true;
              user.identification_face = true;
              user.access_token = token;
              setLoginUser(user);

              // toast("获取成功");

              indexGoNext(WEIXIN_WINDOW, SMALL_PROGRAM, to, from, next);
            } else {
              alert("登录接口报错：" + JSON.stringify(response));
              if (response.status == 401) {
                localStorage.clear();
                callMiniProgram("clear-user", {}, (res) => {
                  alert("清除信息成功");
                })
              }
            }
          }).catch(function(error) {
            // alert("请求报错：" + error.response.data)
            alert(error.response.data)
            if(error.response.status == 401){
              localStorage.clear();
              callMiniProgram("clear-user", {}, (res) => {
                alert("清除信息成功");
              })
            }
          });
        } else {
          indexGoNext(WEIXIN_WINDOW, SMALL_PROGRAM, to, from, next);
        }
      } else {
        indexGoNext(WEIXIN_WINDOW, SMALL_PROGRAM, to, from, next);
      }
    })
  } else {
    console.log("非微信index");
    indexGoNext(WEIXIN_WINDOW, SMALL_PROGRAM, to, from, next);
  }
});

const indexGoNext = (WEIXIN_WINDOW, SMALL_PROGRAM, to, from, next) => {
  //当前的浏览器地址  只能用来 处理字符串 不能用来跳转
  let CURRENT_URL = window.location.href
  //需要处理微信多余的参数条件
  let REPAIRED_FLAG = (CURRENT_URL.indexOf('?from=') != -1)||(CURRENT_URL.indexOf('&isappinstalled=')!=-1)

  // 微信截取多余的参数
  if (WEIXIN_WINDOW && REPAIRED_FLAG) {
    let params = ""
    for (let key in to.query) {
      if (to.query[key] != null) {
        params += `${key}=${to.query[key]}&`
      }
    }
    if (params.indexOf('&') != -1) {
      params = params.substr(0, params.length - 1)
    }
    if (params.length > 2) {
      params = "?" + params
    }
    let link = properties.vueDomainName + '#' + to.path + params
    window.location.href = link
    return
  }

  if (
    to.name.toLowerCase() == 'locallogin'.toLowerCase() ||
    to.name.toLowerCase() == 'login'.toLowerCase() ||
    to.name.toLowerCase() == 'register'.toLowerCase() ||
    to.name.toLowerCase() == 'home'.toLowerCase() ||
    to.name.toLowerCase() == 'blankpage'.toLowerCase() ||
    to.name.toLowerCase() == 'nonelogin'.toLowerCase()
  ) {

    if (WEIXIN_WINDOW && to.name.toLowerCase() == 'nonelogin'.toLowerCase()) {
      toast.fail({
        message: '网络出小差了，请重试！',
        duration: 1500
      })
      setTimeout(() => {
        window.localStorage.clear()
        //这个可以关闭安卓系统的手机
        document.addEventListener("WeixinJSBridgeReady", () => {
          WeixinJSBridge.call("closeWindow");
        }, false);
        //这个可以关闭ios系统的手机
        WeixinJSBridge.call("closeWindow");

        //小程序的后退
        wx.miniProgram.navigateBack();
      }, 100);
    }
    next();
    return
  }
  //不校验token的页面
  if (
    to.name.toLowerCase() == 'last'.toLowerCase() ||
    to.name.toLowerCase() == 'abilitydetails'.toLowerCase() ||
    to.name.toLowerCase() == 'activityPay'.toLowerCase() ||
    to.name.toLowerCase() == 'groupdetails'.toLowerCase() ||
    to.name.toLowerCase() == 'activitySignListAll'.toLowerCase() ||
    to.name.toLowerCase() == 'shopDetail'.toLowerCase() ||
    to.name.toLowerCase() == 'goodsDetail'.toLowerCase()
  ) {
    if (ifSendWxAuthor() && SMALL_PROGRAM) {
      let params = ''
      for (let key in to.query) {
        if (to.query[key] != null) {
          params += `${key}=${to.query[key]}&`
        }
      }
      if (params.indexOf('&') != -1) {
        params = params.substr(0, params.length - 1)
      }
      if (params.length > 2) {
        params = encodeURIComponent("?" + params)
      }
      // debugger
      window.location.href = `/proxyApi/wxapi/WXSyncAuthorization?params=${to.path}${params}`;
    } else {
      //进入这里  代表 非微信客户端，或 checkLoginTime()非空，或localStorage.wxUnionid 有值
      next();
    }
  } else {
    //要校验token的页面   //判断微信 回调  set 用户信息
    if (WEIXIN_WINDOW && to.name == 'WxAuthor') {
      let params = JSON.parse(decodeURIComponent(to.params.params));
      localStorage.clear()
      if (params.token) {
        setUser(params);
      }
      setSessionStorage("wxUnionid", params.unionid)
      setSessionStorage("openid", params.openid)
      next({
        path: params.route
      });
    } else {
      //如果是微信第一次扫  就交校验token，再去目标页面
      if (from.fullPath == '/' && from.name == null && WEIXIN_WINDOW) {
        //调用接口校验 token  //如果校验不通过 //重现授权
        axios.get(properties.zj_zhi + '/szrole/current/', {
          headers: {
            "Authorization": checkLoginTime().access_token
          }
        }).then(function (response) {
          next();
        }).catch(function (error) {
          localStorage.clear()
          let params = ''
          if (SMALL_PROGRAM) {
            smallProgramLoginMethod();
            return;
          }
          for (let key in to.query) {
            if (to.query[key] != null) {
              params += `${key}=${to.query[key]}&`
            }
          }
          if (params.indexOf('&') != -1) {
            params = params.substr(0, params.length - 1)
          }
          if (params.length > 2) {
            params = encodeURIComponent("?" + params)
          }
          window.location.href = `/proxyApi/wxapi/WXAuthorization?params=${to.path}${params}`;
        });
        return
      }
      if (ifSendWxAuthor() && !SMALL_PROGRAM) {
        let params = ''
        for (let key in to.query) {
          if (to.query[key] != null) {
            params += `${key}=${to.query[key]}&`
          }
        }
        if (params.indexOf('&') != -1) {
          params = params.substr(0, params.length - 1)
        }
        if (params.length > 2) {
          params = encodeURIComponent("?" + params)
        }
        if (SMALL_PROGRAM) {
          smallProgramLoginMethod();
          return;
        }
        // debugger
        window.location.href = `/proxyApi/wxapi/WXAuthorization?params=${to.path}${params}`;
      } else if (!checkLoginTime().access_token) {
        if (SMALL_PROGRAM) {
          smallProgramLoginMethod();
          return;
        }
        next('/NoneLogin')
      } else {
        if (to.matched.length === 0) {
          //如果未匹配到路由
          next('/');
        } else {
          //拦截进店内管理的人员
          if (to.name.toLowerCase() == 'ShopManage'.toLowerCase()) {
            let shopId = to.params.shopId
            let functionId = '0CWXVVDI'
            if (shopId) {
              validateRequest(shopId, functionId, () => {
                next();
              })
            }
          } else if (to.name.toLowerCase() == 'OpenShop'.toLowerCase()) {
            //拦截进分享店设置的人员
            let shopId = to.params.shopId
            let functionId = '0VFCVZQ4'
            if (shopId) {
              validateRequest(shopId, functionId, () => {
                next();
              }, () => {
                setTimeout(() => {
                  next(`/curRoleShopPermission/${shopId}`)
                });
              })
            }
          } else if (to.name.toLowerCase() == 'ShopShow'.toLowerCase()) {
            //拦截进分享店 店铺展示 人员
            let shopId = to.params.shopId
            let functionId = '6536IC9F'
            if (shopId) {
              validateRequest(shopId, functionId, () => {
                next();
              })
            }
          } else if (to.name.toLowerCase() == 'ShopOrderList'.toLowerCase()) {
            //拦截进分享店 我的销售订单 人员
            let shopId = to.params.shopId
            let functionId = 'KE7LKTMI'
            if (shopId) {
              validateRequest(shopId, functionId, () => {
                next();
              })
            }
          } else if (to.name.toLowerCase() == 'shopGoodsBase'.toLowerCase()) {
            //拦截 分享店加商品的 人员
            let shopId = to.params.shopId ? to.params.shopId : to.query.shopId
            let functionId = '8D8NJNPA'
            if (shopId) {
              validateRequest(shopId, functionId, () => {
                next();
              })
            }
          } else if (to.name.toLowerCase() == 'editGoodsDetail'.toLowerCase()) {
            //拦截 商品展示编辑 人员
            let shopId = to.params.shopId ? to.params.shopId : to.query.shopId
            let functionId = '8YFTGJTK'
            if (shopId) {
              validateRequest(shopId, functionId, () => {
                next();
              })
            }
          } else if (to.name.toLowerCase() == 'shopShareGoodsAdd'.toLowerCase()) {
            //拦截 做分享  人员
            next();
            let shopId = to.params.shopId ? to.params.shopId : to.query.shopId
            let functionId = 'AB7MRQB0'
            if (shopId) {
              validateRequest(shopId, functionId, () => {
                next();
              })
            }
          } else if (to.name.toLowerCase() == 'managementPlatform'.toLowerCase()) {
            //拦截 台号管理的  人员
            let shopId = to.params.shopId ? to.params.shopId : to.query.shopId
            let functionId = 'MQPGXJM0'
            if (shopId) {
              validateRequest(shopId, functionId, () => {
                next();
              })
            }
          } else if (to.name.toLowerCase() == 'shareGoodsSalesStatic'.toLowerCase()) {
            //拦截 交易统计的  人员
            let shopId = to.params.shopId ? to.params.shopId : to.query.shopId
            let functionId = 'DJUS2VJ2'
            if (shopId) {
              validateRequest(shopId, functionId, () => {
                next();
              })
            }
          } else {
            next();
          }
        }
      }
    }
  }
}

export default router
