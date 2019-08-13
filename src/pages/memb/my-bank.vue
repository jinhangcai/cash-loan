<template>
  <div>
    <!-- <i class="icon-add-bank" @click="addBank"></i> -->
    <section class="list-box">
      <ul class="list" v-if="bankList && bankList.length > 0">
        <li class="list-item" v-for="(item, index) in bankList" :key="index">
          <div class="title">
            <img class="logo" :src="item.logo" alt="">
            <span>{{ item.bank_name.split('(')[0] }}</span>
          </div>
          <div class="num">{{ `${item.last_card_no.slice(0, 4)} **** **** ${item.last_card_no.slice(-4)}` }}</div>
        </li>
        <!-- <li class="list-item">
          <div class="title">工商银行</div>
          <div class="num">6217  ****  ****  6341</div>
        </li> -->
      </ul>
      <div class="add-card" @click="addBank">
        <span>＋</span>
        <span>添加银行卡</span>
      </div>
    </section>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return{
      bankList: [],
      authInfo: {} // 认证信息
    }
  },
  created() {
    this.getState()
    this.getBankList();
  },
  methods: {
    addBank() {
      if (this.authInfo.bank == 3) {
        this.$router.push({path:'/memb/bank?isadd=1'})
      } else {
        this.$vux.toast.text('请您先完成信息认证');
        setTimeout(() => {
          this.$router.push({path:'/memb/info'})
        }, 2000)
      }
    },
    getBankList() {
      this.$http({
        methods: 'post',
        url: 'finance/payWay',
      }).then((res)=>{
        if (res.data.status === 0) {
          this.bankList = res.data.data.bank
          // this.currentBankCardId = this.bankList[0].card_id
        }
      })
    },
    getState(){
      var that =this
      that.$http({
          methods: 'post',
          url: 'auth/detail',
      }).then((res)=>{
        console.log(res.data)
        if (res.data.status === 0) {
          that.$vux.loading.hide()
          that.authInfo = res.data.data
        }else{
          that.$vux.loading.hide()
          // this.$vux.alert({
          //     message: res.data.msg
          //   });
        }
      },(error) => {
        that.$vux.loading.hide()
        // this.$vux.alert({
        //   message: '获取数据出错(auth/detail)'
        // })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-add-bank{
  width: Px(70);
  height: Px(85);
  position: fixed;
  right: Px(10);
  top: 10px;
  background:url('./img/icon_add.png') no-repeat center ;
  background-size:Px(40);
  z-index: 9999;
}
.list-box{
  .list{
    .list-item{
      padding: .4rem;
      margin: .3rem;
      color: #fff;
      text-align: center;
      font-size: .6rem;
      border-radius: .08rem;
      .title{
        text-align: left;
        font-size: .4rem;
        .logo{
          width: .8rem;
          height: .8rem;
          margin-right: .2rem;
          vertical-align: middle;
        }
        span{
          vertical-align: middle;
        }
      }
      .num{
        margin: .3rem 0;
      }
      &:nth-child(3n + 1) {
        background: linear-gradient(135deg, #FA4951, #FC6C48);
        box-shadow: 0 .1rem .2rem .01rem rgba(#FC6C48, .5);
      }
      &:nth-child(3n + 2) {
        background: linear-gradient(135deg, #FF8521, #FABA17);
        box-shadow: 0 .1rem .2rem .01rem rgba(#FABA17, .5);
      }
      &:nth-child(3n) {
        background: linear-gradient(135deg, #7386F4, #21B4FD);
        box-shadow: 0 .1rem .2rem .01rem rgba(#21B4FD, .5);
      }
    }
  }
}
.add-card{
    padding: .3rem .4rem;
    margin: .8rem auto;
    width: 65%;
    color: $maincolor;
    text-align: center;
    font-size: .5rem;
    border: 1px solid $maincolor;
    border-radius: .08rem;
    span{
        display: inline-block;
        line-height: 1rem;
        vertical-align: middle;
    }
    span:first-child{
        font-size: .7rem;
    }
}
.no-data{
    text-align: center;
    padding-top: 3rem;
    .icon{
        width: 40%;
    }
    *{
        display: block;
        margin: auto;
    }
}
</style>

