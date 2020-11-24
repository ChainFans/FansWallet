<template>
  <div class="prompt">
    <Pageheader />
    <div class="prompt-top">
      <div class="prompt-img">
        <img src="@/assets/images/wallet/1569727543(1).jpg" />
      </div>
      <p class="prompt-title">确认助记词</p>
      <p class="prompt-desc">请按顺序点击助记词，以确认你正确的备份</p>
    </div>
    <div class="prompt-main">
        
      <div class="prompt-word" v-for="(item,index) in confirm_wordList" :key="index" @click="confirm_wordList.splice(index,1);confirmArr.splice(index,1)">{{item}}</div>
        
    </div>
    <div class="prompt-wordlist">
        <div class="prompt-word" :style="{'opacity':confirmArr.includes(index)?'0.5':'1'}" v-for="(item,index) in wordList" :key="index" @click="checkWord(item,index)">{{item}}</div>
    </div>
    <van-button type="info" class="btn" :disabled="wordList.length != confirm_wordList.length" @click="finshClick">完成</van-button>
  </div>
</template>
<script>
import CryptoJS from "crypto-js";
import Pageheader from "@/components/pageheader";
export default {
  data() {
    return {
      showimg: false,
      showname: false,
      value: "",
      wordList:[],
      confirm_wordList:[],
      validation_wordList:[],
      confirmArr:[],
    };
  },
  components: {
    Pageheader
  },
  created(){
    var encryptedHexStr = this.public_js.GetStorage('walletInfo').find(n => n.isMain).mnemonic
    var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedHexStr);
    var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str,  CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    this.wordList = decryptedData.toString(CryptoJS.enc.Utf8).split(' ');

    this.validation_wordList = JSON.parse(JSON.stringify(this.wordList))
    this.wordList = this.wordList.sort(function(){ return 0.5 - Math.random()})
  },
  methods: {
    selectimgClick() {
      this.showimg = true;
    },
    changename() {
      this.showname = true;
    },
    finshClick() {
      if(this.validation_wordList.join(' ') === this.confirm_wordList.join(' ')){
        this.$toast.success('助记词确认完成')
        this.$router.push('wallet')
      }else{
        this.$toast({
          message: '助记词顺序不正确',
          icon: 'cross',
        });
      }
      
    },
    checkWord(item,index){
      if(!this.confirmArr.includes(index)){
        this.confirm_wordList.push(item);
        this.confirmArr.push(index);
      }
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
  .prompt-main{
    min-height:50px;
    width: 96%;
    margin: auto;
    border-top:1px solid #ebeeed;
    border-bottom:1px solid #ebeeed;
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;
    padding: 10px 0;
  }
  .prompt-wordlist{
    width: 96%;
    padding: 10px 0;
    margin: auto;
    font-size: 16px;
    display: flex;
    flex-wrap: wrap;
    // display: grid;
    // grid-template-columns: repeat(4,80px);
    // grid-template-rows: repeat(3,50px);
  }
  .prompt-word{
      height: 36px;
      margin:5px;
      padding: 5px 10px; 
      box-sizing: border-box;
      // line-height: 35px;
      text-align: center;
      border-radius: 5px;
      color:#4b4f53;
      border: 1px solid #ebeeed;
      background: #edecf2;
  }
  .btn {
    width: 90%;
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translate(-50%);
  }
}
</style>     