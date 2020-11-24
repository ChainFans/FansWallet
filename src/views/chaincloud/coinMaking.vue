<template>
  <div class="container-quotation">
    <div class="header">
      <van-icon name="arrow-left" class="back" @click="$router.back()" />
    </div>
    <div class="content">
      <van-cell title="Token简称" :value="formData.tokenName" size="large" />
      <van-cell title="发行总量" :value="formData.issueCount" size="large" />

      <p class="price" style="color: #1989fa" @click="discountCode_show = true">
        优惠码
      </p>
      <p class="price">
        价格 <b style="color: red">{{ total_price }} ETH</b>
      </p>
      <van-button type="danger" size="large" class="pay_btn" @click="fast_pay"
        >立即支付</van-button
      >

      <!-- 优惠码弹框 -->
      <van-dialog
        v-model="discountCode_show"
        title="优惠码"
        show-cancel-button
        @confirm="$toast('优惠码无效')"
      >
        <div class="discountCode-box">
          <van-field
            v-model="discount_code"
            placeholder="请输入优惠码"
            label=""
            label-width="10"
            maxlength="20"
            class="password-btn"
          />
        </div>
      </van-dialog>
      <!-- 密码框 -->
      <van-dialog
        v-model="showKeyboard"
        confirmButtonText="确认支付"
        show-cancel-button
        @confirm="confirm_pay"
        @cancel="
          formData.orderId = orderId;
          $router.push({
            name: 'cancelPay',
            params: { cancelOrder: formData },
          });
        "
      >
        <password-box
          :totalPrice="total_price"
          @payPassword="payPassword"
        ></password-box>
      </van-dialog>
    </div>
  </div>
</template>
<script>
import passwordBox from "@/components/passwordBox";
import { create_order, order_pay } from "@/api/chaincloud/coin_making";
import CryptoJS from "crypto-js";
export default {
  components: {
    passwordBox,
  },
  data() {
    return {
      formData: {},
      check_password: "",
      discount_code: "",
      showKeyboard: false,
      orderId: "",
      discountCode_show: false,
      total_price: 1,
    };
  },
  created() {
    this.formData = {
      tokenName: this.$route.query.tokenName,
      issueCount: this.$route.query.issueCount,
    };
    if (window.plus) {
      var funcList = JSON.parse(plus.storage.getItem("funcList"));
    } else {
      var funcList = JSON.parse(localStorage.getItem("funcList"));
    }
    this.total_price = funcList[0].funcPrice;
  },
  methods: {
    payPassword(val) {
      this.check_password = val;
    },
    confirm_pay() {
      if (!this.check_password) {
        return;
      }
      const password = CryptoJS.MD5(this.check_password)
        .toString()
        .toLocaleUpperCase();
      let params = {
        orderId: this.orderId,
        payPassword: password,
      };
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "订单生成中",
      });
      order_pay(params)
        .then((r) => {
          this.$toast.clear();
          if (r.data.code === 0) {
            // this.$toast.success('订单支付成功')
            this.$router.push({
              name: "successPay",
              params: { options: ["基本功能"] },
            });
          } else {
            this.$toast(r.data.messages);
          }
        })
        .catch((err) => {
          this.$toast("网络异常");
        });
    },
    fast_pay() {
      let isSetPayPassword;
      if (window.plus) {
        isSetPayPassword = JSON.parse(plus.storage.getItem("userData"))
          .isSetPayPassword;
      } else {
        isSetPayPassword = JSON.parse(localStorage.getItem("userData"))
          .isSetPayPassword;
      }

      if (isSetPayPassword == 0) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "您未设置支付密码，是否去设置？",
          })
          .then(() => {
            this.$router.push({ name: "setpaypassword" });
          })
          .catch(() => {});
        return;
      }
      this.showKeyboard = true;
      this.check_password = "";

      let params = {
        TokenName: this.formData.tokenName,
        TokenSymbol: this.formData.tokenName,
        TokenDecimals: 18,
        TokenTotalSupply: this.formData.issueCount,
        Remark: "",
        DiscountCode: "",
        TotalAmount: this.total_price,
        DiscountAmount: 0,
        ActualAmount: this.total_price,
        TokenType: "ETH",
        Protocol: "ERC20",
        FuncIdList: [1],
      };
      create_order(params)
        .then((res) => {
          if (res.code === 0) {
            this.orderId = res.data.orderId;
          } else {
            this.$toast(res.messages);
          }
        })
        .catch((err) => {
          this.$toast("网络异常");
        });
    },
  },
};
</script>
<style scoped lang="scss">
/deep/.van-dialog__confirm,
.van-dialog__confirm:active {
  background: #2364bc;
  color: #fff;
}
/deep/.van-dialog__footer--buttons {
  border-top: 1px solid #2364bc;
}
.container-quotation {
  background: #fff;
  .header {
    height: 50px;
    border-bottom: 1px #eee solid;
    background: #fff;
    .back {
      line-height: 50px;
      font-size: 22px;
      margin-left: 10px;
      width: 30px;
    }
  }
  .discountCode-box {
    height: 80px;
    margin-top: 30px;
  }
  .payInfo-box {
    height: 70px;
    color: #000;
    .box {
      margin-left: 110px;
      margin-top: 20px;
      p {
        margin-top: 5px;
      }
    }
  }
  .remark-info {
    height: 50px;
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-top: 5px;
    padding: 0 30px;
  }
  .password-btn {
    border: 1px #2364bc solid;
    border-radius: 8px;
    margin: 0 auto;
    width: 240px;
    font-size: 16px;
  }
  .content {
    .pay_btn {
      position: absolute;
      bottom: 0;
      background: #2364bc;
      border: 0;
    }
    .price {
      margin-top: 6px;
      text-align: right;
      font-size: 16px;
      padding: 0 20px;
    }
  }
}
</style>