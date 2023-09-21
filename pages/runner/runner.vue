<template>
	<view>
		<view class="indexContent">
			<view class="select-box">
				<u-button @click="selectAll" :plain="true" :type="isAll ? 'warning' : 'default'"
					:custom-style="customStyle">全部</u-button>
				<u-button :plain="true" :custom-style="customStyle" @click="showBuildDialog">筛选楼栋</u-button>
				<view v-if="!isAll" class="select-txt">当前选择:{{ sessionTxt }}</view>
			</view>
			<view v-if="identity == 6">
				<view id="tabInList">
					<u-tabs :list="tabs" :is-scroll="false" :current="current" active-color="#e0620d"
						@change="sectionChange"></u-tabs>
				</view>
				<view v-if="current == 0" class="product-list">
					<view v-for="(item, index) in goods" :key="index" class="goodsproduct product"
						@click.stop="toGoodsPage(0, item)">
						<view class="d-flex padding-bottom-30 margin-bottom-20" style="border-bottom: 1rpx solid #eee;">
							<view class="flex-1">
								餐号:M{{ item.lastnum }}
							</view>
							<view class="">{{ item.create_date_fmt }}</view>
						</view>
						<view class="d-flex">
							<view class="padding-right-20 font-bold" style="align-self: center;white-space: nowrap;">取货
							</view>
							<view>
								<view style="font-size: 34rpx;" class="font-bold margin-bottom-10">
									{{ item.company_name }}
								</view>
								<view class="name">{{ item.company_address }}</view>
							</view>
						</view>

						<view class="info" style="padding-left: 20rpx;">
							<view style="width: 0.5rpx;height: 80rpx;background-color: #eee;"></view>
						</view>

						<view class="d-flex">
							<view class="padding-right-20 font-bold" style="align-self: center;white-space: nowrap;">送货
							</view>
							<view>
								<view style="font-size: 34rpx;" class="font-bold">
									{{ item.schoolinfo }}{{ item.address }}
								</view>
							</view>
						</view>
						<view @tap="seizeOrder(item.order_token)" class="margin-top-30"
							style="font-size: 35rpx; border-radius: 15rpx;text-align: center;background: #e0620d;padding: 25rpx; color: #efefef;">
							抢 单
						</view>

					</view>
					<view v-if="goods.length == 0">
						<view class="text-center padding-top-50">
							<u-empty text="没有相关数据" mode="order" style="margin: 0 auto;"></u-empty>
						</view>
					</view>
          
					<view @tap="handleRefresh"
						style="position: fixed; right: 30rpx; bottom: 10%; width: 100rpx;height: 100rpx;border-radius: 100rpx; background: #e0620d;display: flex;justify-content: center;">
						<u-icon name="reload" color="#fff" size="45" style="align-self: center;"></u-icon>
					</view>
				</view>
				<view v-if="current == 1" class="product-list">
					<view v-for="(item, index) in goods2" :key="index" class="goodsproduct product">
						<view class="d-flex padding-bottom-30 margin-bottom-20" style="border-bottom: 1rpx solid #eee;">
							<view class="flex-1">
								餐号:M{{ item.lastnum }}
							</view>
							<view class="">{{ item.create_date_fmt }}</view>
						</view>
						<view class="d-flex">
							<view class="padding-right-20 font-bold" style="align-self: center;white-space: nowrap;">取货
							</view>
							<view>
								<view style="font-size: 34rpx;" class="font-bold margin-bottom-10">
									{{ item.company_name }}
								</view>
								<view class="name" @click.stop="openMapApp(item.company_address)"><text user-select>{{
									item.company_address }}</text> <u-icon name="map" color="#0099ee"
										size="28"></u-icon></view>
							</view>
						</view>

						<view class="info" style="padding-left: 20rpx;">
							<view style="width: 0.5rpx;height: 80rpx;background-color: #eee;"></view>
						</view>

						<view class="d-flex">
							<view class="padding-right-20 font-bold" style="align-self: center;white-space: nowrap;">送货
							</view>
							<view>
								<view style="font-size: 34rpx;" class="font-bold" @click.stop="openMapApp(item.schoolinfo)">
									<text user-select>{{ item.schoolinfo }}{{ item.address }}</text> <u-icon name="map"
										color="#0099ee" size="28"></u-icon>
								</view>
							</view>
						</view>
						<view @tap="scan(item.order_token)" class="margin-top-30"
							style="font-size: 35rpx; border-radius: 15rpx;text-align: center;background: #e0620d;padding: 25rpx; color: #efefef;">
							取货扫码
						</view>

					</view>
					<view v-if="goods2.length == 0">
						<view class="text-center padding-top-50">
							<u-empty text="没有相关数据" mode="order" style="margin: 0 auto;"></u-empty>
						</view>
					</view>
          <view v-else @tap="scan()" class="margin-top-30"
							style="font-size: 35rpx; border-radius: 15rpx;text-align: center;background: #e0620d;padding: 25rpx; color: #efefef;">
							取货扫码
						</view>
          <view @tap="handleRefresh"
						style="position: fixed; right: 30rpx; bottom: 10%; width: 100rpx;height: 100rpx;border-radius: 100rpx; background: #e0620d;display: flex;justify-content: center;">
						<u-icon name="reload" color="#fff" size="45" style="align-self: center;"></u-icon>
					</view>
				</view>
				<view v-if="current == 2" style="padding-top: 24rpx;">
					<view v-for="(item, index) in goods3" :key="index" class="goodsproduct product">
						<view class="d-flex padding-bottom-30 margin-bottom-20" style="border-bottom: 1rpx solid #eee;">
							<view class="flex-1">
								餐号:M{{ item.lastnum }}
							</view>
							<view class="">{{ item.create_date_fmt }}</view>
						</view>
						<view class="d-flex">
							<view class="padding-right-20 font-bold" style="align-self: center;white-space: nowrap;">取货
							</view>
							<view>
								<view style="font-size: 34rpx;" class="font-bold margin-bottom-10">
									{{ item.company_name }}
								</view>
								<view class="name" @click.stop="openMapApp(item.company_address)">{{ item.company_address
								}}<u-icon name="map" color="#0099ee" size="28"></u-icon></view>
							</view>
						</view>

						<view class="info" style="padding-left: 20rpx;">
							<view style="width: 0.5rpx;height: 80rpx;background-color: #eee;"></view>
						</view>

						<view class="d-flex">
							<view class="padding-right-20 font-bold" style="align-self: center;white-space: nowrap;">送货
							</view>
							<view>
								<view style="font-size: 34rpx;" class="font-bold" @click.stop="openMapApp(item.schoolinfo)">
									{{
										item.schoolinfo }}{{ item.address }}<u-icon name="map" color="#0099ee"
										size="28"></u-icon>
								</view>
							</view>
						</view>
						<view @tap="scan(item.order_token)" class="margin-top-30"
							style="font-size: 35rpx; border-radius: 15rpx;text-align: center;background: #e0620d;padding: 25rpx; color: #efefef;">
							扫码完成订单
						</view>
						<view @tap="zhuandan(item.order_token)" class="margin-top-30"
							style="font-size: 35rpx; border-radius: 15rpx;text-align: center;background: #0092e0;padding: 25rpx; color: #efefef;">
							转单
						</view>
					</view>
					<view v-if="goods3.length == 0">
						<view class="text-center padding-top-50">
							<u-empty text="没有相关数据" mode="order" style="margin: 0 auto;"></u-empty>
						</view>
					</view>
          <view @tap="handleRefresh"
						style="position: fixed; right: 30rpx; bottom: 10%; width: 100rpx;height: 100rpx;border-radius: 100rpx; background: #e0620d;display: flex;justify-content: center;">
						<u-icon name="reload" color="#fff" size="45" style="align-self: center;"></u-icon>
					</view>
				</view>
			</view>
			<view v-if="identity == 4" class="inner">
				<view class="product-list" style="padding-top: 24rpx">
					<view v-for="(item, index) in goods4" :key="index" class="goodsproduct product">
						<view class="d-flex padding-bottom-30 margin-bottom-20" style="border-bottom: 1rpx solid #eee">
							<view class="flex-1">
								{{ item.order_token }}
							</view>
							<view class="">{{ item.create_date_fmt }}</view>
						</view>
						<view class="d-flex">
							<view class="padding-right-20 font-bold" style="align-self: center; white-space: nowrap">取货
							</view>
							<view>
								<view style="font-size: 34rpx" class="font-bold margin-bottom-10">{{
									item.company_name
								}}</view>
								<view class="name" @click.stop="openMapApp(item.company_address)">{{ item.company_address
								}}<u-icon name="map" color="#0099ee" size="28"></u-icon></view>
							</view>
						</view>

						<view class="info" style="padding-left: 20rpx">
							<view style="width: 0.5rpx; height: 80rpx; background-color: #eee"></view>
						</view>

						<view class="d-flex">
							<view class="padding-right-20 font-bold" style="align-self: center; white-space: nowrap">送货
							</view>
							<view>
								<view style="font-size: 34rpx" class="font-bold" @click.stop="openMapApp(item.schoolinfo)">
									{{ item.schoolinfo }}{{ item.address }}
									<u-icon name="map" color="#0099ee" size="28"></u-icon>
								</view>
							</view>
						</view>
						<view @tap="endOrder(item.orderid)" class="margin-top-30 inner-btn color1">
							完成订单
						</view>
						<view @tap="zhuandan(item.order_token)" class="margin-top-30 inner-btn color2">
							转单
						</view>
					</view>
					<view v-if="goods4.length == 0">
						<view class="text-center padding-top-50">
							<u-empty text="没有相关数据" mode="order" style="margin: 0 auto"></u-empty>
						</view>
					</view>
          <view @tap="handleRefresh"
						style="position: fixed; right: 30rpx; bottom: 10%; width: 100rpx;height: 100rpx;border-radius: 100rpx; background: #e0620d;display: flex;justify-content: center;">
						<u-icon name="reload" color="#fff" size="45" style="align-self: center;"></u-icon>
					</view>
				</view>
				<view class="signfor" @tap="scan">
					<u-icon name="scan" color="#fff" size="55" style="vertical-align: middle"></u-icon>
					<text>扫码取餐</text>
				</view>
			</view>
		</view>
      <u-toast ref="uToast" />
      <u-popup v-model="ZdQrcodeShow" mode="center" closeable>
        <view>
          <image :src="ZdQrcode" mode="aspectFit" style="width: 400rpx;height: 400rpx;">
          </image>
        </view>
      </u-popup>
      <u-popup v-model="buildShow" mode="top">
        <view class="build-box">
          <button v-for="(item, index) in buildList" :key="index" class="build-btn"
            :class="item.checked ? 'build-check' : ''" @click="checkBuild(item, index)" :plain="true">{{
              item.name
            }}</button>
        </view>
        <view class="build-confirm">
          <button @click="buildComfirm"> 确认</button>
        </view>
      </u-popup>
	</view>
</template>

<script>
import {
	mapGetters,
	mapMutations
} from "vuex";

export default {

	data() {
		return {
			tabs: [{
				name: '新任务',
				goods: [],
				page: 1,
				maxpage: 0
			},
			{
				name: '待取货',
				goods: [],
				page: 1,
				maxpage: 0
			},
			{
				name: '配送中',
				goods: [],
				page: 1,
				maxpage: 0
			}
			],
			current: 0,
			ZdQrcodeShow: false,
			ZdQrcode: '',
			status: 2,
			tabsinner: {
				goods: [],
				page: 1,
				maxpage: 0,

			},
			identity: '',
			buildShow: false,
			customStyle: {
				padding: "20rpx",
				"font-size": "16px",
				height: "80rpx",
			},
			isAll: true,
			buildList: [],
			selectTxt: 'all', //提交的楼栋id
			sessionTxt: "", //选中的楼栋name
			schoolId: ""

		};
	},
	onShow() {
		  this.getBuild()
      this.sectionChange(this.current)
    
	},
  onPullDownRefresh(){
    this.sectionChange(this.current)
  },
	onLoad() {
		this.identity = uni.getStorageSync('userInfo').gid
		this.schoolId = uni.getStorageSync('userInfo').nid;
		this.selectTxt = uni.getStorageSync('buildId') ? uni.getStorageSync('buildId') : 'all'
		this.sessionTxt = uni.getStorageSync('buildName')
		if (this.sessionTxt) {
			this.isAll = false
		}
		


	},
	computed: {
		goods() {
			return this.tabs[0].goods;
		},
		goods2() {
			return this.tabs[1].goods;
		},
		goods3() {
			return this.tabs[2].goods;
		},
		goods4() {
			return this.tabsinner.goods;
		},
		...mapGetters("config", ["config"]),
	},
	onReachBottom() {
		let _this = this;
		if (this.identity == 6) {
			if (this.current == 0) {
				let maxpage = this.tabs[0].maxpage;
				let page = this.tabs[0].page;
				if (maxpage > page) {
					this.tabs[0].page = page + 1;
					this.runnerOrderPoolList({
						'page': page + 1,
						'status': 0,
						schoolid: this.schoolId,
						building_num: this.selectTxt
					}, function (msg) {
						_this.concatGoods(msg, 'loading');
					})
				} else {
					_this.$refs.uToast.show({
						title: "没有更多了",
					})
				}
			}

			if (this.current == 1) {
				let maxpage = this.tabs[1].maxpage;
				let page = this.tabs[1].page;
				if (maxpage > page) {
					this.tabs[1].page = page + 1;
					this.runnerOrderPoolList({
						'page': page + 1,
						'status': 1,
						schoolid: this.schoolId,
						building_num: this.selectTxt
					}, function (msg) {
						_this.concatGoods2(msg, 'loading');
					})
				} else {
					_this.$refs.uToast.show({
						title: "没有更多了",
					})
				}
			}
			if (this.current == 2) {
				let maxpage = this.tabs[2].maxpage;
				let page = this.tabs[2].page;
				if (maxpage > page) {
					this.tabs[2].page = page + 1;
					this.runnerOrderPoolList({
						'page': page + 1,
						'status': 2,
						schoolid: this.schoolId,
						building_num: this.selectTxt
					}, function (msg) {
						_this.concatGoods3(msg, 'loading');
					})
				} else {
					_this.$refs.uToast.show({
						title: "没有更多了",
					})
				}
			}
		} else {
			let maxpage = this.tabsinner.maxpage;
			let page = this.tabsinner.page;
			if (maxpage > page) {
      this.tabsinner.page=page+1
				this.runnerOrderPoolList({
					page: page + 1,
					status: 2,
					schoolid: this.schoolId,
					building_num: this.selectTxt
				}, function (msg) {
					_this.concatGoods4(msg, 'loading');
				});
			} else {
				_this.$refs.uToast.show({
					title: "没有更多了",
				});
			}
		}

	},
	methods: {
		// 点击全部
		selectAll() {
			this.selectTxt = 'all';
			uni.setStorageSync('buildId', this.selectTxt)
			uni.setStorageSync('buildName', '')
			this.isAll = true
			this.buildList.forEach(item => {
				item.checked = false
			})

			this.sectionChange(this.current)

		},
		// 确认选择楼栋
		buildComfirm() {
			let arr = [],
				arr2 = [];
			this.buildList.forEach((item, index) => {
				if (item.checked) {
					arr.push(index)
					arr2.push(item.name)
				}
				return item.checked
			})
			this.selectTxt = arr.join(",")
			this.sessionTxt = arr2.join(",")
			uni.setStorageSync('buildId', this.selectTxt)
			uni.setStorageSync('buildName', this.sessionTxt)
			if (!this.selectTxt) {
				this.isAll = true
			}
			this.buildShow = false;
			this.sectionChange(this.current)


		},
		getBuild() {
			this.$store.dispatch('config/getConfig', {}).then((res) => {
				if (res.code == 0) {
					let schoolList = res.message.school_list.filter(item => {
						return item.schoolid == this.schoolId
					})
					let arr = schoolList[0].building_num
					this.buildList = arr.map(item => {
						return {
							name: item,
							checked: false
						}
					})
					this.buildList.forEach((item, index) => {
						if (this.selectTxt != 'all' && this.selectTxt.indexOf(index) >= 0) {
							item.checked = true
						} else {
							item.checked = false
						}
					})
				}
			});
		},
		// 选择楼栋
		checkBuild(item, index) {
			this.buildList[index].checked = !this.buildList[index].checked
			this.isAll = false
		},
		// 楼栋筛选弹窗
		showBuildDialog() {
			this.buildShow = true
		},
		handleRefresh() {
      this.sectionChange(this.current)
			
		},
		sectionChange(index) {
  
			let _this = this;
			if (this.identity == 6) {
				this.current = index;
				if (index == 0) {
					_this.init_list({
						'page': 1,
						'status': this.current,
						schoolid: this.schoolId,
						building_num: this.selectTxt
					});
				}
				if (index == 1) {
					_this.init_list2({
						'page': 1,
						'status': this.current,
						schoolid: this.schoolId,
						building_num: this.selectTxt
					});
				}
				if (index == 2) {
					let data = {
						'page': 1,
						'status': this.current,
						schoolid: this.schoolId,
						building_num: this.selectTxt
					};
					_this.init_list3({
						'page': 1,
						'status': this.current,
						schoolid: this.schoolId,
						building_num: this.selectTxt
					});
				}
			} else {
        _this.init_list4({	
            page:  1,
						status: 2,
						schoolid: this.schoolId,
						building_num: this.selectTxt}
          )
					
			}


		},
    init_list4: function (data, callback = () => { },status) {
			let _this = this;
			this.runnerOrderPoolList(data, function (msg) {
				_this.concatGoods4(msg);
			});
		},
		init_list: function (data, callback = () => { },status) {
			let _this = this;

			this.runnerOrderPoolList(data, function (msg) {
				_this.concatGoods(msg);

			});
		},
		init_list2: function (data, callback = () => { },status) {
			let _this = this;

			this.runnerOrderPoolList(data, function (msg) {
				_this.concatGoods2(msg);
			});
		},
		init_list3: function (data, callback = () => { },status) {
			let _this = this;

			this.runnerOrderPoolList(data, function (msg) {
				_this.concatGoods3(msg);
			});
		},
    concatGoods4(msg, status) {
			let curTab = this.tabsinner;
			let newGoodsData = msg.orderlist;
			curTab.maxpage = msg.maxpage;
			if (status === 'loading') {
				curTab.goods = curTab.goods.concat(newGoodsData);  //追加新数据
			} else {
				curTab.goods = newGoodsData
			}
		},
		concatGoods(msg, status) {
			let _this = this;
			let curTab = this.tabs[0];
			let newGoodsData = msg.orderlist;
			curTab.maxpage = msg.maxpage;
			if (status === 'loading') {
				curTab.goods = curTab.goods.concat(newGoodsData); //追加新数据
			} else {
				curTab.goods = newGoodsData
			}

		},
		concatGoods2(msg, status) {
			let _this = this;
			let curTab = this.tabs[1];
			let newGoodsData = msg.orderlist;
			curTab.maxpage = msg.maxpage;
			if (status === 'loading') {
				curTab.goods = curTab.goods.concat(newGoodsData); //追加新数据
			} else {
				curTab.goods = newGoodsData
			}

		},
		concatGoods3(msg, status) {
			let _this = this;
			let curTab = this.tabs[2];
			let newGoodsData = msg.orderlist;
			curTab.maxpage = msg.maxpage;
			if (status === 'loading') {
				curTab.goods = curTab.goods.concat(newGoodsData); //追加新数据
			} else {
				curTab.goods = newGoodsData
			}

		},
		runnerOrderPoolList(data, callback = (company_list) => { }) {
			let _this = this;
			_this.$store.dispatch('runner/runnerOrderPool', data).then((res) => {
				if (res.code == 0) {
					callback(res.message);
          uni.stopPullDownRefresh()
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
		},
		// 抢单
		seizeOrder(order_token) {
			let _this = this;
			_this.$store.dispatch('runner/runnerReceiveOrder', {
				'order_token': order_token
			}).then((res) => {
				if (res.code == 0) {
					_this.$refs.uToast.show({
						title: res.message,
					})
					_this.sectionChange(_this.current)

				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}

			});
		},
		userScan(result) {
			let _this = this;
			_this.$store.dispatch('runner/runnerScanode', {
				'qrcode_token': result
			}).then((res) => {
				if (res.code == 0) {
					_this.$refs.uToast.show({
						title: res.message,
					})
					_this.sectionChange(_this.current)
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
		},
		zhuandan(order_token) {
			let _this = this;
			_this.$store.dispatch('runner/runnerZdQrcode', {
				'order_token': order_token,
				"schoolid": _this.schoolId
			}).then((res) => {
				if (res.code == 0) {
					_this.ZdQrcodeShow = true
					_this.ZdQrcode = res.message
				} else {
					// _this.ZdQrcodeShow = false
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});

		},
		scan() {
			//开始扫码
			this.toHsScanCode({
				evalName: "hs-scancode", //扫码回调监听事件
				msg: "扫码", //提示文本
				fil: '0,1,2' //条码类型
			}, res => {
				//扫码成功后 这里自己判断，如果要自己处理结果就返回 true

				return true
			})
		},
		toHsScanCode(options, results) { //这里可以写成一个通用方法
			let _this = this;
			const q = Object.entries(options).map(([key, value]) => `${key}=${value}`).join('&')
			uni.$on(options.evalName || "hs-scancode", ([error, res]) => {
				if (res) { //扫码结果
					uni.navigateBack({
						delta: 1,
						animationType: "fade-out", //用 fade-out 关闭页面，减少扫码成功后跳转页面的闪动
						animationDuration: 300,
					})
					if (results && results(res) === true) {
						_this.userScan(res.result)
					};
				} else {
					//if (error.errMsg === "scanCode:fail cancel") toast("扫码取消")
					// else  toast("扫码出错")
				}
			})
			uni.navigateTo({
				url: `/pages/hs-scancode/hs-scancode?${q}`
			})
		},
		// 完成订单
		endOrder(orderid) {
			uni.navigateTo({
				url: "/pages/completeOrder/completeOrder?orderid=" + orderid,
			});
		},
		openMapApp(address) {
			let _this = this;
			uni.request({
				url: 'https://apis.map.qq.com/ws/geocoder/v1/?address=' + address +
					'&key=NN4BZ-4HAKT-NP4XL-VFOQJ-6SY67-JEBWR',
				data: {},
				success: (res) => {

					let location = res.data.result.location;
					let MapContext = wx.createMapContext('map');
					MapContext.openMapApp({
						longitude: location.lng,
						latitude: location.lat,
						destination: address,
						success() {

						},
						fail(err) {
							console.log(err)
						}
					})
				},
				fail() {
					_this.$refs.uToast.show({
						title: '导航失败，请联系管理员'
					})
				}
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
.select-box {
	padding: 20rpx;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	border-bottom: 1px solid #cccccc87;

	.u-btn {

		margin: 10rpx;
	}

	view {
		flex: 1;
	}

	.select-txt {
		color: rgb(224, 98, 13);
	}
}

.build-box {
	padding: 20rpx;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;

	.build-btn {
		margin-right: 30rpx;
		margin-bottom: 30rpx;
		padding: 15rpx;
		font-size: 12px;
		height: 60rpx;
		display: flex;
		align-items: center;
	}

	.build-check {
		background: #e0620d;
		color: #fff;
	}

}

.build-confirm {
	border-top: 1px solid #cccccc4b;
	padding: 10rpx 40rpx;
}

.indexContent {
	position: relative;
}

.inner {
	.signfor {
		position: fixed;
		left: 50%;
		bottom: 20%;
		margin-left: -300rpx;
		width: 600rpx;
		padding: 30rpx 0;
		border-radius: 100rpx;
		background: #e0620d;
		text-align: center;

		text {
			color: #fff;
			font-size: 40rpx;
			vertical-align: middle;
			margin-left: 10rpx;
		}
	}
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
		padding: 30rpx;
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

	.inner-btn {
		font-size: 35rpx;
		border-radius: 15rpx;
		text-align: center;

		padding: 25rpx;
		color: #efefef;
	}

	.color1 {
		background: #e0620d;
	}

	.color2 {
		background: #0092e0;
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