<template>
  <div class="container">
    <Pageheader />
    <p class="tips">请添加身份钱包下的币种</p>
    <van-checkbox-group v-model="tokenResult">
      <van-cell-group>
        <van-cell
          v-for="(item, index) in tokenList"
          clickable
          :key="index"
          :title="item.name"
          :label="item.fullName"
          icon="location-o"
          label-class="label-class"
          class="token-cell"
          @click="toggle(item, index)"
        >
          <template #right-icon>
            <van-checkbox
              :name="item.name"
              :disabled="!item.state"
              ref="checkboxes"
            />
          </template>
          <template #icon>
            <img class="token-img" :src="item.logo" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
    <div class="bottom-btn">
      <van-button type="info" class="btn" @click="confirm()">确认</van-button>
    </div>
  </div>
</template>
<script>
import Pageheader from "@/components/pageheader";
import CryptoJS from "crypto-js";
import { created_wallet } from "@/api/wallet";
export default {
  components: {
    Pageheader,
  },
  data() {
    return {
      tokenList: [
        {
          logo: require("@/assets/images/token_logo/ETH.png"),
          name: "ETH",
          state: false,
          fullName: "Ethereum",
        },
        {
          logo: require("@/assets/images/token_logo/BTC.png"),
          name: "BTC",
          state: true,
          fullName: "Bitcoin",
        },
        {
          logo: require("@/assets/images/token_logo/TRX.png"),
          name: "TRX",
          state: false,
          fullName: "TRON",
        },
        {
          logo: require("@/assets/images/token_logo/NEO.png"),
          name: "NEO",
          state: false,
          fullName: "Neo",
        },
        {
          logo: require("@/assets/images/token_logo/EOS.png"),
          name: "EOS",
          state: false,
          fullName: "EOS",
        },
      ],
      tokenResult: ["ETH"],
      newWallet: {},
    };
  },
  created() {
    this.newWallet = this.$route.params.data;
  },
  methods: {
    toggle(item, index) {
      if (!item.state) {
        return;
      }
      this.$refs.checkboxes[index].toggle();
    },
    confirm() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "钱包创建中...",
      });

      //eth
      var ethers = require("ethers");
      var bip39 = require("bip39");
      if (this.newWallet.words) {
        var mnemonic = this.newWallet.words;
      } else {
        var mnemonic = bip39.generateMnemonic();
      }
      var wallet = ethers.Wallet.fromMnemonic(mnemonic);

      console.log(mnemonic);

      var password = CryptoJS.AES.encrypt(
        this.newWallet.password,
        CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      var mnemonicWords = CryptoJS.AES.encrypt(
        mnemonic,
        CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      let walletInfo = [];
      let assetsToken;
      if (this.tokenResult.includes("ETH")) {
        this.createdWallet("ETH", wallet.address);
        assetsToken = [
          {
            address: wallet.address,
            tokenLogo: "",
            walletType: "ETH",
            tokenSymbol: "ETH",
            totalAccount: 0,
            totalUsd: 0,
          },
        ];

        walletInfo.push({
          userName: this.newWallet.name,
          walletName: "ETH",
          password: password.ciphertext.toString(),
          remark: this.newWallet.remark,
          isMain: 1,
          address: wallet.address,
          walletType: "ETH",
          totalAccount: 0,
          totalUsd: 0,
          mnemonic: mnemonicWords.ciphertext.toString(),
          privateKey: wallet.privateKey,
          assetsToken: assetsToken,
        });
      }
      if (this.tokenResult.includes("BTC")) {
        var btcWallet = {};
        var bitcoinjs = require("bitcoinjs-lib");
        bip39.mnemonicToSeed(mnemonic).then((res) => {
          var root = bitcoinjs.bip32.fromSeed(res);
          var keyPair = root.derivePath("m/44'/0'/0'/0/0");
          btcWallet.privateKey = keyPair.toWIF();
          btcWallet.publicKey = keyPair.publicKey;
          btcWallet.address = bitcoinjs.payments.p2pkh({
            pubkey: btcWallet.publicKey,
          }).address;

          // btcWallet.privateKey = CryptoJS.AES.encrypt(btcWallet.privateKey, CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"), {
          //     mode: CryptoJS.mode.ECB,
          //     padding: CryptoJS.pad.Pkcs7
          // });

          // this.createdWallet('BTC',btcWallet.address)
          assetsToken = [
            {
              address: btcWallet.address,
              tokenLogo: "",
              walletType: "BTC",
              tokenSymbol: "BTC",
              totalAccount: 0,
              totalUsd: 0,
            },
            {
              contractAddress: "",
              tokenLogo: "",
              walletType: "BTC",
              tokenSymbol: "USDT",
              totalAccount: 0,
              totalUsd: 0,
            },
          ];
          walletInfo.push({
            userName: this.newWallet.name,
            walletName: "BTC",
            password: password.ciphertext.toString(),
            remark: this.newWallet.remark,
            isMain: 0,
            address: btcWallet.address,
            walletType: "BTC",
            totalAccount: 0,
            totalUsd: 0,
            mnemonic: mnemonicWords.ciphertext.toString(),
            privateKey: btcWallet.privateKey,
            assetsToken: assetsToken,
          });
        });
      }

      function guid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            var r = (Math.random() * 16) | 0,
              v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }
        );
      }
      console.log(guid());
      this.public_js.SetStorage("uuId", guid());

      setTimeout(() => {
        this.public_js.SetStorage("walletInfo", walletInfo);
        this.$router.push("backupWord");
        this.$toast.clear();
      }, 30);
    },
    createdWallet(ChainCode, Address) {
      let params = {
        ChainCode: ChainCode,
        Address: Address,
      };
      created_wallet(params).then((res) => {
        if (res.code === 0) {
          return;
        } else {
          this.$toast(res.messages);
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  .tips {
    padding: 0 15px;
    line-height: 20px;
    color: #949494;
  }
  .token-img {
    height: 44px;
    margin-right: 10px;
  }
  .label-class {
    margin-top: 0;
  }
}
</style>