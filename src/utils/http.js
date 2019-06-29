import axios from 'axios'
import Vue from 'vue'
import {AlertModule, ToastPlugin} from 'vux'
var Qs = require('qs');
import web2app from '../service/web2app'
import native from '../service/native'
const HOST = '//' + window.location.hostname + '/'
const BASE_URL = native.isTest ? '/web' : HOST // 'TODO 测试域名' : 'TODO 正式域名 '
Vue.use(ToastPlugin);
import { getAES, getDAes } from './crypto'

// 封装axios 创建基础实例以及axios拦截


const service = axios.create({
  timeout: 80000,
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
});
/**
 * request 拦截器
 */
service.interceptors.request.use(config => {

  // console.log(config)
   //native.vid = '54e5ce1f582a09c9e673b34a9b59303ae2b53d59'
  const extraParams = { vid: native.vid }
  if (!config.methods || config.methods.toLowerCase() === 'get') {
    // config.params = {
    //   data: Object.assign(
    //     {},
    //     extraParams,
    //     config.data || {}
    //   )
    // };
		// delete config['data'];
    config.params = {
      vid: native.vid,
      data: Object.assign(
				{},
				extraParams,
				config.data || {}
			)
    }
    delete config['data']
  }

  if (
    config.methods.toLowerCase() === 'post'
  ) {

    // config.data = {
    //   data: getAES(JSON.stringify(Object.assign(
    //     {},
    //     extraParams,
    //     config.data || {}
    //   )))
    // }
    config.data = getAES(JSON.stringify(Object.assign(
      {},
      extraParams,
      config.data || {}
    )))
    config.method = 'post'
    // config.data = Qs.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json'
    }
  }


  return config;
}, error => {
  Promise.reject(error);
  console.log(error);
});
/**
 * response 拦截器
 */
service.interceptors.response.use(
  response => {
    // 处理未登录情况
    if (response.data && response.data.status === 99) {

      AlertModule.show({
        content: '请先登录',
        onShow () {
        },
        async onHide () {
          console.log('拦截器-跳转登录')
          await web2app('logOut')
          web2app('openAppPage', {name: 'register'})
        }
      })
    } else if (response.data.status !== 0) {
      // 处理状态非0


      Vue.$vux.toast.show({
        type: 'warn',
        text: response.data.msg
      })
    }


    return response;
  },
  error => {
    // console.log('err',typeof error , service)
    Vue.$vux.toast.show({
      type: 'warn',
      text: '数据交互失败'
    })
    return Promise.reject(error);
  }
)
export default service;
