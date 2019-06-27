<template>
  <div v-cloak  >
    <div class="content-box">
      <div class="baitiao-repay"> 
        <div class="headerBar">
          <header-bar title="待还款"></header-bar>
        </div>
        <div class="repay-add"></div>
        <div class="repay-allyh">总应还金额(元)</div>
        <div class="repay-allmoney">{{allMoney}}</div>
        <div class="repay-top">
          <div class="repay-top-item">
            <div class="repay-top-item-top">{{recentDay}}</div>
            <div class="repay-top-item-footer">最近还款日</div>
          </div>
          <div class="item-interval"></div>
          <div class="repay-top-item">
            <div class="repay-top-item-top">{{repayNum}}</div>
            <div class="repay-top-item-footer">借款笔数</div>
          </div>
          <div class="item-interval"></div>
          <div class="repay-top-item">
            <div class="repay-top-item-top">{{lateNum}}</div>
            <div class="repay-top-item-footer">逾期笔数</div>
          </div>
        </div>
      </div>

      <div class="repay-hkmx-title">还款明细</div>
      <!-- 每笔还款明细 -->
      <div class="repay-hkmx-content" v-for="item in list" v-show="havaData==true">
        <div class="repay-humx-content-top">
          <div class="content-top-left">{{item.expire_time}}</div>
          <div class="content-top-right">{{item.expire}}</div>
        </div>
        <div class="repay-hkmx-content-footer">
          <div class="content-footer-left">
            <div class="content-left-box">
              <div class="footer-left-top">{{item.expire_money}}</div>
              <div class="footer-left-footer">应还金额</div>
            </div>
            
          </div>
          <div class="content-footer-right">
            <button class="contetn-right-btn" @click="jumpDetail(item.order_no)">立即还款</button>
          </div>
        </div>
      </div>

      <!-- <div class="repay-hkmx-content">
        <div class="repay-humx-content-top">
          <div class="content-top-left">{item.expire_time}}</div>
          <div class="content-top-right">{item.expire}}</div>
        </div>
        <div class="repay-hkmx-content-footer">
          <div class="content-footer-left">
            <div class="content-left-box">
              <div class="footer-left-top">item.expire_money}}</div>
              <div class="footer-left-footer">应还金额</div>
            </div>
            
          </div>
          <div class="content-footer-right">
            <button class="contetn-right-btn" @click="jumpDetail(item.order_no)">立即还款</button>
          </div>
        </div>
      </div> -->
      <!-- 暂无记录 -->
      <div class="no-data" v-show="havaData==false">
        <div class="repay-no-content"></div>
        <div class="no-data-tips">暂无记录</div>
      </div>
      
    </div>
  </div>
</template>

<script>
  import headerBar from './header/index.vue'
  import {
    timeconversion,
    timeUnix,
    lately
  } from '../../utils/timeConversion.js';
  export default {
    components: {
      headerBar
    },
    data() {
      return {
        list: [], // 待还款列表
        allMoney: 0, // 总应还款金额
        recentDay: 0, // 最近还款时间
        repayNum: 0, // 借款笔数
        lateNum: 0, // 逾期笔数
        order_no: '', // 订单编号
        expire: '', // 到期天数
        havaData: false, // 是否有数据
        lists: []
      }
    },
    mounted() {
      this.$vux.loading.show({
        text: 'Loading'
      })
      
      // this.$warn('123')
      this.getRepayInfo();
    },
    methods: {
      // 返回上一页
      goBack(){  
        this.$router.go(-1)
      },
      // 跳转至订单详情
      jumpDetail(id) {
        this.order_no = id;
        // if(native.isApp){

        //   this.$web2app('openWebPage',{useStatusBar:1,url: location.origin + location.pathname + '/repay/detail?id=' +
        //   this.order_no })
        // }else{

        // }
        this.$router.push({path: '/repay/detail',query: {id: this.order_no}});
      },
      // 获取近日待还款明细
      getRepayInfo() {
        var that = this;
        that.$http({
          methods: 'post',
          url: 'loan/duesList'
        }).then((res) => {
          if (res.data.status == 0) {
            that.list = res.data.data.list;
            if (that.list.length == 0) {
              that.havaData = false;
            } else {
              that.havaData = true;
            }

            that.allMoney = res.data.data.allMoney;
            if ( that.allMoney == null) {
              that.allMoney = 0;
            }
            if (res.data.data.recentDay == 0) {
              that.recentDay = '----';
            } else {
              that.recentDay = lately(res.data.data.recentDay);
            }
            
            that.repayNum = res.data.data.repayNum;
            that.lateNum = res.data.data.lateNum;
            console.log(JSON.stringify(that.list));
            for (var i=0; i< that.list.length;i++) {
              that.list[i].expire = timeUnix(that.list[i].expire_time);
              that.list[i].expire_time = timeconversion(that.list[i].expire_time);
              // console.log(that.list[i].expire);
            }
            
          } else {
            // that.$tips(res.data.msg);
        
          }
          that.$vux.loading.hide()
        },(error) =>{
          that.$vux.loading.hide()
          // that.$tips('数据获取失败(loan/duesList)');
       
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.content-box{
  min-height: 100vh;
  background-color: #fff;
}
.baitiao-repay {
  width: Px(750);
  height: Px(412);
  background-color: $maincolor;
  box-shadow: 0 0 5px 1px $maincolor2;
//   background: url('./img/jrdh-top.png') no-repeat center / 150% 100%;
  position: relative;
  .headerBar {
    width: Px(750);
    height: Px(85);
    overflow: hidden;
  }
  /* border-top: Px(0.1) solid #6aadff; */
  .repay-header {
    width: Px(750);
    height: Px(85);
    position: relative;
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
      color: #ffffff;
      line-height: Px(85);
      text-align: center;
    }
  }
  .repay-add {
    width: Px(750);
    height: Px(85);
    /* border: 1px solid #000; */
  }
  .repay-allyh {
    width: Px(750);
    height: Px(40);
    text-align: center;
    line-height: Px(40);
    font-size: Px(24);
    color: #ffffff;
    padding-bottom: Px(20);
  }
  .repay-allmoney {
    width: Px(750);
    text-align: center;
    font-size: Px(70);
    line-height: Px(70);
    font-weight: 700;
    color: #ffffff;
  }
  .repay-top {
    width: Px(700);
    height: Px(132);
    background: #ffffff;
    border-radius: Px(8);
    box-shadow: 0 0 4px 1px rgba(#000, .06);
    position: absolute;
    bottom: Px(-75);
    left: Px(25);
    display: flex;
    .repay-top-item {
      width: Px(230);
      height: Px(132);
      flex-direction: row;
      /* border: 1px solid red; */
      .repay-top-item-top {
        width: Px(230);
        height: Px(46);
        line-height: Px(46);
        text-align: center;
        font-size: Px(22);
        color: #333333;
        margin-top: Px(24);
      }
      .repay-top-item-footer {
        width: Px(230);
        text-align: center;
        font-size: Px(24);
        color: #919191;
        /* border: 1px solid red; */
      }
    }
    .item-interval {
      flex-direction: row;
      width: Px(2);
      height: Px(38);
      margin-top: Px(46);
      background: #eeeff1;
    }
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
  margin-top: Px(75);
  font-weight: 500;
}
.repay-hkmx-content {
  width: Px(700);
  height: Px(220);
  border-radius: Px(20);
  margin: 0 auto;
  background: #ffffff;
  margin-bottom: Px(20);
  .repay-humx-content-top {
    width: Px(700);
    margin: 0 auto;
    height: Px(80);
    border-bottom: Px(2) solid #eeeff1;
    display: flex;
    .content-top-left {
      margin-left: Px(30);
      width: Px(320);
      height: Px(80);
      line-height: Px(80);
      font-size: Px(26);
      color: #919191;
      flex-direction: row;
    }
    .content-top-right {
      width: Px(320);
      height: Px(80);
      line-height: Px(80);
      font-size: Px(26);
      color: #ff4e33;
      flex-direction: row;
      text-align: right;
    }
  }
  .repay-hkmx-content-footer {
    width: Px(700);
    height: Px(138);
    display: flex;
    .content-footer-left {
      width: Px(430);
      height: Px(138);
      /* line-height: Px(138); */
      flex-direction: row;
      /* border: 1px solid red; */
      margin-left: Px(30);
      .content-left-box {
        width: Px(430);
        height: Px(90);
        margin-top: Px(24);
        .footer-left-top {
        width: Px(430);
        height: Px(36);
        /* line-height: Px(58); */
        font-size: Px(36);
        color: #333333;
        font-weight: 700;
        text-align: left;
        margin-bottom: Px(15);
      }
      .footer-left-footer {
        width: Px(430);
        height: Px(24);
        /* line-height: Px(46); */
        font-size: Px(24);
        color: #919191;
        text-align: left;
        text-align: top;
        margin-top: Px(15);
      }
    }
      
    }
    .content-footer-right {
      width: Px(205);
      height: Px(138);
      flex-direction: row;
      /* border: 1px solid blue; */
      .contetn-right-btn {
        outline: none;
        border: none;
        background: none;
        width: Px(205);
        height: Px(70);
        line-height: Px(70);
        border-radius: Px(35);
        // background: #238eff;
        @include main-back;
        font-size: Px(24);
        color: #ffffff;
        margin-top: Px(34);
      }
    }
  }
}
.repay-no-content {
  width: 100%;
  height: Px(270);
  background: url('./img/content-no.png') no-repeat center;
  background-size: auto 80%;
  text-align: center;
  margin-top: Px(150);
}
.no-data-tips{
  text-align: center;
  color: #999;
}
.header-hg{
    height: Px(85);
}
 .header-bar {
    width: 100%;
    height: Px(85);
    position: fixed;
    left:0;
    top:0;
    margin-bottom: 1px;

    .back {
      width: Px(70);
      height: 100%;
      position: absolute;
      top: Px(0);
      left: Px(0);
      background:url('./img/fanhui.png') no-repeat center ;
      background-size:Px(20);
    }
    .title{
        text-align:center;
        line-height: Px(85);
        color: #ffffff;
    }
 }
</style>

