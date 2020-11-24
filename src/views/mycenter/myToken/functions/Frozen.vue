<template>
    <div class="func-container">
        <pageheader></pageheader>

        <div class="text-content">
            {{ public_js.getSketch($route.name) }}
        </div>
        <div class="input-box cell">
            <span>冻结地址&emsp;</span><br>
            <input v-model="frozenAddress" placeholder="请输入冻结地址" type="text" class="font12">
            <span class="book">
                <van-icon name="column" @click="address_show=true" />
            </span>
        </div>
        <div class="frozen-state" >           
            <span>冻结状态</span>
            <span>{{ frozenStateData==1?'已冻结':frozenStateData==0?'未冻结':'' }}</span>
            
            <van-button type="default" class="frozen-btn" @click="frozenState" :disabled="frozenAddress.length!==42">查询</van-button>&nbsp;
        </div>
        <div class="btn-box">
            <van-button type="info" class="confirm" @click="formTest(1)">冻结</van-button>&nbsp;
            <van-button type="info" class="confirm" @click="formTest(0)">解冻</van-button>
        </div>
        <!-- <div class="history-box">
            <p class="title"><b>历史增发</b></p>
            <p class="h-header">
                <span>时间</span>
                <span>数量</span>
                <span>地址</span>
            </p>
        </div> -->

        <!-- 地址薄 -->
        <van-popup
            v-model="address_show"
            position="right"
            :style="{ width:'100%',height: '100%' }"
        >
        <address-book @transfer_address="transfer_address"></address-book>
        </van-popup>

        <!-- 钱包密码    -->
        <van-dialog
            v-model="password_show"
            title="请输入钱包密码"
            show-cancel-button
            @confirm="confirm"
            @cancel="password=''"
        >
            <div class="password-box">
                <van-field v-model="password" class="input" type="password" ref="input" />
            </div>
        </van-dialog>
    </div>
</template>
<script>
import pageheader from '@/components/pageheader'
import addressBook from '@/components/address_book'
import {frozen, get_frozenState} from '@/api/mycenter/myToken'
import CryptoJS from "crypto-js";
export default {
    components:{pageheader, addressBook},
    data(){
        return{
            frozenAddress:'',
            address_show:false,
            tokenAddress:'',
            frozenStateData:-1,
            password_show:false,
            password:'',
            IsFrozenState:0,
        }
    },
    created(){
        this.token_info = this.$route.params.token_info
    },
    watch:{
        frozenAddress(state){
            this.frozenStateData = -1
        }
    },
    methods:{
        transfer_address(item){
            this.address_show = false;
            if(item){
                this.frozenAddress = item
            }
        },
        formTest(state){
            if(!this.frozenAddress){
                this.$toast('增发地址不能为空')
                return
            }else if( this.frozenAddress.startsWith('0x')&&this.frozenAddress.length!==42 || !this.frozenAddress.startsWith('0x')&&this.frozenAddress.length!==40 ){
                this.$toast('增发地址无效')
            }else{
                this.$dialog.alert({
                title: '提示',
                message:state==1?'成功冻结后，冻结的账号将不能正常转账':'成功解冻后，解冻的账号将可以正常使用'
                }).then(() => {
                    this.password_show=true
                    this.IsFrozenState = state
                    this.$nextTick(() => {this.$refs['input'].focus()})
                }); 
            }
        },
        confirm(){
            let params = {
                Address:this.frozenAddress,
                IsFrozen:this.IsFrozenState,
                TokenAddress:this.token_info.contractAddress,
                password:this.password
            }
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            this.password = ''
            frozen(params).then(res => {
                this.$toast.clear()

                if(res.code === 0){
                    this.$toast.success('设置成功')
                    this.$router.back()
                }else{
                    this.$toast(res.messages)
                }
            }).catch(err => {
                this.$toast.clear()
                this.$toast('网络异常')
            })
        },
        frozenState(){  
            let params = {
                TokenAddress:this.token_info.contractAddress,
                Address:this.frozenAddress
            }
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            get_frozenState(params).then(res => {
                this.$toast.clear()
                if(res.code === 0){
                    this.frozenStateData = res.data.status
                }else{
                    this.$toast(res.messages)
                }
            }).catch(err => {
                this.$toast.clear()
                this.$toast('网络异常')
            })
        } 
    }
}
</script>
<style lang="scss" scoped>
input::-webkit-input-placeholder { /* WebKit browsers */ 
    color: #999; 
} 
.font12{
    font-size: 14px;
}
.func-container{
    padding: 0 20px;
    font-size: 16px;
    .input-box{
        position: relative;
        input{
            border:0;           
            border-bottom: 1px solid #eee;
            width: 300px;
            font-size: 12px;
        }
        .book{
            position: absolute;
            top: 25px;
            right: 5px;
        }
    }
    .frozen-state{
        height: 50px;
        display: flex;
        align-items: center;
        span:nth-child(2){
            width: 210px;
            line-height: 100%;
            padding-left: 15px;
            box-sizing: border-box;
            display: inline-block;
        }
        .frozen-btn{
            border: 0;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            background: #2364bc;
            color: #fff;
            border-radius: 10px;
        }
    }
    .text-content{
        height: 100px;
        padding: 10px 0;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #666;
    }
    .cell{
        height: 46px;
        // display: flex;
        // align-items: center;
        
    }
    .btn-box{
        text-align: center;
        .confirm{
            width: 46%;
            margin: 30px auto;
            border-radius: 20px;
            background: #2364bc;
            border: 0;
            
        }

    }
    .history-box{
        height: 250px;
        margin-top: 30px;
        overflow-y: auto;
        .h-header{
            display: flex;
            line-height: 30px;
            span{
                flex:1;
                text-align: center;
                font-size: 14px;
                
            }
        }
    }
    .password-box{
        height: 70px;
        .input{
            width: 90%;
            margin: 20px auto;
            border: 1px solid #c9c9c9;
            border-radius: 5px;
        }
    }
}
</style>