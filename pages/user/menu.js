import {
	HTTP_REQUEST_URL
} from '@/config/app.js'

export const orderMenu = [{
		img: 'icon-daifukuan',
		title: '待审核',
		url: '/pages/goods/order_list/index?status=0'
	},
	{
		img: 'icon-daishouhuo',
		title: '待开始',
		url: '/pages/goods/order_list/index?status=1'
	},
	{
		img: 'icon-daifahuo',
		title: '进行中',
		url: '/pages/goods/order_list/index?status=2'
	},
	{
		img: 'icon-daipingjia',
		title: '打款中',
		url: '/pages/goods/order_list/index?status=3'
	},
	{
		img: 'icon-a-shouhoutuikuan',
		title: '已完成',
		url: '/pages/users/user_return_list/index'
	},
]

export const MyMenus = [{
		"id": 2285,
		"name": "邀请好友",
		"pic": HTTP_REQUEST_URL + "/statics/system_images/menu_spread.png",
		"url": "/pages/users/user_spread_code/index"
	},
	{
		"id": 2278,
		"name": "游戏申请",
		"pic": HTTP_REQUEST_URL + "/statics/system_images/menu_invoice.png",
		"url": "/pages/goods/order_apply/index"
	},
	// {
	// 	"id": 2282,
	// 	"name": "我的收藏",
	// 	"pic": HTTP_REQUEST_URL+"/statics/system_images/menu_collection.png",
	// 	"url": "/pages/users/user_goods_collection/index"
	// },
	// {
	// 	"id": 2280,
	// 	"name": "联系客服",
	// 	"pic": HTTP_REQUEST_URL+"/statics/system_images/menu_customer.png",
	// 	"url": "/pages/extension/customer_list/chat"
	// },
	// {
	// 	"id": 2287,
	// 	"name": "浏览记录",
	// 	"pic": HTTP_REQUEST_URL+"/statics/system_images/menu_log.png",
	// 	"url": "/pages/users/visit_list/index"
	// },
	// {
	// 	"id": 2278,
	// 	"name": "发票管理",
	// 	"pic": HTTP_REQUEST_URL+"/statics/system_images/menu_invoice.png",
	// 	"url": "/pages/users/user_invoice_list/index"
	// },
	// {
	// 	"id": 2277,
	// 	"name": "付费会员",
	// 	"pic": HTTP_REQUEST_URL+"/statics/system_images/menu_vip.png",
	// 	"url": "/pages/annex/vip_paid/index"
	// },
	// {
	// 	"id": 2279,
	// 	"name": "积分中心",
	// 	"pic": HTTP_REQUEST_URL+"/statics/system_images/menu_integral.png",
	// 	"url": "/pages/users/user_integral/index"
	// },
	// {
	// 	"id": 2281,
	// 	"name": "优惠券",
	// 	"pic": HTTP_REQUEST_URL+"/statics/system_images/menu_coupon.png",
	// 	"url": "/pages/users/user_coupon/index"
	// },
	// {
	// 	"id": 2283,
	// 	"name": "地址信息",
	// 	"pic": HTTP_REQUEST_URL+"/statics/system_images/menu_address.png",
	// 	"url": "/pages/users/user_address_list/index"
	// },
	// {
	// 	"id": 2284,
	// 	"name": "我的余额",
	// 	"pic": HTTP_REQUEST_URL+"/statics/system_images/menu_money.png",
	// 	"url": "/pages/users/user_money/index"
	// },
	// {
	// 	"id": 2286,
	// 	"name": "砍价记录",
	// 	"pic": HTTP_REQUEST_URL+"/statics/system_images/menu_bargain.png",
	// 	"url": "/pages/activity/bargain/index"
	// },
	// {
	// 	"id": 2288,
	// 	"name": "我的等级",
	// 	"pic": HTTP_REQUEST_URL+"/statics/system_images/menu_level.png",
	// 	"url": "/pages/users/user_vip/index"
	// }
]

export const storeMenu = [
	// {
	// 	"id": 2289,
	// 	"name": "客服接待",
	// 	"pic": HTTP_REQUEST_URL+"/statics/system_images/menu_kefu.png",
	// 	"url": "/kefu/mobile_list"
	// },
	// {
	// 	"id": 2289,
	// 	"name": "订单核销",
	// 	"pic": HTTP_REQUEST_URL+"/statics/system_images/menu_cancellation.png",
	// 	"url": "/pages/admin/order_cancellation/index"
	// },
	// {
	// 	"id": 2289,
	// 	"name": "统计管理",
	// 	"pic": HTTP_REQUEST_URL+"/statics/system_images/menu_admin_order.png",
	// 	"url": "/pages/admin/order/index"
	// },
]