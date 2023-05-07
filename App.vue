<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}
	/* #endif */
	
	uni-image{
		width:100%;
		height: 100%;
	}
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	uni-page-body{
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.container-page {
		display: flex;
		flex-direction: column;
		flex:1;
		padding: 0;
		font-size: 14px;
		background-color: white;
		overflow-y: hidden;
	}
	.flex-full-column{
		display: flex;
		flex-direction: column;
		flex:1;
	}
	.flex-column{
		display: flex;
		flex-direction: column;
	}
	.uni-nav-bar-text{
		span{
			font-size: 16px;
			font-weight: 600;
		}
	}
</style>
