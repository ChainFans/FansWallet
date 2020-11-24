<template>
    <div class="container-notice">
        <pageheader/>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="noticeList(noticeData.length)"
        >
        <div class="notice-box van-hairline--bottom" v-for="(item,index) in noticeData" :key="index" @click="$router.push({name:'noticeDetai',params:{data:item}})">
            <div class="title">
                <span>{{item.title}}</span>&emsp;
                <span>{{item.displayTime.slice(0,16)}}</span>
            </div>
            <p>{{item.content}}</p>

        </div>
        </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import {get_noticeList} from '@/api/chaincloud/coin_making'
import pageheader from '@/components/pageheader'
export default {
    components:{pageheader},
    data() {
        return {
            noticeData:[],
            isLoading: false,
            loading: false,
            finished: false
        }
    },
    created(){
        // this.noticeList()
    },
    methods:{
        noticeList(page){
            let params = {
                PageCount:10,
                GetType:'After',
                PagingParams:page || 0
            }
            get_noticeList(params).then(res=> {
                if(res.code === 0){
                    this.noticeData = this.noticeData.concat(res.data)
                    this.loading = false;
                    // 数据全部加载完成
                    if (this.noticeData.length >= res.dataPagingResult.totalCount) {
                    this.finished = true;
                    }

                }else{
                    this.$toast(res.messages)
                }
                

            }).catch(err => {
                this.$toast('网络异常')
            })
        },
        onRefresh() {
            this.$toast('刷新成功');
            this.isLoading = false;
            this.noticeList(0)
        },

    }
}
</script>
<style scoped lang="scss">
.container-notice{
    .notice-box{
        min-height: 60px;
        font-size: 16px;
        padding: 8px 10px;
    
        .title{
            min-height: 30px;
            display: flex;
            justify-content: space-between;
            span:nth-child(1){
                width: 245px;
            }
            span:nth-child(2){
                color: rgb(173, 173, 173);
                font-size: 12px;
                width: 105px;
            }
        }
        p{
            color: #949494;
            font-size: 15px;
        }
    }
}
</style>