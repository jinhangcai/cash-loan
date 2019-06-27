<template>
  <div>
    <div class="success-box">
      <div class="success-title">您已还款成功，本次支付了{{money}}元金额</div>
      <div class="success-btn">
        <button class="btns" @click="backIndex">回到首页</button>
        <button class="btn" @click="toPay">去支付</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // money: 100
      }
    },
    props: {
      order_no: String
    },
    methods: {
      backIndex() {
        this.$router.push({
          path: '/'
        });
      },
      toPay() {
        var that = this;
        that.$http({
          methods: 'post',
          url: 'loan/repayment',
          data: {
            orderNo: that.order_no
          }
        }).then((res) => {
          if (res.data.status == 0) {
            that.popup == 1;
          } else {
            // this.$vux.alert({
            //   message: res.data.msg
            // })
          }
        },(error) => {
          // this.$vux.alert({
          //   message: '获取数据出错(loan/repaymentDetail)'
          // })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .success-box {
    width: Px(587);
    height: Px(640);
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: Px(-293.5);
    margin-top: Px(-320);
    background: url('./img/error.png') no-repeat center / 100% 100%;

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
      }
      .btns {
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
      }
    }
  }
</style>