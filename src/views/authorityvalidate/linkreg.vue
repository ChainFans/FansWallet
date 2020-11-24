<template>
  <div class="share-login" ref="bgHeight">
    <div class="logoBg2">

    
      <div class="login-box">
        <van-field
          v-model="phone"
          label-align="left"
          clearable
          border
          placeholder="请输入手机号"
          :maxlength="11"
          class="input"
        > 
        </van-field>

        <van-field v-model="code" center label-align="right" class="input" clearable placeholder="请输入验证码">
          <van-button
            :disabled="isdisabled"
            class="btn"
            slot="button"
            size="small"
            type="primary"
            @click="getCodeClick"
          >
            {{news}}
            <span v-show="isshow" class="maio">s</span>
          </van-button>
        </van-field>

        <van-field
          v-model="password"
          label-align="right"
          clearable
          type="password"
          placeholder="请输入密码"
          :maxlength="20"
          class="input"
        />
        <van-field
          v-model="WalletPassword"
          label-align="right"
          clearable
          type="password"
          placeholder="请输入钱包密码"
          :maxlength="20"
          class="input"
        />

        <van-button class="login-btn" @click="registerSubmit">注册</van-button> 
      </div>
    </div>
    
  </div>
</template>
<script>
import { register, getCode } from "@/api/authorityValidation/user.js";
import qs from "querystring";
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      name: "",
      phone: "",
      code: "",
      password: "",
      test_password:'',
      timer: null,
      news: "获取验证码",
      isshow: false,
      Invitationcode: "",
      showHeight: "",
      hidshow: true,
      isdisabled: false,
      docmHeight: document.documentElement.clientHeight,
      WalletPassword:''
    };
  },
  created() {
    this.Invitationcode = this.$route.query.inviteCode;
    // console.log(this.$route.query.inviteCode);
  },
  mounted() {
    this.$refs.bgHeight.style.height = this.docmHeight<667?'667px':this.docmHeight+'px'
    // console.log(this.$refs.bgHeight.style.height) 
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  watch: {
    showHeight() {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    }
  },
  methods: {
    clk() {
      this.$router.push({ name: "login" });
    },
    getCodeClick() {
      const TIME_COUNT = 60;
      if (!this.phone) {
        this.$toast("手机号不能为空");
        return;
      }else if(!(/^1\d{10}$/.test(this.phone))){
        this.$toast("请输入正确的手机号");
        return
      } else if (!this.timer) {
          this.news = TIME_COUNT;
          this.isshow = true;
          this.isdisabled = true; 
          this.timer = setInterval(() => {
            if (this.news > 0 && this.news <= TIME_COUNT) {
              this.news--;
              if (this.news == 0) {
                this.news = "获取验证码";
                this.isshow = false;
                this.isdisabled = false;
              }
            } else {
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        
      }
      const params = {
        phoneAreaId: "86",
        phone: this.phone,
        type: 1
      };
      getCode(params).then(res => {
        if (res.code === 0) {
          console.log(res, "这是响应的结果");
        } else {
          this.$toast(`${res.messages}`);
        }
      });
    },
    registerSubmit() {
      if (!this.phone || !/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$toast("请填写正确的电话号");
        return;
      }
      if (!this.code) {
        this.$toast("验证码不能为空");
        return;
      }
      
      if (
        !this.password ||
        !(this.password.length >= 6)     
      ) {
        this.$toast("登录密码必须大于6位");
        return;
      }
      if (
        !/^[0-9a-zA-Z]+$/.test(this.password)
      ) {
        this.$toast("登录密码必须是数字或字母组合");
        return;
      }
      if (
        !this.WalletPassword ||
        !(this.WalletPassword.length >= 8)    
      ) {
        this.$toast("钱包密码必须大于7位");
        return;
      }
      if (
        !/^[0-9a-zA-Z]+$/.test(this.WalletPassword)
      ) {
        this.$toast("钱包密码必须是数字和字母组合");
        return;
      }
      // if(this.test_password != this.password){
      //   this.$toast("两次密码输入不正确");
      //   return
      // }
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let name ='';
      for (var i = 0; i < 10; i++) {
        name += possible.charAt(
          Math.floor(Math.random() * possible.length)
        );
      }
      const params = {
        phoneAreaId: "86",
        nickname: "cf_" + name,
        phone: this.phone,
        password: CryptoJS.MD5('ChainFans'+CryptoJS.MD5(this.password).toString().toLocaleUpperCase()+'2019').toString().toLocaleUpperCase(),
        WalletPassword:this.WalletPassword,
        verifyCode: this.code,
        type: 1,
        InvCode: this.Invitationcode || ""
      };
      register(params).then(res => {
        if (res.code === 0) {
          this.$router.push({ name: "download" });
          this.$toast("注册成功");
        } else {
          this.$toast(`${res.messages}`);
        }
      }).catch(err =>{
        this.$toast('网络异常');
      })
    }
  }
};
</script>
<style lang="scss" scoped>
// .login-title {
//   font-size: 24px;
//   margin-top: 40px;
//   margin-left: 25px;
// }
/deep/.van-field__control{
  line-height: 24px;
}
.share-login{
    // height: 1000px;
    background: linear-gradient(to bottom, #ffb199, #ff0844);
  .logoBg2{
    height: 667px;
    z-index: 99999;
    background: url('../../assets/images/my_center/shareLogin.png') no-repeat;
    background-size: 100% 100%;
  }
  .login-box{
    position: absolute;
    top: 340px;
    left: 50%;
    transform: translate(-50%);
    width: 280px;
    height: 280px;   
    // margin: 340px auto;
    .input{
      border-radius: 6px;
      margin-bottom: 14px;
      height: 44px;
    }
  }
  .btn{
    background: #ffd01e;
    border: 1px solid #ffd01e;
  }
  .login-btn{
    width: 100%;
    background: #ffd01e;
    border: 1px solid rgb(209, 172, 5);
    color: #fff;
    font-size: 20px;
    letter-spacing:2px;
    border-radius: 6px;
  }
}
</style>