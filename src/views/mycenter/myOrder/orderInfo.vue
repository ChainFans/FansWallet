<template>
    <div class="container-orderInfo">
        <pageheader></pageheader>
        <div class="order-info">
            <div class="order-content">
                <p><span>订单编号</span> {{orderInfoData.orderNo}}</p>
                <p><span>创建时间</span> {{orderInfoData.createTime}}</p>
                <p><span>订单状态</span> {{orderStatus(orderInfoData.orderStatus)}}</p>
                <p><span>支付时间</span> {{orderInfoData.payTime}}</p>
                <p><span>Token全称</span> {{orderInfoData.tokenName}}</p>
                <p><span>Token简称</span> {{orderInfoData.tokenSymbol}}</p>
                <p><span>小数位数</span> {{orderInfoData.tokenDecimals}}</p>
                <p><span>发行总量</span> {{orderInfoData.tokenTotalSupply}}</p>
                <!-- <p><span>哈希</span> {{public_js.ellipsAddress(orderInfoData.txHash)}}</p> -->
                <p><span>管理员地址</span> 
                    <font v-clipboard:copy="orderInfoData.tokenOwnerAddress" v-clipboard:success.stop="onCopy">
                        {{orderInfoData.tokenOwnerAddress?public_js.ellipsAddress(orderInfoData.tokenOwnerAddress):''}}
                    </font>
                </p>
            </div>

            <div class="order-option">
                <div class="token-type">
                    <img src="@/assets/images/token_logo/ETH.png" alt="">
                    <p>{{orderInfoData.tokenType}}</p>
                </div>
                <p class="options-box van-hairline--bottom" v-for="(item,index) in func_data" :key="index">
                    <span> {{item.funcName}} </span>
                    <span>{{item.funcPrice}} ETH</span>
                </p>
                <p class="price-box">
                    <span>合计</span>
                    <span>{{orderInfoData.totalAmount}} ETH</span>
                </p>

            </div>

        </div>
        <div>
            <van-button v-if="orderInfoData.orderStatus==0" type="primary" class="fast-pay" @click="showKeyboard=true">立即支付</van-button>
        </div> 
        <!-- 密码框 -->
        <van-dialog
        v-model="showKeyboard"
        confirmButtonText="确认支付"
        show-cancel-button
        @confirm="confirm_pay"
        @cancel="check_password=''"
        >
        <password-box :totalPrice="total_price" @payPassword="payPassword"></password-box>
        </van-dialog>    
       

    </div>
</template>
<script>
import passwordBox from '@/components/passwordBox'
import pageheader from '@/components/pageheader'
import {get_orderInfo} from '@/api/mycenter/myOrder'
import {order_pay} from '@/api/chaincloud/coin_making'
import CryptoJS from 'crypto-js'
export default {
    components:{pageheader,passwordBox},
    data() {
        return {
            showKeyboard:false,
            total_price:1,
            check_password:'',
            orderInfoData:{},
            func_data:[],
        }
    },
    created(){

       this.orderInfo()
    },
    computed:{
        totalAmount(){
            let price = 0;
            this.func_data.forEach(item => {
                price += item.price
            })
            return price
        },

    },
    methods:{
        confirm_pay(){
            if(!this.check_password){
                return
            }
            const password =CryptoJS.MD5(this.check_password).toString().toLocaleUpperCase() 
            let params = {
                orderId: this.orderInfoData.orderId,
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
                    // this.$toast.success('订单支付成功')
                    this.$router.push({name:'successPay'})

                }else{
                    this.$toast(r.data.messages)
                }
            }).catch(err => {
                this.$toast('网络异常')
            })

        },
        orderStatus(state){
            switch (state) {
                case 0:
                    return '待支付'
                    break;
                case 10:
                    return '支付中'
                    break;
                case 20:
                    return '支付成功'
                    break;
                case 25:
                    return '支付失败'
                    break;           
                default:''
                    break;
            }
        },
        payPassword(val){
            this.check_password = val
        },
        orderInfo(){
            let params = {
                OrderId:this.$route.params.orderId,
                DetailId:''
            }
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true
            });
            get_orderInfo(params).then(res => {
                this.$toast.clear();
                if(res.code === 0){
                    this.orderInfoData = res.data
                    this.func_data = this.orderInfoData.tokenFunctionModels
 

                        
                }else{
                    this.$toast(res.messages)
                }

            }).catch(err =>{
                this.$toast('网络异常')
            })
        },
        onCopy(e) {
            this.$toast("复制成功");
        },
    }
}
</script>
<style scoped lang="scss">
.container-orderInfo{
    font-size: 16px;
    height: 100vh;
    background: #eee;
    .order-info{
        .order-content{
            padding: 10px 15px;
            background: #fff;
            p{
                height: 30px;
                font-size: 15px;
                span{
                    color: #888;
                    margin-right: 10px;
                }
            }
        }
        .order-option{
            margin-top: 10px;
            min-height: 200px;
            background: #fff;
            .token-type{
                height: 80px;
                text-align: center;
                padding: 10px 0;
                img{
                    height: 50px;
                }
            }
            .options-box{
                height: 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 15px;
                span:nth-child(2){
                    color: red;
                }
            }
            .price-box{
                line-height: 50px;
                text-align: right;
                padding: 0 15px;
                span:nth-child(2){
                    color: red;
                    margin-left: 10px;
                }
            }
        }
    }
    .fast-pay{
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #2364bc;
        border: 0;
    }
}
</style>