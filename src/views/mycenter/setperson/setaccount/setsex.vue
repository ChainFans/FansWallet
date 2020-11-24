<template>
  <div class="login">
    <Pageheader />
    <div class="login-operate">
      <van-radio-group v-model="radio">
        <van-radio name="1">男</van-radio>
        <van-radio name="2">女</van-radio>
      </van-radio-group>
    </div>
    <van-button class="login-btn sure" @click="sure">确认修改</van-button>
  </div>
</template>
<script>
import { setSex } from "@/api/authorityValidation/user"
import Pageheader from "@/components/pageheader";
// import qs from "querystring";
export default {
  data() {
    return {
      radio: "1"
    };
  },
  components: {
    Pageheader
  },
  methods: {
    sure() {
      const params = {
        Sex: this.radio
      };
      setSex(params).then(res => {
        if (res.code === 0) {
          if(window.plus){
            let data = JSON.parse(plus.storage.getItem("userData"))
            data.sex = this.radio
            plus.storage.setItem("userData", JSON.stringify(data));
          }else{       
            let data = JSON.parse(localStorage.getItem("userData"))
            data.sex = this.radio
            localStorage.setItem("userData", JSON.stringify(data));
          }

          this.$toast("设置成功");
          this.$router.back();
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
.van-radio-group{
  margin-top: 20px;
  display: flex;
}
.van-radio {
  display: inline-block;
  width: 60px;
  margin-left: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.sure{
  background: #2364bc;
}
/deep/.van-radio__icon {
  display: inline-block;
}
/deep/.van-icon {
  display: inline-block;
}
</style>