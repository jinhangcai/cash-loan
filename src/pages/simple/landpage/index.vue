<template>
  <div class="landing_box">
    <div class="land_img" style="height:7.2rem">
			<!--<img class="icon-logo" src="../images/icon_title.png" alt="">-->
      <!--<div class="title-box">-->
        <!--<img src="../images/icon_details.png" alt="">-->
      <!--</div>-->
      <!--<div class="icon-box flex-around">-->
				<!--<div class="icon-item">-->
					<!--<img src="../images/icon_tabs1.png" alt="">-->
					<!--<span>无门槛</span>-->
				<!--</div>-->
				<!--<div class="icon-item">-->
					<!--<img src="../images/icon_tabs2.png" alt="">-->
					<!--<span>零抵押</span>-->
				<!--</div>-->
				<!--<div class="icon-item">-->
					<!--<img src="../images/icon_tabs3.png" alt="">-->
					<!--<span>额度高</span>-->
				<!--</div>-->
      <!--</div>-->
    </div>
    <iframe
      id="geoPage"
      width="0"
      height="0"
      frameborder="0"
      style="display:none;"
      scrolling="no"
      src="https://apis.map.qq.com/tools/geolocation?key=UNOBZ-LZHKD-62P4B-PLGRN-RNIRS-6KFJP&referer=rrkd-h5"
    ></iframe>
    <!-- land_img -->
    <div class="landing_form">
      <div class="landing_item mt24">
        <i class="mobile txt_center">+86</i>
        <input class="user_mobile" v-model="form.mobile" type="text" placeholder="请输入手机号码">
      </div>
      <!-- landing_item -->
      <div class="landing_item mt24">
        <input class="code" type="text" v-model="form.imgCode" placeholder="图形验证码">
        <span @click="init" class="code_img">
          <img :src="imgsrc" alt>
        </span>
      </div>
      <!-- landing_item -->
      <div class="landing_item mt24">
        <input class="code" type="text" v-model="form.smsCode" placeholder="短信验证码">
        <span class="code_btn" @click="sendcode">{{ msg }}</span>
      </div>
      <!-- landing_item -->
      <div class="landing_btn" @click="register">注册领钱</div>
      <p class="register_txt txt_center">点击领取即同意
        <em class="">《服务协议》</em>
      </p>
    </div>
    <!-- landing_form -->
    <!--<p class="txt_center rights">Copyright © 2018 人人快贷 All right reserved</p>-->
  </div>
  <!-- profile_box -->
</template>

<script>
import BMap from "BMap";
import BMapSymbolSHAPEPOINT from "BMap_Symbol_SHAPE_POINT";

// import { getPosition } from "./lnglat";
export default {
  data() {
    return {
      flags: true,
      msg: "获取验证码",
      timers: null,
      form: {
        mobile: "",
        imgCode: "",
        smsCode: "",
        udid: "",
        lng_lat: "",
        mobilefirm: "",
        emulator: 1,
        mobroot: 1
      },
      test: "",
      imgsrc: window.location.protocol + '//' + window.location.host + '/index/captcha'
    };
  },
  mounted() {
    // 获取用户图片验证码
    this.init();
    // 当前用户的经纬度
    this.longlat();
    // 获取手机型号
    this.udid();
  },
  methods: {
    init() {
      this.imgsrc = "";
      this.$http({
        methods: "get",
        url: "index/captcha"
      }).then(r => {
        this.imgsrc = window.location.protocol + '//' + window.location.host + '/index/captcha?' + Math.random();
      });
    },
    longlat() {
      const _this = this;
      var map = new BMap.Geolocation();
      map.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          console.log(r.point);
          _this.form.lng_lat = r.point.lng + "," + r.point.lat;
        } else {
          this.$vux.toast.show({
              type:"warn",
              text: "failed" + this.getStatus()
          })
          // this.$warn("failed" + this.getStatus());
        }
      });
    },
    checkImgcode() {
      const reg = /^\s*$/;
      if (reg.test(this.form.imgCode)) {
        this.$vux.toast.show({
              type:"warn",
              text: "请检查图形验证码填写有误！"
          })
        // this.$warn("请检查图形验证码填写有误！");
        return false;
      } else {
        return true;
      }
    },
    sendcode() {
      if (this.flags) {
        const flag = this.checkInfo() && this.checkImgcode();
        // 验证图形码
        if (flag) {
          this.flags = false;
          this.$http({
            methods: "post",
            url: "index/sendsms",
            data: {
              mobile: this.form.mobile,
              imgCode: this.form.imgCode
            }
          }).then(r => {
            if (r.status === 200) {
              this.$vux.alert({
                message: "验证码发送成功！"
              });
              this.flags = false;
              clearInterval(this.timers);
              let ss = 60;
              this.timers = setInterval(() => {
                if (ss > 0) {
                  this.msg = ss + "s后获取";
                  ss -= 1;
                } else {
                  clearInterval(this.timers);
                  this.msg = "获取验证码";
                  this.flags = true;
                }
              }, 1000);
            } else {
              this.$vux.toast.show({
              type:"warn",
              text: r.data.msg
          })
              // this.$warn(r.data.msg);
              this.flags = true;
            }
          });
        } else {
          this.$vux.toast.show({
              type:"warn",
              text: "请检查填写手机号码、图形验证码是否有误！"
          })
          // this.$warn("请检查填写手机号码、图形验证码是否有误！");
        }
      }
    },
    checkInfo() {
      const umobile = /^1[345789]\d{9}$/;
      if (umobile.test(this.form.mobile) && this.form.imgCode) {
        return true;
      } else {
        this.$vux.toast.show({
              type:"warn",
              text: "请查看手机号码或是图片验证码填写是否有误！"
          })
        // this.$warn("请查看手机号码或是图片验证码填写是否有误！");
        return false;
      }
    },
    checkcode() {
      const reg = /^[0-9]{6}$/;
      if (reg.test(this.form.smsCode)) {
        return true;
      } else {
        return false;
      }
    },
    udid() {
      this.form.udid = navigator.userAgent;
      var MobileDetect = require("mobile-detect");
      const md = new MobileDetect(this.form.udid);
      this.form.mobilefirm = md.phone();
    },
    register() {
      if (this.checkInfo() && this.checkcode()) {
        this.$http({
          url: "",
          methods: "post",
          data: {
            mobile: this.form.mobile,
            smsCode: this.form.smsCode,
            udid: this.form.udid,
            lng_lat: this.form.lng_lat,
            mobilefirm: this.form.mobilefirm,
            emulator: this.form.emulator,
            mobroot: this.form.mobroot
          }
        }).then(r => {
          console.log(r);
        });
      } else {
        this.$vux.toast.show({
              type:"warn",
              text: "请检查表单信息填写是否有误！"
          })
        // this.$warn("请检查表单信息填写是否有误！");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.landing_box {
  position: absolute;
  width: 100%;
  min-height: 100%;
  top: 0;
  left: 0;
  background:#fff url('../images/pic_land_back.png') top no-repeat;
	background-size:100%;

  .land_img {
		padding: Px(130) Px(50) Px(50);
		color: #fff;
		font-size: Px(26);
		line-height: 1.5;
		text-align: center;
    & img {
      display: block;
      width: 100%;
      height: auto;
		}
		.icon-logo{
			display: block;
			width: 40%;
			height: auto;
		}
		.title-box{
			img{
				display: block;
				width: 100%;
				height: auto;
				margin:  Px(30) 0;
			}
		}
		.icon-box{
			.icon-item{
				img{
					display: block;
					margin: auto;
					width: Px(100);
				}
			}
		}
  }
  .landing_form {
    position: relative;
    z-index: 9;
    padding: Px(65) Px(0);
    margin: Px(185) auto 0;
    width: Px(580);
    height: auto;
    & .landing_item {
      position: relative;
      overflow: hidden;
      background:#E0E0E0;
      border:px(1) solid rgba(224,224,224,1);
      border-radius:Px(44);
      .mobile {
        position: absolute;
        display: block;
        width: Px(100);
        top: 0;
        left: 0;
        font-size: Px(26);
        line-height: Px(80);
        color: #333;
        text-align: center;
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: Px(90);
          display: block;
          width: 1px;
          height: Px(32);
          background: #333;
          transform: translate3d(0, -50%, 0);
        }
      }
      input {
        padding-left: Px(28);
        width: 100%;
        height: Px(80);
        background: none;
      }
      input::-webkit-input-placeholder {
        color: #fff;
      }
      .user_mobile {
        padding-left: Px(100);
      }
      .code {
        padding-right: Px(194);
      }
      .code_img {
        position: absolute;
        top: Px(10);
        right: Px(24);
        display: block;
        width: Px(180);
        height: Px(60);
        background: #999;
        overflow: hidden;
        & img {
          display: block;
          width: Px(194);
          height: Px(60);
        }
      }
      .code_btn {
        position: absolute;
        top: Px(10);
        right: Px(14);
        display: block;
        width: Px(180);
        height: Px(60);
        overflow: hidden;
        font-size: Px(22);
        line-height: Px(60);
        text-align: center;
        color: #2DA1FF;
        border-left: #2DA1FF Px(2) solid;
        &:hover,
        &:active {
          opacity: 0.7;
        }
      }
    }
  }
  .landing_btn {
    margin-top: Px(30);
    width: auto;
    height: Px(88);
    color: #fff;
    background:linear-gradient(to right, #FD8AB5, #CDC9FD);
    font-size: Px(26);
    line-height: Px(88);
    text-align: center;
    border-radius: Px(44);
  }
  .rights {
    margin-top: Px(32);
    font-size: Px(26);
    line-height: 1.7;
    color: #fff;
  }
  .mt24 {
    margin-bottom: Px(24);
  }
  .register_txt {
    margin-top: Px(20);
    font-size: Px(20);
    color: #fff;
    line-height: Px(30);
  }
}
</style>

<style scoped>
* {
  padding-right: 0;
  margin: 0;
  border: none;
  box-sizing: border-box;
}
.txt_333 {
  color: #333;
}
i,
em {
  font-style: normal;
}
input {
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.txt_center {
  text-align: center;
}
.txt_blue {
  color: #2AABDA;
}
</style>
