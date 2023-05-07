
<template>
	<view class="content-page flex-full-column">
		<uni-nav-bar left-icon="left" title="营业执照" @clickLeft="back" />
		
		<view class="main-page">
			营业执照照片
		</view>
	</view>
</template>

<script>
	export default {
		name: 'License',
		
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
		flex:1;
		justify-content: center;
		align-items: center;
		padding:20px;
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