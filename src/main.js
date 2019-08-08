import Vue from 'vue'
// import FastClick from 'fastclick'

// FastClick.attach(document.body)
import router from './router'
import './font/iconfont.css'

import store from './store'
import http from './utils/http'
import web2app from './service/web2app'
import BScroll from 'better-scroll';
import  qs from 'qs'
import axios from 'axios'
import utils from './utils/index'

//
axios.defaults.baseURL = native.isTest ? '/web' : `${window.location.protocol}//${window.location.host}`


Vue.config.productionTip = false;
Vue.prototype.$web2app = web2app;
Vue.prototype.$http = http;

Vue.prototype.$axios = axios; // 无需加密接口
Vue.prototype.$qs = qs; // 无需加密接口
Vue.prototype.$utils = utils

Vue.prototype.$BScroll = BScroll;
Vue.prototype.$appName = '弱水三千';
Vue.prototype.$isMashangjiebei = window.navigator.userAgent.indexOf('Zuyu_IOS_Mashangjiebei')

import {AlertPlugin, ConfirmPlugin, ToastPlugin, LoadingPlugin} from 'vux'

Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);

try {
  if (localStorage.needRefresh) {
    delete localStorage.needRefresh
    location.reload()
  }
} catch (e) {

}

Vue.prototype.$tips = function (msg) {
  this.$vux.alert.show({
    title: ' 温馨提示',
    content: msg,
    onShow() {
      // console.log('Plugin: I\'m showing')
    },
    onHide() {
      // alert(111)
      if (msg === '请先登录') {
        web2app('openAppPage', {
          name: 'login'
        });
      }
      // console.log('Plugin: I\'m hiding')
    }
  })
}
import './entries'
import getSystemInfo from './service/getSystemInfo'


/* eslint-disable no-new */
getSystemInfo(() => {
  Vue.prototype.native = native;
  console.log('getSystemInfo-callback')

  var App = require('./App')
  if (!App.name) App = App.default
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
  })

})
