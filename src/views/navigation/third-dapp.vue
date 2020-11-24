<template>
    <div class="third-party">
        <div class="header" ref="header" :style="{'padding-top':$store.state.appTop }">
            <div class="title" :style="{'padding-top':$store.state.appTop }"
            v-clipboard:copy="title" v-clipboard:success.stop="onCopy"> {{title.slice(0,24)}}... </div>
            <div class="operation">
                <van-icon class="icon" v-if="linkData.dappId&&isCollet" :name="require('@/assets/images/icon/collet-a.png')" @click="collectionDapp"  />
                <van-icon class="icon" v-if="linkData.dappId&&!isCollet" :name="require('@/assets/images/icon/collet.png')" @click="collectionDapp"  />
                <van-icon class="icon" v-if="!linkData.dappId" :name="require('@/assets/images/icon/refresh.png')" @click="refresh()"  />
                <van-icon class="icon" name="close" @click="$router.back()" />
            </div>
        </div>
        <!-- <iframe :src="linkData.dappUrl.includes('http')?linkData.dappUrl:''" width="100%" frameborder="0" scrolling="auto" class="iframe" ></iframe> -->
        <!-- <iframe src="#/webView" width="100%" frameborder="0" scrolling="auto" class="iframe" ></iframe> -->

        <!-- <van-action-sheet v-model="operation_show" cancel-text="取消" close-on-click-action>
            <div class="tool-content">
                <div class="module" v-clipboard:copy="linkData.dappUrl" v-clipboard:success.stop="copyUrl">
                    <img src="@/assets/images/icon/link.png" alt="">
                    <p>复制链接</p>
                </div>
                <div class="module" @click="$router.go(0)">
                    <img src="@/assets/images/icon/refresh.png">
                    <p>刷新</p>
                </div>
                <div class="module" @click="collectionDapp()">
                    <img v-if="isCollet" src="@/assets/images/icon/collet-a.png">
                    <img v-else src="@/assets/images/icon/collet.png">
                    <p>{{isCollet?'取消收藏':'收藏'}}</p>
                </div>
            </div>
        </van-action-sheet> -->

    </div>
</template>

<script>
export default {
    data(){
        return{
            operation_show: false,
            linkData:{},
            bookmark:[],
            title:'',
        }
    },
    mounted(){
        this.linkData = JSON.parse(this.$route.query.data);
        this.title = this.linkData.dappUrl
        this.bookmark = this.public_js.GetStorage('bookmark') || []
        plus.webview.open(this.linkData.dappUrl,'window',{top:this.$refs.header.clientHeight+'px',bottom:0,zindex:0,
            progress:{
				color:'#2364bc'
            } 
        }); 
        
    },
    beforeDestroy(){
        plus.webview.close( 'window' );
    },
    computed:{
        isCollet(){
            return this.bookmark.some(n => n.dappId === this.linkData.dappId)
        }
    },
    methods:{
        refresh(){
            plus.webview.close( 'window' );
            plus.webview.open(this.linkData.dappUrl,'window',{top:this.$refs.header.clientHeight+'px',bottom:0,zindex:0,
                progress:{
                    color:'#2364bc'
                } 
            });
        },
        onCopy(e) {
            plus.nativeUI.toast('已复制链接');
        },
        operation(){
            this.operation_show=true;
        },
        collectionDapp(){ 
            if(this.isCollet){
                let index = this.bookmark.findIndex(n => n.dappId === this.linkData.dappId);
                this.bookmark.splice(index,1)
                plus.nativeUI.toast('已取消收藏');
            }else{
                this.bookmark.push(this.linkData)
                plus.nativeUI.toast('已收藏');
            }
            this.public_js.SetStorage('bookmark',this.bookmark)
            this.operation_show = false
        }
    }
}
</script>

<style lang="scss" scoped>
.third-party{
    .header{
        height: 46px;
        background: #eee;
        padding: 0 10px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        // position: relative;
        .title{
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%);
            line-height: 46px;
            font-size: 13px;
        }
        .operation{
            width: 80px;
            height: 30px;
            border-radius: 15px;
            background: #fff;
            display: flex;
            .icon{
                width: 40px;
                line-height: 30px;
                font-size: 20px;
                text-align: center;
                font-weight: 700;
            }
        }
    }
    .iframe{
        height: calc(100vh - 46px);
        position: absolute;
        // top: 46px;
    }
    .third-tips{
        padding: 60px 25px 0;
        box-sizing: border-box;
        text-align: center;
        p{
            font-size: 16px;
        }
        .tips-text{
            margin-top: 10px;
        }
        .confirm{
            position: absolute;
            left: 50%;
            bottom: 12px;
            width: 350px;
            transform: translate(-50%);
            border-radius: 8px;
        }
    }
    .tool-content {
        padding: 25px 15px;
        display: flex;
        .module{
            width: 60px;
            height: 50px;
            margin-right: 20px;
            text-align: center;
            img{
                width: 30px;
                height: 30px;
            }
            p{
                font-size: 12px;
            }
        }
    }
}
</style>