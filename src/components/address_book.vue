<template>
    <div class="container-address">
        <div class="header van-hairline--bottom" :style="{'padding-top':$store.state.appTop}">
            <van-icon name="arrow-left" class="back" @click="select_address()" />&emsp;地址薄
        </div>
        <van-tabs>
            <van-tab title="钱包地址">
                <div class="wallet_address" v-for="item in addressWallet_list" :key="item.walletId" @click="select_address(item.address)">
                    <div class="module">
                        <span> <b>{{ item.walletType }}</b> </span>
                        <span> {{ item.walletName }} </span>
                        <p> {{item.address}} </p>
                    </div>
                </div>

            </van-tab>
            <van-tab title="地址薄">
                <div class="wallet_address" v-for="item in addressBook_list" :key="item.walletId" @click="select_address(item.address)">
                    <div class="module">
                        <span> <b>{{ item.addressType }}</b> </span>
                        <span> {{ item.addressName }} </span>
                        <p> {{item.address}} </p>
                    </div>
                </div>
            </van-tab>
        </van-tabs>


    </div>
</template>
<script>
import {get_address_wallet, get_address_book} from '@/api/chaincloud/address_book' 
export default {
    props:['walletType'],
    data() {
        return {
            addressWallet_list:[],
            addressBook_list:[],
        }
    },
    created(){
        this.address_list()
    },

    methods:{
        address_list(){
            this.addressWallet_list = this.public_js.GetStorage('walletInfo').filter(n => n.walletType === this.walletType)
            this.addressBook_list = this.public_js.GetStorage('addressBook').filter(n => n.addressType === this.walletType)
        },
        select_address(item){
            this.$emit('transfer_address',item)
        }

    }

}
</script>
<style scoped lang="scss">
.container-address{
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

        .address-header{
            height: 50px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eee;
            font-size: 20px;
            padding: 0 15px;
            span{
                font-size: 16px;
            }
        }
        .wallet_address{
            height: 50px;
            border-bottom: 1px solid #eee;
            padding: 5px 20px;
            display: flex;
            align-items: center;
            .module{
                span{
                    margin-right: 20px;
                }
                p{
                    color: #666;
                    font-size: 12px;
                }
            }
        }
    
}
</style>