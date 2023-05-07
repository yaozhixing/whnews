<template>
	<view class="container-page question-container">
		<uni-nav-bar left-icon="left" title="在线问答" @clickLeft="back" />
		
		<mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" top="88">
			<view class="question-content">
				<view class="news-title">{{newsContent.title}}</view>
				<view class="arc-info">
					<view class="browse-number">
						浏览数 {{newsContent.browseNum}} 评论数 {{newsContent.commentNum}}
					</view>
					<view class="status">
						{{newsContent.activityStatusStr}}
					</view>
				</view>
				<view class="publish-datetime">
					<view class="title">
						在线时间：
					</view>
					<view class="desc">
						{{newsContent.startTime}} - {{newsContent.endTime}}
					</view>
				</view>
				
				<!-- 内容 -->
				<view class="content-panel">
					<view class="title">
						内容简介
					</view>
				</view>
				<view class="content-wrap" v-html="newsContent.content"></view>
				
				<!-- 问答 -->
				<view class="content-panel">
					<view class="title">
						全部提问
					</view>
				</view>
				<view class="comment-list">
					<view class="comment-wrap" v-for="comment in commentList" :key="comment.id" @click="toReplyDetail(comment.id)">
						<view class="comment-header">
							<view class="header-tx">
								<image class="tx-img" width="36" height="36" :src="comment.questionerHeader || require('@/static/avatar.png')" mode="aspectFill"></image>
							</view>
							<view class="info">
								<view class="name">{{comment.questionerName}}</view>
								<view class="datetime">{{comment.publishTimeFormat}}</view>
							</view>
						</view>
						<view class="content">{{comment.content}}</view>
						<view class="reply-wrap" v-if="comment.ifReply">
							<view class="reply-title">
								<view class="reply-da">答</view>
								<view class="reply-name">{{comment.replyGovName}}</view>
							</view>
							<view class="reply-content">
								{{comment.shortReplyContent}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
		
		
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
	import { getOnlineQuestionDetail, getQuestionComment } from '@/api/questions.js'
	export default {
		name: 'QuestionContent',
		
		mixins: [MescrollMixin],
		
		data() {
			return {
				newsContent: {
					title:'',
					fromName:'',
					publishTimeFormat:'',
					content:'',
					browseNum:'',
					commentNum:'',
				},
				
				commentList: [],
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
			
			toReplyDetail(id){
				uni.navigateTo({
					url: `pages/questions/components/reply-content?id=${id}`
				});
			},
			
			async requestData(){
				try{
					const {data:{ data:result } } = await getOnlineQuestionDetail({
						id: this.contentId
					})
					this.newsContent = result
				} catch (e){
					console.log(e)
				}
			},
			
			async upCallback(page){
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				
				try{
					const { data: { data: result } } = await getQuestionComment({
						id: this.contentId,
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
					if(page.num === 1) this.commentList = []; //如果是第一页需手动置空列表
					this.commentList = this.commentList.concat(curPageData); //追加新数据
					
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
.question-container{
	.question-content{
		overflow-y: auto;
		padding: 25px 20px 20px;
	}
	.news-title{
		font-size: 20px;
		font-weight: 500;
		line-height: 30px;
	}
	.time-source{
		color:#919191;
		margin: 25px 0;
	}
	.arc-info{
		margin-top:10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.browse-number{
			font-size: 14px;
			color: #666;
		}
		.status{
			height:26px;
			line-height: 26px;
			padding:0 5px;
			border-radius: 2px;
			color: #fff;
			background-color: #b1b5bf;
		}
	}
	.publish-datetime{
		margin-top: 10px;
		.desc{
			margin-top: 2px;
			color: #333;
		}
	}
}
.content-wrap{
	font-size: 15px;
	color:#333;
	line-height: 28px;
	min-height: 300px;
}

.content-panel {
	margin-top: 15px;
	display: flex;
	align-items: center;
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
		max-width: 85% !important;
		height: auto !important;
		margin: 5px auto;
	}
}

.comment-list{
	margin-top: 10px;
}

.comment-wrap{
	padding:10px;
	border: 1px solid #f3f3f3;
	margin-bottom: 10px;
	&:last-child{
		margin-bottom: 0;
	}
	.comment-header{
		display: flex;
		align-items: center;
		.header-tx{
			margin-right: 10px;
			width:36px;
			height: 36px;
			border-radius: 50%;
			background-color: #ccc;
			::v-deep .tx-img{
				div{
					border-radius: 50%;
				}
			}
		}
		.info{
			.name{
				font-weight: 600;
			}
			.datetime{
				font-size: 12px;
				color: #8e8e8e;
			}
		}
	}
	.content{
		margin-top: 6px;
		font-size: 15px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 5;
	}
}

.reply-wrap{
	.reply-title{
		margin-top: 10px;
		display: flex;
		align-items: center;
		.reply-da{
			width: 21px;
			height: 21px;
			color: #fff;
			text-align: center;
			background: #dc362b;
			border-radius: 3px;
			margin-right: 5px;
		}
		.reply-name{
			color: #757678;
		}
	}
	.reply-content{
		margin-top: 5px;
		color: #757678;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2;
	}
}
</style>
