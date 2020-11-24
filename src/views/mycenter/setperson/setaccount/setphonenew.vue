<template>
  <div class="login">
    <div v-show="ishide">
      <Pageheader />
      <div class="login-operate">
        <van-cell-group>
          <van-field v-model="newPhone" label-align="left" placeholder="请输入新手机号">
            <div slot="label" size="small" type="primary" @click="areaClick">
              <span class="num">{{ areanum?'+':null}}{{ areanum?areanum:"+86"}}</span>
              <van-icon name="arrow-down" size="18px" class="icon" />
            </div>
          </van-field>
          <van-field :maxlength="6" v-model="newcode" center label-align="right" placeholder="请输入新的短信验证码">
            <van-button
              class="btn"
              :disabled="isdisabled"
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
      <van-button class="login-btn" @click="setTel">确认更改</van-button>
    </div>
    <phonearea v-show="isarea" @reviseValClick="reviseValHanle" />
  </div>
</template>
<script>
import { getCode, setPhoneNum } from "../../../../api/authorityValidation/user"
import Pageheader from "../../../../components/pageheader";
import phonearea from "@/components/phonearea"
import qs from "querystring";
export default {
  data() {
    return {
      newPhone: "",
      newcode: "",
      timer: null,
      news: "获取验证码",
      isshow: false,
      showHeight: "",
      hidshow: true,
      areanum: "",
      ishide: true,
      isarea: false,
      isdisabled: false,
      docmHeight: document.documentElement.clientHeight
    };
  },
  components: {
    Pageheader,
    phonearea
  },
  created() {
    // this.areanum = localStorage.getItem("newnum");
  },
  methods: {
    reviseValHanle(val) {
      this.areanum =val.replace("+","");
      this.isarea = false;
      this.ishide = true;
    },
    areaClick() {
      this.isarea = true;
      this.ishide = false;
    },
    setTel() {
      if (!this.newPhone && !(/^1[3456789]\d{9}$/.test(this.newPhone))) {
        this.$toast("手机号不能为空且必须正确");
        return;
      }
      if (!this.newPhone) {
        this.$toast("验证码不能为空");
        return;
      }
      let oldcode;
      if(window.plus){      
        oldcode = plus.storage.getItem("code");
      }else{
        oldcode = localStorage.getItem("code");
      } 
      const params = {
        PhoneAreaId:this.areanum?this.areanum:"86",
        Phone: this.newPhone,
        OldVerificationCode: oldcode,
        VerificationCode: this.newcode
      };
      setPhoneNum(params).then(res => {
        if (res.code === 0) {
          // this.$router.push({ name: "login" });
          this.$router.push({ name: "setaccount" });
          this.$toast("更换手机号成功");
        } else {
          this.$toast(`${res.messages}`);
        }
      });
    },
    getCodeClick() {
      const TIME_COUNT = 60;
      if (!this.newPhone) {
        this.$toast("手机号不能为空");
        return;
      } else {
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
      }
      let params = {
        phoneAreaId:this.areanum?this.areanum:"86",
        phone: this.newPhone,
        type: 3
      };
      getCode(params).then(res => {
        if (res.code === 0) {
          this.$toast("验证码已成功发送");
          // console.log(res, "这是响应的结果");
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
</style>