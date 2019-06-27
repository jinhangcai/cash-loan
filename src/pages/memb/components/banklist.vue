<template>
  <div>
    <popup-picker @on-change="bankChange" @on-hide ="hide" :data="bankList" :show="show"></popup-picker>
  </div>
</template>

<script>
  import {
    PopupPicker
  } from 'vux'
  export default {
    data () {
      return {
        bankList: [['邮政储蓄银行', '工商银行', '农业银行', '中国银行', '建设银行', '交通银行', '中信银行', '光大银行', '华夏银行', '民生银行',  '广发银行', '招商银行', '兴业银行', '浦发银行', '平安银行']]
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
    mounted() {
      // this.getBanklist()
    },
    methods: {
      bankChange(value) {
        this.$emit('on-change', value)
      },
      hide () {
        this.show = false
      },
      getBanklist(){
        var that =this
        that.$http({
            methods: 'get',
            url: 'auth/bankList',
        }).then((res)=>{
          console.log(res.data.data)
          if (res.data.status === 0) {
            that.bankList = res.data.data
          }else{
            // this.$vux.alert({
            //     message: res.data.msg
            //   });
          }
        },(error) => {
          // this.$vux.alert({
          //   message: '获取数据出错(auth/detail)'
          // })
        })
      }
    }
  }

</script>
<style>


</style>
