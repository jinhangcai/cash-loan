<template>
  <div>
    <router-view></router-view>
    <div class="bottom-tabs">
      <!-- <tabbar v-model="activIndex">
          <tabbar-item v-for="(item, index) in menuList" :key="index" @click.native="toggleTabs(index)">
            <img class="icon" slot="icon" :src="item.icon">
            <img class="icon" slot="icon-active" :src="item.iconActive" alt="">
            <span slot="label" :class="activIndex == index ?'active':''">{{ item.name }}</span>
          </tabbar-item>
        </tabbar> -->
        <div class="mys">
          <ul class="info-box_s">
            <li @click="$router.push('/memb/info')">
              <img src="./index/index/icon_i1.png" class="img2">实名认证<i></i>
            </li>
            <li @click="$router.push('/loan/record')">
              <img src="./index/index/icon_i2.png" class="img1">我的借款<i></i>
            </li>
            <li @click="goMyBank">
              <img src="./index/index/icon_i3.png" class="img1">我的银行卡<i></i>
            </li>
            <li @click="goFeedback">
              <img src="./index/index/icon_i4.png" class="img1">用户反馈<i></i>
            </li>
            <li @click="$web2app('phone',{number: customPhone})">
              <img src="./index/index/icon_i6.png" class="img1">联系客服<i></i>
            </li>
            <li @click="$router.push('/loan')">
              <img src="./index/index/icon_i7.png" class="img2">提现记录<i></i>
            </li>
            <li @click="$router.push('/set')">
              <img src="./index/index/icon_i5.png" class="img2">设置<i></i>
            </li>
            <li >
              <div v-if="userInfo.vid" style="padding-left: .5rem;">
                <div class="phone">{{ userInfo.mobile.slice(0, 3) }} **** {{userInfo.mobile.slice(-4)}}</div>
                <!--<div class="num">可借额度（元）：<em> {{ userInfo.quota }}</em></div>-->
              </div>
              <div  v-else style="padding-left:.5rem;">
                <div>您好！请先登录</div>
              </div>
            </li>
          </ul>
        </div>
    </div>

  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'

 export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      activIndex: 0,
      show: false, // 是否显示首页 true: 运营商认证页   false: 首页 默认首页
      auditor_state: '', // 用户借款状态 4：被拒     3：审核通过
      timer: null,
      menuList: [
        {
          name: '首页',
          path: '/',
          icon: require('./img/icon_index.png'),
          iconActive: require('./img/icon_index_active.png'),
        }, {
          name: '我的',
          path: '/my',
          icon: require('./img/icon_my.png'),
          iconActive: require('./img/icon_my_active.png'),
        },
      ]
    }
  },
  async created() {
    await this.getInfo()
    this.menuList.forEach((item, index) => {
      if (this.$route.path == item.path) {
        this.activIndex = index
      }
    });
    this.setMenu()
    if (this.show) {
      this.clearTimerF()
      this.timer = setInterval(async () => {
        await this.getInfo()
        if (!this.show) {
          this.setMenu()
          this.clearTimerF()
        }
        // 审核通过刷新状态
        if (this.auditor_state == 3 || this.auditor_state == 5) {
          window.location.reload(true)
        }
      }, 1000 * 60)
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    initData() {
      let date = new Date().Format('yyyy-MM-dd hh:mm')
      if (this.$route.query.authing == 1) {
        this.setYysStatus(this.$route.path)
        if (!this.$utils.getCookie('time') && this.$route.path === '/indexYysAuth') {
          this.$utils.setCookie('time', date, 1)
        }
      }
      let timeReduce = Number(new Date()) - Number(new Date(this.$utils.getCookie('time')))
      // 30分钟内显示运营商认证结果页
      this.show = this.$utils.getCookie('time') && ((timeReduce / (60 * 1000)) < 30) && this.auditor_state !=4
    },
    toggleTabs(index) {
      if (this.$route.path != this.menuList[index].path)
      this.$router.replace(this.menuList[index].path)
    },
    clearTimerF() {
      const that = this
      if (this.timer) {
        console.log(this.timer)
        clearInterval(that.timer)
      }
    },
    goMyBank() {
      this.$router.push('memb/my/bank')
    },
    goFeedback() {
      this.$router.push('/memb/feedback/list')
    },
    // 设置跳转界面
    setMenu() {
      if (this.show) {
        if (this.activIndex === 0) {
          this.$router.replace('/indexYysAuth')
        }
      } else {
        if (this.activIndex === 0) {
          this.$router.replace('/index')
        }
      }
      this.menuList = [
        {
          name: this.show ? '首页' : '借款',
          path: this.show ? '/indexYysAuth' : '/',
          icon: require('./img/icon_index.png'),
          iconActive: require('./img/icon_index_active.png'),
        }, {
          name: '我的',
          path: '/my',
          icon: require('./img/icon_my.png'),
          iconActive: require('./img/icon_my_active.png'),
        },
      ]
    },
    async getInfo() {
        await this.$http({
            methods:'post',
            url:'/user/info'
        })
        .then(async (data) => {
            this.$vux.loading.hide()
            if(data.data.status === 0){
                this.$store.state.userInfo = data.data.data;
                this.auditor_state = data.data.data.auditor_state
                this.initData()
            } else {
            
            }
        })
    },
    // 设置运营商为认证中状态
    async setYysStatus() {
        await this.$http({
            methods:'post',
            url:'/operator/success'
        })
        .then(async (data) => {
        })
    }
  }
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
</script>

<style lang="scss">
  .weui-tabbar{
    position: fixed !important;
    background-color: #fff !important;
    a{
      text-decoration: none;
    }
  }
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
    color: $maincolor!important;
  }
  .bottom-tabs{
    height: 65px;
    .icon{
      display: block;
      margin: .1rem auto 0;
      height: .55rem;
      width: auto;
    }
  }
</style>
<style lang="scss" scoped>
 .mys{
    position:fixed;
    left: 0;
    bottom: 0;
    z-index: 2;
    background:#30D2E7;
    width: 100%;
    border-radius:Px(35) Px(35) 0px 0px;
    padding: Px(20) 0;
    .info-box_s{
      li{
        width: 50%;
        height: Px(75);
        line-height: Px(75);
        color: #fff;
        font-size: Px(30);
        text-align: left;
        position: relative;
        float: left;
        img{
          float: left;
          margin-top: Px(23);
          margin-right: Px(30);
          margin-left: Px(35);
        }
        .img1{
          width: Px(40);

        }
        .img2{
          height: Px(40);
        }
        i{
          display: block;
          width: Px(17);
          height: Px(30);
          position: absolute;
          right: 0;
          top:Px(30);
          background:url('./index/index/row2.png')no-repeat;
          background-size: 100% auto;
          display: none;
        }
      }
    }
  }
</style>