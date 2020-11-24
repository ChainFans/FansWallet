<template>
  <div class="set-phone">
    <Pageheader />
    <div class="login-operate">
      <div class="title">
        <p>当前绑定的手机号</p>
        <p> +{{userInfo.phoneAreaId}}  {{userInfo.phone}}</p>
         
      </div>
      <van-cell-group>
        <van-field :maxlength="6" v-model="oldcode" center label-align="right" placeholder="请输入短信验证码" class="input">
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
      </van-cell-group>
    </div>
    <van-button  class="next-btn" @click="setTel">下一步</van-button>
  </div>
</template>
<script>
import { getCode, getValidate } from "../../../../api/authorityValidation/user"
import Pageheader from "../../../../components/pageheader";
import qs from "querystring";
export default {
  data() {
    return {
      oldcode: "",
      timer: null,
      news: "获取验证码",
      isshow: false,
      showHeight: "",
      isdisabled: false,
      docmHeight: document.documentElement.clientHeight,
      userInfo:{}
    };
  },
  components: {
    Pageheader
  },
  created(){
    if(window.plus){
      this.userInfo = JSON.parse(plus.storage.getItem("userData"))
    }else{       
      this.userInfo = JSON.parse(localStorage.getItem("userData"))
    }
  },
  methods: {
    setTel() {
      if (!this.oldcode) {
        this.$toast("验证码不能为空");
        return;
      }
      const params = {
        type: 2,
        VerifyCode: this.oldcode
      };
      getValidate(params).then(res => {
        if (res.code === 0) {
          this.$toast("验证成功");
          this.$router.push({ name: "setphonenew" });
          if(window.plus){      
            plus.storage.setItem("code", this.oldcode);
          }else{
            localStorage.setItem("code", this.oldcode);
          } 
        } else {
          this.$toast(`${res.messages}`);
        }
      });
    },
    getCodeClick() {
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
        // PhoneAreaId: "86",
        // Phone: this.oldPhone,
        type: 2
      };
      getCode(params).then(res => {
        if (res.code === 0) {
          this.$toast("验证码已成功发送");
        } else {
          this.$toast(`${res.messages}`);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.pageheader{
  border-bottom:1px solid #ebedf0;
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
.input{
  height: 50px;
}
.btn{
  background: #2364bc;
  border: 0;
  height: 34px;
  border-radius: 6px;
}
.next-btn{
  width: 94%;
  margin: 20px 50%;
  background: #2364bc;
  border-radius: 3px;
  color: #fff;
  transform: translate(-50%)
}
</style>