<template>
  <div classs="loan-detail" :style="`transform:translate(0,${native.statusBarHeight}px)`">
    <div class="detial-header">
      <div class="detail-header-top">总应还金额(元)</div>
      <div class="detail-header-footer">
        <span class="icon">￥</span>
        <span class="number">1000</span>
      </div>
    </div>

    <div class="detail-body">
      <div class="detail-body-content">
        <div class="body-content-item">
          <div class="item-left">固定周期</div>
          <div class="item-right">7天</div>
        </div>
        <div class="body-content-item">
          <div class="item-left">借款状态</div>
          <div class="item-right fk">已放款</div>
        </div>
        <div class="body-content-item">
          <div class="item-left">申请时间</div>
          <div class="item-right">2018-09-25 15:25</div>
        </div>
        <div class="body-content-item">
          <div class="item-left">借款时间</div>
          <div class="item-right">2018-09-15至2018-10-01</div>
        </div>
        <!-- <div class="body-content-item">
          <div class="item-left">借款金额</div>
          <div class="item-right jkje">100000.00元</div>
        </div> -->
      </div>
    </div>

    <div class="loan-content">
      <div class="loan-top">
        <div class="loan-title">滞纳金</div>
        <div class="loan-what" @click="tipsSwitch"></div>
        <div class="loan-font" v-show="showTips">
          <div class="loan-tips">
            如果产生逾期，会有逾期的滞纳金收取哦，请按时还款 避免逾期。
          </div>
        </div>
        <!-- <img src="./img/znj.png"> -->
        <!-- <img src="./img/what.png" class="loan-what"> -->
      </div>
      <div class="loan-font-one">已逾期99天，产生<span>19.00元</span>滞纳金</div>
      <div class="loan-font-two">无逾期，暂无产生滞纳金</div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        showTips: false
      }
    },
    methods: {
      // 提示切换
      tipsSwitch() {
        if (this.showTips) {
          this.showTips = false;
        } else {
          this.showTips = true;
        }
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

  .detial-header {
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
  }

  .detail-body {
    width: Px(750);
    height: Px(465);
    background: #ffffff;
    margin-top: Px(20);
    overflow: hidden;

    .detail-body-content {
      width: Px(680);
      height: Px(453);
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
      .loan-what {
        flex-direction: row;
        width: Px(28);
        height: Px(70);
        line-height: Px(70);
        background: url('./img/what.png') no-repeat center;
        background-size: Px(28);
        margin-left: Px(10);
      }
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
</style>
