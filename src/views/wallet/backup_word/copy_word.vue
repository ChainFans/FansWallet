<template>  
    <div class="container">
        <pageheader></pageheader>
        <div class="main">
            <p class="header-tips">请按顺序抄写助记词，确保备份正确</p>
            <div class="word-list">
                <van-grid :column-num="3">
                    <van-grid-item v-for="value in mnemonic" :key="value" :text="value" />
                </van-grid>
            </div>
            <p>妥善保管助记词至隔离网络安全的地方。</p>
            <p>请勿将助记词在互联网环境下分享和储存，比如邮件、相册、社交应用等。</p>
        </div>
        <div class="bottom-btn">
            <van-button class="btn" type="info" @click="$router.push('verification_word')">已确认备份</van-button>
        </div>

    </div>
</template>

<script>
import pageheader from '@/components/pageheader'
import CryptoJS from "crypto-js";
export default {
    components:{ pageheader },
    data(){
        return{
            mnemonic:[]
        }
    },
    created(){
    this.mnemonic = this.public_js.GetStorage('walletInfo').find(n => n.isMain).mnemonic
    
    var encryptedHexStr = CryptoJS.enc.Hex.parse(this.mnemonic);
    var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str,  CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    this.mnemonic = decryptedData.toString(CryptoJS.enc.Utf8).split(' ');
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
.container{
    height: 100vh;
    .main{
        padding: 0 15px;
        p{
            color: #777;
        }
        .header-tips{
            line-height: 30px;
        }
        .word-list{
            margin: 15px 0;
            /deep/.van-grid-item__text{
                font-size: 15px;
            }
        }
        /deep/.van-grid-item__content{
            background:#f9f9f9
        }

    }
}
</style>