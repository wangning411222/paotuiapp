<template>
	<view class="indexContent">
		<view class="product-list" style="padding-top: 24rpx;">
			<view v-for="(item, index) in goods3" :key="index" class="goodsproduct product">
				<view class="d-flex padding-bottom-30 margin-bottom-20" style="border-bottom: 1rpx solid #eee;">
					<view class="flex-1">
						{{item.order_token}}
					</view>
					<view class="">{{item.create_date_fmt}}</view>
				</view>
				<view class="d-flex">
					<view class="padding-right-20 font-bold" style="align-self: center;white-space: nowrap;">取货</view>
					<view>
						<view style="font-size: 34rpx;" class="font-bold margin-bottom-10">{{ item.company_name }}
						</view>
						<view class="name">{{ item.company_address }}</view>
					</view>
				</view>

				<view class="info" style="padding-left: 20rpx;">
					<view style="width: 0.5rpx;height: 50rpx;background-color: #eee;"></view>
				</view>

				<view class="d-flex">
					<view class="padding-right-20 font-bold" style="align-self: center;white-space: nowrap;">送货</view>
					<view>
						<view style="font-size: 34rpx;" class="font-bold">{{ item.schoolinfo }}{{ item.address }}</view>
					</view>
				</view>
			</view>
			<view v-if="goods3.length == 0">
				<view class="text-center padding-top-50">
					<u-empty text="没有相关数据" mode="order" style="margin: 0 auto;"></u-empty>
				</view>
			</view>
		</view>
		<view class="d-flex"
			style="position: fixed; left: 50%; bottom: 10%; margin-left: -300rpx; width: 600rpx;border-radius: 100rpx; background: #e0620d;text-align: center;">
			<view class="flex-1 padding-top-20 padding-bottom-20" @tap="statisticsShow=true">
				<text style="color: #fff; font-size: 40rpx; vertical-align: middle;margin-left: 10rpx;">统计数据</text>
			</view>
			<view class="flex-1 padding-top-20 padding-bottom-20" style="border-left: 1rpx solid #e07c34;"
				@tap="screen">
				<text style="color: #fff; font-size: 40rpx; vertical-align: middle;margin-left: 10rpx;">筛选</text>
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-popup v-model="statisticsShow" mode="bottom" safe-area-inset-bottom closeable>
			<view style="text-align: center; padding: 30rpx; font-weight: bold; font-size: 40rpx;">{{statisticsTitle}}
			</view>
			<view style="height: 100rpx;"></view>
			<view class="d-flex text-center">
				<view class="flex-1" style="border-right: 1rpx solid #eee;">
					<view class="margin-bottom-20" style="font-size: 55rpx;font-weight:bold;">{{total_count}}</view>
					<view style="font-size: 30rpx;">订单数</view>
				</view>
				<view class="flex-1">
					<view class="margin-bottom-20" style="font-size: 55rpx;font-weight:bold;">{{total_rmbs}}</view>
					<view style="font-size: 30rpx;">收入</view>
				</view>
			</view>
			<view style="height: 100rpx;"></view>
		</u-popup>
		<u-calendar v-model="calendarshow" mode="range" @change="calendarChange"></u-calendar>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	export default {

		data() {
			return {
				calendarshow: false,
				type: 0,
				start_date: '',
				end_date: '',
				tabs: {
					goods: [],
					page: 1,
					maxpage: 0
				},
				total_count: '',
				total_rmbs: '',
				statisticsShow: false,
				statisticsTitle: '今日数据'
			};
		},

		onLoad() {
			this.init_list3({
				'page': this.tabs.page,
				'type': this.type,
				'start_date': this.start_date,
				'end_date': this.end_date
			});
		},
		computed: {
			goods3() {
				return this.tabs.goods;
			}
		},
		onPullDownRefresh() {
			this.tabs.goods = [];
			this.tabs.page = 1;
			if (this.goods3.length == 0) {
				this.init_list3({
					'page': this.tabs.page,
					'type': this.type,
					'start_date': this.start_date,
					'end_date': this.end_date
				});
			}
		},
		onReachBottom() {

			let _this = this;

			let maxpage = this.tabs.maxpage;
			let page = this.tabs.page;
			if (maxpage > page) {
				this.tabs.page = page + 1;
				this.historyOrder({
					'page': page + 1,
					'type': this.type,
					'start_date': this.start_date,
					'end_date': this.end_date
				}, function(msg) {
					_this.concatGoods3(msg);
				})
			} else {
				_this.$refs.uToast.show({
					title: "没有更多了",
				})
			}
		},
		methods: {

			init_list3: function(data, callback = () => {}) {
				let _this = this;

				this.historyOrder(data, function(msg) {
					_this.concatGoods3(msg);
				});
			},
			concatGoods3(msg) {
				let _this = this;
				let curTab = this.tabs;
				let newGoodsData = msg.order_list;
				_this.total_count = msg.total_count; // 总订单数
				_this.total_rmbs = msg.total_rmbs; // 总金额数
				curTab.maxpage = msg.maxpage;
				curTab.goods = curTab.goods.concat(newGoodsData); //追加新数据
			},
			// runnerOrderPoolList(data,callback=(company_list)=>{}){
			// 	let _this = this;
			// 	_this.$store.dispatch('runner/runnerOrderPool',data).then((res) => {
			// 		if(res.code == 0) {
			// 			callback(res.message);
			// 		} else {
			// 			_this.$refs.uToast.show({
			// 				title: res.message,
			// 			})
			// 		}
			// 		uni.stopPullDownRefresh();
			// 	});
			// },
			screen() {
				let _this = this;
				uni.showActionSheet({
					itemList: ['今日', '本月', '自选'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if (res.tapIndex == 0) {
							_this.statisticsTitle = '今日数据'
							_this.type = res.tapIndex
							uni.startPullDownRefresh();

						}
						if (res.tapIndex == 1) {
							_this.statisticsTitle = '本月数据'
							_this.type = res.tapIndex
							uni.startPullDownRefresh();
						}
						if (res.tapIndex == 2) {
							_this.statisticsTitle = '自选数据'
							_this.calendarshow = true
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			historyOrder(data, callback = (company_list) => {}) {
				let _this = this;
				_this.$store.dispatch('runner/runnerHistoryOrder', data).then((res) => {
					if (res.code == 0) {
						callback(res.message);
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
					uni.stopPullDownRefresh();
				});
			},

			calendarChange(e) {
				this.start_date = e.startDate
				this.start_date = e.endDate

				uni.startPullDownRefresh();
			},
			statistics() {

				// uni.navigateTo({
				// 	url:'/pages/sub/runner/statistics'
				// })
			},


		}
	};
</script>

<style>
	page {
		background-color: #efefef;
	}

	#tabInList {
		background-color: #FFFFFF;
		padding: 20rpx 0 0;
	}

	.u-mode-center-box {
		border-radius: 20rpx !important;
	}

	.product {
		/* width: 100%; */
		margin-bottom: 20rpx;
	}

	.product.shopproduct {
		width: 100%;
	}
</style>
<style lang="scss" scoped>
	.indexContent {
		position: relative;
	}

	.u-subsection .u-item-bg {
		background-color: #FFFFFF;
		color: #e0620d;
	}

	.authorBtn {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1000;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		opacity: 0;
	}

	/*吸顶悬浮，上拉加载，下拉刷新组件*/
	.demo-tip {
		padding: 18rpx;
		font-size: 24rpx;
		text-align: center;
	}

	/*吸顶悬浮，上拉加载，下拉刷新组件end*/
	.box-group {
		background: #ededed;
		margin: 20rpx 20rpx;
		display: flex;
		border-radius: 20rpx;

		.single-box {
			flex: 1;
			padding: 20rpx;
			text-align: center;

			.b-image {
				position: relative;
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				overflow: hidden;
				text-align: center;
				margin: 0 auto;
				background-color: #dddddd;
			}

			.title {
				margin-top: 10rpx;
				font-size: 25rpx;
				font-weight: 500;
			}
		}
	}

	// 商品card
	.product-list {

		padding: 24rpx 24rpx 3vw 24rpx;
		// display: flex;
		// justify-content: space-between;
		// flex-wrap: wrap;

		.goodsproduct {
			width: 100%;
			padding: 40rpx 30rpx;
			border-radius: 15upx;
			background-color: #fff;
			margin: 0 0 25upx 0;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);

			image {
				width: 100%;
				height: 300rpx;
				border-radius: 15upx 15upx 0 0;
			}

			.name {
				width: 100%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-align: justify;
				overflow: hidden;
				font-size: 30upx;
			}

			.info {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				width: 100%;
				padding: 10upx 0 10upx;

				.price {
					color: red;
					font-size: 30upx;
					font-weight: 600;
				}

			}

			.slogan {
				padding: 0 4% 10upx;
				color: #807c87;
				font-size: 24upx;
			}
		}
	}

	.popup-content {
		border-radius: 20rpx;
		padding: 40rpx 20rpx;
		font-family: 'Microsoft YaHei UI';

		.loginTip {
			font-size: 40rpx;
			text-align: center;
		}

		.loginBtn {
			position: relative;
			display: flex;
			width: 90%;
			height: 100rpx;
			margin: 60rpx auto;
			border-radius: 20rpx;
			background-color: #c69c6c;
			justify-content: center;
			align-items: center;
			font-size: 35rpx;
			color: #ffffff;

			.item {
				flex: auto;

				&:nth-child(2) {
					padding-right: 10rpx;
				}
			}
		}
	}
</style>