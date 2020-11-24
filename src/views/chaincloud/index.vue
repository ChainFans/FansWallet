<template>
  <div class="chainCloud">
    <div >
      <van-swipe :autoplay="2500" indicator-color="#60d1f9"  class="swipe-img">
        <van-swipe-item>
          <img src="@/assets/images/home/l-1.png" @click="$router.push({name:'sharefriend'})" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/images/home/l-2.png" @click="$router.push({name:'custom_wallet'})" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/images/home/l-3.png" @click="$router.push({name:'custom_wallet'})" />
        </van-swipe-item>
      </van-swipe>
    </div>
   
      <van-notice-bar
        :text="noticeText"
        left-icon="volume-o"
        :delay="0.1"
        @click="$router.push({name:'noticeInfo'})"
      />
    <div class="fastToken-box">
      <div class="fast-img" @click="$router.push({name:'custom_wallet'})">
        <div class="title">发行Token</div>
        <img src="@/assets/images/home/deploy_btn1.png">
      </div>
      <div class="fast-img" @click="$toast('开发中')">
        <div class="title">部署Dapp</div>
        <img src="@/assets/images/home/deploy_btn2.png">
      </div>     
    </div>
    <div class="fastToken-box">
      <div class="fast-img" @click="$toast('开发中')">
        <div class="title">部署公链</div>
        <img src="@/assets/images/home/deploy_btn3.png" @click="$toast('开发中')">
      </div>
      <div class="fast-img" @click="$toast('开发中')">
        <div class="title">部署游戏</div>
        <img src="@/assets/images/home/deploy_btn4.png" @click="$toast('开发中')">
      </div>     
    </div>
    <div class="option-box">
      <img src="@/assets/images/home/option.png" alt="">
    </div>


    <div class="footerImg" v-if="clientHeight>700">
      <div class="my-logo">
        <img src="@/assets/images/home/footer.png" alt="">
      </div>
    </div>
    
    <van-dialog
      v-model="update_show"
      show-cancel-button
      class="update-box"
      :showCancelButton="isForce"
      confirm-button-text="立即更新"
      @confirm="installApk(versionData.url,1)"
      @cancel="installApk(versionData.url,0)"
    >
      <div class="update-content">
        <div class="update-img">
          <img src="@/assets/images/home/appUpdate.png">
        </div>
        <div class="update-title">发现新版本 <br> 
          <span>v{{versionData.versionNo}}</span>   
        </div>
        <p class="update-text" v-html="versionData.remark"></p>
  
      </div>
    </van-dialog>


  </div>
</template>
<script>

import {get_noticeList, get_funcList} from '@/api/chaincloud/coin_making'
export default {
  name:'chaincloud',
  data() {
    return {
      clientHeight:document.documentElement.clientHeight,
      noticeText:'',
      fingerprint_show:false,
      testState:0,
      update_show:false,  //更新弹框
      versionData:'',   //更新返回数据
      isForce:false,   //是否强制更新
    }
  },
  created(){
    this.noticeList()
    if(window.plus){      
      this.isUpdate()
    }
  },

  methods:{ 

    //下载安装
    installApk(url,forcedUpdate) {
      // plus.nativeUI.showWaiting("正在更新软件，请稍后...");
      this.$toast.loading({
        message: '正在更新，\n请稍后...',
        forbidClick: true,
        duration: 0,
      });   
      var dtask = plus.downloader.createDownload(url, {}, (d, status)=> {
        if(status == 200) {
          //  plus.nativeUI.closeWaiting(); 
          this.$toast.clear();
          var path = d.filename;
          console.log(d.filename);
          
          plus.runtime.install(path,{force:false},()=>{
                this.$toast.clear();
                plus.runtime.restart();
              }
              ,function(e){
                this.$toast.clear();
                plus.nativeUI.alert("安装wgt文件失败");
              }
          );
         
        } else {
          // plus.nativeUI.closeWaiting();
          this.$toast.clear();
          this.$dialog.confirm({
                  title: '版本更新',
                  message: '更新失败，是否重新下载'
                }).then(() => {
                    this.installApk(url,forcedUpdate)
                }).catch(() => {
                  //判断是否强制更新
                  if(forcedUpdate!==1){
                    plus.runtime.quit();
                  }
                })
        }
        
      });
      dtask.start();
    },

    isUpdate(){   //检测新版本
      if(window.plus){
       this.versionData =  JSON.parse(plus.storage.getItem('version_data'))
        if(this.versionData.app_version != this.versionData.versionNo){
          this.update_show =true
            if(this.versionData.forcedUpdate==1){
              this.isForce = true
            }
        } 

      }
    },
    noticeList(){    //公告
      let params = {
        PageCount:10,
        GetType:'After',
        PagingParams:0
      }
      get_noticeList(params).then(res=> {     
          this.noticeText = res.data[0].title
      }).catch(err => {

      })
    }
  }
};
</script>
<style lang="scss" scoped>
.update-box{
  height: 360px;
  .update-content{
  position: relative;
    .update-img{
      width: 100%;
      height: 130px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .update-title{
      position: absolute;
      top: 16px;
      left: 0;
      right: 0;
      text-align: center;
      color: #fff;
       font-size:18px;
      span{
        font-size:13px;
      }
    }
    .update-text{
      height: 180px;
      padding: 10px 20px;
      box-sizing: border-box;
      white-space:pre-wrap;
      overflow-y: auto;
    }
  }
}
.chainCloud {
  margin-top: 50px;  
}
.fastToken-box{
  width: 350px;
  height: 56px;
  margin: 10px auto;
  position: relative;
  .fast-img{
    height: 56px;
    width: 168px;
    .title{
      position: absolute;
      top: 15px;
      left: 30%;
      right: 0;
      color: #fff;
      font-size: 18px;
    }
    img{
      width: 100%;
      height: 100%;
    }
  }
  .fast-img:nth-child(1){
    position: absolute;
    top: 0;
    left: 2px;
  }
  .fast-img:nth-child(2){
    position: absolute;
    top: 0;
    right: 2px;
  }
}
.option-box{
  img{
    width: 100%;
  }
}
.swipe-img {
  width: 100%;
  height: 180px;
  img{
    width: 100%;
    height: 100%;
  }
}

  .footerImg{   
    text-align: center;
    height: 120px;
    padding: 40px 0;
    box-sizing: border-box;
    background: rgba(245, 245, 245, 0.562);
    
    .my-logo{
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      
      img{
        height: 100%;
      }
    }
  }
</style>   