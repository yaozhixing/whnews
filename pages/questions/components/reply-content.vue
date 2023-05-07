<template>
	<view class="container-page">
		<uni-nav-bar left-icon="left" title="在线问答" @clickLeft="back" />
		
		<view class="comment-wrap">
			<!-- 头部 -->
			<view class="comment-header">
				<view class="header-tx">
					<image class="tx-img" width="36" height="36" :src="questionReplay.questionerHeader || require('@/static/avatar.png')" mode="aspectFill"></image>
				</view>
				<view class="info">
					<view class="name">{{questionReplay.questionerName}}</view>
					<view class="datetime">{{questionReplay.publishTimeFormat}}</view>
				</view>
			</view>
			
			<!-- 问题 -->
			<view class="content">{{questionReplay.content}}</view>
			
			<!-- 回答列表 -->
			<view class="reply-list-wrap" v-if="questionReplay.ifReply">
				<!-- 标题 -->
				<view class="reply-item-wrap" v-for="replayItem in questionReplay.replyList" :key="replayItem.id">
					<view class="reply-title">
						<view class="reply-da">答</view>
						<view class="title-right">
							<view class="reply-name">{{replayItem.orgName}}</view>
							<view class="replay-datetime">
								{{replayItem.replyTime}}
							</view>
						</view>
					</view>
					<!-- 列表 -->
					<view class="reply-content">
						<view class="reply-item">
							{{replayItem.replyContent}}
						</view>
					</view>
				</view>
			</view>
			
			<!-- 底部-主题 -->
			<view class="reply-content-theme">
				<view class="theme-title">
					{{questionReplay.themeOnlineTitle}}
				</view>
				<view class="theme-content">
					<view class="header-tx-wrap">
						<view class="img-item" v-for="(item, index) in questionReplay.joinQuestionerHeaders.slice(0,3)" :key="index">
							<view class="header-tx" v-if="item">
								<image class="tx-img" width="18" height="18" :src="item || require('@/static/avatar.png')" mode="aspectFill"></image>
							</view>
						</view>
						<view class="more" v-if="questionReplay.joinQuestionerHeaders.length>3">...</view>
						<view class="join-questions">
							<text class="total">{{questionReplay.joinNum}}</text>位网友已提问
						</view>
					</view>
					<view class="discuss-button" @click="toQuestionDetail">进入讨论</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { getThemeQuestionDetail } from '@/api/questions.js'
	export default {
		name: 'ReplyContent',
		data(){
			return{
				questionId:'',
				questionReplay: {
					id: 0,
					informationId: 0,
					sourceId: 0,
					questionerName: "微信用户",
					questionerHeader: '',
					publishTimeFormat: "2023-10-01 10:00:00",
					content: "",
					ifReply: false,
					replyList: [],
					themeOnlineInfoId: 0,
					themeOnlineSourceType: 0,
					themeOnlineTitle: "",
					joinNum: 0,
					joinQuestionerHeaders: [],
				}
			}
		},
		
		onLoad(params) {
			if(params?.id){
				this.questionId = params.id
				this.requestData()
			}
		},
		
		methods:{
			back(){
				uni.navigateBack()
			},
			
			toQuestionDetail(){
				this.back()
			},
			
			async requestData(){
				try{
					const { data: { data:result } } = await getThemeQuestionDetail({
						id: this.questionId
					})
					if(!result){
						return
					}
					this.questionReplay = result
				}catch(e){
					console.log(e)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-wrap{
		padding:20px;
		margin-bottom: 10px;
		overflow-y:auto;
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
			font-size: 16px;
			line-height: 28px;
		}
	}
	
	.reply-item-wrap{
		.reply-title{
			margin-top: 20px;
			display: flex;
			.reply-da{
				margin-top: 3px;
				width: 28px;
				height: 28px;
				line-height: 26px;
				color: #fff;
				font-size: 16px;
				text-align: center;
				background: #dc362b;
				border-bottom-right-radius:10px;
				margin-right: 5px;
			}
			.title-right{
				flex:1;
				margin-left: 5px;
				font-size: 16px;
				.reply-name{
					color: #333;
				}
				.replay-datetime{
					color: #999;
				}
			}
		}
		.reply-content{
			margin-top: 20px;
			color: #333;
			.reply-item{
				font-size: 16px;
				line-height: 28px;
			}
		}
	}
	.theme-content{
		margin-top: 20px;
		display: flex;
		align-items: center;
		padding:10px;
		background-color: #f4f5f7;
		.header-tx-wrap{
			flex:1;
			display: flex;
			align-items: center;
			.header-tx{
				width:20px;
				height: 20px;
				::v-deep .tx-img{
					div{
						border-radius: 50%;
					}
				}
			}
			.more{
				width:20px;
				height: 20px;
				align-self: center;
				border: 1px solid #f3f3f3;
				border-radius: 50%;
				line-height: 9px;
				background-color: #dcddde;
				color: #fff;
				text-align: center;
				transform: translateX(-2px);
			}
			.join-questions{
				margin-left: 5px;
				font-size: 14px;
				color: #999;
				.total{
					color: #333;
				}
			}
		}
		.discuss-button{
			display: flex;
			align-items: center;
			justify-content: center;
			width:80px;
			height: 60px;
			font-size: 16px;
			color: #fff;
			background-color: #e1251b;
			border-radius: 6px;
		}
	}
</style>