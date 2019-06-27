<template>
    <div class="repay-box">
        <!-- <div><img src="./img/pic_top.png" alt=""></div> -->
        <section class="repay-body">
            <div class="repay-title" :style="`padding-top:${native.statusBarHeight + 20}px`">还款</div>
            <div class="infotab">
                <div class="tabTitle">
                    <div>
                        <p>近日待还（元）</p>
                    </div>
                </div>
                <div class="tabCenter">
                    <div class="paymentInfo">
                        <p class="paymentSum">{{paymentInformation.allMoney || 0}}</p>
                    </div>
                </div>
                <div  class="payBtn"  @click="$router.push('/repay')">立即还款</div>
            </div>
            <div class="otherInfo flex-between">
                <div class="other-item">
                    <span class="day">最近还款日 </span>
                    <div class="value">{{timestampToTime(paymentInformation.recentDay)}}</div>
                </div>
                <div class="other-item num">
                    <div>剩余待还笔数</div>
                    <span class="value">{{paymentInformation.repayNum}}</span>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            paymentInformation:{
                recentDay: 0
            },
        }
    },
    created() {
        this.duesList()
    },
    methods: {
        duesList(){
            this.$http({
                methods:'post',
                url:'loan/duesList'
            })
            .then((data) => {
                if (data.data.data != null) {
                    this.paymentInformation = data.data.data
                }
            })
        },
        timestampToTime(timestamp) {
            if (timestamp != 0 && timestamp != null && timestamp != "") {
                var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = date.getDate() + ' ';
                return Y+M+D;
            } else {
                return "----";
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.repay-box{
    // position: absolute;
    // top: 0;
    // bottom: 0;
    // left: 0;
    // right: 0;
    background: url('./img/pic_top.png') 0 0 no-repeat;
    background-size: 100% auto;
    .repay-body{
        // position: absolute;
        // top: 0;
        width: 100%;
    }
}
.repay-title{
    // width: 100%;
    text-align: left;
    line-height: 42px;
    color: #fff;
    // background-color: #fff;
    padding: 50px .4rem 0;
    // font-weight: bold;
    font-size: .66rem;
    letter-spacing: 1px;
}
.infotab{
    border-radius: Px(8);
    background: rgba(#ffffff, .5);
    margin: .4rem auto 0;
    width: Px(700);
    padding-bottom: Px(30);
    box-shadow: 0 0 10px 1px rgba(#000, .1);
    // background: url('./index/pic_bg2.png') center no-repeat;
    // background-size: 100% 100%;
    color: #333;
    .tabTitle{
        padding: Px(120) Px(30) 0;
        // color: #333;
        font-weight: normal;
        color: #666;
        font-size: .34rem;
    }
    text-align:center;
    .paymentInfo{

        // color: #333;
        font-size:Px(24);
        padding-top: Px(15);
        margin: 0 Px(40);
        .paymentSum{
            font-size:Px(100);
            margin-top: -.3rem;
            // font-weight: bold;
        }
    }

}
.otherInfo{
    font-size:Px(26);
    text-align: center;
    padding: Px(10) Px(30);
    padding-bottom:Px(15);
    margin: .5rem 0 0;
    .other-item{
        width: 38%;
        box-shadow: 0 0 10px 1px rgba(#000, .1);
        padding: .8rem .3rem;
        border-radius: .3rem;
        line-height: .8rem;
        .value{
            font-size: .4rem;
            font-weight: bold;
        }
    }
    .num{
        float:right;
        span{
            color: #fff;
        }
    }
}
.payBtn{
    width: 60%;
    height: Px(46);
    text-align: center;
    border-radius: Px(40);
    margin: 0.4rem auto 0;
    line-height: Px(46);
    color: #fff;
    padding: .2rem;
    //   background-color: #fff;
    @include main-back;
    font-size: .4rem;
}
</style>
