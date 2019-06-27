<template>
    <div>
        <div class="back">
            <img src="./images/maintain.gif" alt="">
            <div class="tips">{{ message }}</div>
        </div>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            message: '系统正在努力升级中',
        }
    },
    created() {
        this.getData()
    },
    methods:{
        getData() {
            let timer = 
            this.$http({
                methods: 'get',
                url: '/index/checkUpd',
            }).then(async (res) => {
                if (res.data.status == 0) {
                    if (res.data.data.is_update == 1) {
                        this.message = res.data.msg
                        setTimeout(() => {
                            this.getData()
                        }, 1000 * 60 * 5)
                    } else {
                        this.$router.replace('/')
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.back{
    .tips{
        margin: 0.5rem 0 0;
        text-align: center;
        color: #666;
        font-size: .3rem;
    }
    img{
        display: block;
        margin: .5rem auto 0;
        width: 100%;
    }
}
</style>
