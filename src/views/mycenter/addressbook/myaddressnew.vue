<template>
  <div class="myaddress">
    <Pageheader />
    <div class="myaddress-warp">
      <div v-show="item.id==value" class="myaddress-img" v-for="(item) in tabs" :key="item.id">
        <img :src="item.id==value?item.url:null" alt />
      </div>
      <div>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value" :options="option" />
        </van-dropdown-menu>
        <van-cell-group>
          <van-field class="addressInput" v-model="address" clearable placeholder="请输入有效的地址" />
          <van-field v-model="name" clearable placeholder="名称" />
          <van-field v-model="desc" clearable placeholder="描述(选填)" />
        </van-cell-group>
      </div>
    </div>
    <van-button type="danger" class="addAddress" @click="ADDaddress">添加地址</van-button>
  </div>
</template>
<script>
import { addWalletAddress } from "../../../api/mycenter/addressbook.js"
import Pageheader from "../../../components/pageheader";
export default {
  data() {
    return {
      address: "",
      name: "",
      desc: "",
      num: 0,
      value: "ETH",
      option: [
        { text: "ETH", value: "ETH" },
        { text: "BTC", value: "BTC" },
        // { text: "TRX", value: "TRX" },
      ],
      tabs: [
        {
          id:"ETH",
          url: require("../../../assets/images/token_logo/ETH.png")
        },
        {
          id:"BTC",
          url: require("../../../assets/images/token_logo/BTC.png")
        },
        {
          id:"EOS",
          url: require("../../../assets/images/token_logo/EOS.png")
        },
        {
          id: "TRX",
          url: require("../../../assets/images/token_logo/TRX.png")
        },
        // {
        //   id:"USDT",
        //   url: require("../../../assets/images/token_logo/NAS.png")
        // }
      ]
    };
  },
  mounted() {},
  methods: {
    ADDaddress() {
      if (!this.address) {
        this.$toast("钱包地址不能为空");        
        return;
      }
      var WAValidator = require('wallet-address-validator');
      if( !WAValidator.validate(this.address, this.value)){
        this.$toast("钱包地址不合法");  
        return
      }

      // if (this.address.slice(0,2) != '0x') {
      //   this.$toast("钱包地址不合法");
      //   return;
      // }
      if (!this.name) {
        this.$toast("名称不能为空");
        return;
      }
      let addressBook = this.public_js.GetStorage('addressBook') || [];
      const params = {
        addressName: this.name,
        address: this.address,
        addressType: this.value,
        remark: this.desc,
        id:addressBook.length+1
      };
      
      addressBook.push(params);
      this.public_js.SetStorage('addressBook',addressBook)
      this.$router.back()
      // addWalletAddress(params).then(res => {
      //   console.log(res);
      //   if (res.code === 0) {
      //     this.$toast("添加钱包地址成功");
      //     this.$router.push({
      //       name: "myaddress",
      //       params: { type: `${this.value}`,tag:"newAddress" }
      //     });
      //   }
      // });
    }
  },
  components: {
    Pageheader
  }
};
</script>
<style lang="scss" scoped>
// /deep/.van-dropdown-menu__item {
//   justify-content: flex-start;
// }
.van-cell {
  border-bottom: 1px solid #dfdfdf;
  padding: 20px 15px 10px 15px;
}
[class*="van-hairline"]:after {
  border: none;
}
.van-cell:not(:last-child):after {
  border: none;
}
.addAddress{
  background: #2364bc;
  border: 1px solid #2364bc;
}
.addressInput{
  font-size: 13px;
}
// .myaddress {
//   background: #f6f9f9;
//   height: 100%;
//   .myaddress-img {
//     height: 100px;
//     text-align: center;
//     img {
//       border-radius: 50%;
//       margin-top: 30px;
//       width: 40px;
//       height: 40px;
//     }
//   }
//   .myaddress-warp {
//     background: #fff;
//   }
//   .addAddress {
//     width: 80%;
//     margin-left: 10%;
//     margin-top: 20px;
//   }
// }
</style>