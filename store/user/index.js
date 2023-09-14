import { post, get, wx_pay, showToast } from '../../tools/utils.js'
const state = {
	isAuthorized: false,
	userInfo: {
		uid:0,
		token:''
	}
}

const getters = {
	userInfo (state) {
		return state.userInfo
	},
	isAuthorized (state) {
		return state.isAuthorized
	}
}
const mutations = {
	setUserInfo (state,userInfo) {
		uni.setStorageSync('userInfo',userInfo)
		state.userInfo = userInfo
	},
	setAuthorized (state, isAuthorized) {
		state.isAuthorized = isAuthorized
	}
    
}
const actions = {
	getWechat({commit}, data){
		return new Promise((resolve, reject) => {
			post('user/get_wechat',data,false).then((res)=> {
				console.log(res);
				if(res.code==0) {
					//wechat
					resolve(res)
				} else {
					resolve(res)
				}
			})
		})
	},
	getUserInfo ({commit}, data) {
		data = data || '';
		let userInfo = uni.getStorageSync('userInfo');

		if(data == '') {
			if(userInfo != null) {
				commit('setUserInfo',userInfo)
				console.log(userInfo)
				if(userInfo.avatar_url_fmt == '') {
					commit('setAuthorized',false)
				} else {
					commit('setAuthorized',true)
				}
				return;
			}
		}
		return new Promise((resolve) => {
			console.log('start');
			post('login/info',data,false).then((res)=> {
				
				if(res.code==0) {
					
					commit('setUserInfo',res.data)
					
					if(res.data.avatar_url_fmt == '') {
						commit('setAuthorized',false)
					} else {
						commit('setAuthorized',true)
					}
					resolve(res)
                    
				}
			})
		})
	},
	isRecommend({commit}, data) {
		console.log('phone start.');
		return new Promise((resolve, reject) => {
			post('goods/is_recommend',data,false).then((res)=> {
				console.log(res);
				if(res.code==0) {
					//手机号
					resolve(res)
				} else {
					reject();
				}
			})
		})
	},
  getPhoneNum({commit}, data) {
		console.log('phone start.');
		return new Promise((resolve, reject) => {
			post('user/wxphone',data,false).then((res)=> {
				console.log(res);
				if(res.code==0) {
					//手机号
					resolve(res)
				} else {
					reject();
				}
			})
		})
	},
	changePhoneNum({commit}, data) {

		return new Promise((resolve, reject) => {
			post('user/rebind_phone',data,false).then((res)=> {

				if(res.code==0) {
					//手机号
					resolve(res)
				} else {
					resolve(res)
				}
			})
		})
	},
	getFavoratorList({state}, data) {
		return new Promise((resolve) => {
			post('user/favorator_list', data).then((res) => {
				resolve(res)
			})
		})
	},

	getInfo({state}, data) {
		return new Promise((resolve) => {
			post('user/info', data).then((res) => {
				resolve(res)
			})
		})
	},
	getRead({commit}, data) {
		return new Promise((resolve) => {
			post('user/read', data).then((res) => {
				if(res.code == 0){
					commit('setUserInfo',res.message)
				}
				resolve(res)
			})
		})
	},
	// 个人中心接口
	userCenter({state}, data) {
		return new Promise((resolve) => {
			post('user/center', data).then((res) => {
				resolve(res)
			})
		})
	},
	userFollow({state}, data) {
		return new Promise((resolve) => {
			post('bbs/follow', data).then((res) => {
				resolve(res)
			})
		})
	},
	myReply({state}, data) {
		return new Promise((resolve) => {
			post('bbs/myreply', data).then((res) => {
				resolve(res)
			})
		})
	},
	myThread({state}, data) {
		return new Promise((resolve) => {
			post('bbs/mythread', data).then((res) => {
				resolve(res)
			})
		})
	},
	deleThread({state}, data) {
		return new Promise((resolve) => {
			post('bbs/delete', data).then((res) => {
				resolve(res)
			})
		})
	},
	myfans_follows({state}, data) {
		return new Promise((resolve) => {
			post('bbs/fans_follows', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商店入驻
	companyApply({state}, data) {
		return new Promise((resolve) => {
			post('company/apply', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 我的商店
	companyRead({state}, data) {
		return new Promise((resolve) => {
			post('company/read', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商店编辑
	companyUpdate({state}, data) {
		return new Promise((resolve) => {
			post('company/update', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商店订单
	companyOrderlist({state}, data) {
		return new Promise((resolve) => {
			post('company/orderlist', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 手动接单
	companyOrderUpdate({state}, data) {
		return new Promise((resolve) => {
			post('company/orderupdate', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 订单打印
	printQrcode({state}, data) {
		return new Promise((resolve) => {
			post('order/print_qrcode', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 订单退款
	companyRefund({state}, data) {
		return new Promise((resolve) => {
			post('company/refund', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商店订单发货
	companyOrderupdate({state}, data) {
		return new Promise((resolve) => {
			post('company/orderupdate', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品分类添加
	cateList({state}, data) {
		return new Promise((resolve) => {
			post('cate/list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品分类添加
	cateAdd({state}, data) {
		return new Promise((resolve) => {
			post('cate/add', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品分类编辑
	cateEdit({state}, data) {
		return new Promise((resolve) => {
			post('cate/edit', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品分类删除
	cateDelete({state}, data) {
		return new Promise((resolve) => {
			post('cate/delete', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品分类排序
	cateRank({state}, data) {
		return new Promise((resolve) => {
			post('cate/rank', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品添加
	goodsAdd({state}, data) {
		return new Promise((resolve) => {
			post('goods/add', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品删除
	goodsDelete({state}, data) {
		return new Promise((resolve) => {
			post('goods/delete', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品编辑
	goodsEdit({state}, data) {
		return new Promise((resolve) => {
			post('goods/edit', data).then((res) => {
				resolve(res)
			})
		})
	},
	
	// 商品上下架
	goodsIscheck({state}, data) {
		return new Promise((resolve) => {
			post('goods/ischeck', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品推荐
	goodsIsRecommend({state}, data) {
		return new Promise((resolve) => {
			post('goods/is_recommend', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品详情
	goodsRead({state}, data) {
		return new Promise((resolve) => {
			post('goods/read', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品列表
	goodsMylist({state}, data) {
		return new Promise((resolve) => {
			post('goods/mylist', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 我的地址
	addressList({state}, data) {
		return new Promise((resolve) => {
			post('address/list').then((res) => {
				resolve(res)
			})
		})
	},
	// 新增地址
	addressSave({state}, data) {
		return new Promise((resolve) => {
			post('address/save', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 删除地址
	addressDelete({state}, data) {
		return new Promise((resolve) => {
			post('address/delete', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 默认地址
	addressDefault({state}, data) {
		return new Promise((resolve) => {
			post('address/default', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 订单列表
	orderList({state}, data) {
		return new Promise((resolve) => {
			post('order/list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 订单详情
	orderRead({state}, data) {
		return new Promise((resolve) => {
			post('order/read', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 订单退款
	userRefund({state}, data) {
		return new Promise((resolve) => {
			post('user/refund', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 收入记录
	moneyLog({state}, data) {
		return new Promise((resolve) => {
			post('money/money_log', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 提现列表
	withdrawList({state}, data) {
		return new Promise((resolve) => {
			post('money/withdraw_list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 提现
	withdraw({state}, data) {
		return new Promise((resolve) => {
			post('money/withdraw', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 评价
	evaluateCreate({state}, data) {
		return new Promise((resolve) => {
			post('post/create', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 服务费
	userOrderadd({state}, data) {
		return new Promise((resolve) => {
			post('user/orderadd', data).then((res) => {

				wx_pay(res.message).then(r=>{
										
					uni.showToast({
						title:"支付成功"
					})
					resolve(res);
				},function(reason){ //状态为rejected时执行
					console.log(reason);
					uni.showToast({
						title:reason
					})
					reject(res);
				});
			})
		})
	},
	
	// 附近学校列表
	schoolList({state}, data) {
		return new Promise((resolve) => {
			post('user/school_list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 分部获取 总营收，本月营收，当天营收company-statistics.htm  
	companyStatistics({state}, data) {
		return new Promise((resolve) => {
			post('company/statistics', data).then((res) => {
				resolve(res)
			})
		})
	},
  postMylist({state}, data) {
		return new Promise((resolve) => {
			post('post/mylist', data).then((res) => {
				resolve(res)
			})
		})
	},
  postDelete({state}, data) {
		return new Promise((resolve) => {
			post('post/delete', data).then((res) => {
				resolve(res)
			})
		})
	},
  // 评论
	postCreate({state}, data) {
		return new Promise((resolve) => {
			post('post/create',data).then((res) => {
				resolve(res);
			})
		})
	},
	
}



export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
