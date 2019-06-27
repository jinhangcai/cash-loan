<template>
  <div>
    <div class="success-box">
      <div class="success-title">{{msg}}</div>
      <div class="success-btn">
        <button class="btn" @click="backIndex">确认</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // money: 100
    }
  },
  props: {
    msg: Number
  },
  methods: {
    backIndex() {
      // console.log(111);
      // this.$router.push({path: '/'});
      this.$emit('popup', 0);
    }
  }
}
</script>
<style lang="scss" scoped>
.success-box {
  width: Px(587);
  height: Px(640);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: Px(-293.5);
  margin-top: Px(-320);
  background: url('./img/success.png') no-repeat center / 100% 100%;
  .success-title {
    position: absolute;
    bottom: Px(270);
    width: Px(587);
    font-size: Px(26);
    color: #919191;
    text-align: center;
  }
  .success-btn {
    position: absolute;
    bottom: Px(77);
    width: Px(587);
    text-align: center;
    .btn {
      outline: none;
      border: none;
      background: none;
      background: #2e8cff;
      color: #ffffff;
      font-size: Px(28);
      font-weight: 600;
      width: Px(445);
      height: Px(88);
      border-radius: Px(44);
    }
  }
}
</style>