import CryptoJS from 'crypto-js'
import config from '@/service/config'

const keyNum = config.key
const ivNum = config.iv

export function getAES (plaintext) {
  const key = CryptoJS.enc.Utf8.parse(keyNum)
  const iv = CryptoJS.enc.Utf8.parse(ivNum)
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

export function getDAes (encrypted) {
  const key = CryptoJS.enc.Utf8.parse(keyNum)
  const iv = CryptoJS.enc.Utf8.parse(ivNum)
  const decrypted = CryptoJS.DES.decrypt(encrypted, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

// 加密
// console.log(encodeURIComponent(getAES(JSON.stringify({}))))

// 解密
// console.log(JSON.parse(getDAes('')))
