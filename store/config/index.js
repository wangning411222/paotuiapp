import {post,get} from '../../tools/utils.js'
const state = {
	config: {},
	swiperList: [],
	pay_type_info:{},
	toppay:[],
	charge_rate:0,
	charge_text:'',
	noticeid:[]
}

const getters = {
	config(state) {
		return state.config
	},
	swiperList(state) {
		return state.swiperList
	},
	toppay(state) {
		return state.toppay
	},
	pay_type_info(state) {
		return state.pay_type_info
	},
	charge_rate(state) {
		return state.charge_rate
	},
	charge_text(state) {
		return state.charge_text
	},
	noticeid(state) {
		return state.noticeid
	}
	
	
	
}

const actions = {
	//获取全局配置
	getConfig({
		commit,
		state,
		dispatch
	}) {
		return new Promise((resolve, reject) => {
			get('index/config', false, false)
				.then((res) => {
					if (res.code == 0) {
						state.swiperList = res.message.banner_list;
						state.charge_rate = res.message.charge_rate;
						state.charge_text = res.message.charge_text;
						state.pay_type_info = res.message.pay_type_info;
						
						
						state.config = res.message;
						
						
						resolve(res);
					} else {
						reject();
					}
				});
		});
	},
	getSwiperList({
		commit,
		state
	}) {
		get('config/swiperList')
			.then((res) => {
				if (res.code == 0) {
					console.log(state)
					state.swiperList = [...res.data]
				} else {}
			});
	},
	// 获取地址
	getSchoolList({state}, data) {
		return new Promise((resolve) => {
			post('school/list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 修改个人信息
	postUserUpdate({state}, data) {
		return new Promise((resolve) => {
			post('user/update', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 验证码
	sendCode({state}, data) {
		return new Promise((resolve) => {
			post('index/send_code', data).then((res) => {
				resolve(res)
			})
		})
	}
}

const mutations = {
	closeNotice(state) {
		uni.setStorageSync('noticemd5', state.config.noticemd5)
		state.isNotice = false
	},
	addConfig(state, data) {
		state.config = { ...state.config,
			...data
		}
	},
	setUrl(state, url) {
		state.url = url
	},
	setSys(state, data) {
		state.sys = Object.assign(state.sys, data)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
