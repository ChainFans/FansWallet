<template>
    <div class="container-coinMaking">
        <Pageheader />
        <!-- <van-dropdown-menu style="height:42px">
          <van-dropdown-item v-model="coinMaking" :options="option" @change="change_coinMaking" />
        </van-dropdown-menu> -->
        <van-cell title="发行Token" is-link :value="tokenType" @click="Popupbox=true" />    
        <!-- <div class="issue_token" @click="Popupbox=true"> <van-button type="default" class="i-btn"> {{tokenType}} </van-button> </div> -->
        <van-cell-group>
          <van-field
            v-model="tokenName"
            required
            clearable
            label="Token简称"
            placeholder="1~16位字符（建议英文字母）"
            maxlength="50"
          />
          <van-field
            v-model="issueCount"
            label="发行总量"
            placeholder="0~9999999999"
            required
            maxlength="50"
            oninput = "value=value.replace(/[^\d]/g,'')"
          />
        </van-cell-group>
        <div class="coinMaking_btn">
          <van-goods-action-button type="warning" text="自定义" @click="$router.push({path:'custom_wallet'})"/>&nbsp;&nbsp;&nbsp; 
          <van-goods-action-button type="danger" text="支付" @click="go_pay"/>
        </div>

        <!-- 添加钱包 -->
        <van-popup v-model="Popupbox" closeable class="add_wallet">
        <div class="add_title">
            <font size="4">选择Token</font>
        </div>
        <div class="add_module" :class="{'disabled':item.disabled}" v-for="(item,index) in wallet_nav" :key="index" @click="select_token(item)">
            <div class="module_type">
                <div class="token-img">
                    <img :src="item.imgUrl">
                </div>
            
            <span>{{item.title}}</span>
            </div>
            <p v-if="item.disabled">开发中</p>
        </div>
        </van-popup>    

    </div>
</template>
<script>
import Pageheader from "@/components/pageheader";
export default {
    components: {
        Pageheader
    },
    data(){
        return{
            coinMaking: 'ETH',
            wallet_nav: [
                { title:'ETH',disabled:false,imgUrl:require('@/assets/images/token_logo/ETH.png')},
                { title:'EOS',disabled:true,imgUrl:require('@/assets/images/token_logo/EOS.png')},
                { title:'TRX',disabled:true,imgUrl:require('@/assets/images/token_logo/TRX.png')},
                { title:'NAS',disabled:true,imgUrl:require('@/assets/images/token_logo/NAS.png')}
            ],
            tokenName:'',
            issueCount:'',
            Popupbox:false,
            tokenType:'ETH'
        }
    },
    methods:{
        go_pay(){
            if(!this.tokenName){
                this.$toast('Token简称不能为空')
                return
            }
            if(!this.issueCount){
                this.$toast('发行总量不能为空')
                return
            }
            this.$router.push({
                path:'coinMaking',
                query:{
                tokenName:this.tokenName,
                issueCount:this.issueCount
                }})
        },
        change_coinMaking(){
            this.coinMaking= 'ETH'
            this.$toast('当前币未开通，目前仅支持ETH')
        },
        select_token(item){
            if(!item.disabled){
                this.Popupbox=false;
                this.tokenType=item.title
            }
        }
    }
}
</script>
<style scoped lang="scss">
/deep/.van-cell{
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 16px;
}
/deep/ .van-field__control{
    line-height: 30px;
    font-size: 16px;
}
.container-coinMaking{
    .issue_token{
        line-height: 42px;
        text-align: center;
        font-size: 16px;
        .i-btn{
            width: 100%;
        }
    }
    .coinMaking_btn{
        height: 60px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 10px;
        padding: 0 20px;
    }
    .add_wallet{
        width: 95%;
        height: 60%;
        background: rgb(250, 250, 250);
        .add_title{
        line-height: 50px;
        padding:0 20px;
        border-bottom: 1px solid #eee;
        background: #fff;
        }
        .add_module{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        border-bottom: 1px solid #eee;
        background: #fff;
        .module_type{
            display: flex;
            align-items: center;
            .token-img{
                width:26px;
                height: 26px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        span{
            font-size: 16px;
            margin-left: 10px;        
        }
        }
        .disabled{
        opacity: 0.5;
        }
    }
}
</style>