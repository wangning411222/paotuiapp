import Vue from 'vue'
import {
	post,
	get,
	wx_pay,
	showToast,
	reBuildUrl
} from '../../tools/utils.js'
const state = {
	content: [],
	upimgUrl: 'user/upimg',
	upIDCardUrl: 'user/upidcard'
}

const getters = {
	content(state) {
		return state.content
	},
	upimgUrl(state) {
		return reBuildUrl(state.upimgUrl);
	},
	upIDCardUrl(state) {
		return reBuildUrl('user/upidcard');
	}

}

const mutations = {


}
const actions = {
	// 登录
	getLogin({
		state
	}, data) {
		return new Promise((resolve) => {
			post('runner/login', data).then((res) => {
				resolve(res)
			})
		})
	},
		// 登录
		getVerCode({
			state
		}, data) {
			return new Promise((resolve) => {
				post('runner/apply', data).then((res) => {
					resolve(res)
				})
			})
		},
	// 验证码
	sendCode({
		state
	}, data) {
		return new Promise((resolve) => {
			post('runner/send_code', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 跑腿接单抢单(校外)
	runnerReceiveOrder({
		state
	}, data) {
		return new Promise((resolve) => {
			post('runner/receive_order', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 跑腿扫码取餐(校外)
	runnerScanode({
		state
	}, data) {
		return new Promise((resolve) => {
			post('runner/scancode', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 确认送到（校内） 
	runnerOverOrder({
		state
	}, data) {
		return new Promise((resolve) => {
			post('runner/over_order', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 统计订单收益
	runnerHistoryOrder({
		state
	}, data) {
		return new Promise((resolve) => {
			post('runner/history_order', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 收益结算
	runnerIncome({
		state
	}, data) {
		return new Promise((resolve) => {
			post('runner/income', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 转单
	runnerZdQrcode({
		state
	}, data) {
		return new Promise((resolve) => {
			post('runner/zd_qrcode', data).then((res) => {
				resolve(res)
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