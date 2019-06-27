<template>
  <div class="box">
    <div class="tips">
      该信息将作为您的实名凭证，请确保真实谨慎填写
    </div>
    <div class="content">
      <div class="information">
        <span class="title">姓名</span>
        <span class="text">{{list.real_name}}</span>
        <i></i>
      </div>
      <div class="information">
        <span class="title">身份证号</span>
        <span class="text">{{list.id_card}}</span>
        <i></i>
      </div>
      <div class="again" v-show="show">
        <p class="tip">请检查您的身份证信息，如不正确请 <span style="color:#228cfc" @click="again()">[ 重新识别 ]</span></p>
        <p class="back"></p>
      </div>
      <div class="information" @click="baseInfo!=3?showMarital = true:toast()">
        <span class="title">婚姻状况</span>
        <span class="text" >{{list.marital}}</span>
        <i></i>
      </div>
      <div class="information" @click="baseInfo!=3?showEducation = true:toast()">
        <span class="title">学历</span>
        <span class="text">{{list.degree}}</span>
        <i></i>
      </div>
     <div class="information" @click="baseInfo!=3?(showAddress1 = true, isChange1 = true):toast()">
        <span class="title">居住地区</span>
        <span class="text" v-html="isChange1? address: initAddress"></span>
        <i></i>
      </div>
      <div class="information" @click="baseInfo!=3?isAddress = true:toast()">
        <span class="title">详细地址</span>
        <span class="text"><input type="text" v-model="list.address" v-show="isAddress" placeholder="请填写到街道门牌号"><span v-show="!isAddress" v-html="list.address?list.address:'请填写到街道门牌号'" ></span></span>
        <i></i>
      </div>
      <div class="information" @click="baseInfo!=3?showWork = true:toast()">
        <span class="title">职业</span>
        <span class="text">{{list.work_type}}</span>
        <i></i>
      </div>
      <div class="information"  @click="baseInfo!=3?isCompany = true:toast()">
        <span class="title">单位全称</span>
        <span class="text"><input type="text" v-model="list.company" v-show="isCompany" placeholder="请填写单位全称"><span v-show="!isCompany" v-html="list.company?list.company:'请填写单位全称'" ></span></span>
        <i></i>
      </div>
      <div class="information" @click="baseInfo!=3?isMobile = true:toast()">
        <span class="title">单位电话</span>
        <span class="text">
          <input class="text-areacode" type="text" :value="list.company_mobile_areacode" @input="inputDigital($event, 'company_mobile_areacode', 5)" v-show="isMobile" placeholder="请填写区号">
          <input class="text-phone" type="text" :value="list.company_mobile_number" @input="inputDigital($event, 'company_mobile_number', 8)" v-show="isMobile" placeholder="请填写单位电话">
          <span v-show="!isMobile" v-html="list.company_mobile?list.company_mobile:'请填写单位电话'" ></span>
        </span>
        <i></i>
      </div>
      <div class="information" @click="baseInfo!=3?(showAddress2 = true, isChange2 = true):toast()">
        <span class="title">单位地区</span>
        <span class="text" v-html="isChange2? company_address:initCaddress"></span>
        <i></i>
      </div>
      <div class="information" @click="baseInfo!=3?isCaddress = true:toast()">
        <span class="title">详细地址</span>
        <span class="text"><input type="text" v-model="list.company_address" v-show="isCaddress" placeholder="请填写单位详细地址"><span v-show="!isCaddress" v-html="list.company_address?list.company_address:'请填写单位详细地址'" ></span></span>
        <i></i>
      </div>
      <div class="information" @click="baseInfo!=3?showReason = true:toast()">
        <span class="title">借款用途</span>
        <span class="text">{{list.loan_reason}}</span>
        <i></i>
      </div>
    </div>
    <div class="button" @click="submit()" v-show="show">确认并提交</div>
    <my-address @on-change="changeAddress1" v-model="showAddress1"></my-address>
    <my-address @on-change="changeAddress2" v-model="showAddress2"></my-address>
    <my-marital @on-change="changeMarital" v-model="showMarital"></my-marital>
    <my-education @on-change="changeEducation" v-model="showEducation"></my-education>
    <my-work @on-change="changeWork" v-model="showWork"></my-work>
    <my-reason @on-change="changeReason" v-model="showReason"></my-reason>
  </div>
</template>

<script>
import MyAddress from './components/address.vue'
import MyMarital from './components/marital.vue'
import MyEducation from './components/education.vue'
import MyWork from './components/work.vue'
import MyReason from './components/reason.vue'
  export default {
    components: {
      MyAddress,
      MyMarital,
      MyEducation,
      MyWork,
      MyReason
    },
    data() {
      return {
        list: {
          marital: '请选择',
          degree: '请选择',
          work_type: '请选择',
          loan_reason: '请选择',
        },
        show:false,
        showWork: false,
        showReason: false,
        showEducation: false,
        showMarital: false,
        showAddress1: false,
        showAddress2: false,
        isChange1: false,
        isChange2: false,
        isName: false,
        isCard: false,
        isCompany: false,
        isMobile: false,
        isAddress: false,
        isCaddress: false,
        address: '',
        initAddress: '请选择',
        province: '',
        bankCity: '',
        country: '',
        company_address: '',
        initCaddress: '请选择',
        company_province: '',
        company_bankCity: '',
        company_country: '',
        marital: '',
        degree: '',
        work_type: '',
        loan_reason: '',
        baseInfo: '1'
      }
    },
    mounted() {
      this.$vux.loading.show({
        text: '加载中'
      })
      this.getInfoauth()
      this.getState()
    },
    methods:{
      inputDigital (e, valueName, maxLen) {
        if (e.data && !/[0-9]/.test(e.data)) {
          e.target.value = ''
          e.target.value = this.list[valueName]
          return
        }
        if (maxLen === +maxLen && e.target.value.length > maxLen) {
          e.target.value = this.list[valueName]
          return
        }
        this.list[valueName] = e.target.value
      },
      again(){
        var that =this
        that.$http({
            methods: 'post',
            url: 'auth/delIdCard',
        }).then((res)=>{
          console.log(res.data)
          if (res.data.status === 0) {
             that.$vux.toast.text(
                 res.data.msg
              );
            that.$web2app('checkFaceLiveness',{ callback: true })
          }else{
            // this.$vux.alert({
            //     message: res.data.msg
            //   });
          }
        // },(error) => {
        //   this.$vux.alert({
        //     message: '获取数据出错(auth/detail)'
        //   })
        })

      },
      getState(){
        var that =this
        that.$http({
            methods: 'post',
            url: 'auth/detail',
        }).then((res)=>{
          console.log(res.data)
          if (res.data.status === 0) {
            that.baseInfo = res.data.data.baseInfo
            if(that.baseInfo!=3){
              that.show = true
            }
            // TEST
            // that.baseInfo = 1
            // that.show = true
          }else{
            // this.$vux.alert({
            //     message: res.data.msg
            //   });
          }
        // },(error) => {
        //   this.$vux.alert({
        //     message: '获取数据出错(auth/detail)'
        //   })
        })
      },
      toast(){
         this.$vux.toast.text(
            '基础信息已认证，无法修改'
          );
      },
      changeAddress1(address) {
        this.address = address
        this.province = address.split(' ')[0]
        this.city = address.split(' ')[1]
        this.country = address.split(' ')[2]
        console.log(this.country,this.city,this.province)
      },
      changeAddress2(address) {
        this.company_address = address
        this.company_province = address.split(' ')[0]
        this.company_city = address.split(' ')[1]
        this.company_country = address.split(' ')[2]
        console.log(this.company_country,this.company_city,this.company_province)
      },
      changeMarital(value){
        var that = this
        that.list.marital = value[0]

      },
      changeEducation(value){
        var that = this
        that.list.degree = value[0]

      },
      changeWork(value){
        var that = this
        that.list.work_type = value[0]

      },
      changeReason(value){
        var that = this
        that.list.loan_reason = value[0]

      },
      getInfoauth(){
        var that =this
        that.$http({
            methods: 'post',
            url: 'auth/baseInfo',
            // params: {}
        }).then((res)=>{
          console.log(res.data)
          if (res.data.status === 0) {
            that.$vux.loading.hide()
            that.list = res.data.data
            that.list.company_mobile_areacode = (that.list.company_mobile || '')
              .split('-')[0]
            that.list.company_mobile_number = (that.list.company_mobile || '')
              .split('-')[1]
            if(that.list.province!=null&&that.list.province!=''){
              that.initAddress = that.list.province + ' ' + that.list.city + ' ' + that.list.country
            }else{
              that.initAddress = '请选择'
            }
            if(that.list.company_province!=null&&that.list.company_province!=''){
             that.initCaddress = that.list.company_province + ' ' + that.list.company_city + ' ' + that.list.company_country
            }else{
              that.initCaddress = '请选择'
            }
            switch (that.list.marital) {
              case '1':
                    that.list.marital = '未婚'
                break;
              case '2':
                    that.list.marital = '已婚'
                break;
              case '3':
                    that.list.marital = '离异'
                break;
              case '4':
                    that.list.marital = '丧偶'
                break;
              case '5':
                    that.list.marital = '再婚'
                break;
              case '6':
                    that.list.marital = '复婚'
                break;
              default:
                   that.list.marital = '请选择'
                break;
            }
            switch (that.list.loan_reason) {
              case '1':
                    that.list.loan_reason = '装修'
                break;
              case '2':
                    that.list.loan_reason = '婚庆'
                break;
              case '3':
                    that.list.loan_reason = '旅游'
                break;
              case '4':
                    that.list.loan_reason = '租房'
                break;
              case '5':
                    that.list.loan_reason = '汽车周边'
                break;
              case '6':
                    that.list.loan_reason = '电子数码产品'
                break;
              case '7':
                    that.list.loan_reason = '医疗'
                break;
              case '8':
                    that.list.loan_reason = '其他'
                break;
              case '9':
                    that.list.loan_reason = '家居家具'
                break;
              case '9':
                    that.list.loan_reason = '家用电器'
                break;
              default:
                   that.list.loan_reason = '请选择'
                break;
            }
            switch (that.list.work_type) {
              case '1':
                    // that.list.work_type = '学生'
                    that.list.work_type = '上班族'
                break;
              case '2':
                    that.list.work_type = '上班族'
                break;
              case '3':
                    that.list.work_type = '企业主'
                break;
              case '4':
                    that.list.work_type = '自由职业'
                break;
              default:
                   that.list.work_type = '请选择'
                break;
            }
            switch (that.list.degree) {
              case '1':
                    that.list.degree = '高中以下'
                break;
              case '2':
                    that.list.degree = '高中/中专'
                break;
              case '3':
                    that.list.degree = '大专'
                break;
              case '4':
                    that.list.degree = '本科'
                break;
              case '5':
                    that.list.degree = '研究生'
                break;
              case '6':
                    that.list.degree = '博士'
                break;
              default:
                   that.list.degree = '请选择'
                break;
            }
          }else{
            that.$vux.loading.hide()
            // this.$vux.alert({
            //     message: res.data.msg
            //   });
          }
        },(error) => {
          that.$vux.loading.hide()
          // this.$vux.alert({
          //   message: '获取数据出错(auth/infoauth)'
          // })
        })
      },
      submit(){
        var that = this
        switch (that.list.loan_reason) {
            case '装修':
                  that.loan_reason = '1'
              break;
            case '婚庆':
                  that.loan_reason = '2'
              break;
            case '旅游':
                  that.loan_reason = '3'
              break;
            case '租房':
                  that.loan_reason = '4'
              break;
            case '汽车周边':
                  that.loan_reason = '5'
              break;
            case '电子数码产品':
                  that.loan_reason = '6'
              break;
            case '医疗':
                  that.loan_reason = '7'
              break;
            case '其他':
                  that.loan_reason = '8'
              break;
            case '家居家具':
                  that.loan_reason = '9'
              break;
            case '家用电器':
                  that.loan_reason = '10'
              break;
          }
          switch (that.list.work_type) {
            case '学生':
                  that.work_type = '1'
              break;
            case '上班族':
                  that.work_type = '2'
              break;
            case '企业主':
                  that.work_type = '3'
              break;
            case '自由职业':
                  that.work_type = '4'
              break;
          }
           switch (that.list.degree) {
            case '高中以下':
                  that.degree = '1'
              break;
            case '高中/中专':
                  that.degree = '2'
              break;
            case '大专':
                  that.degree = '3'
              break;
            case '本科':
                  that.degree = '4'
              break;
            case '研究生':
                  that.degree = '5'
              break;
            case '博士':
                  that.degree = '6'
              break;
        }
        switch (that.list.marital) {
            case '未婚':
                  that.marital = '1'
              break;
            case '已婚':
                  that.marital = '2'
              break;
            case '离异':
                  that.marital = '3'
              break;
            case '丧偶':
                  that.marital = '4'
              break;
            case '再婚':
                  that.marital = '5'
              break;
            case '复婚':
                  that.marital = '6'
              break;
          }
        that.$http({
            methods: 'post',
            url: 'auth/infoauth',
            data:{
              real_name: that.list.real_name,
              id_card: that.list.id_card,
              degree: that.degree,
              marital: that.marital,
              province: that.province,
              city: that.city,
              country: that.country,
              address: that.list.address,
              work_type: that.work_type,
              company: that.list.company,
              company_mobile: that.list.company_mobile_areacode + '-' +
                that.list.company_mobile_number,
              company_province: that.company_province,
              company_city: that.company_city,
              company_country: that.company_country,
              company_address: that.list.company_address,
              loan_reason: that.loan_reason,
            }
        }).then((res)=>{
          console.log(res.data)
          if (res.data.status === 0) {
            this.$vux.toast.text(
               res.data.msg
              );
              that.baseInfo = 3
              setTimeout(()=>{
                that.$router.go(-1)
              },1000)
          }else{
            this.$vux.toast.text(
                res.data.msg
              );
          }
        })
        that.showWork = false
        that.showReason = false
        that.showEducation = false
        that.showMarital = false
        that.showAddress1 = false
        that.showAddress2 = false
        that.isChange1 = false
        that.isChange2 = false
        that.isName = false
        that.isCard = false
        that.isCompany = false
        that.isMobile = false
        that.isAddress = false
        that.isCaddress = false

      }
    }
  }
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: 100%;
  padding-top: Px(40);
  background: #fff;
  overflow: hidden;
}
.header{
    display: flex;
    height: Px(90);
    align-items: center;
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
.tips{
  width: 100%;
  padding: Px(10);
  text-align: center;
  background: #feffe7;
  color: #e87070;
  font-size: Px(24);
}
.content{
  // margin-left: Px(20);
  margin-bottom: Px(100);
  .again{
    font-size: Px(24);
    color: #ccc;
    .tip{
      margin-left: Px(20);
      padding: Px(10) 0;
    }
    .back{
      width: 100%;
      height: Px(40);
      padding-left: Px(20);
      background: #eee;
    }
  }
  .information{
    display: flex;
    align-items: center;
    height: Px(85);
    line-height: Px(85);
    margin-left: Px(20);
    border-bottom: 1px #eee solid;
    i{
      // margin-top: Px(34);
      margin-right: Px(20);
      width: Px(12);
      height: Px(21);
      background: url(./img/row2.png) no-repeat;
      background-size: 100% 100%;
    }

    .title{
       flex: 1;
       width: Px(250);
       color: #333333;
      //  margin-right: 42%;
       font-size: Px(30);
     }
    .text{
      flex: 3;
      color: #666;
      text-align: right;
      margin-right: Px(20);
      font-size: Px(24);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      input{
        width: Px(350);
        height: Px(70);
        border: 1px solid #eee;
        outline: 0;
        -webkit-appearance: none;
        padding-left: Px(15);
        font-size: Px(24);
        user-select: auto;
        -webkit-user-select: auto;
      }
      .text-areacode{
        width: Px(150);
        border-right: none;
      }
      .text-phone{
        width: Px(200 - 15);
        border-left: none;
      }
    }
  }
}
.button{
  position: fixed;
  width: 100%;
  height: Px(100);
  bottom: 0;
  @include main-back;
  color: #fff;
  text-align: center;
  line-height: Px(100);
  font-size: Px(30);
  border-radius: Px(40);
}
</style>
