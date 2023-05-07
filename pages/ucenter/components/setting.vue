
<template>
	<view class="content-page flex-full-column">
		<uni-nav-bar left-icon="left" title="设置" @clickLeft="back" />
		
		<view class="flex-full-column">
			<uni-list class="list-wrap" :border="false">
				<uni-list-item title="修改密码" link to="/pages/ucenter/components/modify-password"></uni-list-item>
			</uni-list>
			
			<uni-list class="list-wrap" :border="false">
				<uni-list-item title="清理缓存" link @click="clearStorage"></uni-list-item>
				<uni-list-item title="执照中心" link to="/pages/ucenter/components/license"></uni-list-item>
				<uni-list-item title="用户协议" link to="/pages/ucenter/components/protocol"></uni-list-item>
			</uni-list>
			
			<view class="login-out" @click="loginOut">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Setting',
		
		data() {
			return { };
		},
		
		methods:{
			back(){
				uni.navigateBack() // 默认delta:1
			},
			
			// 清理缓存
			clearStorage(){
				this.clearStorageData()
				uni.showToast({
				    title: '已清理缓存！',
				    icon: 'none',
				    duration: 1000
				})
			},
			
			// 退出登录
			loginOut(){
				this.clearStorageData()
				uni.showToast({
				    title: '已退出！',
				    icon: 'none',
				    duration: 1000
				})
				setTimeout(()=>{
					uni.switchTab({
						url:'/pages/ucenter/ucenter'
					})
				},1000)
			},
			
			clearStorageData(){
				try {
					uni.clearStorageSync();
				} catch (e) {
					console.log(e)
				}
			}
		}
	}
</script>

<style lang="scss">
.list-wrap{
	margin-bottom: 13px;
}
.login-out{
	color: orangered;
	padding:15px 18px;
	background-color: #fff;
	text-align: center;
	font-weight: 600;
}
</style>