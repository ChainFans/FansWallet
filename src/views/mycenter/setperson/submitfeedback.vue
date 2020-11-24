<template>
  <div class="submitfeedback">
    <Pageheader />
    <div class="submitfeedback-ipt">
      <textarea
        class="sf-content"
        maxlength="150"
        @input="valChange"
        placeholder="反馈中心，意见建议"
        cols="20"
        rows="10"
      />
      <p class="submitfeedback-num">
        <span>{{zero}}</span>
        <span class="hundred">/150</span>
      </p>
    </div>
    <van-radio-group v-model="radio">
      <van-radio name="优化建议">优化建议</van-radio>
      <van-radio name="错误异常">错误异常</van-radio>
    </van-radio-group>
    <van-button type="info" class="btn" @click="chargingrecord">提交</van-button>
  </div>
</template>
<script>
import Pageheader from "@/components/pageheader";
import { Submitfeedback } from "@/api/mycenter/aboutus.js";
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      radio: "优化建议",
      zero: 0,
      iptValue: "",
      subval:null,
    };
  },
  components: {
    Pageheader
  },
  methods: {
    valChange(e) {
      this.zero = Number(e.target.value.length);
      this.iptValue = e.target.value;
    },
    chargingrecord() {
      const parmas = {
        Content: this.iptValue,
        Type: this.radio
      };
      Submitfeedback(parmas)
        .then(res => {
          if (res.code === 0) {
            this.$dialog
              .alert({
                message: "已经提交成功，感谢你的反馈~~"
              })
              .then(() => {
                this.iptValue = "";
                this.$router.go(-1)
            });
          } else {
            this.$toast(`${res.messages}`);
          }
        })
        .catch(() => {
          //   this.$toast('')
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.van-radio {
  display: inline-block;
  width: 100px;
  margin-left: 20px;
  margin-top: 10px;
}
/deep/.van-radio__icon {
  display: inline-block;
}
/deep/.van-icon {
  display: inline-block;
}
.sf-tip {
  font-size: 14px;
  color: #ccc;
  text-align: center;
  margin-top: 10px;
  height: 30px;
}
.submitfeedback {
  background: #f5f5f9;
  height: 100vh;
}
.submitfeedback-ipt {
  width: 90%;
  margin-top: 25px;
  margin-left: 5%;
  background: #fff;
  border-radius: 10px;
  .sf-content {
    height: 160px;
    width: 100%;
    border-radius: 6px;
    border: none;
    font-size: 16px;
    padding-left: 10px;
    padding-top: 10px;
    box-sizing: border-box;
  }
  .submitfeedback-num {
    text-align: right;
    height: 30px;
    padding-right: 10px;
    font-size: 16px;
    .hundred {
      color: #bbbbbb;
    }
  }
}
.btn {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
}
</style>     