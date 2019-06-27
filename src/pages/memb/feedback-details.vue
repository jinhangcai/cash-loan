<template>
  <div>
    <div class="box">
      <div class="right">
        <div class="content"><span>{{ dataObject.message }}</span></div>
      </div>
      <h4 class="title"><span>{{ dataObject.reply }}</span></h4>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataObject: {}
    }
  },
  created() {
    this.getDetails()
  },
  methods: {
    getDetails() {
      this.$http({
        methods: 'get',
        url: `user/replyDetailed?id=${this.$route.query.id}`,
      }).then((res)=>{
        if (res.data.status === 0) {
          this.dataObject = res.data.data
        }
      },(error) => {
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.box{
  margin: 0;
  height: calc(100vh - 110px);
  background-color: #F3F4F5;
  padding: .9rem;
  font-size: .3rem; 
  .title{
    position: relative;
    width: 80%;
    span{
      display: inline-block;
      position: relative;
      font-weight: normal;
      background-color: #fff;
      z-index: 1;
      border-radius: 0 .1rem .1rem .1rem;
      padding: .3rem;
      min-width: .5rem;
    }
    &::before{
      position: absolute;
      left: -10px;
      top: 0;
      display:block;
      width:0;
      height:0;
      border-width:0 25px 20px;
      border-style:solid;
      border-color: transparent transparent #fff transparent;/*透明 透明  黄*/
      border-radius: .1rem;
      content: '';
      transform: rotate(180deg);
    }
  }
  .right{
    display: flex;
    flex-direction: row-reverse;
  }
  .content{ 
    position: relative; 
    width: 80%; 
    margin: .5rem 0;
    text-align: right;
    span{
      position: relative;
      z-index: 1;
      display: inline-block;
      color: #fff;
      padding: .3rem;
      border-radius: .1rem;
      background-color: $maincolor;
      text-align: left;
      min-width: .5rem;
    }
    &::before{
      position: absolute;
      right: -10px;
      top: 0;
      display:block;
      width:0;
      height:0;
      border-width:0 25px 20px;
      border-style:solid;
      border-color: transparent transparent $maincolor transparent;/*透明 透明  黄*/
      border-radius: .1rem;
      content: '';
      transform: rotate(180deg);
    }
  }
}
</style>
