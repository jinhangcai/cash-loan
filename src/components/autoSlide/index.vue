<template>
    <div ref="autoSlideRef" class="auto-slide">
        <section ref="targetRef" class="slide-box">
            <slot></slot>
        </section>
        <section ref="copyRef" class="slide-box">
        </section>
    </div>
</template>

<script>
export default {
    methods: {
        initSlide(){
            this.$nextTick(() => {
                let parent = this.$refs.autoSlideRef
                let target = this.$refs.targetRef
                let copy = this.$refs.copyRef
                // 获取元素margin-top
                if (target.offsetHeight >= parent.getBoundingClientRect().height) {
                    copy.innerHTML = target.innerHTML
                    setInterval(() => {
                        if(parent.scrollTop - target.offsetHeight >= 0)
                            parent.scrollTop = 0
                        else{
                            parent.scrollTop += 1;
                        }
                    }, 50)
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.auto-slide{
    overflow: hidden;
}
.slide-box{
    padding: 1px;
}
</style>
