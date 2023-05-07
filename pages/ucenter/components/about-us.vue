
<template>
	<view class="content-page flex-full-column">
		<uni-nav-bar left-icon="left" title="关于我们" @clickLeft="back" />
		
		<view class="flex-full-column main-page">
			<view class="logo">
				<image width="100" height="100" src="@/static/ucenter/logo.jpg" mode="aspectFill"></image>
			</view>
			<view class="content">
				<view class="pre">武汉新闻网是北京一点网聚科技有限公司推出的一款为兴趣而生、有机融合搜索和个性化推荐技术的兴趣引擎，团队致力于基于兴趣为用户提供私人定制的精准资讯，并成长为移动互联网时期一代内容分发平台。</view>
				<view class="pre">主要有时政新闻、财经资讯、社会热点、军事报道、家装设计、育儿常识、星座命理、出游旅行、野史探秘、太空探索、未解之谜、前沿科技资讯，探索未知新世界。</view>
				<!-- <view class="">2018年8月8日，武汉新闻网获金运奖运营新势力奖。 </view>
				<view class="">2018年9月29日，针对网络转载版权专项整治中发现的突出版权问题，国家版权局在京约谈了武汉新闻网，要求其进一步提高版权保护意识，切实加强版权制度建设，全面履行企业主体责任，规范网络转载版权秩序。</view>
				<view class="">2019年2月22日，凤凰卫视正式出售武汉新闻网股权。</view>
				<view class="">2020年8月10日，凤凰新媒体出售武汉新闻网股权。</view> -->
				<view class="pre">版本：V1.0.0</view>
				<!-- <view class="pre">网址：<text class="site">http://3g.cjn.cn/touch/</text></view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'AboutUs',
		
		data() {
			return { };
		},
		
		methods:{
			back(){
				uni.navigateBack() //默认delta:1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.logo{
		width:120px;
		height: 120px;
		border-radius: 5px;
		overflow: hidden;
	}
	.main-page{
		justify-content: center;
		align-items: center;
		background-color: white;
	}
	.content{
		margin: 40px 34px 0;
		color:#333;
		.pre{
			margin-bottom: 10px;
		}
		.site{
			color: steelblue;
			text-decoration: underline;
		}
	}
</style>