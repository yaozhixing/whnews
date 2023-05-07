const app = getApp()

// 设备信息
const systemInfo = uni.getSystemInfoSync()
const { model, system, screenWidth, screenHeight, platform: phonePlatform } = systemInfo

// 尺寸
const resolution = (systemInfo?.screenWidth || 0) + 'x' + (systemInfo?.screenHeight || 0)

// 平台
const platform = process.env.VUE_APP_PLATFORM?.toUpperCase().replace('-', '') || 'MPWEIXIN'

// 小程序 openid
const openid = app?.globalData?.openid

export default {
  screenWidth, // 长
  screenHeight, // 宽
  resolution, // 设备长宽，例：414x736
  platform, // 微信平台
  model, // 设备型号, 例：iphone6
  system, // 操作系统版本，例：iOS 10.0.1
  phonePlatform, // 手机客户端平台 例：ios、android、mac（3.1.10+）、windows（3.1.10+）、linux（3.1.10+）
  openid  // 小程序oppenid
}
