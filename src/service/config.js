export default {
  // '__SHANGHAIWEICHUANG_KUANYEBANG__web2app__'

  // '__SHANGHAIWEICHUANG_KUANYEBANG__app2web__'
  // '__SHANGHAIWEICHUANG_KUANYEBANG__app2web__'
  globalValPre: '__SHANGHAIWEICHUANG_KAIXINBT__', // '__SHANGHAIWEICHUANG_KUANYEBANG__', // '__SHANGHAIWEICHUANG_KAIXINBAITIAO__',

  globalValExt: '__',

  checkTestEnvRegExpArr: [],

  devApiUrlExt: 'kxbk/',

  apiResultStatusKey: 'status',
  apiResultStatusSuccessValue: 0,

  useEncryption: false,
  key: 'ZYZWUIEQIN11$^$*', // TODO 数据接口加密用的密钥（长度16）
  iv: 'ZYZWUIEQIN11$^$*', // TODO 数据接口加密用的密钥（长度16）
  getUserInfoApiUrl: 'user/info',
  getUserInfoCookieName: '',
  getUserInfoIdKey: '',
  devUserVid: '',

  getWeixinJSSDKConfigApiUrl: '',
  getWeixinJSSDKConfigRequestMethod: '',
  weixinJSSDKConfigJsApiList: [
    'checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
  ],

  getAppDownloadUrlApiUrl: '',

  isAudit: false,
}
