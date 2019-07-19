<template>
  <div class="header">
    <div :style="`height:${native.statusBarHeight}px;`"></div>
    <div class="header-hg"></div>
    <div class="header-bar" :style="`padding-top:${native.statusBarHeight}px`">
      <i class="back" @click="goBack" :style="`top:${native.statusBarHeight}px`"></i>
      <div class="title">{{title}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        style: ''


      }
    },
    computed: {
      title() {
        return this.$store.state.title;
      }
    },
    methods: {
      goBack() {

        if (this.title == '注册协议') {
          this.$web2app('appback', {
            callback: true
          })
        } else {
          this.$router.back(-1)
        }

      }
    }

  }
</script>

<style lang="sass" scoped>
  @import '../../../styles/variable';

  .header {}

  .header-hg {
    height: Px(85);


  }

  .header-bar {
    width: 100%;
    height: Px(85);
    /* background: #ffffff; */
    position: fixed;
    left: 0;
    top: 0;
    margin-bottom: 1px;
    z-index: 9999;

    .back {
      width: Px(70);
      height: Px(85);
      position: absolute;
      //   top: Px(0);
      left: Px(0);
      background: url('./images/back.png') no-repeat center;
      background-size: Px(20);

    }

    .title {
      text-align: center;
      line-height: Px(85);
      color: #ffffff;
    }

  }
</style>
