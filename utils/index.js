// 获取随机数
export const getRandom = (length) => {
  let res = ''
  const randomMap = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomMapLength = randomMap.length
  for (let j = 0; j < length; j++) {
    const randomNumber = Math.floor(Math.random() * (randomMapLength - 1)) + 1
    res += randomMap[randomNumber - 1]
  }
  return res
}