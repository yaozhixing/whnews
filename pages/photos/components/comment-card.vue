<template>
	<view class="comment-list-item">
		<!-- 头像 -->
		<view class="header-tx">
			<image class="tx-img" width="24" height="24" :src="commentInfoData.headPic" mode="aspectFill"></image>
		</view>
		<view class="comment-right-row">
			<view class="info">
				<view class="name">{{commentInfoData.fromName}}</view>
				<view class="love" @click="checkLoginToken">
					<uni-icons class="uni-love" type="hand-up" size="24"></uni-icons> 赞
				</view>
			</view>
			<view class="content" v-html="commentInfoData.commentContent"></view>
			<view class="datetime-repaly">
				<text class="datetime">{{commentInfoData.createTime}}</text>
				<text class="repaly-button">回复 
					<template v-if="commentInfoData.replyCount">{{commentInfoData.replyCount}}</template>
				</text>
			</view>
			<view class="replay-list" v-if="commentInfoData.replyCount">
				<view class="comment-item" v-for="replay in commentInfoData.sonList" :key="replay.id">
					<text class="name">{{replay.nickName}}：</text>
					<text class="content" v-html="replay.commentContent"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { CheckLogin } from '@/mixins/check-login.js'
	export default {
		name: 'CommentCard',
		
		mixins: [CheckLogin],
		
		data(){
			return{
				commentInfoData: {
					fromName:'',
					logoUrl:'',
					commentContent:'',
					id:'',
					replyCount:0,
					sonList:[],
					createTime:''
				}
			}
		},
		
		props:{
			commentInfo:{
				required:true,
				type: Object
			},
		},
		
		watch:{
			commentInfo:{
				handler(newValue){
					this.commentInfoData = newValue
				},
				immediate:true,
				deep:true
			}
		},
		
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
.comment-list-item{
	display: flex;
	+ .comment-list-item{
		margin-top: 10px;
	}
}

.header-tx{
	width: 24px;
	height: 24px;
	border-radius: 50%;
	margin-right: 10px;
	background-color: #ccc;
	::v-deep .tx-img{
		div{
			border-radius: 50%;
		}
	}
}
.comment-right-row{
	flex:1;
	.info{
		display: flex;
		.name{
			flex:1;
			display: flex;
			align-items: center;
			font-weight: 600;
			color: #666;
		}
		.love{
			display: flex;
			align-items: center;
			.uni-love{
				margin-right:3px;
			}
		}
	}
	.content{
		margin-top: 5px;
	}
	.datetime-repaly{
		margin-top: 5px;
		.datetime{
			color: #999;
		}
		.repaly-button{
			margin-left: 5px;
		}
	}
	.replay-list{
		margin-top: 5px;
		padding:5px 10px;
		border-radius: 3px;
		background: #f4f5f7;
		.name{
			color: #999;
		}
	}
}
</style>