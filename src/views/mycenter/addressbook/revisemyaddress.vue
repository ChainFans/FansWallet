<template>
  <div class="myaddress">
    <Pageheader />
    <div>
      <p class="type">类型:{{addressData.addressType}}</p>
   
        <p>地址</p>
        <van-field v-model="addressData.address" clearable placeholder="请输入有效的地址" class="input font13" />
        <p>名称</p>
        <van-field v-model="addressData.addressName " clearable placeholder="名称" class="input" />
        <p>描述</p>
        <van-field v-model="addressData.remark" clearable placeholder="描述(选填)" class="input" />

    </div>
    <van-button class="addAddress" @click="affirmrevise">确认修改</van-button>
  </div>
</template>
<script>
import Pageheader from "../../../components/pageheader";
import { reviseWalletAddress } from "../../../api/mycenter/addressbook.js"
export default {
  data() {
    return {
      addressData:{}
    };
  },
  created() {
    this.addressData = this.$route.params.data
  },
  methods: {
    affirmrevise() {
      let addressBook = this.public_js.GetStorage('addressBook');
      let index = addressBook.findIndex(n => n.id == this.addressData.id) 
      addressBook[index] = this.addressData
      this.public_js.SetStorage('addressBook',addressBook);
      this.$router.back()
      // const params = {
      //   WalletId: this.ID,
      //   WalletName: this.name,
      //   WalletAddress: this.address,
      //   WalletType: this.wallettype,
      //   Remark: this.desc
      // };
      // reviseWalletAddress(params).then(res => {
      //   //console.log(res);
      //   if (res.code === 0) {
      //     this.$toast("修改钱包地址成功");
      //     this.$router.push({ name: "myaddress",params:{tag:"rev"}});
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
.input{
  padding: 0px 10px !important;
  line-height: 50px;
  height: 50px;
  
}
.font13{
  font-size: 13px;
}
.van-cell {
  border-bottom: 1px solid #dfdfdf;
  padding: 15px;
  height: 50px;
}
[class*="van-hairline"]:after {
  border: none;
}
.van-cell:not(:last-child):after {
  border: none;
}
.type{
  font-size: 18px;
  text-align: center;
  line-height:40px;

}  p{
    padding:0 10px;
    font-size: 14px;
    color: #666;
  }
  .addAddress{
    color: #fff;
    background: #2364bc;
    border-radius: 3px;
  }
</style>