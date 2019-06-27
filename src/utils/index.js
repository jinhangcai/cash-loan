import config from '../service/config'

export default {
  // 身份证验证正则对象
  IDCardRegExp: (function () {
    const area = '[1-9]\\d{5}'
    const th = '(18|19|([23]\\d))' // 1800-2399
    const year = '\\d{2}'
    const month = '((0[1-9])|(10|11|12))'
    const day = '(([0-2][1-9])|10|20|30|31)' // 闰年不能禁止29+
    const order = '\\d{2}'
    const order3Digit = '\\d{3}'
    const check = '[0-9Xx]'
    const IDCard = area + year + month + day + order + check
    const IDCard18Digit = area + th + year + month + day + order3Digit + check
    return new RegExp('^(' + IDCard + '|' + IDCard18Digit + ')$')
  })(),

  // 访问终端环境信息
  browser: {
    versions: (function () {
      const u = navigator.userAgent
      return {
        trident: u.includes('Trident'), // IE内核
        presto: u.includes('Presto'), // opera内核
        webKit: u.includes('AppleWebKit'), // 苹果、谷歌内核
        gecko: u.includes('Gecko') && !u.includes('KHTML'), // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        // android: u.includes('Android') || u.includes('Adr'), // android终端
        android: u.includes('Android') || u.includes('Adr') || /windows/.test(u.toLowerCase()), // android终端
        iPhone: u.includes('iPhone'), // 是否为iPhone或者QQHD浏览器
        iPad: u.includes('iPad'), // 是否iPad
        webApp: !u.includes('Safari'), // 是否web应该程序，没有头部与底部
        weixin: u.includes('MicroMessenger'), // 是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) === ' qq' // 是否QQ
      }
    })(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  },

  // html转码
  HTMLEncode (html) {
    let div = document.createElement('div')
    if (div.textContent !== null) {
      div.textContent = html
    } else {
      div.innerText = html
    }
    const result = div.innerHTML
    div = null
    return result
  },
  // html解码
  HTMLDecode (text) {
    let div = document.createElement('div')
    div.innerHTML = text
    const result = div.innerText || div.textContent
    div = null
    return result
  },

  // 设置COOKIE
  setCookie (name, val, days) {
    const date = new Date()
    date.setDate(date.getDate() + days)
    document.cookie =
      name + '=' + encodeURIComponent(val) + '; expires=' + date.toGMTString()
  },
  // 读取COOKIE
  getCookie (name) {
    const iName = name + '='
    for (let item of document.cookie.split(';')) {
      item = item.trim()
      if (item.startsWith(iName)) {
        return decodeURIComponent(item.split('=')[1])
      }
    }
    return null
  },

  // 格式化货币
  formatMoney (number, places = 2, thousand = ',', decimal = '.') {
    const negative = number < 0 ? '-' : ''
    const iNumber = Math.abs(+number || 0).toFixed(places)
    const i = '' + parseInt(iNumber, 10)
    const j = i.length > 3 ? i.length % 3 : 0
    return negative +
      (j ? i.substr(0, j) + thousand : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
      (places ? decimal + Math.abs(iNumber - i).toFixed(places).slice(2) : '')
  },

  // 设计稿长度转客户端长度（px）
  px (px, w = 750) {
    const html = document.getElementsByTagName('html')[0]
    const fontSize = parseFloat(this.getStyle(html, 'fontSize')) || 0
    return px / w * fontSize * 10
  },

  // 客户端长度转设计稿长度（px）
  dpx (px, w = 750) {
    const html = document.getElementsByTagName('html')[0]
    const fontSize = parseFloat(this.getStyle(html, 'fontSize')) || 0
    return px / (fontSize * 10) * w
  },

  // 设计稿长度转客户端长度（rem）
  rem (px, w = 750) {
    return px / w * 10
  },

  // 客户端px转客户端rem
  px2rem (px, w = 750) {
    return this.rem(this.dpx(px, w))
  },

  // 不四舍五入保留小数位
  toFixed (val, num = 2) {
    const iVal = +val || 0
    const iNum = Math.pow(10, num)
    return (Math.floor(iVal * iNum) / iNum).toFixed(num)
  },

  // 获取元素样式
  getStyle (o, a) {
    return typeof window.getComputedStyle === 'function'
      ? window.getComputedStyle(o, null)[a]
      : o.currentStyle
        ? o.currentStyle[a]
        : ''
  },

  // 手机号码打码
  encryptMobile (str) {
    return str ? str.substr(0, 3) + '****' + str.substr(str.length - 4) : ''
  },

  // 获取大致发布时间
  getApproximateTime (time, now = new Date().getTime()) {
    const elapse = (now - time) / 86400000
    switch (true) {
      case elapse >= 3:
        return new Date(time).$format('yyyy-MM-dd')
      case elapse < 3:
        return '前天'
      case elapse < 2:
        return '昨天'
      case elapse < 1:
        return '今天'
      default:
        return ''
    }
  },

  // 是否DOM元素
  isDOM (o) {
    return typeof HTMLElement === 'object'
      ? o instanceof HTMLElement
      : typeof o === 'object' &&
        o.nodeType === 1 &&
        typeof o.nodeName === 'string'
  },

  // 是否存在样式类名
  hasClass (elem, className) {
    return (elem.className)
      .replace(/[\t\r\n\f]/g, ' ')
      .split(' ')
      .includes(className)
  },

  // 向上寻找类名匹配的元素
  closestByClass (elem, className) {
    if (this.hasClass(elem, className)) {
      return elem
    } else if (this.isDOM(elem.parentNode)) {
      return this.closestByClass(elem.parentNode, className)
    } else {
      return null
    }
  },

  // 创建与获取全局变量
  global (name, val) {
    const iName = config.globalValPre + name + config.globalValExt
    // console.log('window',window[iName])
    // console.log(window)
    return arguments.length > 1 ? (window[iName] = val) : window[iName]
  },
  // 获取全局变量名
  globalName (name) {
    return config.globalValPre + name + config.globalValExt
  },
  // url加上协议
  prot (url) {
    return window.location.protocol + url
  },

  // 创建对象代理函数
  createAgency (object) {
    return function (name, ...params) {
      return typeof object[name] === 'function'
        ? object[name](...params)
        : object[name]
    }
  },

  // 随机范围
  random (min, max, isFloat = false) {
    return isFloat
      ? Math.random() * (max - min + 1) + min
      : Math.floor(Math.random() * (max - min + 1) + min)
  },

  // 随机排序数组
  shuffle (arr) {
    let i = arr.length
    while (i) {
      const j = Math.floor(Math.random() * i--)
      ;([arr[j], arr[i]] = [arr[i], arr[j]])
    }
    return arr
  }
}
