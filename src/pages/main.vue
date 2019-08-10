<template>
  <div>
    <router-view></router-view>
    <div class="bottom-tabs">
      <tabbar v-model="activIndex">
        <tabbar-item v-for="(item, index) in menuList" :key="index" @click.native="toggleTabs(index)">
          <img class="icon" slot="icon" :src="item.icon">
          <img class="icon" slot="icon-active" :src="item.iconActive" alt="">
          <span slot="label" :class="activIndex == index ?'active':''">{{ item.name }}</span>
        </tabbar-item>
      </tabbar>
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
          iconActive: require('./img/icon6.png'),
        }, {
          name: '我的',
          path: '/my',
          icon: require('./img/icon_my_active1.png'),
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
          console.log('test')
          window.location.reload(true)
        }
      }, 1000 * 60)
    }
  },
  methods: {
    initData() {
      let date = new Date().Format('yyyy-MM-dd hh:mm')
      
      if (this.$route.query.authing == 1) {
        this.setYysStatus()
        if (!this.$utils.getCookie('time') && this.$route.path === '/indexYysAuth') {
          this.$utils.setCookie('time', date, 1)
        }
      }
      let timeReduce = Number(new Date()) - Number(new Date(this.$utils.getCookie('time')))
      // 30分钟内显示运营商认证结果页
      this.show = this.$utils.getCookie('time') && ((timeReduce / (60 * 1000)) < 30) && this.auditor_state !=4
    },
    toggleTabs(index) {
      if(this.$route.path != this.menuList[index].path) {
        this.$router.replace(this.menuList[index].path)
      }
    },
    clearTimerF() {
      const that = this
      if (this.timer) {
        console.log(this.timer)
        clearInterval(that.timer)
      }
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
          name: '借款记录',
          path: '/loan/record',
          icon: require('./img/icon_my.png'),
          iconActive: require('./img/icon6.png'),
        }, {
          name: '我的',
          path: '/my',
          icon: require('./img/icon_my_active1.png'),
          iconActive: require('./img/icon_my_active.png'),
        }]
    },
    async getInfo() {
        await this.$http({
            methods:'post',
            url:'/user/info'
        })
        .then(async (data) => {
            this.$vux.loading.hide()
            if(data.data.status === 0){
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
    color: $maincolor;
    color: #d91833!important;
  }
  .bottom-tabs{
    height: 65px;
    .icon{
      display: block;
      margin: .1rem auto 0;
      height: .65rem;
      width: auto;
    }
  }
</style>
