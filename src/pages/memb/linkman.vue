<template>
  <div class="box">
    <div class="tip">直系亲属联系人（常联系的真实号码有助于通过审核）</div>
    <div class="content">
      <div class="information" @click="contact!=3?isName = true:toast()">
        <span class="title">与本人关系</span>
        <span class="text">{{contactRel1}}</span>
        <i></i>
      </div>
      <div class="information" @click="contact!=3?btn1():toast()">
        <span class="title">紧急联系人</span>
        <span class="text" >{{contact1}}</span>
        <i></i>
      </div>
    </div>
    <div class="tip">其他联系人（常联系的真实号码有助于通过审核）</div>
    <div class="content">
      <div class="information"  @click="contact!=3?isOther = true:toast()">
        <span class="title">与本人关系</span>
        <span class="text">{{contactRel2}}</span>
        <i></i>
      </div>
      <div class="information" @click="contact!=3?btn2():toast()">
        <span class="title">紧急联系人</span>
        <span class="text">{{contact2}}</span>
        <i></i>
      </div>
    </div>
    <div class="button" @click="submit">确认并提交</div>
    <my-relation @on-change="changeRelation" v-model="isName"></my-relation>
    <my-other @on-change="changeOther" v-model="isOther"></my-other>
  </div>
</template>

<script>
import MyRelation from './components/relation.vue';
import MyOther from './components/other.vue';
   export default {
    components: {
      MyRelation,
      MyOther
    },
    data() {
      return {
        isName: false,
        isOther: false,
        contact: '',
        list: {
          contactRel1: '请选择',
          contactName1: '',
          contactMobile1: '',
          contactRel2: '请选择',
          contactName2: '',
          contactMobile2: '',
        },
        contactRel1: '请选择',
        contactRel2: '请选择',
        contact1: '请选择',
        contact2: '请选择',
      }
    },
    mounted() {
      this.$vux.loading.show({
        text: '加载中'
      })

      this.getState();
    },
    methods:{
      getState(){
        var that =this
        that.$http({
            methods: 'post',
            url: 'auth/detail',
        }).then((res)=>{
          console.log(res.data)
          if (res.data.status === 0) {
            that.contact = res.data.data.contact
            if(that.contact == 3){
              that.getContact();
            }else{
              that.$vux.loading.hide()
            }
          }else{
            // this.$vux.alert({
            //     message: res.data.msg
            //   });
          }
        // },(error) => {
          // this.$vux.alert({
          //   message: '获取数据出错(auth/detail)'
          // })
        })
      },
      toast(){
         this.$vux.toast.text(
            '联系人已认证,无需重复认证'
          );
      },
      changeRelation(value){
        this.contactRel1 = value[0]
      },
      changeOther(value){
        this.contactRel2 = value[0]
      },
      async btn1(){
        var that = this
        let data = await that.$web2app('getTelBook',{ callback: true })
        // console.log('通讯录',data)
        that.list.contactName1 = data.name
        var test = data.tel
        test = test.replace(/-/ig, "").replace(/\s+/g, "");
        that.list.contactMobile1 = test
        that.$vux.toast.text(
           data.msg
        );
          that.contact1 = that.list.contactName1 + '  ' + that.list.contactMobile1
      },
      async btn2(){
        var that = this
        let data = await that.$web2app('getTelBook',{ callback: true })
        // console.log('通讯录',data.name)
        that.list.contactName2 = data.name
        var test = data.tel
        test = test.replace(/-/ig, "").replace(/\s+/g, "");
        that.list.contactMobile2 = test
        that.$vux.toast.text(
           data.msg
          );
          if(that.list.contactMobile2 == that.list.contactMobile1){
            that.$vux.toast.text('不能填写同样的紧急联系人');
          }else{
             that.contact2 = that.list.contactName2 + '  ' + that.list.contactMobile2
          }

      },
      getContact(){
        var that =this
        that.$http({
            methods: 'post',
            url: 'auth/contactInfo',
        }).then((res)=>{
          console.log(res.data)
          if (res.data.status === 0) {

            that.list = res.data.data
            that.contact1 = res.data.data.contactName1 + '  ' + res.data.data.contactMobile1
            that.contact2 = res.data.data.contactName2 + '  ' + res.data.data.contactMobile2
            switch (that.list.contactRel1) {
              case '1':
                    that.contactRel1 = '父亲'
                break;
              case '2':
                    that.contactRel1 = '母亲'
                break;
              case '3':
                    that.contactRel1 = '儿子'
                break;
              case '4':
                    that.contactRel1 = '女儿'
                break;
              case '5':
                    that.contactRel1 = '配偶'
                break;
              case '6':
                    that.contactRel1 = '兄弟'
                break;
              case '7':
                   that.contactRel1 = '姐妹'
                break;
            }
           switch (that.list.contactRel2) {
              case '1':
                    that.contactRel2 = '同学'
                break;
              case '2':
                    that.contactRel2 = '亲戚'
                break;
              case '3':
                    that.contactRel2 = '同事'
                break;
              case '4':
                    that.contactRel2 = '朋友'
                break;
              case '5':
                    that.contactRel2 = '其他'
                break;
              default:
                   that.contactRel2 = '请选择'
                break;
            }
            that.$vux.loading.hide()
          }else{
            that.$vux.loading.hide()
            // this.$vux.alert({
            //     message: res.data.msg
            //   });
          }
        // },(error) => {
        //   that.$vux.loading.hide()
        //   this.$vux.alert({
        //     message: '获取数据出错(auth/contact)'
        //   })
        })
      },
      submit(){
        var that = this
        switch (that.contactRel1) {
              case '父亲':
                    that.list.contactRel1 = '1'
                break;
              case '母亲':
                    that.list.contactRel1 = '2'
                break;
              case '儿子':
                    that.list.contactRel1 = '3'
                break;
              case '女儿':
                    that.list.contactRel1 = '4'
                break;
              case '配偶':
                    that.list.contactRel1 = '5'
                break;
              case '兄弟':
                    that.list.contactRel1 = '6'
                break;
              case '姐妹':
                   that.list.contactRel1 = '7'
                break;
              default:
                   that.list.contactRel2 = '0'
                break;
            }
           switch (that.contactRel2) {
              case '同学':
                    that.list.contactRel2 = '1'
                break;
              case '亲戚':
                    that.list.contactRel2 = '2'
                break;
              case '同事':
                    that.list.contactRel2 = '3'
                break;
              case '朋友':
                    that.list.contactRel2 = '4'
                break;
              case '其他':
                    that.list.contactRel2 = '5'
                break;
              default:
                   that.list.contactRel2 = '0'
                break;
            }
        that.$http({
            methods: 'post',
            url: 'auth/contact',
            data:{
              contactRel1: that.list.contactRel1,
              contactName1: that.list.contactName1,
              contactMobile1: that.list.contactMobile1,
              contactRel2: that.list.contactRel2,
              contactName2: that.list.contactName2,
              contactMobile2: that.list.contactMobile2
            }
        }).then((res)=>{
          console.log(res.data)
          if (res.data.status === 0) {
            that.list = res.data.data
            this.$vux.toast.text(
                res.data.msg
              );
              setTimeout(()=>{
                that.$router.go(-1)
              },1000)
          }else{
            // this.$vux.alert({
            //   message: res.data.msg
            // });
          }
        // },(error) => {
        //   this.$vux.alert({
        //     message: '获取数据出错(auth/contact)'
        //   })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

.box{
  padding-top: Px(40);
  width: 100%;
  background: #fff;
  overflow: hidden;
}
.header{
    display: flex;
    height: Px(90);
    align-items: center;
    background: #fff;
    border-bottom: 1px #eee solid;
    .arrow{
      width: Px(50);
      margin-left: Px(30);
      img{
        width: Px(16)
      }
    }
    .title{
      position: absolute;
      width: Px(200);
      left: 50%;
      margin-left: Px(-100);
      line-height: Px(90);
      text-align: center;
      color: #333333;
      font-size: Px(30);

    }
}
.tip{
  height: Px(90);
  padding: Px(20);
  line-height: Px(90);
  font-size: Px(24);
  color: #999999;
  background: #f6f6f6;
}
.content{

  background: #fff;
  .information{
    display: flex;
    align-items: center;
    height: Px(115);
    line-height: Px(115);
    padding-left: Px(20);
    border-bottom: 1px #eee solid;
   i{
      // margin-top: Px(47);
      margin-right: Px(20);
      width: Px(12);
      height: Px(21);
      background: url(./img/row2.png) no-repeat;
      background-size: 100% 100%;
    }
    .title{
       flex:1;
       width: Px(250);
       color: #333333;
      //  margin-right: 42%;
       font-size: Px(30);
     }
    .text{
      flex:2;
      color: #666;
      text-align: right;
      margin-right: Px(20);
      font-size: Px(24);
       input{
        width: Px(350);
        height: Px(70);
        border: 1px solid #D7D7D7;
        outline: 0;
        padding-left: Px(15);
        font-size: Px(24);
      }
    }
  }
}
.button{
  width: Px(690);
  height: Px(85);
  margin: Px(60) auto;
  // background: url(./img/bg.jpg);
	@include main-back;
  color: #fff;
  text-align: center;
  line-height: Px(85);
  font-size: Px(30);
  border-radius: Px(40);
}
</style>
