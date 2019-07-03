<template lang="pug">
  .page-landpage-third(:class="pageLandpageThirdClassNames")
    img(src="./img/bg1.png")
    //- .scroll-box.flex-center
      i.icon-messages
      marquee.flex-1(scrollamount="5")
        span.item 蒋先生已通过啾啾钱包成功借款
          em 1000元
        span.item 李先生已通过啾啾钱包成功借款
          em 3000元
    //- 表单
    .form(v-if="!downloadShow")
      .form-item
        .form-areacode +86
        .form-separator
        input.form-input(
        ref="formInputPhone"
        type="number" placeholder="请输入手机号" :value="phone"
        @input="inputDigital($event, 'phone', 11)"
        )
      .form-item
        input.form-input(
        ref="formInputCode"
        type="number" placeholder="请输入验证码" :value="code"
        @input="inputDigital($event, 'code', 6)"
        )
        .form-sendcode(:class="{ '-active': canSendCode }")
          span(v-if="sendCodeTime") 重新发送({{ sendCodeTime }})
          span(v-else @click="sendCode") 获取验证码
      .form-submit(@click="login") 点击开始借钱
      // .form-tip 注册即同意
      //   em.txt_blue 《{{ $appName }}服务协议》

    //- 下载弹窗
    .download(v-if="downloadShow" @click="download")
      .download-btnwarp
        .download-btn 立即下载APP

    //- 下载弹窗2
    .download2(
    v-if="download2Show" @click.self="download2Close"
    ): .download2-box
      .download2-close(@click="download2Close")
      .download2-btn(@click="goToAuth")(:class="{ 'cur': sendCodeTime!=0 }") 点我去信任{{ sendCodeTime }}s
      .download2-tip 详细安装教程

    //- 环境要求提示
    .masklayer(v-if="masklayerShow"): .masklayer-img
</template>

<script>
  // import BMap from "BMap"
  // import BMapSymbolSHAPEPOINT from "BMap_Symbol_SHAPE_POINT"
  import utils from '@/utils'

  export default {
    data() {
      return {
        app: 'ddbt', // 供下载的APP
        masklayerShow: false, // 环境要求提示显示
        phone: '', // 手机号
        code: '', // 验证码
        sendCodeTimer: null, // 发送短信验证码计时器
        sendCodeTime: 0, // 发送短信验证码剩余时间
        uuid: '', // 设备号
        lng_lat: '', // gps经纬度
        mobilefirm: '', // 手机型号
        emulator: 1, // 1非模拟器，2是模拟器
        mobroot: 1, // 1未root，2已root
        downloadShow: false, // 下载弹窗显示
        download2Show: false, // 下载弹窗2显示
      }
    },

    computed: {
      // 页面样式类名
      pageLandpageThirdClassNames () {
        const result = {
          '-download': this.downloadShow,
        }
        if (this.app) Object.assign(result, {
          [`-${this.app}`]: true,
        })
        return result
      },

      // 能够发送验证码
      canSendCode () {
        return /^1\d{10}$/.test(this.phone) && !this.sendCodeTime
      },
    },

    mounted() {
      const app = this.$route.query.app || ''
      if (app.trim()) this.app = app.trim()
      switch (app) {
        default:
          break
      }

      this.downloadShow = !!+this.$route.query.nologin
      if (this.downloadShow) {
        window.document.documentElement.scrollTop =
          window.document.body.scrollTop = 0
        const unchange = window.document.querySelector('.unchange')
        unchange.style.overflow = 'hidden'
      }
      if (utils.browser.versions.weixin) {
        this.masklayerShow = true
      }
      this.getUdid()
      //this.longlat()
      this.getPvUvNum();
    },

    methods: {
      // 获取设备信息
      getUdid () {
        this.uuid = window.navigator.userAgent
        const mobileDetect = require('mobile-detect')
        const md = new mobileDetect(this.udid)
        this.mobilefirm = md.phone()
      },
      // 获取经纬度
      // longlat () {
      //   const map = new BMap.Geolocation()
      //   map.getCurrentPosition((r) => {
      //     if (this.getStatus() === 'BMAP_STATUS_SUCCESS') {
      //       this.lng_lat = `${r.point.lng},${r.point.lat}`
      //     } else {
      //       this.$vux.toast.show({
      //         type: 'warn',
      //         text: 'failed' + this.getStatus(),
      //       })
      //     }
      //   })
      // },
      getStatus () {
        return 'BMAP_STATUS_SUCCESS'
      },
      // 统计PvUv
      async getPvUvNum(){
        let dataString = this.$qs.stringify({
          type: 'channel',
          code: this.$route.query.channel_code
        })
        const { data: { status, msg } } = await this.$axios.post(
          'index/count',
          dataString,
        )
      },
      // 限制输入为数字
      inputDigital (e, valueName, maxLen) {
        if (e.data && !/[0-9]+/.test(e.data)) {
          e.target.value = ''
          e.target.value = this[valueName]
          return
        }
        if (maxLen === +maxLen && e.target.value.length > maxLen) {
          e.target.value = this[valueName]
          return
        }
        this[valueName] = e.target.value
      },

      // 发送短信验证码
      async sendCode () {
        if (!this.canSendCode) return
        if (this.phone === '') return this.$vux.toast.show({
          type: 'warn',
          text: '请输入手机号',
        })
        if (!/^1\d{10}$/.test(this.phone)) return this.$vux.toast.show({
          type: 'warn',
          text: '手机号格式不正确',
        })

        const { data: { status, msg } } = await this.$http({
          methods: 'post',
          url: 'index/sendsms',
          data: {
            mobile: this.phone,
          },
        })
        if (+status !== 0) return this.$refs.formInputPhone.focus()

        this.$refs.formInputCode.focus()
        clearTimeout(this.sendCodeTimer)
        this.sendCodeCountdown()
        this.$vux.toast.text('验证码已发送')
      },

      // 发送短信验证码倒计时
      sendCodeCountdown (time = 60, fn) {
        this.sendCodeTime = time
        this.sendCodeTimer = setTimeout(() => {
          if (--this.sendCodeTime > 0) {
            this.sendCodeCountdown(this.sendCodeTime, fn)
          } else {
            clearTimeout(this.sendCodeTimer)
            this.sendCodeTime = 0
            typeof fn === 'function' && fn()
          }
        }, 1e3)
      },

      // 用户登录
      async login() {
        if (this.phone === '') return this.$vux.toast.show({
          type: 'warn',
          text: '请输入手机号',
        })
        if (!/^1\d{10}$/.test(this.phone)) return this.$vux.toast.show({
          type: 'warn',
          text: '手机号格式不正确',
        })
        if (this.code === '') return this.$vux.toast.show({
          type: 'warn',
          text: '请输入验证码',
        })
        if (!/^\d{6}$/.test(this.code)) return this.$vux.toast.show({
          type: 'warn',
          text: '验证码格式不正确',
        })

        const { data: { status, msg } } = await this.$http({
          methods: 'post',
          url: 'index/login',
          data: {
            type: 2,
            mobile: this.phone,
            smsCode: this.code,
            udid: this.udid,
            lng_lat: this.lng_lat,
            mobilefirm: this.mobilefirm,
            emulator: this.emulator,
            mobroot: this.mobroot,
            channel_code: this.$route.query.channel_code
          },
        })
        if (status != 0) return

        this.downloadShow = true
        window.document.documentElement.scrollTop =
          window.document.body.scrollTop = 0
        const unchange = window.document.querySelector('.unchange')
        unchange.style.overflow = 'hidden'
        this.$vux.toast.show({
          type: 'toast',
          text: '登录成功'
        })
      },

      // 下载APP
      async download () {
        if (utils.browser.versions.ios) {
          // const { data: { status, msg, data } } = await this.$http({
          //   methods: 'post',
          //   url: 'index/version',
          //   data: {
          //     os: 1,
          //   },
          // })
          // if (status != 0) return
          // window.location.href = data.ios_down_url
          // return

          this.iosDownload()
          this.download2Show = true
          clearTimeout(this.sendCodeTimer)
          this.sendCodeCountdown(10, this.goToAuth)
        } else if (utils.browser.versions.android) {
          switch (this.app) {
            case 'ddbt':
              const { data: { status, msg, data } } = await this.$http({
                methods: 'post',
                url: 'index/version',
                data: {
                  os: 2,
                },
              })
              if (status != 0) return
              window.location.href = data.android_down_url
              break
            default:
              break
          }
        }
      },

      // 下载弹窗2关闭
      download2Close () {
        clearTimeout(this.sendCodeTimer)
        this.sendCodeTime = 0
        this.download2Show = false
      },

      // ios下载APP
      iosDownload () {
        switch (this.app) {
          case 'ddbt':
            const url = 'https://dongporou.oss-cn-hangzhou.aliyuncs.com/manifest.plist'
            //   window.location.href = `itms-services://?action=download-manifest&url=${url}`
            window.location.href = `itms-services://?action=download-manifest&url=https://dongporou.oss-cn-hangzhou.aliyuncs.com/manifest.plist`
            break
          default:
            break
        }
      },

      // 去信任
      goToAuth () {
        if(this.sendCodeTime==0){
          switch (this.app) {
            case 'ddbt':
              window.self.location = 'https://dongporou.oss-cn-hangzhou.aliyuncs.com/embedded.mobileprovision'
              break
            default:
              break
          }
        }

      },
    },
  }
</script>

<style lang="stylus">
  iframe
    display block

</style>

<style lang="stylus" scoped>
  *
    box-sizing border-box
    margin 0
    border none
    padding-right 0

  i, em
    font-style normal

  input
    outline none
    -webkit-tap-highlight-color rgba(0,0,0,0)

  iframe
    display block
</style>

<style lang="stylus" scoped>
  px(n, w = 750)
    n / w * 10rem

  .page-landpage-third
    //   height px(1361)
    //   padding-top 90%
    bgs = px(750)
    position relative
    left 0
    right 0
    top 0
    bottom 0
    overflow auto
    background #fff
    img{
      display block;
      width 100%;
    }
  // &.-ddbt
  //   background rgba(27,66,211,1) url(./img/bg.png) 50% 0 no-repeat
  //   background-size 100% 100%
  .scroll-box{
    position absolute
    bottom 9rem
    left 0
    right 0
    padding 0 .4rem
    margin 0 1.2rem
    border 1px solid rgba(#fff, .8)
    border-radius .4rem
    color #ffffff
    line-height .7rem
    font-size .36rem
    // .icon-messages{
    //     display block
    //     width .5rem
    //     height .5rem
    //     background url('./img/icon_message.png') center no-repeat
    //     background-size 100% 100%
    //     margin-right .3rem
    // }
    .item{
      margin-right 1rem
      em{
        color #FFF000
      }
    }
  }
  // 表单
  .form
    position absolute
    top px(620)
    left 0
    right 0
    //margin px(30) px(60) 0
    border-radius px(14)
    //padding px(46) 0 px(46)

  .form-item
    display flex
    padding px(10) px(28)
    width:px(538);
    margin: px(30) auto;
    border-radius:px(15)
    background:#f7bac2

  .form-areacode
    flex none
    font-size: px(26);
    line-height: px(60);
    color: #000;

  .form-input
    flex auto
    height px(61)
    font-size px(28)
    color #333
    background:#f7bac2
    &::-webkit-input-placeholder
      color #000

  .form-separator
    flex none
    width 1px
    height px(30)
    margin px(17) px(13) 0 px(14)
    background-color #f7bac2
    color:#000

  .form-sendcode
    flex none
    margin-left px(-40)
    margin-right -.2rem;
    font-size px(26)
    line-height px(60)
    padding 0 px(20)
    border-radius px(30)
    color #fff
    background #d91833
    &.-active
      color #fff
      background-color #FFAA37

  .form-submit
    width px(530)
    margin: 0 auto
    height px(80)
    margin px(30) auto 0
    font-size px(32)
    line-height px(80)
    text-align center
    background:#d91833
    color #fff
    border-radius:px(15)
  //   text-shadow 0 px(2) rgba(11,107,212,.53)

  .form-tip
    margin-top px(19)
    font-size px(20)
    line-height px(24)
    text-align center
    color #666666
    .txt_blue
      color #FF5857

  //- 下载弹窗
  .download
    position fixed
    left 50%
    bottom 0
    width px(w = 750)
    height px(607)
    margin-left px(w / -2)
    padding-top px(100)
    &:before
      display block
      width px(180)
      height px(180)
      background url('./img/logo.png') center no-repeat
      background-size auto 100%
      content ''
      margin 0 auto px(80)
    .page-landpage-third.-ddbt &
      background url(./img/download.png) 0 0/100% 100% no-repeat

  .download-btnwarp
    margin-top px(-88)
    padding px(88) 0

  .download-btn
    width px(380)
    height px(88)
    line-height px(88)
    margin 0 auto
    color #fff
    background #FF5857
    border-radius 1rem
    text-align center
  // background url(./img/download_btn.png) 0 0/100% 100% no-repeat

  //- 下载弹窗2
  .download2
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    background-color rgba(0,0,0,.46)

  .download2-box
    position absolute
    left 50%
    bottom 0
    width px(w = 750)
    height px(857)
    margin-left px(w / -2)
    .page-landpage-third.-ddbt &
      background url(./img/download2.png) 0 0/100% 100% no-repeat

  .download2-close
    position absolute
    top 0
    right 0
    width px(90)
    height px(92)

  .download2-btn
    position absolute
    left 50%
    bottom px(80)
    width px(w = 283)
    margin-left px(w / -2)
    border 1px solid #228cfc
    border-radius px(16)
    font-size px(24)
    line-height px(66)
    text-align center
    color #228cfc
  .cur{
    color #ccc;
    border 1px solid #ccc;
  }
  .download2-tip
    position absolute
    left 50%
    bottom px(9)
    width px(w = 283)
    margin-left px(w / -2)
    font-size px(24)
    line-height px(71)
    text-align center
    color #228cfc

  //- 环境要求提示
  .masklayer
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    background-color rgba(0,0,0,.5)

  .masklayer-img
    position absolute
    right px(10)
    top px(10)
    width px(270 * 1.5)
    height px(189 * 1.5)
    background url(./img/masklayer.png) 50%/ 100% 100% no-repeat
</style>
<style>
  body{
    background :#46464A!important;
  }
</style>
