<template>
  <div class="box">
    <!--<div class="header">-->
      <!--<div class="arrow"><img src="./img/row.png" alt=""></div>-->
      <!--<div class="title">完善资料</div>-->
      <!--<img src="./img/infobg.png" alt="" width="100%">-->
    <!--</div>-->
    <!--<div class="title">温馨提示：请填写真实有效信息以获得更高信用额度</div>-->
    <div class="headerBar">
      <header-bar title="完善资料"></header-bar>
      <img src="./img/infobg.png" alt="" width="100%">
    </div>

    <div class="content">
      <div class="information"  @click="card">
        <div class="icon">
          <img src="./img/rzicon2.png" alt="" >
        </div>
        <span class="title">实名认证</span>
        <span class="text" :class="{'cur':list.idCard==3}" v-html="list.idCard==3?'认证成功':list.idCard==2?'认证中':list.idCard==4&&list.idCardFail==1?'认证失败(身份证已被认证)':list.idCard==4?'认证失败':'未认证'">
        </span>

        <i></i>
      </div>
      <div class="information" @click="base">
        <div class="icon">
          <img src="./img/rzicon5.png" alt="" >
        </div>
        <span class="title">基础信息</span>
        <span class="text" :class="{'cur':list.baseInfo==3}" v-html="list.baseInfo==4&&list.idCardFail==1?'认证失败':list.baseInfo==3?'认证成功':list.baseInfo==2?'认证中':'未认证'">
        </span>
        <i></i>
      </div>
      <div class="information" @click="linkman">
        <div class="icon phone">
          <img src="./img/rzicon4.png" alt="" >
        </div>
        <span class="title">联系人认证</span>
        <span class="text" :class="{'cur':list.contact==3}" v-html="list.contact==4?'认证失败()':list.contact==3?'认证成功':list.contact==2?'认证中':'未认证'"></span>
        <i></i>
      </div>
      <div class="information" @click="bank">
        <div class="icon">
          <img src="./img/rzicon3.png" alt="">
        </div>
        <span class="title">银行卡认证</span>
        <span class="text" :class="{'cur':list.bank==3}" v-html="list.bank==4?'认证失败':list.bank==3?'认证成功':list.bank==2?'认证中':'未认证'"></span>
        <i></i>
      </div>

      <div class="information" @click="mobile" style="border:none;">
        <div class="icon">
          <img src="./img/rzicon1.png" alt="" >
        </div>
        <span class="title">手机认证 </span>
        <span class="text" :class="{'cur':list.mobOperator==3}" v-html="list.mobOperator==4?'认证失败':list.mobOperator==3?'认证成功':(list.mobOperator==2 || authing == 1)?'认证中':'未认证'"></span>
        <i></i>
      </div>
    </div>
    <!--<div class="button">立即借款</div>-->
  </div>
</template>

<script>
  import headerBar from '../repay/header/index.vue'
  import { Base64 } from 'js-base64'
  import native from '@/service/native'

  // var keyStr = "ABCDEFGHIJKLMNOP" +
  // "QRSTUVWXYZabcdef" +
  // "ghijklmnopqrstuv" +
  // "wxyz0123456789+/" +
  // "=";
  // //加密函数
  // function encode64(input) {
  // input = escape(input);//注意escape（）函数
  // var output = "";
  // var chr1, chr2, chr3 = "";
  // var enc1, enc2, enc3, enc4 = "";
  // var i = 0;
  // do {
  // chr1 = input.charCodeAt(i++);
  // chr2 = input.charCodeAt(i++);
  // chr3 = input.charCodeAt(i++);
  // enc1 = chr1 >> 2;
  // enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
  // enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
  // enc4 = chr3 & 63;
  // if (isNaN(chr2)) {
  // enc3 = enc4 = 64;
  // } else if (isNaN(chr3)) {
  // enc4 = 64;
  // }
  // output = output +
  // keyStr.charAt(enc1) +
  // keyStr.charAt(enc2) +
  // keyStr.charAt(enc3) +
  // keyStr.charAt(enc4);
  // chr1 = chr2 = chr3 = "";
  // enc1 = enc2 = enc3 = enc4 = "";
  // } while (i < input.length);
  // return output;
  // }

  export default {
    components: {
      headerBar
    },
    data() {
      return {
        list: '',
        click: true,
         auto_pay: 0, // 自动下款
        authing: this.$route.query.authing // 运营商认证回跳标识 1是  否则不是
      }
    },
    mounted() {
      this.$vux.loading.show({
        text: '加载中'
      })
      this.getState();
      if(this.authing == 1) {
        setTimeout(() => {
          this.authing == 0
        }, 10*1000)
      }
    },
    methods:{
      check (idCard,baseInfo,contact,bank,mobOperator) {
        if(idCard && this.list.idCard != 3){
          this.$vux.toast.text('请您先进行实名认证');
          return false
        }
        if(baseInfo && this.list.baseInfo != 3){
          this.$vux.toast.text('请您先进行基础信息认证');
          return false
        }
        if(contact && this.list.contact != 3){
          this.$vux.toast.text('请您先进行联系人认证');
          return false
        }
        if(bank && this.list.bank != 3){
          this.$vux.toast.text('请您先进行银行卡认证');
          return false
        }
        if(mobOperator && this.list.mobOperator != 3){
          this.$vux.toast.text('请您先进行手机认证');
          return false
        }
        return true
      },
      base(){
        this.check(1,0,0,0,0) && this.$router.push({path: '/memb/base'});
      },
      async card(){
        var that = this
        if(that.click){
          that.click = false
          setTimeout(()=>{
            that.click = true
          },2000)
          let data = await that.$web2app('checkFaceLiveness',{ callback: true })
          if(data.code == 0 || data.code == -1){
            window.location.reload();
          }
        }
      },
      mobile(){
        if(this.list.bank == 3){
          if(this.list.mobOperator != 2 && this.authing != 1 &&  this.list.mobOperator != 3){

            // 是否在运营商认证之前查看借款数据
            this.$http({
              url:'loan/poundageRate',
              methods: 'post',
            }).then((data) => {
              if (data.data.status == 0) {
                if (data.data.data.auto_pay == 1) {
                  // this.$router.push('/loan/yys/cash')
                  this.auto_pay = 1
                  this.getYysWay()
                } else {
                  this.getYysWay()
                }
              } else {
                this.getYysWay()
              }
            })
          } else {
            this.$vux.toast.text('无需重复认证');
            setTimeout(() => {
              window.location.reload()
            }, 1e3)
            // this.$http({
            //   url:'auth/operatorConf',
            //   methods: 'post',
            // })
            // .then(({data})=>{
            // },(error) => {
            //   // this.$vux.loading.hide()
            // })
          }
        } else {
          this.check(1,1,1,1,0)
          setTimeout(() => {
            window.location.reload()
          }, 1e3)
        }
      },
      yysAuthMH() {
        const that = this
        this.$vux.loading.show({
          text: '加载中'
        })
        // 数聚魔盒
        this.$http({
          url:'auth/operatorConf?type=magic',
          methods: 'get',
        }).then((data) => {
          if(data.data.status === 0){
            that.$vux.loading.hide()
            this.$utils.setCookie('time', '', 1)
            const urlBefore = data.data.data.url // 验证使用者身份的唯一标识
            const box_token = data.data.data.box_token // 验证使用者身份的唯一标识
            const arr_pass_hide = String(data.data.data.arr_pass_hide) // 隐藏身份要素
            const real_name = data.data.data.real_name // 真实姓名
            const identity_code = data.data.data.identity_code // 身份证
            const user_mobile = data.data.data.user_mobile // 手机号
            const passback_params = data.data.data.passback_params // 手机号

            let cb = ''
            if (this.auto_pay == 1) {
              cb = encodeURIComponent(window.location.protocol + '//' + window.location.host + '/m.html#/indexYysAuth?authing=1') // 运营商认证返回链接
            } else {
              cb = encodeURIComponent(window.location.protocol + '//' + window.location.host + '/m.html#/index?authing=1') // 运营商认证返回链接
            }
            const moheUrl = `${urlBefore}?box_token=${box_token}&arr_pass_hide=${arr_pass_hide}&real_name=${real_name}&identity_code=${identity_code}&user_mobile=${user_mobile}&passback_params=${passback_params}&cb=${cb}`
            this.$web2app('openWebPage', {
              showLoadVIew: 1,
              useStatusBar: 1,
              showNavigation: 1, // 导航栏
              title: '运营商认证',
              url: moheUrl,
            });
          }
        }).catch(() => {
          that.$vux.loading.hide()
        })
      },
      // 魔蝎
      yysAuthMX() {
        let that = this
        that.$vux.loading.show({
          text: '加载中'
        })
        this.$http({
          url:'auth/operatorConf?type=scorpion',
          methods: 'get',
        }).then((data) => {
          that.$vux.loading.hide()
          if(data.data.status === 0){
            this.$utils.setCookie('time', '', 1)
            const url = data.data.data.url // 	string	api钥匙
            const apiKey = data.data.data.apiKey // 	string	api钥匙
            const loginParamsEncrypt = data.data.data.loginParamsEncrypt // 	string	加密用户信息
            const userId = data.data.data.userId // 	string	业务系统的标识用户的ID

            let backUrl = ''
              if (this.auto_pay == 1) {
                  backUrl = encodeURIComponent(window.location.protocol + '//' + window.location.host + '/m.html#/indexYysAuth?authing=1') // 运营商认证返回链接
              } else {
                  backUrl = encodeURIComponent(window.location.protocol + '//' + window.location.host + '/m.html#/index?authing=1') // 运营商认证返回链接
            }
            const moxieUrl = `${url}?apiKey=${apiKey}&loginParamsEncrypt=${loginParamsEncrypt}&userId=${userId}&backUrl=${backUrl}`
            // window.location.href = moxieUrl
            // return;
            this.$web2app('openWebPage', {
              showLoadVIew: 1,
              useStatusBar: 1,
              showNavigation: 1, // 导航栏
              title: '运营商认证',
              url: moxieUrl,
            });
          }
        }).catch(() => {
          that.$vux.loading.hide()
        })
      },
      // 新颜
      yysAuthXY() {
          let that = this
          that.$vux.loading.show({
              text: '加载中'
          })
          this.$http({
              url:'auth/operatorConf?type=xinyan',
              methods: 'get',
          }).then((data) => {
              that.$vux.loading.hide()
              that.$store.commit('SET-YYS-AUTH', '')
              if(data.data.status === 0){
                  this.$utils.setCookie('time', '', 1)
                  const url = data.data.data.url // 	string	api钥匙
                  const phone = data.data.data.phone // 	string	手机号
                  const idCardNum = data.data.data.idCardNum // 	string	身份证
                  const name = data.data.data.name // 	string	姓名
                  const idCardNumState = data.data.data.idCardNumState // 	string	姓名
                  const nameState = data.data.data.nameState // 	string	姓名
                  const phoneState = data.data.data.phoneState // 	string	姓名

                  let jumpUrl = ''
                  if (this.auto_pay == 1) {
                      jumpUrl = encodeURIComponent(window.location.protocol + '//' + window.location.host + '/m.html#/indexYysAuth?authing=1') // 运营商认证返回链接
                  } else {
                      jumpUrl = encodeURIComponent(window.location.protocol + '//' + window.location.host + '/m.html#/index?authing=1') // 运营商认证返回链接
                  }
                  // jumpUrl = https://qz.xinyan.com/auth/{apiUser}/{apiEnc}/{timeMark}/{apiName}/{taskId}?jumpUrl={jumpUrl}
                  // const jumpUrl = encodeURIComponent(window.location.protocol + '//' + window.location.host + '/m.html#/?authing=1') // 运营商认证返回链接
                  const xinyanUrl = `${url}?jumpUrl=${jumpUrl}&name=${name}&phone=${phone}&idCardNum=${idCardNum}&idCardNumState=${idCardNumState}&nameState=${nameState}&phoneState=${phoneState}`
                  // window.location.href = xinyanUrl
                  // return;
                  this.$web2app('openWebPage', {
                      showLoadVIew: 1,
                      useStatusBar: 1,
                      showNavigation: 1, // 导航栏
                      title: '运营商认证',
                      url: xinyanUrl,
                  });
              }
          }).catch(() => {
              that.$vux.loading.hide()
          })
      },
      // 获取运营商认证方式
      getYysWay() {
        let that = this
        this.$vux.loading.show({
          text: '加载中'
        })
        // 数聚魔盒
        this.$http({
          url:'index/getSysConfig?configName=OPERATOR_TYPE',
          methods: 'get',
        }).then((data) => {
          that.$vux.loading.hide()
          if(data.data.status === 0){
            // 魔蝎
            if (data.data.data.config == 'scorpion') {
              that.yysAuthMX()
            } else if (data.data.data.config == 'xinyan') {
                // 新颜
                that.yysAuthXY()
            } else{
              // 魔盒
              that.yysAuthMH()
            }
          }
        }).catch(() => {
          that.$vux.loading.hide()
        })
      },
      linkman(){
        this.check(1,1,0,0,0) && this.$router.push({path: '/memb/linkman'});
      },
      bank(){
        this.check(1,1,1,0,0) && this.$router.push({path: '/memb/bank'});
      },
      btn(){
        var that =this
        if (!this.check(1,1,1,1,1)) return
        that.$http({
          methods: 'post',
          url: 'auth/apply',
        }).then((res)=>{
          if (res.data.status === 0) {
            this.$router.push({path: '/'});
          }
        },(error) => {
        })
      },
      getState(){
        var that =this
        that.$http({
          methods: 'post',
          url: 'auth/detail',
        }).then((res)=>{
          console.log(res.data)
          if (res.data.status === 0) {
            that.$vux.loading.hide()
            that.list = res.data.data
          }else{
            that.$vux.loading.hide()
            // this.$vux.alert({
            //     message: res.data.msg
            //   });
          }
        },(error) => {
          that.$vux.loading.hide()
          // this.$vux.alert({
          //   message: '获取数据出错(auth/detail)'
          // })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box{
    width: 100%;
    height: 100%;
    background: #f6f4f7;
    overflow: hidden;


    .tits{
      text-align: center;
      color: #888888;
      font-size: Px(23);
      margin-top: Px(50);
      img{ width: Px(259)}
    }
    h3{
      color: #fff;
      font-size: Px(30);
      font-weight: normal;
      text-align: center;

    }
    >.titles{
      position: absolute;
      right: Px(50);
      top: Px(280);
      line-height: Px(42);
      color: #ff6d00;
      font-size: Px(27);
    }
    >.title{
      color: #fb8e3b;
      font-size: Px(22);
      line-height: Px(70);
      width: 100%;
      text-align: center;
      i{
        font-style: normal;
        margin-left: Px(25);
        color: #959595;
        font-size: Px(23);
      }
    }

  }
  .header{
    display: flex;
    height: Px(90);
    align-items: center;
    border-bottom: 1px #eee solid;
    .arrow{
      width: Px(50);
      margin-left: Px(30);
      img{
        width: Px(16)
      }
    }
    .title{
      position: absolute;
      width: Px(150);
      left: 50%;
      margin-left: Px(-75);
      line-height: Px(90);
      text-align: center;
      color: #333333;
      font-size: Px(30);
    }
  }
  .content{
    overflow: hidden;
    margin: Px(30);
    overflow: hidden;
    margin-bottom: Px(100);
    border-radius: Px(15);
    margin-top:Px(-125);
    background: #fff;
    .information{
      display: block;
      align-items: center;
      width:50%;
      background: #FFFEFE;
      float: left;
      position: relative;
      .icon{
        height: Px(50);
        position: absolute;
        left: Px(30);
        top: Px(30);
        img{
          display: block;
          margin: auto;
          width: auto;
          width: Px(50);
        }
      }
      .phone{
        img{
          height: auto;
        }
      }
      i{
        display: none;
        width: Px(13);
        height: Px(23);
        position: absolute;
        right: Px(20);
        top: Px(43);
        background: url(./img/row2.png) no-repeat;
        background-size: 100% 100%;
      }
      .title{
        flex: 1;
        //  width: Px(215);
        color: #000000;
        font-size: Px(28);
        text-align: left;
        line-height: Px(45);
        margin-left: Px(100);
        display: block;
        margin-top: Px(25);
        margin-bottom: Px(60);
        em{
          color: #999999;
          font-size: Px(26);
        }
      }
      .text{
        flex: 1;
        color: #999999;
        background: none;
        font-size: Px(24);
        line-height: Px(40);
        height: Px(40);
        padding:0 Px(25);
        position: absolute;
        left: Px(75);
        top: Px(70);


      }
      .cur{
        color: #8A98FF;
      }
    }
  }
  .button{
    width: Px(500);
    height: Px(80);
    margin: Px(30) auto;
    color: #f75f4c;
    text-align: center;
    font-size: Px(30);
    line-height: Px(80);
    border-radius: Px(40);
    background: #ffffff;
  }
  .header{border: none!important;}
  .headerBar{
    >img{
      margin-top: -1.2rem;
    }
  }
</style>
<style>
  .unchange{
    background: #f6f4f7!important;
  }
</style>
