import uuidv1 from 'uuid/v1'
import utils from '../utils'
import config from './config'

utils.global('app2web', function (name, data = null) {
  const fn = utils.global(name)
  console.log('回调', {
    name,
    fn,
    data,
    parseDataRet: JSON.parse(data)
  })
  typeof fn === 'function' && fn(JSON.parse(data))
})

// “返回结果”处理
const statusKey = config.apiResultStatusKey
function resultHandler (result) {
  if (
    Object.prototype.toString.call(result) === '[object Object]' &&
    result.hasOwnProperty(statusKey)
  ) {
    result[statusKey] = Number(result[statusKey])
  }
}

// 出错或非APP环境
function exceptionHandle (data, alternatives, resolve) {
  let result
  if (typeof alternatives === 'function') {
    result = alternatives(data)
    resultHandler(result)
  }
  resolve(result || {})
}

export default async function (name, data = {}, alternatives) {
  return new Promise(function (resolve) {
    let iosInterfaces
    let interfaces
    if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.web2app &&
      typeof window.webkit.messageHandlers.web2app.postMessage === 'function'
    ) {
      iosInterfaces = window.webkit.messageHandlers.web2app.postMessage
    } else {
      interfaces = utils.global('web2app')
    }

    console.log('interfaces', interfaces)
    console.log('iosInterfaces', iosInterfaces)

    if (
      iosInterfaces || (interfaces && typeof interfaces[name] === 'function')
    ) {
      // if (data && data.callback) {
      const callbackName = 'web2app_callback__' + uuidv1().replace(/-/g, '')
      utils.global(callbackName, function (result) {

  // alert('result'+result)
  // console.log('result',result)
  // window.webkit.messageHandlers.web2app.postMessage(
  //   JSON.stringify('{a:1}')
  // )

        resultHandler(result)
        resolve(result || {})
        delete utils.global(callbackName)
      })
      data.callback = callbackName

      // }

      if (iosInterfaces) {
        const iData = { method: name, params: data }
        console.log('调起', {
          iosInterfaces: window.webkit.messageHandlers.web2app.postMessage,
          methodName: name,
          iData
        })
        try {
          window.webkit.messageHandlers.web2app.postMessage(
            JSON.stringify(iData)
          )
        } catch (err) {
          console.error(err)
          exceptionHandle(data, alternatives, resolve)
        }
      } else {

        console.log('调起', {
          interfaces,
          methodName: name,
          'interfaces[methodName]': interfaces[name],
          data
        })
        try {
          interfaces[name](JSON.stringify(data))
        } catch (err) {
          console.error(err)
          exceptionHandle(data, alternatives, resolve)
        }
      }
      // if (!data || !data.callback) {
      //   resolve({})
      // }
    } else {
      exceptionHandle(data, alternatives, resolve)
    }
  })
}
