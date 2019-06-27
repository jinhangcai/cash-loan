<template>

       <div class="scroll-container" :style="`transform:translate(0,${native.statusBarHeight}px)`">
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
import Scroller from '../../components/scroller'
// import Scroll from '../../components/scroll'
import axios from 'axios'

  export default {
    data() {
      return {
        lists:[],
        pageIndex: 1,
        pageSize: 10,

      }
    },
    props:{

    },
    components:{
      Scroller
    },
    mounted() {
      this.getList();

    },
    methods:{
      onPullingDown(){
         // 刷新数据
      console.log("刷新");
      this.startTime = new Date().getTime();
      this.pageIndex = 1;
      this.getList();

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
      let { data } = await axios({
        url: window.location.protocol + '//' + window.location.host + '/wego2' + "/Financial/GetPlanPages",
        method:'get',
        data: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        },
        error: data => {

          this.$warn("数据读取错误(GetPlanPages)");
        }
      });
      if (data.code === 10000) {

          if (this.pageIndex === 1) {
            this.lists = data.content.list;
          } else {
            this.lists = this.lists.concat(data.content.list);
          }
          this.pageCount = data.content.pageCount;

      } else {
        this.$warn(data.message);
      }
    },

    }
  }
</script>
<style scoped lang="scss">
.scroll-container{
  position: absolute;
  left:0;
  top:48px;
  bottom:0px;
  width:100%;
}
</style>


