<template>
	<view class="container-page">
		<!-- 分类 -->
		<home-nav v-model="activeNav"></home-nav>
		
		<view class="home-main" ref="homeMain">
			<mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" top="80">
				<!-- 焦点图 -->
				<home-banner v-if="activeNav === 1" :home-flag="homeFlag" :banner-list="bannerList"></home-banner>
				
				<!-- 图集 -->
				<photo-list v-if="activeNav === 181" :home-flag="homeFlag" :photo-list="newList"></photo-list>
				
				<!-- 文章、视频列表 -->
				<article-list v-else  ref="listRef" :home-flag="homeFlag" :new-list="newList"></article-list>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import HomeNav from './conponents/home-nav.vue' // 导航
	import HomeBanner from './conponents/home-banner.vue' // banner
	import ArticleList from '@/pages/article/article-list.vue' // 新闻列表
	import PhotoList from '../photos/photo-list.vue' // 图集
	import { getHomeList, getNewsList } from '@/api/home.js'
	export default {
		name: 'Index',
		
		mixins: [MescrollMixin],
		
		components: {
		  HomeNav,
		  HomeBanner,
		  ArticleList,
		  PhotoList,
		},
		
		data() {
			return {
				newList: [],
				bannerList:[],
				homeFlag: false,
				activeNav:1,
				
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
			}
		},
		
		watch: {
			activeNav:{
				handler:function(newVal){
					this.$nextTick(function() {
						this.newList = []
						this.mescroll.resetUpScroll()
					});
				}
			}
		},
		
		methods:{
			async upCallback(page){
				const api = this.activeNav === 1 ? getHomeList : getNewsList
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				
				try{
					const { data: { data: result } } = await api({
						channelId: this.activeNav,
						columnId: '',
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
					if(page.num === 1) this.newList = []; //如果是第一页需手动置空列表
					this.newList = this.newList.concat(curPageData); //追加新数据
					
					// 请求成功,隐藏加载状态
					this.mescroll.endByPage(curPageLen, totalPage); 
					
					// 渲染banner数据
					if(this.activeNav === 1){
						this.bannerList = topList?.sectionLocations[1]?.list || []
					}
				}catch(e){
					console.log(e)
					this.mescroll.endErr()
				} finally {
					this.homeFlag = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.home-main{
	height: calc(100% - 39px);
	overflow: hidden;
}
</style>
