<template>
    <div class="collection-container">
        <pageheader :changeHeader="changeHeader"></pageheader>
        <div class="receivables-box" ref="imageToFile">
            <div class="bg-color">
                <div class="token-name"> <b>{{walletInfo.tokenSymbol||walletInfo.walletType }}</b></div>
                <div class="token-address"  v-clipboard:copy=" walletInfo.address" v-clipboard:success.stop="onCopy">
                    <p>{{ walletInfo.address}}
                        <span v-if="!share_show"><img src="@/assets/images/other/copy_black.png" alt=""></span>
                        </p>&nbsp;
                    <!-- <div class="copy_img">
                        <img src="@/assets/images/other/copy_black.png" alt="">
                    </div>     -->
                </div>
            </div>
            <div class="qr-content" ref="content">
                <div class="qr-text"> {{ !isPrice?'请扫二维码进行转账':'请使用迷链钱包扫描二维码'}} </div>
                <div class="qr-border">
                    <img src="@/assets/images/wallet/qr-border.png">
                </div>
                <div id="qrcode" class="qrcode" ref="qrCodeUrl" :style="{'margin-top':qrcodeHeight}"></div>
                <div class="qr-price" v-if="isPrice">
                    扫二维码，转入 {{collection_price}} {{walletInfo.tokenSymbol||walletInfo.walletType }}
                    <span @click="clear_price()">&emsp;<van-icon name="close" /></span>
                </div>
            </div>
            <!-- <div class="set-price" @click="setPrice_show=true" v-if="!share_show">
                设置金额
            </div> -->

            <div class="app-info" v-show="share_show">
                <div class="footer">
                    <div class="logo-left">
                        <div class="logo-img">
                            <img src="@/assets/images/my_center/logo.png" alt="">
                        </div>
                        <span>迷链钱包</span>
                    </div>
                    <div class="download-qr">
                        <div id="downQr" class="downQr" ref="downQr"></div> 
                    </div>
                </div>
            </div>
        </div>

        <div class="t-footer">
            <!-- <van-button type="info" class="footer-btn" style="background:#07c160" @click="screenShot">分享</van-button> -->
            <van-button type="info" class="footer-btn" style="background:#07c160" v-clipboard:copy="walletInfo.address" v-clipboard:success.stop="onCopy">复制</van-button>
            <van-button type="info" class="footer-btn" @click="setPrice_show=true;setCollectionPrice=''">设置金额</van-button>
        </div>

        <!-- 分享图 -->
        <van-dialog
        v-model="share_show"
        show-cancel-button
        confirmButtonText="分享"
        @confirm="shareShow=true" 
        >
            <div class="img_box">

                <img :src="shareImg" v-if="shareImg" style="width:100%;height:100%" alt="">
            </div>
        </van-dialog>

        <van-action-sheet v-model="shareShow" title="分享平台" round >
        <div class="share-box">
            <div class="module">
            <div class="share-pic" @click="share('weixin','WXSceneSession')">
                <img src="@/assets/images/my_center/share/weixin.png" >
            </div>
            <p>微信</p>
            </div>
            <div class="module">
            <div class="share-pic" @click="share('weixin','WXSceneTimeline')">
                <img src="@/assets/images/my_center/share/weixinZon.png" >
            </div>
            <p>微信朋友圈</p>
            </div>
            <div class="module">
            <div class="share-pic qq" @click="share('qq')">
                <img src="@/assets/images/my_center/share/qq.png" >
            </div>
            <p class="qq">QQ</p>
            </div>
            <div class="module">
            <div class="share-pic" @click="share('qq')">
                <img src="@/assets/images/my_center/share/qqZon.png" >
            </div>
            <p>QQ朋友圈</p>
            </div>
            <div class="module">
            <div class="share-pic"           
            v-clipboard:copy="walletInfo.address"
            >
                <img src="@/assets/images/my_center/share/copy.png" >
            </div>
            <p>复制地址</p>
            </div>

        </div>
        </van-action-sheet>




        <!-- 设置金额 -->
        <van-dialog
        v-model="setPrice_show"
        title="设置金额"
        show-cancel-button
        @confirm="setPrice_sure()"
        :before-close="chargeBtn"
        >
            <div class="setPrice-box">
                <div class="input-price">
                    <span> 金额</span>&emsp;
                    <van-field class="input" v-model="setCollectionPrice" placeholder="请输入金额" type="number" />
                </div>
                <div class="select-token" v-if="walletInfo.walletCurrencyModels">
                    <div class="token-box" v-for="(item,index) in walletInfo.walletCurrencyModels" :key="index" @click="collection_token(item,index)">
                        <van-swipe-cell style="border-bottom:1px solid #eee;" >
                            <van-cell center :class="{'selectBG':activeToken==index}">
                                <template slot="title" center> 
                                    <div class="left-logo"> 
                                        <div class="left-img">
                                            <img :src='"@/assets/images/token_logo/ETH.png"'>
                                        </div>
                                        <span><b>{{item.tokenSymbol}}</b></span>&emsp;
                                        <span> {{item.tokenName}} </span>
                                    </div>
                                </template>
                            </van-cell>
                        </van-swipe-cell>                   
                    </div>
                </div>

            </div>
        </van-dialog>



    </div>
</template>
<script>
import QRCode from "qrcodejs2";
import pageheader from '@/components/pageheader';
import html2canvas from 'html2canvas';
export default {
    components:{pageheader},
    data(){
        return {
            qrcodeHeight:0,
            setPrice_show:false,
            share_show:false,
            changeHeader:true,
            collection_price:'',
            setCollectionPrice:'',
            activeToken:0,
            walletInfo:{},
            qrcode:'',
            isPrice:false,
            shareShow:false,
            shareImg:'',
            filename:''
        }
    },
    created(){
        this.walletInfo = this.$route.query.walletInfo
        console.log(this.walletInfo)
    },
    mounted(){

        this.qrcodeHeight = (this.$refs.content.offsetHeight - this.$refs.qrCodeUrl.offsetHeight) /2 +'px'
        this.creatQrCode(this.walletInfo.address) 
        // }else{
        //     var collectionInfo = {
        //         tokenSymbol:this.walletInfo.tokenSymbol,
        //         price:this.collection_price,
        //         address:this.walletInfo.address
        //     }
        //     this.creatQrCode(JSON.stringify(collectionInfo)) 
        // }
        
    },
    watch:{
        share_show(bool){
            if(!bool){
                let qrcodeEL = document.getElementById("downQr");
                let qrcode = new QRCode(qrcodeEL);  
                document.getElementById("downQr").innerHTML = "";
            }
        }
    },
    methods:{
        //生成快照
        screenShot(showToast = true) {
            this.$toast.loading({
                message: '加载中',
                forbidClick: true,
                duration: 0,
                mask:true,
                
            }); 
            this.share_show=true;  
            setTimeout(()=>{
            this.downQrCode(JSON.parse(plus.storage.getItem('version_data')).url)  //app下载地址
            var shareContent = this.$refs.imageToFile;//需要截图的包裹的（原生的）DOM 对象
            var width = shareContent.offsetWidth; //获取dom 宽度
            var height = shareContent.offsetHeight; //获取dom 高度
            var canvas = document.createElement("canvas"); //创建一个canvas节点
            var scale = window.devicePixelRatio; //定义任意放大倍数 支持小数
            //   var scale = 2; //定义任意放大倍数 支持小数
            canvas.width = width * scale; //定义canvas 宽度 * 缩放
            canvas.height = height * scale; //定义canvas高度 *缩放
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            canvas.getContext("2d").scale(scale,scale);

            html2canvas(this.$refs.imageToFile, {
            // width: this.$refs.imageToFile.clientWidth,
            // height: this.$refs.imageToFile.clientHeight,
            scale: 1,
            useCORS: true,
            // dpi: window.devicePixelRatio * 4,
            canvas:canvas,    
            backgroundColor:'#f7f8fa00',

            }).then((canvas) => {// 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
                this.$toast.clear()
                this.shareImg = canvas.toDataURL('image/png');
                if(!window.plus)return
                var bitmap = new plus.nativeObj.Bitmap();
                this.filename = "news_picture.png";
                bitmap.loadBase64Data(this.shareImg);
                // 保存Bitmap图片
                bitmap.save(
                    "_doc/" + this.filename,
                    { overwrite: true },
                    function(i) {
                    //保存到系统相册
                    
                    plus.gallery.save(
                        i.target,
                        function(d) {
                        //销毁Bitmap图片
                        bitmap.clear();
                        if (showToast) {
                            console.log("保存图片到相册成功");
                            
                        }
                        // vm.toShare("");
                        },
                        function() {
                        //销毁Bitmap图片
                        if (showToast) {
                            console.log("保存保存失败");
                        }
                        // vm.toShare("");
                        }
                    );
                    },
                    function() {
                    bitmap.clear();
                    }
                );
            })

            })
        },
        share(type,scene){
        　　var shareData = null;
        　　var sharewx = null;
            var that = this;
            this.$toast.loading({
                message: '加载中',
                forbidClick: true,
                duration: 0,
            }); 
        　　plus.share.getServices(function(e) {   
            shareData = e　　　　　　　　//这个回调函数的参数 e 就包含了 所有对象的数组
        　　　　//在这个数组里 找到属于微信的对象 循环匹配查找
            　　for(var i in e){　　　　　　　　
                if(type == e[i].id){
                    sharewx = e[i]　　//保存到变量里 （之后即可使用该对象发起分享）
                　}
            　　}
            // let imgUrl = './dapp.png';

            // var img = plus.io.convertAbsoluteFileSystem(imgUrl); 
            　　let msg = {
            　　　　type: 'image',　　//分享的内容的类型 
                   pictures:["_doc/" + that.filename],
            　　　　title: '迷链钱包',
            　　　　content: '迷链钱包APP注册',
            // 　　　　thumbs: ['http://api.ecs.chainfans.io/cfcdn/203/155-f8cd2dbfa9954c60ad02def0d79b9301.png'],
            // 　　　　href: that.copyUrl,
            　　　　extra:{scene:scene} // 'WXSceneSession'分享给好友，'WXSceneTimeline'分享到朋友圈
            　　}

            　　//msg对象的属性和参数 官方文档里有说明
            　　//这里就用到了上面获取到的 微信对象 使用send发起分享
                    sharewx.send(msg, function() {
                
            　　　　console.log('分享成功')
            　　},function(e) {
                    // console.log('分享失败')
                    alert("分享失败："+e.message);
            　　})


        　　})
            this.$toast.clear()
    　　
        },
        // 设置金额
        setPrice_sure(){ 
            this.isPrice = true
            if(this.setCollectionPrice){
                this.collection_price = this.setCollectionPrice
            }
            
            // 清空二维码
            let qrcodeEL = document.getElementById("qrcode");
            let qrcode = new QRCode(qrcodeEL);  
            document.getElementById("qrcode").innerHTML = "";

            if(this.walletInfo.walletCurrencyModels){
                var collectionInfo = {
                    tokenSymbol:this.walletInfo.walletCurrencyModels[this.activeToken].tokenSymbol,
                    price:this.collection_price,
                    address:this.walletInfo.address
                }
            }else{
                var collectionInfo = {
                    tokenSymbol:this.walletInfo.tokenSymbol,
                    price:this.collection_price,
                    address:this.walletInfo.address
                }
            }

            this.creatQrCode(JSON.stringify(collectionInfo))           
            
        },
        //清除金额
        clear_price(){
            // 清空二维码
            let qrcodeEL = document.getElementById("qrcode");
            let qrcode = new QRCode(qrcodeEL);  
            document.getElementById("qrcode").innerHTML = "";

            this.collection_price = '';
            this.activeToken = 0;
            this.isPrice = false
            if(this.walletInfo.walletCurrencyModels){
                this.creatQrCode(this.walletInfo.address)
            }else{
                var collectionInfo = {
                    tokenSymbol:this.walletInfo.tokenSymbol,
                    price:0,
                    address:this.walletInfo.address
                }
                this.creatQrCode(JSON.stringify(collectionInfo))
            }
        },
        chargeBtn(action, done) {    //验证金额
            if(action === 'cancel') {
                done();
                return
            }
            if (this.collection_price === '') {
                this.$toast("请输入金额！");
                done(false);
                return;
            }else if(!(/((^[1-9]\d*)|^0)(\.\d{0,20}){0,1}$/.test(this.collection_price))){
                this.$toast('输入的金额不正确');
                done(false);
                return
            }
            done();
        },
        collection_token(item,index){  
            this.activeToken = index
        },
        creatQrCode(address) {   
           
            var qrHeight = this.$refs.qrCodeUrl.clientHeight; 
            this.qrcode = new QRCode(this.$refs.qrCodeUrl, {               
                text: address,
                width: qrHeight,
                height: qrHeight,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        },
        downQrCode(code) {             
            var qrHeight = this.$refs.downQr.clientHeight;
            this.qrcode = new QRCode(this.$refs.downQr, {               
                text: code,
                width: qrHeight,
                height: qrHeight,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        },
        onCopy(e) {
            this.$toast("复制成功");
        },
    }
}
</script>
<style lang="scss" scoped>
.van-dialog{
    width: 320px;
}
.collection-container{
    height: 100vh;
    background: linear-gradient(to bottom, #4bb0ff, #6149f6);
    .scale{
        transform:scale(0.5);
    }
    .receivables-box{
        width: 320px;
        min-height: 400px;
        margin: 50px auto 0;
        // border: 1px solid #eee;
        border-radius: 10px;
        overflow: hidden;
        background: #fff;
        text-align: center;
        font-size: 16px;
        color: #000;
        
        .bg-color{
            border-bottom: 0.5px solid #eee;         
            height: 80px;
            padding: 10px 0;
            box-sizing: border-box;
        }
        .token-name{

        }
        .token-address{
            height: 40px;
            font-size: 14px;
            margin-top: 5px;
            word-wrap: break-word;
            text-align: center;
            padding: 0 30px;
            span{
                width: 16px;
                height: 16px;
                display: inline-block;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .qr-content{
            height: 280px;
            overflow: hidden;
            position: relative;
            .qr-text{
                width: 100%;
                position: absolute;
                top: 6px;
                left: 50%;
                transform: translate(-50%);
                color:#949494;
                font-size: 15px;
            }
            .qr-border{
                width: 200px;
                height: 200px;
                position: absolute;
                top: 40px;
                left: 50%;
                transform: translate(-50%);    
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .qrcode{
                display: flex;
                justify-content: center;
                height: 160px;
            }
            .qr-price{
                margin-top: 30px;
                color: rgb(255, 93, 93);
                margin-left: 30px;
                text-align: center;
                font-size: 13px;
                span{
                    color: #949494;
                    font-size: 14px;
                }
            }
        }
        .set-price{
            height: 30px;
            color: #559dff;
        }
        .app-info{
            // width: 80%;
            height: 80px;
            background: blue;
            position: relative;
            .footer{
                width: 100%;
                height: 100%;
                position: absolute;
                bottom: 0;
                color: #fff;
                font-size: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                box-sizing: border-box;
                .logo-left{
                    display: flex;
                    // align-items: center;
                    .logo-img{
                        width: 50px;
                        height: 50px;
                        border-radius: 8px;
                        overflow: hidden;
                        margin-right: 15px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }

                }
                .download-qr{
                    width: 60px;
                    height: 60px;
                    background: #fff;
                    .downQr{
                        width: 54px;
                        height: 54px;
                        margin-top: 3px;
                        margin-left: 3px;
                    }
                }
            }

        }
    }
    .t-footer{
        height: 50px;
        position: fixed;
        bottom: 0px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .footer-btn{
            width: 48%;
            border-radius: 6px;
            background: rgb(172, 172, 172);
            border: 0;
        }
    }
    .wallet-share{
        text-align: center;
        font-size: 16px;
    }
    .img_box{
        height: 440px;
    }
    .share-box{
        height: 140px;
        display: flex;
        align-items: center;
        .module{
        margin-left: 20px;
        margin-top: 30px;
        .qq{
            width: 45px!important;
            margin-left: -5px;
        }
        .share-pic{
            width: 50px;
            height: 50px;
            border-radius: 8px;
            overflow: hidden;
            
            img{
            width: 100%;
            height: 100%;
            }
        }
        p{
            text-align: center;
            color: #777;
        }

        }
    }
    .setPrice-box{
        max-height: 300px;
        .input-price{
            margin: 20px 0;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            .input{
                width: 70%;
                padding: 5px 10px;
                border: 1px solid #2364bc;
                border-radius: 5px;
            }

        }
        .select-token{
            height: 230px;
            overflow-y: auto;
        }
        .selectBG{
            background: #eee;
        }
        .token-box{
            .left-logo{
                display: flex;
                align-items: center;
                .left-img{
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                span{
                    font-size: 16px;
                }
                span:nth-child(3){
                    color: #666;
                }
            }
            .right-price{
                line-height: 16px;
                b{
                    color: #000;
                    font-size: 16px;
                }
            }
            .del-token{
                height: 52px;
            }    
            .token-price{
                p:nth-child(2){
                    font-size: 14px;
                    color: #666;
                }
                font-size: 18px; 
                text-align: right;
            }

        }
    }
}
</style>