<template>
	<view class="content-page ucenter-content-page">
		<view class="ucenter-header">
			<view class="header-top">
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
		</view>
		
		<uni-section class="ucenter-nav-order" title="">
			<uni-row class="point" :width="750" >
				<uni-col :span="12">
					<view class="point-nav-col">
						<view class="col-title">优惠券</view>
						<view class="col-number">0</view>
					</view>
				</uni-col>
				<uni-col :span="12">
					<view class="point-nav-col">
						<view class="col-title">足迹</view>
						<view class="col-number">0</view>
					</view>
				</uni-col>
			</uni-row>
			
			<view class="ucenter-menu">
				<uni-grid :column="4" :highlight="true" borderColor="#fff" @change="change">
					<uni-grid-item v-for="(item, index) in navList" :index="index" :key="index">
						<view class="grid-item-box" style="background-color: #fff;">
							<view class="item-img" :class="`bg${index+1}`">
								<image :src="item.url" mode="aspectFill"></image>
							</view>
							<text class="text">{{item.name}}</text>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
		</uni-section>
		
		<view class="ucenter-list">
			<uni-list class="list-wrap" :border="false">
				<uni-list-item title="地址管理" link :thumb="require('@/static/ucenter/my-address.png')"></uni-list-item>
				<uni-list-item title="问题与反馈" link :thumb="require('@/static/ucenter/feed-back.png')"></uni-list-item>
				<uni-list-item title="设置" link :thumb="require('@/static/ucenter/setting.png')"></uni-list-item>
				<!-- <uni-list-item title="最新消息" link></uni-list-item> -->
			</uni-list>
			
			<uni-list class="list-wrap" :border="false">
				<uni-list-item title="关于我们" link :thumb="require('@/static/ucenter/about-us.png')" about-us.png></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Ucenter',
		
		data() {
			return {
				navList: [{
					id:'my-order',
					name:'我的订单',
					url:'@/static/ucenter/my-order.png',
					routePath:'pages/ucenter/orders',
				},{
					id:'my-paid',
					name:'待付款',
					url:'@/static/ucenter/my-paid.png',
					routePath:'pages/ucenter/orders?status=waitePay',
				},{
					id:'my-receiving',
					name:'待收货',
					url:'@/static/ucenter/my-receiving.png',
					routePath:'pages/ucenter/orders?status=waiteRecied',
				},
				{
					id:'my-appraise',
					name:'待评价',
					url:'@/static/ucenter/my-appraise.png',
					routePath:'pages/ucenter/orders?status=waitePingjia',
				},
				{
					id:'my-refund',
					name:'售后',
					url:'@/static/ucenter/my-refund.png',
					routePath:'pages/ucenter/orders?status=waiteShouhou',
				}]
			}
		},
		methods: {
			change(value){
				console.log(value)
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

 .ucenter-nav-order{
	border-radius: 12px;
	overflow: hidden;
	margin: -30px 8px 0;
	::v-deep .uni-section-header{
		display: none;
	}
	.point{
		padding:15px 0px 0;
	}
	.point-nav-col{
		display: flex;
		flex-direction: column;
		align-items: center;
		.col-number{
			margin-top: 4px;
			color: #ff3c2a;
			font-size: 16px;
		}
	}
}

.ucenter-menu{
	display: flex;
	.uni-grid-item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100px !important;
	}
	::v-deep .uni-grid{
		flex-wrap: initial;
		border-radius: 6px;
		overflow: hidden;
		flex-wrap: nowrap;
	}
	.grid-item-box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex:1;
		.text{
			font-size: 12px;
			color:#666;
			margin-top:10px;
		}
		.item-img{
			display: flex;
			justify-content: center;
			align-items: center;
			width:32px;
			height: 32px;
			border-radius: 50%;
			&.bg1{
				background-color: #ff992f;
			}
			&.bg2{
				background-color: #009ee0;
			}
			&.bg3{
				background-color: #00d5d5;
			}
			&.bg4{
				background-color: #28ccb0;
			}
			&.bg5{
				background-color: #ff4a48;
			}
			uni-image{
				width: 50%;
				height: 50%;
			}
		}
	}
}

.ucenter-list{
	margin: 10px 10px 0;
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
