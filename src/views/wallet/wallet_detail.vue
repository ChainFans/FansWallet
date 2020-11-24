<template>
    <div class="container-dapp">
        <Pageheader />
        <div class="t-content">
        
            <div class="tokenEcharts-box" @touchstart="refresh_state = false">
                <p>{{walletInfo.tokenSymbol||walletInfo.walletType}}</p>
                <p> {{totalAccount}}</p> 
                <p>≈￥{{totalUsd.toFixed(2) }}</p>
            </div>  
            <div class="pending-box">
                <div class="pending-module" v-for="(item,index) in pendingData" :key="index">
                    <span>
                        <van-loading type="spinner" color="#1989fa" class="icon" size="18px" />
                        {{public_js.ellipsAddress(item.to)}} (打包中)  </span>
                    <span> -{{ item.valueToEth }} </span>
                </div>
            </div>

            <van-tabs color="#2364bc" v-model="activeType" :animated="true" :swipeable="true" @change="changeTab">
                <van-tab v-for="(title,active) in tokenState" :key="active" :title="title" color="#2364bc">
                    <div class="token-box" >
                        <van-pull-refresh v-model="isLoading" @refresh="refresh()" :disabled="refresh_state">  
                        <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多了"
                            :immediate-check="false "
                            @load="transferList()"
                        >        
                            <div class="token-module" v-for="(item,index) in transactionData" :key="index" @click="viewTransferInfo(item)">
                                <div class="hot-module van-hairline--bottom">
                                    <div class="hot-img">
                                        <img :src="imgState(item)" alt="">
                                    </div>
                                    <div class="hot-info" v-if="item.txStatus">
                                        <span v-if="item.to">{{ public_js.ellipsAddress(item.from.toLowerCase()==walletInfo.address.toLowerCase()?item.to:item.from,6) }}</span>
                                        <span style="color:#999">{{public_js.transformationTime(item.timestamp*1000)}}</span>
                                        <span style="margin-top:5px" v-if="item.valueToEth!=0&&$store.state.lastBlockNumber&&$store.state.lastBlockNumber - item.blockNumber<12 && item.from.toLowerCase()==walletInfo.address.toLowerCase()">
                                            <van-progress
                                            :pivot-text="$store.state.lastBlockNumber - item.blockNumber<0?'0':($store.state.lastBlockNumber - item.blockNumber).toString()"
                                            color="#2364bc"
                                            :percentage="($store.state.lastBlockNumber - item.blockNumber ) /12*100"
                                            />
                                        </span> 
                                    </div>
                                    <div v-else class="hot-info">
                                        <span >Hash: {{ public_js.ellipsAddress(item.transactionHash,8) }} </span>
                                        <span style="color:#999">{{public_js.transformationTime(item.timestamp*1000)}}</span>
                                        
                                    </div>

                                    <div v-if="item.txStatus" class="hot-state" :style="{color:item.from.toLowerCase()==walletInfo.address.toLowerCase()?'red':'#09bb07'}">
                                        {{item.from.toLowerCase()==walletInfo.address.toLowerCase()?item.valueToEth==0?0:'-'+item.valueToEth:'+'+item.valueToEth}}
                                    </div>
                                    <div v-else class="hot-state">
                                        <span class="txFail">转账失败</span>
                                    </div>
                                </div>
                            </div>
                        </van-list>
                        <div class="foot-fill"></div>
                        </van-pull-refresh>

                    </div>    
                </van-tab>
            </van-tabs>
        
        </div>

        <div class="t-footer van-hairline--top">
            <van-button type="info" class="footer-btn" style="background:#07c160" @click="$router.push({path:'/wallet_collection',query:{walletInfo:walletInfo}})">收款</van-button>
            <van-button type="info" class="footer-btn" @click="transfer">转账</van-button>
        </div>
       

    </div>
</template>
<script>
import {get_transactionList, get_walletBalance, get_newTransactionState, get_transferReceipt, get_transferReceipt_erc20} from '@/api/wallet'
import {get_transferList, get_transferList_erc20, get_transferInfo, get_chainInfo } from '@/api/wallet'
import Pageheader from "@/components/pageheader";
export default {
    components: {
        Pageheader,
    },
    data() {
        return {
            tokenState:["全部","转入","转出","失败"],
            walletInfo:{},
            transactionData:[],
            isLoading: false,
            loading: false,
            finished: false,
            activeType:0,
            scrollTop:0,
            tokenBalance:{},
            transferInfo:{},
            refresh_state:false,
            routerBack:false,
            pendingData:[],
            transferTimer:null,
            timer:null,
            transferData:[],
        }
    },
    created(){     
        if(this.$route.query.walletInfo){
            this.walletInfo = JSON.parse(this.$route.query.walletInfo);    
            this.$store.commit('walletInfo',this.walletInfo)
        }else{
            this.walletInfo  = this.public_js.GetStorage('walletInfo').find(n => n.isMain).assetsToken[0]
        }
        // this.$route.meta.headline = this.walletInfo.tokenSymbol || this.walletInfo.walletType
        this.transferList()   //交易纪录
        this.routerBack = false
        this.transactionData = [];
        this.tokenBalance = {}


        this.transferData = this.public_js.GetStorage('Trading') || [];
        this.transferData = this.transferData.filter(n => n.tokenSymbol === this.walletInfo.tokenSymbol)
        if(this.transferData.length>0){
            this.tradingList()
            this.transferTimer = setInterval(() => {
                this.tradingList()
            },5000)
        }
        this.chainInfo()
        this.timer = setInterval(() => {
            this.chainInfo()
        },10000)
        console.log(this.walletInfo)
    },
    beforeDestroy(){
        clearInterval(this.transferTimer);
        clearInterval(this.timer);
    },
    // beforeRouteEnter (to, from, next) {
    //     next(vm => {
            
    //         if(from.name == 'wallet'){               
    //             vm.walletInfo = JSON.parse(vm.$route.query.walletInfo); 
    //             vm.$store.commit('walletInfo',vm.walletInfo)
    //             vm.transferList()   //交易纪录
    //             vm.walletBalance()   //获取金额
    //             vm.routerBack = false
    //             vm.transactionData = [];
    //             vm.tokenBalance = {}
    //         }else if(from.name == 'wallet_transfer'){
    //             if(vm.$route.query.isTransfer){
    //                 vm.routerBack = vm.$route.query.isTransfer
    //                 vm.walletInfo = vm.$store.state.walletInfo
    //                 vm.transactionList()
    //                 vm.walletBalance()
    //             }
    //         }
    //     })
    // },
    watch:{
        scrollTop(num){
            if(num > 0){
                this.refresh_state = true
            }else{
                this.refresh_state = false
            }
        }
    },
    computed:{
        totalAccount(){
            if(!this.$store.state.new_walletInfo.length){
                return 0
            }
            if(!this.walletInfo.contractAddress){
                return this.$store.state.new_walletInfo.find(n => n.contractAddress == '').amountToEth
            }else{
                return this.$store.state.new_walletInfo.find(n => n.contractAddress == this.walletInfo.contractAddress).amountToEth
            }
            
        },
        totalUsd(){
            if(!this.$store.state.new_walletInfo.length){
                return 0
            }
            if(!this.walletInfo.contractAddress){
                let new_data = this.$store.state.new_walletInfo.find(n => n.contractAddress == '')
                return new_data.amountToEth * new_data.tokenPriceCny
            }else{
                let new_data = this.$store.state.new_walletInfo.find(n => n.contractAddress == this.walletInfo.contractAddress)
                return new_data.amountToEth * new_data.tokenPriceCny
            }
        }
    },
    methods:{
        changeTab(state){
            this.loading = true;
            this.finished = false;
            this.transactionData = [];
            this.transferList('refresh')
        },
        //交易记录
        transferList(state){  
            this.$toast.loading({
                duration: 0,
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            if(this.walletInfo.contractProtocol && this.walletInfo.contractProtocol == 'ERC20' ){

                let params = {
                    PageCount:20,
                    GetType:'After',
                    PagingParams:state?0:this.transactionData.length,
                    Address: this.walletInfo.address,
                    ContractAddress: this.walletInfo.contractAddress,
                    TransferType:this.activeType-1
                }
                get_transferList_erc20(params).then(res => {    //ERC20
                    this.isLoading =false
                    this.$toast.clear();    
                    if(res.code === 0){
                        if(state){
                            this.transactionData = res.data
                        }else{
                            this.transactionData = this.transactionData.concat(res.data) 
                        }

                        this.loading = false;
                        if (this.transactionData.length >= res.totalCount) {   
                            this.finished = true;
                        }

                    }else{
                        this.$toast(res.messages)
                    }
                }).catch(err => {
                    this.$toast('网络异常')
                    this.$toast.clear();
                })
            } else {
                let params = {
                    PageCount:20,
                    GetType:'After',
                    PagingParams:state?0: this.transactionData.length,
                    Address: this.walletInfo.address,
                    TransferType:this.activeType-1
                }
                get_transferList(params).then(res => {     //eth
                    this.isLoading =false
                    this.$toast.clear();
                    if(res.code === 0){
                        if(state){
                            this.transactionData = res.data
                        }else{
                            this.transactionData = this.transactionData.concat(res.data) 
                        }

                        this.loading = false;
                        if (this.transactionData.length >= res.totalCount) {
                            this.finished = true;
                        }
                    }else{
                        this.$toast(res.messages)
                    }
                }).catch(err => {
                    this.$toast('网络异常')
                    this.$toast.clear();
                })

            }
        },
        //转账中状态
        tradingList(){
            // console.log(    '--',this.transferData)
            if(!this.transferData.length){
                 this.public_js.SetStorage('Trading',this.transferData)
                clearInterval(this.transferTimer);
                return
            }
            //ERC20
            if(this.walletInfo.contractProtocol &&  this.walletInfo.contractProtocol == 'ERC20' ){
                this.transferData.forEach((item,index) => {
                    get_transferReceipt_erc20({TransactionHash:item.transactionHash}).then(res => {
                        if(res.code === 0){
                            if(res.data){
                                this.transferData.splice(index,1)
                                this.transferList('refresh')

                            }
                        }else{
                            this.$toast(res.messages)
                        }
                    }).catch(err => {
                        // this.$toast('网络异常')
                    })
                })  
            //ETH
            }else{
                this.transferData.forEach((item,index) => {
                    get_transferReceipt({TransactionHash:item.transactionHash}).then(res => {
                        if(res.code === 0){
                            if(res.data){
                                this.transferData.splice(index,1)
                                 this.transferList('refresh')
                            }
                        }else{
                            this.$toast(res.messages)
                        }
                    }).catch(err => {
                        // this.$toast('网络异常')
                    })
                })  
            }
                
                this.pendingData = this.transferData
               

        },
        //区块高度
        chainInfo(){
            // clearInterval(this.transferTimer)
            let chainCode  = this.public_js.GetStorage('walletInfo').find(n => n.isMain).walletType
            get_chainInfo({ChainCode:chainCode}).then(res => {
                if (res.code === 0) {
                    this.$store.commit('blockNumber',res.data.lastBlockNumber)
                } else {
                    this.$toast(res.data.messages);
                }
            })
            .catch(err => {
                // this.$toast("网络异常");
            });
        },

        refresh(){    //刷新
            setTimeout(() => {
                this.transferList('refresh')
            },500)
        },
        scroll(event) {
            this.scrollTop = event.target.scrollTop
        },
        imgState(item){   //导出导入图片
            if(item.txStatus==0 ){
                return require('@/assets/images/wallet/fail.png')
            }else if(item.from.toLowerCase()===this.walletInfo.address.toLowerCase()){
                return require('@/assets/images/wallet/export.png')
            }else if(item.from.toLowerCase()!==this.walletInfo.address.toLowerCase()){
                return require('@/assets/images/wallet/import.png')
            }
        },
        tokenTabs(transactionData,active){    //切换token状态
            if(active==0){
                return transactionData
            }else if(active==1){
                return transactionData.filter(n => n.from.toLowerCase()!==this.walletInfo.address.toLowerCase() && n.txStatus === 1 )
            }else if(active==2){
                return transactionData.filter(n => n.from.toLowerCase()===this.walletInfo.address.toLowerCase() && n.txStatus === 1 )
            }else if(active==3){
                return transactionData.filter(n => n.txStatus === 0 )
            }
        },
        transfer(){   // 转账
            this.$router.push({path:'/wallet_transfer',query:{walletInfo:JSON.stringify(this.walletInfo)}})
        },
        viewTransferInfo(item){
            item.tokenAddress = this.walletInfo.tokenAddress;
            item.address = this.walletInfo.address
            item.tokenSymbol = this.walletInfo.tokenSymbol
            this.$router.push({path:'/transaction_detail',query:{transactionInfo:JSON.stringify(item)}})
        }

    },
}
</script>
<style scoped lang="scss">
.container-dapp{
    .header{
        height: 50px;
        border-bottom: 1px #eee solid;  
        background: #fff;     
        .back{
            line-height: 50px;
            font-size: 22px;
            margin-left: 15px;
            width: 30px;
        }
    }
    .t-content{
        .tokenEcharts-box{
            height: 120px;
            background: #eee;
            font-size: 18px;
            text-align: center;
            padding-top: 20px;
            p:nth-child(2){
                font-size: 30px;
                font-weight: 600;
            }
            p:nth-child(3){
                font-size: 16px;
            }
        }
        .pending-box{
            .pending-module{
                height: 40px;
                border-bottom: 1px solid #eee;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 10px;
                color: rgb(91, 166, 216);
                span:nth-child(1){
                    font-size: 13px;
                }
                .icon{
                    display: inline-block;
                }
            }
        }
        .token-box{
            // height: calc(100vh-305px);
            // overflow-y: scroll;
            .hot-module{
                min-height: 56px;
                padding: 5px 10px;
                display: flex;
                align-items: center;
                position: relative;
                .hot-img{
                    width: 30px;
                    height: 30px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .hot-info{
                    height: 100%;
                    padding: 8px 0;
                    box-sizing: border-box;
                    span{
                        display: block;
                        width:260px;
                        line-height: 20px;
                        padding: 0px 10px;
                        box-sizing: border-box;
                    }
                    span:nth-child(2){
                        font-size: 12px;
                        overflow:hidden; //超出的文本隐藏
                        text-overflow:ellipsis; //溢出用省略号显示
                        white-space:nowrap; //溢出不换行

                    }
                }
                .hot-state{
                    position: absolute;
                    top: 10px;
                    right: 12px;
                    width: 190px;
                    line-height: 40px;
                    text-align: right;
                    font-size: 18px;
                    overflow:hidden; //超出的文本隐藏
                    text-overflow:ellipsis; //溢出用省略号显示
                    white-space:nowrap; //溢出不换行
                    display: inline-block;
                }
                .txFail{
                    color: red;
                    font-size: 13px;
                    
                }
            }
            .foot-fill{
                height:50px;
            }
        }

    }
    .t-footer{
        height: 50px;
        position: fixed;
        bottom: 0px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #fff;
        .footer-btn{
            width: 48%;
            border-radius: 6px;
            background: #2364bc;
            border: 0;
        }
    }
    /deep/.van-tabs__line{
        z-index: 0;
    }
}
</style>