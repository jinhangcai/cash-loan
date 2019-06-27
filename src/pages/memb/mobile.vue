<template>
  <div class="box">
    <div class="mark" v-show="showMark">
      <div class="tank">
        <img src="./img/protect.png" alt="">
        <p class="tip">正在进行运营商验证</p>
        <p class="text">请不要离开本页，否则会导致申请失败</p>
        <div class="bottom">
          <span class="back" @click="$router.go(-1)">返回</span>
          <span class="close" @click="showMark = false">继续等待</span>
        </div>
      </div>
    </div>
    <div class="header">
     <div :style="`height:${native.statusBarHeight}px;`" ></div>
      <div class="header-hg"></div>
      <div class="header-bar" :style="`padding-top:${native.statusBarHeight}px`">
        <i class="back" @click="goBack" :style="`top:${native.statusBarHeight}px`"></i>
        <div class="title">{{title}}</div>
      </div>
    </div>
    <div class="content" v-show="show==1">
      <p class="item tel">
        <span class="num">+86 |</span>
        <span class="input-item phone"  v-html="tel" ></span>
      </p>
      <p class="item">
        <input type="password" class="input-item pwd" placeholder="请输入服务密码" v-model="password" maxlength="20">

        <span class="text" @click="tipShow = true">忘记密码</span>
      </p>
    </div>
    <div class="agree" v-show="show==1">
        <input type="checkbox"  v-model="onOff" @change="changeAgree" id="agreeText">
        记住密码
    </div>
    <div class="register-btn" @click="submit" v-show="show==1">
             同意协议并提交
    </div>
    <div class="tips" v-show="tipShow">
      <p class="title">忘记密码</p>
      <p class="type">移动</p>
      <p class="text">发送2010至10086</p>
      <p class="type">联通</p>
      <p class="text">发送401至10010</p>
      <p class="type">电信</p>
      <p class="text">发送503至10001</p>
      <div class="close" @click="tipShow = false"></div>
    </div>
    <mobileCode v-show="show==2"></mobileCode>
    <protect v-show="show==3"></protect>
  </div>
</template>

<script>
import MobileCode from './components/mobileCode.vue'
import Protect from './components/protect.vue'
  export default {
    components: {
      MobileCode,
      Protect
    },
    data() {
      return {
        tel: '',
        tipShow: false,
        showMark: false,
        password: localStorage.getItem('pwd')|| '',
        show: 1,
        onOff: localStorage.getItem('onOff')
      }
    },
    computed:{
        title(){
            return this.$store.state.title;
        }
    },
    mounted() {
      this.getInfo()
    },
    methods:{
       goBack(){

          if(this.show==2){
            this.showMark = true
          }else{
            this.$router.go(-1)
          }
        },
      changeAgree:function(){
        var that = this;
        var f = document.getElementById("agreeText").checked
        if(!f){
          that.onOff = false
        }else{
          that.onOff = true
        }
      },
      getInfo(){
        var that =this
        that.$http({
            methods: 'post',
            url: '/user/info',
        }).then((res)=>{
          console.log(res.data)
          if (res.data.status === 0) {
            // that.name = res.data.data.name
            that.tel = res.data.data.mobile
          }else{

          }
        })
      },
      submit(){
        this.$vux.loading.show({
          text: '加载中'
        })
        if(this.onOff){
          localStorage.setItem('pwd',this.password)
          localStorage.setItem('tel',this.tel)
          localStorage.setItem('onOff',true)
        }else{
          localStorage.setItem('pwd','')
          localStorage.setItem('tel','')
          localStorage.setItem('onOff','')
        }
        this.$http({
          url:'auth/operator',
          methods: 'post',
          data:{
            password:this.password,
          }
        })
        .then(({data})=>{
          console.log(data)
          if(data.status === 0){
            this.$vux.loading.hide()
            // this.$toast({
            //   message:data.msg
            // })
            this.show = 3
          }else if(data.status === 2000){
            this.$vux.loading.hide()
            this.show = 2
            sessionStorage.setItem('password',this.password)
            this.$vux.toast.text(
              data.msg
            )
          }else{
           this.$vux.loading.hide()
            // this.$toast({
            //   message:data.msg
            // })
          }
        },(error) => {
          this.$vux.loading.hide()
          // this.$vux.alert({
          //   message: '获取数据出错(auth/info)'
          // })
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
 .header{

  }
.header-hg{
    height: Px(85);


}
 .header-bar {
    width: 100%;
    height: Px(85);
    background: #ffffff;
    position: fixed;
    left:0;
    top:0;
    margin-bottom: 1px;
    z-index:9999;
    .back {
      width: Px(70);
      height: Px(85);
      position: absolute;
      left: Px(0);
      background:url('./img/back.png') no-repeat center ;
      background-size:Px(20);

    }
    .title{
        text-align:center;
        line-height: Px(85);
        color:'#333333'
    }

 }
.content{
    margin: Px(90) auto Px(20) auto;
    width: Px(650);
    height: Px(170);
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
      .num{
        margin-left: Px(20);
        color: #333;
        font-size: Px(24)
      }
      .input-item{
        width: Px(350);
        height: Px(80);
        border: 0;
        outline: 0;
        margin-left: Px(15);
        font-size: Px(30);
        color: #333;
        user-select: auto;
        -webkit-user-select: auto;
      }
      .phone{
        line-height: Px(80);
      }
      .pwd{
        flex: 2;
      }
      .text{
        flex: 1;
        margin-right: Px(20);
        text-align: right;
        color: $maincolor;
        font-size: Px(24);
      }
    }
}
.agree{
  color: $maincolor;
  font-size: Px(24);
  margin-left: Px(60);
  input{
    position: relative;
    top: Px(5);
  }
}
.register-btn{
  width: Px(650);
  height: Px(85);
  margin: Px(60) auto;
  color: #fff;
  background: $maincolor;
  text-align: center;
  line-height: Px(85);
  font-size: Px(30);
  border-radius: Px(40);
}
.tips{
  position: fixed;
  width: Px(550);
  height: Px(500);
  top: 50%;
  left: 50%;
  margin-left: Px(-275);
  margin-top: Px(-250);
  border-radius: Px(30);
  text-align: center;
  background: #f1f1f1;
  .title{
    font-size: Px(36);
    font-weight: 600;
    margin: Px(20);
  }
  .type{
    margin-top: Px(30);
  }
  .text{
    color: #666;
  }
  .close{
    position: relative;
    width: Px(63);
    height: Px(63);
    left: 50%;
    margin-left: Px(-31.5);
    margin-top: Px(60);
    background: url(./img/close.png) no-repeat;
    background-size: 100%;
  }
}
.mark{
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(./img/mask.png) no-repeat;
   background-size: 100% 100%;
   z-index: 99999999999;
   .tank{
     position: fixed;
     width: Px(600);
     height: Px(640);
     left: 50%;
     top: 50%;
     margin: Px(-320) 0 0 Px(-300);
     background: #fff;
     text-align: center;
     border-radius: Px(20);
     img{
       position: relative;
       display: block;
       width: Px(260);
       left: 50%;
       margin: Px(50) Px(-130);
     }
     .tip{
       font-size: Px(30);
       color: #666;
     }
     .text{
        font-size: Px(30);
        color: #ff593f;
     }
     .bottom{
       width: 100%;
       display: flex;
       justify-content: space-around;
       margin-top:Px(40);
       .back{
         width: Px(210);
         height: Px(80);
         line-height: Px(80);
         text-align: center;
         background: #c8c8c8;
         border-radius: Px(50);
         color: #fff;
       }
       .close{
         width: Px(210);
         height: Px(80);
         line-height: Px(80);
         text-align: center;
         background: #2d84ff;
         border-radius: Px(50);
         color: #fff;
       }
     }
   }
}
</style>
