<template>
    <div class="container-defi">
        <div class="null" ref="null"></div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>
                <img src="@/assets/images/nav_logo/nav1.png" alt="">
            </van-swipe-item>
            <van-swipe-item><img src="@/assets/images/nav_logo/nav2.png" alt=""></van-swipe-item>
            <van-swipe-item><img src="@/assets/images/nav_logo/nav3.png" alt=""></van-swipe-item>
        </van-swipe>
        <div class="collection">
            <p>
                <span>收藏</span>
            </p>
            <div class="no-data" v-if="bookmark.length === 0">
                <img src="@/assets/images/nav_logo/no-data.png" alt=""><br>
                <span>暂无收藏</span>
            </div>
            <van-grid v-else :border="false" style="text-align:center">
                <van-grid-item :icon="item.dappLogo" :text="item.dappName" v-for="(item,index) in bookmark.slice(0,4)" :key="index" @click="$router.push({ path:'/thirdParty',query:{ data:JSON.stringify(item)} })" />

            </van-grid>

        </div>
        <div class="recommend" v-for="(title,index) in nvaData" :key="index">
            <P class="recommend-title"> {{title.blockName}} </P>
            <van-swipe class="recommend-swipe"  :width="offsetWidth" :loop="false" :show-indicators="false">
                <van-swipe-item v-for="num in Math.ceil(title.media.length/3)" :key="num">
                    <div class="module" v-for="(item,index) in title.media.slice((num-1)*3,3*num)" :key="index" @click="goDapp(item)">
                        <div class="logo-img">
                            <img :src="item.dappLogo" alt="">
                        </div>
                        <div class="content">
                            <p class="title"><van-tag type="primary" v-if="item.dappChain"> {{item.dappChain}} </van-tag> {{item.dappName}} </p>
                            <p class="describe"> {{item.dappCaption}} </p>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        
    </div>
</template>
<script>
import { get_dappList } from '@/api/navigation'
export default {
    name:'navigation',
    data() {
        return {
            nvaData:[],
            offsetWidth:0,
            dappType:[],
            bookmark:[]
        }
    },
    activated(){
        this.bookmark = this.public_js.GetStorage('bookmark') || [];
        if(this.$store.state.networkStatus && this.nvaData.length == 0){
            this.dappList()
        }else{
            this.nvaData = this.public_js.GetStorage('navigationList') || []
        }
        
    },
    created(){
        
    },
    mounted(){
        this.offsetWidth = this.$refs.null.offsetWidth
    },
    methods:{
        dappList(){
            this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: '加载中...',
            });
            get_dappList().then(res => {
                if(res.code === 0){
                    this.nvaData = res.data;
                    this.$toast.clear();
                    function compare(property){
                        return function(a,b){
                            var value1 = a[property];
                            var value2 = b[property];
                            return value1 - value2;
                        }
                    }
                    this.nvaData.sort(compare('dappTypeSeq')).forEach(item => {
                        this.dappType.push(item.dappType)
                    })
                    this.dappType = Array.from(new Set(this.dappType))
                    this.nvaData = [];
                    this.dappType.forEach(item => {
                        this.nvaData.push(
                            {
                                blockName:item,
                                media:res.data.filter(n => n.dappType === item)
                            }
                        )
                    })
                    this.public_js.SetStorage('navigationList',this.nvaData)
                    // console.log(this.nvaData)
                }else{
                    this.$toast(res.data.messages)
                }
            }).catch(err => {
                this.$toast('网络异常')
                this.$toast.clear();
            })
            
        },
        goDapp(item){   
            let isVisit = this.public_js.GetStorage('isVisit') || [];
            if(isVisit.some(n=> n == item.dappName)){
                this.$router.push({ path:'/thirdParty',query:{ data:JSON.stringify(item)} })
                return
            }
            this.$dialog.confirm({
                title: '你正在访问第三方 Dapp',
                message: ' 你在第三方 Dapp 上的使用行为将适用该第三方 Dapp 的《用户协议》和《隐私政策》，由 '+item.dappName+' 直接并单独向你承担责任。',
            }).then(() => {
                isVisit.push(item.dappName)
                this.public_js.SetStorage('isVisit',isVisit);
                this.$router.push({ path:'/thirdParty',query:{ data:JSON.stringify(item)} })
            })  .catch(() => {
                // on cancel
            });
        }
    },

}
</script>
<style scoped lang="scss">
.container-defi{
  .my-swipe .van-swipe-item {
    height: 180px;
    img{
        width: 100%;
        height: 100%;
    }
  }
  .collection{
    padding: 8px 15px;
    height: 100px;
    .no-data{
        text-align: center;
        img{
            width: 60px;
            height: 60px;
        }
        span{
            font-size: 13px;
            color: #c9c9c9;
        }
    }
    p{
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        span:nth-child(2){
            color: #949494;
            font-size: 13px;
            display: flex;
            align-items: center;
        }
    }
    /deep/.van-grid-item__text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80px;
    }
    /deep/.van-grid-item__content {
        padding: 4.27vw 0;
    }
  }
  .recommend{
    .recommend-title{  
        padding: 10px 15px;
        font-size: 15px;    
    }
    .recommend-swipe{
        // height: 180px;
        // background: #eee;
        color: #000;
        .module{
            display: flex;
            height: 60px;
            padding: 5px 15px;
            .logo-img{
                width: 50px;
                height: 50px;
                margin-right: 15px;
                border-radius: 5px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .content{
                width: 255px;
                border-bottom: 1px solid #eee;
                .title{
                    font-size: 13px;
                }
                .describe{
                    font-size: 12px;
                    color: #949494;
                }
            }
        }
    }
  }
}
.null{
    width: 350px;
}
</style>