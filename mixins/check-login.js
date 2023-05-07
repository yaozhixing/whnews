export const CheckLogin = {
	data () {
	  return {}
	},
	
	created () {
	  
	},
	
	methods: {
		checkLoginToken(){
			if(!uni.getStorageSync('token')){
				uni.showModal({
					title: '提示',
					content: '您还未登录，需要登录吗？',
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login',
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			} else {
				uni.showToast({
					icon:'none',
					title: '请下载武汉新闻网APP',
					duration: 2000
				})
			}
		}
	}
}