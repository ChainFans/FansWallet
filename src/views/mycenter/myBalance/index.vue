<template>
    <div class="container-fans">
        <pageheader></pageheader>
        <div class="my-balance">
            <div class="balance">
                <span>{{balance}} ETH</span>
                <span>≈ ￥{{balanceCny}}</span>
                 
            </div>
            <van-button type="info" class="exprot-cash" @click="$toast('没有可提现的金额')">提现</van-button>
            <div class="roll-out-record">转出纪录</div>

        </div>

        <div class="fans-box">
            <div class="fans-title">
                <span>昵称</span>
                <span>金额</span>
                <span>方式</span>
                <span>时间</span>
            </div>
               <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoadList"
                :immediate-check="false"
            >
                <div class="list-box">
                    <div class="no-data" v-if="balanceData.length==0">暂无数据</div>
                    <div class="fans-content van-hairline--bottom" v-else v-for="item in balanceData" :key="item.userId">
                        <span> {{ item.nickname }} </span>
                        <span>{{ item.balance }}</span>
                        <span>{{ item.way }}</span>
                        <span>{{ item.createTime.slice(0,16) }}</span>
                    </div>
                </div>
            </van-list>
        </div>
       

    </div>
</template>
<script>
import pageheader from '@/components/pageheader'
import {get_balanceList, get_loadList} from '@/api/mycenter/myBalance'
export default {
    components:{pageheader},
    data() {
        return {
            balanceData:[],
            balance:0,
            balanceCny:0,
            loading: false,
            finished: false
        }
    },
    created(){
        this.balanceList()
    },
    methods:{
        balanceList(){
            let params = {
                PageCount:10,
                GetType:'After',
                PagingParams:0
            }
            get_balanceList(params).then(res=> {
                if(res.code === 0){
                    this.balanceData = res.data.userBalanceList
                    this.balance = res.data.balance
                    this.balanceCny = res.data.balanceCny
                }else{
                    this.$toast(res.messages)
                }
                

            }).catch(err => {
                this.$toast('网络异常')
            })
        },
        onLoadList(){
            let params = {
                PageCount:10,
                GetType:'After',
                PagingParams:this.balanceData.length
            }
            get_loadList(params).then(res=> {
                if(res.code === 0){
                    this.balanceData = this.balanceData.concat(res.data)
                    this.loading = false;
                    if(res.data.length < 10){
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
.van-button{
    line-height: 30px;
    height: 30px; 
}
.container-fans{
    .my-balance{
        height: 150px;
        background: #fff; 
        text-align: center;
        position: relative;
        .balance{
            line-height: 100px;
            font-size: 26px;
            span:nth-child(2){
                font-size: 16px;
                color: #666;
                margin-left: 5px;
            }
        }  
        .exprot-cash{
            // margin-top: 10px;
            
        } 
        .roll-out-record{
            width: 60px;
            line-height: 24px;
            background: #2376f3;
            position:absolute;
            top: 10px;
            right: 0;
            color: #fff;
            border-radius: 12px 0 0 12px;
            padding-left: 3px;
        }
    }
    .fans-box{
        .fans-title{
            display: flex;
            line-height: 30px;
            background: #eee;
            span{
               text-align: center;
                flex: 1;
                font-size: 14px;
            }
            span:nth-child(4){
                flex: 1.5
            }

        }
        .list-box{
            .no-data{
                font-size: 15px;
                color: #999;
                text-align: center;
                margin-top: 15px;
            }
            .fans-content{
                line-height: 40px;
                display: flex;
                span{
                text-align: center;
                flex: 1;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                }
                span:nth-child(4){
                    flex: 1.5
                }
            }
        }
    }
}
</style>