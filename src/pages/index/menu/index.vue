<template>
    <div>
           <div class="sideBg" v-show="showLeftMenu" @click="hideMenu"></div>
            <div class="sidebar" :class="{'-show': showLeftMenu,'-hide':!showLeftMenu }" v-show="ready">
                <div class="sidebarTitle">
                    <p>您好！</p>
                    <p>{{userInfo.mobile}}</p>
                </div>
                <div class="sideBaritem">
                    <div @click="goAbout" style="display: flex;">
                    <img src="./images/icon_users.png" alt="" class="iconUsers">
                    <span>关于我们</span>
                    </div>
                    <img src="./images/icon_arrow_right.png" alt="" class="enter" @click="goAbout">
                </div>
                <div class="sideBaritem" v-if="userInfo.vid">
                    <div @click="gofindPwd" style="display: flex;">
                    <img src="./images/icon_lock.png" alt="" class="iconUsers">
                    <span>修改密码</span>
                    </div>
                    <img src="./images/icon_arrow_right.png" alt="" class="enter" @click="gofindPwd">
                </div>
                <div class="sideBaritem" v-if="userInfo.vid">
                    <div @click="goFeedback" style="display: flex;">
                    <img src="./images/icon_feedback.png" alt="" class="iconUsers">
                    <span>用户反馈</span>
                    </div>
                    <img src="./images/icon_arrow_right.png" alt="" class="enter" @click="goFeedback">
                </div>
                <div class="sideBaritem" v-if="userInfo.vid">
                    <div @click="goMyBank" style="display: flex;">
                    <img src="./images/icon_feedback.png" alt="" class="iconUsers">
                    <span>我的银行卡</span>
                    </div>
                    <img src="./images/icon_arrow_right.png" alt="" class="enter" @click="goFeedback">
                </div>
                <div class="sideBaritem">
                    <div @click="signOut" style="display: flex;">
                    <img src="./images/icon_out.png" alt="" class="iconUsers">
                    <span> 退 出 </span>
                    </div>
                    <img src="./images/icon_arrow_right.png" alt="" class="enter" @click="signOut">
                </div>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            ready: false

        }

    },
    computed:{
        // showContainer(){
        //     return false
        // },
        showLeftMenu(){
            // if()
            if(this.$store.state.showLeftMenu){
                this.ready = true;
            }
            return this.$store.state.showLeftMenu
        },
        userInfo(){
            return this.$store.state.userInfo;
        }
    },
    mounted() {
    },
    methods:{
        hideMenu(){
            this.$store.state.showLeftMenu = false ;
        },
         signOut(){
            this.$web2app('logOut',{callback:true})
            this.$web2app('openAppPage',{name:'login'})
        },
         gofindPwd(){
            this.$web2app('openAppPage',{name:'findPwd'})
        },
        goFeedback() {
            this.$router.push('/memb/feedback/list')
        },
        // btn(){
        //     this.$router.push({path: '/repay'});
        // },
        goAbout(){
            this.$router.push("about")
        },
        goMyBank() {
            this.$router.push('memb/my/bank')
        }
    }
}
</script>
<style lang="scss" scoped>
.sideBg{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 5;
        background-color: rgba(0,0,0,0.5);
    }
    .sidebar{
        width:Px(400);
        height:100%;
        background:white;
        position:fixed;
        left:Px(-400);
        animation:in 0.5s;
        visibility: visible;
        top:0;
        z-index:6;
        .sidebarTitle{
            padding-top:Px(200);
            padding-left:Px(30);
            font-size:Px(38)
        }
        .sideBaritem{
            margin-top:Px(100);
            display:flex;
            font-size:Px(28);
            padding-left:Px(30);
            padding-right:Px(30);
            justify-content:space-between;
        }
    }

     .-show{
        visibility: visible;
        pointer-events: auto;
        animation:out 0.5s;
        left:0px;
    }
    .-hide{
        visibility: visible;
        pointer-events: auto;
        animation:in 0.5s;
        left:Px(-400);
    }
    @keyframes out
    {
        from   {left: Px(-400);}
        to  {left:0px; }
    }
    @keyframes in
    {
        from   {left: 0px;}
        to  {left:Px(-400); }
    }

    .iconUsers{
        width:Px(35);
        height: auto;
        align-self: center;
        margin-right: Px(10);
    }
    .enter{
        width:Px(14);
        height:Px(23);
        vertical-align: middle;
        align-self: center;
    }
</style>
