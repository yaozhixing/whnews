// 官方文档：https://www.hhyang.cn/v2/start/quickstart.html
import {RouterMount,createRouter} from 'uni-simple-router'
import { authRouterList } from './router/auth.js'
import store from './store'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});

//全局路由前置守卫
router.beforeEach(async (to, from, next) => {
	// 需要登录的页面
	if(authRouterList.includes(to.path)){
		if(uni.getStorageSync('token')){
			console.log("store 已有token");
			next();
		}else{
			console.log("请登录");
			next({
			  path: '/pages/login/login',
			  replace: true
			})
		}
	} else {
		next()
		// 不需要登录的页面
		// 刷新时，因为store丢失的原因，所以要用sotrage里的token，去请求账户信息
		// if(!store.getters.tokenData){
		// 	console.log('不需要登录的页面，token 为空')
			// store
			//   .dispatch('requestUserInfo')
			//   .then( result => {
			// 		next();
			//   }).catch(error => { 
			// 		if(error.message){
			// 			uni.showToast({
			// 				title: error.message,
			// 				duration: 2000
			// 			})
			// 			console.log("请登录");
			// 			next({
			// 			  path: '/pages/login/login',
			// 			  replace: true
			// 			})
			// 		}
			//   })
		// } else {
		//   console.log('不需要登录的页面，token 有值')
		  // if(!store.getters.tokenData){
			 //  store
			 //    .dispatch('requestUserInfo')
			 //    .then( result => {
			 //  		next();
			 //    }).catch(error => {
				// 	if(error.message){
				// 		uni.showToast({
				// 			title: error.message,
				// 			duration: 2000
				// 		})
				// 		console.log("请登录");
				// 		next({
				// 		  path: '/pages/login/login',
				// 		  replace: true
				// 		})
				// 	}
			 //    })
		  // } else {
			 //  next();
		  // }
		// }
	}
});

// 全局路由后置守卫
router.afterEach((to, from) => {
    // console.log('跳转结束')
})

export {
	router,
	RouterMount
}