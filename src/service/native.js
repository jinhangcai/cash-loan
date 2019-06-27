import utils from '../utils'
const ua = window.navigator && window.navigator.userAgent || ''
const native = {
  statusBarHeight: 10,
  navigatorHeight: 10 + parseInt(85 / 750 * document.body.clientWidth),
  isApp: (window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.web2app &&
      typeof window.webkit.messageHandlers.web2app.postMessage === 'function') || typeof utils.global('web2app') === 'object',

  ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
  android: ua.includes('Android') || ua.includes('Adr'), // android终端
  isTest: location.host.match(/192|122|127|172|36.7|localhost|:8081|:8080|169.254|0.0.0|10[.]0/) != null
}
window.native = native;
module.exports = native;
