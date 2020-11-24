<template>
    <div class="container-outerChain">
        <div class="header ">
           
        </div>            

        <div class="payShow-box">
            <div class="title">
                <img src="@/assets/images/other/success_pay.png">
                <span><b>支付成功,待区块确认</b></span>
            </div>


           
            <div class="btn-box">
                <van-button type="default" round class="btn" @click="isBack=false;$router.push({name:'chaincloud'})">返回首页</van-button>&emsp;&emsp;&emsp;
                <van-button type="default" round class="btn" @click="isBack=false;$router.push({name:'myToken'})">查看订单</van-button>
            </div>
        </div>
        <div class="optionBox ">
            <p><b>购买的功能</b></p>
            <p>
                <span v-for="(item,index) in options" :key="index">{{item}}&emsp;</span>
            </p>
        </div>
        <p class="more-title">更多推荐</p>
        <div class="more-content">
            <div class="more-box">
                <div class="more-module">
                    
                    <div class="more-bg"><span>钱包</span></div>
                </div>
            </div>
            <div class="more-box">
                <div class="more-module">
                    
                    <div class="more-bg"><span>官网</span></div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
           options:[],
           isBack:true,
        }
    },
    created(){
        this.options = this.$route.params.options

    },
    beforeDestroy(){
        if(this.isBack){
            this.$router.push({name:'chaincloud'})
        }
        
    },
    methods:{

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
    .optionBox{
        min-height: 50px;
        padding: 5px 15px;
        border-bottom: 1px solid #eee;
        p:nth-child(1){
            text-align: center;
            height: 30px;
        }
        span{
            color: #666;
            font-size: 14px;
        }
    }
    .payShow-box{
        height: 180px;

        
        .title{
            span{
                font-size: 28px;
                color: #2364bc;
                margin-left: 15px;
            }
        }
        .btn-box{
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
    .more-title{
        line-height: 50px;
        text-align: center;
        
    }
    .more-content{
        display: flex;
      
        .more-box{
            width: 50%;
            .more-module{
           
                height: 130px;
                display: flex;
                align-items: center;
                justify-content: center;
                .more-bg{
                    width: 150px;
                    height: 120px;
                    background: url('../assets/images/other/more_bg.png') no-repeat;
                    background-size: 150px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    span{
                        margin-bottom: 20px;
                        
                    }
                }

            }
        }
    }

}
</style>