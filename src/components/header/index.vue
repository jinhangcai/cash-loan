<template>
    <div class="header">
     <div :style="`height:${native.statusBarHeight}px;`" v-if="!hideStatusHeader"></div>
      <div class="header-hg" :style="`height:${native.navigatorHeight - native.statusBarHeight}px`"></div>
      <div class="header-bar" :style="`padding-top:${!hideStatusHeader ? native.statusBarHeight : 0}px`">
        <i class="back" @click="goBack" :style="`top:${!hideStatusHeader ? native.statusBarHeight : 0}px`"></i>
        <div class="title">{{title}}</div>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            style:''


        }
    },
    provide() {
        return {
            add: this // 将组件本身的vue对象传递给下级
        }
    },
    computed:{
        title(){
            return this.$store.state.title;
        } ,
        hideStatusHeader(){
            return this.$store.state.hideStatusHeader;
        },
        webviewIndex(){
            return this.$store.state.webviewIndex ;
        }
    },
    methods:{
         goBack(){
           console.log(this.webviewIndex, native.isApp)
             if(this.webviewIndex === 1 && native.isApp){

                //  this.$web2app('appback',{ callback: true })
                this.$web2app('returnPreviousLevelView',{ callback: true })
             }else{

                 this.$router.go(-1)
             }
        },
        handleAdd() {
          this.$emit('handleAdd')
        }
    }

}
</script>

<style lang="sass" scoped>
  @import '../../styles/variable';
  .header{

  }
.header-hg{
    // height: Px(85);


}
 .header-bar {
    width: 100%;
    height: Px(85);
    background: -webkit-linear-gradient(0deg, #5DE1FF, #8C93FF);
    position: fixed;
    left:0;
    top:0;
    margin-bottom: 1px;
    z-index:9999;
    .back {
      width: Px(70);
      height: Px(85);
      position: absolute;
    //   top: Px(0);
      left: Px(0);
      background:url('./images/back.png') no-repeat center ;
      background-size:Px(20);

    }
    .title{
        text-align:center;
        line-height: Px(85);
        color: #fff;
    }

 }

</style>
