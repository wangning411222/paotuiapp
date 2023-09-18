<template>
	<view class="login">
		<view class="content">
			<!-- #ifdef APP-PLUS -->
			<view class="status_bar"></view>
			<!--  #endif -->
			<view class="bg_arc" style="height: 300rpx;">
				<view class="logo_box" style="bottom: -150rpx;">
					<image src="../../static/imgs/logo.png" mode="widthFix" style="width: 100rpx; height: 100rpx;">
					</image>
				</view>
				<view class="back_bbs" ><span class="iconfont icon-guanbi"
						style="font-size: 40rpx; vertical-align: middle;"></span></view>
			</view>
			<view>
				<image src="../../static/imgs/yuanhu.png" mode="scaleToFill" style="width: 100%; height: 100rpx;">
				</image>
			</view>
			<view class="main">
				<view class="uni-flex uni-row">
					<view class="uni-bg-red" style="line-height: 40px; ">
						<span class="iconfont icon-shouji1"
							style="font-size: 50rpx; color: #0099ee; vertical-align: middle;"></span>
					</view>
					<view class="flex-item uni-bg-green">
						<wInput v-model="phoneData" type="text" maxlength="11" placeholder="请输入手机号码"></wInput>
					</view>
				</view>

				<view class="sunui"><sunui-mverify @change="mverify" ref="sunuiMverify"></sunui-mverify></view>
				<view class="uni-flex uni-row">
					<view class="uni-bg-red" style="line-height: 40px; ">
						<span class="iconfont icon-suo1"
							style="font-size: 50rpx; color: #0099ee; vertical-align: middle;"></span>
					</view>
					<view class="flex-item uni-bg-green">
						<wInput v-model="verCode" type="text" maxlength="11" placeholder="跑腿码(小程序个人中心复制)"></wInput>
					</view>
				</view>
			</view>
			<view class="main2">
				<wButton text="登录" :rotate="isRotate" @click.native="startLogin()"></wButton>
			</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '@/components/watch-login/watch-input.vue'; //输入框
	import wButton from '@/components/watch-login/watch-button.vue'; //按钮
	import sunuiMverify from '@/components/sunui-mverify/sunui-mverify.vue'; //滑动验证
	import {
		mapState
	} from 'vuex';

	export default {
		data() {
			return {
				isRotate: false, //是否启动加载
				verCode: '',
				phoneData: '',
				NECaptchaValidate: '',
				xieyi: '',
				mve: false
			};
		},
		components: {
			wInput,
			wButton,
			sunuiMverify
		},
		mounted() {},

		methods: {
			mverify(e) {
				if (e.msg) {
					this.mve = true;
				}
			},
			loginPho() {
				let _this = this;
				this.isRotate = true;
				let postData = {
					phone: this.phoneData,
					verify_code: this.verCode
				};
				uni.request({
					url: 'https://www.maishijie.com.cn/runner-login.htm',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: postData || {},
					method: 'POST' || 'GET',
					success(res) {
						_this.$refs.sunuiMverify.refresh();
						if (res.statusCode == 200) {
							_this.isRotate = false;
							if (res.data.code == 0) {
								let token = res.data.message
								uni.setStorageSync("token", token)
								_this.$store.dispatch('user/getRead', {}).then((res) => {
									uni.reLaunch({
										url: '/pages/runner/runner'
									});
								});
								_this.$store.dispatch('config/getConfig', {}).then((res) => {

								});
							} else {

								_this.$refs.uToast.show({
									title: res.data.message
								})
								_this.isRotate = false;
							}
						} else {
							var title = res.errMsg;
							_this.$refs.uToast.show({
								title: res.data.message
							})
							reject();
						}
					},
					fail() {

					}
				});
			},
			checkboxChange: function(e) {
				this.xieyi = e.detail.value;
			},
			startVerCode() {

				//开始验证
				if (this.phoneData.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不正确'
					});
					return false;
				}
				// if (!this.mve) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		position: 'bottom',
				// 		title: '请先向右拖动滑块'
				// 	});
				// 	return false;
				// }
				this.toverCode();
			},
			toverCode() {
				let _this = this
				//获取验证码接口
				let postData = {
					phone: this.phoneData
				};
				uni.request({
					url: 'https://www.maishijie.com.cn/runner-send_code.htm',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: postData || {},
					method: 'POST' || 'GET',
					success(res) {
						_this.$refs.sunuiMverify.refresh();
						if (res.statusCode == 200) {
							_this.$refs.runCode.$emit('runCode')
							_this.isRotate = false;
						} else {
							var title = res.errMsg;
							showToast(title); //提示信息
							reject();
						}
					},
					fail() {

					}
				});
			},
			startLogin() {
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == '') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不能为空'
					});
					return;
				}
				if (this.verCode.length == '') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '跑腿码不能为空'
					});
					return;
				}
				//去登录
				this.loginPho();
			}
		}
	};
</script>

<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: #0099ee;
	}

	.main {
		padding-top: 120rpx;
		padding-left: 100rpx;
		padding-right: 100rpx;
	}

	.main2 {
		padding-top: 20rpx;
		padding-left: 100rpx;
		padding-right: 100rpx;
	}

	.bg_arc {
		width: 100%;
		position: relative;
		background: #0099ee;
	}

	.back_bbs {
		position: absolute;
		top: 0;
		left: 0;
		margin: 20px;
		color: #ffffff;
		font-size: 20px;
	}

	.logo_box {
		padding: 20rpx;
		position: absolute;
		left: 50%;
		z-index: 9;
		margin-left: -70rpx;

		background: #ffffff;

		border-radius: 15px;
		box-shadow: 0 0px 5px rgba(0, 153, 238, 0.39);
	}

	.logo_box img {
		width: 100rpx;
		height: 100rpx;
	}

	.division_line {
		padding: 0 30rpx;
		color: #cccccc;
	}

	.division_line::before {
		content: '━━━';
		position: relative;
		left: -10px;
		font-size: 10px;
	}

	.division_line::after {
		content: '━━━';
		position: relative;
		right: -10px;
		font-size: 10px;
	}

	.uni-row {
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
	}

	.uni-flex {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
	}

	.flex-item {
		flex: 1;
	}

	.uni-input-placeholder {
		color: #cccccc;
	}

	.mode1_text,
	.mode2_text {
		padding: 0;
		text-shadow: none;
	}

	.hint {
		text-align: center;
		padding: 40rpx 80rpx;
		font-size: 25rpx;
		color: #bbb;
	}

	.hint .link {
		color: #0099ee;
	}
</style>