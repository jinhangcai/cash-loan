<template>
  <div>
    <router-view></router-view>
    <div class="bottom-tabs">
      <tabbar v-model="activIndex" @on-index-change="toggleTabs">
        <tabbar-item>
          <img class="icon" slot="icon" src="./img/icon_index.png">
          <img class="icon" slot="icon-active" src="./img/icon_index_active.png" alt="">
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item>
          <img class="icon" slot="icon" src="./img/icon_my_active1.png">
          <img class="icon" slot="icon-active" src="./img/icon_my_active.png" alt="">
          <span slot="label">我的</span>
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
        activIndex: 0
      }
    },
    created() {
      if (this.$route.fullPath === '/my') {
        this.activIndex = 2
      }else if (this.$route.fullPath === '/loan/record') {
        this.activIndex = 1
      } else {
        this.activIndex = 0
      }
    },
    methods: {
      toggleTabs(index) {
        // if (index === 1) {
        //   this.$router.replace('/loan/record')
        // } else
        if (index === 1) {
          this.$router.replace('/my')
        }else {
          this.$router.replace('/')
        }
      }
    },watch:{
      $route(){
        if (this.$route.fullPath === '/my') {
          this.activIndex = 1
        }
        // else if(this.$route.fullPath === '/loan/record') {
        //   this.activIndex = 1
        // }
        else {
          this.activIndex = 0
        }
      }
    },
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
    color: #ff3838!important;
  }
  .bottom-tabs{
    height: 64px;
    .icon{
      display: block;
      margin: .1rem auto 0;
      height: Px(44);
      width: auto;
    }
  }
</style>
