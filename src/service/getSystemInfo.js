import native from './native';
import web2app from './web2app'
console.log('native', native)
async function getAppUserinfo(cb) {
  let systemInfo = await web2app('getSystemInfo', { callback: true })
  let userInfo = await web2app('getUserInfo', { callback: true })

  native.systemInfo = systemInfo;
  window.native = {
    ...native,
    ...systemInfo,
    ...userInfo,
    ...{
      statusBarHeight: native.android ? Number(systemInfo.statusBarHeight) - 8 : Number(systemInfo.statusBarHeight)
    },
    ...{navigatorHeight: (Number(systemInfo.statusBarHeight || 0) + parseInt(85 / 750 * document.body.clientWidth))}
  }
    // native.userInfo = userInfo;
  native.vid = userInfo.vid;
  // window.native = na;
  typeof cb === 'function' && cb();
  console.log('systemInfo', systemInfo, userInfo)

}

function getWapUserinfo(cb) {
  native.vid = sessionStorage['vid'] ||
    (native.isTest ? 'TODO 测试用的VID' : '');

  typeof cb === 'function' && cb();
  console.log('getWapUserinfo')
}

module.exports = native.isApp ? getAppUserinfo : getWapUserinfo;
