export const getContentRouter = (sourceType) =>{
	switch (sourceType){
		// 文章
		case 0:
			return '/pages/article/article'
			break;
		// 小视频
		case 1:
		case 2:
			return '/pages/video/video'
			break;
		// 外链接
		case 3:
			return '/pages/article/article'
			break;
		// 专题
		case 4:
			return '/pages/theme/theme'
			break;
		// 在线问答
		case 9:
			return '/pages/questions/components/question-content'
			break;
		// 图集
		case 12:
			return '/pages/photos/components/photo-content'
			break;	
		// 直播
		case 14:
			return '/pages/photos/components/article'
			break;	
		default:
			return '/pages/article/article'
			break;
	}
}