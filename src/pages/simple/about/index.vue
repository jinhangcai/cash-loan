<template>
  <div class="about_box">
    <div class="about_content">
      <!-- <img src="../images/logo.jpg" alt=""> -->
      <div class="logo">
        <img class="icon-logo" src="../images/logo.png" alt="">
        <div>{{$appName}}</div>
        <p class="vesion-center">版本信息V{{version}}</p>
        <!--<div>-->
          <!--本产品是针对有稳定工作且信用状况良好的自然人，提供小额信用借款的咨询服务平台，满足该类人群的短期资金需求，属于无抵押无担保的信用型借款产品。本产品提供1000-3000元不等的小额借款，7天借款周期，具有随借随还的灵活便捷性特点。本产品采用互联网大数据风控审核系统，快速审核，到账速度快-->
        <!--</div>-->
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
        width: Px(200);
        margin: auto;
        text-align: center;
        font-size: Px(24);
        color: #000000;
        text-align: center;
        img{
          width: 100%;
          margin-bottom: .2rem;
          height: auto;
          box-shadow: 0 0 .2rem 1px rgba(#000, .1);
          border-radius: .5rem;
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


