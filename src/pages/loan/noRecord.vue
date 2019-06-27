<template>
  <div class="no-record">
    <button class="no-record-cash" @click="goCash">去提现</button>
  </div>
</template>
<script>
export default {
 data() {
   return {

   }
 },
 methods: {
   goCash() {
     this.$vux.loading.show({
       text: '加载中'
     })
     this.$http({
       methods:'post',
       url:'/user/info'
     }).then((data) => {
       this.$vux.loading.hide()
       if(data.data.status === 0){
         const userInfo = data.data.data;
         if (userInfo.auditor_state !== 0 && userInfo.auditor_state !== 1) {
           this.$router.push({path: '/loan/cash'});
         } else {
           this.$vux.confirm.show({
             title: '提示',
             content: '请先完成信用资料审核再进行提现',
             onConfirm: () => {
               this.$router.push("/memb/info")
             },
             onCancel: () => {
             }
           })
         }
       }
     });
   }
 }
}
</script>
<style lang="scss" scoped>
.no-record {
  width: Px(750);
  height: Px(1485);
  background: url('./img/noRecord.png') no-repeat center / 100% 100%;
  .no-record-cash {
    position: absolute;
    top: Px(640);
    left: 50%;
    width: Px(360);
    height: Px(90);
    outline: none;
    border: none;
    background: none;
    background: $maincolor;
    color: #ffffff;
    border-radius: Px(10);
    margin-left: Px(-180);
    font-size: Px(30);
  }
}
</style>
