<template>
  <div class="wrapper" ref="wrapper">    
    <div class="content">
      <div ref="listWrapper">
        <slot name="top"></slot>
        <div v-show="list.length > 0">
          <div v-for="(item,index) in list" class="item" :key="index">
            <slot name="scroll" :item='item' :index="index" :length="list.length"></slot>
          </div>
        </div>
      </div>
      <div class="pullup-wrapper" v-if="finalSet.pullUpLoad">{{pullUpText}}</div>
    </div>
    <div class="pulldown-wrapper" :style="pullDownStyle" v-if="finalSet.pullDownRefresh">{{pullDownText}}</div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      list: [],
      pullDownText: '下拉刷新',
      pullUpText: '上拉加载',
      pullDownStyle: '',
      pageNum: 1,
      pageSize: 10
    }
  },
  props: {
    initSet: {
      type: Object,
      default: function () {
        return {}
      }
    },
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    finalSet: function () {
      return Object.assign({
        pullUpLoad: true,
        click: true,
        pullDownRefresh: true,
        scrollbar: {
          fade: true
        }
      }, this.initSet)
    }
  },
  methods: {
    getRect(el) {
      if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect()
        return {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        }
      } else {
        return {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.offsetWidth,
          height: el.offsetHeight
        }
      }
    },
    refresh () {
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    initData() {
      this.getList('初始化')
    },
    getList(type) {
      if (this.pullUpText === '暂无数据') {
        this.pullUpText = '上拉加载'
        this.scroll.finishPullUp()
      }
      if (type === '初始化') {
        this.pageNum = 1
      } else if (type === '上拉加载') {
        this.pageNum++
        this.pullUpText = '加载中'
      } else if (type === '下拉刷新') {
        this.pageNum = 1
        this.pullDownText = '加载中'
      }
      this.$http(Object.assign({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }, this.data)).then(({data}) => {
        if (data.status === 0) {
          console.log('type',type)
          data.content.list = [{},{}]
          if (type === '初始化') {
            this.list = data.content.list
          } else if (type === '上拉加载') {
            if (this.pullUpText !== '暂无数据') {
              this.pullUpText = type
              Array.prototype.push.apply(this.list, data.content.list)
              this.scroll.finishPullUp()
            }
          } else if (type === '下拉刷新') {
            this.list = data.content.list
            this.pullDownText = type
            this.scroll.finishPullDown()
          }
          if (data.content.list.length < this.pageSize) {
            this.pullUpText = '暂无数据'
          }
          this.refresh()
        } else {
          this.$vux.toast.show({
              type:"warn",
              text: data.message
          })
          // this.$warn(data.message)
        }
      })
    },
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      if (this.$refs.listWrapper && (this.finalSet.pullDownRefresh || this.finalSet.pullUpLoad)) {
        this.$refs.listWrapper.style.minHeight = `${this.getRect(this.$refs.wrapper).height + 1}px`
      }
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, this.finalSet)
        if (this.finalSet.pullDownRefresh) {
          this.scroll.on('scroll', pos => {
            this.pullDownStyle = `top:${pos.y + this.pullDownInitTop}px`
          })
          this.scroll.on('pullingDown', () => {
            this.getList('下拉刷新')
          })
        }
        if (this.finalSet.pullUpLoad) {
          this.scroll.on('pullingUp', e => {
            if (this.pullUpText === '暂无数据') return false
            this.getList('上拉加载')
          })
        }

      }
    }
  },
  created () {
    this.pullDownInitTop = -50
    this.initData()
  },
  mounted () {
    this.$nextTick(() => {
      this.initScroll()
    })
  }
}
</script>


<style lang="scss" scoped>
@function Px($px) {
  @return $px / 750 * 10rem;
}
.wrapper {
  width: 100%;  
  height: 100%;
  position: relative;
  overflow: hidden
}
.content {
  width: 100%;
  padding-left: 0;
  margin: 0;
  .item {
    list-style: none;
  }
  .pullup-wrapper {
    width: 100%;
    height: auto;
    padding: 16px 0;
    line-height: normal;
    text-align: center;
    font-size: Px(30)
  }
}
.pulldown-wrapper {
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: Px(30)  
}

</style>
