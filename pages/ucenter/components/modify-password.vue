
<template>
	<view class="content-page flex-full-column">
		<uni-nav-bar left-icon="left" title="修改密码" @clickLeft="back" />
		
		<view class="flex-full-column main-page">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item name="oldPassword" class="password-input" label="原密码" required>
					<input class="uni-input" v-model="formData.oldPassword" placeholder="请输入原密码" :password="passwordEyeList.oldPassword" />
					<uni-icons type="eye" size="22" @click="clickEye('oldPassword')"></uni-icons>
				</uni-forms-item>
				<uni-forms-item name="newPassword" class="password-input" label="新密码" required>
					<input class="uni-input" v-model="formData.newPassword" placeholder="请输入新密码" :password="passwordEyeList.newPassword" />
					<uni-icons type="eye" size="22" @click="clickEye('newPassword')"></uni-icons>
				</uni-forms-item>
				<uni-forms-item name="againPassword" class="password-input" label="重复密码" required>
					<input class="uni-input" v-model="formData.againPassword" placeholder="请重复新密码" :password="passwordEyeList.againPassword" />
					<uni-icons type="eye" size="22" @click="clickEye('againPassword')"></uni-icons>
				</uni-forms-item>
			</uni-forms>
			<button type="default" class="primary" @click="submit">保 存</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ModifyPassword',
		
		data() {
			return { 
				formData: {
					oldPassword: '',
					newPassword: '',
					againPassword: '',
				},
				passwordEyeList: {
					oldPassword: true,
					newPassword: true,
					againPassword: true
				},
				
				rules: {
					oldPassword: {
						rules: [{
							required: true,
							errorMessage: '请填写原密码',
						}]
					},
					newPassword: {
						rules: [{
							required: true,
							errorMessage: '请填写新密码',
						}]
					},
					againPassword: {
						rules: [{
							required: true,
							errorMessage: '请填写重复密码',
						}]
					},
				}
			};
		},
			
		methods:{
			back(){
				uni.navigateBack()
			},
			
			clickEye: function(type) {
				this.passwordEyeList[type] = !this.passwordEyeList[type];
				console.log(this.passwordEyeList)
			},
			
			submit() {
				this.$refs.form.validate().then(res=>{
					console.log('表单数据信息1：', res);
					uni.showToast({
					    title: '修改成功！',
					    icon: 'none',
					    duration: 2000
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/ucenter/ucenter'
						})
					},2000)
				}).catch(err =>{
					console.log('表单错误信息2：', err);
				})
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
.password-input{
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