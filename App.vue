<script>
	export default {
		async onLaunch() {
			let token = uni.getStorageSync("token");
			if (!token) {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			} else {
				uni.reLaunch({
					url: '/pages/runner/runner'
				});
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "ReView/fontawesome.css";
	@import "Review/component.css";

	@import "uview-ui/index.scss";
	@import "./static/iconfont.css";
	@import "./static/iconfont1.css";

	/*每个页面公共css */
	.bg_theme {
		background-color: #6ee4c1;
	}

	.color_theme {
		color: #6ee4c1;
	}

	.text-center {
		text-align: center;
	}

	.font-bold {
		font-weight: bold;
	}

	.text-muted {
		color: #bbbbbb;
	}

	.text-white {
		color: #FFFFFF;
	}

	.bg-white {
		background-color: #FFFFFF;
	}

	.text-through {
		text-decoration: line-through;
		flex: 1;
		display: flex;
		align-items: center;
		font-size: 24rpx;
		font-weight: normal;
		margin-left: 6rpx;
	}

	.flex1 {
		flex: 1
	}

	// card
	.uni-card {
		/* #ifndef APP-NVUE */
		display: flex;
		flex: 1;
		box-shadow: 0 0 0 rgba(0, 0, 0, 0);
		/* #endif */
		margin: $uni-spacing-col-lg $uni-spacing-row-lg;
		background-color: $uni-bg-color;
		position: relative;
		flex-direction: column;
		border-radius: 5px;
		overflow: hidden;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}



	.uni-border {
		position: relative;
		/* #ifdef APP-NVUE */
		border-color: $uni-border-color;
		border-style: solid;
		border-width: 0.5px;
		/* #endif */
		z-index: 1;
	}

	/* #ifndef APP-NVUE */
	.uni-border:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		// border: 1px solid $uni-border-color;
		border-radius: 10px;
		box-sizing: border-box;
		width: 200%;
		height: 200%;
		transform: scale(0.5);
		transform-origin: left top;
		z-index: -1;
	}

	/* #endif */

	.uni-border-bottom {
		position: relative;
		/* #ifdef APP-NVUE */
		border-bottom-color: $uni-border-color;
		border-bottom-style: solid;
		border-bottom-width: 0.5px;
		/* #endif */
		z-index: 1;
	}

	/* #ifndef APP-NVUE */
	.uni-border-bottom:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		// border-bottom: 1px solid $uni-border-color;
		box-sizing: border-box;
		width: 200%;
		height: 200%;
		transform: scale(0.5);
		transform-origin: left top;
		z-index: -1;
	}

	/* #endif */
	.uni-border-top {
		position: relative;
		/* #ifdef APP-NVUE */
		border-top-color: $uni-border-color;
		border-top-style: solid;
		border-top-width: 0.5px;
		/* #endif */
		z-index: 1;
	}

	/* #ifndef APP-NVUE */
	.uni-border-top:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
		border-top: 1px solid $uni-border-color;
		box-sizing: border-box;
		width: 200%;
		height: 200%;
		transform: scale(0.5);
		transform-origin: left top;
		z-index: -1;
	}

	/* #endif */

	.uni-card__thumbnailimage {
		position: relative;
		flex-direction: column;
		justify-content: center;
		height: 150px;
		overflow: hidden;
	}

	.uni-card__thumbnailimage-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		overflow: hidden;
	}

	.uni-card__thumbnailimage-image {
		flex: 1;
	}

	.uni-card__thumbnailimage-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		flex-direction: row;
		padding: $uni-spacing-col-base $uni-spacing-col-lg;
		background-color: $uni-bg-color-mask;
	}

	.uni-card__thumbnailimage-title-text {
		flex: 1;
		font-size: $uni-font-size-base;
		color: #fff;
	}

	.uni-card__title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		padding: 10px;

	}

	.uni-card__title-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
	}

	.uni-card__title-header {
		width: 40px;
		height: 40px;
		overflow: hidden;
		border-radius: 5px;
	}

	.uni-card__title-header-image {
		width: 40px;
		height: 40px;
	}

	.uni-card__title-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		flex: 1;
		padding-left: 10px;
		height: 40px;
		overflow: hidden;
	}

	.uni-card__title-content-title {
		font-size: $uni-font-size-base;
		line-height: 22px;
	}

	.uni-card__title-content-extra {
		font-size: $uni-font-size-sm;
		line-height: 27px;
		color: $uni-text-color-grey;
	}

	.uni-card__header {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		position: relative;
		flex-direction: row;
		padding: $uni-spacing-col-lg;
		align-items: center;
	}

	.uni-card__header-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		margin-right: $uni-spacing-col-base;
		justify-content: flex-start;
		align-items: center;
	}

	.uni-card__header-title-text {
		font-size: $uni-font-size-lg;
		flex: 1;
		color: #333;
	}

	.uni-card__header-extra-img {
		height: $uni-img-size-sm;
		width: $uni-img-size-sm;
		margin-right: $uni-spacing-col-base;
	}

	.uni-card__header-extra-text {
		flex: 1;
		margin-left: $uni-spacing-col-base;
		font-size: $uni-font-size-sm;
		text-align: right;
		color: $uni-text-color-grey;
	}

	.uni-card__content {
		color: $uni-text-color;
	}

	.uni-card__content--pd {
		padding-left: $uni-spacing-col-lg;
		padding-right: $uni-spacing-col-lg;
	}

	.uni-card__content-extra {
		font-size: $uni-font-size-base;
		padding-bottom: 10px;
		color: $uni-text-color-grey;
	}

	.uni-card__footer {
		justify-content: space-between;
		padding: $uni-spacing-col-lg;
	}

	.uni-card__footer-text {
		color: $uni-text-color-grey;
		font-size: $uni-font-size-sm;
	}

	.uni-card--shadow {
		position: relative;
		/* #ifndef APP-NVUE */
		box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
		/* #endif */
	}

	.uni-card--full {
		margin: 0;
		border-radius: 0;
	}

	/* #ifndef APP-NVUE */
	.uni-card--full:after {
		border-radius: 0;
	}

	/* #endif */
	.uni-ellipsis {
		/* #ifndef APP-NVUE */
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		/* #endif */
		/* #ifdef APP-NVUE */
		lines: 1;
		/* #endif */
	}

	.boxshadow {
		border-radius: 12rpx;
		box-shadow: 0 7rpx 8rpx #C6C6C6;
	}

	.d-jc-start {
		justify-content: flex-start;
	}

	.d-jc-centen {
		justify-content: center;
	}

	.d-jc-end {
		justify-content: flex-end;
	}

	.d-jc-between {
		justify-content: space-between;
	}

	.d-jc-around {
		justify-content: space-around;
	}

	.d-ai-start {
		align-items: flex-start;
	}

	.d-ai-centen {
		align-items: center;
	}

	.d-ai-end {
		align-items: flex-end;
	}

	.d-row {
		display: flex;
		flex-direction: row;
	}

	.d-clo {
		display: flex;
		flex-direction: column;
	}

	.flex-1 {
		flex: 1;
	}


	.width20 {
		width: 20%;
	}

	.width30 {
		width: 30%;
	}

	.width40 {
		width: 40%;
	}

	.width45 {
		width: 45%;
	}

	.width50 {
		width: 50%;
	}

	.width60 {
		width: 60%;
	}

	.width70 {
		width: 70%;
	}

	.width80 {
		width: 80%;
	}

	.width85 {
		width: 85%;
	}

	.width90 {
		width: 90%;
	}

	.width95 {
		width: 95%;
	}

	.maxwidth100 {
		width: 100vw;
	}

	.width100 {
		width: 100%;
	}

	.height20 {
		height: 20rpx;
	}

	.height30 {
		height: 30rpx;
	}

	.height40 {
		height: 40rpx;
	}

	.height50 {
		height: 50rpx;
	}

	.height60 {
		height: 60rpx;
	}

	.height70 {
		height: 70rpx;
	}

	.height80 {
		height: 80rpx;
	}

	.height90 {
		height: 90rpx;
	}

	.height100 {
		height: 100rpx;
	}

	.height120 {
		height: 120rpx;
	}

	.height140 {
		height: 140rpx;
	}

	.height160 {
		height: 160rpx;
	}

	.height180 {
		height: 180rpx;
	}

	.height200 {
		height: 200rpx;
	}

	.height300 {
		height: 300rpx;
	}

	.height500 {
		height: 500rpx;
	}

	.line-height20 {
		line-height: 20rpx;
	}

	.line-height30 {
		line-height: 30rpx;
	}

	.line-height40 {
		line-height: 40rpx;
	}

	.line-height50 {
		line-height: 50rpx;
	}

	.line-height60 {
		line-height: 60rpx;
	}

	.line-height70 {
		line-height: 70rpx;
	}

	.line-height80 {
		line-height: 80rpx;
	}

	.line-height90 {
		line-height: 90rpx;
	}

	.line-height100 {
		line-height: 100rpx;
	}

	.line-height120 {
		line-height: 120rpx;
	}

	.line-height140 {
		line-height: 140rpx;
	}

	.line-height160 {
		line-height: 160rpx;
	}

	.line-height180 {
		line-height: 180rpx;
	}

	.line-height200 {
		line-height: 200rpx;
	}

	.line-height300 {
		line-height: 300rpx;
	}

	.line-height500 {
		line-height: 500rpx;
	}


	.font12 {
		font-size: 12rpx;
	}

	.font14 {
		font-size: 14rpx;
	}

	.font16 {
		font-size: 16rpx;
	}

	.font18 {
		font-size: 18rpx;
	}

	.font20 {
		font-size: 20rpx;
	}

	.font22 {
		font-size: 22rpx;
	}

	.font24 {
		font-size: 24rpx;
	}

	.font26 {
		font-size: 26rpx;
	}

	.font28 {
		font-size: 28rpx;
	}

	.font30 {
		font-size: 30rpx;
	}

	.font32 {
		font-size: 32rpx;
	}

	.font34 {
		font-size: 34rpx;
	}

	.font36 {
		font-size: 36rpx;
	}

	.font38 {
		font-size: 38rpx;
	}

	.font28 {
		font-size: 28rpx;
	}

	.font40 {
		font-size: 40rpx;
	}

	.font50 {
		font-size: 50rpx;
	}

	.font60 {
		font-size: 60rpx;
	}

	.font-bold {
		font-weight: bold;
	}

	.margin-left-10 {
		margin-left: 10rpx;
	}

	.margin-left-20 {
		margin-left: 20rpx;
	}

	.margin-left-30 {
		margin-left: 30rpx;
	}

	.margin-right-10 {
		margin-right: 10rpx;
	}

	.margin-right-20 {
		margin-right: 20rpx;
	}

	.margin-right-30 {
		margin-right: 30rpx;
	}

	.margin-right-80 {
		margin-right: 80rpx;
	}

	.margin-right-100 {
		margin-right: 100rpx;
	}

	.margin-top-10 {
		margin-top: 10rpx;
	}

	.margin-top-20 {
		margin-top: 20rpx;
	}

	.margin-top-30 {
		margin-top: 30rpx;
	}

	.margin-top-40 {
		margin-top: 40rpx;
	}

	.margin-top-50 {
		margin-top: 50rpx;
	}

	.margin-top-60 {
		margin-top: 60rpx;
	}

	.margin-bottom-10 {
		margin-bottom: 10rpx;
	}

	.margin-bottom-20 {
		margin-bottom: 20rpx;
	}

	.margin-bottom-30 {
		margin-bottom: 30rpx;
	}

	.margin-bottom-40 {
		margin-bottom: 40rpx;
	}

	.margin-bottom-50 {
		margin-bottom: 50rpx;
	}

	.margin-bottom-60 {
		margin-bottom: 60rpx;
	}

	.margin-bottom-70 {
		margin-bottom: 70rpx;
	}

	.margin-bottom-80 {
		margin-bottom: 80rpx;
	}

	.margin-bottom-90 {
		margin-bottom: 90rpx;
	}

	.margin-bottom-100 {
		margin-bottom: 100rpx;
	}

	.margin-bottom-200 {
		margin-bottom: 200rpx;
	}

	.margin-bottom-300 {
		margin-bottom: 300rpx;
	}

	.margin-10 {
		margin: 10rpx;
	}

	.margin-20 {
		margin: 20rpx;
	}

	.margin-30 {
		margin: 30rpx;
	}

	.margin-40 {
		margin: 40rpx;
	}

	.margin-50 {
		margin: 50rpx;
	}

	.margin-60 {
		margin: 60rpx;
	}

	.margin-center {
		margin: 0 auto;
	}

	.padding-10 {
		padding: 10rpx;
	}

	.padding-20 {
		padding: 20rpx;
	}

	.padding-30 {
		padding: 30rpx;
	}

	.padding-40 {
		padding: 40rpx;
	}

	.padding-50 {
		padding: 50rpx;
	}

	.padding-60 {
		padding: 60rpx;
	}

	.padding-top-10 {
		padding-top: 10rpx;
	}

	.padding-top-15 {
		padding-top: 15rpx;
	}

	.padding-top-20 {
		padding-top: 20rpx;
	}

	.padding-top-30 {
		padding-top: 30rpx;
	}

	.padding-top-40 {
		padding-top: 40rpx;
	}

	.padding-top-50 {
		padding-top: 50rpx;
	}

	.padding-top-60 {
		padding-top: 60rpx;
	}

	.padding-bottom-10 {
		padding-bottom: 10rpx;
	}

	.padding-bottom-15 {
		padding-bottom: 15rpx;
	}

	.padding-bottom-20 {
		padding-bottom: 20rpx;
	}

	.padding-bottom-30 {
		padding-bottom: 30rpx;
	}

	.padding-bottom-40 {
		padding-bottom: 40rpx;
	}

	.padding-bottom-50 {
		padding-bottom: 50rpx;
	}

	.padding-bottom-60 {
		padding-bottom: 60rpx;
	}

	.padding-bottom-150 {
		padding-bottom: 150rpx;
	}

	.padding-left-10 {
		padding-left: 10rpx;
	}

	.padding-left-20 {
		padding-left: 20rpx;
	}

	.padding-left-30 {
		padding-left: 30rpx;
	}

	.padding-left-40 {
		padding-left: 40rpx;
	}

	.padding-left-50 {
		padding-left: 50rpx;
	}

	.padding-left-60 {
		padding-left: 60rpx;
	}

	.padding-right-10 {
		padding-right: 10rpx;
	}

	.padding-right-20 {
		padding-right: 20rpx;
	}

	.padding-right-30 {
		padding-right: 30rpx;
	}

	.padding-bottom-30 {
		padding-bottom: 30rpx;
	}

	.padding-right-40 {
		padding-right: 40rpx;
	}

	.padding-right-50 {
		padding-right: 50rpx;
	}

	.padding-right-60 {
		padding-right: 60rpx;
	}

	.gray4 {
		color: #C0C4CC;
	}

	.gray3 {
		color: #909399;
	}

	.gray2 {
		color: #747679;
		;
	}

	.gray1 {
		color: #303133;
	}

	.color-orange {
		color: rgb(247, 186, 42);
	}

	.color-red {
		color: red;
	}

	.colorWhite {
		color: white !important;
	}

	.colorBlue {
		color: #007AFF;
	}

	.colorWhiteBgBlue {
		background-color: #007AFF !important;
		color: #FFFFFF !important;
	}

	.bg-color-white {
		background-color: #FFFFFF;
	}

	.bg-color-f7 {
		background-color: #f7f7f7;
	}

	.bg-blue {
		background-color: #007AFF !important;
	}

	.bg-green {
		background-color: #00aa00 !important;
	}

	.border-radius-10 {
		border-radius: 10rpx;
	}

	.border-radius-15 {
		border-radius: 10rpx;
	}

	.border-radius-20 {
		border-radius: 20rpx;
	}

	.border-radius-25 {
		border-radius: 25rpx;
	}

	.border-radius-30 {
		border-radius: 30rpx;
	}

	.border-bottom-1 {
		border-bottom: 1rpx solid #F7F7F7;
	}

	.border-bottom-2 {
		border-bottom: 2rpx solid #F7F7F7;
	}

	.border-bottom-3 {
		border-bottom: 3rpx solid #F7F7F7;
	}

	.border-bottom-4 {
		border-bottom: 4rpx solid #F7F7F7;
	}
</style>