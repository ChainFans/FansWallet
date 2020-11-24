<template>
    <div class="container-wallet">
        <pageheader></pageheader>
        <div class="logo-box">
            <img :src='"../../../assets/images/token_logo/"+$route.query.wallet+".png"' style="width:50px;height:50px">
            <p><b>创建{{fullName}}钱包</b></p>
        </div>
        <div class="input-box">
                <van-field v-model="formData.name" placeholder="钱包名称" class="userInput" />
                <van-field v-model="formData.password" placeholder="钱包密码" class="userInput" type="password" maxlength="50" />
                <van-field v-model="formData.re_password" placeholder="确认密码" class="userInput" type="password" maxlength="50" />
                <van-field v-model="formData.tips" placeholder="描述" class="userInput" />
        </div>
            <van-button type="info" size="normal" class="create-btn" v-if="showBtn" @click="create_wallet">创建</van-button>

        


        <!-- 备份助记词 -->
        <van-popup
            v-model="backups_show" 
            position="right"
            class="backups-mnemonicWord"
        >
        <!-- 备份提示 -->
        <van-dialog
            v-model="tips_show"
            title="备份提示"
            >

            <div class="tips-box">
                <p>获得助记词等于拥有钱包资产所有权</p>
                <div class="prompt-img">
                    <img  src="@/assets/images/wallet/1569727543(1).jpg" />
                </div>
               
                <div class="content">
                    <b>备份助记词</b>
                    <p>使用纸和笔正确抄写私钥</p>
                    <p>如果你的手机丢失、被盗、损坏、私钥将可以恢复你的资产</p>
                    <br>
                    <b>离线保管</b>
                    <p>妥善保管至隔离网络的安全地方</p>
                    <p>请勿将私钥在联网环境下分享和存储，比如邮件、相册、社交应用等</p>
                </div>
            </div>

            
        </van-dialog>


        <div class="backups-back" :style="{'padding-top':$store.state.appTop }">
            <van-icon name="arrow-left" @click="backups_show=false" />
        </div>
        <div class="backups-box">
            <p class="title"><b>备份助记词</b></p>
            <p>请按顺序选择助记词，确保备份正确</p>
            <div class="terms-box">
                <span v-for="(item,index) in termsData" :key="index">{{item}}</span>
            </div>
        </div>

        <van-button size="normal" class="exet" v-if="showBtn" @click="$router.push({name:'walletmanage'})">退出</van-button>
        <van-button type="info" size="normal" class="next" v-if="showBtn" @click="finish_sureMnemonicWord">完成</van-button>
        </van-popup>
        <!-- 确认助记词 -->
        <van-popup
            v-model="sureMnemonicWord_show"
            position="right"
            class="sureMnemonicWord">
            <div class="back" :style="{'padding-top':$store.state.appTop }">
                <van-icon name="arrow-left" @click="sure_back" />
                <!-- <van-icon name="arrow-left" @click="sureMnemonicWord_show=false" /> -->
            </div>
            <div style="padding:0 15px">
                <div class="title-box">
                    <img src="" style="height:50px">
                    <p><b>确认助记词</b></p>
                </div>
                <p>请按顺序点击助记词，以确认您正确备份。</p>
                <div class="display-area">
                    <div class="terms-box">
                        <span v-for="(item,index) in validationTerm" :key="index" @click="pull_terms(item,index)">{{item}}</span>
                    </div>
                </div>
                <div class="operation-area">
                    <div class="terms-box">
                        <span v-for="(item,index) in randomTerm" :key="index" :style="{'opacity':confirmArr.includes(index)?'0.5':'1'}" @click="push_terms(item,index)">{{item}}</span>
                    </div>
                </div>
            </div>
        <van-button type="info" size="normal" class="sure_btn" :disabled="validationTerm.length != randomTerm.length" @click="finish">完成</van-button>
        </van-popup>
    </div>
</template>
<script>
import CryptoJS from "crypto-js";
import {get_mnemonicWord, createWallet} from '@/api/mycenter/wallet'
import { created_wallet } from "@/api/wallet"
import pageheader from '@/components/pageheader'
export default {
    components:{pageheader},
    data(){
        return{
           clientHeight:document.documentElement.clientHeight,
　　　　　　showBtn: true,  // 控制按钮显示隐藏
           formData:{
               name:'',
               password:'',
               re_password:'',
               tips:'',
           },  
           backups_show:false, 
           tips_show:false,  
           digit:12,
           language: 'English',
           termsData:[],
           sureMnemonicWord_show:false,
           validationTerm:[],
           randomTerm:[],
           createInfo:{},
           mnemonic:'',
            confirmArr:[],
        }
    },
    created(){
        this.mnemonicWord_list()
    },
    mounted(){
        window.onresize= ()=>{
            if(this.clientHeight>document.documentElement.clientHeight) {
               this.showBtn =false
            }else{
                this.showBtn = true
            }
        }
    },
    computed:{
        fullName(){
            switch (this.$route.query.wallet) {
                case 'BTC':
                    return 'Bitcoin'
                    break;
                case 'ETH':
                    return 'Ethereum'
                    break;
                case 'NAS':
                    return 'Nebulas'
                    break;
                case 'TRX':
                    return 'TRON'
                    break;
                case 'EOS':
                    return 'EOS'
                    break;           
                default:''
                    break;
            }
        }
    },
    methods:{
        create_wallet(){       
            if(this.formData.name==''){
                this.$toast('钱包名字不能为空')
                return
            }
            if(this.formData.password==''){
                this.$toast('钱包密码不能为空')
                return
            }
            if(this.formData.password.length < 6){
                this.$toast('钱包密码不小于6位')
                return
            }
            if(this.formData.password !== this.formData.re_password){
                this.$toast('确认密码不一致')
                return
            }
            // if(!(/\d+/.test(this.formData.password) && /[a-zA-Z]+/.test(this.formData.password))) {
            //     this.$toast("钱包密码必须包含数字和字母");
            //     return;
            // }  
            var bip39 = require('bip39');
            this.mnemonic=  bip39.generateMnemonic();
            this.randomTerm = []
            this.validationTerm=[]
            this.termsData = this.mnemonic.split(' ')
            for (var item in this.termsData) this.randomTerm[item] = this.termsData[item];
            this.randomTerm.sort(function(){ return 0.5 - Math.random() })
            
            this.backups_show = true;
            this.tips_show = true;
        },
        async finish_sureMnemonicWord(){  
            this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                loadingType: 'spinner',
                message: '创建中...',
            });


            var password = CryptoJS.AES.encrypt(this.formData.password, CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            var mnemonicWords = CryptoJS.AES.encrypt(this.mnemonic, CryptoJS.enc.Utf8.parse("8NONwyJtHesysWpM"), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            




            let walletInfo = this.public_js.GetStorage('walletInfo');
            let assetsToken;
            let keystore;
            if(this.$route.query.wallet == 'ETH'){
                var ethers = require('ethers'); 
                // var privateKey = ethers.utils.randomBytes(16);
                // this.mnemonic  =  bip39.entropyToMnemonic(privateKey)
                var wallet= ethers.Wallet.fromMnemonic(this.mnemonic);

                var wk = new ethers.Wallet(wallet.privateKey);
                await wk.encrypt(this.formData.password,percent=>{}).then(res => {
                    keystore = res
                    this.$toast.clear();
                }).catch(err => {
                    this.$toast('创建失败')
                    this.$toast.clear();
                })


                this.createdWallet('ETH',wallet.address)
                assetsToken = [{
                    address:wallet.address,
                    walletType:'ETH',
                    totalAccount:0,
                    totalUsd:0,
                    tokenSymbol:'ETH',
                }]
                let newWallet = {
                    address: wallet.address,
                    isMain: 0,
                    mnemonic: mnemonicWords.ciphertext.toString(),
                    password: password.ciphertext.toString(),
                    privateKey:wallet.privateKey,
                    totalAccount: 0,
                    totalUsd: 0,
                    userName: '',
                    walletName: this.formData.name,
                    walletType:this.$route.query.wallet,
                    remark:this.formData.tips,
                    assetsToken:assetsToken,
                    keystore:keystore
                }
                walletInfo.push(newWallet)
                this.public_js.SetStorage('walletInfo',walletInfo);

            } 
            if(this.$route.query.wallet == 'BTC'){
                var btcWallet = {};
                var bip39 = require('bip39');
                var bitcoinjs = require('bitcoinjs-lib');
                bip39.mnemonicToSeed(this.mnemonic).then(res=>{
                var root = bitcoinjs.bip32.fromSeed(res);
                var keyPair = root.derivePath("m/44'/0'/0'/0/0");
                btcWallet.privateKey = keyPair.toWIF();    // 私钥：L2tduuvVupopVxJ8tFtmGf5KXxKoaJBRFUKU1VCoTX3dtskwwAhF
                btcWallet.publicKey = keyPair.publicKey;
                btcWallet.address = bitcoinjs.payments.p2pkh({ pubkey: btcWallet.publicKey }).address;  
                this.createdWallet('BTC',btcWallet.address)
                    assetsToken = [{
                        address:btcWallet.address,
                        tokenLogo:'',
                        walletType:'BTC',
                        tokenSymbol:'BTC',
                        totalAccount:0,
                        totalUsd:0,
                    },
                    {
                        address:btcWallet.address,
                        walletType:'BTC',
                        tokenSymbol:'USDT',
                        totalAccount:0,
                        totalUsd:0,
                        contractAddress:''
                    }]
                    walletInfo.push({
                        userName:'',
                        walletName:this.formData.name,
                        password:password.ciphertext.toString(),
                        remark:this.formData.tips,
                        isMain:0,
                        address:btcWallet.address,
                        walletType:'BTC',
                        totalAccount:0,
                        totalUsd:0,
                        mnemonic:mnemonicWords.ciphertext.toString(),
                        privateKey:btcWallet.privateKey,
                        assetsToken:assetsToken
                    })
                    this.public_js.SetStorage('walletInfo',walletInfo);
                });
            }

            this.$toast.clear();

            const timer = setInterval(() => {   
                clearInterval(timer);
                // this.$toast.clear();  
                // this.$toast.success('创建成功');
                this.$dialog.confirm({
                title: '提示',
                message: '钱包已创建成功，是否需要验证助记词'
                }).then(() => {
                    this.sureMnemonicWord_show=true
                }).catch(() => {
                    this.$router.back()
                });

            }, 500);
        },
        createdWallet(ChainCode,Address){   
            let params = {
                ChainCode:ChainCode,
                Address:Address
            }
            created_wallet(params).then(res => {
                if(res.code === 0){
                    return
                }else{
                    this.$toast(res.messages)
                }
            })
        },
        sure_back(){
            this.$router.back()
        },

        mnemonicWord_list(){
            // let params = {
            //     Language:this.language,
            //     WordCount:this.digit,
            //     WalletType:this.$route.query.wallet
            // }
            // get_mnemonicWord(params).then(res => {
            //     if(res.code === 0){
            //         this.randomTerm = []
            //         this.validationTerm=[]
            //         this.termsData = res.data.wordsList

            //         for (var item in this.termsData) this.randomTerm[item] = this.termsData[item];

            //         this.randomTerm.sort(function(){ return 0.5 - Math.random() })

            //     }else{
            //         this.$toast(res.messages)
            //     }
            // }).catch(err => {
            //     this.$toast('网络异常')
            // })
        },
        pull_terms(item,index){  
            this.validationTerm.splice(index,1)
            this.confirmArr.splice(index,1)
        },
        push_terms(item,index){ 
            if(!this.confirmArr.includes(index)){
                this.validationTerm.push(item);
                this.confirmArr.push(index);
            }
        },
        finish(){    //完成
            this.$toast.loading({
                duration: 0,       // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: 'spinner',
                message: '加载中'
            });

            if(this.termsData.join(' ') === this.validationTerm.join(' ')  ){
                setTimeout(() => {
                    this.$toast.clear();
                    this.$toast.success('助记词备份正确');
                    this.$router.back()
                },1000)

            }else{
                this.$toast.clear();
                this.$toast('助记词顺序不正确！');
            }
            
        }
    }
}
</script>
<style scoped lang="scss">
.container-wallet{
    
    background: #fff;
    .header{
        height: 50px;
        background: #fff;     
        .back{
            line-height: 50px;
            font-size: 22px;
            margin-left: 10px;
            width: 30px;
        }
    }
    .logo-box{
        height: 90px;
        text-align: center;
        padding-top: 30px;
        p{
            font-size: 14px;
        }
    }
    .input-box{
        .userInput{
            border: 1px solid #eee;
            width: 90%;
            margin-top: 5px;
            border-radius: 8px;
            background: rgb(245, 244, 244);
            margin: 10px auto;
            padding: 13px 15px;
        }
    }
    .create-btn{
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translate(-50%);
        width: 90%;
        font-size: 16px;
    }
}
.backups-mnemonicWord{
    width: 100%;
    height: 100%;
    .tips-box{
        width: 90%;
        height: 400px;
        font-size: 15px;
        padding: 0 15px;
        .prompt-img{
            text-align: center;
            height: 140px;
            img{
                width: 120px;
                height: 120px;
                margin-top: 10px;
            }
        }
        .content{
            p{
                color: #666;
                font-size: 14px;
            }
        }
        >p{
            text-align: center;
            font-size: 16px;
            margin-top: 20px;
        }
    }
    .backups-back{
        line-height: 50px;
        font-size: 22px;
        padding: 0 10px;
    }
    .backups-tips{
        height: 160px;
        background: #eee;
    }
    .backups-box{
        text-align: center;
        font-size: 14px;
        .title{
            height: 80px;
            font-size: 18px
        }
        p{
            line-height: 40px;
        }
        .operation{           
            margin: 0 auto;
            .language-box{
                margin-top: 30px;
                .language-radio{
                    display: flex;   
                    justify-content: center;
                }
            }
        }
        .terms-box{
            width: 90%;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            display: flex;
            flex-wrap: wrap;
            margin: 10px auto;
            padding: 10px 0;
            box-sizing:border-box;
            min-height: 40px;
            span{
                line-height: 20px;
                background: rgb(233, 238, 240);
                padding: 4px 6px;
                border-radius: 4px;
                margin: 5px;
                font-size: 15px;
            }
        }
    }
    .exet{
        position: absolute;
        bottom: 70px;
        width: 90%;
        left: 50%;
        transform: translate(-50%)
    }
    .next{
        position: absolute;
        bottom: 10px;
        width: 90%;
        left: 50%;
        transform: translate(-50%)
    }
}
.sureMnemonicWord{
    width: 100%;
    height: 100%;
    
    .back{
        line-height: 50px;
        font-size: 22px;
        padding: 0 10px;
        border-bottom: 1px solid #eee;
    }
    .title-box{
        font-size: 18px;
        height: 100px;
        // background: #eee;
        text-align: center;
    }
    p{
        line-height: 60px;
        text-align: center;
        padding: 10px 0;
    }

    .display-area{
        min-height: 50px;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
       
    }
    .terms-box{
        display: flex;
        flex-wrap: wrap;
        margin: 10px auto;
       
        box-sizing:border-box;
        span{
            line-height: 20px;
            background: rgb(233, 238, 240);
            padding: 5px 6px;
            border-radius: 4px;
            margin: 5px;
            font-size: 15px;
        }
    }
    .operation-area{
       
    }
    .sure_btn{
        position: absolute;
        bottom: 10px;
        width: 90%;
        left: 50%;
        transform: translate(-50%)

    }
}
</style>