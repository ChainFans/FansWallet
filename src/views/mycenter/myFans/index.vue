<template>
    <div class="container-fans">
        <pageheader></pageheader>
        <div class="fans-box">
            <div class="fans-title">
                <span>昵称</span>
                <span>注册时间</span>
                <span>会员</span>
                <span>粉丝量</span>
            </div>
            <div v-if="fansData.length==0" class="no-fans">暂无粉丝</div>
            <div v-else class="fans-content van-hairline--bottom" v-for="item in fansData" :key="item.userId">
                <span> {{ item.nickname }} </span>
                <span>{{ item.registerTime.slice(0,10) }}</span>
                <span>{{ item.vip==1?'已激活':'未激活' }}</span>
                <span>{{ item.fansCount }}</span>
            </div>
        </div>
       

    </div>
</template>
<script>
import pageheader from '@/components/pageheader'
// import {get_fansList} from '@/api/mycenter/myFans'
export default {
    components:{pageheader},
    data() {
        return {
            fansData:[],
        }
    },
    created(){
        // this.fansList()
    },
    methods:{
        // fansList(){
        //     this.$toast.loading({
        //         message: '加载中...',
        //         forbidClick: true,
        //         loadingType: 'spinner'
        //     });
        //     get_fansList().then(res=> {
        //         this.$toast.clear();
        //         if(res.code === 0){
        //             this.fansData = res.data

        //         }else{
        //             this.$toast(res.messages)
        //         }
                

        //     }).catch(err => {
        //         this.$toast('网络异常')
        //         this.$toast.clear();
        //     })
        // }
    }
}
</script>
<style scoped lang="scss">
.container-fans{
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

        }
        .fans-content{
            line-height: 40px;
            padding: 0 5px;
            display: flex;
            span{
               text-align: center;
               flex: 1;
               overflow: hidden;
               text-overflow:ellipsis;
               white-space: nowrap;
            }
        }
    }
}
</style>