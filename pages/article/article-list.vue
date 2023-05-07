<template>
	<view class="news-list-container" v-if="homeFlag">
		<view class="news-list">
			<news-card 
				v-for="(item,index) in newList" 
				:key="index" 
				:title="item.title || ''" 
				:news-id="item.informationId"
				:cover-type="item.coverType"
				:source-type="item.sourceType"
				:cover-urls="item.coverUrls || []"
				:from-name="item.fromName"
				:publish-time-format="item.publishTimeFormat"
				:is-top="item.isTop"
				@click-news="clickNews(item)"
			></news-card>
		</view>
	</view>
</template>

<script>
	import NewsCard from '@/pages/article/news-card.vue' // /pages/article/news-card.vue
	import { getContentRouter } from '@/utils/to-news.js'
	export default {
		name: 'ArticleList',
		
		components: {
		  NewsCard,
		},
		
		props:{
			newList:{
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
				newListData:[]
			};
		},
		
		watch:{
			newList:{
				handler(newValue){
					this.newListData = newValue
				},
				immediate:true,
				deep:true
			}
		},
		
		methods:{
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
	.news-list-container{
		display: flex;
		flex-direction: column;
		padding: 0 14px;
	}
	.news-list{
		display: flex;
		flex-direction: column;
	}
</style>