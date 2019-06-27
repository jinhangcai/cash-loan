<template>

       <div class="scroll-container">
        <scroller ref="scroll" :data="lists" :pullDownRefresh="true" :pullUpLoad="true" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
         <div v-for="item in lists">
         {{item.carNumber}}
       </div>
        <div v-for="item in lists">
         {{item.carNumber}}
       </div>
        <div v-for="item in lists">
         {{item.carNumber}}
       </div>
        </scroller>
       </div>
</template>

<script>
import Scroller from '../scroller'
import Scroll from '../scroll'
import axios from 'axios'

  export default {
    data() {
      return {
        lists:[],
        pageIndex:1


      }
    },
    props:{
      scrollData:{
        type:Object,
        default:{}
      }
    },
    components:{
      Scroller,
      Scroll
    },
    mounted() {
      console.log('scrollData0',this.scrollData)
      this.getList();

    },
    methods:{
      onPullingDown(){
         // 刷新数据
      console.log("刷新");
      this.startTime = new Date().getTime();
      this.pageIndex = 1;
      this.getList();
      // 刷新统计数据
      // if (this.userInfo.fuid) {
      //   this.getDetail();
      // }
      },
      onPullingUp(){
        // 加载数据
      console.log("加载");
      if (this.pageCount === this.pageIndex) {
        this.lists = this.lists.concat([]);
        return
      }
      this.startTime = new Date().getTime();
      this.pageIndex++;
      this.getList();

      },
      async getList() {
        let dataConfig = {

        }
        dataConfig[this.scrollData.pageIndex] = this.pageIndex ;
        dataConfig[this.scrollData.pageSize] = this.pageSize ;
        console.log('dataConfig',dataConfig)
      let { data } = await this.$http({
        url: this.scrollData.url,
        method:'get',
        methods:'get',
        data: dataConfig,
        error: data => {
          this.$vux.toast.show({
            type:"warn",
            text:"数据读取错误(GetPlanPages)"
            });
        }
      });
      if (data.status === 0) {
        // var interval = new Date().getTime() - this.startTime;
        // if (interval < 1000) {
        //   setTimeout(() => {
        //     if (this.pageIndex === 1) {
        //       this.lists = data.content.list;
        //     } else {
        //       this.lists = this.lists.concat(data.content.list);
        //     }
        //     this.pageCount = data.content.pageCount;
        //   }, 1000 - interval);
        // } else {
          if (this.pageIndex === 1) {
            this.lists = data.data.list;
          } else {
            this.lists = this.lists.concat(data.data.list);
          }
          this.pageCount = data.data.pageCount;
        // }
      } else {
        // this.$warn(data.message);
        // this.$vux.toast.show({
        //     type:"warn",
        //     text: data.message
        // });
      }
    },

    }
  }
</script>
<style scoped lang="scss">
.scroll-container{
  position: absolute;
  left:0;
  top:36px;
  bottom:0px;
  width:100%;
}
</style>


