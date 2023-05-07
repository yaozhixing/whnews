import { request } from '@/service/request.js'
import { testFix } from './prefix.js'

// 分类
export const getCategory = (data) => request({
	url: testFix + '/news/category',
	method: 'GET',
	data,
})

// 首页
export const getHomeList = (data) => request({
	url: testFix + '/news/recommend',
	method: 'GET',
	data,
})

// 列表
export const getNewsList = (data) => request({
	url: testFix + '/news/list',
	method: 'GET',
	data,
})

// 详情
export const getNewsDetail = (data) => request({
	url: testFix + '/news/detail',
	method: 'GET',
	data,
})

// 详情 - 评论
export const getCommentListNew = (data) => request({
	url: testFix + '/comment/getCommentListNew',
	method: 'GET',
	data,
})