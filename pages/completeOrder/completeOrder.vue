<template>
	<view class="content_box">
		<u-form :model="form" ref="uForm" :border-bottom="false">
			<view class="card-list" style="padding: 35rpx 25rpx;">
				<view class="padding-bottom-15">注意：跑腿员完成订单时，请拍照留底</view>
				<view>
					<u-upload :action="upimgUrl" max-count="1" ref="uUpload" width="160" height="160" multiple='false'
						:size-type="['compressed ']" upload-text="上传图片" @on-error="uploadError" @on-uploaded="uploaded"
						@on-choose-complete="beforeUpload"></u-upload>
				</view>


			</view>

		</u-form>
		<u-button @click="submit" :custom-style="customStyle">提交</u-button>


		<!-- <u-action-sheet :list="fidSheetList" v-model="fidSheetShow" @click="fidSheetCallback"></u-action-sheet> -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				customStyle: {
					backgroundColor: '#e0620d', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: '#fff'
				},

				btn_state: true,

				form: {


				},
				model: {
					orderid: 0,
					over_img: [],
				},
				rules: {

				},

			};
		},
		computed: {

			...mapGetters('config', [
				'config'
			]),
			...mapGetters('detail', [
				'upimgUrl'
			])
		},
		onLoad(option) {
			let _this = this;
			this.model.orderid = option.orderid
		},
		mounted() {

		},
		methods: {

			beforeUpload(index, list) {
				this.btn_state = false;
				uni.showToast({
					title: '上传中',
					duration: 30000,
					icon: 'none',
				})
			},

			uploaded() {
				this.btn_state = true;
				uni.hideToast()
			},
			uploadError(res, index, lists, name) {
				this.btn_state = true;
				uni.hideToast()
				this.$refs.uUpload.remove(index);
			},

			submit() {
				let _this = this;

				if (!this.btn_state) return false;
				this.btn_state = false;

				let files = [];
				files = this.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				})

				if (files.length > 0) {
					_this.model.over_img = [];
					files.map(function(v, i) {
						_this.model.over_img.push(v['response']['message']['url']);
					})
				} else {
					this.$refs.uToast.show({
						title: "请上传照片",
					})
					this.btn_state = true;
					return false
				}

				/**/
				_this.$store.dispatch('runner/runnerOverOrder', _this.model).then((res) => {
					if (res.code == 0) {
						uni.hideLoading();
						_this.btn_state = true;
						_this.$refs.uToast.show({
							title: "操作成功",
						})

						setTimeout(function() {
							uni.navigateBack();
						}, 500)

					} else {
						_this.btn_state = true;
						_this.$refs.uToast.show({
							title: res.message,
						})
					}

				});
				/**/
			},


		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	.content_box {
		padding: 0 20rpx 25rpx;
	}

	// .u-input {
	// 	height: 50rpx;
	// }
	// u-input view.u-input input {
	// 	min-height: 40rpx !important;
	// }
	.card-list {
		width: 710upx;
		border-radius: 8upx;

		margin-bottom: 20upx;

		padding: 35rpx 25rpx 35rpx 35rpx;
		box-shadow: 0 5rpx 9rpx 1rpx #dddddd;
		border-bottom: unset;
		background-color: #FFFFFF;
	}

	.u-form-left {
		width: 200rpx !important;
		flex: 0 0 200rpx;
	}

	.u-action-sheet-item {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
		line-height: 1;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-size: 30rpx;
		padding: 32rpx 0;
		-webkit-flex-direction: column;
		flex-direction: column;
	}

	.u-action-sheet-item__subtext {
		font-size: 24rpx;
		color: $u-tips-color;
		margin-top: 20rpx;
	}

	.u-actionsheet-cancel {
		color: $u-main-color;
	}

	.popupcontent .u-border-bottom:after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		pointer-events: none;
		box-sizing: border-box;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		width: 199.8%;
		height: 199.7%;
		-webkit-transform: scale(.5);
		transform: scale(.5);
		border-bottom: 1rpx solid #e4e7ed;
		z-index: 2;
	}

	.u-line-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.u-gab {
		height: 10rpx;
		background-color: #eaeaec;
	}
</style>