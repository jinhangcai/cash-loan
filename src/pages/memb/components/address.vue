<template>
  <div>
    <x-address @on-hide="hide" @on-show="showaddr"  @on-shadow-change="onShadowChange" title=" " :list="addressData" :show="show"></x-address>
  </div>
</template>

<script>
  import {
    XAddress,
    ChinaAddressV3Data
  } from 'vux'
  export default {
    data() {
      return {
        addressData: ChinaAddressV3Data,
        address: '',
        isChange: false
      }
    },
    components: {
      XAddress
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
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
      onShadowChange(ids, names) {
        this.address = names[0] + ' ' + names[1] + ' ' + names[2]
        this.$emit('on-change', this.address, this.isChange)
      },
      showaddr() {
        this.isChange = true
      },
      hide () {
        this.show = false
      }
    },
    mounted () {
    
    }
  }

</script>

<style>
  .vux-cell-box {
    display: none
  }
</style>
