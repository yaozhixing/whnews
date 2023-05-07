<template>
	<view>
		<view class="select-tab" :class="hasLaunch ? 'hasLaunch' : ''">
			<scroll-view class="scroll-view" show-scrollbar="false" scroll-with-animation="true" scroll-x="true"
				enable-flex="true" :scrollIntoView="scrollIntoView">
				<view class="select-common-item" :class="item[selectTypeId] == selectType ? 'selected' : ''"
					v-for="(item,index) in list" :id="`tab${index}`" :key="index" @click="handleSelectItem(index)">
					{{item[labelKey]}}
				</view>
			</scroll-view>
			<view class="launch" v-if="hasLaunch" @click="handleShowLaunch">
				<view class="icon" :class="showLaunch ? 'rotate' : ''">
					<uni-icons type="bottom" size="18"></uni-icons>
				</view>
			</view>
		</view>
		<view class="launch-content" :class="showLaunch ? '' : 'close'">
			<view class="select-common-item" @click="handleSelectItem(index)"
				:class="item[selectTypeId] == selectType ? 'selected' : ''" v-for="(item,index) in list" :key="index">
				{{item[labelKey]}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
			// selectType: {
			// 	type: String,
			// 	default: ''
			// },
			selectTypeId: {
				type: String,
				default: '_id'
			},
			labelKey: {
				type: String,
				default: 'category'
			},
			hasLaunch: {
				type: Boolean,
				default: false
			},
		},
		
		model: {
		  prop: 'selectType',
		  event: 'change'
		},
		
		data() {
			return {
				selectType:'1',
				showLaunch: false,
				scrollIntoView: ''
			}
		},
		methods: {
			handleSelectItem(index) {
				this.selectType = this.list[index][this.selectTypeId]
				this.scrollIntoView = `tab${index}`
				this.showLaunch = false;
				this.$emit('handleSelectTab', this.list[index])
				this.$emit('change', this.selectType)
			},
			handleShowLaunch() {
				this.showLaunch = !this.showLaunch
			}
		},
	};
</script>

<style lang="scss" scoped>
	.scroll-view {
		white-space: nowrap;
		box-sizing: border-box;
	}

	.select-common-item {
		display: inline-block;
		padding: 0rpx 50rpx;
		flex-shrink: 0;
		font-size: 28rpx;
		border-radius: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-right: 25rpx;
		position: relative;
		color: #333;
		margin-right: 15rpx;

		&.selected {
			color: white;
			background: linear-gradient(to right, #ed2626, #ed2656);
			animation: Selected 0.8s;
		}
	}

	@keyframes Selected {
		0% {
			transform: scale(1);
		}

		25% {
			transform: scale(1.1);
		}

		75% {
			transform: scale(0.9);
		}

		100% {
			transform: scale(1);
		}
	}

	.select-tab {
		width: 100%;
		box-sizing: border-box;
		z-index: 99;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		display: flex;
		padding: 16rpx 0;
		background: #fff;
		position: relative;

		&.hasLaunch {
			padding-right: 70rpx;
		}

		.select-common-item:last-of-type {
			margin-right: 0rpx;
		}

		.launch {
			position: absolute;
			top: 50%;
			right: 20rpx;
			transform: translateY(-50%);

			.icon {
				transition: transform 0.4s;

				&.rotate {
					transform: rotate(180deg);
				}
			}
		}
	}

	.launch-content {
		display: flex;
		flex-wrap: wrap;
		padding: 0 20rpx 0rpx 20rpx;
		background-color: #fff;
		overflow-y: scroll;
		position: absolute;
		left: 0;
		top: 44px;
		z-index: 5;

		&.close {
			display: none;
		}

		.select-common-item {
			width: 30%;
			margin: 0 5% 20rpx 0;
			padding: 0 20rpx;
			box-sizing: border-box;
			text-align: center;
			overflow: hidden;

			transition-property: all;
			transition-duration: 1s;
		}

		.select-common-item:nth-of-type(3n) {
			margin-right: 0;
		}
	}
	
	::v-deep .select-tab {
		 .uni-scroll-view::-webkit-scrollbar{
			display: none;
			scrollbar-width: none;
		}
	}
</style>
