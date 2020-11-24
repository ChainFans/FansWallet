<template>
  <div class="sharefriend">
    <div class="header">
        <van-icon name="arrow-left" class="back" @click="$router.back()" />
    </div>
    <div class="shareBg"></div>
    <div class="sharefriend-warp">
      <div class="sharefriend-code">
        <p class="code">
          <span class="code-text">邀请码：</span>
          <span class="code-num"           
          v-clipboard:copy="code"
          v-clipboard:success="onCopy">
            {{code}}
          </span>
        </p>
        <div class="qr-box" ref="ticket">
          <div class="qrcode" ref="qrCodeUrl"></div>
        </div>
        <van-button
          round type="info"
          class="tag-read"
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          @click="shareShow=true"
        >分享</van-button>
      
        <div class="friend-bottom">
          <p>奖励规则：</p>
          <p>一代会员奖励5%</p>
          <p>二代会员奖励15%</p>
          <p>在此平台发行Token均可参加活动</p>
        </div>
      </div>
    </div>

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
          v-clipboard:copy="copyUrl"
          v-clipboard:success="onCopy">
            <img src="@/assets/images/my_center/share/copy.png" >
          </div>
          <p>复制链接</p>
        </div>

      </div>
    </van-action-sheet>

  </div>
</template>
<script>

import QRCode from "qrcodejs2";
export default {
  name: "myfriend",
  data() {
    return {
      qrCodeHeight:'',
      message: "复制成功",
      code: "",
      erweima: null,
      copyUrl:'',
      shareShow:false
    };
  },

  created() {
    this.realname();
    
  },
  mounted() {
    this.qrCodeHeight = this.$refs.qrCodeUrl.offsetHeight
    this.creatQrCode();
  
  },
  methods: {
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

      　　let msg = {
      　　　　type: type=='weixin'?'web':'text',　　//分享的内容的类型 
      　　　　title: '迷链钱包',
      　　　　content: '迷链钱包APP注册',
      　　　　thumbs: ['http://api.ecs.chainfans.io/cfcdn/203/155-f8cd2dbfa9954c60ad02def0d79b9301.png'],
      　　　　href: that.copyUrl,
      　　　　extra:{scene:scene} // 'WXSceneSession'分享给好友，'WXSceneTimeline'分享到朋友圈
      　　}

      　　//msg对象的属性和参数 官方文档里有说明
      　　//这里就用到了上面获取到的 微信对象 使用send发起分享
            sharewx.send(msg, function() {
        
      　　　　console.log('分享成功')
      　　},function(e) {
            console.log('分享失败')
            // alert("分享失败："+e.message);
      　　})
          that.$toast.clear()


  　　})
  　　
    },


    leftClick() {
      this.$router.go(-1);
    },
    realname() {
      let data;
      if(window.plus){      
        data = JSON.parse(plus.storage.getItem("userData"));
      }else{
        data = JSON.parse(localStorage.getItem("userData"));
      } 
      this.code = data.inviteCode;
      this.copyUrl= `https://cloud.chainfans.io/#/linkreg?inviteCode=${this.code}`
      // this.copyUrl= `http://cloud.chainfans.io/#/linkreg?inviteCode=${this.code}`

    },
    creatQrCode() {
      const qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.copyUrl,
        width: this.qrCodeHeight,
        height: this.qrCodeHeight,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    },
    onCopy(e) {
      this.$toast("复制成功");
    },
    onError(e) {
      this.$toast("复制失败");
    }
  }
};
</script>
<style lang="scss" scoped>
.sharefriend {
  height: 100vh;  
  background: #a190c4;
 
  .header{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
      z-index: 999; 
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      color: #fff;
      .back{
          font-size: 22px;
          width: 30px;        
      }
      span{
        font-size: 16px;
        
      }
  }
  .shareBg{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('../../../assets/images/my_center/shareFriend.png') no-repeat;
    background-size: 100%;
    z-index: 0;
  }
  .sharefriend-warp {
    // height: 100vh;
    // background: #eee;
    position: relative;
  }
  .sharefriend-code {
    position: absolute;
    top: 225px;
    left: 50%;
    transform: translate(-50%);
    width: 70%;
    height: 80%;
    text-align: center;
    .qr-box{
      width: 130px;
      height: 130px;
      margin: 15px auto;
      padding: 5px;
      box-sizing: border-box;
      background: #fff;
      .qrcode {      
        width: 120px;
        height: 120px;
      }
    }
    .code {
      color: #ffe04c;
      text-align: center;
      font-size: 18px;
    }
  }
  .tag-read {
    background: #2364bc;
    color: #fff;
    border: none;
    width: 130px;
    height: 42px;
    margin: 0px auto;
    font-size:16px;
    letter-spacing:3px;
  }
  .friend-bottom{
    margin-left: 25px;
    margin-top: 50px;
    width: 230px;
    height: 100px;
    text-align: left;
    padding: 5px;
    box-sizing: border-box;
    color: #974bf5;
    font-weight: 600;
    p:nth-child(1){
      font-size: 15px;
    }
    p{
      font-size: 13px;
    }
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
}
</style>