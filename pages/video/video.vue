<template>
	<view class="container-page video-content">
		<!-- back -->
		<view class="video-back" @click="back">
			<uni-icons class="icon" type="back" size="22" style="color: #ccc;"></uni-icons>
		</view>
		<!-- 视频信息 -->
		<view class="video-info">
			<view class="top">
				<view class="header-pic">
					<image class="header-pic-src" width="24" height="24" :src="require('@/static/avatar.png')" mode="aspectFill"></image>
				</view>
				<view class="name">{{videoContent.fromName}}</view>
			</view> 
			<view class="title">
				{{videoContent.title}}
			</view>
		</view>
		<!-- 视频源 -->
		<view class="video-main">
			<video 
				:src="videoContent.videoUrl" 
				x5-video-player-type="h5-page" 
				x5-video-orientation="landscape|portrait" 
				webkit-playsinline="true" 
				playsinline="true"  
				controls="controls" 
				autoplay="autoplay" 
				style='display:block;width: 100%;height:100%;background: #000;'
			></video>
		</view>
	</view>
</template>

<script>
	import {getNewsDetail} from '@/api/home.js'
	export default {
		name: 'VideoContent',
		
		data() {
			return {
				contentId:'', 
				videoContent:{
					title:'',
					logoUrl:'',
					fromName:'',
					videoUrl:'',
				}
			};
		},
		
		onLoad(params) {
			if(params?.id){
				this.contentId = params?.id;
				this.requestData()
			}
		},
		
		methods:{
			back(){
				uni.navigateBack() // 默认delta:1
			},
			
			async requestData(){
				try{
					const {data:{data:result}} = await getNewsDetail({
						id: this.contentId
					})
					this.videoContent = result
					uni.setNavigationBarTitle({
						title: this.videoContent.title,
					})
				}catch(e){
					console.log(e)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.video-main{
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0px;
	top: 0px;
}
.video-info{
	position: fixed;
	width: 90%;
	left:20px;
	bottom:44px;
	z-index: 9999;
	color: #fff;
	.top{
		display: flex;
		align-items: center;
		.header-pic{
			margin-right: 10px;
			width:24px;
			height: 24px;
			border-radius: 50%;
			background-color: #ccc;
			::v-deep .header-pic-src{
				div{
					border-radius: 50%;
				}
			}
		}
		.name{
			font-weight: 600;
		}
	}
	.title{
		margin-top: 10px;
		font-size: 16px;
	}
}
.video-back{
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	width: 28px;
	height: 28px;
	left: 16px;
	top: 16px;
	box-sizing: content-box;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 50%;
	border: 1px solid rgb(145, 136, 136);
	z-index: 10;
	::v-deep .icon{
		color: white;
	}
}
</style>
