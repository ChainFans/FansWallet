<template>
    <div class="transaction-container">
        <pageheader></pageheader>
        <div class="detail-box" v-if="transactionInfo">
            <div class="transfer-state">
                <div class="state-img">
                    <img :src="transactionInfo.txStatus?require('@/assets/images/other/transferSuccess.png'):require('@/assets/images/other/transferFail.png')" alt="">
                </div>
                <p :style="{color:transactionInfo.txStatus?'green':'red'}"> {{ transactionInfo.contract?'合约调用':''}}{{ transactionInfo.txStatus?'成功':'失败' }}    </p>
                <p class="transTime"> {{public_js.transformationTime(transactionInfo.timestamp*1000)}} </p>
            </div>
            <div class="cell">
                <span>金额</span>
                <span class="price"><b>{{ transactionInfo&&transactionInfo.from.toLowerCase()==walletInfo.address.toLowerCase()?transactionInfo.valueToEth==0?0:'-'+transactionInfo.valueToEth:'+'+transactionInfo.valueToEth }} {{transactionInfo.tokenSymbol}}  </b></span>
            </div>
            <div class="cell space van-hairline--bottom">
                <span>矿工费</span>
                <span>   {{ transactionInfo.transactionFeeToEth }}ETH  <br>
                    <font class="gas">GasPrice( {{ transactionInfo.gasPriceToGWei }} GWEI)* Gas({{ transactionInfo.gas }})</font>
                </span>
            </div>
            <div class="cell van-hairline--bottom">
                <span>收款地址</span>
                <span
                v-clipboard:copy="transactionInfo.to"
                v-clipboard:success="onCopy"
                >{{ transactionInfo.to }}</span>
            </div>
            <div class="cell van-hairline--bottom">
                <span>付款地址</span>
                <span
                v-clipboard:copy="transactionInfo.from"
                v-clipboard:success="onCopy"
                >{{ transactionInfo.from }}</span>
            </div>
            <div class="cell" v-if="transactionInfo.contract">
                <span>合约地址</span>
                <span
                v-clipboard:copy="transactionInfo.contract"
                v-clipboard:success="onCopy"
                >{{ transactionInfo.contract }}</span>
            </div>
            <div class="cell space van-hairline--bottom">
                <span>交易区块</span>
                <span>{{ transactionInfo.blockNumber }}</span>
            </div>
            <div class="cell van-hairline--bottom">
                <span>交易哈希</span>
                <span
                v-clipboard:copy="transactionInfo.transactionHash"
                v-clipboard:success="onCopy"
                >{{ transactionInfo.transactionHash }}</span>
            </div>
            <div class="cell" @click="watchDetail(transactionInfo.transactionHash)">
                <span>查询详细信息</span>
                <span><van-icon name="arrow"  /></span>
            </div>
        </div>


    </div>
</template>
<script>
import pageheader from '@/components/pageheader'
import QRCode from "qrcodejs2";
import {get_transferReceipt, get_transferReceipt_erc20} from '@/api/wallet'
export default {
    components:{pageheader},
    data(){
        return{
            transactionInfo:'',
            query:'',
            walletInfo:{}
        }
    },
    created(){
        this.walletInfo  = this.public_js.GetStorage('walletInfo').find(n => n.isMain)
        this.query = JSON.parse(this.$route.query.transactionInfo)
        console.log(this.query)   
        this.transferInfo()
    },
    mounted(){
        // this.creatQrCode()
    },
    computed:{
        minerFee(){
            let price = this.transactionInfo.gas * this.transactionInfo.gasPrice /1000000000;
            let m = Math.pow(10, 10); 
            return parseInt(price * m, 10) / m;
        }
    },
    methods:{
        transferInfo(){
            let params = {
                TransactionHash:this.query.transactionHash
            }
            this.$toast.loading({
                duration: 0,
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            if(this.query.contract){
                get_transferReceipt_erc20(params).then(res=>{
                    this.$toast.clear();
                    if(res.code===0){
                        this.transactionInfo = res.data;
                    }else{
                        this.$toast(res.messages)
                    }
                }).catch(err => {
                    this.$toast('网络异常')
                    this.$toast.clear();
                })
            }else{
                get_transferReceipt(params).then(res=>{
                    this.$toast.clear();
                    if(res.code===0){
                        this.transactionInfo = res.data;
                    }else{
                        this.$toast(res.messages)
                    }
                }).catch(err => {
                    this.$toast('网络异常')
                    this.$toast.clear();
                })

            }
        },
        watchDetail(item){
            let query = {
                dappName:'Etherscan',
                dappUrl:'https://rinkeby.etherscan.io/tx/'+item
                // dappUrl:'https://cn.etherscan.com/token/'+item
            }
            this.$router.push({ path:'/thirdParty',query:{ data:JSON.stringify(query)} })
        },
        switchTime(time){
            let now = new Date(time);
            var year=now.getFullYear(); 
            var month=(now.getMonth()+1).toString().padStart(2,'0');; 
            var date=now.getDate().toString().padStart(2,'0');
            var hour=now.getHours().toString().padStart(2,'0');
            var minute=now.getMinutes().toString().padStart(2,'0');
            var second=now.getSeconds().toString().padStart(2,'0');
            return year+"年"+month+"月"+date+"日 "+hour+":"+minute+":"+second; 
        },
        creatQrCode() {   
            var qrHeight = this.$refs.qrCodeUrl.clientHeight; 
            const qrcode = new QRCode(this.$refs.qrCodeUrl, {
                text: this.transactionInfo.fromAddress,
                width: qrHeight,
                height: qrHeight,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        },
        onCopy(e) {
            this.$toast("复制成功");
        },
    }
}
</script>
<style scoped lang="scss">
.transaction-container{
    height: 100vh;
    background: #f4f4f4;
    .detail-box{
        text-align: center;
        padding:0 15px;
        .transfer-state{
            height: 110px;
            padding: 15px 0;
            .transTime{
                color: #888;
                font-size: 13px;
            }
            .state-img{
                text-align: center;
                img{
                    width: 60px;
                    height: 60px;
                }
            }
            p:nth-child(2){
                margin-top: 5px;
                color: green;
            }
        }
        .space{
            margin-top: 10px;
        }
        .border{
            border-bottom: 0;
        }
        .cell{
            padding:5px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 50px;
            background: #fff;
            width: 100%;
            box-sizing: border-box;
            // border-radius: 7px;
            span:nth-child(1){
                color: #777;
            }
            span:nth-child(2){
                text-align: right;
                display: inline-block;
                width: 210px;
                word-break: break-all;
                font-size: 13px;
            }
            .price{
                font-size: 16px !important;
            }
            .gas{
                font-size: 12px;
                color: #999;
            }
        }
    }




    // .transaction-box{
    //     width: 350px;
    //     height: 550px;
    //     border: 1px solid #eee;
    //     border-radius: 10px;
    //     margin: 10px auto;
    //     box-shadow: 2px 2px 8px 1px rgba(179, 179, 177, 0.5);
    //     background: #fff;
    //     .header{
    //         height: 130px;
    //         text-align: center;
    //         padding: 20px 0;
    //         box-sizing: border-box;
    //         .price-data{
    //             height: 50px;
    //             display: flex;
    //             justify-content: center;
    //             align-items: center;
    //             font-size: 26px;
    //             span:nth-child(3){
    //                 font-size: 16px;
    //                 margin-top: 9px;
    //             }
    //             .state-img{
    //                 width: 30px;
    //                 height: 30px;
    //                 img{
    //                     width: 100%;
    //                     height: 100%;
    //                 }
    //             }
    //             .price-num{
    //                 margin: 0 5px 0 20px;
    //             }
                
    //         }
    //         .transaction-state{
    //             font-size: 16px;
    //             margin-top: 5px;
    //         }
    //     }
    //     .main{
    //         font-size: 14px;
    //         padding: 10px 20px;
    //         position: relative;
    //         .miner-fee{
    //             height: 50px;
    //             padding-top: 10px;
    //             box-sizing: border-box;
    //             p{
    //                 line-height: 20px;
    //             }
    //             p:nth-child(2){
    //                 line-height: 20px;
    //                 margin-left: 70px;
    //                 color: #c5c2c2;
    //                 font-size: 12px;
    //             }
    //         }
    //         .transaction-address{
    //             line-height: 50px;
    //         }
    //         .transaction-hash{
    //             line-height: 30px;
    //         }
    //         .transaction-address,.transaction-hash,.miner-fee >p{
    //             span:nth-child(1){
    //                 color: #949494;
    //             }
    //         }

    //         .qr-content{
    //             width: 90px;
    //             height: 80px;
                
    //             position: absolute;
    //             bottom: 40px;
    //             right:25px;
    //             .qrcode{
    //                 height: 80px;
    //             }
    //             >p{
    //                 font-size: 12px;
    //                 color: rgb(81, 172, 247);
    //             }
    //         }
    //     }
    // }
}
</style>