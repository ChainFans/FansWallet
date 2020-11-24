<template>
    <div class="func-container">
        <pageheader></pageheader>

        <div class="text-content">
            {{ public_js.getSketch($route.name) }}
        </div>
        <p class="cell"><span class="shallow">总量</span>&emsp;{{token_info.tokenTotalSupply}}</p>
        <!-- <p class="cell">余额&emsp; {{token_info.tokenOwnerBalance}}</p> -->
        <div class="input-box cell">
            <span class="shallow">增发数量&emsp;</span>
            <input v-model="increaseAmount" placeholder="请输入增发数量" type="text" class="font14" oninput = "value=value.replace(/[^\d]/g,'')">
        </div>
        <div class="input-box cell ">
            <span class="shallow">增发地址&emsp;</span><br>
            <input v-model="increaseAddress" placeholder="请输入增发地址" type="text" class="font12 add-width">
            <span class="book">
                <van-icon name="column" @click="address_show=true" />
            </span>
        </div>
        <div class="btn-box">
            <van-button type="info" class="confirm" @click="formTest">确定</van-button>
        </div>
        <div class="history-box">
            <p class="title"><b>历史增发</b></p>
            <p class="h-header">
                <span>时间</span>
                <span>数量</span>
                <span>地址</span>
            </p>
            <p class="emptyData" v-if="historyData.length==0"> 暂无历史数据 </p>
            <p class="h-header font12" v-for="(item,index) in historyData" :key="index" v-else>
                <span> {{ public_js.transformationTime(item.timeStamp*1000).slice(0,16) }} </span>
                <span> {{item.value}} </span>
                <span> {{public_js.ellipsAddress(item.toAddress,6)  }} </span>
            </p>
        </div>

        <div class="detailed-info">
            <div class="detailed-img">    
                <img src="@/assets/images/my_center/etherscan.png" alt=""> 
            </div>
            <span @click="$router.push({path:'/queryContract',query:{url:'https://cn.etherscan.com/token/'+token_info.contractAddress}})">到 Etherscan 查询更详细信息></span>                       
        </div>
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
import {increase, get_historyIncrease} from '@/api/mycenter/myToken'
import CryptoJS from "crypto-js";
export default {
    components:{pageheader, addressBook},
    data(){
        return{
            increaseAmount:'',
            increaseAddress:'',
            address_show:false,
            tokenAddress:'',
            historyData:[],
            password_show:false,
            password:''
        }
    },
    created(){
        this.token_info = this.$route.params.token_info
        this.historyList()
        console.log(this.token_info)
    },
    methods:{

        transfer_address(item){
            this.address_show = false;
            if(item){
                this.increaseAddress = item
            }
        },
        formTest(){
            if(!this.increaseAmount){
                this.$toast('增发数量不能为空')
                return
            }else if(   Number(this.token_info.tokenTotalSupply)  < Number(this.increaseAmount)){
                this.$toast('增发数量不能超过总量')
            }else if(!this.increaseAddress){
                this.$toast('增发地址不能为空')
                return
            }else if( this.increaseAddress.startsWith('0x')&&this.increaseAddress.length!==42 || !this.increaseAddress.startsWith('0x')&&this.increaseAddress.length!==40 ){
                this.$toast('增发地址无效')
            }else{
                this.$dialog.alert({
                title: '提示',
                message: '成功增发后，增发的数量将不可恢复'
                }).then(() => {
                    this.password_show=true
                    this.$nextTick(() => {this.$refs['input'].focus()})
                }); 





            }
        },
        confirm(){

            let params = {
                Amount:this.increaseAmount,
                Address:this.increaseAddress,
                TokenAddress:this.token_info.contractAddress,
                password:this.password
            }
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            this.password = ''
            increase(params).then(res => {
                this.$toast.clear()

                if(res.code === 0){
                    this.$toast.success('设置成功')
                    this.$router.back()
                }else{
                    this.$toast(res.messages)
                }
            }).catch(err => {
                this.$toast.clear()
                this.$toast('服务器异常')
            })
        },
        historyList(){
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            get_historyIncrease({TokenAddress:this.token_info.contractAddress}).then(res => {
                this.$toast.clear()
                if(res.code === 0){
                    this.historyData = res.data
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
<style lang="scss" scoped>
input::-webkit-input-placeholder { /* WebKit browsers */ 
    color: #999; 
} 
.font12{
    font-size: 12px;
}
.font14{
    font-size: 14px;
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
.detailed-info{
    height: 30px;
    color: #457dcc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    .detailed-img{
        width: 15px;
        height: 15px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
.func-container{
    padding: 0 20px;
    font-size: 16px;
    .input-box{
        position: relative;
        input{
            border:0;           
            border-bottom: 1px solid #eee;
            width: 230px;
        }
        .add-width{
            width: 310px;
        }
        .book{
            position: absolute;
            top: 25px;
            right: 5px;
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
        .shallow{
            color: #333;
        }
        
    }
    .btn-box{
        text-align: center;
        .confirm{
            width: 100%;
            margin: 20px auto;
            border-radius: 20px;
            background: #2364bc;
            border: 0;
        }

    }
    .history-box{
        height: 250px;
        overflow-y: auto;
         font-size: 14px;
        .h-header{
            display: flex;
            line-height: 30px;
            border-bottom: 0.3px solid #eee;
            span{
                flex:1;
                text-align: center;
               
                
            }
        }
        .emptyData{
            text-align: center;
            color: #c9c9c9;
            margin-top: 20px;
        }
    }
}
</style>