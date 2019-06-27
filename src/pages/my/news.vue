<template>
  <div class="box">
    <ul class="boxul">
      <li class="cur" @click="onshow">
        <i></i>
        <a href="#">
          <span>系统审核时间？</span>
          <p>一般在5-15分钟，实际以您界面显示时间为准；</p>
        </a>
      </li>
      <li class="cur" @click="onshow">
        <a href="#">
          <i></i>
          <span>申请条件？</span>
          <p>年龄在18-60周岁，具由完全民事能力即可；</p>
        </a>
      </li>
      <li class="cur" @click="onshow">
        <a href="#">
          <i></i>
          <span>贷款到账时间？</span>
          <p>2小时内，实际以银行卡到账时间为准；</p>
        </a>
      </li>
      <li class="cur" @click="onshow">
        <a href="#">
          <i></i>
          <span>如何修改手机号？</span>
          <p>目前不支持手机号的修改；</p>
        </a>
      </li>
      <li class="cur" @click="onshow">
        <a href="#">
          <i></i>
          <span>是否可以绑定多张卡？</span>
          <p>可以同时绑定3张卡，默认第1张卡为放款使用，目前不支持解绑换卡；</p>
        </a>
      </li>
      <li class="cur" @click="onshow">
        <a href="#">
          <i></i>
          <span>我的个人信息是否会泄露？</span>
          <p>我们拥有严格的风控保密规则，不会泄露您的信息；</p>
        </a>
      </li>
      <li class="cur" @click="onshow">
        <a href="#">
          <i></i>
          <span>我的订单没有通过，能否再次申请？</span>
          <p>1天内限申请1笔，可隔天再申请；</p>
        </a>
      </li>
      <li class="cur" @click="onshow">
        <a href="#">
          <i></i>
          <span>如果我逾期了怎么办？</span>
          <p>请尽快处理，我们会追究逾期人员，会有专门人员对其进行跟踪，影响其个人信用；</p>
        </a>
      </li>
      <li class="cur" @click="onshow">
        <a href="#">
          <i></i>
          <span>还款失败了怎么办？</span>
          <p>若您操作还款失败，请联系客服人员通过线下转账的方式进行还款；</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { Base64 } from 'js-base64'
  import native from '@/service/native'
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods:{
      onshow(){


      }

    }
  }
</script>

<style lang="scss" scoped>
  .box{
    width: 100%;
    height: 100%;
    padding-top: Px(0);
    overflow: hidden;
    h3{
      color: #000000;
      font-size: Px(30);
      font-weight: normal;
      text-align: center;
    }
    .boxul{
      margin: Px(0) Px(0);
      li{
        position: relative;
        width: 100%; float: left;
        background: #fff;
        p{
          color: #adadad;
          font-size: Px(24);
          line-height: Px(40);
          float: left;
          padding: 0 Px(40);
          padding-bottom: Px(20);
          display: none;
        }
        span{
          font-style: normal;
          color: #000000;
          font-size: Px(28);
          line-height: Px(88);
          width:Px(620);
          padding-left: Px(40);
          float: left;

        }
        i{
          display: block;
          width: Px(26);
          height:Px(26);
          position: absolute;
          background: url('./img/icon.png') no-repeat;
          background-size: 100%;
          right: Px(35);
          top: Px(35);
          transform:rotate(90deg);
        }
      }
      .cur{
        p{
          display: block;
        }
        i{
          /*background: url('./img/icon_cur.png') no-repeat;*/
          /*background-size: 100%;*/
        }
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
    margin-left: Px(20);
    .information{
      display: flex;
      align-items: center;
      height: Px(115);
      line-height: Px(115);
      border-bottom: 1px #eee solid;
      .icon{

        width: Px(46);
        // margin-top: Px(38);
        margin-right: Px(10);
        img{
          display: block;
          margin: auto;
          width: auto;
          max-width: Px(40);
        }
      }
      .phone{
        img{

          width: Px(30);
          height: auto;
        }
      }
      i{
        // margin-top: Px(47);
        margin-right: Px(20);
        width: Px(12);
        height: Px(21);
        /*background: url(./img/row2.png) no-repeat;*/
        /*background-size: 100% 100%;*/
      }
      .title{
        flex: 1;
        //  width: Px(215);
        color: #333333;
        font-size: Px(30);
      }
      .text{
        flex: 1;
        color: #666;
        margin-right: Px(20);
        text-align: right;
        font-size: Px(24);
      }
    }
  }
  .button{
    width: Px(690);
    height: Px(85);
    margin: Px(150) auto;
    @include main-back;
    color: #fff;
    text-align: center;
    font-size: Px(30);
    line-height: Px(85);
    border-radius: Px(40);
  }
</style>
<style>
  body{
    background: #f7f7f7!important;
  }
</style>
