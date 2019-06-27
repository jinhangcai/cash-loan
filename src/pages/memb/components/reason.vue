<template>
  <div>
    <popup-picker @on-change="changeReason" @on-hide ="hide" :data="List" :show="show"></popup-picker>
  </div>
</template>

<script>
  import {
    PopupPicker
  } from 'vux'
  export default {
    data () {
      return {
        List: [['装修','婚庆','旅游','租房','汽车周边','电子数码产品','医疗','其他','家居家具','家用电器']]
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
      changeReason(value) {
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
