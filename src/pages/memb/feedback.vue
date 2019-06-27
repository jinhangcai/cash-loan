<template>
  <div class="content">
    <div class="flex">
      <textarea v-model="message" class="areabox flex-1" placeholder="请输入反馈内容"></textarea>
    </div>
    <button class="btn" @click="submit">提交</button>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      message: '',
      isSubmit: true
    }
  },
  methods:{
    submit() {
      if (this.isSubmit) {
        this.isSubmit = false
        setTimeout(() => {
          this.isSubmit = true
        }, 2000)
        this.$vux.loading.show()
        this.$http({
          methods: 'post',
          url: 'user/feedBack',
          data: { 
            message: this.message 
          }
        }).then((res)=>{
          if (res.data.status === 0) {
            this.$vux.toast.text(res.data.msg)
            setTimeout(() => {
              this.$router.replace('/memb/feedback/list')
            }, 2000)
          }
          else{
            this.$vux.toast.show({
              type: 'warn',
              text: res.data.msg
            });
          }
          this.$vux.loading.hide()
        },(error) => {
          this.$vux.loading.hide()
        })
      }else {
        this.$vux.toast.show({
          type: 'warn',
          text: '请勿重复提交'
        });
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  padding: Px(40);
}
.areabox{
  height: Px(300);
  padding: Px(20);
  border: none;
  box-shadow: 0 0 Px(10) 0px rgba(#000, .1);
  border-radius: Px(10);
  color: #333;
  line-height: 1.5;
  transition: box-shadow .5s;
  background-color: #F3F4F5;
  &:focus{
    outline: none;
    box-shadow: 0px 4px Px(20) 3px rgba(#000, .2);
  }
}
.btn{
  display: block;
  width: 100%;
  line-height: Px(80);
  border: none;
  @include main-back;
  color: #fff;
  margin: Px(60) 0;
  border-radius: Px(40);
  &:focus{
    outline: none;
    background-color: rgba($maincolor, .8);
  }
}
</style>
