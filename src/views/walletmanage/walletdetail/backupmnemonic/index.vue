<template>
  <div class="prompt">
    <Pageheader />
    <div class="prompt-top">
      <div class="prompt-img">
        <img src="../../../../assets/images/wallet/1569727543(1).jpg" />
      </div>
      <p class="prompt-title">备份助记词</p>
      <p class="prompt-desc">请按顺序选择助记词，确保备份正确</p>
    </div>
    <div class="prompt-main">
        <span class="prompt-word" v-for="(item,index) in wordList" :key="index">{{item}}</span>
    </div>
    <van-button class="exet-btn" @click="$router.go(-2)">退出</van-button>
    <van-button type="info" class="btn" @click="stepnext">下一步</van-button>





  </div>
</template>
<script>
import CryptoJS from "crypto-js";
import Pageheader from "../../../../components/pageheader";
export default {
  data() {
    return {
      showimg: false,
      showname: false,
      value: "",
      wordList:[]
    };
  },
  components: {
    Pageheader
  },
  created(){
    var encryptedHexStr = CryptoJS.enc.Hex.parse(this.$store.state.wallet_data.mnemonic);
    var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str,  CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);

    this.wordList = decryptedStr.split(' ')

  },
  methods: {
    selectimgClick() {
      this.showimg = true;
    },
    changename() {
      this.showname = true;
    },
    stepnext() {
       this.$router.push({name:'suremnemonic'})
    }
  }
};
</script>
<style lang="scss" scoped>
.van-cell-group {
  width: 90%;
  margin: 15px;
  border: 1px solid #ebedf0;
}
[class*="van-hairline"]:after {
  border: none;
}
.prompt {
  height: 100vh;
  .prompt-top {
    text-align: center;
    margin-bottom:15px;
    .prompt-title {
      font-size: 18px;
      font-weight: 900;
      line-height: 40px;
    }
    .prompt-desc {
      font-size: 15px;
      color: #7c7c7f;
    }
    .prompt-img {
      margin: 20px auto;
      width: 80px;
      height: 80px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .prompt-main {
    width: 96%;
    padding: 10px 0;
    margin: auto;
    font-size: 16px;
    border-top:1px solid #ebeeed;
    border-bottom:1px solid #ebeeed;      
    display: flex;
    flex-wrap: wrap;
    // display: grid;
    // grid-template-columns: repeat(4,80px);
    // grid-template-rows: repeat(3,50px);
    .prompt-word{
        padding: 7px 10px; 
        margin:5px;
        text-align: center;
        border-radius: 5px;
        color:#4b4f53;
        background: #edecf2
    }
  }
  .exet-btn{
    width: 90%;
    margin-left: 5%;
    position: absolute;
    bottom: 80px;
  }
  .btn {
    width: 90%;
    margin-left: 5%;
    position: absolute;
    bottom: 20px;
  }
}
</style>     