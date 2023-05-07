
import { request } from '@/service/request.js'
import { testFix } from './prefix.js'

// 列表 online-question
export const queryOnlineQuestionPage = (data) => request({
	url: testFix + '/online-question/list',
	method: 'GET',
	data,
})

// 详情
export const getOnlineQuestionDetail = (data) => request({
	url: testFix + '/online-question/detail',
	method: 'GET',
	data,
})

// 评论
export const getQuestionComment = (data) => request({
	url: testFix + '/online-question/comment/list',
	method: 'GET',
	data,
})

// 获取评论列表
export const getThemeQuestionDetail = (data) => request({
	url: testFix + '/online-question/comment/detail',
	method: 'GET',
	data,
})
