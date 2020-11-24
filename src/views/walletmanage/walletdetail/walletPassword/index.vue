<template>
    <div class="container-dapp">
        <pageheader></pageheader>
        <van-field v-model="OldPassword" type="password" label="原密码" placeholder="请输入原密码" />
        <van-field v-model="password" type="password" label="新密码" placeholder="请输入新密码" />
        <van-field v-model="surePassword" type="password" label="确认密码" placeholder="请输入确认密码" />
        <van-button type="default" class="confirm" @click="confirm">确定</van-button>

    </div>
</template>
<script>
import pageheader from '@/components/pageheader'
import {setWalletPassword} from '@/api/wallet'
import CryptoJS from "crypto-js";
export default {
    components:{pageheader},
    data() {
        return {
            OldPassword:'',
            password:'',
            surePassword:'',
        }
    },
    created(){
       
    },
    methods:{
        confirm(){
            if(!this.OldPassword || !this.password || !this.surePassword ){
                this.$toast('密码不能为空')
                return 
            }
            if(this.password !== this.surePassword){
                this.$toast('两次输入密码不一致！')
                return 
            }
            let params = {
                WalletId:this.$route.query.walletId,
                OldPassword:this.OldPassword,
                Password:this.password,
            }
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            
            setWalletPassword(params).then(res => {
                this.$toast.clear()
                if(res.code === 0){
                    this.$toast.success('修改成功')
                    this.$router.back()
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
<style scoped lang="scss">
/deep/.van-cell{
    line-height: 26px;    
}
/deep/ .van-field__control{
    line-height: 26px;   
}
.container-dapp{
    .confirm{
        width: 90%;
        background: #2364bc;
        color: #fff;
        border-radius: 20px;
        margin: 30px 50%;
        transform: translate(-50%);
    }
}
</style>