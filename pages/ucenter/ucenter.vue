<template>
	<view class="content-page ucenter-content-page">
		<view class="ucenter-header">
			<view class="header-top" @click="toLogin" v-if="!token">
				<view class="top-left">
					<view class="touxiang">
						<uni-icons type="contact-filled" color="#fff" size="80"></uni-icons>
					</view>
					<view class="title">登录/注册</view>
				</view>
				<view class="arrow">
					<uni-icons type="forward" color="#fff" size="20"></uni-icons>
				</view>
			</view>
			
			<view class="header-top" v-else>
				<view class="top-left">
					<view class="touxiang">
						<uni-icons type="contact-filled" color="#fff" size="80"></uni-icons>
					</view>
					<view class="title">{{phone}}</view>
				</view>
			</view>
		</view>
		
		<view class="ucenter-list">
			<!-- <uni-list class="list-wrap" :border="false">
				<uni-list-item title="地址管理" link :thumb="require('@/static/ucenter/my-address.png')"></uni-list-item>
				<uni-list-item title="问题与反馈" link :thumb="require('@/static/ucenter/feed-back.png')"></uni-list-item>
				<uni-list-item title="设置" link :thumb="require('@/static/ucenter/setting.png')"></uni-list-item>
				<uni-list-item title="最新消息" link></uni-list-item>
			</uni-list> -->
			
			<uni-list class="list-wrap" :border="false">
				<uni-list-item title="关于我们" link :thumb="require('@/static/ucenter/about-us.png')" to="/pages/ucenter/components/about-us"></uni-list-item>
				<uni-list-item title="设置" link :thumb="require('@/static/ucenter/setting.png')" to="/pages/ucenter/components/setting"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Ucenter',
		
		data() {
			return {
				token: '',
				phone:''
			}
		},
		
		// computed: {
		// 	userInfo(){
		// 		return this.$store.getters.userInfoData
		// 	}
		// },
		
		onShow() {
			this.token = uni.getStorageSync('token') || ''
			this.phone = uni.getStorageSync('phone') || ''
			// console.log('ucenter $store', this.$store)
		},
		
		methods: {
			toLogin(){
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.ucenter-header{
	height:180px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: url('~@/static/ucenter/main-bg.png') no-repeat;
	background-size: cover;
	.header-top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin:0 16px 0;
		.top-left{
			display: flex;
			align-items: center;
		}
		.touxiang{
			width:70px;
			height:70px;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(255, 255, 255, .2);
		}
		.title{
			font-size: 16px;
			color:#f1f1f1;
			margin-left:20px;
		}
	}
}

.ucenter-list{
	margin: 10px 0 0;
	display: flex;
	flex-direction: column;
	.list-wrap{
		border-radius: 12px;
		overflow: hidden;
	}
	.uni-list{
		margin-bottom: 10px;
	}
}



</style>
