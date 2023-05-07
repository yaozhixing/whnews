<template>
	<view class="empty-data-container">
		<view class="empty-data-image" :style="[{'width':`${imageSize}px`},{'height':`${imageSize}px`}]">
			<image class="empty-data-src" :src="imageSrc" mode="aspectFill"></image>
		</view>
		<view class="desc">
			{{desc}}
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'EmptyData',
		
		props:{
			// 暂无数据自定义图片
			imageSrc:{
				type: String,
				default:require('@/static/empty-data.png')
			},
			
			// 自定义图片大小
			imageSize:{
				type: Number,
				default: 90
			},
			
			// 暂无图片描述
			desc:{
				type: String,
				default:'暂无数据！'
			}
		},
		
		data() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.empty-data-container{
		margin-top:40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.empty-data-image{
			display: flex;
			align-content: center;
			justify-content: center;
		}
		.desc{
			margin-top: 16px;
			text-align: center;
			color: #999;
		}
	}
</style>