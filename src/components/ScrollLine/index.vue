<template>
    <div class="swiper-container scroll-line">
        <div class="swiper-wrapper">
            <slot></slot>
            <!-- .swiper-slide -->
        </div>
    </div>
</template>

<script>
import SwiperJS from 'swiper/dist/js/swiper'

export default {
    data() {
        return {
            name: ''
        }
    },
    methods: {
        initSwiper(className) {
            /* eslint-disable no-new */
            new SwiperJS(className, {
                loop: true,
                autoplay: {
                    disableOnInteraction: false,
                    delay: 4000
                }, // 可选选项，自动滑动
                direction: 'vertical', // 垂直切换选项
                speed: 3000,
                allowTouchMove: false,
                autoplayDisableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay
            })
        }
    }
}
</script>

<style>

</style>
