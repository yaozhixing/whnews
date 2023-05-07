<template>
	<view class="container-page">
		<!-- <view class="theme-header">
			<view class="head-title">专题</view>
		</view> -->
		<uni-nav-bar left-icon="left" title="专题" @clickLeft="back" />
		
		<view class="theme-container">
			<!-- top -->
			<view class="cover-image"><image mode="aspectFill" style="width: 100%" :src="newsContent.topPicUrl"></image></view>
			<view class="top-header">
				<view class="title">{{newsContent.title}}</view>
				<view class="desc">{{newsContent.abstractInfo}}</view>
				<view class="tags" v-if="newsContent.tags.length > 1">
					<text v-for="(item, index) in newsContent.tags" :key="index">{{item}}</text>
				</view>
			</view>
			
			<!-- list -->
			<div class="theme-list-container">
				<div class="theme-item" v-for="moduleItem in newsContent.featureModules" :key="moduleItem.id">
					<view class="theme-title" v-if="newsContent.tags.length > 1">{{moduleItem.moduleName}}</view>
					<news-card
						v-for="(item,index) in moduleItem.relatedInformations" 
						:key="item.id" 
						:title="item.title" 
						:news-id="item.informationId"
						:cover-type="item.coverType"
						:source-type="item.sourceType"
						:cover-urls="item.coverUrls || []"
						:from-name="item.fromName"
						:publish-time-format="item.publishTimeFormat"
						:is-top="item.isTop"
						@click-news="clickNews(item)"
					></news-card>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	import NewsCard from '@/pages/article/news-card.vue'
	import { getNewsDetail } from '@/api/home.js'
	import { getContentRouter } from '@/utils/to-news.js'
	export default {
		name: 'Theme',
		
		components: {
		  NewsCard,
		},
			
		data() {
			return {
				newsContent:{
					title:'',
					abstractInfo:'',
					topPicUrl:'',
					tags:[],
					toutiao:[],
					dongtai:[],
					pinglun:[],
					hudong:[],
					fangtan:[]
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
				uni.navigateBack() //默认delta:1
			},
			
			async requestData(){
				try{
					const {data:{data:result}} = await getNewsDetail({
						id: this.contentId
					})
					this.newsContent = result
					// tag 
					this.newsContent.tags = result.featureModules.map(item => item.moduleName)
					// 分类
					const [toutiao, dongtai, pinglun, hudong, fangtan] = result.featureModules.map(item => item.relatedInformations)
					this.newsContent.toutiao = toutiao
					this.newsContent.dongtai = dongtai
					this.newsContent.pinglun = pinglun
					this.newsContent.hudong = hudong
					this.newsContent.fangtan = fangtan
					// title
					uni.setNavigationBarTitle({
						title: this.newsContent.title,
					})
				}catch(e){
					console.log(e)
				}
			},
			
			clickNews(item){
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
// .theme-header{
// 	height:42px;
// 	width: 100%;
// 	display: flex;
// 	justify-content: space-around;
// 	align-items: center;
// 	border-bottom: 1px solid #e9e9e9;
// 	background: #fff;
// 	z-index: 10;
// 	box-shadow: 0 1px 6px #ccc;
// 	.head-title{
// 		font-size: 17px;
// 		font-weight: 600;
// 	}
// }
.cover-image{
	width: 100%;
	height: 150px;
	overflow: hidden;
	.cover-image{
		width: 100%;
	}
}

.theme-container{
	flex:1;
	overflow-y: auto;
}

.top-header{
	padding: 18px 18px 0;
	.title{
		font-size: 20px;
		font-weight: 600;
		margin-bottom: 10px;
	}
	.desc{
		color: #666;
	}
}


.theme-item{
	padding: 14px 0;
	+ .theme-item{
		padding: 0 0 14px;
	}
	.news-card{
		padding:14px 0;
		margin:0 14px;
	}
	.theme-title{
		background: #ebecee;
		font-weight: 600;
		font-size: 16px;
		margin-bottom: 3px;
		position: relative;
		padding:10px 25px;
		&:before{
			content: "";
			position: absolute;
			left: 0.78rem;
			top: 50%;
			transform: translateY(-50%);
			width: 0.22rem;
			height: 0.61rem;
			background: #ee302c;
		}
	}
}

</style>
