<template>
	<view class="indexContent">
		<u-sticky offset-top="0">
			<view class="goodsproduct product" style="width: 100%; padding: 40rpx 30rpx;background-color: #fff;">
				<view class="d-flex">
					<view style="width: 150rpx;">
						时间
					</view>
					<view style="width: 120rpx; text-align: center;">
						订单数
					</view>
					<view class="flex-1" style="text-align: center;">
						总收入
					</view>
					<view style="width: 120rpx; text-align: right;">
						结算状态
					</view>
				</view>

			</view>
		</u-sticky>
		<view class="product-list">

			<view v-for="(item, index) in goods3" :key="index" class="goodsproduct product">
				<view class="d-flex">
					<view style="width: 150rpx;">
						{{item.create_date_fmt}}
					</view>
					<view style="width: 120rpx;text-align: center;">
						{{item.total_count}}
					</view>
					<view class="flex-1" style="text-align: center;">
						{{item.rmbs_fmt}}
					</view>
					<view style="width: 120rpx; text-align: right;">
						<text v-if="item.ispay == 0" style="color: #e0620d;">未结算</text>
						<text v-if="item.ispay != 0" style="color: #1b9c35;">已结算</text>
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
			style="position: fixed; left: 50%; bottom: 10%; margin-left: -350rpx; width: 700rpx;border-radius: 100rpx; background: #e0620d;text-align: center;">
			<view class="flex-1 padding-top-20 padding-bottom-20">
				<view style="color: #fff; font-size: 40rpx; vertical-align: middle;margin-bottom: 10rpx;">{{income}}
				</view>
				<view style="color: #fff; font-size: 30rpx; vertical-align: middle;">总收入</view>
			</view>
			<view class="flex-1 padding-top-20 padding-bottom-20" style="border-left: 1rpx solid #e07c34;">
				<view style="color: #fff; font-size: 40rpx; vertical-align: middle;margin-bottom: 10rpx;">
					{{remain_rmbs}}
				</view>
				<view style="color: #fff; font-size: 30rpx; vertical-align: middle;">余额</view>
			</view>
		</view>
		<u-toast ref="uToast" />

	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	export default {

		data() {
			return {

				type: 0,
				start_date: '',
				end_date: '',
				tabs: {
					goods: [],
					page: 1,
					maxpage: 0
				},
				income: 0.00,
				remain_rmbs: 0.00,
				statisticsShow: false,
				statisticsTitle: '今日数据'
			};
		},

		onLoad() {
			this.init_list3({
				'page': this.tabs.page
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
					'page': this.tabs.page
				});
			}
		},
		onReachBottom() {

			let _this = this;

			let maxpage = this.tabs.maxpage;
			let page = this.tabs.page;
			if (maxpage > page) {
				this.tabs.page = page + 1;
				this.runnerIncome({
					'page': page + 1
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

				this.runnerIncome(data, function(msg) {
					_this.concatGoods3(msg);
				});
			},
			concatGoods3(msg) {
				let _this = this;
				let curTab = this.tabs;
				let newGoodsData = msg.runner_log_list;

				curTab.maxpage = msg.maxpage;
				curTab.goods = curTab.goods.concat(newGoodsData); //追加新数据
			},

			runnerIncome(data, callback = (company_list) => {}) {
				let _this = this;
				_this.$store.dispatch('runner/runnerIncome', data).then((res) => {
					if (res.code == 0) {
						_this.income = res.message.income,
							_this.remain_rmbs = res.message.remain_rmbs,
							callback(res.message);
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
					uni.stopPullDownRefresh();
				});
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
		color: #6ee4c1;
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

		// padding: 24rpx 24rpx 3vw 24rpx;
		// display: flex;
		// justify-content: space-between;
		// flex-wrap: wrap;

		.goodsproduct {
			width: 100%;
			padding: 40rpx 30rpx;
			border-radius: 15upx;
			background-color: #fff;
			margin: 0 0 2upx 0;
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