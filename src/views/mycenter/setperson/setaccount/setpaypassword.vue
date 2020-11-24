<template>
  <div class="pay-password">
    <div class="header">
      <van-icon name="arrow-left" class="back" @click="back()" />
      <span>设置支付密码</span>
      
    </div>
    <div class="login-operate">

      <div class="title">
        <p>当前绑定的手机号</p>
        <p> +{{userInfo.phoneAreaId}}  {{userInfo.phone}}</p>         
      </div>  
      <van-cell-group>
        <van-field v-model="code" :maxlength="6" center label-align="right" clearable placeholder="请输入短信验证码">
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
          :maxlength="30"
          placeholder="请设置支付密码(数字和字母组成且不少于7位)"
          size="large"
        />
      </van-cell-group>
    </div>
    <van-button class="next-btn" @click="setpaypsd">确认</van-button>
  </div>
</template>
<script>
import { getCode, setPaypassword } from "@/api/authorityValidation/user"
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      phone: "",
      password: "",
      areanum: "",
      timer: null,
      code: "",
      news: "获取验证码",
      isshow: false,
      isdisabled: false,
      ishide: true,
      userInfo:{}
    };
  },
  created(){
    if(window.plus){
      this.userInfo = JSON.parse(plus.storage.getItem("userData"))
    }else{       
      this.userInfo = JSON.parse(localStorage.getItem("userData"))
    }
  },  
  methods: {
    back(){
      if(this.$route.name=='custom_wallet'){
        this.$emit('setPassword',false)
      }else{
        this.$router.back()
      }
    },
    getCodeClick(){   
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.news = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.news > 0 && this.news <= TIME_COUNT) {
            this.news--;
            this.isshow = true;
            this.isdisabled = true;
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
        // phoneAreaId: "86",
        // phone: this.phone,
        type: 4
      };
      getCode(params).then(res => {
        if (res.code === 0) {
          this.$toast("验证码已成功发送");
        } else {
          this.$toast(`${res.messages}`);
        }
      });
    },
    setpaypsd() {
      if (!this.code) {
        this.$toast("验证码不能为空");
        return;
      }
      if (!this.password) {
        this.$toast("密码不能为空");
        return;
      }
      if (this.password.length < 8) {
        this.$toast("密码不能小于8位");
        return;
      }
      if (!(/^[0-9a-zA-Z]+$/.test(this.password))) {
        this.$toast("密码格式不正确");
        return;
      }
      const params = {
        PayPassword: CryptoJS.MD5(this.password)
          .toString()
          .toLocaleUpperCase(),
        VerifyCode: this.code
      };
      setPaypassword(params).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.$toast("设置支付密码成功");
         let userData;
          if(window.plus){      
            userData = JSON.parse(plus.storage.getItem('userData')) 
          }else{
            userData = JSON.parse(localStorage.getItem('userData')) 
          }   
          userData.isSetPayPassword = 1
          
          if(window.plus){      
            plus.storage.setItem('userData',JSON.stringify(userData))
          }else{
            localStorage.setItem('userData',JSON.stringify(userData))
          } 
          this.back()
        } else {
          this.$toast(`${res.messages}`);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.pay-password{
  .header{
      height: 46px;
      border-bottom: 1px #eee solid;  
      background: #fff;  
      display: flex;
      align-items: center;
      .back{
         
          font-size: 22px;
          margin-left: 10px;
          width: 30px;
      }
      span{
        font-size: 16px;
      }
  }
  .title{
    height: 50px;
    padding: 15px 0;
    text-align: center;
    font-size: 16px;
    color: #888;
    p:nth-child(1){
      font-size: 13px;
    }
    p:nth-child(2){
      color: #333;
      margin-top: 5px;
    }
  }
  .next-btn{
    width: 94%;
    margin: 20px 50%;
    background: #2364bc;
    border-radius: 3px;
    color: #fff;
    transform: translate(-50%)
  }
  .btn{
  background: #2364bc;
  border: 0;
  height: 34px;
  border-radius: 6px;
  }
}

</style>