<template>
  <div>
    <popup-picker @on-change="changeRelation" @on-hide ="hide" :data="List" :show="show"></popup-picker>
  </div>
</template>

<script>
  import {
    PopupPicker
  } from 'vux'
  export default {
    data () {
      return {
        List: [['父亲','母亲','儿子','女儿','配偶','兄弟','姐妹']]
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    components: {
      PopupPicker
    },
    computed: {
      show: {
        get() {
          return this.value
        },
        set() {
          this.$emit('input', false)
        }
      }
    },
    methods: {
      changeRelation(value) {
        this.$emit('on-change', value)
      },
      hide () {
        this.show = false
      }
    }
  }

</script>
<style>


</style>
