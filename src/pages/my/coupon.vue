<template>
  <div class="box">
    <img src="./img/wujilu.png">
    <h3>对不起您还未有相关优惠券！</h3>
  </div>
</template>

<script>
  import { Base64 } from 'js-base64'
  import native from '@/service/native'

</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: 100%;
  padding-top: Px(40);
  overflow: hidden;
  text-align: center;
  img{
    width: Px(292);
    margin-top: Px(292);
  }
  h3{
    color: #888888;
    font-size: Px(24);
    font-weight: normal;
    text-align: center;
    margin-top: Px(100);
  }
  .boxul{
    margin: Px(20) Px(30);
    li{
      position: relative;
      width: 100%; float: left;
      background: #fff;
      p{
        color: #000000;
        font-size: Px(27);
        line-height: Px(33);
        float: left;
        margin-bottom: Px(40);
        padding: 0 Px(40);
      }
      span{
        font-style: normal;
        color: #000000;
        font-size: Px(28);
        line-height: Px(80);
        width:Px(620);
        padding-left: Px(40);
        float: left;
        i{
          font-style: normal;
          margin-left: Px(40);
          float: right;
          color: #848484;
          font-size: Px(22);
        }
      }
      img{
        width: Px(196);
        height:Px(150);
        position: absolute;
        right: 0;
        top: Px(23);
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
      /*background: url(./img/row2.png) no-repeat;*/
      /*background-size: 100% 100%;*/
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
<style>
  body{
    background: #f7f7f7!important;
  }
</style>
