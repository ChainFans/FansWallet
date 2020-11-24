<template>
    <div class="container-token">
      <div class="header">
          <van-icon name="arrow-left" class="back" size="22" @click="$router.push({name:'mycenter'})" />&emsp;
          <span style="font-size:16px">我的Token</span>
      </div>
      <div style="height:50px"></div>
    <van-pull-refresh v-model="isLoading" @refresh="tokenList" :disabled="scrollTop>0">  
    <div class="token-box" @scroll="scroll">
      <div class="token-list" v-for="(title,index) in platform" :key="index">
          <div class="tltle">
              <span>{{title}} token</span>
              <span @click="$router.push({name:'custom_wallet'})">+发行新Token</span>
          </div>
          <van-loading size="24px" vertical v-if="entry_loading">加载中...</van-loading>
          <div class="content">
              <div class="createToken" v-if="tokenData.filter(n => n.tokenType == title).length<1&&!entry_loading" @click="$router.push({name:'custom_wallet'})">
                  <van-icon name="plus" size="24" />
              </div>
              <div class="module" v-for="(item,index) in tokenData.filter(n => n.tokenType == title)" :key="index" @click="view_order(item)">
             
                  <div v-if="item.tokenStatus==0" class="pay_state color_red">
                      {{pay_state(item)}}
                  </div>
                  <div v-else-if="item.tokenStatus==5" class="pay_state color_orange">
                      {{pay_state(item)}}
                  </div>
                  <div v-else-if="item.tokenStatus==10" class="pay_state color_red">
                      {{pay_state(item)}}
                  </div>
                  <div v-else-if="item.tokenStatus==15" class="pay_state color_blue">
                      {{pay_state(item)}}
                  </div>
                  <div v-else-if="item.tokenStatus==20" class="pay_state color_green">
                      {{pay_state(item)}}
                  </div>
                  <div v-else-if="item.tokenStatus==25" class="pay_state color_red">
                      {{pay_state(item)}}
                  </div>
                  <van-icon v-if="item.tokenStatus==0||item.tokenStatus==10" name="ellipsis" class="edit" @click.stop="edit_active=item.tokenId" />
                  <div class="login">
                      <div class="login-img">
                          <img :src='"@/assets/images/token_logo/"+item.tokenType+".png"'>
                      </div>                   
                  </div>
                  <div class="name"> {{item.tokenSymbol}} </div>
                  <div class="total">
                      <span>总量</span>
                      <b>{{item.tokenTotalSupply}}</b>
                  </div>
          
                  <div v-if="item.tokenId==edit_active" :class="{'edit-box':item.tokenId==edit_active}" @click.stop="edit_active=''">
                      <div class="option" style="background:#11b5d0" @click.stop="view_order(item)">支付</div>
                      <div class="option" style="background:#ff5656" @click.stop="del_token(item,index)">删除</div>
                      <div class="option" @click.stop="edit_active=''">取消</div>
                  </div>
            
              </div>
          </div>
      
        </div>
      </div> 
      </van-pull-refresh>   
        <!-- 待支付 -->
        <van-popup
            v-model="sureOrder_show"
            position="right"
            class="orderInfo-box">
        
            <div class="info-header">
                <van-icon name="arrow-left" @click="sureOrder_show=false" />&emsp;  
                <span></span>
            </div>
            <div class="basic-info">
                <div class="single-module">
                    <P>Token全称</P>
                    <P>{{fromData.tokenName}}</P>
                </div>
                <div class="single-module">
                    <P>Token简称</P>
                    <P>{{fromData.tokenSymbol}}</P>
                </div>
                <div class="single-module">
                    <P>发行总量</P>
                    <P>{{fromData.tokenTotalSupply}}</P>
                </div>
                <div class="single-module">
                    <P>小数位数</P>
                    <P>{{fromData.tokenDecimals}}</P>
                </div>           
            </div>

            <div class="module" v-for="(item,index) in func_data" :key="index">
                <span> {{ funcName(item.funcId) }} </span>
                <span>            
                <span style="color:#f54242"> {{item.funcPrice}}ETH</span>
                </span>               
            </div>

             <p class="total-price">总价 <span style="color:#f54242"><b>{{public_js.totalPrice(total_price)}}ETH</b></span></p>
            <van-button v-if="showBtn" type="danger" size="large" class="info-btn" @click="showKeyboard=true">确认支付</van-button> 

        </van-popup>  

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
import {get_tokenList, get_tokenInfo, get_orderInfo, deleteToken} from '@/api/mycenter/myToken'
import {create_order, order_pay} from '@/api/chaincloud/coin_making'
import passwordBox from '@/components/passwordBox'
import CryptoJS from 'crypto-js'
export default {
    components:{
        passwordBox
    },
    data(){
        return{
            clientHeight:document.documentElement.clientHeight,
　　　　　　 showBtn: true,  // 控制按钮显示隐藏
            scrollTop:0,
            isLoading: false,
            entry_loading:true,
            platform:['ETH'],
            // platform:['ETH','EOS','NAS','TRX'],
            tokenData:[],
            options_active:0,
            edit_active:'',

            sureOrder_show:false,
            showKeyboard:false,
            fromData:[],
            check_password:'',
            orderId:'',
            alreadyPay_show:false,  //已支付
            token_info:{},
            func_data:[],
            timer:''

        }
    },
    created(){
        
        
    },
    mounted(){
        window.onresize= ()=>{
            if(this.clientHeight>document.documentElement.clientHeight) {
               this.showBtn =false
            }else{
               this.showBtn = true
            }
        }   
        this.tokenList()
    },
    beforeDestroy(){
        if(this.sureOrder_show){
           this.$router.push({path:'/myToken'})
        }        
    },
    computed:{
        total_price(){
            let price = 0;
            this.func_data.forEach(item => {
                    price += item.funcPrice
            })
            return price
        }
    },
    methods:{
        //自动更新 支付中，部署中 的状态
        updateDeployState(){
            if(this.tokenData.some(n => n.tokenStatus==5 || n.tokenStatus==15)){
                if(this.timer==''){
                    this.timer = setInterval(() => {
                        this.tokenList()                   
                    }, 5000);
                }
            }else{
                clearInterval(this.timer)               
            }
        },
        funcName(id){
            switch (id) {
                case 1:
                    return '基础功能'
                    break;
                case 2:
                    return '销毁功能'
                    break;
                case 3:
                    return '增发功能'
                    break;
                case 4:
                    return '冻结账号'
                    break;
                case 5:
                    return '批量转账'
                    break;
                case 6:
                    return '锁定合约'
                    break;
                case 7:
                    return '直投'
                    break;
                case 8:
                    return '空投'
                    break;
                case 9:
                    return '锁仓'
                    break;
            
                default:''
                    break;
            }
        },
        del_token(item){  
            this.$dialog.confirm({
                title: '提示',
                message: '确认删除此订单?'
            }).then(() => {
                deleteToken({tokenId:item.tokenId}).then(res => {
                    if(res.code === 0){
                        let index;
                        index = this.tokenData.findIndex(i => i.tokenId == item.tokenId)
                        this.tokenData.splice(index,1)
                        this.$toast('删除成功')
                    }else{
                        this.$toast(res.messages)
                    }
                }).catch(err => {
                    this.$toast('网络异常')
                })
            }).catch(() => {
               this.edit_active=''
            });
        },

        tokenList(){   
            
            get_tokenList().then(res => {
                this.entry_loading = false
                if(res.code === 0){
                    this.tokenData = res.data
              
                        this.updateDeployState()   //轮询更新状态
                 
                    // console.log(this.tokenData)
                    if(this.isLoading){
                        setTimeout(() => {
                            this.$toast('刷新成功');
                            this.isLoading = false;
                        }, 500);
                    }

                    // this.tokenData.sort((a,b)=>{ return a.tokenStatus-b.tokenStatus})
                }else{
                    this.$toast(res.messages)
                }
            }).catch(err => {
                this.$toast('网络异常')
            })
        },
        view_order(item){   //订单详情
            if(item.tokenStatus == 0 || item.tokenStatus == 10){   //未支付和支付失败
                this.edit_active='';
                this.sureOrder_show = true;              
                let params = { 
                    DetailId:item.tokenId,
                }  

                get_orderInfo(params).then(res => {
                    if(res.code === 0){
                        this.fromData = res.data
                        this.orderId = res.data.orderId;
                        this.func_data = this.fromData.tokenFunctionModels

                    }else{
                        this.$toast(res.messages)
                    }
                }).catch(err => {
                    this.$toast('网络异常')
                })
            }else if(item.tokenStatus == 20){   //已支付
                this.$router.push({name:'deployed',query:{token_info:JSON.stringify(item)}})


                // this.alreadyPay_show = true
                // this.token_info = item
 
            }   
        },
        payPassword(val){
            this.check_password = val
        },
        confirm_pay(){   //确认支付
            if(this.check_password == ''){            
                return
            }
            // const password =CryptoJS.MD5(this.check_password).toString().toLocaleUpperCase() 
            let p = {
                orderId: this.orderId,
                payPassword:this.check_password
            }
            this.$toast.loading({
                duration: 0,       // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: 'spinner',
                message: '订单支付中'
            });
            order_pay(p).then(r => {
                this.$toast.clear();
                if(r.data.code === 0){
                    this.$toast.success('支付完成，待区块确认')
                    this.sureOrder_show=false

                    this.tokenData.filter(n => n.tokenId == this.fromData.tokenId)[0].tokenStatus=5  
                    this.tokenList()
                }else{
                    this.$toast(r.data.messages)
                }
            }).catch(err => {
                this.$toast('网络异常')
            })
        },
        pay_state(item){
            switch (item.tokenStatus) {
                case 0:
                    return '待支付'
                    break;
                case 5:
                    return '支付中'
                    break;
                case 10:
                    return '支付失败'
                    break;
                case 15:
                    return '部署中'
                    break;
                case 20:
                    return '已部署'
                    break;           
                case 25:
                    return '部署失败'
                    break;           
                default:''
                    break;
            }
        },
        scroll(event){
            this.scrollTop = event.target.scrollTop
        }
    },
}
</script>
<style scoped lang="scss">
/deep/.van-dialog__confirm, .van-dialog__confirm:active{
    background: #2364bc;
    color: #fff;
}
/deep/.van-dialog__footer--buttons{
    border-top: 1px solid #2364bc;
}
.container-token{
    font-size: 14px;
    .header{
        height: 49px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        border-bottom: 1px solid #eee;
        position: fixed;
        left: 0;
        right: 0;
        background: #fff;
        z-index: 999;
    }
    .token-box{
        overflow-y: scroll;
        height: calc(100vh - 50px);
    }
    .token-list{   
        height: calc(100vh - 50px);    
        .tltle{
            line-height: 30px;
            background: #eee;
            display: flex;
            justify-content: space-between;
            padding: 0 15px;
            span:nth-child(2){
                color: rgb(97, 173, 243);
            }
        }
        .content{
            padding: 8px;                
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .createToken{
                width: 100%;
                height: 50px;
                box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .module{
                width: 175px;
                height: 185px;
                box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
                margin-bottom: 8px;
                border-radius: 7px;
                overflow: hidden;
                text-align: center;
                position: relative;
                .edit-box{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    transition: all 0.5s;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    .option{
                       
                        width: 100px;
                        height: 40px;
                        line-height: 40px;
                        margin: 0 auto;
                        background: rgb(179, 174, 174);
                        border-radius: 6px;
                        color: #fff;
                        font-size: 14px;
                    }
                }
                .pay_state{
                    width: 90px;
                    line-height: 24px;
                    // background: rgb(250, 169, 102);
                    border-radius:0 0 10px 0;
                    color: #fff;
                }
                .edit{
                    position: absolute;
                    top: 2px;
                    right: 10px;
                    font-size: 25px;
                }
                .color_red{
                    background: rgb(243, 91, 91);
                }
                .color_orange{
                    background: #efaf22;
                }
                .color_blue{
                    background: rgb(91, 182, 243);
                }
                .color_green{
                    background: rgb(108, 175, 112);
                }
                .login{
                    height: 80px;
                   
                    .login-img{
                        width: 70px;
                        height: 70px;
                        margin: 0 auto;
                        img{
                            width: 100%;
                            height: 100%;
                            margin-top: 5px;
                        }
                    }
                }
                .name{
                    line-height: 30px;
                    font-size: 16px;
                    font-weight: 600;
                }
                .total{
                    height: 50px;
                    border-top: 1px solid #eee;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 10px;
                    b{
                        width: 120px;
                        text-align: right;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
    .info-header{
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
    .orderInfo-box{
        height: 100%;
        width:100%;

        .basic-info{
            height: 60px;
            border-bottom: 1px solid #eee;
            display: flex;
            .single-module{
                flex: 1;
                height: 100%;         
                text-align: center;
                padding: 10px 0;
                box-sizing: border-box;
                p:nth-child(2){
                    color: #666;
                    margin-top: 5px;
                }
            }
        }
        .module{
            height: 40px;
            border-bottom: 1px solid #eee;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            
            span{
                display: flex;
                align-items: center;
                margin: 0 10px;
                .oldPrice{
                    font-size: 12px;
                    color: #666;
                }
            }
        }
        .info-btn{
            position: absolute;
            bottom: 0;
            background: #2364bc;
            border: 0;
        }
        .settlement{
           text-align:right;font-size:16px;margin-right:20px;margin-top: 5px;
           p{
               margin-top: 3px;
           }
        }
        .total-price{
            font-size: 16px;
            text-align: right;
            margin-right: 20px;
            margin-top: 10px;

        }
    }
   
    .footer-box{
        width: 100%;
        height: 50px;
        background: #fff;
        border-top: #eee 1px solid;
        position: absolute;
        bottom: 0;
        text-align: right;
        span{
            font-size: 16px;
            b{
                color: rgb(238, 74, 74);
            }
        }
        .sure_btn{
            height: 50px;
            width: 120px;
            font-size: 16px;
            text-align: center;
        }
        
    }

}
/deep/.van-tabs--card{
    padding-top: 10px; 
}
</style>