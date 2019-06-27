<docs>
  ## 入口文件.
  > 尽量从App.vue里开发.而不是直接从 html里开发
</docs>

<template lang="pug">
  div
    header-bar(v-show="showHeader")
    //- div
    //-   span {{needLogin ? 1 : 0}} + {{isLogin}}
    router-view.router-view
    //- router-view.router-view(v-show="!needLogin || isLogin")
    //- login(v-show="showLogin")
    //- cps(text = '您不符合活动参与条件!', ref = 'cps')
</template>

<script>
  // import Login from '@src-components/login'
  import HeaderBar from './components/header'
  export default {
    name: 'app',
    components: {
      HeaderBar
    },
    data() {
      return {
        isLogin:native.vid

      }
    },
    mounted() {
      console.log('this.$store.state.needLogin',this.$store.state.needLogin)


    },
    computed: {
      // TODO:
      async needLogin(){
        if(!this.isLogin && this.$store.state.needLogin ){
        console.log('App.vue-needlogin'+ location.hash)
        await this.$web2app('logOut');
        this.$web2app('openAppPage',{name:'register'})
      };
        return this.$store.state.needLogin
      },
      showLogin(){
        return !this.$store.state.login && native.isApp !== 1
      },
      showHeader() {
        return !this.$store.state.hideHeader
      }
    },
    methods: {

    }
  }
</script>

<style lang="sass">
  @import './styles/variable';
  body {
    font-size: $font-size-normal;
    background: #F5F5F5;
    color: #333;
  }
  .router-view{
    // position:relative;
  }
</style>

<style>
  /*reset*/
  .change {
    background: #f5f5f5;
  }
  .unchange {
    background: #ffffff;
  }
  em {
    font-style: normal;
  }

  ul,
  li {
    list-style: none;
  }
  * {
    /* -webkit-touch-callout:none;
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none; */
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }
</style>
