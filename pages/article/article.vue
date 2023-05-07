<template>
	<view class="container-page news-content">
		<view class="news-title">{{newsContent.title}}</view>
		<view class="time-source">{{newsContent.fromName}} {{newsContent.publishTimeFormat}}</view>
		<view class="content-wrap" v-html="newsContent.content"></view>
	</view>
</template>

<script>
	import {getNewsDetail} from '@/api/home.js'
	export default {
		name: 'Article',
		
		data() {
			return {
				contentId:'', 
				newsContent:{
					title:'',
					fromName:'',
					publishTimeFormat:'',
					content:''
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
			async requestData(){
				try{
					const {data:{data:result}} = await getNewsDetail({
						id: this.contentId
					})
					this.newsContent = result
					uni.setNavigationBarTitle({
						title: this.newsContent.title,
					})
				}catch(e){
					console.log(e)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.news-content{
	overflow-y: auto;
	padding: 25px 20px 20px;
	.news-title{
		font-size: 20px;
		font-weight: 500;
		line-height: 30px;
	}
	.time-source{
		color:#919191;
		margin: 25px 0;
	}
}
.content-wrap{
	font-size: 15px;
	color:#333;
	line-height: 28px;
	*{
		box-sizing: border-box;
	}
}
::v-deep .content-wrap img{
	display: block;
	max-width: 100% !important;
	height: auto !important;
	margin: 5px auto;
}
::v-deep .content-wrap p{
	max-width: 100%;
	* {
		display: block;
		max-width: 100% !important;
		height: auto !important;
		margin: 5px auto;
	}
}
</style>
