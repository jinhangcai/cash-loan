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
            <!--<header-bar title="蓝天贷"></header-bar>-->
            <!--<img  src="./index/indeximg.png" width="100%">-->
            <!--<div class="tips" @click="$web2app('phone',{number: customPhone})">-->
              <!--客服中心-->
              <!--<p>如有问题及时反馈 ></p>-->
            <!--</div>-->
            <div class="box">

              <div class="title" :style="`padding-top:${native.statusBarHeight + 10}px`">
                <!--<a @click="$router.push('/my')">-->
                <group title="set position">
                <a title="left(56% width)"@click="show8s"></a>
                </group>
                 <a @click="$router.push('/set')"></a>
              </div>

              <img  src="./index/indeximgs.png" width="100%">
              <div class="box_">
                <!--<div class="title" >-->
                  <!--　蓝天贷-->
                  <!--&lt;!&ndash;<a @click="$router.push('/set')"></a>&ndash;&gt;-->
                <!--</div>-->
                <div class="box_1">
                  <div class="box_left">

                      <p>{{userInfo.valid_quota == null ? 0:userInfo.valid_quota}}</p>
                      <h3>最高可借(元)</h3>
                    </div>
                    <div class="box_right">
                      <!--<em><img  src="./index/Group1.png" width="100%">7天/14天<br> <img  src="./index/Group2.png" width="100%">起借金额:2000元</em>-->
                    </div>

                    <button class="borrowingBtn" @click="goPerfectInfo(userInfo.auditor_state)">{{changeBtnState(userInfo.auditor_state)}}</button>
                  </div>
               </div>
              <section class="message-box flex-center">
                <div class="icon-message2"><img src="./index/icon_message.png" alt=""></div>
                <scroll-line ref="scrollLineRef" class="scroll-box flex-1">
                  <div class="swiper-slide">蒋先生已经通过同花顺下款3000.00元!!!</div>
                  <div class="swiper-slide">李先生已经通过同花顺下款2000.00元!!!</div>
                  <div class="swiper-slide">黎女士已经通过同花顺下款4000.00元!!!</div>
                  <div class="swiper-slide">蔡先生已经通过同花顺下款1000.00元!!!</div>
                </scroll-line>
              </section>
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
              <div class="infotab_">
                <h3 class="title_h3">
                  还款信息
                </h3>
                <div class="infotab">
                  <div class="tabCenter">
                    <div class="paymentInfo" style="text-align: center;">
                      <div class="otherInfo flex-between">
                        <div>
                          <p>近日待还（元）</p>
                          <span>最近还款日{{timestampToTime(paymentInformation.recentDay)}}<br>剩余待还笔数{{paymentInformation.repayNum}}笔</span>

                        </div>

                      </div>
                    </div>
                    <p class="paymentSum">{{paymentInformation.allMoney || 0}}</p>
                    <div  class="payBtn"  @click="$router.push('/repay')">立即还款</div>
                  </div>
                </div>
              </div>

              <div class="personaltab">
                <div class="tabCenter">
                  <div class="data" @click="$router.push('/memb/info')">
                    <div class="left">
                      <div class="personalicon"></div>
                      <div><h3>个人信息</h3>信用资料填写</div>
                    </div>
                    <div class="right">
                      <div class="unfinish" v-if="!attestation" style="display:flex;align-items: center;">
                        <x-icon type="ios-information" size="16"></x-icon>
                        <span>未完成</span>
                      </div>
                      <div class="finish" v-else style="display:flex;align-items: center;">
                        <x-icon type="ios-checkmark" size="16"></x-icon>
                        <span>已完成</span>
                      </div>
                      <div class="enterBtn"></div>
                    </div>
                  </div>
            </div>

                <!--<div class="data" style="border-top:1px solid #eaebee" @click="goLoan">-->
                <!--<div class="left">-->
                <!--<div class="recordicon"></div>-->
                <!--<div>提现记录</div>-->
                <!--</div>-->
                <!--<div class="right">-->
                <!--<div class="enterBtn"></div>-->
                <!--</div>-->
                <!--</div>-->
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
        </div>
      <div v-transfer-dom>
        <popup v-model="show8" position="left" width="56%">
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
                <li @click="$router.push('/loan')">
                  提现记录<i></i>
                </li>
                <li @click="$router.push('/loan/record')">
                  我的借款<i></i>
                </li>
                <li @click="goFeedback">
                  用户反馈<i></i>
                </li>
                <li @click="goMyBank">
                  我的银行卡<i></i>
                </li>
                <li @click="$web2app('phone',{number: customPhone})">
                  联系客服<i></i>
                </li>
                <li @click="$router.push('/set')">
                  设置<i></i>
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
import ScrollLine from '../../components/ScrollLine'
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
      ScrollLine,
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
      this.$refs.scrollLineRef.initSwiper('.scroll-box');
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
      var isElastic=this.getCookie('isElastic')
      if(!isElastic || isElastic=='' || isElastic==undefined){
        this.$vux.confirm.show({
          title: '温馨提示',
          content: '【注意】请认准APP中官方客服，其他方式（百度）搜索到的客服都是骗子，谨防被骗；申请即授予本平台管理您的贷后信息，包括但不限于：\n' +
            '1.将逾期7天信息上传至征信平台。\n' +
            '2.通知紧急联系人，告知本人还款事宜。',
          showCancelButton:false,
          confirmText:'知道了',
          onConfirm:()=> {
            this.setCookie('isElastic',true,1)
          }
        })
      }
    },
    methods:{
      goMyBank() {
        this.$router.push('memb/my/bank')
      },
      goFeedback() {
        this.$router.push('/memb/feedback/list')
      },
      setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        console.info(cname + "=" + cvalue + "; " + expires);
        document.cookie = cname + "=" + cvalue + "; " + expires;
        console.info(document.cookie);
      },
      //获取cookie
      getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1);
          if (c.indexOf(name) != -1){
            return c.substring(name.length, c.length);
          }
        }
        return "";
      },
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
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = date.getDate() ;
                return Y+M+D;
            } else {
                return "---";
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
        padding:Px(100) 0 0;
        img{
          width: Px(94);
          height: Px(94);
        }
        >div{
          color: #ffffff;
          opacity: 0.74;
          font-size: Px(30);
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
          color: #fff;
          font-size: Px(30);
          text-align: center;
          position: relative;
          border-bottom: #a396fb Px(2) solid;
          i{
            display: block;
            width: Px(17);
            height: Px(30);
            position: absolute;
            right: 0;
            top:Px(30);
            background:url('./index/rows1.png')no-repeat;
            background-size: 100% auto;
          }
        }
      }
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
        .icon-message2{
            margin-right: .3rem;

            img{
                display: block;
                height: Px(30);
                width: auto;
            }
        }
        .scroll-box{
            height: .8rem;
            line-height: .8rem;
            overflow: hidden;
            font-size: Px(18);
            color: #282828;
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
        width: Px(672);
      border-left: #054fe5 Px(16) solid;
        border-radius: Px(8);
        background:#fff;
        box-shadow: 0 0 4px 2px rgba(#000, .06);
        margin: Px(30) auto;
        color: #222222;
      font-size: Px(30);
      h3{
        padding-left: Px(12);
        color: #515151;
        font-size: Px(30);
        display: inline-block;
        margin-right: Px(100);
      }
      span{
        color:#999999;
      }
    }
    .infotab_{
      padding: Px(30);
      /*width: Px(700);*/
      /*margin:Px(24) auto;*/
      /*background: #fff;*/
      /*border-radius: Px(25);*/
      /*padding-top: Px(12);*/
      /*text-align: center;*/
      /*overflow: hidden;*/
      /*box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.06);*/
      h3{
        color:#282828;
        font-size:Px(28);
        line-height: Px(64);
        font-weight: normal;
      }
    }
    .infotab{
        border-left: #054fe5 Px(16) solid;
        border-radius: Px(14);
        margin: Px(30) auto 0;
        width: Px(672);
        box-shadow: 0 0 4px 2px rgba(#000, .06);
        // background: url('./index/pic_bg2.png') center no-repeat;
        // background-size: 100% 100%;
      .tabCenter{
        overflow: hidden;
      }
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
        fill: #999;
    }
    .unfinish .vux-x-icon {
        fill: #999;
    }
    .finish .vux-x-icon{
        fill:#999;
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
        height: Px(46);
        border-radius: Px(23);
        cursor: pointer;
        font-size: Px(24);
        line-height: Px(46);
        color: #fff;
        text-align: center;
        outline: none;
        border: none;
        align-self: center;
        background: #473eff;
       float: left;
       margin-left: Px(60);
       padding: 0 Px(38);
      display: inline-flex;

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
    .paymentSum{
      width:Px(200);
      font-size:Px(80);
      text-align: center;
      color: #222222;
      float: left;
      line-height: Px(135);
      white-space: nowrap;
      // font-weight: bold;
    }
    .paymentInfo{
        width: Px(250);
        height:Px(135);
        color: #333;
        font-size:Px(24);
        padding-top: Px(0);
        float: left;


        .otherInfo{
            font-size:Px(26);
            text-align: left;
            padding: Px(10) 0 0 Px(12);


            >div{
              overflow: hidden;
              p{
                color: #282828;
                font-size: Px(30);
                line-height: Px(46);
              }
              span{
                color: #515151;
                font-size: Px(18);
                line-height: Px(30);

              }
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
      bottom:0;
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
  height: Px(44);
  text-align: center;
  border-radius: Px(22);
  line-height: Px(44);
  color: #fff;
  padding:0 Px(20);
  background:#473eff;
  border: #3750e0 Px(1) solid;
//   background-color: #fff;
  font-size:Px(24);
  margin-bottom: 0.2rem;
  display: grid;
  float:right;
  margin-right:Px(30);
  margin-top: Px(44);
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
    .box {
      background: #fff url('./index/indeximg.png') no-repeat;
      background-size: 100%;
      padding-bottom: Px(25);
      min-height: Px(385);

      .titles {
        height: Px(50);
        line-height: Px(50);
        color: #fff;
        font-size: Px(21);
        text-align: center;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.33);
      }

      .title {
        // width: 100%;
        text-align: center;
        line-height: Px(31);
        margin-bottom: Px(40);
        color: #fff;
        // background-color: #fff;
        padding: Px(15) Px(30) 0;
        // font-weight: bold;
        font-size: Px(32);
        letter-spacing: 1px;
      overflow: hidden;
        a:nth-child(1) {
          display: block;
          width: Px(34);
          height: Px(31);
          float: right;
          background: url('./index/shezhi1.png') no-repeat;
          background-size: 100%;

        }

        a:nth-child(2) {
          display: block;
          width: Px(34);
          height: Px(31);
          float: right;
          background: url('./index/shezhi2.png') no-repeat;
          background-size: 100%;
          margin-right: Px(30);
        }
      }
    }
    .box_s{
      text-align: left;
      margin:Px(27)auto;
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
    .box_{
      position: relative;
      text-align: center;
      overflow: hidden;
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
        margin:Px(0) Px(34);
        background:url(./index/indexbg.png) no-repeat ;
        background-size: 100% 100%;
        height: Px(360);
        margin-bottom: Px(0);
        /*box-shadow: 0 0 .2rem 1px rgba(#000, .1);*/
        /*border-radius: Px(15);*/
        .box_left{
          width: 50%;
          float: left;
          margin-bottom: Px(29);
          overflow: hidden;
        }
        .box_right{
          width: 50%;
          float: right;
          padding-top: Px(70);
          height:Px(250);
        }
        h3{
          font-style: normal;
          font-size: Px(30);
          color:#354ede;
          margin-left: Px(60);
          text-align: left;
          line-height: Px(72);
          font-weight: normal;
        }
        p{
          font-style: normal;
          font-size: Px(68);
          color:#354ede;
          margin-left: Px(60);
          margin-top: Px(65);
          text-align: left;
          line-height: Px(80);
          font-weight: normal;
          margin-bottom: 0;
        }
        em{
          color: #fff;
          font-size: Px(24);
          text-align: left;
          line-height: Px(40);
          float: left;
          margin-left: Px(45);

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
</style>
<style>
  .vux-popover{
    background: none !important;
    max-width: 1rem !important;
  }
  .vux-popover-arrow-left{
    border-right: 5px solid rgba(0, 0, 0, 0.39) !important;
  }

  /*.personalicon{ width:  .5rem; height: .5rem; background: url('./index/indexicon1.png') no-repeat center / 100% 100%; margin-right: 0.15rem;}*/
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
    height: 100%;
    .vux-close {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%) scale(4);
      color: #000;
    }
  }
  .vux-popup-dialog{
    background: -webkit-linear-gradient(90deg,#8371fa, #a582f6);
  }
</style>
