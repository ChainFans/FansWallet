<template>
  <div class="set">
    <Pageheader />
    <div class="userInfo-box">
      <div @click="headPortrait_show=false"  class="head-portrait">
        <img :src='"@/assets/images/wallet_logo/wallet-1.png"'>
      </div>
      <div class="walletName">
        <p @click="modifyName_show=true"> {{walletInfo.walletName}} </p>
        <p> {{walletInfo.address}} </p>
      </div>
    </div>

    <div class="sethelp">
      <van-cell size="large" icon="records" title="描述"  :value="walletInfo.remark" value-class="describe" center  @click="tipClick" />
      <van-cell size="large" v-if="walletInfo.mnemonic" icon="description" title="导出助记词" is-link center @click="exportwords('助记词')" />
      <van-cell size="large" v-if="walletInfo.walletType != 'BTC'" icon="peer-pay" title="导出 Keystore" is-link center @click="exportwords('Keystore')" />
      <van-cell size="large" v-if="walletInfo.walletType != 'BTC'" icon="share-o" title="导出私钥" is-link center @click="exportwords('私钥')" />
      <!-- <van-cell size="large" icon="cash-on-deliver" title="免密支付" is-link center @click="$router.push('freePayment')" /> -->
      <!-- <van-cell size="large" icon="edit" title="修改钱包密码" is-link center @click="$router.push({path:'/walletPassword',query:{walletId:walletInfo.walletId}})   " /> -->
    </div>
    <!-- <div class="del-wallet" @click="exportwords('del')"><b>删除钱包</b></div> -->
    <div class="del-wallet" v-if="show_del" @click="exportwords('del')"><b>删除钱包</b></div>

    <!-- 修改钱包名称 -->
    <van-dialog
      v-model="modifyName_show"
      title="更换钱包名"
      show-cancel-button
      @confirm="replaceName"
    >
      <van-field v-model="walletName" placeholder="请输入钱包名称" />  
    </van-dialog>
    <!-- 修改头像 -->
    <van-dialog
      v-model="headPortrait_show"
      title="选择图像"
      show-cancel-button
      @confirm="replaceLogo"
    >
      <div class="pic-box">
        <span  v-for="item in wallet_logo" :key="item"  @click="choiceLogo(item)">
          <div class="wallet-img">
            <img :src='"@/assets/images/wallet_logo/wallet-"+item+".png"'>
          </div>
          <van-icon name="checked" color="red" class="choice-logo" v-show="walletLogo_active==item" />
        </span>
      </div>
    </van-dialog>
    <!-- 密码验证 -->
    <van-dialog
      v-model="password_show"
      title="请输入密码"
      show-cancel-button
      @confirm="testPassword"
      @cancel="password=''"
    >
    <div class="password-box">
      <van-field v-model="password" class="input" type="password" ref="input" />
    </div>
    </van-dialog>


  </div>
</template>
<script>
import CryptoJS from "crypto-js";
import {get_privateInfo, deleteWallet, set_WalletInfo} from '@/api/mycenter/wallet'
import Pageheader from "@/components/pageheader";
export default {
  components: {
      Pageheader,
  },
  data() {
    return {
      walletInfo:{},
      modifyName_show:false,
      headPortrait_show:false,
      password_show:false,
      show_del:true,
      walletName:'',
      password:'',
      wallet_logo:[1,2,3,4,5,6,7,8,9,10,11,12],
      walletLogo_active:0,
      exportType:'',
    };
  },
  created() {
    this.walletInfo = JSON.parse(this.$route.query.data)    
    // console.log( this.walletInfo)
    if(this.walletInfo.isMain == 1){
      this.show_del = false
    }
  },
  methods: {
    replaceName(){
      this.walletInfo.walletName=this.walletName;
      let localWallet = this.public_js.GetStorage('walletInfo')
      console.log(localWallet)
      localWallet.find(i => i.address == this.walletInfo.address).walletName = this.walletName;
      this.walletName='';
      this.public_js.SetStorage('walletInfo',localWallet)
    },
    replaceLogo(){
      this.walletInfo.headPortrait=this.walletLogo_active;
      this.setWalletInfo()
      if(window.plus){        
        plus.storage.setItem('walletInfo',JSON.stringify(this.walletInfo))
      }else{
        localStorage.setItem('walletInfo',JSON.stringify(this.walletInfo))
      }
    },
    setWalletInfo(){   //设置名字 ， 头像
      let params = {
        WalletId:this.walletInfo.walletId,
        WalletName:this.walletInfo.walletName,
        Remark:this.walletInfo.remark,
        HeadPortrait:this.walletLogo_active,
      }
      set_WalletInfo(params).then(res => {
          if(res.code === 0){
            this.$toast('设置成功')
          }else{
            this.$toast(res.messages)
          }
        }).catch(err => {
          this.$toast('网络异常')
        })
    },
    changeperson() {
      this.$router.push({ name: "mywalletinfo",params:{result:this.walletInfo} });
    },
    choiceLogo(item){
      this.walletLogo_active = item
    },
    del_wallet(){

    },
    // addressClick() {
    //   this.$router.push({ name: "mywalletaddress" });
    // },
    tipClick(){
      this.$dialog.alert({
        title: '描述信息',
        message: this.walletInfo.remark || '未填写描述信息',
        messageAlign:'left',
        // showCancelButton:true,
        // showConfirmButton:false
      }).then(() => {
        // on close
      });

    },
    testPassword(){
      var encryptedHexStr = CryptoJS.enc.Hex.parse(this.walletInfo.password);
      var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
      var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str,  CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"), {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
      });
      var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
      if(decryptedStr !== this.password ){
        this.$toast('密码错误')
        this.password = ''
        return
      }

      if(this.exportType=='del'){
        let walletInfo = this.public_js.GetStorage('walletInfo')
        let index = walletInfo.findIndex(i => i.address == this.walletInfo.address)
        walletInfo.splice(index,1)
        this.public_js.SetStorage('walletInfo',walletInfo)
        this.$toast('删除成功')
        this.$router.back()
        // let params = {
        //   WalletId:this.walletInfo.walletId,
        //   Password:this.password,
        // }
        // deleteWallet(params).then(res => {
        //   this.$toast.clear();
        //   if(res.code === 0){
        //     this.password = ''
        //     this.$toast.success('钱包删除成功');
        //     this.$router.go(-1)
        //     this.$store.commit('delWalletId',this.walletInfo.walletId)
        //   }else{
        //     this.$toast(res.messages)
        //   }
        // }).catch(err => {
        //   this.$toast.clear();
        //   this.$toast('网络异常')
        // })
     
      }else{
        let type;
        switch (this.exportType) {
          case '助记词':
            type=3
            break;
          case 'Keystore':
            type=2
            break;
          case '私钥':
            type=1
            break;      
          default:''
            break;
        }


      
        this.$store.commit('walletData',this.walletInfo)
        this.$router.push({ path: "/backupprompt",query:{tag:this.exportType} });
      }

    },
    exportwords(item) {
      if(item == 'del'){
        this.$dialog.confirm({
          title: '提示',
          message: '删除钱包后将不可恢复，未导出助记词请提前导出'
        }).then(() => {
          this.password_show = true;
          this.exportType = item
          this.$nextTick(() => {this.$refs['input'].focus()})
        }).catch(() => {
          // on cancel
        });
        return
      }

      this.password_show = true;
      this.exportType = item
      this.$nextTick(() => {this.$refs['input'].focus()})
   
    },

  }
};
</script>
<style lang="scss" scoped>

.password-box{
  height: 70px;
  .input{
    width: 90%;
    margin: 20px auto;
    border: 1px solid #c9c9c9;
    border-radius: 5px;
  }
}

.van-cell-group{
  width: 90%;
  margin: 15px;
  // border-radius:25px;
  border:1px solid #ebedf0;
}
[class*=van-hairline]:after{
  border:none;
}
.set {
  background: #ececec;
  height: 100vh;
  .header{
    height: 50px;
    background: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .userInfo-box{
    height: 80px;
    background: #fff;
    display: flex;
    padding: 0 16px;
    .head-portrait{
      width: 50px;
      height: 50px;
      margin-top: 10px;
      border-radius: 50%;
      img{
      
        height: 100%;
      }
    }
    .walletName{
      margin: 10px;
      font-size: 16px;
      p:nth-child(2){
        width: 280px;
        color: #969799;
        font-size: 12px;
        word-wrap: break-word;  
      }
    }
  }
  .pic-box{
    min-height: 160px;
    padding: 10px;
    .wallet-img{
      width: 54px;
      height: 50px;
      margin: 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    span{
      position: relative;
      display: inline-block;
    }
    .choice-logo{
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
}
.setbox {
  margin: 65px 0;
}
.setfunction {
  margin: 25px 0;
}
.sethelp {
  margin: 15px 0;
  .describe{
    width: 160px;
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;
  }
}
.del-wallet{
  line-height: 48px;
  background: #fff;
  color: rgb(248, 31, 31);
  text-align: center;
  font-size: 16px;
 
}
.custom-title {
  text-align: center;
  width: 100%;
  display: inline-block;
}

</style>     