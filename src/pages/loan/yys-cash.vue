<template>
  <div classs="loan-detail" :style="`transform:translate(0,${native.statusBarHeight}px)`">

    <div class="detail-body">
      <div class="detail-body-content">
        <div class="body-content-items" style="height: auto; display: block">
          <div class="item-left" style="width: 100%">最高可借(元)</div>
          <div class="item-xin"><span></span>{{quota}}</div>
        </div>
        <div class="body-content-items">
          <div class="item-left">到期金额</div>
          <div class="item-right"><span>￥</span>{{quota}}</div>
        </div>
        <!--<div class="body-content-item">-->
          <!--<div class="item-left">固定周期</div>-->
          <!--<div class="item-right">{{days}}天</div>-->
        <!--</div>-->
        <div class="body-content-item">
          <div class="item-left">利息</div>
          <div class="item-right">{{interest}}元</div>
        </div>
        <div class="body-content-item">
          <div class="item-left">

            <span class="loan-font">还款金额</span>
            <div class="loan-what" @click="tipsSwitch">
              <div class="loan-answer" v-show="showTips">
                <span>{{ $appName }}对借款人进行信息搜集、资信评估、信息交互核验及为借款提供的技术服务所收取的费用，借款人应不迟于借款发放当日向{{ $appName }}支付信息技术服务费</span>
            </div>
            </div>

          </div>
          <div class="item-right">{{account}}元</div>
        </div>
        <!-- <div class="no-border">
          <div class="item-left">收款银行卡</div>
          <div class="item-right">{{bank}}</div>
        </div> -->

        <div class="repayment-hks-pay">
          <div class="hks-pay-header">收款银行卡</div>
          <div class="hks-pay-wx" v-for="item in bankList" @click="card_id = item.card_id">
            <img src="./img/bankCar.png" alt="">
            <div class="wx-content">
              <!-- <div class="wx-content-top">银行卡({{ cardNo }})</div> -->
              <div class="wx-content-top">{{ item.bank_name }}</div>
              <div class="wx-content-footer">亿万用户的选择，更快更安全</div>
            </div>
            <div class="wx-right" @click="changewx">
              <img src="./img/select.png" alt="" class="repayment-select" v-show="card_id === item.card_id">
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="cash-footer">
      <button class="cash-btn" @click="contract">确认借款</button>
      <div class="check-container">
        <label class="check-box">
            <input v-model="isAgree" type="checkbox">
            <i class="check-icon"></i>
            <span>同意</span>
            <router-link to="/agreement2">《借款协议》</router-link>
        </label>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showTips: false,
        quota: 0 , // 借款金额
        days: 0 , // 借款天数
        interest: 0 , // 借款利息
        account: 0 , // 到款金额
        bank: '', // 银行卡信息
        bankList: [], // 银行卡列表
        card_id: '', // 银行卡id
        changeWX: true,
        isAgree: true,
      }
    },
    created() {
      this.getCardList()
    },
    mounted() {
      this.$vux.loading.show({
        text: 'Loading'
      });
      this.getList();
    },
    methods: {
      // 跳转至合同页
      contract() {
        if( !this.isAgree) {
          this.$vux.toast.text('请同意协议')
          return
        }

        this.getYysWay()
      },
      // 数聚魔盒
      yysAuthMH() {
        const that = this
        this.$vux.loading.show({
          text: '加载中'
        })

        this.$http({
          url:'auth/operatorConf?type=magic',
          methods: 'get',
        }).then((data) => {
          if(data.data.status === 0){
            that.$vux.loading.hide()
            const urlBefore = data.data.data.url // 验证使用者身份的唯一标识
            const box_token = data.data.data.box_token // 验证使用者身份的唯一标识
            const arr_pass_hide = String(data.data.data.arr_pass_hide) // 隐藏身份要素
            const real_name = data.data.data.real_name // 真实姓名
            const identity_code = data.data.data.identity_code // 身份证
            const user_mobile = data.data.data.user_mobile // 手机号
            const passback_params = data.data.data.passback_params // 手机号

            const cb = window.location.protocol + '//' + window.location.host + '/m.html#/memb/info?authing=1' // 运营商认证返回链接
            const moheUrl = `${urlBefore}?box_token=${box_token}&arr_pass_hide=${arr_pass_hide}&real_name=${real_name}&identity_code=${identity_code}&user_mobile=${user_mobile}&passback_params=${passback_params}&cb=${cb}`
            this.$web2app('openWebPage', {
              showLoadVIew: 1,
              useStatusBar: 1,
              showNavigation: 1, // 导航栏
              title: '运营商认证',
              url: moheUrl,
            });
          }
        }).catch(() => {
          that.$vux.loading.hide()
        })
      },
      // 魔蝎
      yysAuthMX() {
        let that = this
        that.$vux.loading.show({
          text: '加载中'
        })
        this.$http({
          url:'auth/operatorConf?type=scorpion',
          methods: 'get',
        }).then((data) => {
          that.$vux.loading.hide()
          if(data.data.status === 0){
            const url = data.data.data.url // 	string	api钥匙
            const apiKey = data.data.data.apiKey // 	string	api钥匙
            const loginParamsEncrypt = data.data.data.loginParamsEncrypt // 	string	加密用户信息
            const userId = data.data.data.userId // 	string	业务系统的标识用户的ID

            const backUrl = encodeURIComponent(window.location.protocol + '//' + window.location.host + '/m.html#/memb/info?authing=1') // 运营商认证返回链接
            const moxieUrl = `${url}?apiKey=${apiKey}&loginParamsEncrypt=${loginParamsEncrypt}&userId=${userId}&backUrl=${backUrl}`
            window.location.href = moxieUrl
            return;
            this.$web2app('openWebPage', {
              showLoadVIew: 1,
              useStatusBar: 1,
              showNavigation: 1, // 导航栏
              title: '运营商认证',
              url: moxieUrl,
            });
          }
        }).catch(() => {
          that.$vux.loading.hide()
        })
      },
      // 新颜
      yysAuthXY() {
          let that = this
          that.$vux.loading.show({
              text: '加载中'
          })
          this.$http({
              url:'auth/operatorConf?type=xinyan',
              methods: 'get',
          }).then((data) => {
              that.$vux.loading.hide()
              that.$store.commit('SET-YYS-AUTH', '')
              if(data.data.status === 0){
                  const url = data.data.data.url // 	string	api钥匙
                  const phone = data.data.data.phone // 	string	手机号
                  const idCardNum = data.data.data.idCardNum // 	string	身份证
                  const name = data.data.data.name // 	string	姓名
                  const idCardNumState = data.data.data.idCardNumState // 	string	姓名
                  const nameState = data.data.data.nameState // 	string	姓名
                  const phoneState = data.data.data.phoneState // 	string	姓名

                  const jumpUrl = encodeURIComponent(window.location.protocol + '//' + window.location.host + '/m.html#/index?authing=1') // 运营商认证返回链接
                  // jumpUrl = https://qz.xinyan.com/auth/{apiUser}/{apiEnc}/{timeMark}/{apiName}/{taskId}?jumpUrl={jumpUrl}
                  // const jumpUrl = encodeURIComponent(window.location.protocol + '//' + window.location.host + '/m.html#/?authing=1') // 运营商认证返回链接
                  const xinyanUrl = `${url}?jumpUrl=${jumpUrl}&name=${name}&phone=${phone}&idCardNum=${idCardNum}&idCardNumState=${idCardNumState}&nameState=${nameState}&phoneState=${phoneState}`
                  window.location.href = xinyanUrl
                  return;
                  this.$web2app('openWebPage', {
                      showLoadVIew: 1,
                      useStatusBar: 1,
                      showNavigation: 1, // 导航栏
                      title: '运营商认证',
                      url: xinyanUrl,
                  });
              }
          }).catch(() => {
              that.$vux.loading.hide()
          })
      },
      // 获取运营商认证方式
      getYysWay() {
        let that = this
        this.$vux.loading.show({
          text: '加载中'
        })
        // 数聚魔盒
        this.$http({
          url:'index/getSysConfig?configName=OPERATOR_TYPE',
          methods: 'get',
        }).then((data) => {
          that.$vux.loading.hide()
          if(data.data.status === 0){
            // 魔蝎
            if (data.data.data.config == 'scorpion') {
              that.yysAuthMX()
            } else if (data.data.data.config == 'xinyan') {
                // 新颜
                that.yysAuthXY()
            } else{
              // 魔盒
              that.yysAuthMH()
            }
          }
        }).catch(() => {
          that.$vux.loading.hide()
        })
      },
      // 提示切换
      tipsSwitch() {
        if (this.showTips) {
          this.showTips = false;
        } else {
          this.showTips = true;
        }
      },
      // 点击银行卡支付
      changewx() {
        // this.changeZFB = false;
        if (this.changeWX) {
          this.changeWX = false;
        } else {
          this.changeWX = true;
        }
      },
      // 获取银行卡列表
      getCardList() {
        this.$http({
          methods: 'post',
          url: 'finance/payWay',
        }).then((res)=>{
          if (res.data.status === 0) {
            this.bankList = res.data.data.bank
            this.card_id = this.bankList[0].card_id
          }
        })
      },
      // 获取信息
      getList() {
        var that = this;
        that.$http({
          methods: 'post',
          url: 'loan/poundageRate'
        }).then((res) => {
          if (res.data.status == 0) {
            const data = res.data.data
            // that.quota = data.quota;
            that.days = data.days;
            // that.interest = that.quota * +data.interestRate / 365 * that.days;
            // that.interest = that.interest.toFixed(2);
            // that.account = that.quota - that.quota * + data.manageRate;
            // that.account = that.account.toFixed(2);
            that.bank = data.bank;
            // 前置   先扣服务费
            if (data.entryMode != 1) {
                that.quota = data.quota - data.quota * + data.manageRate;
                that.interest = data.quota * + data.interestRate / 365 * that.days;
                that.interest = that.interest.toFixed(2);
                // 本金 + 利息
                that.account = Number(data.quota) + Number(that.interest);
                that.account = that.account.toFixed(2);
            } else {
                // 后置  还款时再扣服务费
                that.quota = data.quota;
                that.interest = data.quota * +data.interestRate / 365 * that.days;
                that.interest = that.interest.toFixed(2);
                // 本金 + 服务费 + 利息
                that.account = Number(data.quota) + data.quota *+ data.manageRate + Number(that.interest);
                console.log(that.account)
                that.account = that.account.toFixed(2);
            }
          } else {
            // this.$vux.alert({
            //   message: res.data.msg
            // })
            // that.$tips(res.data.msg);
          }
          that.$vux.loading.hide();
        }, (error) => {
          that.$vux.loading.hide();
          // this.$vux.alert({
          //   message: '获取数据出错(loan/repaymentDetail)'
          // })
          // that.$tips('获取数据出错(loan/repaymentDetail)');
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  [v-cloak] {
    display: none;
  }

  .loan-detail {
    overflow: hidden;
  }

  .repay-header {
    width: Px(750);
    height: Px(85);
    background: #ffffff;
    position: relative;
    margin-bottom: 1px;

    img {
      width: Px(17);
      height: Px(30);
      position: absolute;
      top: Px(27.5);
      left: Px(34);
    }

    div {
      width: Px(750);
      height: Px(85);
      font-size: Px(32);
      color: #333333;
      line-height: Px(85);
      text-align: center;
    }
  }

  /* .detial-header {
    width: Px(750);
    height: Px(186);
    background: #ffffff;
    overflow: hidden;

    .detail-header-top {
      width: Px(750);
      height: Px(63);
      line-height: Px(63);
      text-align: center;
      font-size: Px(24);
      color: #919191;
      margin-top: Px(22);
    }

    .detail-header-footer {
      width: Px(750);
      height: Px(60);
      text-align: center;

      .icon {
        font-size: Px(34);
        color: #333333;
        font-weight: 700;
        text-align: bottom;
      }

      .number {
        font-size: Px(60);
        color: #333333;
        font-weight: 700;
      }
    }
  } */

  .detail-body {
    width: Px(750);
    /* height: Px(465); */
    background: #ffffff;
    /* margin-top: Px(20); */
    margin-top: 1px;
    overflow: hidden;

    .detail-body-content {
      width: Px(680);
      /* height: Px(453); */
      margin: 0 auto;
      margin-top: Px(10);

      /* border: 1px solid red; */
      .body-content-item {
        width: Px(680);
        height: Px(90);
        line-height: Px(90);
        border-bottom: 1px solid #eeeff1;
        display: flex;

        .item-left {
          width: Px(340);
          height: Px(90);
          flex-direction: row;
          line-height: Px(90);
          /* text-align: left; */
          font-size: Px(28);
          color: #333333;
          .loan-font {
            float: left;
            height: Px(90);
            line-height: Px(90);

          }
          .loan-what {
            float: left;
            width: Px(28);
            height: Px(90);
            line-height: Px(90);
            background: url('./img/what.png') no-repeat center;
            background-size: Px(28);
            margin-left: Px(10);
            position: relative;
            .loan-answer {
              position: absolute;
              top: Px(-30);
              left: Px(37.5);
              width: Px(403);
              // height: Px(136);
              // background: url('./img/cash-answer.png') no-repeat center / 100% 100%;
              &::before{
                position: absolute;
                left: 0;
                top: 1rem;
                width: 0;
                height: 0;
                border-width: .2rem .25rem 0;
                border-color: rgba(#000, .4) transparent rgba(#000, .4) ;
                border-style: solid;
                content: '';
                transform: rotate(90deg);
              }
              span{
                position: absolute;
                left: .354rem;
                background-color: rgba(#000, .4);
                padding: .2rem;
                border-radius: .1rem;
                line-height: .4rem;
                font-size: .3rem;
                color: #fff;
                z-index: 1;
              }
            }
          }
        }

        .item-right {
          width: Px(340);
          height: Px(90);
          flex-direction: row;
          line-height: Px(90);
          text-align: right;
          font-size: Px(28);
          color: #333333;
        }


      }
      .no-border {
        width: Px(680);
        height: Px(90);
        line-height: Px(90);
        display: flex;

        .item-left {
          width: Px(340);
          height: Px(90);
          flex-direction: row;
          line-height: Px(90);
          text-align: left;
          font-size: Px(28);
          color: #333333;
        }

        .item-right {
          width: Px(340);
          height: Px(90);
          flex-direction: row;
          line-height: Px(90);
          text-align: right;
          font-size: Px(28);
          color: #333333;
        }

      }
      .body-content-items {
        width: Px(680);
        height: Px(117);
        line-height: Px(117);
        border-bottom: 1px solid #eeeff1;
        display: flex;

        .item-left {
          width: Px(340);
          height: Px(117);
          flex-direction: row;
          line-height: Px(117);
          text-align: left;
          font-size: Px(28);
          color: #333333;
        }

        .item-right {
          width: Px(340);
          height: Px(117);
          flex-direction: row;
          line-height: Px(117);
          text-align: right;
          font-size: Px(34);
          color: #333333;
          font-weight: 600;
          span {
            font-size: Px(24);
            text-align: bottom;
            font-weight: 600;
          }
        }

        .fk {
          color: $maincolor;
        }

        .jkje {
          color: #ff593f;
        }
      }
    }
  }

  .loan-content {
    width: Px(750);
    height: Px(180);
    background: #ffffff;
    margin-top: Px(20);

    .loan-top {
      width: Px(750);
      height: Px(70);
      display: flex;

      .loan-title {
        flex-direction: row;
        line-height: Px(70);
        font-size: Px(26);
        color: #333333;
        margin-left: Px(30);
        float: left;
      }

      /* img {
        width: Px(560);
        height: Px(70);
        vertical-align: middle;
        float: left;
      } */


      .loan-font {
        width: Px(529);
        height: Px(70);
        flex-direction: row;
        background: url('./img/warning.png') no-repeat center / 100% 100%;
        margin-left: Px(6);

        .loan-tips {
          width: Px(480);
          height: Px(70);
          margin-left: Px(26);
          /* border: 1px solid red; */
          font-size: Px(20);
          color: #ffffff;
          line-height: Px(33);
        }
      }
    }

    .loan-font-one {
      width: Px(750);
      height: Px(40);
      text-align: center;
      line-height: Px(40);
      font-size: Px(25);
      color: #333333;
      margin-top: Px(25);

      span {
        color: #ff4e33;
      }
    }

    .loan-font-two {
      width: Px(750);
      height: Px(40);
      text-align: center;
      line-height: Px(40);
      font-size: Px(25);
      color: #919191;
    }
  }
  .repayment-hks-pay {
    width: Px(750);
    // height: Px(182);
    background: #ffffff;
    margin-top: Px(20);
    .hks-pay-header {
      width: Px(720);
      height: Px(70);
      // margin-left: Px(30);
      line-height: Px(70);
      font-size: Px(26);
      // color: #5b5b5b;

    }
    .hks-pay-wx {
      width: Px(690);
      height: Px(112);
      border-bottom: Px(2) solid #eeeff1;
      // margin-left: Px(30);
      display: flex;
      img {
        width: Px(70);
        height: Px(70);
        margin-top: Px(21);
        vertical-align: middle;
        flex-direction: row;
      }
      .wx-content {
        width: Px(539);
        height: Px(112);
        flex-direction: row;
        margin-left: Px(30);
        .wx-content-top {
          width: Px(539);
          height: Px(42);
          padding-top: Px(20);
          text-align: left;
          font-size: Px(32);
          color: #000000;
        }
        .wx-content-footer {
          width: Px(539);
          height: Px(32);
          line-height: Px(32);
          font-size: Px(22);
          color: #a5a5a5;
          text-align: left;
        }
      }
      .wx-right {
        width: Px(81);
        height: Px(112);
        text-align: center;
        line-height: Px(22.5);
        .repayment-select {
          width: Px(34);
          height: Px(34);
          margin-top: Px(21 + 19);
        }
      }
    }
  }
  .cash-footer {
    width: 100%;
    height: Px(85);
    text-align: center;
    margin-top: Px(130);
    padding-bottom: Px(100);
    .cash-btn {
      width: Px(600);
      height: Px(85);
      outline: none;
      background: none;
      border: none;
      background: $maincolor;
      font-size: Px(28);
      color: #ffffff;
      border-radius: Px(42.5);
    }
    .check-container{
        margin-top: .3rem;
    }
    .check-box{
        font-size: .34rem;
        input {
            display: none;
            & + .check-icon{
                position: relative;
                display: inline-block;
                width: .3rem;
                height: .3rem;
                border: 1px solid #DEDEDE;
                vertical-align: middle;
                margin-right: .2rem;
            }
            &:checked + .check-icon{
                border-color: $maincolor;
                &::before{
                    position: absolute;
                    top: -30%;
                    left: 15%;
                    width: 50%;
                    height: 100%;
                    border-bottom: 1px solid $maincolor;
                    border-right: 1px solid $maincolor;
                    transform: rotate(45deg);
                    content: '';
                }
            }
        }
        span{
            vertical-align: middle;
        }
        a{
            text-decoration: none;
            color: $maincolor;
            vertical-align: middle;
        }
    }
  }
  .item-xin{
    width: 100%;
    color: #fb8e3b;
    font-size: Px(70);
  }
</style>
