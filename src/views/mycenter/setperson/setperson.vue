<template>
  <div class="set">
    <pageheader :goBack="'mycenter'"></pageheader>
    <van-cell title="切换语言" is-link center @click="changelange"/>
    <van-cell title="账号与安全" is-link center @click="changeset" />
    <div class="setfunction">
      <van-cell title="发币引导"  center>
        <van-switch v-model="isCoinMakingHelp" size="22px" @change="coinMakingHelp()" />  
      </van-cell>
      <van-cell title="客服售后" is-link center @click="$router.push({name:'consultation'})"/>
      <van-cell title="反馈&意见" is-link center @click="feedbackClick" />
      <van-cell title="清理缓存" is-link center :value="Cache" @click="clearCache" />
      <van-cell title="关于我们" is-link center @click="lookaboutus" />
    </div>
    <div class="sethelp">
    </div>
    <div class="setback">
      <van-cell center @click="withdraw">
        <template slot="title">
          <span class="custom-title">退出登录</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script>
import pageheader from '@/components/pageheader'
export default {
  components:{pageheader},
  data() {
    return {
      val: "",
      Cache: "",
      isCoinMakingHelp:true
    };
  },
  created() {
      this.isCoinMakingHelp=this.$store.state.isGuide==1?true:false
      if(window.plus){
        this.val = plus.storage.getItem("version");
      }else{
        this.val = localStorage.getItem("version");
      } 
  },
  methods: {
    //引导是否开启
    coinMakingHelp(){  
      if(this.isCoinMakingHelp){
        this.$toast('发币引导已开启')
      }else{
        this.$toast('发币引导已关闭')
      }     
      if(window.plus){
        plus.storage.setItem("isGuide",this.isCoinMakingHelp?1:0);
      }else{
        localStorage.setItem("isGuide",this.isCoinMakingHelp?1:0);
      } 
      this.$store.commit('isGuide',this.isCoinMakingHelp?1:0)
    },
    changelange(){
      this.$router.push({name:'setlanguage'})
    },
    clearCache() {
      this.Cache = "0k";
      this.$toast("清理完成");
    },
    withdraw() {
      this.$dialog
        .confirm({
          // title: "标题",
          message: "是否确认退出登录？"
        })
        .then(() => {
          if(window.plus){
            plus.storage.setItem("token",'');
            localStorage.clear(); 
          }else{
            this.$cookies.remove("token");
            this.$cookies.remove("refresh_token");
            localStorage.clear()
          }

          this.$router.push({ name: "login" });
          
        })
        .catch(() => {
          // on cancel
        });
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
.setbox {
  margin: 65px 0;
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
.van-cell__value {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>     