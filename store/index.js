import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import login from './login'
import mylogin from "./mylogin"
import user from './user'
import config from './config'
import runner from './runner'
export default new Vuex.Store({
	state: {
		active_ptype:99
	},
	modules: {
    config,
		user,
		login,
		runner,
		mylogin

	},
	mutations: {
		change_ptype(state, param) {
			state.active_ptype = param;
		}
	}
});