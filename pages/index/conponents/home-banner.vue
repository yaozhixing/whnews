<template>
	<view class="home-banner-container" v-if="homeFlag">
		<uni-swiper-dot 
			:info="bannnerListData" 
			:current="current" 
			field="content" 
			mode="round" 
			:dotsStyles="{'selectedBackgroundColor':'rgba(255,255,255,.9)','backgroundColor':'rgba(255,255,255,.3)', border: 'none', 'selectedBorder':'red'}"
		>
			<swiper class="swiper-box" @change="change" :autoplay="true">
				<swiper-item v-for="(item ,index) in bannnerListData" :key="index" >
					<view class="swiper-item" @click="onBanner(item)">
						<image style="width:100%" mode="aspectFill" :src="item.pcCoverUrl"></image>
						<view class="banner-title">{{item.title}}</view>
					</view> 
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
import { getContentRouter } from '@/utils/to-news.js'
export default {
	name: 'HomeBanner',
	
	props:{
		bannerList:{
			required:true,
			type: Array,
			default:[]
		},
		homeFlag:{
			required:true,
			type: Boolean,
			default:false
		}
	},
	
	data() {
		return {
			bannnerListData:[], 
			current: 0,
		}
	},
	
	watch:{
		homeFlag:{
			handler (newVal, oldVal) {
				if(newVal){
					this.bannnerListData = this.bannerList
				}
			}, 
			immediate: true
		} 
	},
	
	methods: {
		change(e) {
			this.current = e.detail.current;
		},
		
		onBanner(item){
			const { informationId, sourceType } = item
			const currRouter = getContentRouter(sourceType)
			uni.navigateTo({
				url: `${currRouter}?id=${informationId}`
			});
		}
	}
}
</script>

<style lang="scss" scoped>
	.home-banner-container{
		display: flex;
		flex-direction: column;
		height: 200px;
		margin: 6px 14px 14px;
		background-color: #f1f1f1;
		border-radius: 4px;
		overflow: hidden;
		.swiper-box{
			height: 100%;
		}
		.swiper-item{
			height: 100%;
		}
	}
	
	.banner-title{
		position: absolute;
		left: 0px;
		bottom: 0px;
		width: 100%;
		padding: 20px 10px;
		box-sizing: border-box;
		background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
		font-size: 14px;
		color: white;
	}
</style>