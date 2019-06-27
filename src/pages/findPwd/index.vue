<template>
  <div class="box">
    <div class="content">
      <div class="label" style="justify-content: right;border-top: 0;">
        <span class="phonefirst">+86</span>
        <x-input v-model="phone" :max="11" placeholder="请输入手机号码"></x-input>
      </div>
      <div class="label">
        <x-input v-model="msgyzm" placeholder="短信验证码"></x-input>
        <div class="cell-four" @click="sendSMS" :class="{disable}">
          {{SMSText}}
        </div>
      </div>
      <div class="label">
        <x-input  v-model="password"  placeholder="输入新密码"></x-input>
      </div>
    </div>
    <div class="sureBtn">
      确认
    </div>
  </div>
</template>

<script>
  import { XInput } from 'vux'
  export default {
    components: {
      XInput,
    },
    data() {
      return {
        phone:"",
        msgyzm:"",
        password:"",
        disable: false,
        img:"",
        timer:0
        // SMSText:"获取验证码"
      }
    },
    computed: {
        SMSText() {
            if (this.timer <= 0) {
                this.disable = false;
                return '获取验证码';
            } else {
                return this.timer + 's后重新获取';
            }
        }
    },
    mounted() {
      this.$http({
        methods:'post',
        url:'auth/detail'
      })
      .then((data) => {
        console.log('data',data)
      })
    },
    methods:{
      countDown() {
          this.disable = true
          this.timer = 59;
          let loop = setInterval(() => {
              this.timer--;
              if (this.timer <= 0) {
              clearInterval(loop);
              }
          }, 1000);
          return loop
      },
      getimages(){

      },
      sendSMS(){
          if (new RegExp('^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\\d{8}$').test(this.phone) === false)
          {return this.$vux.toast.show({
              type:"warn",
              text: "手机号码错误！"
          })
          // this.$warn('手机号码错误！')
          }
            this.$http({
              methods:'post',
              url:'account/modelNew',
              data:{
                mobile: this.phone
              }
            })
            .then((data) => {
              if (data.status === 0) {
                this.loop = this.countDown();
                this.initCode()
              } else {
                this.$vux.toast.show({
              type:"warn",
              text: data.msg
          })
                // this.$warn(data.msg)
              }
            })
      },
      initCode(){



          // this.$ajax({
          //     url:this.api + '/app/foreign/sendMsgValidateCode',
          //     data:{
          //         tel: this.phone,
          //         graphValidateCode: this.imgCode,
          //         random: this.imgRandom
          //     },
          //     error: () => {
          //         this.$warn('系统 sendMsgValidateCode错误')
          //     }
          //     }).then(({data}) => {
          //     if (data.code === 0) {
          //         this.$success('发送成功！')
          //     }else{
          //         this.$warn(data.message)
          //         clearInterval(this.loop)
          //         this.timer = 0
          //     }
          // })
      },
    }
  }
</script>
<style lang="scss" scoped>
.box{
    background: white;
    height: 100%;
    padding-top: Px(80);
}
  .content{
    width:Px(700);
    margin: 0 auto;
    height:Px(352);
    border:1px solid #DCDCDC;
    border-radius: Px(10);
    .label{
      height:Px(88);
      display:flex;
      line-height:Px(88);
      // padding-left:Px(10);
      border-top:1px solid #DCDCDC;
      justify-content:space-between;
    }
  }
  .phonefirst{
    width:Px(60);
    height:Px(31);
    line-height:Px(31);
    margin-left:Px(30);
    align-self: center;
    font-weight: bold;
    border-right: 1px solid #BBBBBB;
    align-self: center;
    padding-right: Px(15)
  }
  .cell-three{
    width:Px(152);
    height:Px(62);
    margin-right:Px(39);
    border:1px solid #DCDCDC;
    align-self: center
  }
  .cell-four{
    height:Px(62);
    margin-right:Px(39);
    line-height:Px(62);
    align-self: center;
    color:#2D7EFF;
    font-size: Px(28)
  }
  .disable{
    pointer-events: none;
  }
  .sureBtn{
    width:Px(674);
    height:Px(88);
    line-height:Px(88);
    text-align:center;
    background:linear-gradient(0deg,rgba(43,96,255,1),rgba(46,148,255,1));
    border-radius:Px(10);
    margin: Px(50) auto;
    color:white;
    font-size:Px(32)
  }
</style>

