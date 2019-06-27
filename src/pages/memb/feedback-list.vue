<template>
  <div>
    <div class="list" v-if="feedbackList && feedbackList.length > 0">
      <cell v-for="(item, index) in feedbackList" :key="index" class="list-item" @click.native="toDetails(item.id)">
        <div slot="title">
          <p class="title">{{ item.message }}</p>
        </div>
        <x-icon type="ios-arrow-right" class="cell-x-icon"></x-icon>
      </cell>
    </div>
    <div v-else class="no-data">
        <img class="icon" src="./img/content-no.png" alt="">
        <div>暂无记录</div>
    </div>
    <div class="btn-right" @click="$router.push('/memb/feedback')">反馈</div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {
      feedbackList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$http({
        methods: 'get',
        url: 'user/reply',
      }).then((res)=>{
        if (res.data.status === 0) {
          this.feedbackList = res.data.data
        }
      },(error) => {
      })
    },
    toDetails(id) {
      this.$router.push(`/memb/feedback/details?id=${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  margin-top: .6rem;
  .cell-x-icon{
    fill: #999;
  }
  .title{
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  .list-item{
    box-shadow: 0 0 5px 1px rgba(#000, .08);
    margin: .3rem;
    border-radius: .1rem;
    &::before{
      display: none!important;
    }
  }
}
.no-data{
    text-align: center;
    padding-top: 3rem;
    .icon{
        display: block;
        width: 30%;
    }
    *{
        display: block;
        margin: .3rem auto;
    }
}
.btn-right{
  position: fixed;
  line-height: 1rem;
  width: 1rem;
  text-align: center;
  top: 10rem;
  right: .5rem;
  color: #fff;
  z-index: 10;
  background-color: $maincolor;
  border-radius: 50%;
  padding: .3rem;
  animation: float 3s infinite;
}
@keyframes float {
  0% {
    top: 10rem;
  }
  50% {
    top: 10.2rem;
  }
  100% {
    top: 10rem;
  }
}
</style>
<style lang="scss">
.vux-cell-primary{
  width: 40%;
}
.vux-label{
  display: block !important;
}
</style>
