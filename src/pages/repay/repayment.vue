<template>
  <div v-cloak >
    <!-- :style="`transform:translate(0,${native.statusBarHeight}px)`" -->
    <div class="repay-hkmx-title">还款明细</div>

    <div class="repayment-hk">
      <div class="repayment-hk-top">
        <div class="hk-top-left">借款金额</div>
        <div class="hk-top-right">{{apply_money}}元</div>
      </div>
      <div class="repayment-hk-top">
        <div class="hk-top-left">滞纳金</div>
        <div class="hk-top-right">{{late_money}}元</div>
      </div>
    </div>

    <div class="repayment-hks">
      <div class="repayment-hk-top">
        <div class="hk-top-left">应付金额</div>
        <div class="hk-top-right">{{expire_money}}元</div>
      </div>
    </div>

    <div class="repayment-hks-pay">
      <div class="hks-pay-header">支付方式</div>
      <div class="hks-pay-wx" v-for="item in bank" @click="currentBankCardId = item.card_id">
        <img src="./img/bankCar.png" alt="">
        <div class="wx-content">
          <!-- <div class="wx-content-top">银行卡({{ cardNo }})</div> -->
          <div class="wx-content-top">{{ item.bank_name }}</div>
          <div class="wx-content-footer">亿万用户的选择，更快更安全</div>
        </div>
        <div class="wx-right" @click="changewx">
          <img src="./img/select.png" alt="" class="repayment-select" v-show="currentBankCardId === item.card_id">
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="detail-footer">
      <button class="detail-btn" @click="confirm">确认还款</button>
    </div>
  </div>
</template>
<script>
import {getString} from '../../utils/getString.js'
export default {

  data() {
    return {
      changeWX: true,
      order_no: this.$route.query.order_no?this.$route.query.order_no : getString('order_no') , // 订单号
      late_money: 0, // 滞纳金
      expire_money: 0, // 应还金额
      apply_money: 0,  // 借款金额
      cardNo: '',
      confirmState: false, // 确认还款状态
      bank: {}, // 银行卡列表
      currentBankCardId: '', // 当前选择的银行卡id
    }
  },
  mounted() {
    this.$vux.loading.show({
      text: 'Loading'
    });
    // this.$http({
    //   methods: 'post',
    //   url: 'auth/bankInfo',
    // }).then((res)=>{
    //   if (res.data.status === 0) {
    //     this.cardNo = res.data.data.card_no.substr(-4)
    //   }
    // })
    this.$http({
      methods: 'post',
      url: 'finance/payWay',
    }).then((res)=>{
      if (res.data.status === 0) {
        this.bank = res.data.data.bank
        this.currentBankCardId = this.bank[0].card_id
      }
    })
    this.getInfo();
  },
  methods: {
    // 获取详情数据
    getInfo() {
      var that = this;
      that.$http({
        methods: 'post',
        url: 'loan/repaymentDetail',
        data: {
          order_no: that.order_no
        }
      }).then((res) => {
        if (res.data.status == 0) {
          that.expire_money = res.data.data.expire_money;
          that.apply_money = res.data.data.apply_money;
          that.late_money = res.data.data.late_money;

        } else {
          // this.$vux.alert({
          //   message: res.data.msg
          // })
          // that.$tips(res.data.msg);
        }
        that.$vux.loading.hide();
      },(error) => {
        that.$vux.loading.hide();
        // that.$tips('获取数据出错(loan/repaymentDetail)');
        // this.$vux.alert({
        //   message: '获取数据出错(loan/repaymentDetail)'
        // })
      })
    },

    // 点击确认还款按钮
    async confirm() {
      if (this.confirmState) return
      this.confirmState = true

      this.$http({
        methods: 'post',
        url: 'pay/repayment',
        data: {
          orderNo: this.order_no,
          card_id: this.currentBankCardId,
        },
      }).then(async (res) => {
        this.$vux.toast.hide()
        if (+res.data.status !== 0) {
          this.$router.push({
            path: `\
/?pay_result=2&msg=${encodeURI(res.data.msg)}&order_no=${this.order_no}`,
          })
          return
        }
        // this.$vux.toast.show({
        //   type: 'toast', text: '还款成功',
        // })
        // setTimeout(() => {
        this.$router.push({
          path: `\
/?pay_result=1&msg=${encodeURI('还款成功')}&order_no=${this.order_no}`,
        })
        // }, 300)
      })
    },
    // 点击银行卡支付
    changewx() {
      // this.changeZFB = false;
      if (this.changeWX) {
        this.changeWX = false;
      } else {
        this.changeWX = true;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
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
.repay-hkmx-title {
  width: Px(700);
  height: Px(80);
  line-height: Px(80);
  text-align: left;
  font-size: Px(30);
  color: #333333;
  margin: 0 auto;
  font-weight: 500;
}
.repayment-hk {
  width: Px(750);
  height: Px(162);
  background: #ffffff;
  .repayment-hk-top {
    width: Px(750);
    height: Px(81);
    line-height: Px(81);
    display: flex;
    .hk-top-left {
      width: Px(338);
      height: Px(81);
      line-height: Px(81);
      font-size: Px(26);
      color: #333333;
      margin-left: Px(30);
      flex-direction: row;
      text-align: left;
    }
    .hk-top-right {
      width: Px(338);
      height: Px(81);
      line-height: Px(81);
      font-size: Px(26);
      color: #333333;
      flex-direction: row;
      text-align: right;
    }
  }
}

.repayment-hks {
  width: Px(750);
  height: Px(81);
  background: #ffffff;
  margin-top: Px(20);
  .repayment-hk-top {
    width: Px(750);
    height: Px(81);
    line-height: Px(81);
    display: flex;
    .hk-top-left {
      width: Px(338);
      height: Px(81);
      line-height: Px(81);
      font-size: Px(26);
      color: #333333;
      margin-left: Px(30);
      flex-direction: row;
      text-align: left;
    }
    .hk-top-right {
      width: Px(338);
      height: Px(81);
      line-height: Px(81);
      font-size: Px(26);
      color: #ff593f;
      flex-direction: row;
      text-align: right;
    }
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
    margin-left: Px(30);
    line-height: Px(70);
    font-size: Px(26);
    color: #5b5b5b;

  }
  .hks-pay-wx {
    width: Px(690);
    height: Px(112);
    border-bottom: Px(2) solid #eeeff1;
    margin-left: Px(30);
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
.detail-footer {
  width: Px(750);
  height: Px(120);
  position: absolute;
  bottom: 0;
  text-align: center;
  background: #ffffff;
  overflow: hidden;
  .detail-btn {
    width: Px(400);
    height: Px(88);
    border-radius: Px(44);
    outline: none;
    border: none;
    background: none;
    margin-top: Px(16);
    color: #ffffff;
    @include main-back;
    font-size: Px(26);
  }
}

</style>
