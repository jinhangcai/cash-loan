<template>
  <div class="page-record">
    <scroller :scrollData="scrollData"></scroller>
  </div>
</template>

<script>
import Scroller from '../../components/scroller-v2'
  export default {
    data() {
      return {
        scrollData:{
          url:'loan/repaymentList',
          aliasPageIndex:'page',
          pageSize:10,
          aliasPageSize:'page_size'
        }

      }
    },
    components:{
      Scroller
    }
  }
</script>

<style lang="scss">
.router-view.page-record .scroll-container {
  top: Px(85);
}
.scroll-content{
  padding: Px(30);
}
  .scroll-content>div>div{
    width: 33.3%;
    float: left;
    font-size: Px(26);
  }
</style>
