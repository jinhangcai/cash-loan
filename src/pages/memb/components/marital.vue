<template>
  <div>
    <popup-picker @on-change="changeMarital" @on-hide ="hide" :data="List" :show="show"></popup-picker>
  </div>
</template>

<script>
  import {
    PopupPicker
  } from 'vux'
  export default {
    data () {
      return {
        List: [['未婚','已婚','离异','丧偶','再婚','复婚']]
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
      changeMarital(value) {
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
