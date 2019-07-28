<template>
  <div>
    <router-view></router-view>
    <div class="bottom-tabs">
      <tabbar v-model="activIndex">
        <tabbar-item v-for="(item, index) in menuList" :key="index" @click.native="toggleTabs(index)">
          <img class="icon" slot="icon" :src="item.icon">
          <img class="icon" slot="icon-active" :src="item.iconActive" alt="">
          <span slot="label" :class="activIndex == index?'active':''">{{ item.name }}</span>
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
        menuList: [
          {
            name: '借款',
            path: '/',
            icon: require('./img/icon_index.png'),
            iconActive: require('./img/icon_index_active.png')
          }, {
            name: '我的',
            path: '/my',
            icon: require('./img/icon_my.png'),
            iconActive: require('./img/icon_my_active.png')
          }
        ]
      }
    },
    created() {
      this.menuList.forEach((item, index) => {
        if (this.$route.path == item.path) {
          this.activIndex = index
        }
      });
    },
    methods: {
      toggleTabs(index) {
        this.$router.replace(this.menuList[index].path)
      }
    }
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
    color: #00a8e8!important;
  }
  .bottom-tabs{
    height: 65px;
    .icon{
      display: block;
      margin: .1rem auto 0;
      height: Px(44);
      width: auto;
    }
  }
</style>
