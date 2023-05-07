import { request } from '@/service/request.js'
import { testFix } from './prefix.js'

// 登录
export const login = (data) => request({
	url: testFix + '/login',
	method: 'POST',
	data,
})

// 登录
export const register = (data) => request({
	url: testFix + '/register',
	method: 'POST',
	data,
})

// 获取用户信息
export const getUserInfo = (data) => request({
	url: testFix + '/getUserInfo',
	method: 'POST',
	data,
})