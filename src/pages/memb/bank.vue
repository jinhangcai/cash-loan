<template>
  <div class="box">
    <div class="content">
      <div class="information">
        <span class="title">银行卡姓名</span>
        <span class="text">{{name}}</span>
        <i></i>
      </div>
      <div class="information" @click="list.bank!=3?showBanklist = true:toast()">
        <span class="title">银行卡</span>
        <span class="text">{{bankName}}</span>
        <i></i>
      </div>
      <div class="information" @click="list.bank!=3?isName = true:toast()">
        <span class="title">银行卡账号</span>
         <span class="text"><input type="text" v-show="isName" v-model="cardNo" placeholder="请填写银行卡号"><span v-show="!isName" v-html="cardNo?cardNo:'请填写银行卡号'"></span></span>
        <i></i>
      </div>

      <div class="information" @click="list.bank!=3?isTel = true:toast()">
        <span class="title">银行卡预留手机号</span>
        <span class="text"><input type="text" v-show="isTel" v-model="tel" placeholder="请填写预留手机号" maxlength="11"><span v-show="!isTel" v-html="tel?tel:'请填写预留手机号'"></span></span>
        <i></i>
      </div>
      <div class="information" v-show="list.bank!=3">
        <span class="title">手机验证码</span>
        <span class="text" >
          <input class="item-input" type="text" placeholder="请输入验证码" v-model="code" v-show="isCode" maxlength="8">
          <span v-show="!isCode" class="btn-code" @click="getCode">获取验证码</span>
          <span class="p3" :class="{ active: !time }" v-show="isCode" @click="!time && getCode()">{{time ? time + 'S' : '获取验证码'}}</span>
        </span>

      </div>
    </div>
    <div class="button" @click="sumbit">确认并提交</div>
    <p class="warn"><img src="./img/warn.png" alt=""><span>该卡将作为收款银行卡</span> </p>
    <my-banklist @on-change="bankChange" v-model="showBanklist"></my-banklist>
  </div>
</template>

<script>
import MyBanklist from './components/banklist.vue'
  export default {
    components: {
     MyBanklist
    },
    data() {
      return {
        isAdd: false, // 添加银行卡模式
        name: '暂未认证',
        isName: false,
        isTel: false,
        isCode: false,
        showBanklist: false,
        bankName:'请选择银行',
        bankNo: '',
        cardNo: '',
        tel: '',
        code: '',
        list: '',
        time: ''
      }
    },
    mounted() {
      this.isAdd = !!+this.$route.query.isadd
      this.$vux.loading.show({
        text: '加载中'
      })
      this.getState()
      this.getInfo()
      // this.getBanklist()
    },
    methods:{
       toast(){
          this.$vux.toast.text(
             '银行卡已认证,无需重复认证'
            );
        },
        getCode(){
          var that = this
           switch (that.bankName.trim()) {
            case '邮政储蓄银行':
                  that.bankNo = '0801000000'
              break;
            case '工商银行':
                  that.bankNo = '0801020000'
              break;
            case '农业银行':
                  that.bankNo = '0801030000'
              break;
            case '中国银行':
                  that.bankNo = '0801040000'
              break;
            case '建设银行':
                  that.bankNo = '0801050000'
              break;
            case '交通银行':
                  that.bankNo = '0803010000'
              break;
            case '中信银行':
                  that.bankNo = '0803020000'
              break;
            case '光大银行':
                  that.bankNo = '0803030000'
              break;
            case '华夏银行':
                  that.bankNo = '0803040000'
              break;
            case '民生银行':
                  that.bankNo = '0803050000'
              break;
            case '广发银行':
                  that.bankNo = '0803060000'
              break;
            case '招商银行':
                  that.bankNo = '0803080000'
              break;
            case '兴业银行':
                  that.bankNo = '0803090000'
              break;
            case '浦发银行':
                  that.bankNo = '0803100000'
              break;
            case '平安银行':
                  that.bankNo = '0804100000'
              break;
          }
          that.$http({
              methods: 'post',
              url: this.isAdd ? 'finance/sendBankCardMsg' : '/auth/sendBankMsg',
              data:{
                cardNo: that.cardNo,
                bankNo: that.bankNo,
                mobile: that.tel
              }
          }).then((res)=>{
            console.log(res.data)
            if (res.data.status === 0) {
             that.isCode = true
              that.time = 59;
              var timer = setInterval(function() {
                that.time -= 1;
                if (that.time <= 0) {
                  clearInterval(timer);
                  // that.time = 59;
                  // that.isCode = false;
                  that.time = 0;
                }
              }, 1000);
             this.$vux.toast.text(
                   res.data.msg
                );
            }else{
              // this.$vux.alert({
              //     message: res.data.msg
              //   });
            }
          // },(error) => {
          //   this.$vux.alert({
          //     message: '获取数据出错(auth/info)'
          //   })
          })
        },
       getState(){
        var that = this
        that.$http({
            methods: 'post',
            url: 'auth/detail',
        }).then((res)=>{
          console.log(res.data)
          if (res.data.status === 0) {
            if (!this.isAdd) {
              that.list = res.data.data
            }
            if(res.data.data.baseInfo!=3){
              this.$vux.confirm.show({
                  content: '你还未进行基础信息认证，是否前往认证',
                  title: '提示',
                  onCancel: function () {
                      that.$router.replace({path: '/memb/base'});
                  },
                  // btnText: '确定',
                  // canText: '取消'
              })
            }
            // TEST
            // that.list.bank = 1
            if(that.list.bank==3 && !this.isAdd){
              that.getBanklist()
            }else{
              that.$vux.loading.hide()
            }
          }else{
            that.$vux.loading.hide()
          }
        // },(error) => {
        //   that.$vux.loading.hide()
        //   this.$vux.alert({
        //     message: '获取数据出错(auth/detail)'
        //   })
        })
      },
      getInfo(){
        var that =this
        that.$http({
            methods: 'post',
            url: '/user/info',
        }).then((res)=>{
          console.log(res.data)
          if (res.data.status === 0) {
            that.name = res.data.data.name
            that.tel = res.data.data.mobile
          }else{

          }
        // },(error) => {
        //   this.$vux.alert({
        //     message: '获取数据出错(auth/info)'
        //   })
        })
      },
       getBanklist(){
        var that =this
        that.$http({
            methods: 'post',
            url: 'auth/bankInfo',
        }).then((res)=>{
          console.log(res.data.data)
          if (res.data.status === 0) {
            that.$vux.loading.hide()
            that.bankName = res.data.data.bank_name
            that.cardNo = res.data.data.card_no
            that.tel = res.data.data.mobile
          }else{
            that.$vux.loading.hide()

          }
        // },(error) => {
        //   that.$vux.loading.hide()
        //   this.$vux.alert({
        //     message: '获取数据出错(auth/detail)'
        //   })
        })
      },
      sumbit(){
        var that =this
        if (+that.list.bank === 3) return this.toast()
         switch (that.bankName.trim()) {
          case '邮政储蓄银行':
                that.bankNo = '0801000000'
            break;
          case '工商银行':
                that.bankNo = '0801020000'
            break;
          case '农业银行':
                that.bankNo = '0801030000'
            break;
          case '中国银行':
                that.bankNo = '0801040000'
            break;
          case '建设银行':
                that.bankNo = '0801050000'
            break;
          case '交通银行':
                that.bankNo = '0803010000'
            break;
          case '中信银行':
                that.bankNo = '0803020000'
            break;
          case '光大银行':
                that.bankNo = '0803030000'
            break;
          case '华夏银行':
                that.bankNo = '0803040000'
            break;
          case '民生银行':
                that.bankNo = '0803050000'
            break;
          case '广发银行':
                that.bankNo = '0803060000'
            break;
          case '招商银行':
                that.bankNo = '0803080000'
            break;
          case '兴业银行':
                that.bankNo = '0803090000'
            break;
          case '浦发银行':
                that.bankNo = '0803100000'
            break;
          case '平安银行':
                that.bankNo = '0804100000'
            break;
        }
        that.$http({
            methods: 'post',
            url: this.isAdd ? 'finance/bindBankCard' : 'auth/bank',
            data:{
              cardNo: that.cardNo,
              bankNo: that.bankNo,
              mobile: that.tel,
              smsCode: that.code
            }
        }).then((res)=>{
          console.log(res.data.data)
          if (res.data.status === 0) {
            this.$vux.toast.text(res.data.msg);
            setTimeout(()=>{
              if (this.isAdd) {
                that.$router.replace('/repay')
              } else {
                that.$router.go(-1)
              }
            },1000)
          }else{
            this.$vux.toast.show({
              type: 'warn',
              text: res.data.msg
            });
          }
        // },(error) => {
        //   this.$vux.alert({
        //     message: '获取数据出错(auth/bank)'
        //   })
        })
      },
       bankChange(value){
         this.bankName = value[0]
       }
    }
  }
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: 100%;
  padding-top: Px(40);
  background: #fff;
  overflow: hidden;
}
.header{
    display: flex;
    height: Px(90);
    align-items: center;
    border-bottom: 1px #eee solid;
    .arrow{
      width: Px(50);
      margin-left: Px(30);
      img{
        width: Px(16)
      }
    }
    .title{
      position: absolute;
      width: Px(200);
      left: 50%;
      margin-left: Px(-100);
      line-height: Px(90);
      text-align: center;
      color: #333333;
      font-size: Px(30);
    }
}
.content{
  margin-left: Px(20);
  .information{
    display: flex;
    align-items: center;
    height: Px(115);
    line-height: Px(115);
    border-bottom: 1px #eee solid;
    .btn-code{
        color: $maincolor;
    }
    i{
      // margin-top: Px(47);
      margin-right: Px(10);
      width: Px(12);
      height: Px(21);
      background: url(./img/row2.png) no-repeat;
      background-size: 100% 100%;
    }
    .title{
       flex: 1;
       width: Px(250);
       color: #333333;
      //  margin-right: 42%;
       font-size: Px(30);
     }
    .text{
      // flex: 1;
      display: flex;
      text-align: right;
      color: #666;
      margin-right: Px(20);
      font-size: Px(24);
      input{
        width: Px(350);
        height: Px(70);
        border: 1px solid #eee;
        outline: none;
        -webkit-appearance: none;
        padding-left: Px(15);
        font-size: Px(24);
        user-select: auto;
        -webkit-user-select: auto;
      }
      .item-input{
        width: Px(250);
        height: Px(70);
        border: 1px solid #eee;
        outline: none;
        -webkit-appearance: none;
        padding-left: Px(15);
        font-size: Px(24);
        user-select: auto;
        -webkit-user-select: auto;
        border-radius: Px(20) 0 0 Px(20);
        border-right: none;
      }
      .p3{
        display: inline-block;
        // width: Px(100);
        height: Px(70);
        padding: 0 Px(10);
        background: #ccc;
        text-align: center;
        line-height: Px(70);
        border: 1px solid #eee;
        border-left: none;
        border-radius: 0  Px(20)  Px(20) 0 ;
        &.active{
          color: $maincolor;
          background: white;
        }
      }
    }
  }
}
.button{
  width: Px(690);
  height: Px(85);
  margin: Px(60) auto Px(20) auto;
	// background: url(./img/bg.jpg);
	@include main-back;
  color: #fff;
  text-align: center;
  line-height: Px(85);
  font-size: Px(30);
  border-radius: Px(40);
}
.warn{
  position: relative;
  // display: flex;
  text-align: center;
  font-size: Px(24);
  height: Px(60);
  line-height: Px(40);
  color: $maincolor;
  img{
    position: relative;
    top: Px(10);
    width: Px(40);
  }
  // span{
  //   position: relative;
  //   display: inline-block;
  //   width: Px(30);
  //   height: Px(30);
  //   margin-right: Px(10);
  //   line-height: Px(30);
  //   border-radius: 50%;
  //   background: $maincolor;
  //   color: #fff;
  // }
}
</style>
