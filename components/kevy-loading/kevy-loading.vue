<template>
	<view class="t-content" catchtouchmove
		:style="{'background-color': transparent===true?'rgba(255,255,255,0)':'rgba(255,255,255,1)'}">
		<!-- NO BORDER SPINNER -->
		<view class="t-wrap" v-if="type=='nb-spinner'">
			<view class="nb-spinner" :style="{'border-top-color': color?color:'#07c160'}"></view>
			<view v-if="tip" class="t-tip" :style="[tipStyle]">{{tip}}</view>
		</view>
		<!-- BORDER TOP SPINNER -->
		<view class="t-wrap" v-if="type=='bt-spinner'">
			<view class="bt-spinner" :style="{'border-top-color': color?color:'#07c160'}"></view>
			<view v-if="tip" class="t-tip" :style="[tipStyle]">{{tip}}</view>
		</view>
		<!-- DOUBLE BORDER SPINNER -->
		<view class="t-wrap" v-if="type=='db-spinner'">
			<view class="db-spinner"
				:style="{'border-top-color': color?color:'#07c160','border-bottom-color':color?color:'#07c160'}"></view>
			<view v-if="tip" class="t-tip" :style="[tipStyle]">{{tip}}</view>
		</view>
		<!-- DOUBLE SPINNERS -->
		<view class="t-wrap" v-if="type=='dbl-spinner'">
			<view class="dbl-spinner"></view>
			<view class="dbl-spinner dbl-spinner--2"
				:style="{'border-right-color': color?color:'#07c160','border-bottom-color':color?color:'#07c160'}">
			</view>
			<view v-if="tip" class="t-tip" :style="{color: tipColor?tipColor:'#333333','margin-top':'130px'}">{{tip}}
			</view>
		</view>
		<!-- REVERSE SPINNER -->
		<view class="t-wrap" v-if="type=='reverse-spinner'">
			<view class="reverse-spinner"
				:style="{'border-top-color': color?color:'#07c160','border-left-color': color?color:'#07c160'}">
				<view class="reverse-before"
					:style="{'border-top-color': color?color:'#07c160','border-left-color': color?color:'#07c160'}">
				</view>
			</view>
			<view v-if="tip" class="t-tip" :style="[tipStyle]">{{tip}}</view>
		</view>
		<!-- HM SPINNER -->
		<view class="t-wrap" v-if="type=='hm-spinner'">
			<view class="hm-spinner"
				:style="{'border-top-color': color?color:'#07c160','border-bottom-color': color?color:'#07c160'}">
				<view class="hm-spinner-before"
					:style="{'border-top-color': color?color:'#07c160','border-bottom-color': color?color:'#07c160'}">
				</view>
			</view>
			<view v-if="tip" class="t-tip" :style="[tipStyle]">{{tip}}</view>
		</view>
		<!-- TRIPLE SPINNER -->
		<view class="t-wrap" v-if="type=='triple-spinner'">
			<view class="triple-spinner" :style="{'border-top-color': color?color:'#07c160'}">
				<view class="triple-spinner-before" :style="{'border-top-color': color?color:'#07c160',opacity:0.8}">
				</view>
				<view class="triple-spinner-after" :style="{'border-top-color': color?color:'#07c160',opacity:0.6}">
				</view>
			</view>
			<view v-if="tip" class="t-tip" :style="[tipStyle]">{{tip}}
			</view>
		</view>
		<!-- CM SPINNER -->
		<view class="t-wrap" v-if="type=='cm-spinner'">
			<view class="cm-spinner" :style="{'border-top-color': color?color:'#07c160'}">
				<view class="cm-spinner-before" :style="{'border-top-color': color?color:'#07c160',opacity:0.8}"></view>
				<view class="cm-spinner-after" :style="{'border-top-color': color?color:'#07c160',opacity:0.6}"></view>
			</view>
			<view v-if="tip" class="t-tip" :style="[tipStyle]">{{tip}}
			</view>
		</view>
		<!-- MUTLI SPINNER -->
		<view class="t-wrap" v-if="type=='multi-spinner'">
			<view class="multi-spinner-container">
				<view class="multi-spinner" :style="{'border-top-color': color?color:'#07c160'}">
					<view class="multi-spinner" :style="{'border-top-color': color?color:'#07c160'}">
						<view class="multi-spinner" :style="{'border-top-color': color?color:'#07c160'}">
							<view class="multi-spinner" :style="{'border-top-color': color?color:'#07c160'}">
								<view class="multi-spinner" :style="{'border-top-color': color?color:'#07c160'}">
									<view class="multi-spinner" :style="{'border-top-color': color?color:'#07c160'}">
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="tip" class="t-tip" :style="[tipStyle]">{{tip}}
			</view>
		</view>
		<!--  3 DOT LOADER  -->
		<view class="t-wrap" v-if="type=='dot-loader'">
			<view class="t-flex-row">
				<view class="dot-loader" :style="[colorStyle]"></view>
				<view class="dot-loader dot-loader--2" :style="[colorStyle]"></view>
				<view class="dot-loader dot-loader--3" :style="[colorStyle]"></view>
			</view>
			<view v-if="tip" class="t-tip" :style="[tipStyle]">{{tip}}
			</view>
		</view>
		<!--  MESH LOADER  -->
		<view class="t-wrap" v-if="type=='mesh-loader'">
			<view class="mesh-loader" :style="[colorStyle]">
				<view class="set-one">
					<view class="circle" :style="[colorStyle]"></view>
					<view class="circle" :style="[colorStyle]"></view>
				</view>
				<view class="set-two">
					<view class="circle" :style="[colorStyle]"></view>
					<view class="circle" :style="[colorStyle]"></view>
				</view>
			</view>
			<view v-if="tip" class="t-tip" :style="{color: tipColor?tipColor:'#333333','margin-top':'70rpx'}">{{tip}}
			</view>
		</view>
		<!-- HEART LOADER   -->
		<view class="t-wrap" v-if="type=='heart-loader'">
			<view class="heart-loader" :style="[colorStyle]">
				<view class="heart-loader-before" :style="[colorStyle]"></view>
				<view class="heart-loader-after" :style="[colorStyle]"></view>
			</view>
			<view v-if="tip" class="t-tip" :style="[tipStyle]">{{tip}}
			</view>
		</view>
		<!-- SS LOADER   -->
		<view class="t-wrap" v-if="type=='ss-loader'">
			<view class="ss-loader">
				<view :style="[colorStyle]"></view>
			</view>
			<view v-if="tip" class="t-tip" :style="[tipStyle]">{{tip}}
			</view>
		</view>
		<!-- LS LOADER   -->
		<view class="t-wrap" v-if="type=='ls-loader'">
			<view class="ls-loader">
				<view :style="[colorStyle]"></view>
				<view :style="[colorStyle]"></view>
				<view :style="[colorStyle]"></view>
				<view :style="[colorStyle]"></view>
				<view :style="[colorStyle]"></view>
			</view>
			<view v-if="tip" class="t-tip" :style="[tipStyle]">{{tip}}
			</view>
		</view>
		<!-- BSM LOADER   -->
		<view class="t-wrap" v-if="type=='bsm-loader'">
			<view class="bsm-loader">
				<view :style="[colorStyle]"></view>
				<view :style="[colorStyle]"></view>
				<view :style="[colorStyle]"></view>
			</view>
			<view v-if="tip" class="t-tip" :style="[tipStyle,{'margin-top':'60rpx'}]">{{tip}}
			</view>
		</view>
		<!-- BSRM LOADER   -->
		<view class="t-wrap" v-if="type=='bsrm-loader'">
			<view class="bsrm-loader">
				<view :style="{'border-color':color?color:'#07c160'}"></view>
				<view :style="{'border-color':color?color:'#07c160'}"></view>
				<view :style="{'border-color':color?color:'#07c160'}"></view>
			</view>
			<view v-if="tip" class="t-tip" :style="[tipStyle,{'margin-top':'60rpx'}]">{{tip}}
			</view>
		</view>
		<!-- PACMAN LOADER   -->
		<view class="t-wrap" v-if="type=='pacman-loader'">
			<view class="pacman-loader">
				<view :style="{'border-color':color?color:'#07c160','border-right-color':'transparent'}"></view>
				<view :style="{'border-color':color?color:'#07c160','border-right-color':'transparent'}"></view>
				<view :style="{'background-color':color?color:'#07c160'}"></view>
				<view :style="{'background-color':color?color:'#07c160'}"></view>
				<view :style="{'background-color':color?color:'#07c160'}"></view>
			</view>
			<view v-if="tip" class="t-tip" :style="[tipStyle,{'margin-top':'40rpx'}]">{{tip}}
			</view>
		</view>
		<!-- BPS LOADER   -->
		<view class="t-wrap" v-if="type=='bps-loader'">
			<view class="bps-loader">
				<view :style="{'background-color':color?color:'#07c160'}"></view>
				<view :style="{'background-color':color?color:'#07c160'}"></view>
				<view :style="{'background-color':color?color:'#07c160'}"></view>
			</view>
			<view v-if="tip" class="t-tip" :style="[tipStyle,{'margin-top':'40rpx'}]">{{tip}}
			</view>
		</view>
		<!-- DEFAULT -->
		<view class="t-wrap" v-else>
			<view class="nb-spinner" :style="{'border-top-color': color?color:'#07c160'}"></view>
			<view v-if="tip" class="t-tip" :style="[tipStyle]">{{tip}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "kevy-loading",
		props: {
			/**
			 * 类型
			 */
			type: {
				type: String,
				default: 'nb-spinner'
			},
			/**
			 * 颜色，支持css颜色值
			 */
			color: {
				type: String,
				default: '#07c160'
			},
			/**
			 * 文字提示
			 */
			tip: {
				type: String,
				default: ''
			},
			/**
			 * 文字提示颜色
			 */
			tipColor: {
				type: String,
				default: '#333333'
			},
			/**
			 * 是否透明
			 */
			transparent: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {

			};
		},
		computed: {
			colorStyle: function() {
				return {
					'background-color': this.color ? this.color : '#07c160'
				};
			},
			tipStyle: function() {
				return {
					color: this.tipColor ? this.tipColor : '#333333'
				};
			},
		}
	}
</script>

<style lang="scss" scoped>
	.t-content {
		position: fixed;
		z-index: 999999;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.t-flex-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.t-wrap {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.t-tip {
		font-size: 28rpx;
		margin-top: 40rpx;
		max-width: 600rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* NO BORDER SPINNER */
	.nb-spinner {
		width: 50px;
		height: 50px;
		margin: 0;
		background: transparent;
		border-top: 4px solid #009688;
		border-right: 4px solid transparent;
		border-radius: 50%;
		-webkit-animation: 1s spin linear infinite;
		animation: 1s spin linear infinite;
	}

	/* BORDER TOP SPINNER */
	.bt-spinner {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: transparent;
		border: 4px solid #eee;
		border-top-color: #009688;
		-webkit-animation: 1s spin linear infinite;
		animation: 1s spin linear infinite;
	}

	/* DOUBLE BORDER SPINNER */
	.db-spinner {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: transparent;
		border: 4px solid #eee;
		border-top-color: #009688;
		border-bottom-color: #009688;
		-webkit-animation: 1s spin linear infinite;
		animation: 1s spin linear infinite;
	}

	/* DOUBLE SPINNER */
	.double-spinner {
		position: relative;
	}

	.dbl-spinner {
		position: absolute;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: transparent;
		border: 4px solid transparent;
		border-top: 4px solid #eee;
		border-left: 4px solid #eee;
		-webkit-animation: 2s spin linear infinite;
		animation: 2s spin linear infinite;
	}

	.dbl-spinner--2 {
		border: 4px solid transparent;
		border-right: 4px solid #009688;
		border-bottom: 4px solid #009688;
		-webkit-animation: 1s spin linear infinite;
		animation: 1s spin linear infinite;
	}


	/* TRIPLE SPINNER */
	.triple-spinner {
		display: block;
		position: relative;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 4px solid transparent;
		border-top: 4px solid #FF5722;
		-webkit-animation: spin 2s linear infinite;
		animation: spin 2s linear infinite;
	}

	.triple-spinner-before,
	.triple-spinner-after {
		position: absolute;
		border-radius: 50%;
		border: 4px solid transparent;
	}

	.triple-spinner-before {
		top: 3px;
		left: 3px;
		right: 3px;
		bottom: 3px;
		border-top-color: #FF9800;
		-webkit-animation: spin 3s linear infinite;
		animation: spin 3.5s linear infinite;
	}

	.triple-spinner-after {
		top: 10px;
		left: 10px;
		right: 10px;
		bottom: 10px;
		border-top-color: #FFC107;
		-webkit-animation: spin 1.5s linear infinite;
		animation: spin 1.75s linear infinite;
	}

	/* REVERSE SPINNER */

	.reverse-spinner {
		position: relative;
		height: 50px;
		width: 50px;
		border: 2px solid transparent;
		border-top-color: #1976d2;
		border-left-color: #1976d2;
		border-radius: 50%;
		-webkit-animation: spin 1.5s linear infinite;
		animation: spin 1.5s linear infinite;
	}

	.reverse-before {
		position: absolute;
		top: 8px;
		left: 8px;
		right: 8px;
		bottom: 8px;
		content: "";
		border: 2px solid transparent;
		border-top-color: #03a9f4;
		border-left-color: #03a9f4;
		border-radius: 50%;
		-webkit-animation: spinBack 1s linear infinite;
		animation: spinBack 1s linear infinite;
	}

	/* HM SPINNER */
	.hm-spinner {
		height: 50px;
		width: 50px;
		border: 2px solid transparent;
		border-top-color: #9C27B0;
		border-bottom-color: #9C27B0;
		border-radius: 50%;
		position: relative;
		-webkit-animation: spin 3s linear infinite;
		animation: spin 3s linear infinite;
	}

	.hm-spinner-before {
		content: "";
		position: absolute;
		top: 10px;
		right: 10px;
		bottom: 10px;
		left: 10px;
		border: 3px solid transparent;
		border-top-color: #BA68C8;
		border-bottom-color: #BA68C8;
		border-radius: 50%;
		-webkit-animation: spin 1.5s linear infinite;
		animation: spin 1.5s linear infinite;

	}

	/* CM SPINNER */
	.cm-spinner {
		height: 50px;
		width: 50px;
		border: 3px solid transparent;
		border-radius: 50%;
		border-top: 4px solid #f15e41;
		-webkit-animation: spin 4s linear infinite;
		animation: spin 4s linear infinite;
		position: relative;
	}

	.cm-spinner-before,
	.cm-spinner-after {
		position: absolute;
		top: 6px;
		bottom: 6px;
		left: 6px;
		right: 6px;
		border-radius: 50%;
		border: 4px solid transparent;
	}

	.cm-spinner-before {
		border-top-color: #bad375;
		-webkit-animation: 3s spin linear infinite;
		animation: 3s spin linear infinite;
	}

	.cm-spinner-after {
		border-top-color: #26a9e0;
		-webkit-animation: spin 1.5s linear infinite;
		animation: spin 1.5s linear infinite;
	}

	.spinner-7 {
		width: 60px;
		height: 60px;
		margin: 0;
		background: transparent;
		border-top: 4px solid #fff;
		border-right: 4px solid transparent;
		border-radius: 50%;
		-webkit-animation: 1s spin linear infinite;
		animation: 1s spinBorder linear infinite;
	}

	/* 3 DOT LOADER */

	.dot-loader {
		height: 30rpx;
		width: 30rpx;
		border-radius: 50%;
		background-color: #f44336;
		position: relative;
		-webkit-animation: 1.2s grow ease-in-out infinite;
		animation: 1.2s grow ease-in-out infinite;
	}

	.dot-loader--2 {
		-webkit-animation: 1.2s grow ease-in-out infinite 0.15555s;
		animation: 1.2s grow ease-in-out infinite 0.15555s;
		margin: 0 10rpx;
	}

	.dot-loader--3 {
		-webkit-animation: 1.2s grow ease-in-out infinite 0.3s;
		animation: 1.2s grow ease-in-out infinite 0.3s;
	}

	/* CIRCLE DOT LOADER */

	.circle-loader {
		position: relative;
		width: auto;
		height: auto;
	}

	.circle-loader view {
		height: 10px;
		width: 10px;
		background-color: #f44336;
		border-radius: 50%;
		position: absolute;
		-webkit-animation: 0.8s opaque ease-in-out infinite both;
		animation: 0.8s opaque ease-in-out infinite both;
	}

	.circle-loader>view:nth-child(1) {
		top: -25px;
		left: 0;
	}

	.circle-loader>view:nth-child(2) {
		top: -17px;
		left: 17px;
		-webkit-animation-delay: 0.1s;
		animation-delay: 0.1s;
	}

	.circle-loader>view:nth-child(3) {
		top: 0;
		left: 25px;
		-webkit-animation-delay: 0.2s;
		animation-delay: 0.2s;
	}

	.circle-loader>view:nth-child(4) {
		top: 17px;
		left: 17px;
		-webkit-animation-delay: 0.3s;
		animation-delay: 0.3s;
	}

	.circle-loader>view:nth-child(5) {
		top: 25px;
		left: 0;
		-webkit-animation-delay: 0.4s;
		animation-delay: 0.4s;
	}

	.circle-loader>view:nth-child(6) {
		top: 17px;
		left: -17px;
		-webkit-animation-delay: 0.5s;
		animation-delay: 0.5s;
	}

	.circle-loader>view:nth-child(7) {
		top: 0;
		left: -25px;
		-webkit-animation-delay: 0.6s;
		animation-delay: 0.6s;
	}

	.circle-loader>view:nth-child(8) {
		top: -17px;
		left: -17px;
		-webkit-animation-delay: 0.7s;
		animation-delay: 0.7s;
	}

	/* MULTI SPINNER */

	.multi-spinner-container {
		width: 80px;
		height: 80px;
		position: relative;
		margin: 0px auto;
		overflow: hidden;
	}

	.multi-spinner {
		position: absolute;
		width: calc(100% - 9.9px);
		height: calc(100% - 9.9px);
		border: 5px solid transparent;
		border-top-color: #ff5722;
		border-radius: 50%;
		-webkit-animation: spin 5s cubic-bezier(0.17, 0.49, 0.96, 0.76) infinite;
		animation: spin 5s cubic-bezier(0.17, 0.49, 0.96, 0.76) infinite;
	}

	/* MESH LOADER */

	.mesh-loader {
		// overflow: hidden;
		// height: inherit;
		// width: inherit;
	}

	.mesh-loader .circle {
		width: 20rpx;
		height: 20rpx;
		position: absolute;
		background: #f44336;
		border-radius: 50%;
		margin: -10rpx;
		-webkit-animation: mesh 3s ease-in-out infinite -1.5s;
		animation: mesh 3s ease-in-out infinite -1.5s;
	}

	.mesh-loader>view .circle:last-child {
		-webkit-animation-delay: 0s;
		animation-delay: 0s;
	}


	.mesh-loader>view:last-child {
		-webkit-transform: rotate(90deg);
		-ms-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	/* TRIFORCE LOADER */
	.triforce-container {
		width: 100px;
		height: 100px;
		position: relative;
		margin: 120px auto;
	}

	.triforce,
	.triforce::before,
	.triforce::after {
		width: 0;
		height: 0;
		border-left: 25px solid transparent;
		border-right: 25px solid transparent;
		border-bottom: 50px solid #ceb502;
		position: relative;
		-webkit-animation: 3s triforce linear infinite 2s both;
		animation: 3s triforce linear infinite 2s both;
		top: 50px;
	}

	.triforce::before,
	.triforce::after {
		content: "";
		position: absolute;
	}

	.triforce::before {
		left: 25px;
		top: 0;
		-webkit-animation-delay: 1s;
		animation-delay: 1s;
	}

	.triforce::after {
		top: -50px;
		-webkit-animation-delay: 0s;
		animation-delay: 0s;
	}

	/* HEART LOADER */

	.heart-loader {
		background-color: #f44336;
		width: 50rpx;
		height: 50rpx;
		position: relative;
		-webkite-transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
		-webkit-animation: pulsate 1s infinite;
		animation: pulsate 1s infinite;
	}

	.heart-loader-before,
	.heart-loader-after {
		display: inline-block;
		width: 50rpx;
		height: 50rpx;
		background-color: #f44336;
		position: absolute;
		border-radius: 50%;
	}

	.heart-loader-before {
		top: 0px;
		left: -25rpx;
	}

	.heart-loader-after {
		top: -25rpx;
		left: -0px;
	}


	/* SPINNER 13 */

	.ml-loader {
		position: relative;
		width: 70px;
		height: 70px;
	}

	.ml-loader view {
		-webkit-transform-origin: 32px 32px;
		-ms-transform-origin: 32px 32px;
		transform-origin: 32px 32px;
		-webkit-animation: 1.2s opaque ease-in-out infinite both;
		animation: 1.2s opaque ease-in-out infinite both;
	}

	.ml-loader view::after {
		content: "";
		display: block;
		position: absolute;
		top: 0;
		left: 30px;
		width: 5px;
		height: 18px;
		border-radius: 10px;
		background-color: #f44336;
	}

	.ml-loader view:nth-child(1) {
		-webkit-transform: rotate(0);
		-ms-transform: rotate(0);
		transform: rotate(0);
	}

	.ml-loader view:nth-child(2) {
		-webkit-transform: rotate(30deg);
		-ms-transform: rotate(30deg);
		transform: rotate(30deg);
		-webkit-animation-delay: 0.1s;
		animation-delay: 0.1s;
	}

	.ml-loader view:nth-child(3) {
		-webkit-transform: rotate(60deg);
		-ms-transform: rotate(60deg);
		transform: rotate(60deg);
		-webkit-animation-delay: 0.2s;
		animation-delay: 0.2s;
	}

	.ml-loader view:nth-child(4) {
		-webkit-transform: rotate(90deg);
		-ms-transform: rotate(90deg);
		transform: rotate(90deg);
		-webkit-animation-delay: 0.3s;
		animation-delay: 0.3s;
	}

	.ml-loader view:nth-child(5) {
		-webkit-transform: rotate(120deg);
		-ms-transform: rotate(120deg);
		transform: rotate(120deg);
		-webkit-animation-delay: 0.4s;
		animation-delay: 0.4s;
	}

	.ml-loader view:nth-child(6) {
		-webkit-transform: rotate(150deg);
		-ms-transform: rotate(150deg);
		transform: rotate(150deg);
		-webkit-animation-delay: 0.5s;
		animation-delay: 0.5s;
	}

	.ml-loader view:nth-child(7) {
		-webkit-transform: rotate(180deg);
		-ms-transform: rotate(180deg);
		transform: rotate(180deg);
		-webkit-animation-delay: 0.6s;
		animation-delay: 0.6s;
	}

	.ml-loader view:nth-child(8) {
		-webkit-transform: rotate(210deg);
		-ms-transform: rotate(210deg);
		transform: rotate(210deg);
		-webkit-animation-delay: 0.7s;
		animation-delay: 0.7s;
	}

	.ml-loader view:nth-child(9) {
		-webkit-transform: rotate(240deg);
		-ms-transform: rotate(240deg);
		transform: rotate(240deg);
		-webkit-animation-delay: 0.8s;
		animation-delay: 0.8s;
	}

	.ml-loader view:nth-child(10) {
		-webkit-transform: rotate(270deg);
		-ms-transform: rotate(270deg);
		transform: rotate(270deg);
		-webkit-animation-delay: 0.9s;
		animation-delay: 0.9s;
	}

	.ml-loader view:nth-child(11) {
		-webkit-transform: rotate(300deg);
		-ms-transform: rotate(300deg);
		transform: rotate(300deg);
		-webkit-animation-delay: 1s;
		animation-delay: 1s;
	}

	.ml-loader view:nth-child(12) {
		-webkit-transform: rotate(330deg);
		-ms-transform: rotate(330deg);
		transform: rotate(330deg);
		-webkit-animation-delay: 1.1s;
		animation-delay: 1.1s;
	}

	.ml-loader view:nth-child(13) {
		-webkit-transform: rotate(360deg);
		-ms-transform: rotate(360deg);
		transform: rotate(360deg);
		-webkit-animation-delay: 1.2s;
		animation-delay: 1.2s;
	}

	@keyframes rotate {
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}





	@keyframes spin {
		from {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}



	@keyframes spinBack {
		from {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(-720deg);
			transform: rotate(-720deg);
		}
	}



	@keyframes spinBorder {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
			border-width: 15px;
		}

		50% {
			-webkit-transform: rotate(180deg);
			transform: rotate(180deg);
			border-width: 3px;
		}

		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
			border-width: 15px;
		}
	}


	@keyframes grow {

		0%,
		40%,
		100% {
			-webkit-transform: scale(0);
			transform: scale(0);
		}

		40% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}



	@keyframes triforce {
		0% {
			border-bottom-color: rgb(206, 181, 2);
		}

		40% {
			border-bottom-color: rgba(206, 181, 2, 0);
		}

		80% {
			border-bottom-color: rgb(206, 181, 2);
		}

		100% {
			border-bottom-color: rgb(206, 181, 2);
		}
	}


	@keyframes pulsate {
		0% {
			-webkit-transform: rotate(45deg) scale(0.8);
			transform: rotate(45deg) scale(0.8);
			transform: rotate(45deg) scale(0.8);
		}

		5% {
			-webkit-transform: rotate(45deg) scale(0.9);
			transform: rotate(45deg) scale(0.9);
		}

		10% {
			-webkit-transform: rotate(45deg) scale(0.8);
			transform: rotate(45deg) scale(0.8);
		}

		15% {
			-webkit-transform: rotate(45deg) scale(1);
			transform: rotate(45deg) scale(1);
		}

		50% {
			-webkit-transform: rotate(45deg) scale(0.8);
			transform: rotate(45deg) scale(0.8);
		}

		100% {
			-webkit-transform: rotate(45deg) scale(0.8);
			transform: rotate(45deg) scale(0.8);
		}
	}



	@keyframes opaque {
		0% {
			opacity: 0.1;
		}

		40% {
			opacity: 1;
		}

		80% {
			opacity: 0.1;
		}

		100% {
			opacity: 0.1;
		}
	}



	@keyframes mesh {
		0% {
			-webkit-transform-origin: 50% -100%;
			transform-origin: 50% -100%;
			-webkit-transform: rotate(0);
			transform: rotate(0);
		}

		50% {
			-webkit-transform-origin: 50% -100%;
			transform-origin: 50% -100%;
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}

		50.1% {
			-webkit-transform-origin: 50% 200%;
			transform-origin: 50% 200%;
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-webkit-transform-origin: 50% 200%;
			transform-origin: 50% 200%;
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	.ss-loader>view {
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		width: 60rpx;
		height: 60rpx;
		background: #07c160;
		-webkit-animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
		animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
	}

	/* SS SPINNER */
	@keyframes square-spin {
		25% {
			-webkit-transform: perspective(100px) rotateX(180deg) rotateY(0);
			transform: perspective(100px) rotateX(180deg) rotateY(0);
		}

		50% {
			-webkit-transform: perspective(100px) rotateX(180deg) rotateY(180deg);
			transform: perspective(100px) rotateX(180deg) rotateY(180deg);
		}

		75% {
			-webkit-transform: perspective(100px) rotateX(0) rotateY(180deg);
			transform: perspective(100px) rotateX(0) rotateY(180deg);
		}

		100% {
			-webkit-transform: perspective(100px) rotateX(0) rotateY(0);
			transform: perspective(100px) rotateX(0) rotateY(0);
		}
	}

	/* LS SPINNER */
	.ls-loader>view:nth-child(1) {
		-webkit-animation: line-scale 1s -0.4s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
		animation: line-scale 1s -0.4s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
	}

	.ls-loader>view:nth-child(2) {
		-webkit-animation: line-scale 1s -0.3s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
		animation: line-scale 1s -0.3s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
	}

	.ls-loader>view:nth-child(3) {
		-webkit-animation: line-scale 1s -0.2s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
		animation: line-scale 1s -0.2s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
	}

	.ls-loader>view:nth-child(4) {
		-webkit-animation: line-scale 1s -0.1s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
		animation: line-scale 1s -0.1s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
	}

	.ls-loader>view:nth-child(5) {
		-webkit-animation: line-scale 1s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
		animation: line-scale 1s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
	}



	.ls-loader>view {
		background-color: #07c160;
		width: 4px;
		height: 35px;
		border-radius: 2px;
		margin: 2px;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		display: inline-block;
	}

	@keyframes line-scale {
		0% {
			-webkit-transform: scaley(1);
			transform: scaley(1);
		}

		50% {
			-webkit-transform: scaley(0.4);
			transform: scaley(0.4);
		}

		100% {
			-webkit-transform: scaley(1);
			transform: scaley(1);
		}
	}

	/* BSM SPINNER */
	@keyframes ball-scale-multiple {
		0% {
			-webkit-transform: scale(0);
			transform: scale(0);
			opacity: 0;
		}

		5% {
			opacity: 1;
		}

		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 0;
		}
	}

	.bsm-loader {
		position: relative;
		-webkit-transform: translateY(-30px);
		transform: translateY(-30px);
	}

	.bsm-loader>view:nth-child(2) {
		-webkit-animation-delay: -0.4s;
		animation-delay: -0.4s;
	}

	.bsm-loader>view:nth-child(3) {
		-webkit-animation-delay: -0.2s;
		animation-delay: -0.2s;
	}

	.bsm-loader>view {
		border-radius: 100%;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		position: absolute;
		left: -30px;
		top: 0px;
		opacity: 0;
		margin: 0;
		width: 60px;
		height: 60px;
		-webkit-animation: ball-scale-multiple 1s 0s linear infinite;
		animation: ball-scale-multiple 1s 0s linear infinite;
	}

	/* BSRM SPINNER */
	@keyframes ball-scale-ripple-multiple {
		0% {
			-webkit-transform: scale(0.1);
			transform: scale(0.1);
			opacity: 1;
		}

		70% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 0.7;
		}

		100% {
			opacity: 0.0;
		}
	}

	.bsrm-loader {
		position: relative;
		-webkit-transform: translateY(-25px);
		transform: translateY(-25px);
	}

	.bsrm-loader>view:nth-child(0) {
		-webkit-animation-delay: -0.8s;
		animation-delay: -0.8s;
	}

	.bsrm-loader>view:nth-child(1) {
		-webkit-animation-delay: -0.6s;
		animation-delay: -0.6s;
	}

	.bsrm-loader>view:nth-child(2) {
		-webkit-animation-delay: -0.4s;
		animation-delay: -0.4s;
	}

	.bsrm-loader>view:nth-child(3) {
		-webkit-animation-delay: -0.2s;
		animation-delay: -0.2s;
	}

	.bsrm-loader>view {
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		position: absolute;
		top: -2px;
		left: -26px;
		width: 50px;
		height: 50px;
		border-radius: 100%;
		border: 2px solid #fff;
		-webkit-animation: ball-scale-ripple-multiple 1.25s 0s infinite cubic-bezier(0.21, 0.53, 0.56, 0.8);
		animation: ball-scale-ripple-multiple 1.25s 0s infinite cubic-bezier(0.21, 0.53, 0.56, 0.8);
	}

	/* PACMAN SPINNER */
	@keyframes rotate_pacman_half_up {
		0% {
			-webkit-transform: rotate(270deg);
			transform: rotate(270deg);
		}

		50% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}

		100% {
			-webkit-transform: rotate(270deg);
			transform: rotate(270deg);
		}
	}

	@keyframes rotate_pacman_half_down {
		0% {
			-webkit-transform: rotate(90deg);
			transform: rotate(90deg);
		}

		50% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-webkit-transform: rotate(90deg);
			transform: rotate(90deg);
		}
	}

	@keyframes pacman-balls {
		75% {
			opacity: 0.7;
		}

		100% {
			-webkit-transform: translate(-100rpx, -6.25px);
			transform: translate(-100rpx, -6.25px);
		}
	}

	.pacman-loader {
		position: relative;
	}

	.pacman-loader>view:nth-child(2) {
		-webkit-animation: pacman-balls 1s -0.99s infinite linear;
		animation: pacman-balls 1s -0.99s infinite linear;
	}

	.pacman-loader>view:nth-child(3) {
		-webkit-animation: pacman-balls 1s -0.66s infinite linear;
		animation: pacman-balls 1s -0.66s infinite linear;
	}

	.pacman-loader>view:nth-child(4) {
		-webkit-animation: pacman-balls 1s -0.33s infinite linear;
		animation: pacman-balls 1s -0.33s infinite linear;
	}

	.pacman-loader>view:nth-child(5) {
		-webkit-animation: pacman-balls 1s 0s infinite linear;
		animation: pacman-balls 1s 0s infinite linear;
	}

	.pacman-loader>view:nth-child(1) {
		width: 0px;
		height: 0px;
		border-right: 25rpx solid transparent;
		border-top: 25rpx solid #07c160;
		border-left: 25rpx solid #07c160;
		border-bottom: 25rpx solid #07c160;
		border-radius: 25rpx;
		-webkit-animation: rotate_pacman_half_up 0.5s 0s infinite;
		animation: rotate_pacman_half_up 0.5s 0s infinite;
		position: relative;
		left: -30rpx;
	}

	.pacman-loader>view:nth-child(2) {
		width: 0px;
		height: 0px;
		border-right: 25rpx solid transparent;
		border-top: 25rpx solid #07c160;
		border-left: 25rpx solid #07c160;
		border-bottom: 25rpx solid #07c160;
		border-radius: 25rpx;
		-webkit-animation: rotate_pacman_half_down 0.5s 0s infinite;
		animation: rotate_pacman_half_down 0.5s 0s infinite;
		margin-top: -50rpx;
		position: relative;
		left: -30rpx;
	}

	.pacman-loader>view:nth-child(3),
	.pacman-loader>view:nth-child(4),
	.pacman-loader>view:nth-child(5),
	.pacman-loader>view:nth-child(6) {
		background-color: #07c160;
		width: 15rpx;
		height: 15rpx;
		border-radius: 100%;
		margin: 2rpx;
		width: 10rpx;
		height: 10rpx;
		position: absolute;
		-webkit-transform: translate(0, -6.25rpx);
		transform: translate(0, -6.25rpx);
		top: 25rpx;
		left: 70rpx;
	}

	/* BPS loader */
	@keyframes ball-pulse-sync {
		33% {
			-webkit-transform: translateY(15rpx);
			transform: translateY(15rpx);
		}

		66% {
			-webkit-transform: translateY(-15rpx);
			transform: translateY(-15rpx);
		}

		100% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
	}

	.bps-loader>view:nth-child(1) {
		-webkit-animation: ball-pulse-sync 0.6s -0.14s infinite ease-in-out;
		animation: ball-pulse-sync 0.6s -0.14s infinite ease-in-out;
	}

	.bps-loader>view:nth-child(2) {
		-webkit-animation: ball-pulse-sync 0.6s -0.07s infinite ease-in-out;
		animation: ball-pulse-sync 0.6s -0.07s infinite ease-in-out;
	}

	.bps-loader>view:nth-child(3) {
		-webkit-animation: ball-pulse-sync 0.6s 0s infinite ease-in-out;
		animation: ball-pulse-sync 0.6s 0s infinite ease-in-out;
	}

	.bps-loader>view {
		width: 20rpx;
		height: 20rpx;
		border-radius: 100%;
		margin: 2px;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		display: inline-block;
	}
</style>