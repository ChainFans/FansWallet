<template>
    <div class="container">
        <pageheader></pageheader>
        <div class="miner-cell">
            <div class="miner-value">
                <span>矿工费</span>
                <span>
                     {{  parseFloat(gasPrice*gas/1000000000) }} ETH <br>
                    <font class="cny">￥ {{ (2482.79 * parseFloat(gasPrice*gas/1000000000)).toFixed(2) }} </font> 
                </span>
            </div>
            <p>GasPrice( {{gasPrice || 0.00}} GWEI)*Gas( {{gas || 0}} )</p>
        </div>
        <div class="set-gas-box">
            <p class="set-title">
                <span>Gas Price</span>
                <span>预计交易时间</span>
            </p>

            <div class="module" @click="speed=1;gasPrice=minerFeeData.maxGasPrice;">  
                <div class="m-left">
                    <div class="check">
                        <van-icon v-show="speed==1" name="success" color="#1989fa" class="icon" /> 
                    </div>
                    <div>
                        <p>最快</p>
                        <p class="gwei"> {{(minerFeeData.maxGasPrice)}}  GWEI</p>                             
                    </div>
                </div>
                <span class="minute"> &lt; {{timeConve(minerFeeData.maxGasPriceTime)}} 分钟</span>
            </div>
            <div class="module" @click="speed=2;gasPrice=minerFeeData.midGasPrice;">
                <div class="m-left">
                    <div class="check">
                        <van-icon v-show="speed==2" name="success" color="#1989fa" class="icon" /> 
                    </div>
                    <div>
                        <p>快</p>
                        <p class="gwei"> {{minerFeeData.midGasPrice}}  GWEI</p>                             
                    </div>
                </div>
                <span class="minute"> &lt; {{timeConve(minerFeeData.midGasPriceTime)}} 分钟</span>
            </div>
            <div class="module" @click="speed=3;gasPrice=minerFeeData.minGasPrice;">
                <div class="m-left">
                    <div class="check">
                        <van-icon v-show="speed==3" name="success" color="#1989fa" class="icon" /> 
                    </div>
                    <div>
                        <p>慢</p>
                        <p class="gwei"> {{minerFeeData.minGasPrice}}  GWEI</p>                             
                    </div>
                </div>
                <span class="minute"> &lt;{{timeConve(minerFeeData.minGasPriceTime)}} 分钟</span>
            </div>

            <!-- 自定义 -->
            <div class="module custom" @click="speed=4">
                <div class="m-left">
                    <div class="check">
                        <van-icon v-show="speed==4" name="success" color="#1989fa" class="icon" /> 
                    </div>
                    <div>
                        <p>自定义</p>
                    </div>
                </div>
                
            </div>
            <div class="custom-input" v-if="speed==4">
                <van-field class="input" v-model="inputGasPrice" @blur="gasPrice=inputGasPrice" type="number" placeholder="Gas Price" >
                    <van-button slot="button" size="small" style="border:0;color:#666;text-align:right;background:#ff976a00" >GWEI</van-button>
                </van-field>
                <van-field class="input" v-model="gas" type="number" placeholder="Gas" />
            </div>
        </div>

        <van-button  v-if="showBtn" type="primary" class="nextBtn" @click="confirm()">确认</van-button>

    </div>
</template>
<script>
import pageheader from '@/components/pageheader'
export default {
    components:{pageheader},
    data(){
        return{
            minerFeeData:{},
            gasPrice:'',
            gas:21000,
            inputGasPrice:'',
            showBtn:true,
            speed:2
        }
    },
    created(){
        this.minerFeeData = this.public_js.GetStorage('transferCode')
        this.gasPrice = this.minerFeeData.midGasPrice
        this.gas = this.$route.query.gas
    },
    mounted(){
        window.onresize= ()=>{
            if(this.clientHeight>document.documentElement.clientHeight) {
               this.showBtn =false
            }else{
                this.showBtn = true
            }
        }
    },
    methods:{
        confirm(){
            if(this.speed === 4 && this.inputGasPrice == '' ){
                this.$toast('GasPrice不能为空')
                return
            }
            if(this.speed === 4 && this.gas == '' ){
                this.$toast('Gas不能为空')
                return
            }
            if(this.gas < this.$route.query.gas){
                this.$toast('Gas数量太低')
                return
            }
            let minerData = {
                gasPrice:0,
                gas:21000
            }
            switch (this.speed) {
                case 1:
                    minerData.gasPrice = this.minerFeeData.maxGasPrice
                    break;
                case 2:
                    minerData.gasPrice = this.minerFeeData.midGasPrice
                    break;
                case 3:
                    minerData.gasPrice = this.minerFeeData.minGasPrice
                    break;
                case 4:
                    minerData.gasPrice = this.gasPrice
                    minerData.gas = this.gas
                    break;
            
                default:
                    break;
            }
            this.$store.state.minerData = minerData
            this.$router.back()
        },
        timeConve(arg){
            return Math.round((parseInt(arg/ 60) +arg % 60 /60 ) *100 ) /100 ;
        }
    }
}
</script>
<style lang="scss" scoped>
.container{
    padding: 0px 10px;
    height: 100vh;
    background:#f7f8fa;
    .miner-cell{
        width: 100%;
        height: 90px;
        background: #fff;
        padding: 0 15px;
        box-sizing: border-box;
        margin-top: 10px;
        .miner-value{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            .cny{
                font-size: 10px;
                color: #888;
            }
            span:nth-child(2){
                text-align: right;
            }
        }
        p{
            line-height: 30px;
            text-align: right;
            font-size: 10px;
            color: #888;
            border-top: 1px solid rgb(248, 246, 246);
        }
    }
    .set-gas-box{
        margin-top: 25px;
        .set-title{
            display: flex;
            justify-content: space-between;
            line-height: 30px;
            color: #888;
            font-size: 13px;
        }
        .module{
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
            padding: 0 10px;
            .m-left{
                display: flex;
                align-items: center;
                .gwei{
                    font-size: 13px;
                    color: #666;
                }
                .icon{
                    font-size: 18px;
                }
            }
            .check{
                width: 30px;
                display: flex;
                align-items: center;
            }
            .minute{
                font-size: 12px;
                color: #666;
            }
        }
        .custom{
           margin-top: 10px;
        }
        .custom-input{
            padding: 0 10px 10px;
            background: #fff;
            .input{
                background: rgb(247, 247, 247);
                border-radius: 5px;
            }
            .input:nth-child(1){
                margin-bottom: 8px;
            }
        }
    }
    .nextBtn{
        position: fixed;
        width: 96%;
        background: #2364bc;
        border: 0;
        bottom: 8px;
        left: 50%;
        transform: translate(-50%);
        border-radius: 6px;
    }
}
</style>