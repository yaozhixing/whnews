
<template>
	<view class="container-page photo-container">
		<uni-nav-bar left-icon="left" title="图集" @clickLeft="back" />
		
		<mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" top="88">
			<view class="photo-content">
				<!-- 头像、姓名 -->
				<view class="photo-header">
					<view class="header-tx">
						<image class="tx-img" width="36" height="36" :src="photoContent.logoUrl || require('@/static/avatar.png')" mode="aspectFill"></image>
					</view>
					<view class="info">
						<view class="name">
							{{photoContent.fromName}}
							<view class="weitoutiao-tag" v-if="photoContent.sourceType === 12">
								<image class="tx-img" width="52" height="15" :src="require('@/static/weitoutiao-tag.jpg')" mode="aspectFill"></image>
							</view>
						</view>
						<view class="datetime">{{photoContent.publishTimeFormat}}</view>
					</view>
				</view>
				
				<!-- 内容 -->
				<view class="content-wrap">
					<view 
						class="content-pre" 
						v-for="(content, index) in photoContent.contentList" 
						:key="index"
					>
						{{content}}
					</view>
				</view>
				
				<!-- 图片 -->
				<view class="image-wrap">
					<view class="image-item" v-for="(item, index) in photoContent.coverUrls" :key="index">
						<image class="toutiao-img" :src="item" mode="aspectFill" :data-src="item" @tap="previewOpen"></image>
					</view>
				</view>
				
				<view class="content-panel">
					<view class="title">
						全部评论
						<span class="comment-num" v-if="commentNum">{{commentNum}}</span>
					</view>
					<view class="other-info">
						{{photoContent.likeNumShort}} 赞 | {{photoContent.browseNumShort}} 阅读
					</view>
				</view>
				
				<comment-list
					ref="commentListRef"
					:comment-list-data="commentListData"
					:information-id="informationId"
					:front-uid="photoContent.frontUid"
				></comment-list>
				
			</view>
		</mescroll-uni>
		
		<preview-image 
			ref="previewImage" 
			:opacity="0.9" 
			:reduction="true" 
			:imgs="photoContent.coverUrls" 
		>
		</preview-image>
	</view>
</template>

<script>
	import PreviewImage from '@/components/kxj-previewImage/kxj-previewImage.vue';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
	import { getNewsDetail, getCommentListNew } from '@/api/home.js'
	import { EmptyData } from '@/components/empty-data/empty-data.vue'
	import CommentList from './comment-list.vue'
	export default {
		name: 'PhotoContent',
		
		mixins: [MescrollMixin],
		
		components: {
			CommentList,
			PreviewImage
		},
		
		data() {
			return {
				informationId:'',
				photoContent:{
					id:'',
					logoUrl:'',
					fromName:'',
					content:'',
					coverUrls:[],
					likeNum:0,
					likeNumShort:'',
					browseNum:0,
					browseNumShort:'',
					contentList:[],
					frontUid: 0
				},
				commentNum: 0,
				
				commentListData: [],
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {
					auto:false
				},
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
		
		// computed: {
		// 	previewImageData(){
		// 		return {
		// 			preview:[],
		// 			desc:[]
		// 		}
		// 	}
		// },
		
		onLoad(params) {
			if(params?.id){
				this.informationId = params?.id;
				this.requestData()
			}
		},
		
		methods:{
			back(){
				uni.navigateBack()
			},
			
			// 图片预览
			previewOpen(e) {
				var param = e.currentTarget.dataset.src;
				this.$refs.previewImage.open(param);
			},
			
			// 详情
			async requestData(){
				try{
					const { data:{ data:result } } = await getNewsDetail({
						id: this.informationId
					})
					if(!result){
						return
					}
					this.photoContent = result
					this.photoContent.contentList = result.content.split('\n')
					// if(result?.frontUid){
					// 	this.$nextTick(()=>{
					// 		this.mescroll.optDown.isLock = false
					// 		this.mescroll.resetUpScroll()
					// 		// // this.$refs.commentListRef?.requestData(result.frontUid)
					// 	})
					// }
				}catch(e){
					console.log(e)
				}
			},
			
			async upCallback(page){
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				
				try{
					const { data: { data: result, commentNum } } = await getCommentListNew({
						informationId: this.informationId,
						frontUid: this.photoContent.frontUid,
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
					if(page.num === 1) this.commentListData = []; //如果是第一页需手动置空列表
					this.commentListData = this.commentListData.concat(curPageData); //追加新数据
					
					// 请求成功,隐藏加载状态
					this.mescroll.endByPage(curPageLen, totalPage); 
					
					this.commentNum = commentNum
				}catch(e){
					console.log(e)
					this.mescroll.endErr()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.photo-content{
		overflow-y: auto;
		padding: 20px 20px 20px;
		flex:1;
		.content-wrap{
			margin:15px 0 0 10px;
		}
		.content-pre{
			font-size: 16px;
			margin-bottom: 15px;
		}
		.image-wrap{
			margin-top: 10px;
			display: flex;
			flex-wrap: wrap;
			// justify-content: space-around;
			.image-item{
				height: 80px;
				width: calc(100%/3 - 10px);
				margin-bottom: 10px;
				margin-right: 10px;
				border-radius: 3px;
				overflow: hidden;
				background-color: #ddd;
				&:nth-child(3n){
					margin-right: 0;
				}
				::v-deep .toutiao-img{
					div{
						border-radius: 3px;
					}
				}
			}
		}
	}
	.photo-header{
		display: flex;
		align-items: center;
		.header-tx{
			width: 36px;
			height: 36px;
			border-radius: 50%;
			margin-right: 10px;
			background-color: #ccc;
			::v-deep .tx-img{
				div{
					border-radius: 50%;
				}
			}
		}
		.info{
			.name{
				display: flex;
				align-items: center;
				font-weight: 600;
				.weitoutiao-tag{
					width: 52px;
					height: 15px;
					margin:-4px 0 0 5px;
				}
			}
			.datetime{
				font-size: 12px;
				color: #8e8e8e;
				margin-top: -5px;
			}
		}
	}
	
	.content-panel {
		margin-top: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height:30px;
		position: relative;
		&::after{
			position: absolute;
			top:2px;
			left:0;
			display: block;
			content: '';
			width:4px;
			height: 26px;
			background-color: #d81e06;
		}
		.title {
			font-size: 16px;
			color:#333;
			font-weight: 600;
			text-indent: 15px;
		}
		.other-info{
			color: #cacaca;
		}
	}
	
	.comment-num{
		margin-left: 5px;
	}
</style>