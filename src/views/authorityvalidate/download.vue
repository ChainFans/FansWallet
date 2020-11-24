<template>
    <div class="download-container">
        <div class="main_img">
          <img src="@/assets/images/my_center/download.png" alt="">

        </div>
        <div class="down-btn" >
          <a :href="url">
            <img src="../../assets/images/my_center/android-btn.png" alt="">        
          </a>
        </div>
    </div>
</template>
<script>
import {app_version} from '@/api/chaincloud/coin_making'
export default {
    data(){
        return{
          url:''
        }
    },
    created(){
      this.downloadUrl()
    },
    methods:{
      downloadUrl(){
        app_version({appType:0}).then(res => {
          if(res.code === 0){
            this.url = res.data.url
          }else{
            this.$toast(res.messages)
          }
        }).catch(err => {
          this.downloadUrl()
        })
      }
      
    }
}
</script>
<style scoped lang="scss">
.download-container{
    height: 100vh;
    background: url('../../assets/images/my_center/download.png') no-repeat;
    background-size: 100%;
    background: linear-gradient(to bottom, #ffb199, #ff0844);
    overflow: hidden;
    .main_img{
      width: 100%;
      margin-top: 60px;
      img{
        width: 100%;
      }
    }
    .down-btn{
       position: absolute;
       top: 460px;
       left: 52%;
       transform: translate(-50%);
       width: 320px;
       height: 120px;
       img{
           width: 100%;
           height: 100%;
       }
    }
}
</style>