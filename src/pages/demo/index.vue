<template>
    <div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    async mounted(){
        const URL = 'http://www.baidu.com'
          let data = await this.$web2app('openWebPage', {useStatusBar:1 ,showNavigation:0,callback:true,url: URL});

        setTimeout(()=>{
            this.$web2app('appback')
            console.log('appback')
        },300)
        // await this.$web2app('')
    }
}
</script>
