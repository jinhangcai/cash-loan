<template>
  <div>
    <popup-picker @on-change="changeEducation" @on-hide ="hide" :data="List" :show="show"></popup-picker>
  </div>
</template>

<script>
  import {
    PopupPicker
  } from 'vux'
  export default {
    data () {
      return {
        List: [['高中以下','高中/中专','大专','本科','研究生','博士']]
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
      changeEducation(value) {
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
