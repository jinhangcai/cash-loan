<template>
  <div>
    <popup-picker @on-change="changeOther" @on-hide ="hide" :data="List" :show="show"></popup-picker>
  </div>
</template>

<script>
  import {
    PopupPicker
  } from 'vux'
  export default {
    data () {
      return {
        List: [['同学','亲戚','同事','朋友','其他']]
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
      changeOther(value) {
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
