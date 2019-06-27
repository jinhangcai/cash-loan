<template>
  <div></div>
</template>

<script>
export default {
  data(){
    return {

    }
  },

  async mounted(){
    setTimeout(() => {
      this.$web2app('appback', {
        url: window.location.protocol + '//' + window.location.host + '/m.html#/memb/info',
      })
    }, 400)
  },
}
</script>
