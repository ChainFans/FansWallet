<template>
    <div class="container">
        <Pageheader />
        <div class="main">
            <div class="header-explain">
                <div class="title">{{statusType==1?'创建身份':'恢复身份'}}</div>
                <p>你将会拥有身份下的多链钱包，比如ETH、BTC、EOS...</p>
            </div>
            <div class="form-box">
                    <van-field v-if="statusType==1" class="input" v-model="identityData.name" :border="false" placeholder="身份名" />
                    <van-field
                    v-else
                    v-model="identityData.words"
                    rows="3"
                    autosize
                    type="textarea"
                    placeholder="输入助记词单词，并使用空格分隔"
                    class="textarea"
                    />

                <van-field class="input" v-model="identityData.password" type="password" :border="false" :placeholder="statusType==1?'密码':'钱包密码'" />
                <van-field class="input" v-model="identityData.regPassword" type="password" placeholder="重复输入密码" />
                <van-field class="input" v-model="identityData.remark" placeholder="密码提示信息（可选）" />
            </div>
        </div>
        <div class="bottom-btn">
            <van-button type="info" class="btn" :disabled="btnState()" @click="createdWallet()">{{statusType==1?'创建':'恢复身份'}}</van-button>
        </div>
    </div>
</template>
<script>
import Pageheader from "@/components/pageheader";
export default {
    components: {
        Pageheader,
    },
    data(){
        return{
            statusType:1,
            value: '',
            identityData:{}
        }
    },
    created(){
        this.statusType = this.$route.query.type
    },
    methods:{
        createdWallet(){
            if(this.statusType==2 && this.identityData.words.trim().split(' ').length != 12 && this.identityData.words.trim().split(' ').length != 24){
                this.$toast('助记词格式不正确')
                return
            }
            if(this.identityData.password.length < 6){
                this.$toast('密码不小于6位')
                return
            }
            if(this.identityData.password != this.identityData.regPassword){
                this.$toast('两次密码输入不一致')
                return
            }
            

            this.$router.push({name:'addToken',params:{ data:this.identityData }})
        },
        btnState(){  
            if(!this.identityData.password || !this.identityData.regPassword || this.statusType==1 && !this.identityData.name || this.statusType==2 && !this.identityData.words){
                return true
            }
        }
    }
}
</script>
<style scoped lang="scss">
.container{
    height: 100vh;
    // position: relative;
    .main{
        padding: 0 15px;
        .header-explain{
            height: 90px;
            font-size: 15px;
            color: #666;
            .title{
                font-size: 18px;
                color: #222;
            }
        }
        .form-box{
            .input{
                background: rgb(249, 249, 249);
                margin-top: 10px;
                border-radius: 5px;
                border: 1px solid #eee;
            }
            .textarea{
                background: rgb(249, 249, 249);
            }
        }
    }

}
</style>
