<template>
  <div class="set-password">
    <Pageheader />
    <div class="login-operate">
      <van-cell-group>
        <van-field
          v-model="oldpassword"
          label-align="right"
          type="password"
          :maxlength="20"
          placeholder="请输入旧密码(由大小写英文和数字组合)"
          class="input"
        />
        <van-field
          v-model="newpassword"
          label-align="right"
          type="password"
          :maxlength="20"
          placeholder="请输入新密码(由大小写英文和数字组合)"
          class="input"
        />
        <van-field
          v-model="agpassword"
          label-align="right"
          type="password"
          :maxlength="20"
          placeholder="请再次输入新密码"
          class="input"
        />
      </van-cell-group>
    </div>
    <van-button class="next-btn" @click="againSetpsd">确认</van-button>
  </div>
</template>
<script>
import { setPassword } from "../../../../api/authorityValidation/user";
import Pageheader from "../../../../components/pageheader";
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      oldpassword: "",
      newpassword: "",
      agpassword:'',
      showHeight: "",
      hidshow: true,
      docmHeight: document.documentElement.clientHeight
    };
  },
  components: {
    Pageheader
  },
  methods: {
    againSetpsd() {
      if (!this.oldpassword) {
        this.$toast("旧密码不能为空");
        return;
      }
      if (!(/^[0-9a-zA-Z]+$/.test(this.oldpassword))) {
        this.$toast("旧密码格式不正确");
        return;
      }
      if (!this.newpassword) {
        this.$toast("新密码不能为空");
        return;
      }
      if (this.newpassword.length <6 ) {
        this.$toast("新密码不能少于6位");
        return;
      }
      if (!(/^[0-9a-zA-Z]+$/.test(this.newpassword))) {
        this.$toast("新密码格式不正确");
        return;
      }
      if (this.newpassword != this.agpassword) {
        this.$toast("新密码两次输入不一致");
        return;
      }

      let params = {
        OldPassword: CryptoJS.MD5('ChainFans'+CryptoJS.MD5(this.oldpassword).toString().toLocaleUpperCase()+'2019').toString().toLocaleUpperCase(),
        Password: CryptoJS.MD5('ChainFans'+CryptoJS.MD5(this.newpassword).toString().toLocaleUpperCase()+'2019').toString().toLocaleUpperCase()
      };
      setPassword(params).then(res => {
        if (res.code === 0) {
          this.$router.back();
        //  this.$router.push({ name: "setaccount" });
          this.$toast("修改密码成功");
        } else {
          this.$toast(`${res.messages}`);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.pageheader {
  border-bottom: 1px solid #ebedf0;
}
.input{
  padding: 15px 15px;
 
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