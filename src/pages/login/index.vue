<template>
  <div>
    <div class="content">
      <h3>密码登录</h3>
      <h4>欢迎使用</h4>
      <p class="item">
        <input type="text" class="input-item" placeholder="输入手机号码" v-model="tel" maxlength="11">
      </p>
      <p class="item">
        <input type="password" class="input-item" placeholder="请输入6至16位字母和数字(两种组合)" v-model="password" maxlength="16" v-show="pass" >
        <input type="text" class="input-item" placeholder="请输入6至16位字母和数字(两种组合)" v-model="password" maxlength="16" v-show="!pass">
        <em v-bind:class="{cur:pass}" @click="onstatusv()"></em>
      </p>
    </div>
    <div class="register-btn" @click="registe">
              登录
    </div>
    <p class="title">登录即同意《黑桃A服务协议》</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tel: '13322221111',
        password: '123456',
        pass : true
      }
    },
    methods:{
      registe(){
        this.$http({
          methods: "post",
          url:'index/login',
          data:{
            type:1,
            emulator:1,
            mobroot:1,
            mobile:this.tel,
            pwd:this.password
          }
        })
        .then(({data})=>{
          console.log(data)
          if(data.status === 0){
            sessionStorage.setItem('vid',data.data.vid)

          }else{
            this.$toast({
              message:data.msg
            })
          }

        })

      },
      onstatusv : function() {
        this.pass=!this.pass;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content h3{
     color: #000000;
     font-size: Px(48);
    line-height:Px(64);
    padding-left: Px(25);
    margin-top: Px(50);
    font-weight: normal;
  }
  .content h4{
    color: #858585;
    font-size: Px(25);
    line-height:Px(50);
    padding-left: Px(25);
    margin-bottom: Px(130);
    font-weight: normal;
  }
.item{
    margin: Px(30) auto;
    width: Px(565);
    height: Px(70);
    position: relative;
    .input-item{
      float: left;
      width: Px(500);
      height: Px(70);
      border: none;
      color: #000;
      border-bottom:Px(2) solid #f6f6f6;
      outline: 0;
      padding-left: Px(65);
      font-size: Px(24);
    }
    em {
      display: block;
      width: 0.4rem;
      height: 0.26rem;
      position: absolute;
      bottom: 0.4rem;
      right: 0.12rem;
      background: url(../img/icon_Login_Password_01.png) no-repeat;
      background-size: 100%;
    }
    .cur {
      background: url(../img/icon_Login_Password_02.png) no-repeat;
      background-size: 100%;
    }
}
.register-btn{
  width: Px(565);
  height: Px(85);
  margin: Px(60) auto;
  color: #fff;
  background:  linear-gradient(to right, #fa5c00, #fa7e00);
  text-align: center;
  line-height: Px(85);
  font-size: Px(30);
  border-radius: Px(40);
  margin-top: Px(80);
}
  .title{
    color: #f03104;
    font-size: Px(25);
    text-align: center;
  }


</style>
