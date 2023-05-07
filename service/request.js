import { getCustomeHeader } from './header.js'

export const request = (options) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: options.url,
            method: options.method || 'GET',
            header: {...getCustomeHeader()},
            data: options.data || {},
            dataType: 'json',
            success: (res) => {
                // console.log('res-->:', res)
                // 有其他用户登录
                // if (res.data.code == 10001) {
                //     uni.clearStorageSync('token');
                //     uni.navigateTo({
                //         url: '/pages/login/index'
                //     })
                // }
                // if (res.data.code !== 1) {
                //     return uni.showToast({
                //         title: res.data.msg,
                //         icon: 'error'
                //     });
                // }
                resolve(res);
            },
            fail: err => {
                reject(err);
            },
            catch: (e) => {
                console.log(e);
            }
        });
    });
};


export const requestGet = (url, parmas) => {
    return request({
        method: 'GET',
        url,
        data: parmas
    })
}

export const requestPost = (url, data) => {
    return request({
        method: 'POST',
        url,
        data
    })
}