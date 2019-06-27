<template>
  <div>
    <div class="box">
      <div class="banner"></div>
      <p class="text"><span style="font-weight: 600;"> 恭喜您！</span><br> 运营商认证成功！</p>
      <div class="return" @click="goBack">确认</div>
      <div class="tips">银行级数据加密防护</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
  
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
.banner{
  position: relative;
  top: Px(100);
  margin: Px(40) auto;
  width: Px(220);
  height: Px(195);
  background: url(../img/protect.png) no-repeat;
  background-size: 100%;
}
.text{
  position: relative;
  top: Px(100);
  font-family: '黑体';
  text-align: center;
  color: #333333;
}
.return{
  position: relative;
  top: Px(200);
  width: Px(270);
  height: Px(90);
  margin: 0 auto;
  text-align: center;
  line-height: Px(90);
  color: #2b65ff;
  border: 1px #2b65ff solid;
  border-radius: Px(50);
}
.tips{
  position: absolute;
  bottom: Px(100);
  width: Px(300);
  left: 50%;
  margin-left: Px(-150);
  color: #ccc;
  font-size: Px(24);
  text-align: center;
}
</style>
