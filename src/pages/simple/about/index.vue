<template>
  <div class="about_box">
    <div class="about_content">
      <!-- <img src="../images/logo.jpg" alt=""> -->
      <div class="logo">
        <img class="icon-logo" src="../images/logo.png" alt="">
        <div>{{$appName}}</div>
        <p class="vesion-center">版本信息V{{version}}</p>
        <div class="details">
          本公司没有微信公众号，如果逾期客户有催收部门联系，可以联系APP客服确认是否本公司人员，防止被骗！客服唯一<br>QQ：2507070067
        </div>
      </div>
      <!-- logo -->
    </div>
  </div>
  <!-- about_box -->
</template>

<script>
  export default {
    data() {
      return {
        version: '2.0'
      }
    },
    mounted() {
      this.getVersion()
    },
    methods:{
      async getVersion(){
         let data = await this.$web2app('getSystemInfo',{ callback: true })
         this.version = data.version
      }
    }
  }
</script>

<style lang="scss" scoped>
  .about_box{
    width: 100%;
    height: Px(1203);
    /*background: url("../images/aboutbg.png") no-repeat;*/
    /*background-size: 100%;*/
    .about_content{
      position: absolute;
      left: 0;
      top: 20%;
      width: 100%;
      & img{
        display: block;
        width: Px(203);
        height: Px(232);
      }
      & p {
        width: 80%;
        margin: .3rem auto 0;
        font-size: Px(26);
        line-height: 2;
        color: #999;
      }
      .vesion-center{
        text-align: center;
      }
      .logo{
        // width: Px(200);
        margin: Px(40);
        text-align: center;
        font-size: Px(24);
        color: #000000;
        text-align: center;
        img{
          width: Px(200);
          margin: 0 auto .2rem;
          height: auto;
          box-shadow: 0 0 .2rem 1px rgba(#000, .1);
          border-radius: .5rem;
        }
        .details{
          margin-top: Px(30);
          text-align: left;
          color: #999;
          font-size: Px(36);
        }
      }
      .app-name{
        text-align: center;
        font-size: .45rem;
        color: #333;
        margin-top: 0;
      }
    }

  }
</style>


