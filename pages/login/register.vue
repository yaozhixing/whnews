
<template>
	<view class="content-page flex-full-column">
		<uni-nav-bar left-icon="left" title="注册" @clickLeft="back" />
		
		<view class="flex-full-column main-page">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item name="phone" class="login-input" label="用户名" required>
					<uni-easyinput type="text" v-model="formData.phone" placeholder="请输入用户名" />
				</uni-forms-item>
				<uni-forms-item name="password" class="login-input" label="密码" required>
					<input class="uni-input" v-model="formData.password" placeholder="请输入密码" :password="passwordEye" />
					<uni-icons type="eye" size="22" @click="clickEye"></uni-icons>
				</uni-forms-item>
			</uni-forms>
			<button type="default" class="primary" @click="submit">注 册</button>
		</view>
	</view>
</template>

<script>
	import { register } from '@/api/login.js'
	export default {
		name: 'Register',
		
		data() {
			return { 
				formData: {
					phone: '',
					password: '',
				},
				passwordEye : true,
				
				rules: {
					phone: {
						rules: [{
							required: true,
							errorMessage: '请输入账户',
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入密码',
						}]
					}
				}
			};
		},
			
		methods:{
			back(){
				uni.navigateBack()
			},
			
			clickEye: function() {
				this.passwordEye = !this.passwordEye;
			},
			
			submit() {
				this.$refs.form.validate().then(res=>{
					console.log('表单数据信息1：', res);
					this.toRegister()
					
				}).catch(err =>{
					console.log('表单错误信息2：', err);
				})
			},
			
			async toRegister(){
				try{
					const { data: { data:result } } = await register({...this.formData})
					if(result){
						uni.showToast({
						    title: '注册成功！',
						    icon: 'none',
						    duration: 2000
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/ucenter/ucenter'
							})
						},2000)
					}
				}catch(error){
					console.log(error)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.primary{
	width: 100%;
	display: flex;
	justify-content: center;
	background-color: rgb(237, 38, 38);
	color: #fff;
	font-size: 16px;
}
.main-page{
	padding:20px;
	background-color: white;
}
.login-input{
	.uni-input{
		position: relative;
		display: block;
		height: 100%;
		opacity: 1;
		border: 1px solid rgb(229, 229, 229);
		border-radius: 4px;
		padding-left:10px;
		color: #333;
		font-size: 12px;
	}
	.uniui-eye{
		color:#666 !important;
		position: absolute;
		top:8px;
		right:8px;
	}
	::v-deep .uni-forms-item__label{
		width: 68px !important;
		font-size: 12px !important;
	}
}
</style>