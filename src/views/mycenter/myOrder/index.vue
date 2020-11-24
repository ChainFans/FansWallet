<template>
    <div class="container-dapp">
        <pageheader></pageheader>
        <van-tabs v-model="order_active">
            <van-tab title="订制订单">
                <van-dropdown-menu>
                    <van-dropdown-item title="类型" v-model="order_type" :options="optionType" @change="changeType" />
                    <van-dropdown-item title="状态" v-model="order_state" :options="optionState" />
                </van-dropdown-menu>
                <div class="order-box">
                    <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="orderList"
                    >
                        <div v-if="orderData.length==0" class="no-data">暂无数据</div>
                        <div v-else class="order-list" v-for="(item,index) in orderData" :key="index" @click="$router.push({name:'orderInfo',params:{orderId:item.orderId}})">
                            <div class="o-header">
                                <div class="title">
                                    <div class="token_logo">
                                        <img src="@/assets/images/token_logo/ETH.png">
                                    </div>
                                    <span> {{item.tokenSymbol}} </span>
                                </div>
                                <span>{{item.createTime}}</span>
                            </div>
                            <div class="o-content">
                                <span class="price"></span>
                                <span class="totalSupply"> {{payState(item.orderStatus)}} </span>
                            </div>                            
                        </div>
                    </van-list>
                </div>
            </van-tab>
            <van-tab title="云产品订单"></van-tab>
        </van-tabs>
       

    </div>
</template>
<script>
import {get_orderList} from '@/api/mycenter/myOrder'
import pageheader from '@/components/pageheader'
export default {
    components:{pageheader},
    data() {
        return {
            loading: false,
            finished: false,
            order_active:0,
            orderData:[],
            allOrderData:[],
            order_type: 'token',
            order_state: 'all',
            optionType: [
                { text: 'token', value: 'token' },
                { text: 'dapp', value: 'dapp' },
            ],
            optionState: [
                { text: '全部', value: 'all' },
                // { text: '支付中', value: '支付中' },
                // { text: '部署中', value: '部署中' },
            ]
        }
    },
    created(){
        this.$toast.loading({
            mask: true,
            message: '加载中...'
        });
    },
    methods:{
        changeType(val){          
            if(val === 'token'){
                this.orderData = this.allOrderData.filter(n=> n.orderTag == "TOKEN")
            }else if(val === 'dapp'){
                this.orderData = this.allOrderData.filter(n=> n.orderTag == "DAPP")
            }
        },
        payState(item){
            switch (item) {
                case 0:
                    return '未支付'
                    break;
                case 10:
                    return '支付中'
                    break;
                case 20:
                    return '已支付'
                    break;
                case 25:
                    return '支付失败'
                    break;
            
                default:
                    break;
            }
        },
        orderList(){
            let params = {
                PageCount:12,
                GetType:'After',
                PagingParams:this.orderData.length
            }

            get_orderList(params).then(res => {
                this.$toast.clear();
                if(res.code === 0){
                    this.orderData = this.orderData.concat(res.data) 
                    this.allOrderData = this.orderData 
                this.loading = false;
                if (res.data.length < 12) {
                this.finished = true;
                }

                }else{
                    this.$toast(res.messages)
                }
                
            }).catch(err => {
                this.$toast('网络异常')
            })
        }
    }
}
</script>
<style scoped lang="scss">
/deep/.van-dropdown-menu {
    height: 40px;
}
/deep/.van-dropdown-menu__title{
    font-size: 14px;
}
.container-dapp{
    .order-box{
        height: calc(100vh - 130px);
        overflow-y: auto;
        .no-data{
            text-align: center;
            margin-top: 15px;
            color: #666;
        }
        .order-list{
            height: 80px;
            border-bottom: 1px solid #eee;
            padding: 0 10px;
            font-size: 16px;
            .o-header{
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                >span{
                    color: #666;
                    font-size: 14px;
                }
                .title{
                    display: flex;
                    align-items: center;
                    .token_logo{
                        width: 30px;
                        height: 30px;
                        margin-right: 10px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }           
                }

            }
            .o-content{
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .price{
                    color: #666;
                }
            }
        }
    }

}
</style>