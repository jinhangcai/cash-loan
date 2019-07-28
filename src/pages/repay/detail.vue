<template>
  <div v-cloak >
    <!-- :style="`transform:translate(0,${native.statusBarHeight}px)`" -->
    <div class="detial-header" >
      <div class="detail-header-top">总应还金额(元)</div>
      <div class="detail-header-footer">
        <span class="icon">￥</span>
        <span class="number">{{expire_money}}</span>
      </div>
    </div>

    <div class="detail-body">
      <div class="detail-body-content">
        <div class="body-content-item">
          <div class="item-left">固定周期</div>
          <div class="item-right">{{apply_days}}天</div>
        </div>
        <div class="body-content-item">
          <div class="item-left">借款状态</div>
          <div class="item-right fk">{{auditor_state}}</div>
        </div>
        <div class="body-content-item">
          <div class="item-left">申请时间</div>
          <div class="item-right">{{apply_time}}</div>
        </div>
        <div class="body-content-item">
          <div class="item-left">借款时间</div>
          <div class="item-right">{{pay_time}}</div>
        </div>
        <div class="body-content-item">
          <div class="item-left">滞纳金</div>
          <div class="item-right">{{late_money}}元</div>
        </div>
        <div class="body-content-item">
          <div class="item-left">借款金额</div>
          <div class="item-right jkje">{{apply_money}}元</div>
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
    </div>

    <!-- 底部按钮 -->
    <div class="detail-footer">
      <button class="detail-btn" @click="jumpRepay">立即还款</button>
    </div>
    <!-- 选择续借  立即还款 -->
    <section class="dialog-box">
      <transition name="opacity">
        <div v-if="showDialog" class="dialog-back" @click="showDialog = false"></div>
      </transition>
      <transition name="scale">
        <div v-if="showDialog" class="dialog-body back">
          <div v-if="showRebrown" class="dia-tips">请选择<em>“续借”</em>还是<em>“还款”</em></div>
          <div v-else class="dia-tips">请选择<em>“还款”</em></div>
          <div class="btn-box">
            <div v-if="showRebrown" class="btn-left">
              <span @click="reBrown(1)">续借</span>
            </div>
            <div class="btn-right">
              <span @click="openDialog3">还款</span>
            </div>
          </div>
        </div>
      </transition>
    </section>
    <!-- 续借 -->
    <section class="dialog-box">
      <transition name="opacity">
        <div v-if="showDialog2" class="dialog-back" @click="showDialog2 = false"></div>
      </transition>
      <transition name="scale">
        <div v-if="showDialog2" class="dialog-body">
          <div class="content">
            <div class="dialog-title">应缴纳续借服务费:</div>
            <div class="num"><em>{{ delayInfo.serviceMoney }}</em>元</div>
            <div class="tips">续借后您的还款日期更改为{{ formatTime }}</div>
          </div>
          <div class="btn-box">
            <div class="btn-left">
              <span @click="reBrown(0)">确认续借</span>
            </div>
            <div class="btn-gray">
              <span @click="showDialog2 = false">取消</span>
            </div>
          </div>
        </div>
      </transition>
    </section>
    <!-- 立即还款 -->
    <section class="dialog-box">
      <transition name="opacity">
        <div v-if="showDialog3" class="dialog-back" @click="showDialog3 = false"></div>
      </transition>
      <transition name="scale">
        <div v-if="showDialog3" class="dialog-body dialog3">
          <div class="content">
            <div class="dialog-title">应还款金额费:</div>
            <div class="num num2"><em>{{ expire_money }}</em>元</div>
          </div>
          <div class="btn-box">
            <div class="btn-right">
              <span @click="confirm">确认还款</span>
            </div>
            <div class="btn-gray">
              <span @click="showDialog3 = false">取消</span>
            </div>
          </div>
        </div>
      </transition>
    </section>

  </div>
</template>

<script>
import {
  timeconversion
} from '../../utils/timeConversion.js';
  export default {
    data() {
      return {
        // order_no: '', // 订单编号
        expire_money: 0, // 应还总金额
        apply_days: '', // 固定周期
        service_money: '', // 手续费
        apply_time: '', // 申请时间
        pay_time: '', // 借款时间
        expire_time: '', // 到期时间
        apply_money: 0, // 借款金额
        late_money: 0, // 滞纳金金额
        // order_no: '', // 订单编号
        auditor_state: '', // 订单状态

        changeWX: true,
        order_no: this.$route.query.order_no?this.$route.query.order_no : '' , // 订单号
        confirmState: false, // 确认还款状态
        reBrownStatus: false, // 确认续借状态
        bank: [], // 银行卡列表
        currentBankCardId: '', // 当前选择的银行卡id

        showRebrown: false, // 是否显示续借
        showDialog: false, // 是否显示弹框
        showDialog2: false, // 是否显示弹框
        showDialog3: false, // 是否显示弹框
        delayInfo: {}, // 续借信息
      }
    },
    created() {
        this.getConfig()
    },
    mounted() {
      this.$vux.loading.show({
        text: 'Loading'
      });

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
    computed: {
        // 计算续借还款时间
      formatTime() {
        if (this.delayInfo.delayDays) {
          let nowTime = Number(new Date()) / 1000
          // 到期时间 > 当前时间
          if (Number(this.delayInfo.expireTime) > nowTime) {
            // 未逾期
            let time = Number((this.delayInfo.delayDays*1 - 2) * 60 * 60 * 24) + Number(this.delayInfo.expireTime)
          } else {
            // 逾期
            let time = Number((this.delayInfo.delayDays*1 - 1) * 60 * 60 * 24) + Number(this.delayInfo.expireTime)
          }
            return timeconversion(time)
        }
        return ''
      }
    },
    methods: {
      // 跳转至立即还款
      jumpRepay() {
        this.showDialog = true
        // this.$router.push({
        //   path: '/repayment', query: { order_no: this.order_no },
        // })
      },
      openDialog2() {
          this.showDialog = false
          this.showDialog2 = true
      },
      openDialog3() {
          this.showDialog = false
          this.showDialog3 = true
      },
      // 获取详情数据
      getInfo() {
        // loan/list
        var that = this;
        that.order_no = that.$route.query.id;
        // console.log(that.order_no);
        that.$http({
          methods: 'post',
          url: 'loan/repaymentDetail',
          data: {
            order_no: that.order_no
          }
        }).then((res) => {
          if (res.data.status == 0) {
            that.expire_money = res.data.data.expire_money;
            that.apply_days = res.data.data.apply_days;
            that.service_money = res.data.data.service_money;
            that.apply_time = timeconversion(res.data.data.apply_time);
            that.pay_time = res.data.data.pay_time ? timeconversion(res.data.data.pay_time) : timeconversion(res.data.data.apply_time);
            that.expire_time = timeconversion(res.data.data.expire_time);
            that.apply_money = res.data.data.apply_money;
            that.late_money = res.data.data.late_money;
            switch (res.data.data.auditor_state) {
              case '1':
                that.auditor_state = '待审核';
                break;
              case '2':
                that.auditor_state = '审核中';
                break;
              case '3':
                that.auditor_state = '待放款';
                break;
              case '4':
                that.auditor_state = '已放款';
                break;
              case '5':
                that.auditor_state = '拒绝受理';
                break;
              case '6':
                that.auditor_state = '已结清';
                break;
              case '7':
                that.auditor_state = '逾期';
                break;
              case '8':
                that.auditor_state = '失联';
                break;
              case '9':
                that.auditor_state = '取消';
                break;
            }
          } else {
            // this.$vux.alert({
            //   message: res.data.msg
            // })
            // that.$tips(res.data.msg)
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
        this.$vux.loading.show({
          text: 'Loading'
        });
        this.$http({
          methods: 'post',
          url: 'pay/repayment',
          data: {
            orderNo: this.order_no,
            card_id: this.currentBankCardId,
          },
        }).then(async (res) => {
          this.$vux.loading.hide()
          this.$vux.toast.hide()
          if (+res.data.status !== 0) {
            this.$router.push(`/?pay_result=2&msg=${encodeURI(res.data.msg)}&order_no=${this.order_no}`)
            return
          }
          // this.$vux.toast.show({
          //   type: 'toast', text: '还款成功',
          // })
          // setTimeout(() => {
  //         this.$router.push({
  //           path: `\
  // /?pay_result=1&msg=${encodeURI('还款成功')}&order_no=${this.order_no}`,
  //         })
          this.$router.push(`/?pay_result=1&msg=${encodeURI('还款成功')}&order_no=${this.order_no}`)
          // }, 300)
        })
      },
      // 申请延期还款（续借）
      async reBrown(isConfirm) {
        if (isConfirm == 0) {
          if (this.reBrownStatus) return
          this.reBrownStatus = true
        }
        this.$vux.loading.show({
          text: 'Loading'
        });
        // return
        this.$http({
          methods: 'post',
          url: 'pay/delayRepayment',
          data: {
            orderNo: this.order_no,
            card_id: this.currentBankCardId,
            payType: 1, //	是	int	填1
            isConfirm: isConfirm, //	否	int	填1为续借确认提示   0: 提交信息    1：获取信息
          },
        }).then(async (res) => {
          this.$vux.loading.hide()
          if (+res.data.status !== 0) {
            if (isConfirm == 0) {
              this.$router.push({
                path: `/?pay_result=2&msg=${encodeURI(res.data.msg)}&order_no=${this.order_no}`,
              })
              return
            }
          } else {
            if (isConfirm == 0) {
              this.$router.push({
                path: `/?pay_result=1&msg=${encodeURI('续借成功')}&order_no=${this.order_no}`,
              })
            } else {
              this.openDialog2()
              this.delayInfo = res.data.data
            }
          }
          // this.$vux.toast.show({
          //   type: 'toast', text: '还款成功',
          // })
          // setTimeout(() => {

          // }, 300)
        }).catch(() => {
          that.$vux.loading.hide();
        })
      },

      // 获取系统通用配置
      getConfig() {
        // loan/list
        var that = this;
        that.order_no = that.$route.query.id;
        // console.log(that.order_no);
        that.$http({
          methods: 'get',
          url: 'index/getSysConfig?configName=RECEIPT_PAY',
        }).then((res) => {
          if (res.data.status == 0) {
            this.showRebrown = res.data.data.config == 1 ? true : false
          }
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
.detial-header {
  width: Px(750);
  height: Px(186);
  background: #ffffff;
  overflow: hidden;
  margin-top: Px(10);
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
}
.detail-body {
  display: block;
  width: Px(750);
  // height: Px(465);
  background: #ffffff;
  margin: Px(20) 0 1.9rem;
  overflow: hidden;
  padding: 0 0 3rem;
  /* border: 1px solid #000; */
  .detail-body-content {
    // width: Px(680);
    // height: Px(453);
    margin: 0 auto;
    margin-top: Px(10);
    padding: .4rem;
    background: #ffffff;
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
      .fk {
        color: $maincolor;
      }
      .jkje {
        color: #ff593f;
      }
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
  position: fixed;
  bottom: 0;
  text-align: center;
  background: #ffffff;
  overflow: hidden;
  .detail-btn {
    width: Px(400);
    height: Px(88);
    border-radius: Px(40);
    outline: none;
    border: none;
    background: none;
    margin-top: Px(16);
    color: #ffffff;
    // background: $maincolor;
    @include main-back;
    font-size: Px(26);
  }
}
.dialog-back{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(#000, .6);
}
.dialog-body{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: table;
  width: 80%;
  height: Px(400);
  background-color: #fff;
  border-radius: .1rem;
  &.dialog3 {
    height: Px(350);
  }
  &.back{
    height: Px(300);
    // background: url('./img/dialog_back.png') center no-repeat;
    // background-size: 100% 100%;
  }
  .dia-tips{
    text-align: center;
    font-size: .48rem;
    margin: .8rem 0 0;
    em{
      color: $maincolor;
    }
  }
  .content{
    text-align: center;
    padding: .6rem;
    .dialog-title{
      font-size: .45rem;
      color: #333333;
    }
    .num{
      color: $maincolor;
      margin: .2rem 0;
      em{
        font-size: 1rem;
        font-weight: bold;
      }
      &.num2{
        color: #6DB4FF;
      }
    }
    .tips{
      font-size: .3rem;
      color: #666666;
    }
  }
  .btn-box{
    position: absolute;
    bottom: .5rem;
    left: 0;
    right: 0;
    display: flex;
    color: #fff;
    padding-bottom: .1rem;
    .btn-left,
    .btn-gray,
    .btn-right{
      flex: 1;
      text-align: center;
      span{
        display: block;
        line-height: .7rem;
        width: 2.5rem;
        padding: .1rem;
        margin: .2rem auto;
        background-color: $maincolor;
        border-radius: .4rem;
      }
    }
    .btn-right{
      span{
       // background-color: #6DB4FF;
      }
    }
    .btn-gray{
      span{
        background-color: #AEAEAE;
      }
    }
  }
}
.scale- {
    &enter-active {
        // transition: all .4s;
        animation: bounce-in .5s ease-out;
    }

    &leave-active {
        transition: all 1s;
    }
    &leave-to {
        opacity: 0;
    }
}
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.opacity- {
    &enter-active {
        transition: opacity 0.3s;
    }

    &leave-active {
        transition: opacity 1s;
    }

    &enter {
        opacity: 0;
    }

    &leave-to {
        opacity: 0;
    }
}
</style>

