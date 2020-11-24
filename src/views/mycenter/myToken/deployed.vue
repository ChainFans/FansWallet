<template>
    <div class="container-deployed">
        <pageheader></pageheader>
        <div class="alreadyPay-box">
            <div class="token-header">
                <div class="tokenLogo">
                    <img src="@/assets/images/token_logo/ETH.png">
                </div>
                <div class="token-name">
                    <p><b>{{token_info.tokenSymbol}}</b>&nbsp; <span>{{token_info.tokenName}}</span></p> 
                    <p>余额：{{token_info.tokenOwnerBalance}}</p>
                    <p class="token-number">总量：{{token_info.tokenTotalSupply}} </p>
                </div>
                <van-tag round class="tokenType">{{token_info.tokenType}}</van-tag>
            </div>
            <van-tabs type="card" color="#2364bc" class="tabs"  v-model="content_active">
                <van-tab title="概述">
                    <div class="sketch-text">
                        Ethereum（以太坊）是一个平台和一种编程语言，使开发人员能够建立和发布下一代分布式应用。Ethereum可以用来编程，分散，担保和交易任何事物：投票，域名，金融交易所，众筹，公司管理，合同和大部分的协议，知识产权，还有得益于硬件集成的智能资产。    
                    </div>
                    <div class="sketch-box van-hairline--top">
                        <p>发行时间 <span> {{token_info.createTime.slice(0,10)  }} </span></p>
                        <p>总供应量 <span>{{token_info.tokenTotalSupply}}</span></p>
                        <p>合约版本 <span>{{token_info.contractVersion}}</span></p>
                        <p>协议类型 <span>{{token_info.protocol}}</span></p>
                        <p>小数位数 <span>{{token_info.tokenDecimals}}</span></p>
                        <div class="dapp"><div class="txt">合约地址</div>  <div class="address"
                        v-clipboard:copy="token_info.contractAddress" v-clipboard:success.stop="onCopy"
                        >{{token_info.contractAddress? public_js.ellipsAddress(token_info.contractAddress):''  }}</div></div>
                        <p>管理员地址 <span
                        v-clipboard:copy="token_info.tokenOwnerAddress" v-clipboard:success.stop="onCopy"
                        >{{token_info.tokenOwnerAddress?public_js.ellipsAddress(token_info.tokenOwnerAddress):''}}</span></p>
                    </div>
                    <div class="detailed-info">
                        <div class="detailed-img">    
                            <img src="@/assets/images/my_center/etherscan.png" alt=""> 
                        </div>
                        <span @click="$router.push({path:'/queryContract',query:{url:'https://cn.etherscan.com/token/'+token_info.contractAddress}})">到 Etherscan 查询更详细信息></span>                       
                    </div>
                    <div class="link-box ">
                        <van-tabs v-model="relevant_active" animated color="#2364bc">
                            <van-tab title="相关链接">
                                <!-- <p class="link-title">相关链接</p> -->
                                <br>
                                <div class="link"> 
                                    <p>
                                        <van-icon :name="require('@/assets/images/my_center/website.png')" />   
                                        &nbsp;官网地址<span @click="$router.push({name:'outer_chain',query:{url:'https://www.ethereum.org'}})">&emsp;www.ethereum.org</span>
                                    </p>
                                    <p>
                                        <van-icon :name="require('@/assets/images/my_center/block_station.png')" />
                                        &nbsp;区块站<span @click="$router.push({name:'outer_chain',query:{url:'https://www.yitaifang.com/'}})">&emsp;&emsp;www.yitaifang.com</span>
                                    </p> 
                                    <p>
                                        <van-icon :name="require('@/assets/images/my_center/write_book.png')" />
                                        &nbsp;白皮书<span @click="$router.push({name:'outer_chain',query:{url:'http://www.bitcoin.org/bitcoin.pdf'}})">&emsp;&emsp;www.bitcoin.org/bitcoin.pdf</span>
                                    </p> 
                                    <!-- <p>
                                        <van-icon :name="require('@/assets/images/my_center/social_contact.png')" />
                                        &nbsp;社交网站<span @click="$router.push({name:'outer_chain',query:{url:'https://github.com/ethereum/go-ethereum'}})">&emsp;github.com</span>
                                    </p>  -->
                                </div>
                            </van-tab>
                            <van-tab title="钱包">
                                <div class="wallet-list">
                                    <div class="header">
                                        <span>名称</span>
                                        <span>钱包类别</span>
                                        <span>安全性</span>
                                    </div>
                                    <div class="content">
                                        <div class="module">
                                            <div>
                                                <div class="wallet_img">
                                                    <img src="@/assets/images/my_center/token_logo/coinbase.png" alt="">
                                                </div>&nbsp;
                                                <span>Coinbase</span>
                                            </div>
                                            <div>
                                                app pc
                                            </div>
                                            <div>
                                                中等
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </van-tab>
                            <van-tab title="交易所">
                                <div class="wallet-list">
                                    <div class="header">
                                        <span>交易平台</span>
                                        <span>资产(¥)</span>
                                        <span>交易对(个)</span>
                                    </div>
                                    <div class="content">
                                        <div class="module">
                                            <div>
                                                <div class="wallet_img">
                                                    <img src="@/assets/images/my_center/token_logo/HitBTC.png" alt="">
                                                </div>&nbsp;
                                                <span>HitBTC</span>
                                            </div>
                                            <div>
                                                370.59万
                                            </div>
                                            <div>
                                                683
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </van-tab>
                        </van-tabs>    



                    </div>
                </van-tab>
                <van-tab title="功能">
                    <div class="options-box" v-if="funcList.slice(1).some(n => n.isSelect)">
                            <div class="options-module" v-for="item in funcList.slice(1)" :key="item.funcId" @click="setFunc(item)" v-show="item.isSelect">
                                <div class="options-bg" :class="{isOpening:item.isSelect}">
                                    <span>{{ item.funcName.slice(0,2) }}</span><br>
                                    <!-- <span >{{item.isSelect?'已开通':'未开通'}}</span> -->
                                </div>
                            </div>
                        
                    </div>    
                    <div v-else class="no-use">当前没有已开通的附加功能</div>
                </van-tab>
            </van-tabs>
        </div>

    
    </div>
</template>
<script>
import pageheader from '@/components/pageheader'
import {get_tokenInfo} from '@/api/mycenter/myToken'
export default {
    components:{pageheader},
    data() {
        return {
            token_info:{},
            func_data:[],
            funcList:[],
            relevant_active:0,
            content_active:0,
            token_data:{},
            password_show:false,
            wallet_password:''
        }
    },
    created(){
        this.token_info = JSON.parse(this.$route.query.token_info);
        this.tokenInfo()

    },
    activated(){

    },
    beforeRouteEnter(to,from,next){
        next((vm)=>{ 
            if(from.name == 'myToken'){    
                vm.content_active=0
                vm.token_info = JSON.parse(vm.$route.query.token_info);

                vm.tokenInfo()


            }else{
            }
        })
    },
    methods:{
        setFunc(item){       
            if(item.funcCode =='Burnable' && item.isSelect || item.funcCode =='Increase' && item.isSelect || item.funcCode =='Frozen' && item.isSelect ){

                this.$router.push({name:item.funcCode,params:{token_info: this.token_info }})
            }else{
                this.$toast('此功能未开通')
            }

        },
        tokenInfo(){
            let params = {
                tokenId:this.token_info.tokenId,
                DetailId:''
            }
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            get_tokenInfo(params).then(res => {
                this.$toast.clear();
                if(res.code ===0){
                    this.token_info = res.data

                    if(window.plus){
                        this.funcList = JSON.parse(plus.storage.getItem('funcList'))
                    }else{
                        this.funcList = JSON.parse(localStorage.getItem('funcList'))
                    }
                    this.funcList.forEach(item1 => { 
                        this.token_info.tokenFunctions.forEach(item2 => {
                            if(item1.funcCode == item2.funcCode){
                                item1.isSelect = true
                            }
                        })
                    });
                   


                }else{
                    this.$toast(res.messages)
                }
            }).catch(err => {
                this.$toast('网络异常')
                this.$toast.clear();
            })
        },
        onCopy(e) {
            this.$toast("复制成功");
        },
    }
}
</script>
<style scoped lang="scss">
.container-deployed{
    .alreadyPay-box{
        width: 100%;
        height: 100%;
        .token-header{
            display: flex;
            align-items: center;
            padding: 0 15px;
            margin-top: 15px;
            height: 90px;
            position: relative;
            margin-bottom: 10px;
            .tokenLogo{
                width: 80px;
                height: 80px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .token-name{
                margin-left: 15px;
                p:nth-child(1){
                    font-size: 22px;
                    span{
                        color:#999;
                    }
                }
                p:nth-child(2){
                    font-size: 16px;
                    
                    
                }
                .token-number{
                    font-size: 16px;
                }
                .recharge{
                    background: #2364bc;
                }
                .cash-withdrawal{

                    color: #2364bc;
                }
                .recharge,.cash-withdrawal{
                    border: 1px solid #2364bc;
                    border-radius: 5px;
                }
            }
            .token-price{
                color:red;
                margin-bottom:3px;
                font-size:13px
            }
            .token-number{
                margin-bottom:10px;
                font-size:13px
            }

            
            .tokenType{
                position: absolute;
                top: 0;
                right: 15px;
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 13px;
            }
        } 
        .tabs{
            padding-top: 10px;
        } 
        .sketch-text{
            padding: 10px 15px 10px;
            color: #555;
        } 
        .sketch-box{
            padding: 5px 15px;
            font-size: 12px;
            height: 160px;
            color: #999;
            p{
                margin-top: 5px;

                span{
                    margin-left: 10px;
                    font-size: 13px;
                    color: #333;
                }
            }
            .dapp{
                display: flex;
                margin-top: 5px;
                .txt{
                    width: 60px;
                }
                .address{
                   color: #000;
                   font-size: 13px;
                   word-wrap:break-word;
                   width: 285px;
                }
            }
        }
        .detailed-info{
            margin-top: 5px;
            height: 30px;
            color: #457dcc;
            display: flex;
            justify-content: center;
            align-items: center;
            .detailed-img{
                width: 15px;
                height: 15px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .link-box{
            padding: 10px 15px;  
            .link-title{
                font-size: 18px;
                font-weight: 600;
                  
            }
            .link{
                p{
                    height: 24px;
                    display: flex;
                    align-items: center;
                    font-size: 13px;
                    span{
                        color: #457dcc;
                    }
                }

            }
            .wallet-list{
                .header{
                    height: 30px;
                    background: #eee;
                    display: flex;
                    align-items: center;
                    color: #333;
                    span{
                        flex: 1;
                        display: flex;
                        justify-content: center;
                    }
                }
                .content{
                    .module{
                        height: 40px;
                        display: flex;
                        border-bottom: 1px solid #eee; 
                        .wallet_img{
                            width: 16px;
                            height: 16px;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        >div{
                            flex: 1;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            
                        }
                    }
                }
            }
        }
        .options-box{
            width: 100%;
            height: 210px;
            padding: 0 10px;
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            // border-top: 1px solid #eee;
            .options-module{
                flex-basis: 25%;
                // border-right: 1px solid #eee;
                // border-bottom: 1px solid #eee;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                text-align: center;
                padding:0 5px;
                margin-bottom: 10px;
                .options-bg{
                    width: 100%;
                    height: 90px;
                    background: #ececec8c;
                    border-radius: 9px;
                    box-shadow: 3px 3px 7px rgba(212, 212, 212, 0.9);
                    padding: 25px 0;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    span{
                        
                    }
                    span:nth-child(1){
                        font-size: 16px;
                        font-weight: 550;
                    }
                }
                .isOpening{
                    background: #87d7f7;
                    span{
                        color: #fff;    
                    }
                }
            }
        }
        .no-use{
            width: 100%;
            text-align: center;
            color: #949494;
            font-size: 14px;
            margin-top: 15px;
        }
    }
}
</style>