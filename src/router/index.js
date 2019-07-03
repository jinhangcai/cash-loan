import Vue from 'vue'
import Router from 'vue-router'
const main = r => require.ensure([], () => r(require('../pages/main.vue')), 'main')
const index = r => require.ensure([], () => r(require('../pages/index/index.vue')), 'index')
const my = r => require.ensure([], () => r(require('../pages/my')), 'my')
const repay = r => require.ensure([], () => r(require('../pages/repay/index.vue')), 'repay')
const repayDetail = r => require.ensure([], () => r(require('../pages/repay/detail.vue')), 'repayDetail')
const repayMent = r => require.ensure([], () => r(require('../pages/repay/repayment.vue')), 'repayment')
const repaySuccess = r => require.ensure([], () => r(require('../pages/repay/success.vue')), 'repaySuccess')
const loan = r => require.ensure([], () => r(require('../pages/loan/index.vue')), 'loan')
const loanDetail = r => require.ensure([], () => r(require('../pages/loan/detail.vue')), 'loanDetail')
const loanRecord = r => require.ensure([], () => r(require('../pages/loan/index.vue')), 'loanRecord')
const loanList = r => require.ensure([], () => r(require('../pages/loan/list.vue')), 'loanList')
const cashDetail = r => require.ensure([], () => r(require('../pages/loan/cash.vue')), 'cashDetail')
const memb = r => require.ensure([], () => r(require('../pages/memb/index.vue')), 'memb')
const auth = r => require.ensure([], () => r(require('../pages/memb/auth.vue')), 'auth')
const profile = r => require.ensure([], () => r(require('../pages/memb/profile.vue')), 'profile')
const base = r => require.ensure([], () => r(require('../pages/memb/base.vue')), 'base')
const info = r => require.ensure([], () => r(require('../pages/memb/info.vue')), 'membInfo')
const faxian = r => require.ensure([], () => r(require('../pages/memb/faxian.vue')), 'membfaxian')
const identity = r => require.ensure([], () => r(require('../pages/memb/identity.vue')), 'membIdentity')
const linkman = r => require.ensure([], () => r(require('../pages/memb/linkman.vue')), 'membLinkman')
const mobile = r => require.ensure([], () => r(require('../pages/memb/mobile.vue')), 'membMobile')
const bank = r => require.ensure([], () => r(require('../pages/memb/bank.vue')), 'membBank')
const feedback = r => require.ensure([], () => r(require('../pages/memb/feedback.vue')), 'membFeedback')
const feedbackList = r => require.ensure([], () => r(require('../pages/memb/feedback-list.vue')), 'membFeedbackList')
const feedbackDetails = r => require.ensure([], () => r(require('../pages/memb/feedback-details.vue')), 'membFeedbackDetails')
const about = r => require.ensure([], () => r(require('../pages/simple/about')), 'about')
const agreement = r => require.ensure([], () => r(require('../pages/simple/agreement')), 'agreement')
const rate = r => require.ensure([], () => r(require('../pages/simple/rate')), 'rate')
const login = r => require.ensure([], () => r(require('../pages/login/index')), 'login')
const contract = r => require.ensure([], () => r(require('../pages/simple/register')), 'contract')
const landpage = r => require.ensure([], () => r(require('../pages/simple/landpage')), 'landpage')
const landpageThird = r => require.ensure([], () => r(require('../pages/simple/landpage-third')), 'landpage-third')
const demo = r => require.ensure([], () => r(require('../pages/demo/')), 'demo')
const mobileSuccess = r => require.ensure([], () => r(require('../pages/memb/mobile-success.vue')), 'mobile-success')


Vue.use(Router)

const $appName = '东坡肉'
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        hideHeader: true,
        cssNames: 'gray',
        title: '首页'
      }
    }, {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        hideHeader: true,
        cssNames: 'gray',
        title: '首页'
      }
    }, {
      path: '/my',
      name: 'my',
      component: my,
      meta: {
        hideHeader: true,
        cssNames: 'gray',
        title: $appName
      }
    },{
      path: '/set',
      name: 'set',
      meta: {
        title: '设置'
      },
      component: resolve => require(['../pages/my/set.vue'], resolve)
    },{
      path: '/loan/record',
      name: 'loanRecord',
      meta: {
        cssNames: 'gray',
        title: '借款记录'
      },
      component: loanRecord
    },{
      path: '/memb/info',
      name: 'info',
      meta:{
        hideHeader: true,
        title: '完善资料'
      },
      component: info
    },{
      path: '/memb/faxian',
      name: 'faxian',
      meta:{
        hideHeader: true,
        title: '发现'
      },
      component: faxian
    },{
      path: '/my/news',
      name: 'news',
      meta:{
        title: '常见问题'
      },
      component: resolve => require(['../pages/my/news.vue'], resolve)
    },{
      path: '/my/coupon',
      name: 'coupon',
      meta:{
        title: '优惠券'
      },
      component: resolve => require(['../pages/my/coupon.vue'], resolve)
    },
    {
      path: '/repaymenu',
      name: 'repaymenu',
      meta: {
        hideHeader: true,
        title: '还款'
      },
      component: resolve => require(['../pages/repay/repaymenu.vue'], resolve)
    },
    {
      path: '/demo',
      name: 'demo',
      meta: {

        title: 'demo'
      },
      component: demo
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        hideHeader: true,
        title: '登录'
      },
      component: login
    },
    {
      path: '/repay',
      name: 'index',
      meta: {
        hideHeader: true,
        cssNames: 'gray',
        title: '待还款'
      },
      component: repay
    },
    {
      path: '/repay/detail',
      name: 'repayDetail',
      meta: {

        cssNames: 'gray',
        title: '还款详情'
      },
      component: repayDetail
    },
    {
      path: '/repay/success',
      name: 'repaySuccess',
      meta: {
        hideHeader: true,
        title: '还款成功'
      },
      component: repaySuccess
    },
    {
      path: '/repayment',
      name: 'repayment',
      meta: {
        // hideHeader: false,
        // hideStatusHeader: true,
        // webviewIndex: 1,
        cssNames: 'gray',
        title: '还款'
      },
      component: repayMent
    },
    {
      path: '/loan',
      name: 'index',
      meta: {
        // title: '借款订单'
        title: '提现记录'
      },
      component: loan
    },
    {
      path: '/loan/detail',
      name: 'loanDetail',
      meta: {
        cssNames: 'gray',
        title: '借款详情'
      },
      component: loanDetail
    },
    {
      path: '/loan/cash',
      name: 'cash',
      meta: {
        cssNames: 'gray',
        title: '我要借款'
      },
      component: cashDetail
    },{
      path: '/loan/yys-cash',
      name: 'yyscash',
      meta: {
        cssNames: 'gray',
        title: '我要借款'
      },
      component: resolve => require(['../pages/loan/yys-cash.vue'], resolve)
    },
    {
      path: '/loan/list',
      name: 'loadList',
      meta: {
        title: 'demo'
      },
      component: loanList
    },
    {
      path: '/memb',
      name: 'memb',
      meta: {
        title: '个人中心'
      },
      component: memb
    },
    {
      path: '/auth',
      name: 'auth',
      meta: {
        title: '资料认证'
      },
      component: auth
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        title: '身份认证'
      },
      component: profile
    },
    {
      path: '/memb/base',
      name: 'base',
      meta: {
        title: '基础信息'
      },
      component: base
    },
    {
      path: '/memb/linkman',
      name: '紧急联系人',
      meta: {
        title: '紧急联系人'
      },
      component: linkman
    },
    {
      path: '/memb/mobile',
      name: '运营商',
      meta: {
        hideHeader: true,
        title: '运营商'
      },
      component: mobile
    },
    {
      path: '/memb/identity',
      name: 'identity',
      meta: {
        title: '身份认证'
      },
      component: identity
    },
    {
      path: '/memb/bank',
      name: 'bank',
      meta: {
        title: '银行卡认证'
      },
      component: bank
    },
    {
      path: '/memb/feedback',
      name: 'feedback',
      meta: {
        title: '用户反馈'
      },
      component: feedback
    },
    {
      path: '/memb/feedback/list',
      name: 'feedback',
      meta: {
        title: '反馈列表'
      },
      component: feedbackList
    },
    {
      path: '/memb/feedback/details',
      name: 'feedback',
      meta: {
        title: '反馈详情'
      },
      component: feedbackDetails
    },
    {
      path: '/memb/my/bank',
      name: 'mybank',
      meta: {
        title: '我的银行卡'
      },
      component: resolve => require(['../pages/memb/my-bank.vue'], resolve)
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        needLogin: 0,
        title: '关于我们'
      },
      component: about
    },
    {
      path: '/agreement',
      name: 'agreement',
      meta: {
        needLogin: 0,
        title: '借款协议'
      },
      component: agreement
    },{
      path: '/agreement2',
      name: 'agreement2',
      meta: {
        needLogin: 0,
        title: '借款协议'
      },
      component: resolve => require(['../pages/simple/agreement2/index.vue'], resolve)
    },
    {
      path: '/contract',
      name: 'contract',
      meta: {
        needLogin: 0,
        webviewIndex: 1,
        title: '注册协议'
      },
      component: contract
    },
    {
      path: '/rate',
      name: 'rate',
      meta: {
        title: '费率'
      },
      component: rate
    },
    {
      path: '/landpage',
      name: 'landpage',
      meta: {
        hideHeader: true,
        title: '落地页'
      },
      component: landpage
    },
    {
      path: '/landpage-third',
      alias: [
        '/landpage-third-b' // 某个失去备注的版本，类似不同渠道的作用
      ],
      name: 'landpage-third',
      meta: {
        hideHeader: true,
        title: $appName // 落地页
      },
      component: landpageThird
    },
    {
      path: '/mobile-success',
      name: 'mobile-success',
      meta: {
        hideHeader: true,
        title: '返回中'
      },
      component: mobileSuccess
    },
    {
      path: '/maintain',
      name: 'maintain',
      meta: {
        hideHeader: true,
        title: '系统维护'
      },
      component: resolve => require(['../pages/simple/maintain.vue'], resolve)
    }
  ]
})
import store from '../store'
import { resolve } from 'url';

router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0)
  store.state.title = to.meta.title;
  store.state.hideHeader = to.meta.hideHeader;
  document.title = to.meta.title
  store.state.webviewIndex = to.meta.webviewIndex;
  console.log('meta.needLogin', to.meta.needLogin, to.meta.needLogin !== 0, to.meta.needLogin === undefined)
  store.dispatch('setNeedLogin', to.meta.needLogin !== 0 || to.meta.needLogin === undefined)
  console.log('to.meta.hideStatusHeader', to.meta.hideStatusHeader === true)
  store.dispatch('hideStatusHeader', to.meta.hideStatusHeader === true)

  if (to.meta.cssNames === 'gray') {
    document.body.className = 'change'
  } else {
    document.body.className = 'unchange';
  }

  next()
})

export default router
