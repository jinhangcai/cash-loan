<template>
  <div class="content">
      <div class="body">
          <div class="top">
<!--         <img class="icon-logo" src="./img/icon_logo.png" alt=""> -->
        <!-- <img src="./img/pic_top.png" alt=""> -->
        <div class="title" :style="`padding-top:${native.statusBarHeight + 15}px`">
          　我的
          <a @click="$router.push('/set')"></a>
        </div>

        <!--<div class="info-box_">-->
            <!--<ul>-->
              <!--<li @click="$router.push('/memb/info')">-->
                <!--<img  src="./img/icon1.png" alt="">-->
                <!--<p>我的认证</p>-->
              <!--</li>-->
              <!--<li @click="$web2app('phone',{number: customPhone})">-->
                <!--<img  src="./img/icon_service.png" alt="">-->
                <!--<p>客服中心</p>-->
              <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
            <div class="info-box">
              <img src="../my/img/login.png">
              <div v-if="userInfo.vid">
                <div class="phone">{{ userInfo.mobile.slice(0, 3) }} **** {{userInfo.mobile.slice(-4)}}</div>
                <!--<div class="num">可借额度（元）：<em> {{ userInfo.quota }}</em></div>-->
              </div>
              <div  v-else>
                <div>您好！请先登录</div>
              </div>
            </div>
<!--            <div class="info-box_">-->
<!--              <div v-if="userInfo.vid">-->
<!--                <div class="phone">{{ userInfo.mobile.slice(0, 3) }} **** {{userInfo.mobile.slice(-4)}}</div>-->
<!--                &lt;!&ndash;<div class="num">可借额度（元）：<em> {{ userInfo.quota }}</em></div>&ndash;&gt;-->
<!--              </div>-->
<!--              <div  v-else>-->
<!--                <div>您好！请先登录</div>-->
<!--              </div>-->
<!--              &lt;!&ndash;<a @click="$router.push('/memb/info')">&ndash;&gt;-->
<!--                &lt;!&ndash;<img  src="./img/icon1.png" alt="">&ndash;&gt;-->
<!--                &lt;!&ndash;<p>我的认证</p>&ndash;&gt;-->
<!--              &lt;!&ndash;</a>&ndash;&gt;-->
<!--              &lt;!&ndash;<a @click="$router.push('/repay')">&ndash;&gt;-->
<!--                &lt;!&ndash;<img  src="./img/icon2.png" alt="">&ndash;&gt;-->
<!--                &lt;!&ndash;<p>我的还款</p>&ndash;&gt;-->
<!--              &lt;!&ndash;</a>&ndash;&gt;-->
<!--              &lt;!&ndash;<a @click="goMyBank">&ndash;&gt;-->
<!--                &lt;!&ndash;<img  src="./img/icon3.png" alt="">&ndash;&gt;-->
<!--                &lt;!&ndash;<p>我的银行卡</p>&ndash;&gt;-->
<!--              &lt;!&ndash;</a>&ndash;&gt;-->
<!--            </div>-->
        </div>
        <div class="box-list-cen">
          <div class="box-list-cen1">
            <a href="javascript:;" @click="$router.push('/memb/info')">我的认证</a>
            <a href="javascript:;"  @click="$web2app('phone',{number: customPhone})">客服中心</a>
          </div>
        </div>
        <group class="group-box">

          <cell is-link title="提现记录"  @click.native="$router.push('/loan')">
            <img class="icon-box icon-index" slot="icon" src="./img/icon1.png" alt="">
          </cell>
          <cell is-link title="我的还款" @click.native="gorepayback">
            <img class="icon-box" slot="icon" src="./img/icon2.png" alt="">
          </cell>
          <cell is-link title="用户反馈" @click.native="goFeedback">
            <img class="icon-box" slot="icon" src="./img/icon3.png" alt="">
          </cell>
          <cell is-link title="我的银行卡" @click.native="goMyBank">
            <img class="icon-box icon-bank" slot="icon" src="./img/icon4.png" alt="">
          </cell>
          <cell is-link title="联系客服" @click.native="$web2app('phone',{number: customPhone})">
          <img class="icon-box" slot="icon" src="./img/icon5.png" alt="">
          </cell>
          <cell is-link title="我的借款"  @click.native="$router.push('/loan/record')">
          <img class="icon-box icon-index" slot="icon" src="./img/icon6.png" alt="">
          </cell>


          <!--          <cell is-link title="实名认证" @click.native="$router.push('/memb/info')">-->
<!--          <img class="icon-box icon-index" slot="icon" src="./img/icon1.png" alt="">-->
          <!--<div class="unfinish" v-if="!attestation" style="display:flex;align-items: center;">-->
          <!--<x-icon type="ios-information" size="16"></x-icon>-->
          <!--<span class="label-right">未完成</span>-->
          <!--</div>-->
          <!--<div class="finish" v-else style="display:flex;align-items: center;">-->
          <!--<x-icon type="ios-checkmark" size="16"></x-icon>-->
          <!--<span class="label-right">已完成</span>-->
          <!--</div>-->
          <!-- <div class="enterBtn"></div> -->
<!--          </cell>-->
<!--          <cell is-link title="我的借款"  @click.native="$router.push('/loan/record')">-->
<!--          <img class="icon-box icon-index" slot="icon" src="./img/icon_datas.png" alt="">-->
<!--          </cell>-->



          <!--<cell is-link title="常见问题" @click.native="$router.push('/my/news')">-->
          <!--<img class="icon-box icon-bank" slot="icon" src="./img/icon2.png" alt="">-->
          <!--</cell>-->

        </group>
<!--        <group class="group-box">-->
<!--          <cell is-link title="联系客服" @click.native="$web2app('phone',{number: customPhone})">-->
<!--            <img class="icon-box" slot="icon" src="./img/icon_service.png" alt="">-->
<!--          </cell>-->
<!--          <cell is-link title="用户反馈" @click.native="goFeedback">-->
<!--            <img class="icon-box" slot="icon" src="./img/feedback.png" alt="">-->
<!--          </cell>-->

<!--        </group>-->
<!--        <group class="group-box">-->
<!--        <cell is-link  title="设置" @click.native="$router.push('/set')">-->
<!--          <img class="icon-box" slot="icon" src="./img/pwd.png" alt="">-->
<!--        </cell>-->
<!--        </group>-->

        <!--<group class="group-box">-->
          <!--&lt;!&ndash;<cell is-link title="联系客服" @click.native="$web2app('phone',{number: customPhone})">&ndash;&gt;-->
            <!--&lt;!&ndash;<img class="icon-box" slot="icon" src="./img/icon_service.png" alt="">&ndash;&gt;-->
          <!--&lt;!&ndash;</cell>&ndash;&gt;-->
          <!--&lt;!&ndash;<cell is-link  title="设置" @click.native="$router.push('/set')">&ndash;&gt;-->
            <!--&lt;!&ndash;<img class="icon-box" slot="icon" src="./img/pwd.png" alt="">&ndash;&gt;-->
          <!--&lt;!&ndash;</cell>&ndash;&gt;-->


        <!--&lt;!&ndash;<cell is-link title="关于我们" @click.native="goAbout">&ndash;&gt;-->
            <!--&lt;!&ndash;<img class="icon-box" slot="icon" src="./img/about.png" alt="">&ndash;&gt;-->
        <!--&lt;!&ndash;</cell>&ndash;&gt;-->

        <!---->

        <!--&lt;!&ndash;<cell is-link title="退出" @click.native="signOut">&ndash;&gt;-->
            <!--&lt;!&ndash;<img class="icon-box" slot="icon" src="./img/exit.png" alt="">&ndash;&gt;-->
        <!--&lt;!&ndash;</cell>&ndash;&gt;-->
        <!--</group>-->
        <!--<div class="banner-box">-->
        <!--&lt;!&ndash; <img src="./img/pic_banner.png" alt=""> &ndash;&gt;-->
          <!--<em @click="signOut">退出</em>-->
        <!--</div>-->
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
    gorepayback() {
      this.$router.push("/repay")
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
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 1.3rem;
  width: 100%;
  overflow: auto;
  color: #333;
  img{
      display: block;
      width: 100%;
  }
}
.body{
    // position: absolute;
    // top: 0;
    width: 100%;
}
.top{
  background:#fff url('./img/pic_top.png') 0 0 no-repeat;
  background-size: 100% auto;
  position: relative;
  width: 100%;
  height:Px(438);
  /*padding-bottom: Px(200);*/
  /*margin-bottom: Px(70);*/
  .info-box_{
    width: Px(744);
    height: Px(247);
    position: absolute;
    left: Px(3);
    bottom:Px(-75);
    background:url('./img/mybg.png')no-repeat;
    background-size: 100% auto;
    z-index: 999;
    text-align: center;
    img{
      width: Px(128);
      display: inline-block;
      position: absolute;
      left: Px(37);
      top:Px(39)
    }
    >div{
      text-align: left;
      display: inline-block;
      position: absolute;
      left: Px(203);
      top:Px(56);
      font-size: Px(40);
      color: #333;
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
  }
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
    font-size: .32rem;
    min-height: 1.6rem;
    position: relative;
    margin: Px(0) auto 0;
    img{
      width: Px(105);
      text-align: center;
      margin: Px(20) auto 0;
    }
    >div{
      /*position: absolute;*/
      /*left: Px(120);*/
      /*top: Px(6);*/
      /*text-align: left;*/
      line-height: Px(56);
      text-align: center;
      color: #fff;
      font-size: Px(40);
      margin-top:Px(30);
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
      font-size: .52rem;
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
.box-list-cen{
  /*background: #fff;*/
  width:100%;
  padding-bottom:Px(20);
  margin-top:Px(-40);
  z-index:2;
  position:relative;
  .box-list-cen1{
    width:Px(710);
    background: #fff;
    border-radius:Px(30);
    box-shadow:0px 5px 10px 0px rgba(0, 0, 0, 0.1);
    line-height:Px(70);
    height:Px(70);
    margin:0 auto;
    a{
      width:49.2%;
      text-align: center;
      color:#ff3838;
      display:inline-block;
      text-decoration: black;
    }
  }
}

.group-box{
  margin: 0rem 0rem .3rem;
  overflow: hidden;
  border-radius: .1rem;
  //   box-shadow: 0 0px 10px 1px rgba(#000, .1);
  background-color: #f6f4f7!important;
  h3{ color: #121212; font-size: Px(28); font-weight: normal; margin-bottom: Px(20)}
  .icon-box{
    margin-left: Px(35);
    margin-right: .4rem;
    display: block;
    width: auto;
    height: Px(44);
    &.icon-bank{
      width: Px(44);
      height: auto;
    }
    &.icon-index{
      width: Px(44);
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
    .weui-cell{
      padding-left: .4rem !important;
      padding-right: .4rem !important;
      padding:Px(30) 0 !important;;
      border-top: none!important;
    }
    .weui-cells{
      margin: 0 !important;
      background-color: #fff !important;
    }
    .weui-cells:before{
      height: 0 !important;
      border: none;
    }
    .weui-cells:after{
      border: none;
    }
    .vux-label{
      font-size:Px(30)!important;
      color: #000000!important;
    }
    .weui-cell_access .weui-cell__ft:after{
      border-color: #999 !important;
      right:Px(35)!important;
    }
  }
</style>

<style>
  body{
    background: #fff !important;
  }
</style>
