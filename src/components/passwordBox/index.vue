<template>
    <div>
        <div class="payInfo-box">
            <div class="box">
                <p><b style="color:red">{{public_js.totalPrice(totalPrice)}}<span>ETH</span></b></p>
                <p>优惠 <b style="color:red">0ETH</b></p>
            </div>
        </div>
        <div class="wallet_pay">
                      
                <span><b>支付钱包</b></span><br>
                <span>钱包名称&emsp; {{walletInfo.walletName}} </span>
            <p>钱包地址&emsp;
                {{ walletInfo? public_js.ellipsAddress(walletInfo.address,8) :'' }}
            </p>
        </div>
        <van-field v-model="check_password" placeholder="请输入钱包密码" size="large" ref="input" type="password" class="password-btn" @change="inputPassword" />
        <div class="remark-info">
            支付后需等待大约2~5分钟区块确认,具体时间根据以太坊网络拥堵情况
        </div>    
    </div>
</template>
<script>
export default {
    props:['totalPrice'],
    data(){
        return{
            check_password:'',
            walletInfo:{}
        }
    },
    created(){
        if(window.plus){
           this.walletInfo =  JSON.parse(plus.storage.getItem('tokenList'))
        }else{
           this.walletInfo =  JSON.parse(localStorage.getItem('tokenList'))
        }

    },
    mounted(){       

        this.$nextTick(() => {this.$refs['input'].focus()})
    },
    methods:{
        inputPassword(){
            this.$emit('payPassword',this.check_password)
            this.check_password = ''
        }
    }
}
</script>
<style scoped lang="scss">

    .payInfo-box{
        height: 70px;
        color: #000;
        
        .box{
            text-align: center;
            margin-top: 20px;
            p{
                margin-top: 5px;
            }
            p:nth-child(1){
                font-size: 28px;
                margin-left: 14px;
                span{
                    font-size: 16px;
                }
            }
            p:nth-child(2){
                text-align: right;
                padding: 0 15px;
                font-size: 15px;
            }
        }
    }
    .wallet_pay{
        height: 80px;
        padding: 20px 40px 0;
        text-align: left;
        font-size: 14px;
        span:nth-child(1){
            font-size: 16px;
            margin-bottom: 5px;
        }
    }
    .remark-info{
        height:50px;font-size:12px;color:#666;text-align: center;margin-top: 5px;padding: 0 30px;
    }
    .password-btn{
        border:1px #2364bc solid;border-radius:8px;margin:0 auto;width:240px;font-size: 16px
    }
</style>