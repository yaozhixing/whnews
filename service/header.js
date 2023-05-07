const X_VERSION = 'v1.0.0'
const X_TIME = Date.now().toString()
import { getRandom } from '@/utils/index'
import systemInfo from '@/utils/system.js'
const { resolution, platform } = systemInfo

const getToken = ()=>{
	return uni.getStorageSync('token') || getRandom(16);
}

export const getCustomeHeader = () => {
	return {
		'x-platform': platform,
		'x-version': X_VERSION,
		'x-time': X_TIME,
		'x-resolution': resolution,
		'x-token': getToken(),
		'content-type': 'application/x-www-form-urlencoded',
	}
}