<template>
  <div class="setmake">
    <Pageheader />
    <van-cell title="修改昵称" is-link center @click="changeName" />
    <van-cell v-if="!userSex" title="设置性别" is-link center @click="setSex" />
    <van-cell v-else title="设置性别"  :value="userSex==1?'男':'女'" />
    <!-- <div class="setfunction"> -->
      <van-cell title="手机号" is-link center @click="changePhone" />
    <!-- </div> -->
    <div class="sethelp"> 
      <van-cell title="修改密码" is-link center @click="changepsd" />
      <van-cell title="设置支付密码" is-link center @click="changepaypsd" />
    </div>
    <div class="setback">
      <van-cell title="指纹解锁"  center> 
        <van-switch v-model="fingerprint" size="22px" @change="fingerprint_change()" />  
      </van-cell>
      <van-cell title="手势解锁"  center>
        <van-switch v-model="gesture" size="22px" @change="$router.push({path:'/gesture_login',query:{optionType:isGesture==0?1:2}})" />
      </van-cell>
      <van-cell v-show="isGesture==1" title="修改手势解锁" is-link center  @click="modify_gesture()" />
    </div>

     <fingerprint v-if="fingerprint_show" @testState="testState"></fingerprint>

  </div>
</template>
<script>
import Pageheader from "@/components/pageheader";
import fingerprint from "@/components/fingerprint";
export default {
  components: {
    Pageheader,
    fingerprint
  },
  data(){
    return {
      userSex:'',
      sexData:'',
      isGesture:0,
      isFingerprint:0,
      gesture:false,
      fingerprint_show:false,
      fingerprint:false,
    }
  },
  created(){
    this.changeSex()
    this.isOpenUnlock()
    if(window.plus && !plus.fingerprint.isEnrolledFingerprints()) {
        // this.$toast('此设备未录入指纹，请到设置中开启');
        this.fingerprint =false
        plus.storage.setItem("fingerprint",JSON.stringify(0))
    }

  },
  watch:{
    // fingerprint_show(state){
    //   this.$store.commit('isFingerprint',true)
    //   console.log(  this.$store.state.isFingerprint)
    // }
  },
  methods: {
    fingerprint_change(){
      if(window.plus){
        // 检查是否支持指纹识别
        if(plus.fingerprint) {
            if(!plus.fingerprint.isSupport()) {
                
                this.$toast('此设备不支持指纹识别');
                return;
            }
            // if(!plus.fingerprint.isKeyguardSecure()) {
            //     this.$toast('此设备未设置密码锁屏，无法使用指纹识别');
            //     return;
            // }
            if(!plus.fingerprint.isEnrolledFingerprints()) {
                this.$toast('此设备未录入指纹，请到设置中开启');
                return;
            }
          this.fingerprint_show=true
        }
      }else{
        this.$toast('此设备不支持指纹识别');
      }
    },
    
    //验证结果
    testState(state){
      this.fingerprint_show = false
      if(state==1){  //验证成功
        plus.storage.setItem("fingerprint",JSON.stringify(this.fingerprint?1:0))
        plus.storage.setItem("fingerprint_checked",JSON.stringify(1))
        this.$toast(this.fingerprint?'开启成功':'关闭成功')
      }else{
        this.fingerprint = !this.fingerprint
      }
    },
    //修改解锁密码
    modify_gesture(){
      if(this.isGesture==1){
        this.$router.push({path:'/gesture_login',query:{optionType:3}})
      }else{
        this.$toast('请开启手势解锁')
      }


    },
    isOpenUnlock(){
      if(window.plus){
        this.isGesture = plus.storage.getItem("gesture")?plus.storage.getItem("gesture"):0;   
        this.isFingerprint = plus.storage.getItem("fingerprint")?plus.storage.getItem("fingerprint") : 0;  
        this.gesture=this.isGesture==1
        this.fingerprint=this.isFingerprint==1
      }else{
        this.isGesture = localStorage.getItem("gesture")?localStorage.getItem("gesture"): 0;
        this.isFingerprint = localStorage.getItem("fingerprint")?localStorage.getItem("fingerprint") : 0;
        this.gesture=this.isGesture==1
        this.fingerprint=this.isFingerprint==1
      }
    },
    changepaypsd() {
      this.$router.push({ name: "setpaypassword" });
    },
    changePhone() {
      this.$router.push({ name: "setphone" });
    },
    changepsd() {
      this.$router.push({ name: "revisepassword" });
    },
    changeName() {
      this.$router.push({ name: "setname" });
    },
    changeSex() {
      this.sexData;
      if(window.plus){
        this.sexData = JSON.parse(plus.storage.getItem("userData"));
      }else{
        this.sexData = JSON.parse(localStorage.getItem("userData"));
      } 
      if (this.sexData.sex!=0) {       
        this.userSex = this.sexData.sex
      }
    },
    setSex(){
      if (this.sexData.sex==0) {
        this.$router.push({ name: "setsex" });
        
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.fingerprint-box{
  height: 200px;
  padding:10px 0;
  text-align: center;
  .fingerprint-img{
    width: 120px;
    height: 120px;
    margin: 20px auto;
    img{
      width: 100%;
      height: 100%;
    }
  }
  p{
    margin-top: 30px;
  }
}
.van-cell__value {
    display: flex;
    -webkit-box-align: center;
    justify-content: flex-end;
}
.setmake {
  background: #f6f6f6;
  height: 100%;
}
.setbox {
  margin: 25px 0;
}
.setfunction {
  margin: 25px 0;
}
.sethelp {
  margin: 25px 0;
}
.custom-title {
  text-align: center;
  width: 100%;
  display: inline-block;
}
</style>    