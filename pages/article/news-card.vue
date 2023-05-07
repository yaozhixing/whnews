<template>
	<view class="news-card" :class="{
		'news-card-no': coverType === 3,
		'news-card-one': coverType === 0,
		'news-card-large': coverType === 2,
		'news-card-three': coverType === 1,
		}" @click="clickNews">
		<!-- 3 无图片，纯文字 -->
		<template v-if="coverType === 3">
			<view class="news-header">
				<view class="title">{{title || ''}}</view>
				<view class="infor">
					<view class="top-tag" v-if="isTop">置顶</view>
					<view class="theme-tag" v-if="sourceType === 4">专题</view>
					<view class="infor-source">{{fromName || sourceTypeName}}</view>
					<view class="infor-datetime">{{publishTimeFormat}}</view>
				</view>
			</view>
		</template>
		
		<!-- 3 布局：右侧1张图和右侧 -->
		<template v-else-if="coverType === 0">
			<view class="news-header">
				<view class="title">{{title || ''}}</view>
				<view class="infor">
					<view class="top-tag" v-if="isTop">置顶</view>
					<view class="theme-tag" v-if="sourceType === 4">专题</view>
					<view class="infor-source">{{fromName || sourceTypeName}}</view>
					<view class="infor-datetime">{{publishTimeFormat}}</view>
				</view>
			</view>
			<view class="image-right bg-color-grey" v-if="coverUrls.length">
				<view class="video-play-button"  v-if="[1, 2].includes(sourceType)"></view>
				<view class="question-status" v-if="sourceType === 9">
					{{activityStatusStr}}
				</view>
				<image class="image-right-srouce" :src="coverUrls[0]" mode="aspectFill" :alt="title"></image>
			</view>
		</template>
		
		<!-- 2 布局：下面1张图 -->
		<template v-else-if="coverType === 2">
			<view class="title">{{title || ''}}</view>
			<view class="large-image bg-color-grey">
				<view class="video-play-button"  v-if="[1, 2].includes(sourceType)"></view>
				<view class="question-status" v-if="sourceType === 9">
					{{activityStatusStr}}
				</view>
				<image style="width:100%" :src="coverUrls[0]" mode="aspectFill" :alt="title"></image>
			</view>
			<view class="infor">
				<view class="top-tag" v-if="isTop">置顶</view>
				<view class="theme-tag" v-if="sourceType === 4">专题</view>
				{{fromName || sourceTypeName}} {{publishTimeFormat}}
			</view>
		</template>
		
		<!-- 1 布局：下面3张图 -->
		<template v-else-if="coverType === 1">
			<view class="title">{{title || ''}}</view>
			<view class="image-three">
				<view class="image-item bg-color-grey" v-for="(item, index) in coverUrls" :key="index">
					<image :src="item" mode="aspectFill" :alt="title"></image>
				</view>
			</view>
			<view class="infor">
				<view class="top-tag" v-if="isTop">置顶</view>
				<view class="theme-tag" v-if="sourceType === 4">专题</view>
				{{fromName || sourceTypeName}} {{publishTimeFormat}}
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		name: 'NewsCard',
		
		props:{
			newsId:{
				required: true,
				type: Number,
				default: 2339970
			},
			coverType:{
				required: true,
				type: Number,
				default: 0
			},
			sourceType:{
				required: true,
				type: Number,
				default: 0
			},
			sourceTypeName:{
				type: String,
				default: ''
			},
			title:{
				required: true,
				type: String,
				default: ''
			},
			coverUrls:{
				required: true,
				type: Array,
			},
			fromName:{
				required: true,
				type: String,
				default: ''
			},
			publishTimeFormat:{
				required: true,
				type: String,
				default: ''
			},
			isTop:{
				required: true,
				type: Number,
				default: 0
			},
			activityStatusStr:{ // 在线问答-已结束
				type: String,
				default: ''
			}
		},
		
		data(){
			return {
				
			}
		},
		
		methods:{
			clickNews(){
				this.$emit('click-news')
			}
		}
	}
</script>

<style lang="scss" scoped>
.bg-color-grey{
	background-color: #ddd;
}
.news-card{
	display: flex;
	box-sizing: border-box;
	border-bottom: 1px solid #f4f4f4;
	padding: 14px 0;
	
	.title{
		font-size: 17px;
		line-height: 28px;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
	}
	.infor{
		display: flex;
		align-items: center;
		font-size: 12px;
		color: #8e8e8e;
		.top-tag{
			color:rgb(173, 39, 45);
			margin-right: 8px;
		}
		.theme-tag{
		    border: 1px solid #ccc;
			line-height: 20px;
		    padding: 0 5px;
		    border-radius: 2px;
			margin-right: 8px;
		}
		.infor-source{
			max-width: 48%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin-right: 2%;
		}
	}
	.image-right{
		width: 120px;
		height:90px;
		border-radius: 4px;
		overflow: hidden;
		position: relative;
		.image-right-srouce{
			width: 120px;
			height:90px;
		}
	}
	.image-three {
		margin: 10px 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.image-item{
			flex:1;
			height: 90px;
			border-radius: 4px;
			overflow: hidden;
			& + .image-item{
				margin-left:10px;
			}
		}
	}
	.large-image{
		margin: 10px 0;
		height: 180px;
		border-radius: 4px;
		overflow: hidden;
		position: relative;
	}
	.question-status{
		position: absolute;
		top:6px;
		left:6px;
		padding:0 5px;
		line-height: 24px;
		height: 24px;
		border-radius: 3px;
		color: #fff;
		background: #b1b5bf;
		font-size: 12px;
		z-index: 5;
	}
}
.news-card-one{
	.news-header{
		max-width: 62%;
		flex: 1;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		margin-right: 10px;
	}
}
.news-card-three,.news-card-large{
	flex-direction: column;
}
.video-play-button{
	position: absolute;
	top:50%;
	left:50%;
	width: 0;
	height: 0;
	border-left: 20px solid white;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	margin-left: -8px;
	margin-top: -8px;
	z-index: 2;
}
</style>