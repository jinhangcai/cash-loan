# 亚伟
repay 今日待还款、
repay/detail 还款详情、
loan 借款订单、
loan/detail 借款详情、
repayment 立即还款

# 志伟
index 主页、
findPwd 忘记密码
<!-- auth 认证资料(中海切图) -->
<!-- profile 个人资料认证 -->
<!-- sign 签字、 -->




# 文敏 切图 个人中心
linkman 联系人信息
info 完善资料
baseInfo 基础信息
login 登录、
<!-- register 注册、 -->

bank 银行卡
mobile 运营商 等待中、加载页、输入验证码、输入密码

# 中海 （切图）
<!-- auth 认证资料(中海切图) -->
<!-- profile 个人资料认证 -->
<!-- identity 身份认证  -->
agreement 借款合同、
about 关于我们、
注册落地页

## 流程
- 主页-完善资料额度有不同状态，
- 紧急联系人 获取手机通讯录拿到联系人手机号

## app交互示例
```
import web2app from '../native/web2app'
async function demo(cb){

   let data = await   web2app('getSystemInfo',{ callback: true })

    web2app('gotoFindPwd', {})
}
```
调用通讯录
let data = await this.$web2app('getTelBook',{ callback: true })
跳转找回密码
this.$web2app('openAppPage',{name:'findPwd'})

if(native.isApp){

 this.$web2app('setNivigate',{  })
 this.$web2app('openWebPage',{ useStatusBar: 1,url:'' })
}else{
  loca = url ;
}



## app接口
1、获取系统信息   ：   getSystemInfo


2、（新）设置导航栏 (控制原生导航栏是否显示)：  setNavigation      参数：{state : hidden / show，  title  ：标题}

3、新建窗口打开页面（不完整链接，前缀由原生拼接，h5只需传后缀即可）：openRoutePage



4、新建窗口打开页面（完整链接）：openWebPage


5、打开app界面  ： openAppPage    参数名（name : value）  (customer service 客服 )(resetPassword  重置密码)


6、调用原生返回上层界面：appback


7、改变原生webView的尺寸（ 界面显示大小 ， 全屏还是不是全屏）   ： changeWebViewFrame
8、找回密码 openFindPwd
this.$web2app('openFindPwd',{})
9、获取通讯录 getTelBook
this.$web2app('getTelBook',{callback:true})

## 问题
借款首页是哪个