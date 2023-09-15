<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 u-p-t-30" v-if="!isAuthorized">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20 text-white">未授权昵称</view>
				<view class="u-font-14 u-tips-color"></view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<button v-if="!isAuthorized" open-type="getUserInfo" @getuserinfo="wxlogin" class="authBtn">
					同步微信信息
				</button>
			</view>
		</view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 u-p-t-30" v-if="isAuthorized">
			<view class="u-m-r-20">
				<u-avatar :src="userInfo.avatar_url_fmt" size="140" @tap="userinfo()"></u-avatar>
				<!-- ffbe00  e9e9d8  ba6e40 -->
			</view>
			<view class="u-flex-1 text-white">
				<view class="u-font-18 u-p-b-10 text-white">
					{{ userInfo.nick_name }}
					<u-icon size="30" :name="userInfo.sex == 1 ? 'man' : userInfo.sex == 2 ? 'woman' : ''" :color="userInfo.sex == 1 ? '#56b4ff' : userInfo.sex == 2 ? '#e599e5' : ''
						"></u-icon>
				</view>
				<view>uid:{{ userInfo.uid }}</view>
			</view>
			<view class="u-m-l-10 u-p-10" style="text-align: center"> </view>
		</view>
		<view class="content_box">
			<view class="u-m-t-20 bg-white card" v-if="userInfo.gid && (userInfo.gid == 4 || userInfo.gid == 6)">
				<view style="
			  padding: 0 0 30rpx;
			  border-bottom: 1rpx solid #f3f3f3;
			  font-weight: bold;
			">跑腿服务</view>
				<view>
					<view class="chart-con gap">
						<view class="chart-wrap">
							<view class="line-chart-con">
								<!-- <l-echart class="line-chart" ref="lineChart"></l-echart> -->
							</view>
						</view>
					</view>
				</view>
				<u-grid :col="4" :border="false">
					<u-grid-item>
						<view class="item-menu-image" @click="revenue()">
							<u-icon name="xufei" custom-prefix="custom-icon" size="60" color="#e0620d"></u-icon>
						</view>
						<view class="grid-text">收益明细</view>
					</u-grid-item>
					<u-grid-item>
						<view class="item-menu-image" @click="settlement()"
							style="display: flex; justify-content: center">
							<u-icon name="order" size="60" color="#e0620d"></u-icon>
						</view>
						<view class="grid-text">结算清单</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>

		<u-top-tips ref="uTips"></u-top-tips>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	// import * as echarts from '@/uni_modules/lime-echart/static/echarts.min.js';=
	import {
		mapState,
		mapMutations,
		mapGetters
	} from "vuex";

	import {
		domain
	} from "../../tools/utils.js";
	export default {
		data() {
			return {
				showAuthorizationModal: false,

				user_show: false, // 是否填写了资料

				noticenums: 0,
				uid: 0,
				company_status: 9,
				pic: "../../../static/default_avatar.png",
				show: true,
				cert: "#aaa",
				member: "",
				member_color: "",
				member_color1: "",
				runner_curve_count: [],
				runner_curve_date: [],
			};
		},
		computed: {
			...mapGetters("user", ["isAuthorized", "userInfo"]),
			...mapGetters("config", ["config"]),
		},
		onShow() {
			let _this = this;
			this.user();
		},
		onLoad(e) {
			var self = this;

			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#e0620d",
				animation: {
					duration: 200,
					timingFunc: "easeIn",
				},
			});
			let _this = this;
			this.$store.dispatch("login/checkLogin").then((res) => {
				if (res && res.code != 0) {
					_this.$refs.uToast.show({
						title: "未登录",
					});
				}
			});
		},
		methods: {

			...mapMutations(["user/setUserInfo", "user/setAuthorized"]),
			user() {
				let _this = this;
				this.$store.dispatch("user/getRead").then((res) => {
					if (res.code == 0) {
						_this.company_status = res.message.company_status;
						_this.is_cert = res.message.is_cert;
						_this.uid = res.message.uid;
						_this.runner_curve_count = res.message.runner_curve_count;
						_this.runner_curve_date = res.message.runner_curve_date;

						_this["user/setUserInfo"](res.message);
						if (_this.is_cert == 1) {
							_this.cert = "#FF7925";
						}

						if (res.message.gid == 4 || res.message.gid == 6) {
							//加载折线图数据
							// _this.loadLineData();
						}
					}
				});
			},
			userinfo() {
				uni.navigateTo({
					url: "/pages/sub/center/userinfo",
				});
			},
			revenue() {
				uni.navigateTo({
					url: "/pages/revenue/revenue",
				});
			},
			// 结算清单
			settlement() {

				uni.navigateTo({
					url: "/pages/settlement/settlement",
				});


			},

			//加载折线图数据
			loadLineData() {
				//这里请求服务器拿到数据
				let res = {
					//x轴数据
					xData: this.runner_curve_date,
					//y轴数据
					yData: this.runner_curve_count,
				};
				//这里option配置参考文档：https://echarts.apache.org/zh/option.html
				let option = {
					height: "120px",
					xAxis: {
						type: "category",
						// x轴数据文字颜色
						axisLabel: {
							color: "#a7a7a7",
						},
						// x轴那天坐标轴线的颜色
						axisLine: {
							lineStyle: {
								color: "#f1f1f1",
							},
						},
						//x轴上面刻度线隐藏
						axisTick: {
							show: false,
						},
						//这里是x轴数据
						data: res.xData,
					},
					//设置网格
					grid: {
						top: 20,
						bottom: 30,
						right: 0,
					},
					//y轴设置
					yAxis: {
						type: "value",
						//y轴标签文字颜色
						axisLabel: {
							color: "#a7a7a7",
						},
						// y轴分割线设置为虚线
						splitLine: {
							show: true,
							lineStyle: {
								type: "dashed",
							},
						},
						splitNumber: 5,
					},
					//设置提示为点击时
					tooltip: {
						trigger: "axis",
						triggerOn: "click",
						formatter: "{b} \n 订单数: {c}",
					},
					//设置曲线的颜色
					color: ["#64ca99"],
					series: [{
						//这里是数据
						data: res.yData,
						type: "line",
						//设置为平滑，默认为折线
						smooth: true,
					}, ],
				};

				this.$refs.lineChart.init(echarts, (chart) => {
					chart.setOption(option);
				});
			},
		},
	};
</script>

<style lang="scss">
	canvas {
		height: 180px !important;
	}

	page {
		background-color: #f9f9f9;
	}

	.content_box {
		padding: 0 20rpx 25rpx;
	}

	.authBtn {
		font-size: 24rpx;
	}

	.item-menu-image {
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 100%;
		background-color: #eaf9f9;
		text-align: center;
	}

	.grid-text {
		padding-top: 10rpx;
		font-size: 24rpx;
	}

	.user-box {
		background-color: #e0620d;
	}

	.d-flex {
		display: flex;
	}

	.flex {
		flex: 1;
	}

	.card {
		padding: 30rpx;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx 1rpx #f5f5f5;
	}
</style>