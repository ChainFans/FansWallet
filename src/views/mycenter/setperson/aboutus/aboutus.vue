<template>
  <div class="aboustus">
    <Pageheader />
    <div class="aboustus-img">
      <img src="../../../../assets/images/my_center/logo.png" />
      <p class="aboustus-title">迷链钱包</p>
      <p class="aboustus-version">Version-{{version}}</p>
    </div>
    <div class="setfunction">
      <van-cell title="公司名称" :value="name" />
      <van-cell title="版本日志" is-link center @click="logClick" />
      <van-cell is-link @click="lookupdate" :value="newVersionData.versionNo">
        <template slot="title">
          <span class="custom-title">版本更新</span>&nbsp;
          <van-tag round type="danger" v-if="newVersionData.versionNo!=version">NEW</van-tag>
        </template>
      </van-cell>

      
    </div>
    <div class="sethelp">
      <van-cell title="名称" center :icon="require('@/assets/images/about/company.png')" :value="name" class="name" />
      <van-cell
        title="网站"
        :icon="require('@/assets/images/about/web.png')"
        center
        :value="website"
        v-clipboard:copy="copywebUrl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        class="website"
      />
      <van-cell
        title="邮箱"
        :icon="require('@/assets/images/about/email.png')"
        center
        :value="mailbox"
        v-clipboard:copy="copymailUrl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        class="font"
      />
      <van-cell
        title="电话"
        :icon="require('@/assets/images/about/tel.png')"
        center
        :value="phone"
        v-clipboard:copy="copyphoneUrl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        class="font"
      />
      <van-cell
        title="微博"
        :icon="require('@/assets/images/about/weibo.png')"
        center
        :value="weibo"
        v-clipboard:copy="copyweiboUrl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        class="font"
      />
      <van-cell
        title="Twiter"
        :icon="require('@/assets/images/about/twiter.png')"
        center
        :value="witer"
        v-clipboard:copy="copywiterUrl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        class="font"
      />
    </div>
  </div>
</template>
<script>
import { getaboutus } from "../../../../api/mycenter/aboutus.js";
import CryptoJS from "crypto-js";
import Pageheader from "../../../../components/pageheader";
import { app_version } from '@/api/chaincloud/coin_making'
export default {
  data() {
    return {
      list: [],
      obj: {},
      appname: "",
      name: "",
      website: "",
      mailbox: "",
      phone: "",
      version: "",
      newVersionData:'',
      weibo: "",
      witer: "",
      brief: "",
      copywebUrl:"http://www.chainfans.io",
      copymailUrl:"717790448@qq.com",
      copyphoneUrl:"027-59762021",
      copyweiboUrl:"@ChainFans",
      copywiterUrl:"ChainFans@bqicelove"
    };
  },
  components: {
    Pageheader
  },
  computed:{ 
    isUpdate(){
      if(window.plus && this.$store.state.newVersion){
        return true       
      }else{
        return false
      }
    }
    
    
  },
  created() {
    this.getus();
    this.versionInfo()
      
  },
  // mounted(){
  //   this.getURL();
  // },
  methods: {
     //检测新版本      
    versionInfo(){  
        if(window.plus){
          plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
              this.version = wgtinfo.version
          })

            app_version({appType:0}).then(res => {    
                if(res.code === 0){
                   this.newVersionData = res.data
                }else{
                    this.$dialog.alert({
                        message: '无法访问网络，点击重试'
                
                    }).then(() => {
                        this.versionInfo()
                    });
                }
            }).catch(err => {
                this.$dialog.alert({
                    message: '无法访问网络，点击重试'
                
                }).then(() => {
                    this.versionInfo()
                });
            })
        }
    },
    onCopy(e) {
      this.$toast("复制成功");
    },
    onError(e) {
      this.$toast("复制失败");
    },
    installApk(url) {   //版本更新
      // plus.nativeUI.showWaiting("正在更新软件，请稍后...");
      this.$toast.loading({
        message: '正在更新，\n请稍后...',
        forbidClick: true,
        duration: 0,
      });
      
      var dtask = plus.downloader.createDownload(url, {}, (d, status)=> {
        if(status == 200) {
          plus.nativeUI.closeWaiting();

          var path = d.filename;         
          plus.runtime.install(path,{force:false},()=>{
                // plus.nativeUI.closeWaiting();
                this.$toast.clear();
                console.log("安装wgt文件成功！");
                // localStorage.setItem('newVer', newVer);
                // H5 plus事件处理,弹出提示信息对话框
                this.$dialog.confirm({
                  title: '版本更新',
                  message: '更新成功，是否重新打开应用'
                }).then(() => {
                    plus.runtime.restart();
                }).catch(() => {
         
  
                })

              }
              ,function(e){
                plus.nativeUI.closeWaiting();
                console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
                plus.nativeUI.alert("安装失败[" + e.code + "]：" + e.message);
              }
          );
         
        } else {
          plus.nativeUI.closeWaiting();
          this.$dialog.confirm({
                  title: '版本更新',
                  message: '更新失败，是否重新下载'
                }).then(() => {
                    this.installApk(url)
                }).catch(() => {

                })
        }
        
      });
      dtask.start();
    },
    lookupdate() {  
      if(window.plus){
          if(this.newVersionData.versionNo == this.version){
            this.$toast("已经是最新版本");
          }else{
            this.$dialog.confirm({
              title: '版本更新',
              message: '是否更新到最新版本'
            }).then(() => {
              this.installApk(this.newVersionData.url)
            }).catch(() => {
              // on cancel
            });
          }
        


      }
        
    },
    getus() {
      getaboutus().then(res => {
        if (res.code === 0) {
          this.list = res.data;
          this.list.forEach((item, key) => {
            switch (item.key) {
              case "CompanyName":
                this.name = item.value;
                break;
              case "CompanyWebSite":
                this.website = item.value;
                break;
              case "CompanyEmail":
                this.mailbox = item.value;
                break;
              case "CompanyPhone":
                this.phone = item.value;
                break;
              case "CompanyWeibo":
                this.weibo = item.value;
                break;
              case "CompanyTwitter":
                this.witer = item.value;
                break;
              // case "SoftwareVersion":
              //   this.version = item.value;
              //   break;
              case "CompanyProfile":
                this.brief = item.value;
                break;
              case "SoftwareName":
                this.appname = item.value;
                break;
              // default:
              //   默认代码块;
            }
          });
          if(window.plus){
            plus.storage.setItem("brief", this.brief);
            if(!plus.storage.getItem("version")){
              // plus.storage.setItem("version", this.version);
            }           
          }else{
            localStorage.setItem("brief", this.brief);
            // localStorage.setItem("version", this.version);
          }  

        } else {
          this.$toast(`${res.messages}`);
        }
      });
    },
    profileClick() {
      this.$router.push({ name: "companyprofile" });
    },
    logClick() {
      this.$router.push({ name: "versionlog" });
    },
    lookaboutus() {
      this.$router.push({ name: "aboutus" });
    },
    back() {
      this.$router.go(-1);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    changeset() {
      this.$router.push({ name: "setaccount" });
    }
  }
};
</script>
<style lang="scss" scoped>
.van-cell__value {
  overflow: visible;
}
.name {
  .van-cell__title {
    flex: none;
  }
}
.van-cell {
  padding: 10px;
}
.website {
  .van-cell__value {
    span {
      text-decoration: underline;
      color: #4262de;
    }
  }
}
.font {
  .van-cell__value {
    span {
      color: #4262de;
    }
  }
}
.aboustus {
  background: #ececec;
  height: 100vh;
  .aboustus-img {
    height: 150px;
    text-align: center;
    img {
      width: 50px;
      height: 50px;
      margin-top: 30px;
    }
    .aboustus-title {
      font-size: 16px;
      font-weight: 900;
    }
  }
}
.setbox {
  margin: 65px 0;
}
.setfunction {
  margin: 25px 0;
}
.sethelp {
  // margin-bottom: 20px;
}
.custom-title {
  text-align: center;
  // width: 100%;
  display: inline-block;
}
</style>     