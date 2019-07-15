<template>
  <div class="box">
    <ul class="boxul" >
        <li>
          <a  @click="gofindPwd">
            <p>修改登录密码</p>
            <i></i>
          </a>
        </li>
        <li>
          <a @click="goAbout">
            <p>关于我们</p>
            <i></i>
          </a>
        </li>
        <li>
          <a href="#">
            <p>版本介绍</p>
            <em>V{{version}}</em>
          </a>
        </li>
      <li>
        <a @click="signOut">
          <p>退出登录</p>
          <i></i>
        </a>
      </li>
      <!--<li>-->
        <!--<a @click="signOut">-->
          <!--<p style="width: 100%; text-align: center; padding: 0; color: #ff6c00;">退出登录</p>-->
        <!--</a>-->
      <!--</li>-->
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        version: '2.0'
      }
    },
    mounted() {
      this.getVersion()
    },
    methods:{
      setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        console.info(cname + "=" + cvalue + "; " + expires);
        document.cookie = cname + "=" + cvalue + "; " + expires;
        console.info(document.cookie);
      },
      //获取cookie
      getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1);
          if (c.indexOf(name) != -1){
            return c.substring(name.length, c.length);
          }
        }
        return "";
      },
      gofindPwd(){
        this.$web2app('openAppPage',{name:'findPwd'})
      },goAbout(){
        this.$router.push("about")
      },
      signOut(){
        this.$web2app('logOut',{callback:true})
        this.$web2app('openAppPage',{name:'login'})
        // this.setCookie('isElastic',null,-1)
      },
      async getVersion(){
        let data = await this.$web2app('getSystemInfo',{ callback: true })
        this.version = data.version
      }
    }
  }
</script>
<style lang="scss" scoped>
.box{
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  overflow: hidden;
  h3{
    color: #000000;
    font-size: Px(30);
    font-weight: normal;
    text-align: center;
  }
  .boxul{

    li{
      position: relative;
      width: 100%; float: left;
      border-bottom: #dcdcdc Px(1) solid;
      background: #fff;
      a{display: block; width:Px(750); height: 100%;}
      p{
        color: #000000;
        font-size: Px(27);
        line-height: Px(33);
        float: left;
        margin-top: Px(36);
        margin-bottom: Px(40);
        width: Px(710);
        padding-left: Px(40);
      }
      span{
        font-style: normal;
        color: #7a7a7a;
        font-size: Px(22);
        line-height: Px(26);
        margin-bottom: Px(36);
        width: 100%;
        float: left;
      }
      img{
        width: Px(196);
        height:Px(150);
        position: absolute;
        right: 0;
        top: Px(23);
      }
      i{
        display: block;
        width:Px(19) ;
        height: Px(33);
        position: absolute;
        right: Px(37);
        bottom: Px(35);
        background: url("./img/iconj.png") no-repeat;
        background-size: 100%;
      }
      em{
        float: right;
        color: #565656;
        font-size: Px(25);
        position: absolute;
        right: Px(37);
        bottom: Px(35);
        line-height: Px(33);
      }
    }
  }
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
      width: Px(150);
      left: 50%;
      margin-left: Px(-75);
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
    .icon{

      width: Px(46);
      // margin-top: Px(38);
      margin-right: Px(10);
      img{
        display: block;
        margin: auto;
        width: auto;
        max-width: Px(40);
      }
    }
    .phone{
      img{

        width: Px(30);
        height: auto;
      }
    }
    i{
      // margin-top: Px(47);
      margin-right: Px(20);
      width: Px(12);
      height: Px(21);
      background-size: 100% 100%;
    }
    .title{
       flex: 1;
      //  width: Px(215);
       color: #333333;
       font-size: Px(30);
     }
    .text{
      flex: 1;
      color: #666;
      margin-right: Px(20);
      text-align: right;
      font-size: Px(24);
    }
  }
}
.button{
  width: Px(690);
  height: Px(85);
  margin: Px(150) auto;
  @include main-back;
  color: #fff;
  text-align: center;
  font-size: Px(30);
  line-height: Px(85);
  border-radius: Px(40);
}
</style>
