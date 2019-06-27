<template>
  <div>
    <div class="content" v-show="show==2">
      <p class="item">
        <input type="text" class="input-item" placeholder="请输入验证码" v-model="code" maxlength="6">
      </p>
    </div>
    <div class="register-btn" @click="submit" v-show="show==2">
             确认
    </div>
    <div class="loading" v-show="loadShow"><img src="../img/loading.gif" alt="">
    <p class="text">正在请求运营商认证，可能需要2 ~ 5分钟</p></div>
    <protect v-show="show==3"></protect>
  </div>
</template>

<script>
import Protect from './protect.vue'
  export default {
    components: {
      Protect
    },
    data() {
      return {
        loadShow: false,
        code: '',
        getText:'获取验证码',
        time: '',
        getYzmFast: false,
        show: 2
      }
    },
    methods:{
      submit(){
       var that = this
       if (that.loadShow) return
       that.loadShow = true
        that.$http({
            url: '/auth/operator',
            methods: 'post',
            data:{
               password: sessionStorage.getItem('password'),
               code: that.code,
               code_type: 'sms'
            }
        }).then((res)=>{
          if (res.data.status === 0) {
            that.loadShow = false
            that.show = 3
            // that.$toast({
            //   message: res.data.msg
            // })
          }else{
            that.loadShow = false
            // this.$vux.alert({
            //     message: res.data.msg
            //   });
          }
        })
      },
      getcode(){


      }
    }
  }
</script>

<style lang="scss" scoped>
.content{
    margin: Px(90) auto Px(20) auto;
    width: Px(650);
    height: Px(85);
    border: 1px solid #D7D7D7;
    border-radius: Px(20);
    .tel{
      border-bottom: 1px solid #D7D7D7;
    }
    .item{
      display: flex;
      align-items: center;
      width: Px(650);
      height: Px(84);
      .input-item{
        flex: 2;
        width: Px(350);
        height: Px(80);
        border: 0;
        outline: 0;
        margin-left: Px(15);
        font-size: Px(30);
        user-select: auto;
        -webkit-user-select: auto;
      }
      .text{
        flex: 1;
        margin-right: Px(20);
        text-align: right;
        color: #2d7bff;
        font-size: Px(24);
      }
    }
}

.register-btn{
  width: Px(650);
  height: Px(85);
  margin: Px(60) auto;
  color: #fff;
  background: #2d7bff;
  text-align: center;
  line-height: Px(85);
  font-size: Px(30);
  border-radius: Px(40);
}
.loading{
  margin: 0 auto;
  width: Px(300);
  height: Px(250);
  padding: Px(20);
  background: rgba($color: #000000, $alpha: 0.1);
  border-radius: Px(50);
  img{
    display: block;
    width: 40%;
    margin: Px(20) auto;
  }
  .text{
    text-align: center;
    font-size: Px(24);
  }
}
</style>
