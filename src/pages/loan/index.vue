<template>
  <div v-cloak>
    <div class="scroll-container" :style="`transform:translate(0, ${native.statusBarHeight}px)`">
      <scroller ref="scroll" :data="list" :pullDownRefresh="true" :pullUpLoad="true" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
        <div class="loan-item" v-for="(item, index) in list" :key="index"  v-show="islist==true">
            <div class="item-top">
                <div class="item-top-left">提现金额</div>
                <div class="item-footer">{{item.apply_time}}</div>
            </div>
            <div class="item-top-right">{{item.apply_money}}元</div>
        </div>
        <!-- <div class="loan-item">
            <div class="item-top">
                <div class="item-top-left">提现金额</div>
                <div class="item-footer">item.apply_time}}</div>
            </div>
            <div class="item-top-right">item.apply_money}}元</div>
        </div> -->
        
        <div v-show="islist==false">
            <no-record ></no-record>
        </div>
    </scroller>
    </div>      
  </div>
</template>

<script>
  //     @pullingDown="onPullingDown"
  import Scroller from '../../components/scroller'
  import noRecord from './noRecord.vue'
  import {
    cashTime
  } from '../../utils/timeConversion.js';
  export default {
    components: { 
      Scroller,
      noRecord
    },
    data () {
      return {
        list: [],
        pageSize: 10,
        totalNumber: 0, // 总条数
        pageIndex: 1,
        islist: true
      }
    },
    mounted () {
      this.$vux.loading.show({
        text: 'Loading'
      })
      this.getData();
      console.log(native.statusBarHeight);
    },
    methods: {
      // 获取数据
      getData () {
        var that = this;
        that.$http({
          methods: 'post',
          url: 'loan/repaymentList',
          data: {
            page: that.pageIndex,
            page_size: that.pageSize
          }
        }).then((res) => {
          if (res.data.status == 0) {
            if (that.pageIndex === 1) {
              // that.list = res.data.data.list;
              that.list = [];
              var cashList = res.data.data.list
            } else {
              // that.list = that.list.concat(res.data.data.list);
              var cashList = res.data.data.list
            }
            that.totalNumber = parseInt(res.data.data.count);

            for (var i=0; i < cashList.length; i++) {
              var apply_time = parseInt(cashList[i].apply_time);
              var expire_time = parseInt(cashList[i].expire_time)
              console.log(apply_time);
              cashList[i].apply_time = cashTime(apply_time);
              cashList[i].expire_time = cashTime(expire_time);
            }

            that.list = that.list.concat(cashList);
            if (that.list.length == 0) {
              that.islist = false;
            } else {
              that.islist = true;
            }
            
          } else {
            // that.$tips(res.data.msg);
          }
          that.$vux.loading.hide()
        })
      },
      onPullingDown(){
         // 刷新数据
        console.log("刷新");
        this.startTime = new Date().getTime();
        this.pageIndex = 1;
        this.getData();
     
      },
      onPullingUp(){
        // 加载数据
        console.log("加载");
        if (this.totalNumber <= this.list.length) {
          this.list = this.list.concat([]);
          return
        }
        this.startTime = new Date().getTime();
        this.pageIndex++;
        this.getData();

      }
    }
  }
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.scroll-container{
  position: absolute;
  left:0;
  top: Px(85);
  bottom:0px;
  width:100%;
}
.repay-header {
  width: Px(750);
  height: Px(85);
  background: #ffffff;
  position: relative;
  border-bottom: Px(2) solid #f9f9f9;
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
.loan-item {
  width: Px(706);
  height: Px(120);
  margin: 0 auto;
  border-bottom: Px(2) solid #f2f2f2;
  overflow: hidden;
  display: flex;
  /* border: 1px solid #000; */
  .item-top {
    width: Px(450);
    height: Px(78);
    /* display: flex; */
    margin-top: Px(12);
    flex-direction: row;
    /* border: 1px solid red; */
    margin-top: Px(21);
    .item-top-left {
      width: Px(450);
      height: Px(26);
      text-align: left;
      font-size: Px(26);
      color: #333333;
      margin-bottom: Px(15);
    }
    .item-footer {
      width: Px(450);
      height: Px(22);
      text-align: left;
      font-size: Px(22);
      color: #919191;
      margin-top: Px(15);
    }
  }
  .item-top-right {
    flex-direction: row;
    width: Px(353);
    height: Px(120);
    line-height: Px(120);
    text-align: right;
    font-size: Px(26);
    font-weight: 700;
    color: #333333;
  }
  
}
</style>

