<template>
  <div class="auth_box">
    <div class="auth_header">
    </div>
    <!-- auth_header -->
    <div class="auth_content">
      <h1>必要信息验证<em class="remark txt_red">(必填)</em></h1>
      <p class="subtitle mt50">完成下列必要信息后即可自动获取借款额度</p>
      <div class="info_content_box">
        <i class="icon"><img src="../simple/images/user.png" alt=""></i>
        <span>个人资料</span>
        <span class="txt_right">未完善</span>
        <i class="icon_right iconfont icon-enter"></i>
      </div>
      <!-- info_content_box -->
      <div class="info_content_box">
        <i class="icon"><img src="../simple/images/ambulation.png" alt=""></i>
        <span>紧急联系人</span>
        <span class="txt_right">未完善</span>
        <i class="icon_right iconfont icon-enter"></i>
      </div>
      <!-- info_content_box -->
      <div class="info_content_box">
        <i class="icon"><img src="../simple/images/work.png" alt=""></i>
        <span>工作认证</span>
        <span class="txt_right">未完善</span>
        <i class="icon_right iconfont icon-enter"></i>
      </div>
      <!-- info_content_box -->
      <div class="info_content_box">
        <i class="icon"><img src="../simple/images/mobile.png" alt=""></i>
        <span>手机运营商</span>
        <span class="txt_right">未完善</span>
        <i class="icon_right iconfont icon-enter"></i>
      </div>
      <!-- info_content_box -->
      <div class="info_content_box">
        <i class="icon"><img src="../simple/images/taobao.png" alt=""></i>
        <span>淘宝认证</span>
        <span class="txt_right">未完善</span>
        <i class="icon_right iconfont icon-enter"></i>
      </div>
      <!-- info_content_box -->
      <div class="info_content_box">
        <i class="icon"><img src="../simple/images/alipay.png" alt=""></i>
        <span>支付宝认证</span>
        <span class="txt_right">未完善</span>
        <i class="icon_right iconfont icon-enter"></i>
      </div>
      <!-- info_content_box -->
      <div class="info_content_box">
        <i class="icon"><img src="../simple/images/bank.png" alt=""></i>
        <span>收款银行卡</span>
        <span class="txt_right">未完善</span>
        <i class="icon_right iconfont icon-enter"></i>
      </div>
      <!-- info_content_box -->
    </div>
    <!-- auth_content -->
    <div class="fix_btm_btn">
      <span>
        <img src="../simple/images/reporting.png" alt="">
        <p class="txt_center active">征信</p>
      </span>
      <span>
        <img src="../simple/images/msg.png" alt="">
        <p class="txt_center active">消息</p>
      </span>
    </div>
  </div>
</template>

<script>
import { XProgress } from 'vux'
  export default {
    components: {
      XProgress,
    },
    data() {
      return {
      }
    }
  }
</script>
<style lang="scss" scoped>
  .top{
    height:Px(520);
    background: $maincolor;
    text-align: center;
    color:white;
    font-size:Px(28);
    .progressName{
      padding-top:Px(120);
      margin-bottom:Px(20)
    }
    .num{
      font-size:Px(46);
    }
    .progress{
      width:Px(495);
      margin:0 auto;
      margin-top:Px(50)
    }
  }
</style>

<style lang="scss" scoped>
  .auth_box{
    .auth_header{
      position: relative;
      width: auto;
      height: Px(326);
      background: linear-gradient(180deg, $maincolor, $maincolor2);
      background: -moz-linear-gradient(180deg, $maincolor, $maincolor2);
      background: -o-linear-gradient(180deg, $maincolor, $maincolor2);
    //   background: url('./img/pic_top.png') center no-repeat;
      background-size: 100% 100%;
    //   &::after{
    //     display: block;
    //     content: '';
    //     position: absolute;
    //     z-index: 1;
    //     bottom:  Px(-28);
    //     height: Px(56);
    //     width: Px(750);
    //     background: $maincolor2;
    //     border-radius: 0 0 120% 120%;
    //     overflow: hidden;
    //   }
    }
    .auth_content{
      position: relative;
      z-index: 2;
      margin: Px(-150) auto 0;
      padding: Px(30) Px(48) 0;
      width: Px(680);
      height: auto;
      background: #fff;
      box-shadow: 0 0 .2rem 1px rgba(#000, .1);
      border-radius: Px(8);
      & h1{
        font-size: Px(30);
        line-height: Px(50);
        .remark{
          font-size: Px(20);
        }
      }
      & .subtitle{
        font-size: Px(20);
        line-height: Px(40);
        color: #999;
      }
      .info_content_box{
        position: relative;
        padding-left: Px(60);
        display: flex;
        height: Px(80);
        flex-direction: row;
        flex-wrap: nowrap;
        .icon{
          position: absolute;
          top: Px(17);
          left: 0;
          display: block;
          width: Px(50);
          height: Px(50);
          & img{
            display: block;
            max-width: 100%;
            max-height: 100%;
          }
        }
        .icon_right{
          display: block;
          position: absolute;
          top: Px(20);
          right: Px(-30);
          width: Px(16);
          height: Px(16);
        }
        & span{
          position: relative;
          font-size: Px(24);
          line-height: Px(80);
          color: #333;
          flex-basis: 70%;
          & :first-child{
            flex-basis: 30%;
          }
        }
      }
    }
    .fix_btm_btn{
      position: fixed;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      left: 0;
      bottom: 0;
      width: 100%;
      background: #F7F7F7;
      border-top:  1px solid #E0E0E0;
      & span{
        flex-basis: 50%;
        height: Px(90);
        text-align: center;
        font-size: Px(24);
        line-height: Px(90);
        & img{
          display: block;
          width: Px(50);
          height: Px(50);
          margin: Px(8) auto 0;
        }
        &>p{
          font-size: Px(20);
          line-height: 1.5;
          color: #999
        }
        &.active{
          color: #032791;
        }
      }
    }
    .mt50{
      margin-bottom: Px(50);
    }
  }
</style>

<style scoped>
  * {
    padding: 0;
    margin: 0; 
    box-sizing: border-box
  }
  .txt_red{
    color: #FD2C1C;
  }
  .txt_right{
    text-align: right;
  }
  .txt_center{
    text-align: center;
  }
</style>



