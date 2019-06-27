<template>
    <div class="header">
     <!-- <div :style="`height:${native.statusBarHeight}px;`" ></div> -->
      <div class="header-hg"></div>
      <div class="header-bar" :style="`padding-top:${native.statusBarHeight + 20}px`">
        <!-- <i class="menu" @click="showMenu"  :style="`top:${native.statusBarHeight}px`"></i> -->
        <div class="title">{{title}}</div>
        <i class="service" @click="$web2app('phone',{number: customPhone})"  :style="`top:${native.statusBarHeight + 15}px`"></i>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            style:'',
            customPhone: '' // 客服电话
        }
    },
    created() {
        this.getcustomPhone()
    },
    computed:{
        title(){
            return this.$store.state.title;
        }
    },
    methods:{
         showMenu(){
             this.$store.state.showLeftMenu = true;
        },
        getcustomPhone(){
            this.$http({
                methods:'get',
                url:'index/customerMobile'
            })
            .then((data) => {
                if (data.data.data != null) {
                    this.customPhone = data.data.data.mobile
                }
            })
        },
    }

}
</script>

<style lang="scss" scoped>
@import '../../../styles/variable';
  .header{
    // background:#2d81fc;
  }
.header-hg{
//   height: 42px;
}
.header-bar {
    width: 100%;
    // height: 50px;
    background: transparent;
    // background-image: -webkit-linear-gradient(top, $maincolor, $maincolor);
    // background-image: linear-gradient(to bottom, $maincolor, $maincolor);
    position: fixed;
    left:0;
    top:0;
    margin-bottom: 1px;
    z-index:4;
    .menu,
    .service {
      width: Px(85);
      height: 50px;
      position: absolute;
      top: Px(0);
      left: Px(0);
      background:url('./images/icon_menu.png') no-repeat center ;
      background-size: auto Px(45);

    }
    .service {
      left: auto;
      right: Px(0);
      background:url('./images/icon_service.png') no-repeat center ;
      background-size: auto 50%;
    }
    .title{
        text-align: left;
        line-height: 42px;
        color: #fff;
        padding: 0 .4rem;
        font-size: .66rem;
        // font-weight: bold;
        letter-spacing: 1px;
    }

 }

</style>
