<template>
    <div class="container-outerChain">
        <!-- <div class="header van-hairline--bottom">
           
        </div> -->
        <div class="payShow-box">
            <div class="title">
                <span><b>等待支付</b></span>
            </div>
            <div class="order-info">
                <div class="token-logo">
                    <img src="@/assets/images/token_logo/ETH.png">
                </div>

            </div>
            
            <div class="btn-box">
                <van-button type="default" round class="btn" @click="$router.push({name:'chaincloud'})">返回首页</van-button>&emsp;&emsp;&emsp;
                <van-button type="default" round class="btn" @click="$router.push({name:'myToken'})">查看订单</van-button>
            </div>
                <van-cell title="Token简称" :value="orderInfo.issueCount" />    
                <van-cell title="发行总量" :value="orderInfo.tokenName" />
                <!-- <p>购买的功能</p>  -->
                <van-cell :title="item.name" :value="item.price+'ETH'" value-class="price" v-for="(item,index) in options" :key="index" />
        </div>

        <van-button v-if="showBtn" type="info" class="sure_pay" @click="showKeyboard=true">确认支付</van-button>

        <!-- 支付密码 -->
        <van-dialog
        v-model="showKeyboard"
        confirmButtonText="确认支付"
        show-cancel-button
        @confirm="confirm_pay"
        @cancel="showKeyboard=false"
        >
        <password-box :totalPrice="total_price" @payPassword="payPassword"></password-box>
        </van-dialog>

    </div>
</template>
<script>
import { order_pay} from '@/api/chaincloud/coin_making'
import passwordBox from '@/components/passwordBox'
import CryptoJS from 'crypto-js'
export default {
    components:{
        passwordBox   
    },
    data() {
        return {
           clientHeight:document.documentElement.clientHeight,
           showBtn: true,  // 控制按钮显示隐藏
           orderInfo:{},
           options:[{name:'基本功能',price:1}],
           showKeyboard:false,
        }
    },
    created(){
        this.orderInfo = this.$route.params.cancelOrder
        if(this.orderInfo.options){
            this.options = this.options.concat(this.orderInfo.options)
        }

        console.log(this.$route.params.cancelOrder)
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
        total_price(){
            let price = 0;
            this.options.forEach(item => {
                price += item.price
            })
            return price
        }
    },
    methods:{
            payPassword(val){
                this.check_password = val
            },
            confirm_pay(){   //确定支付
                if(!this.check_password){
                    return
                }
                const password =CryptoJS.MD5(this.check_password).toString().toLocaleUpperCase() 
                let params = {
                    orderId: this.orderInfo.orderId,
                    payPassword:password
                }
                this.$toast.loading({
                    duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    loadingType: 'spinner',
                    message: '订单生成中'
                });
                order_pay(params).then(r => {
                    this.$toast.clear();
                    if(r.data.code === 0){
                        let options = [];
                        this.options.forEach(item => {                       
                            options.push(item.name)
                        })
                    
                        this.$router.push({name:'successPay',params:{options:options}})

                    }else{
                        this.$toast(r.data.messages)
                    }
                }).catch(err => {
                    this.$toast('网络异常')
                })



        },
    }

}
</script>
<style scoped lang="scss">
.container-outerChain{
    font-size: 16px;
    .header{
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 18px;
        padding: 0 10px;
        .back{
            font-size: 20px;
        }
    }
    .payShow-box{
        height: 180px;
 
        .order-info{
            
            .token-logo{
                text-align: center;
            }
            img{
                width:60px;
                height: 60px;
                margin: 0 auto;
            }

        }
        .title{
            span{
                font-size: 28px;
                color: #2364bc;
              
            }
        }
        .btn-box{
            border-bottom: 1px solid #eee;
            .btn{
                width: 100px;
            }
        }
        .title,.btn-box{
            height: 90px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .price{
        color: red;
    }
    .sure_pay{
        width: 100%;
        position: absolute;
        bottom: 0;
        background: #2364bc;
        border: 0;

    }


}
</style>