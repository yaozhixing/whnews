import { login, getUserInfo } from '@/api/login.js'

const user = {
	namespace:true,
	
	state:{
		userInfo:{
			name:'',
			phone:'',
			token:''
		},
		token: uni.getStorageSync('token') || '',
		phone: uni.getStorageSync('phone') || ''
	},
	
	getters: {
		tokenData(state){
			return state.userInfo.token
		},
		
		userInfoData(state){
			console.log('state.userInfo',state.userInfo)
			return state.userInfo
		}
	},
	
	mutations:{
		setUserInfo(state, data){
			state.userInfo = data
			state.token = data.token
			state.phone = data.phone
			setUserInfoStorage(data)
			setTokenPhoneStorage(data)
			console.log('>>>>>>设置了用户信息，且已登录！<<<<<<')
		}
	},
	
	actions:{
		// 登录
		async requestLogin({ state, commit }, data){
			try{
				const result = await requestPwd(data)
				if(!state.userInfo.token){
					commit('setUserInfo', result)
				}
			} catch (error){
				console.log(error)
			}
		},
		
		// 请求用户信息
		async requestUserInfo({ state, commit }){
			try{
				const result = await requestUser(state)
				commit('setUserInfo', result)
			} catch (error){
				console.log(error)
			}
		},
	}
}

const requestPwd = async (data) => {
	return new Promise((resolve, reject)=>{
		login({...data}).then(response =>{
			const { data: { data:result } } = response
			if (result) {
			  resolve(result)
			} else {
			  reject(response)
			}
		}).catch((err) => {
			console.error('err:', err)
			reject(err)
		})
	})
}

const requestUser = async (state) => {
	return new Promise((resolve, reject)=>{
		getUserInfo({
			phone: state.phone,
			token: state.token
		}).then(response =>{
			const { data: { data:result } } = response
			if (result) {
			  resolve(result)
			} else {
			  reject(response)
			}
		}).catch((err) => {
			console.error('err:', err)
			reject(err)
		})
	})
}

const setUserInfoStorage = (data) => {
	try{
		uni.setStorageSync('userInfo', data)
	}catch(e){
		console.log(e)
	}
}

const setTokenPhoneStorage = (data) => {
	try{
		uni.setStorageSync('token', data.token)
		uni.setStorageSync('phone', data.phone)
	}catch(e){
		console.log(e)
	}
}

export default user