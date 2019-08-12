<template>
    <div class="content">
        <div class="nav-header" :style="`padding-top:${native.statusBarHeight}px`">
            <span> 首页 </span>
            <i class="icon-service" @click="show = true"></i>
        </div>
        <div class="relative-box">
            <img class="pic-banner" src="./index/tab-banner-box-top.png" alt="">
            <img class="pic-describe" src="./index/top_describe.png" alt="">
        </div>
        
        <ul class="list-box">
            <li class="list-item">
                <div class="list-title">
                    <span class="list-status">申请提交成功</span>
                    <!-- <span class="list-time">{{ time }}</span> -->
                </div>
                
            </li>
            <li :class="active ? '' : 'active'" class="list-item">
                <div class="list-title">
                    <span class="list-status">{{ active ?'审核通过':'资料审核中' }}</span>
                    <!-- <span class="list-time">{{ time }}</span> -->
                </div>
                <p v-if="active" class="list-details">恭喜您通过审核，您已同意<router-link class="item-link" :to="`/agreement?time=${time}`">《借款协议》</router-link></p>
            </li>
            <li :class="active? 'active' : ''" class="list-item">
                <div class="list-title">
                    <span class="list-status">等待放款</span>
                    <!-- <span class="list-time">{{ time }}</span> -->
                </div>
                <!-- <p v-if="auditor_state === 3" class="list-details">已进入放款状态，请您耐心等待</p> -->
                <p v-if="active" class="list-details">应还金额{{ account }}元，借款期限{{ days }}天，到账金额{{ quota }}元</p>
                <span v-if="active" class="btn-order" @click="cancelOrder">取消订单</span>
            </li>
            
        </ul>
        <popup v-model="show">
            <div class="popup">
                <div class="list-item" @click="$web2app('phone',{number: customPhone})">电话联系客服</div>
                <router-link class="list-item" to="/memb/feedback/list">在线联系客服</router-link>
                <div class="list-item last-item" @click="show = false">取消</div>
            </div>
        </popup>
    </div>
</template>

<script>
import {Popup} from 'vux'
import { setTimeout } from 'timers';
export default {
    components: {
        Popup
    },
    data() {
        return {
            show: false,
            time: this.$utils.getCookie('time'),
            quota: 0, // 到款金额
            interest: 0, // 利息
            account: 0, // 应还金额
            days: 0, // 借款期限
            customPhone: '',
            auditor_state: 0, // 3: 审核通过
            active: false
        }
    },
    async created() {
        await this.getInfo()
        this.getcustomPhone()
    },
    methods: {
        async getInfo() {
            await this.$http({
                methods:'post',
                url:'/user/info'
            })
            .then(async (data) => {
                this.$vux.loading.hide()
                if(data.data.status === 0){
                    this.quota = data.data.data.quota;
                    this.auditor_state = data.data.data.auditor_state;
                    this.active = this.auditor_state == 5
                    this.getList()
                } else {
                }
            });
        },
        async cancelOrder() {
            await this.$http({
                methods:'post',
                url:'/loan/cancel'
            })
            .then(async (data) => {
                this.$vux.loading.hide()
                if(data.data.status === 0){
                    this.$utils.setCookie('time', '', 1)
                    this.$vux.toast.show({
                        type: 'success',
                        text: '取消订单成功！'
                    })
                    setTimeout(() => {
                       this.$router.replace('/') 
                    }, 1000)
                } else {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: data.data.msg
                    })
                }
            });
        },
        // 获取信息
        getList() {
            var that = this;
            that.$http({
                methods: 'post',
                url: 'loan/poundageRate'
            }).then((res) => {
                if (res.data.status == 0) {
                    let data = res.data.data
                    // that.quota = data.quota;
                    that.days = data.days;
                    data.quota = that.quota
                    // 前置   先扣服务费 entryMode==0
                    if (data.entryMode == 0) {

                        that.quota = data.quota - data.quota * + data.manageRate;
                        that.quota = that.quota.toFixed(2);//向后台传的金额
                        that.interest = data.quota * + data.interestRate / 365 * that.days;
                        that.interest = that.interest.toFixed(2);//利息

                        // 本金 + 利息
                        that.account = Number(data.quota) + Number(that.interest);
                        that.account = that.account.toFixed(2);
                    } else {
                        // 后置  还款时再扣服务费  entryMode==1
 
                        that.quota = data.quota;
                        that.quota = that.quota.toFixed(2);//向后台传的金额
                        that.interest = data.quota * +data.interestRate / 365 * that.days;
                        that.interest = that.interest.toFixed(2);//利息
  
                        // 本金 + 服务费 + 利息
                        that.account = Number(data.quota) + data.quota *+ data.manageRate + Number(that.interest);
                        that.account = that.account.toFixed(2);
                    }
                } else {
                }
                that.$vux.loading.hide();
            }, (error) => {
                that.$vux.loading.hide();
            })
        },
        getcustomPhone(){
            this.$http({
                methods:'get',
                url:'index/customerMobile'
            })
                .then((data) => {
                    if (data.data.data != null) {
                        this.customPhone = data.data.data.mobile
                    }
                })
        },
    }
}
</script>

<style lang="scss" scoped>
.content{
    height: calc(100vh - 4.5rem);
    overflow: auto;
}
.nav-header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    line-height: Px(80);
    color: #ffffff;
    font-weight: bold;
    font-size: Px(36);
    z-index: 1;
}
.icon-service{
    position: absolute;
    bottom: 0;
    right: Px(30);
    height: Px(80);
    width: Px(80);
    display: block;
    background: url('./index/icon_service_white.png')center no-repeat;
    background-size: Px(44) auto;
    &::before{
        content: '';
    }
}
.relative-box{
    position: relative;
}
.pic-banner{
    display: block;
    width: 100%;
}
.pic-describe{
    position: absolute;
    bottom: Px(132);
    left: 0;
    right: 0;
    width: Px(300);
    margin: auto;
}
.popup{
    .list-item{
        display: block;
        text-decoration: none;
        line-height: Px(86);
        background-color: #ffffff;
        text-align: center;
        color: #333;
        &:first-child{
            border-bottom: 1px solid rgba(#C0BFC4 , 0.5);
        }
        &.last-item{
            border-top: 10px solid rgba(#f0f0f0, .5);
        }
    }
}

.list-box{
    list-style: none;
    padding: Px(80) 0 0;
    .list-item{
        position: relative;
        margin: 0 Px(34);
        padding: 0 0 Px(60) Px(40);
        text-align: left;

        &::before{
            position: absolute;
            top: 8%;
            left: 0;
            width: Px(20);
            height: Px(20);
            background-color: #EAEAEA;
            border: 1px solid #AAAAAA;
            border-radius: 50%;
            content: '';
            z-index: 1;
        }
        &::after{
            position: absolute;
            top: 8%;
            left: Px(10);
            height: 100%;
            width: Px(4);
            background-color: #D8D8D8;
            content: '';
        }
        &:last-child::after{
            display: none;
        }
        .list-title{
            display: flex;
            justify-content: space-between;
            color: #AAAAAA;
            font-weight: bold;
            font-size: Px(28);
        }
        .list-time{
            color: #999;
        }
        .list-details{
            color: #AAAAAA;
            font-size: Px(24);
            margin-top: Px(10);
        }
        &.active{
            &::before{
                background-color: #CFD8FF;
                border-color: #303A69;
            }
            .list-title{
                color: #333;
            }
            .list-details{
                color: #777777;
                font-size: Px(24);
                margin-top: Px(10);
            }
        }
        .item-link{
            color: inherit;
            text-decoration: none;
        }
        .btn-order{
            display: inline-block;
            color: #AAAAAA;
            border: 1px solid #CCCCCC;
            border-radius: Px(20);
            padding: Px(2) Px(20);
            font-size: Px(24);
            margin-top: Px(20);
        }
    }
}
</style>
