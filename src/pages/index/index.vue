<template>
    <!-- v1 -->
    <div>

        <left-menu></left-menu>

        <!-- <div class="header-bg">

        <div :style="`height:${native.statusBarHeight}px`" v-if="native.ios"></div>
        <div class="header" >

        </div>
        </div> -->
        <div class="scroll-container" :style="`transform:translate(0, ${native.statusBarHeight})`">
          <scroller ref="scroll" :pullDownRefresh="true" @pullingDown="reload">
            <!--<header-bar title="易提花"></header-bar>-->

            <!--<div class="tips" @click="$web2app('phone',{number: customPhone})">-->
              <!--客服中心-->
              <!--<p>如有问题及时反馈 ></p>-->
            <!--</div>-->
            <div class="box_">
              <!--<div class="title" :style="`padding-top:${native.statusBarHeight + 10}px`">-->
                <!--　易提花-->
                <!--&lt;!&ndash;<a @click="$router.push('/set')"></a>&ndash;&gt;-->
              <!--</div>-->
              <div class="titles">
                温馨提示:请认准APP中官方客服,其他(百度)搜索到的客服都是骗子
              </div>
              <img  src="./index/indexbgs.png" width="100%">
              <div class="box_1">
                <!--<ul class="box_s">-->
                  <!--<li @click="$router.push('/loan/record')">-->
                    <!--<img  src="./index/index_icon1.png" >-->
                    <!--<h5>我的借款</h5>-->
                    <!--<p>查看账单</p>-->
                    <!--<i></i>-->
                  <!--</li>-->
                  <!--<li @click="$router.push('/memb/info')">-->
                    <!--<img  src="./index/index_icon2.png" >-->
                    <!--<h5>实名认证</h5>-->
                    <!--<p>提升额度</p>-->
                    <!--<i></i>-->
                  <!--</li>-->
                <!--</ul>-->
                  <h3>最高可借</h3>
                  <p>￥{{userInfo.valid_quota == null ? 0:userInfo.valid_quota}}</p>
                  <!--<em><img  src="./index/Group1.png" width="100%">7天/14天   <img  src="./index/Group2.png" width="100%">起借金额:2000元</em>-->
                <button class="borrowingBtn" @click="goPerfectInfo(userInfo.auditor_state)">{{changeBtnState(userInfo.auditor_state)}}</button>
              </div>

            </div>

            <!-- <div class="payBtn" @click="goPerfectInfo(userInfo.auditor_state)">{{changeBtnState(userInfo.auditor_state)}}</div> -->


            <div class="loanProject" v-show="loanshow" id="abc"></div>
          </scroller>
        </div>


        <div class="refuseBg" v-show="refuseShow">
            <div class="refuseAlert">
                <div class="refuseLogo"></div>
                <p>本次申请未通过</p>
                <p>24小时后可重新获取额度</p>
                <div class="checkOtherLoan" @click="goMore">查看能借的其他项目</div>
            </div>
        </div>
        <!--  <success :msg="msg" @on-popup="changePopup"></success> -->
        <div class="mask" v-show="popups == 1" @touchmove.prevent>
          <div class="success-box">
            <div class="success-close" @click="ispopup"></div>
            <div class="success-title">{{msg}}</div>
            <div class="success-btn">
              <button class="btn" @click="ispopup">确认</button>
            </div>
          </div>
        </div>
        <div class="mask" v-show="popups == 2" @touchmove.prevent>
          <!-- <error :msg="msg" :order-no="order_no"></error> -->
          <div class="success-boxs">
            <div class="success-close" @click="ispopup"></div>
            <div class="success-title">{{msg}}</div>
            <div class="success-btn">
              <!-- <button class="btns" @click="ispopup">放弃支付</button> -->
              <button class="btns -blue" @click="popups = 0, alipayShow = true">扫码还款</button>
              <!-- <button class="btn" @click="jumpPay">继续支付</button> -->
              <button class="btn" @click="jumpBindBank">更换银行卡支付</button>
              <div class="tip" @click="$web2app('phone',{number: customPhone})">联系客服</div>
            </div>
          </div>
        </div>
        <div class="mask" v-show="alipayShow" @touchmove.prevent @click.self="alipayShow = false, popups = 2">
          <div class="alipay">
            <div class="alipay-close" @click="alipayShow = false, popups = 2"></div>
            <img class="alipay-img" :src="codeUrl">
          </div>
        </div>'
      <div class="indexbtn" title="left(56% width)"@click="show8s" v-model="show8" >
        <img  src="./index/indexbtn.png" width="100%">
      </div>

      <div v-transfer-dom>
        <popup v-model="show8" position="left" width="60%">
          <div class="position-horizontal-demo">
            <div class="mys">
              <div class="info-box_">
                <img src="./index/denglu.png">
                <div v-if="userInfo.vid">
                  <div class="phone">{{ userInfo.mobile.slice(0, 3) }} **** {{userInfo.mobile.slice(-4)}}</div>
                  <!--<div class="num">可借额度（元）：<em> {{ userInfo.quota }}</em></div>-->
                </div>
                <div  v-else>
                  <div>您好！请先登录</div>
                </div>
              </div>
              <ul class="info-box_s">
                <li @click="$router.push('/memb/info')">
                  <img src="./index/icon_i1.png" class="img2">实名认证<i></i>
                </li>
                <li @click="$router.push('/loan/record')">
                  <img src="./index/icon_i2.png" class="img1">我的借款<i></i>
                </li>

              </ul>
              <ul class="info-box_s">

                <li @click="goMyBank">
                  <img src="./index/icon_i3.png" class="img1">我的银行卡<i></i>
                </li>
                <li @click="goFeedback">
                  <img src="./index/icon_i4.png" class="img1">用户反馈<i></i>
                </li>
                <li @click="$router.push('/set')">
                  <img src="./index/icon_i5.png" class="img2">设置<i></i>
                </li>
                <li @click="$web2app('phone',{number: customPhone})">
                  <img src="./index/icon_i6.png" class="img1">联系客服<i></i>
                </li>
                <li @click="$router.push('/loan')">
                  <img src="./index/icon_i7.png" class="img2">提现记录<i></i>
                </li>
              </ul>
            </div>
          </div>
        </popup>
      </div>
    </div>

</template>
<script>
import HeaderBar from './header'
import LeftMenu from './menu'
import Scroller from '../../components/scroller'
// import ScrollLine from '../../components/ScrollLine'
import { XHeader,Tab,TabItem,Popover,Divider,Alert,Range,Popup } from 'vux'
import {getString} from '../../utils/getString.js'
import { setTimeout } from 'timers'
  export default {
    components:{
      HeaderBar,
      LeftMenu,
      XHeader,
      Tab,
      TabItem,
      Popover,
      Divider,
      Scroller,
      Alert,
      Range,
      Popup
    },
    data() {
      return {
        alipayShow: false,
        navShow: false,
        iconShow: false,
        show:false,
        details: this.$store.state.details,
        paymentInformation:{
          recentDay: 0,
          repayNum:0
        },
        attestation: this.$store.state.attestation,
        bgshow: false,
        userInfo: this.$store.state.userInfo,
        mobile:"",
        loanshow: true,
        refuseShow: false,
        loanList: [],
        totalNumber: 0,
        listLength: 0,
        page: 1,
        pagesize: 10,
        list: [],
        noMoreRocd: false,
        popups: 0, // 控制弹窗
        order_no: getString('order_no'), // 订单号
        msg: decodeURI(getString('msg')), // 提示信息
        pay_result: getString('pay_result'),// 支付结果，1为成功
        name:"",
        isReload: true,
        customPhone: '', // 客服电话
        codeUrl: '', // 二维码url
        quota: 0 , // 借款金额
        interest: 0 , // 借款利息
        days: 0 , // 借款天数
        show8: false
      }
    },
    created() {
      // this.$vux.loading.show({
      //     text: '加载中'
      // })
      this.getSystemData()
      this.getcustomPhone()
      this.getCodeUrl()
      this.getList()
    },
    async mounted() {
        //解决支付完成，状态栏还存在问题
        // await this.$web2app('')
      //this.$refs.scrollLineRef.initSwiper('.scroll-box')
      if (this.pay_result) {
        if (this.pay_result == 1) {
          this.popups = 1;
        } else {
          this.popups = 2
        }
      }
      this.$http({
        methods:'post',
        url:'/user/info'
      })
      .then((data) => {
          this.$vux.loading.hide()
          if(data.data.status === 0){

                this.$store.state.userInfo = data.data.data;
                this.userInfo = data.data.data;
                this.mobile = this.userInfo.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') || "";
                // if (data.data.data.auditor_state == "5" || data.data.data.auditor_state == "6") {
                //     this.refuseShow = true
                // }
                if (data.data.data.auditor_state == "4") {
                    this.refuseShow = true
                }
          } else {
            Object.assign(this.userInfo, {
                valid_quota: 10000,
                quota: 10000,
            })
          }
      });
      this.poundageRate();
      this.duesList();
      this.detail();
    //   this.getProduct();


    //   var isElastic=this.getCookie('isElastic')
    //   if(!isElastic || isElastic=='' || isElastic==undefined){
    //     this.$vux.confirm.show({
    //       title: '温馨提示',
    //       content: '【注意】请认准APP中官方客服，其他方式（百度）搜索到的客服都是骗子，谨防被骗；申请即授予本平台管理您的贷后信息，包括但不限于：\n' +
    //         '1.将逾期7天信息上传至征信平台。\n' +
    //         '2.通知紧急联系人，告知本人还款事宜。',
    //       showCancelButton:false,
    //       confirmText:'知道了',
    //       onConfirm:()=> {
    //         this.setCookie('isElastic',true,1)
    //       }
    //     })
    //   }
    },
    methods:{
      goMyBank() {
        this.$router.push('memb/my/bank')
      },
      goFeedback() {
        this.$router.push('/memb/feedback/list')
      },
      // setCookie: function (cname, cvalue, exdays) {
      //   var d = new Date();
      //   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      //   var expires = "expires=" + d.toUTCString();
      //   console.info(cname + "=" + cvalue + "; " + expires);
      //   document.cookie = cname + "=" + cvalue + "; " + expires;
      //   console.info(document.cookie);
      // },
      // //获取cookie
      // getCookie: function (cname) {
      //   var name = cname + "=";
      //   var ca = document.cookie.split(';');
      //   for (var i = 0; i < ca.length; i++) {
      //     var c = ca[i];
      //     while (c.charAt(0) == ' ') c = c.substring(1);
      //     if (c.indexOf(name) != -1){
      //       return c.substring(name.length, c.length);
      //     }
      //   }
      //   return "";
      // },
      getList() {
        var that = this;
        that.$http({
          methods: 'post',
          url: 'loan/poundageRate'
        }).then((res) => {
          if (res.data.status == 0) {
            const data = res.data.data;
            that.days = data.days;
            that.quota = data.quota - data.quota * + data.manageRate;
            that.interest = data.quota * + data.interestRate / 365 * data.days;
          }

        })
      },
        // 支付失败，跳转至支付页
        jumpPay() {
          this.$router.push({path:'/repayment',query:{order_no: this.order_no}});
        },
        // 支付失败，重新绑定银行卡
        jumpBindBank () {
          this.$router.push({path:'/memb/bank?isadd=1'});
        },
        // 监听子组件事件
        ispopup() {
          this.popups = 0;
          this.$router.replace('/')
          console.log(this.popups);
        },
        reload() {
          this.iconShow = true
          this.$nextTick(() => {
            if (this.isReload) {
              this.isReload = false;
              setTimeout(() => {
                this.isReload = true;
                window.location.reload(true);
                // this.$router.go(0)
              }, 1000)
            }
          })
        },
        poundageRate(){
            this.$http({
                methods:'post',
                url:'/loan/poundageRate'
            })
            .then((data) => {
                if (data.data.data != null) {
                    this.details = data.data.data;
                    this.$store.state.details = data.data.data;
                }
            })
        },
        duesList(){
            this.$http({
                methods:'post',
                url:'loan/duesList'
            })
            .then((data) => {
                if (data.data.data != null) {
                    this.paymentInformation = data.data.data
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
        // 判断系统是否是在维护中
        getSystemData() {
            let timer =
            this.$http({
                methods: 'get',
                url: '/index/checkUpd',
            }).then(async (res) => {
                if (res.data.status == 0) {
                    if (res.data.data.is_update == 1) {
                       this.$router.replace('/maintain')
                    }
                }
            })
        },
        timestampToTime(timestamp) {
            if (timestamp != 0 && timestamp != null && timestamp != "") {
                var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + ' ';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
                var D = date.getDate() + ' ';
                return Y+M+D;
            } else {
                return "";
            }
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
        getCodeUrl(){
            this.$http({
                methods:'get',
                url:'index/alipay'
            })
            .then((data) => {
                if (data.data.data != null) {
                    this.codeUrl = data.data.data.alipay
                }
            })
        },
        timestampToDate(timestamp) {
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            return M+D;
        },
        showNav(){
            this.navShow = false
            setTimeout(() => {
                this.bgshow = false
            }, 500);
        },
        changeBtnState(state){
          console.log(state)
            var text = "完善资料获取额度";
            if (state == 0) {
                text = "完善资料获取额度"
            }else if (state == 1) {
                text = "等待审核（约10分钟）"
            }else if (state == 2) {
                text = "资料错误，重新申请"
            }else if(state == 3){
                text = "立即提现"
            }else if(state == 4){
                 text = "申请获取额度"
            }else if(state == 5){
                text = "等待收款"
            }else if (state == 6) {
                text = "马上还款"
            }
            return text;
        },
        goPerfectInfo(state){
          console.log(state)
            if (state==0 || state==2) {
              this.$router.push("/memb/info")
            }else if (state == 1 || state == 5) {

            }else if(state == 3){
              this.$router.push("/loan/cash")
            }else if(state == 4){
              this.refuseShow = true
            }else if(state == 6){
              this.$router.push("/repay")
            }
        },
        getProduct(){
            this.$http({
                methods:'post',
                url:'product/thiree_product',
                data:{
                    order:this.name,
                    page:this.page,
                    page_size:this.pagesize
                }
            })
            .then((data) => {
                if (data.data.data != null) {
                    console.log(data)
                    this.totalNumber = data.data.count
                    if (this.page === 1) {
                        this.loanList = data.data.data.list;
                        for(let i = 0; i < this.loanList.length; i++){
                                this.loanList[i].product_info = JSON.parse(this.loanList[i].product_info);
                                this.loanList[i].up_time = this.timestampToDate(this.loanList[i].up_time);
                            }
                    }else{
                        this.list = data.data.data.list;
                        for(let i = 0; i < this.list.length; i++){
                                this.list[i].product_info = JSON.parse(this.list[i].product_info);
                                this.list[i].up_time = this.timestampToDate(this.list[i].up_time);
                            }

                        this.loanList = this.loanList.concat(this.list)
                    }
                }
            })
        },
        onPullingUp(){
        // 加载数据
            if (this.totalNumber <= this.loanList.length) {
                this.loanList = this.loanList.concat([]);
                this.noMoreRocd = true
                return
            }
            this.page++;
            this.getProduct();
        },
        onPullingDown(){
            // 刷新数据
            this.page = 1;
            this.getProduct();
        },
        goMore(){
            this.refuseShow = false;
            this.loanshow = true;
            // document.getElementById("abc").scrollIntoView()
        },
        handler(index){
            console.log(index)
            this.loanList = [];
            if (index === 0) {
                this.name = "loan"
                this.getProduct()
            } else {
                this.name = "upd_time"
                this.getProduct()
            }
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
      show8s() {
        this.show8=!this.show8;
      }
    }
  }
</script>
<style lang="scss" scoped>

  .mys{
    .info-box_{
      text-align: center;
      padding:Px(60) 0 Px(40);
      img{
        width: Px(94);
        height: Px(94);
      }
      >div{
        color: #333333;
        opacity: 0.74;
        font-size: Px(40);
        line-height: Px(71);
      }
    }
    .info-box_s{
      width: Px(286);
      margin: 0 auto;
      li{
        width: Px(286);
        height: Px(90);
        line-height: Px(90);
        color: #333;
        font-size: Px(30);
        text-align: left;
        position: relative;
        img{
          float: left;
          margin-top: Px(23);
          margin-right: Px(30);
        }
        .img1{
          width: Px(38);

        }
        .img2{
          height: Px(40);
        }
        i{
          display: block;
          width: Px(17);
          height: Px(30);
          position: absolute;
          right: 0;
          top:Px(30);
          background:url('./index/row2.png')no-repeat;
          background-size: 100% auto;
          display: none;
        }
      }
    }
  }
  .titles{
    color: #FF6A5D;
    font-size: Px(24);
    line-height: Px(60);
    background: #fff;
    text-align:center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
    .refuseBg{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 5;
        background-color: rgba(0,0,0,0.5);
    }
    .refuseAlert{
        width: Px(550);
        height: Px(540);
        background: #FFFFFF;
        text-align: center;
        border-radius: Px(10);
        margin: Px(400) auto 0;
        padding-top: Px(69);
        font-size: Px(28)
    }
    .refuseLogo{
        width: Px(212);
        height: Px(195);
        margin: 0 auto;
        background: url(./index/pop_img.jpg) no-repeat;
        background-size:100%;
    }
    .checkOtherLoan{
        background:linear-gradient(-38deg,rgba(35,142,255,1),rgba(32,86,255,1));
        border-radius:Px(44);
        width:Px(400);
        height:Px(88);
        font-size:Px(28);
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:Px(88);
        margin: Px(80) auto
    }

    .btn{
        background:none;
        border:none;
        outline: none;
        display: flex;
        align-items: center;
        line-height: 25px;
    }
    // .header{
    //      height: Px(399);
    //      width: 100%;
    //      display: flex ;
    //      &-ios{
    //          padding-top:Px(18)
    //      }
    //     &-bg{
    //      background: url(./index/header.jpg);
    //      background-size:100% 100%;

    //     }
    // }
    .header-menu{
        width:  Px(30);
        height: Px(22);
        background: url(./index/icon_menu.png) no-repeat;
        background-size:100%;
        float: left;
        margin-top:Px(31);
        margin-left:Px(30);
        position: absolute;
    }
    .header-nav{
        height: Px(92);
        width: 100%;
        text-align: center;
        color: white;
        line-height: Px(92);
        background: url(./index/tab.png);
        position: fixed;
        z-index: 10;
    }
    .block-box{
        margin: .3rem .4rem 0;
        .block-item{
            width: 49%;
        }
        img{
            display: block;
            width: 100%;
            margin: auto;
        }
    }
    .banner-pic{
      padding: .4rem .2rem 0;
      img{
        display: block;
        width: 100%;
      }
    }
    .tab-banner{
        height: Px(390);
        width: 100%;
        margin-bottom:  2.5rem;
        background-image: -webkit-linear-gradient(0deg,#f43504, #ff8e1a);
        position: relative;
        padding-top: .5rem;
        // overflow: hidden;
        img{
            width: 100%;
            height: auto;
            margin-top: -50px;
        }
        .tap-back{
            // position: absolute;
            // top: 0;
            // left: 0;
            // right: 0;
            // bottom: .5rem;
            // z-index: -1;
        }
    }
    .tab{
        position: absolute;
        top: 2.5rem;
        left: 0;
        right: 0;
        // width: Px(640);
        margin: .1rem Px(43) .2rem;
        padding: Px(20) Px(80) Px(80);
        // color: #fff;
        box-shadow: 0 0 10px 1px rgba(#000, .1);
        border-radius: Px(12);
        overflow: hidden;
        // background: url('./index/pic_info_back.png') no-repeat center;
        // background-size: 100% 100%;
        background-color: #ffffff;
        text-align: center;
        .icon-problem {
          width: .5rem;
          height: .5rem;
          vertical-align: middle;
          margin-top: -.01rem;
        }
    }
    .message-box{
        margin: 0.5rem .4rem .0rem;
        padding-bottom: .3rem;
        border-bottom: #ebebeb 1px solid;
        .icon-message2{
            margin-right: .3rem;

            img{
                display: block;
                height: Px(40);
                width: auto;
            }
        }
        .scroll-box{
            height: .8rem;
            line-height: .8rem;
            overflow: hidden;
            font-size: .34rem;
            color: #333333;
        }
    }
    .tabs-box{
        margin: .6rem .4rem 1rem;
        border-radius: .1rem;
        .tabs-item{
            width: 50%;
            font-size: .32rem;
            text-align: center;
            img{
              display: block;
              width: 2rem;
              margin: auto;
            }
        }
    }
    .personaltab{
        width: Px(640);
        border-radius: Px(8);
        background: linear-gradient(to right, #b278fa, #cd8cfb);
        margin: Px(30) auto;
        padding: Px(30);
        box-shadow: 0 0 4px 1px rgba(#000, .06);
        color: #fff;
    }
    .infotab{
        border-radius: Px(14);
        background:#ffffff url("./index/pic_bg2.png") no-repeat 0 0;
        background-size: 100%;
        margin: Px(30) auto 0;
        width: Px(700);
        padding-bottom: Px(30);
        box-shadow: 0 0 4px 2px rgba(#000, .06);
        // background: url('./index/pic_bg2.png') center no-repeat;
        // background-size: 100% 100%;
        .tabTitle{
           padding: Px(30) Px(30) Px(10);
           color: #333;
           font-weight: normal;
        }
    }
    .fill-scroll{
        height: 1.5rem;
    }
    .vux-x-icon {
        fill: #fff;
    }
    .unfinish .vux-x-icon {
        fill: #fff;
    }
    .finish .vux-x-icon{
        fill: #fff;
    }
    .tabTitle{
        position: relative;
        // display: flex;
        font-size: 0.4rem;
        text-align: center;
        color: #fff;
        // align-items: center;
        // justify-content:space-between;
        .merit{
             text-align: center;
             color: #a7a7a7;
            //  line-height: .5rem;
             margin-bottom: .2rem;
             font-size: .34rem;
        }
        .quota{
          color: #666;
          font-weight: normal;
          font-size: .34rem;
          letter-spacing: 1px;
          p{
            color: #f43204;
            font-size: Px(120);
          }
        }
    }
    .refreshBtn{
        position: absolute;
        right: .3rem;
        top: .1rem;
        width:  Px(35);
        height: Px(30);
        // background: url(./index/icon_refresh.png);
        // background-size: auto 100%;
        outline: none;
        background-repeat: no-repeat;
        // margin-top: Px(10);
    }
    .cur{
        position: absolute;
        right: .3rem;
        top: .1rem;
        width:  Px(35);
        height: Px(30);
        // background: url(./index/icon_refresh.png);
        // background-size: auto 100%;
        outline: none;
        background-repeat: no-repeat;
        transform: rotate(1080deg);
        transition: all 3s;
    }
    .borrowing{
        // display: flex;
        font-size: Px(34);
        color: #ff8d1a;
        font-weight: normal;
        // justify-content: center;
        margin-top: -5px;
        margin-bottom: Px(30);
    }
    .circle-time{
        text-align: center;
        line-height: 1rem;
        font-size: .3rem;
        color: #999999;
    }
    .borrowingBtn{
        display: block;
        height: Px(89);
        margin-left: Px(0);
        cursor: pointer;
        padding: 0 Px(30);
        font-size: Px(40);
        line-height: Px(89);
        border-radius: Px(8);
        color: #fff;
        text-align: center;
        outline: none;
        border: none;
        align-self: center;
        background:none;
        border: #fff Px(1) solid;
        margin-top: Px(65);


    }
    .tabBottom{
        // margin: Px(20) auto 0 auto;
        // width: Px(640);
        height: Px(50);
        font-size: Px(24);
        // background: #F5F6F7;
        line-height: Px(50);
        // border-radius: Px(30);
        // text-align: center;
        // padding-bottom: .5rem;
        // margin-bottom: .5rem;
        // border-bottom: 1px solid #DEDEDE;
        em{
            font-size: .5rem;
        }
        // &::before{
        //   display: block;
        //   width: 6%;
        //   height: 2px;
        //   background-color: #fff;
        //   content: '';
        //   margin: 0 auto .1rem;
        // }
    }
    .white-btn{
      position:absolute;
      left: 0;
      bottom: 0;
      @include main-back;
      display: block;
      border: none;
      width: 100%;
      height: Px(75);
      background: #f89d67;
      color: #fff;
      font-size: Px(30);
      &:focus{
        outline: none;
      }
    }
    .icon-service2{
        // position: fixed;
        // bottom: 1.5rem;
        // right: .4rem;
        // height: 1.8rem;
        // width: 1.8rem;
        // background: url('./index/icon_service2.png') center no-repeat;
        // background-size: auto 100%;
    }
    .block1-tips{
      margin: 0;
      text-align: center;
      color: #999;
      &::before{
        display: inline-block;
        width: .5rem;
        height: .5rem;
        background: url('./index/icon_tips.png') center no-repeat;
        background-size: auto 100%;
        content: '';
        vertical-align: middle;
        margin-right: .2rem;
      }
      span{
        vertical-align: middle;
        font-size: .3rem;
      }
    }
    .data{
        justify-content:space-between;
        display: flex;
        align-items: center;
        padding-top:Px(30);
        padding-bottom:Px(30);
    }
    .left{
        font-size: Px(26);
        display: flex;
        align-items: center;
        div{
            align-self: center
        }
    }
    .right{
        display: flex;
        align-items: center;
        font-size: Px(26);
        div{
            align-self: center
        }
    }
    .enterBtn{
        width: Px(14);
        height: Px(24);
        background: url(./index/icon_arrow_right.png);
        background-size: 100% 100%;
        margin-left:Px(20)
    }
    .paymentInfo{

        color: #333;
        font-size:Px(24);
        padding-top: Px(0);
        margin: 0 Px(30);
        .paymentSum{
            font-size:1.4rem;
            text-align: center;
            line-height: 1.4rem;
            color: #ff9b1a;
            // font-weight: bold;
        }

        .otherInfo{
            font-size:Px(26);
            text-align: center;
            padding: Px(10) Px(30);
            padding-bottom:Px(15);
            >div{
              >div {
                border: #ffc390 .1rem solid;
                border-radius: 50%;
                width:Px(155);
                height:Px(155);
                line-height: Px(155);
                color: #ff8d1a;
                font-size: Px(42);
                margin-bottom: .2rem;
                i{
                  line-height: 0.6rem;
                  margin-top: 0.4rem;
                  font-style: normal;
                  padding: 0.1rem;
                }
              }
            }
            .num{
                float:right;
                span{
                    color: #fff;
                }
            }
        }
    }
    .loanProject{
        margin-top: Px(40);
        background-color: #fff;
        .loanTitle{
            font-size: Px(34);
            line-height: Px(80);
            color: #333;
            text-align: center;
            .titleImg{
                vertical-align: middle;
                display: inline-block;
                margin: Px(-10) 0;
                width:Px(40);
                height:Px(35);
            }
            .imgleft{
                background: url(./index/kyb_title_img.png);
                background-size: 100% 100%;
            }
            .imgright{
                background: url(./index/kyb_title_img_r.png);
                background-size: 100% 100%;
            }
        }
    }
    .smallLoan{
        display: inline-block;
        width: Px(37);
        height: Px(43);
        vertical-align: middle;
        background: url(./index/icon_moneybag.png);
        background-size: 100% 100%;
        margin: Px(-10) 0;
        color:black;
    }
    .bigLoan{
        display: inline-block;
        width: Px(37);
        height: Px(43);
        vertical-align: middle;
        background: url(./index/icon_currency.png);
        background-size: 100% 100%;
        margin: Px(-10) 0;
        color:black;
    }
    .loanContent{
        margin-top:Px(20);
        position: relative;
        .loanList:nth-child(odd){
            width: Px(330);
            height: Px(271);
            border-radius: Px(8);
            border:1px solid;
            margin-top: Px(20);
            background-color: #fff;
            // box-shadow: 0rem Px(3) Px(3) rgba(222,231,238,0.75);
            display:inline-block;
            // margin-left:Px(30)
        }
    }
    // .banner{
    //     width:Px(692);
    //     height:Px(126);
    //     margin:Px(20) auto;
    //     background: url(./index/banner.png);
    //     background-size: 100% 100%;
    // }
    .subhead{
        text-align:center;
        color: #fe635e;
        font-size:Px(26)
    }
    .loanItem{
        height:Px(150);
        padding-left:Px(30);
        padding-right:Px(30);
        border-bottom:1px solid #f4f4f4;
        display: flex;
        justify-content:space-between;
        .loanLimit{
            height:Px(90);
            .LimitNum{
                font-weight:bold;
                color:#fe635e;
                font-size:Px(36)
            }
            font-size:Px(28);
            color:#919191;
            padding:Px(30);
            display: inline-block;
        }
        .loanDetail{
            height:Px(90);
            float:right;
            padding:Px(30);
            min-width: Px(300);
            .details{
                font-size:Px(26);
                color:#919191
            }
        }
    }
    .loanLogo{
        width:Px(37);
        height:Px(37);
        border-radius:50%;
        vertical-align: middle;
    }

    .people{
        color:#fe9e7b
    }

    .popover-demo-content {
        padding: Px(5) Px(10);
        font-size: Px(20);
        width:Px(300);
        background-color:rgba(0,0,0,0.39);
        // opacity:0.39;
        border-radius:Px(5);
    }

    .loanName{
        font-size:Px(24)
    }

    .component-pop{
        opacity: 0;
        -webkit-transition: opacity 0.2s;
        transition: opacity 0.2s;
        pointer-events: none;
    }

    .noMoreRocd{
        width: Px(650);
        margin: 0 auto
    }
    .scroll-container{
      position: absolute;
      left:0;
      top: 0;
      bottom: 60px;
      width:100%;

    }
    .mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: url('../repay/img/mask.png') no-repeat center / 100% 100%;
      z-index: 100;
    }
.payBtn{
  width: 60%;
  height: Px(56);
  text-align: center;
  border-radius: Px(40);
  margin: .3rem auto;
  line-height: Px(56);
  color: #fff;
  padding: .2rem;
  background: linear-gradient(to right, #f45e04, #ff8e1a);
//   background-color: #fff;
  font-size: .4rem;
  margin-bottom: 0.2rem;
}
.alipay {
  position: absolute;
  left: 50%;
  top: 50%;
  width: Px(560);
  height: Px(560 / 1080 * 1266);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  .alipay-close {
    position: absolute;
    right: 0;
    top: 0;
    width: Px(560 / 1080 * 150);
    height: Px(560 / 1080 * 150);
    background: url(./index/icon_close.png) no-repeat center / Px(32);
  }
  .alipay-img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: Px(10);
  }
}

.success-box {
  width: Px(587);
  height: Px(640);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: Px(-293.5);
  margin-top: Px(-320);
  background: url('./index/success.png') no-repeat center / 100% 100%;
  .success-close {
    position: absolute;
    right: 0;
    top: 0;
    width: Px(96);
    height: Px(96);
    background: url(./index/icon_close.png) no-repeat center / Px(32);
  }
  .success-title {
    position: absolute;
    bottom: Px(270);
    width: Px(587);
    font-size: Px(26);
    color: #919191;
    text-align: center;
  }
  .success-btn {
    position: absolute;
    bottom: Px(77);
    width: Px(587);
    text-align: center;
    .btn {
      display: block;
      outline: none;
      border: none;
      background: none;
      background: #2e8cff;
      color: #ffffff;
      font-size: Px(28);
      font-weight: 600;
      width: Px(445);
      height: Px(88);
      margin: 0 auto;
      text-align: center;
      border-radius: Px(44);
    }
  }
}
.success-boxs {
    width: Px(587);
    height: Px(640);
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: Px(-293.5);
    margin-top: Px(-320);
    background: url('./index/error.png') no-repeat center / 100% 100%;

    .success-close {
      position: absolute;
      right: 0;
      top: 0;
      width: Px(96);
      height: Px(96);
      background: url(./index/icon_close.png) no-repeat center / Px(32);
    }

    .success-title {
      position: absolute;
      bottom: Px(270);
      width: Px(587);
      font-size: Px(26);
      color: #919191;
      text-align: center;
    }

    .success-btn {
      position: absolute;
      bottom: Px(77 - 50);
      width: Px(587);
      text-align: center;
      .btn {
        display: inline-block;
        outline: none;
        border: none;
        background: none;
        background: #2e8cff;
        color: #ffffff;
        font-size: Px(28);
        font-weight: 600;
        width: Px(222.5);
        height: Px(88);
        border-radius: Px(44);
        &.-long {
          width: 78%;
          margin-top: 4%;
        }
      }
      .btns {
        display: inline-block;
        outline: none;
        border: none;
        background: none;
        background: #c8c8c8;
        color: #ffffff;
        font-size: Px(28);
        font-weight: 600;
        width: Px(222.5);
        height: Px(88);
        border-radius: Px(44);
        &.-blue {
          background: #2e8cff;
        }
      }
      .tip {
        width: Px(200);
        margin: Px(20) auto 0;
        font-size: Px(24);
        line-height: Px(64);
        color: #ccc;
      }
    }
  }
    .title{
      text-align: center!important;
      padding-top: Px(60);
      position: relative;
      color: #fff;
      font-size: Px(38);
    }
    .title>img{
      width: Px(99);
    }
    .title em{ float: right; position: absolute; right: 0; top:Px(55);}
    .title em img{width: Px(40); margin-right: Px(40)}

    .box_{
      position: relative;
      text-align: center;
      background:#fff;
      background-size: 100% auto;
      padding-bottom:6.2rem;
      h4{
        color: #eb5130;
        font-size: Px(24);
        text-align:center;
        font-style: normal;
        line-height: Px(24);
      }
      .box_1{
        text-align: center;
        overflow: hidden;
        background:url(./index/index_bc.png) no-repeat ;
        background-size: 100% auto;
        width: Px(591);
        height: Px(299);
        /*box-shadow: 0 0 .2rem 1px rgba(#000, .1);*/
        /*border-radius: Px(15);*/
        padding: Px(30) Px(40);
        margin: Px(32) auto;
        h3{
          font-style: normal;
          font-size: Px(28);
          color:#fff;
          margin-top: Px(28);
          text-align: left;
          line-height: Px(33);
          font-weight: normal;
          padding-left: Px(5);
        }
        >p{
          font-style: normal;
          font-size: Px(50);
          color:#FFFFFF;
          margin-top: Px(0);
          text-align:  left;
          line-height: Px(55);
          font-weight: normal;
          margin-bottom: 0;
          padding-left: Px(0);
        }
        >em{
          color: #333333;
          font-size: Px(24);
          text-align:  center;
          line-height: Px(40);

          img{
            width: Px(24);
            height: Px(24);
            vertical-align: top;
            margin-top: 0.14rem;
            margin-right: Px(10);
          }
        }
      }
      span{
        display: block;
        position: absolute;
        left: Px(200);
        top: Px(440);
        img{ width: Px(344);}
      }
      .img1{
        width: Px(480);
      }
      .img2{
        width: Px(750);
      }
      P{
        color: #fc5c21;
        font-size: Px(85);
        line-height: Px(160);
        margin-bottom: Px(15);
      }

    }
    .tips{
      padding-left: Px(22);
      height: Px(115);
      line-height: Px(115);
      color: #000000;
      font-size: Px(30);
      background: #fff;
      overflow: hidden;
      p{
        float: right;
        color: #000000;
        font-size: Px(25);
        margin-right: Px(35);
        opacity: 0.6;
      }
    }

    .box_s{
      text-align: left;
      margin:Px(35)auto 0;
      width:Px(705);
      overflow: hidden;
      li{
        float: left;
        width:Px(705);
        height:Px(143);
        background: #fff;
        position: relative;
        margin-bottom: Px(22);
        overflow:hidden;
        img{
          position: absolute;
          left: Px(16);
          top: Px(32);
          width: Px(80);
        }
        h5{
          padding-left: Px(120);
          color: #313134;
          font-size: Px(30);
          font-weight: normal;
          line-height:Px(50);
          margin-top: Px(24);
        }
        p{
          padding-left: Px(120);
          font-style: normal;
          color: #b7b7bd;
          font-size: Px(21);
          line-height:Px(50);
        }
        i{
          // margin-top: Px(47);

          position: absolute;
          right: Px(19);
          top: Px(61);
          width: Px(12);
          height: Px(21);
          background: url(./index/row2.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      em{
        display: block;
        color: #ffffff;
        font-size: Px(32);
        background: #fb8e3b;
        width: Px(400);
        height: Px(80);
        line-height: Px(80);
        border-radius: Px(15);
        margin: Px(18) auto;
        margin-bottom: Px(10);
      }
    }
  .indexbtn{
    width: Px(144);
    position: fixed;
    right: 0;
    bottom: Px(20);
    z-index: 99999;
  }
</style>
<style>
  .vux-popover{
    background: none !important;
    max-width: 1rem !important;
  }
  .vux-popover-arrow-left{
    border-right: 5px solid rgba(0, 0, 0, 0.39) !important;
  }

  .personalicon{ width:  .5rem; height: .5rem; background: url('./index/indexicon1.png') no-repeat center / 100% 100%; margin-right: 0.15rem;}
  .recordicon{ width:  .5rem; height:  .5rem; background: url('./index/indexicon2.png') no-repeat center / 100% 100%;  margin-right: 0.15rem;}
  body{
    background: #F6F6F6!important;
  }
  .vux-range-input-box{
    margin:0.6rem 0.8rem!important;
  }
  .range-min{
    position: absolute;
    left: 0!important;
    top:.8rem!important;
    color: #1dafec!important;
    font-size: 0.26rem!important;
    display: none;
  }
  .range-max{
    position: absolute;
    right: 0!important;
    top:.8rem!important;
    width: auto!important;
    color: #1dafec!important;
    font-size: 0.26rem!important;
    display: none;
  }
  .range-quantity{
    background-color:#1dafec!important;

  }
  .range-bar{
    height: 3px!important;
  }
  .range-handle{
    height: 0.4rem!important;
    width: 0.4rem!important;
    background: #fb8e3b!important;
    top: -0.2rem!important;
  }
</style>

<style lang="less" scoped>

  .popup0 {
    padding-bottom:15px;
    height:200px;
  }
  .popup1 {
    width:100%;
    height:100%;
  }
  .popup2 {
    padding-bottom:15px;
    height:400px;
  }
  .position-vertical-demo {
    background-color: #ffe26d;
    color: #000;
    text-align: center;
    padding: 15px;
  }
  .position-horizontal-demo {
    position: relative;
    height: 50%;
    .vux-close {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%) scale(4);
      color: #000;
    }
  }
  .vux-popup-dialog{
    background: #fff;
  }
</style>
