<template>
  <div class="content">
    <div class="body">
      <div class="top">
        <!-- <img class="icon-logo" src="./img/icon_logo.png" alt=""> -->
        <!-- <img src="./img/pic_top.png" alt=""> -->
        <div class="title" :style="`padding-top:${native.statusBarHeight + 20}px`">
        　我的
        <!--<a @click="$router.push('/set')"></a>-->
        </div>
        <!--<div class="info-box_">-->
        <!--<a style="border-right: #b0b0b0 1px solid;" @click="$router.push('/memb/info')">-->
        <!--<img  src="./img/icon1.png" alt="">-->
        <!--<p>我的认证</p>-->
        <!--</a>-->
        <!--<a @click="$router.push('/loan/record')">-->
        <!--<img src="./img/about.png" alt="">-->
        <!--<p>我的账单</p>-->
        <!--</a>-->
        <!--</div>-->
      </div>
      <div class="info-box_">
        <img src="./img/denglu.png">
        <div v-if="userInfo.vid">
          <div class="phone">{{ userInfo.mobile.slice(0, 3) }} **** {{userInfo.mobile.slice(-4)}}</div>
          <!--<div class="num">可借额度（元）：<em> {{ userInfo.quota }}</em></div>-->
        </div>
        <div  v-else>
          <div>您好！请先登录</div>
        </div>
        <!--<a @click="$router.push('/memb/info')">-->
        <!--<img  src="./img/icon1.png" alt="">-->
        <!--<p>我的认证</p>-->
        <!--</a>-->
        <!--<a @click="$router.push('/repay')">-->
        <!--<img  src="./img/icon2.png" alt="">-->
        <!--<p>我的还款</p>-->
        <!--</a>-->
        <!--<a @click="goMyBank">-->
        <!--<img  src="./img/icon3.png" alt="">-->
        <!--<p>我的银行卡</p>-->
        <!--</a>-->
        <!--<em @click="$router.push('/set')">设置</em>-->
      </div>
      <group class="group-box group-boxs">
        <cell is-link title="认证中心"  @click.native="$router.push('/memb/info')">
          <img class="icon-box icon-index" slot="icon" src="./img/icon_data.png" alt="">
        </cell>
        <cell is-link title="我的借款"  @click.native="$router.push('/loan/record')">
          <img class="icon-box icon-index" slot="icon" src="./img/icon_data1.png" alt="">
        </cell>
      </group>
      <group class="group-box">


        <cell is-link title="我的银行卡" @click.native="goMyBank">
          <img class="icon-box icon-bank" slot="icon" src="./img/icon3.png" alt="">
        </cell>
        <cell is-link title="客服中心" @click.native="$web2app('phone',{number: customPhone})">
          <img class="icon-box icon-bank" slot="icon" src="./img/icon_service.png" alt="">
        </cell>
        <cell is-link title="用户反馈" @click.native="goFeedback">
          <img class="icon-box" slot="icon" src="./img/feedback.png" alt="">
        </cell>
        <cell is-link title="提现记录"  @click.native="$router.push('/loan')">
          <img class="icon-box icon-index" slot="icon" src="./img/icon_data2.png" alt="">
        </cell>
        <cell is-link  title="设置" @click.native="$router.push('/set')">
          <img class="icon-box" slot="icon" src="./img/pwd.png" alt="">
        </cell>
        <!--<cell is-link title="常见问题" @click.native="$router.push('/my/news')">-->
        <!--<img class="icon-box icon-bank" slot="icon" src="./img/icon2.png" alt="">-->
        <!--</cell>-->

      </group>
      <!--<group class="group-box">-->
      <!--<cell is-link title="联系客服" @click.native="$web2app('phone',{number: customPhone})">-->
      <!--<img class="icon-box" slot="icon" src="./img/icon_service.png" alt="">-->
      <!--</cell>-->
      <!--<cell is-link  title="设置" @click.native="$router.push('/set')">-->
      <!--<img class="icon-box" slot="icon" src="./img/pwd.png" alt="">-->
      <!--</cell>-->
      <!--<cell is-link title="信用报告" @click.native="$router.push('/memb/info')">-->
      <!--<img class="icon-box icon-index" slot="icon" src="./img/icon1.png" alt="">-->
      <!--&lt;!&ndash;<div class="unfinish" v-if="!attestation" style="display:flex;align-items: center;">&ndash;&gt;-->
      <!--&lt;!&ndash;<x-icon type="ios-information" size="16"></x-icon>&ndash;&gt;-->
      <!--&lt;!&ndash;<span class="label-right">未完成</span>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="finish" v-else style="display:flex;align-items: center;">&ndash;&gt;-->
      <!--&lt;!&ndash;<x-icon type="ios-checkmark" size="16"></x-icon>&ndash;&gt;-->
      <!--&lt;!&ndash;<span class="label-right">已完成</span>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash; <div class="enterBtn"></div> &ndash;&gt;-->
      <!--</cell>-->

      <!--<cell is-link title="关于我们" @click.native="goAbout">-->
      <!--<img class="icon-box" slot="icon" src="./img/about.png" alt="">-->
      <!--</cell>-->



      <!--<cell is-link title="退出" @click.native="signOut">-->
      <!--<img class="icon-box" slot="icon" src="./img/exit.png" alt="">-->
      <!--</cell>-->
      <!--</group>-->
      <!--<div class="banner-box">-->
      <!--&lt;!&ndash; <img src="./img/pic_banner.png" alt=""> &ndash;&gt;-->
      <!--<em @click="signOut">退出</em>-->
      <!--</div>-->
    </div>
    <div class="mybtn" @click="$router.push('/')" >
      <img  src="./img/mybtn.png" width="100%">
    </div>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    components: {
      Group,
      Cell
    },
    data() {
      return {
        customPhone: '',
        attestation: this.$store.state.attestation,
      }
    },
    created() {
      this.getInfo()
      this.getcustomPhone()
      this.detail()
    },
    computed: {
      userInfo(){
        return this.$store.state.userInfo;
        //   return {vid: 'ewrfewr43fdsa32', mobile: ''};
      }
    },
    methods: {
      getInfo() {
        this.$http({
          methods:'post',
          url:'/user/info'
        })
          .then((data) => {
            this.$vux.loading.hide()
            if(data.data.status === 0){
              this.$store.state.userInfo = data.data.data;
              this.phone = data.data.data.mobile
            } else {

            }
          });
      },
      getcustomPhone(){
        this.$http({
          methods:'get',
          url:'index/customerMobile'
        })
          .then((data) => {
            if (data.data.data != null) {
              this.customPhone = data.data.data.mobile
            }
          })
      },
      detail(){
        this.$http({
          methods:'post',
          url:'auth/detail'
        })
          .then((data) => {
            if (data.data.data != null) {
              this.attestation = data.data.data.baseInfo == 3 && data.data.data.idCard == 3 && data.data.data.mobOperator == 3 && data.data.data.contact == 3 && data.data.data.bank == 3;
              this.$store.state.attestation =  data.data.data.baseInfo == 3 && data.data.data.idCard == 3 && data.data.data.mobOperator == 3 && data.data.data.contact == 3 && data.data.data.bank == 3;
            }
          })
      },
      goLoan(){

        // this.userInfo.quota !== null && this.userInfo.quota !== 0 &&
        if (this.userInfo.auditor_state !== 0 && this.userInfo.auditor_state !== 1) {
          this.$router.push("/loan")
        } else {
          this.$vux.confirm.show({
            title: '提示',
            content: '请先完成信用资料审核再进行提现',
            onConfirm: () => {
              this.$router.push("/memb/info")
            },
            onCancel: () => {
            }
          })
        }
      },
      signOut(){
        this.$web2app('logOut',{callback:true})
        this.$web2app('openAppPage',{name:'login'})
      },
      gofindPwd(){
        this.$web2app('openAppPage',{name:'findPwd'})
      },
      goFeedback() {
        this.$router.push('/memb/feedback/list')
      },
      goAbout(){
        this.$router.push("about")
      },
      goMyBank() {
        this.$router.push('memb/my/bank')
      }
      ,
      goLogin() {
        this.$router.push('/login')
      },
      goShezhi() {
        this.$router.push('/my/set')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    .mybtn{
      width: Px(144);
      position: fixed;
      right: 0;
      bottom: Px(20);
      z-index: 99999;
    }
    padding-bottom: Px(50);
    .info-box_{
      border-radius:Px(10) Px(10) 0 0!important;
      box-shadow: 0 0 .2rem 1px rgba(#000, .1);
      z-index: 999;
      text-align: center;
      overflow: hidden;
      margin: 0 auto;
      width: Px(682);
      height: Px(227);
      background: #fff;
      left: Px(33);
      img{
        width: Px(90);
        display: block;
        margin: Px(35) auto Px(10);
      }
      >div{
        display: inline-block;
        font-size: Px(40);
        color: #333333;
        line-height: Px(70);
      }
      a{
        height: Px(140);
        margin: 0;
        display: block;
        width: 33.3333%;
        float: left;
        text-align: center;
        h3{
          color: #ff3c00;
          font-size: Px(28);
          font-weight: normal;
        }
        p{
          color: #FF6666;
          font-size: Px(28);
          font-weight: normal;
          line-height: Px(20);
        }
      }
      em{
        color: #333333;
        font-size: Px(26);
        display: block;
        width: Px(102);
        height: Px(90);
        line-height:Px(90);
        text-align: center;
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    //   position: absolute;
    //   top: 0;
    //   right: 0;
    //   bottom: 1.3rem;
    width: 100%;
    overflow: auto;
    color: #333;
    background: -webkit-linear-gradient(0deg, #FC735E, #E8413A);
    img{
      display: block;
      width: 100%;
    }
  }
  .body{
    background: -webkit-linear-gradient(0deg,  #FC735E, #E8413A);
    // position: absolute;
    // top: 0;
    width: 100%;
  }
  .top{
    background: -webkit-linear-gradient(0deg, #FC735E, #E8413A);
    position: relative;
    width: 100%;

    padding-bottom: Px(0);
    overflow: hidden;

    .icon-logo{
      position: absolute;
      top: .5rem;
      left: 0;
      right: 0;
      width: 2.8rem;
      // height: 1.2rem;
      margin: auto;
    }
    img{
      width: 100%;
    }
    .title{
      // width: 100%;
      text-align: center;
      line-height:Px(40);
      margin-bottom: Px(20);
      color: #fff;
      // background-color: #fff;
      padding: 50px .4rem 0;
      // font-weight: bold;
      font-size: .44rem;
      letter-spacing: 1px;

      a{
        display: block;
        width: Px(37);
        height: Px(37);
        float: right;
        background: url('./img/shezhi.png') no-repeat;
        background-size: 100%;
      }
    }

    .info-box{
      border-radius: .2rem;
      text-align: center;
      color: #fff;
      text-align: center;
      font-size: .32rem;
      min-height: 1.6rem;
      position: relative;
      margin: Px(0) auto 0;
      img{
        width: Px(122); position: absolute; left:50%; margin-left: Px(-61); top: Px(25);
      }
      >div{
        position: absolute;
        left: Px(0);
        top: Px(155);
        text-align: center;
        line-height: Px(46);
        color: #ffffff;
        font-size: Px(30);
        width: 100%;
        >a{
          color: #ff3c00;
          float: left;
          font-size: Px(29);
          line-height: Px(46);
          border-radius: Px(34);
          background: #fff;
          font-style: normal;
          text-decoration: none;
          padding: 0 Px(25);
          margin: Px(15) 0 Px(15) Px(100);
        }
      }
      .phone{
        color: #ffffff;
        font-size: Px(35);
      }
      .num{
        // margin-top: .15rem;
        em{
          font-size: .4rem;
        }
      }
      ul{
        position: absolute;
        left: 0;
        top: Px(172);
        width: 100%;
        li{
          float: left;
          width: 30%;
          text-align: left;
          line-height: Px(46);
          color: #000000;
          font-size: Px(28);
          position: relative;
          padding-left: 20%;
          img{
            display: block;
            width: .45rem;
            height: auto;
            position: absolute;
            top: 0.05rem;
            left: 1.1rem;
          }
        }
      }
    }
  }
  .group-boxs{
    border-radius:0 0 Px(10) Px(10)!important;
  }

  .group-box{
    margin: 0rem Px(35) 0rem;
    overflow: hidden;
    background: #fff;
    border-radius: Px(10);
    h3{ color: #121212; font-size: Px(28); font-weight: normal; margin-bottom: Px(20)}
    .icon-box{
      margin-left: Px(30);
      margin-right: .2rem;
      display: block;
      width: auto;
      height: Px(40);
      text-align: center;
      &.icon-bank{
        width: Px(40);
        height: auto;
      }
      &.icon-index{
        width: Px(40);
        height: auto;
      }
    }

  }
  .banner-box{
    margin: .3rem;
    img{
      display: block;
      width: 100%;
    }
    em{
      display: block;
      width: Px(600);
      height: Px(77);
      margin: Px(10) auto;
      color: #fff;
      text-align: center;
      font-size: Px(30);
      line-height: Px(77);
      border-radius: Px(40);
      background: #fb8e3b;
      margin-bottom: Px(60);
    }
  }
  .label-right{
    font-size: .35rem;
    color: #333;
  }
  .unfinish .vux-x-icon {
    fill: #FF4F4F;
  }
  .finish .vux-x-icon{
    fill: rgb(46,206,99);
  }
</style>
<style lang="scss">
  .group-box{
    margin-bottom: Px(30)!important;
    .weui-cell{
      padding-left: .4rem !important;
      padding-right: .4rem !important;
      padding:Px(30) 0 !important;;
      border-top: none!important;
      width: 50%;
      float: left;
    }
    .weui-cells{
      margin: 0 Px(10) !important;
      background:none!important;
      border-radius: Px(20);
    }
    .weui-cells:before{
      height: 0 !important;
      border: none;
      display: none!important;
      border: none!important;
    }
    .weui-cells:after{
      border: none;
      display: none;
    }
    .vux-label{
      font-size:Px(25)!important;
      color: #000000!important;
    }
    .weui-cell_access .weui-cell__ft:after{
      border-color: #999 !important;
      right:Px(35)!important;
      display: none;
    }
  }


  .weui-cell:before{
    height: 0 !important;
    border: none;
    display: none!important;
    border: none!important;
  }
</style>

<style>
  body{
    background: #fff!important;
  }
</style>
