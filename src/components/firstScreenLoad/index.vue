<template>
    <div class="screen-loading">
        <!-- <lazy-component> -->
            <img src="@/assets/images/other/startLoad.png" alt="">
        <!-- </lazy-component> -->
    </div>
</template>
<script>
import { app_version } from '@/api/chaincloud/coin_making'
export default {
    data(){
        return {

        }
    },
    created(){
        if(window.plus){
            setTimeout(()=>{
                plus.navigator.setFullscreen(true);  
                plus.navigator.setStatusBarStyle("dark");
          
                this.versionInfo()
            },500)
        }else{
            this.routeInit()
        }
    },
    beforeDestroy(){
        // window.plus && plus.navigator.setFullscreen(false);
    },
    methods:{
         //检测新版本      
        versionInfo(){  
            if(window.plus){
                app_version().then(res => {   
                    this.routeInit() 
                    if(res.code === 0){             
                        plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
                        res.data.app_version = wgtinfo.version
                        plus.storage.setItem('version_data',  JSON.stringify(res.data)) 
                        });
                    }else{

                    }
                }).catch(err => {
                    this.routeInit()
                })
            }
        },
        //手势，指纹登录
        routeInit(){  
            if (window.plus) {

                    let isFingerprint = plus.storage.getItem("fingerprint") ? plus.storage.getItem("fingerprint") : 0; //指纹登录
                    // let isGesture = plus.storage.getItem("gesture") ? plus.storage.getItem("gesture") : 0; //手势登录
                    // console.log('isGesture', isGesture)
                    //手势和指纹都未开启 直接跳过
                    //指纹开启并且已验证 直接跳过
                    //指纹关闭并且手势开启且已验证 直接跳过
                    if (isFingerprint == 0) {
                        this.$router.push({path:'/wallet'})
                  
                    } else if (isFingerprint == 1) {
                        this.$router.push({path:'/finger_login'})    
                    } 
                    // else if (isGesture == 1) {
                    //     this.$router.push({path:'/gesture_login?optionType=0&toPath=/wallet'})
                    // }

                

            } else {
  

                    this.$router.push({path:'/wallet'})
                    // let isFingerprint = localStorage.getItem("fingerprint") ? localStorage.getItem("fingerprint") : 0; //指纹登录

                    // let isGesture = localStorage.getItem("gesture") ? localStorage.getItem("gesture") : 0; //手势登录


                    // //手势和指纹都未开启 直接跳过
                    // //指纹开启并且已验证 直接跳过
                    // //指纹关闭并且手势开启且已验证 直接跳过
                    // if (isFingerprint == 0 && isGesture == 0) {
                    //     this.$router.push({path:'/chaincloud'})              
                    // } else if (isFingerprint == 1) {
                    //     this.$router.push({path:'/finger_login'})    
                    // } else if (isGesture == 1) {
                    //     this.$router.push({path:'/gesture_login?optionType=0&toPath=/chaincloud'})
                    // }
                
            }
        }
    }
}
</script>
<style scoped lang="scss">
.screen-loading{
position: absolute;
top: 0;
bottom: 0;
left: 0;;
right: 0;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>