<template>
  <div class="set">
    <div class="header" :style="{'padding-top':$store.state.appTop }">我的</div>
    <div class="setfunction">
      <van-cell title="钱包管理" is-link center @click="$router.push({name:'walletmanage'})"/>
      <van-cell title="地址薄" is-link center @click="$router.push({name:'myaddress'})"/>
    </div>

    <!-- <van-cell title="分享好友" is-link center @click="$router.push({name:'sharefriend'})"/> -->
    <!-- <van-cell title="tab" is-link center @click="$router.push({name:'myDAPP'})"/> -->
    <van-cell title="客服售后" is-link center @click="$router.push({name:'consultation'})"/>
    <van-cell title="反馈&意见" is-link center @click="feedbackClick" />
    <van-cell title="清理缓存" is-link center :value="Cache" @click="clearCache" />
    <van-cell title="关于我们" is-link center @click="lookaboutus" />
    <van-cell title="访问官网" is-link center @click="goWeb()" />
 
    <van-cell title="指纹解锁"  center>
      <van-switch v-model="fingerprint" size="22px" @change="fingerprint_change()" />  
    </van-cell>

    <fingerprint v-if="fingerprint_show" @testState="testState"></fingerprint>

  </div>
</template>
<script>
import pageheader from '@/components/pageheader'
import fingerprint from "@/components/fingerprint";
export default {
  components:{pageheader, fingerprint},
  data() {
    return {
      Cache: "",
      isCoinMakingHelp:true,
      fingerprint_show:false,
      fingerprint:false,
    };
  },
  created() {
    this.fingerprint = this.public_js.GetStorage('fingerprint')?true:false;

  },
  methods: {
    goWeb(){
      let query = {
          dappName:'chainfans',
          dappUrl:'https://m.chainfans.io'
      }
      this.$router.push({ path:'/thirdParty',query:{ data:JSON.stringify(query)} })
    },
    fingerprint_change(){
      if(window.plus){
        // 检查是否支持指纹识别
        if(plus.fingerprint) {
          if(!plus.fingerprint.isSupport()) {
              this.$toast('此设备不支持指纹识别');
              this.fingerprint =false
              return;
          }
          if(!plus.fingerprint.isEnrolledFingerprints()) {
              this.$toast('此设备未录入指纹，请到设置中开启');
              this.fingerprint =false
              return;
          }
          this.fingerprint_show=true
        }
      }else{
        this.$toast('此设备不支持指纹识别');
        this.fingerprint =false
      }
    },
    //验证结果
    testState(state){
      this.fingerprint_show = false
      if(state==1){  //验证成功
        plus.storage.setItem("fingerprint",JSON.stringify(this.fingerprint?1:0))
        // plus.storage.setItem("fingerprint_checked",JSON.stringify(1))
        this.$toast(this.fingerprint?'开启成功':'关闭成功')
      }else{
        this.fingerprint = !this.fingerprint
      }
    },
    changelange(){
      this.$router.push({name:'setlanguage'})
    },
    clearCache() {
      this.Cache = "0k";
      this.$toast("清理完成");
      // plus.storage.clear();
    },
    lookaboutus() {
      this.$router.push({ name: "aboutus" });
    },
    feedbackClick() {
      this.$router.push({ name: "submitfeedback" });
    },
    // submitfeedback(){
    //   this.$router.push({name:'aboutus'})
    // },
    back() {
      this.$router.go(-1);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    changeset() {
      // const token = $cookies.get("token");
      // if (token) {
        this.$router.push({  name: "setaccount"});
      // } else {
      //   this.$router.push({ name: "login" });
      // }
    }
  }
};
</script>
<style lang="scss" scoped>
.set {
  background: #f4f4f4;
  height: 100vh;
}
.header{
  line-height: 46px;
  text-align: center;
  background: #fff;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}
.setbox {
  margin: 65px 0;
}
.setfunction {
  margin-bottom: 15px;
}
.sethelp {
  margin: 25px 0;
}
.custom-title {
  text-align: center;
  width: 100%;
  display: inline-block;
}
.van-cell__value {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>     