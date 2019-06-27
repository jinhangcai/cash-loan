<template>
    <div>
    </div>
</template>
<script>
import { getString } from '../../utils/getString.js'
export default {
    data(){
        return {

        }
    },
    async mounted(){
        const URL = `${location.origin}${location.pathname}#/?${location.hash.split('?')[1]}`
        setTimeout(() => {
          this.$web2app('appback', { url: URL })
        }, 400)
        // console.log('URL',URL)
        //   let data = await this.$web2app('openWebPage', {useStatusBar:0 ,showNavigation:0,callback:true,url: URL});
        // console.log('openWebPage-back',data)
        // if(data.code === 0){

        //      this.$web2app('appback')
        // }
        // setTimeout(()=>{
        //      this.$web2app('appback')

        // },1200)
        // await this.$web2app('')
    }
}
</script>
