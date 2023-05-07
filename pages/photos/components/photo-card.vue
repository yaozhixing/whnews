<template>
	<view class="photo-card">
		<!-- 头像、姓名 -->
		<view class="photo-header" @click="onPhotoCard(photoInfoData)">
			<view class="header-tx">
				<image class="tx-img" width="36" height="36" :src="photoInfoData.logoUrl || require('@/static/avatar.png')" mode="aspectFill"></image>
			</view>
			<view class="info">
				<view class="name">
					{{photoInfoData.fromName}}
					<view class="weitoutiao-tag" v-if="photoInfoData.sourceType === 12">
						<image class="tx-img" width="52" height="15" :src="require('@/static/weitoutiao-tag.jpg')" mode="aspectFill"></image>
					</view>
				</view>
				<view class="datetime">{{photoInfoData.publishTimeFormat}}</view>
			</view>
		</view>
		<!-- 话题、标题 -->
		<view class="photo-title" @click="onPhotoCard(photoInfoData)">
			<text class="tork" v-if="photoInfoData.subjectsOfFollow && photoInfoData.subjectsOfFollow.length">#{{photoInfoData.subjectsOfFollow[0].subjectName}}#</text>
			<text>{{photoInfoData.title}}</text>
		</view>
		<!-- 图片 -->
		<view class="photo-group" @click="onPhotoCard(photoInfoData)">
			<view class="image-item" 
				:class="{'large-image-item': photoInfoData.coverUrls && photoInfoData.coverUrls.length <= 1}"
				v-for="(item, index) in coverUrls"
				:key="index"
			>
				<image class="photo-it" :src="item" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 评论 -->
		<view class="commentList" v-if="photoInfoData.commentList && photoInfoData.commentList.lenth">
			<view 
				class="comment-row" 
				v-for="comment in photoInfoData.commentList" 
				:key="comment.id"
			>
				<text class="name">{{comment.nickName}}</text>
				<text class="content">{{comment.commentContent}}</text>
			</view>
		</view>
		<!-- 点击、转发等 -->
		<view class="photo-activity">
			<view class="item views" @click="onPhotoCard(photoInfoData)">{{photoInfoData.browseNum || '读'}}</view>
			<view class="item praise" @click="checkLoginToken">{{photoInfoData.collectNum || '赞'}}</view>
			<view class="item retransmission" @click="checkLoginToken">{{photoInfoData.shareNum || '转'}}</view>
			<view class="item comment" @click="checkLoginToken">{{photoInfoData.commentNum || '评'}}</view>
		</view>
	</view>
</template>

<script>
	import { CheckLogin } from '@/mixins/check-login.js'
	import { getContentRouter } from '@/utils/to-news.js'
	export default {
		name: 'PhotoCard',
		
		mixins: [CheckLogin],
		
		props:{
			photoInfo:{
				required:true,
				type: Object
			}
		},
		
		data() {
			return {
				photoInfoData:{},
				coverUrls: []
			};
		},
		
		watch:{
			photoInfo:{
				handler(newValue){
					this.photoInfoData = newValue
					if(newValue.coverUrls?.length){
						this.coverUrls = newValue.coverUrls.slice(0,3)
					}
				},
				immediate:true,
				deep:true
			}
		},
		
		methods:{
			onPhotoCard(item){
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
	.photo-card{
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		border-bottom: 1px solid #f4f4f4;
		padding: 14px 0;
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
		.photo-title{
			display: flex;
			margin-top: 5px;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			overflow: hidden;
			-webkit-line-clamp: 4;
			text-indent: 2em;
			white-space: pre-wrap;
			.tork{
				color: #4e6382;
			}
		}
		.photo-group{
			margin-top: 10px;
			display: flex;
			// justify-content: space-between;
			flex-wrap: wrap;
			.image-item{
				// flex:1;
				max-width: 130px;
				width: calc(100%/3 - 5px);
				height: 84px;
				border-radius: 3px;
				overflow: hidden;
				background-color: #ddd;
				& + .image-item{
					margin-left:5px;
				}
			}
			.large-image-item{
				max-width: 200px;
				width: 200px;
				height: 160px;
			}
		}
		.photo-activity{
			margin-top: 10px;
			display: flex;
			align-items: center;
			.views{
				margin-left: 18px;
				background: url('../../../static/views.png') no-repeat;
			}
			.praise{
				background: url('../../../static/praise.png') no-repeat;
			}
			.retransmission{
				background: url('../../../static/retransmission.png') no-repeat;
			}
			.comment{
				background: url('../../../static/comment.png') no-repeat;
			}
			.item{
				flex:1;
				padding-left: 26px;
				background-size: 20px 20px;
			}
			
		}
	}
</style>