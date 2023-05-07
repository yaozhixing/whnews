
<template>
	<mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" top="88">
		<view class="questions-list">
			<news-card
				v-for="(item, index) in questionList" 
				:key="item.id" 
				:title="item.title" 
				:news-id="item.informationId"
				:cover-type="item.coverType"
				:source-type="item.sourceType"
				:source-type-name="item.sourceTypeName"
				:cover-urls="item.coverUrls || []"
				:from-name="item.fromName"
				:publish-time-format="item.publishTimeFormat"
				:is-top="item.isTop"
				:activity-status-str="item.activityStatusStr"
				@click-news="clickQeustion(item)"
			></news-card>
		</view>
	</mescroll-uni>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
	import NewsCard from '@/pages/article/news-card.vue'
	import { queryOnlineQuestionPage } from '@/api/questions.js'
	import { getContentRouter } from '@/utils/to-news.js'
	export default {
		name: 'QuestionList',
		
		mixins: [MescrollMixin],
		
		components: {
		  NewsCard
		},
		
		props:{ },
		
		data() {
			return { 
				questionList:[],
				
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					},
					textNoMore:'- 暂无数据 -'
				}
			};
		},
		
		methods:{
			// 点击问答
			clickQeustion(item){
				const { informationId, sourceType } = item
				const currRouter = getContentRouter(sourceType)
				uni.navigateTo({
					url: `${currRouter}?id=${informationId}`
				});
			},
			
			async upCallback(page){
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				
				try{
					const { data: { data: result } } = await queryOnlineQuestionPage({
						keyword: '',
						page: pageNum,
						limit: pageSize
					})
					const { currPage, topList, list, totalPage: TotalPageCount,totalCount } = result
					// 接口返回的当前页数据列表 (数组)
					let curPageData = list; 
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = list.length; 
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = TotalPageCount; 
					// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
					let totalSize = totalCount; 
					// 接口返回的是否有下一页 (true/false)
					let hasNext = currPage !== totalPage; 
					
					//设置列表数据
					if(page.num === 1) this.questionList = []; //如果是第一页需手动置空列表
					this.questionList = this.questionList.concat(curPageData); //追加新数据
					
					// 请求成功,隐藏加载状态
					this.mescroll.endByPage(curPageLen, totalPage); 
				}catch(e){
					console.log(e)
					this.mescroll.endErr()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.questions-list{
		padding: 0 20px;
	}
</style>