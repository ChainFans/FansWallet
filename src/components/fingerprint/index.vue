<template>
    <div class="container-fingerprint">
    <van-dialog
        :showConfirmButton="false"
        v-model="fingerprint_show"
        show-cancel-button
        class="fingerprint"
        @cancel="cancel"
    >
        <div class="fingerprint-box">
          <div class="fingerprint-img">
            <img src="@/assets/images/other/fingerprint.png" alt="">
          </div>
          <p>{{fingertext}}</p>           
        </div>
       
    </van-dialog>


    </div>
</template>
<script>
export default {
    // props:['vibrate'],
    data() {
        return {
            zhiwen: false,
            showFinger: false,
            fingertext: '请验证指纹',
            fingerprint_show:true

        }
    },
    created(){

        // this.vibrate()

    },
    mounted(){
        this.fingerprintVerification()
        document.addEventListener("pause", function(){
           plus.fingerprint.cancel();
        }, false);
        document.addEventListener("resume", ()=>{
            this.fingerprintVerification()
        }, false);
    },
    methods:{
        cancel(){
            if(window.plus){
                plus.fingerprint.cancel();
            }
            
            this.$emit('testState',0)
        },
        vibrate(){
            if(window.plus){
                plus.device.vibrate(500);
            }
        },
        fingerprintVerification() {
            let _this = this;
            if(this.zhiwen) {
                this.zhiwen = false;
                return;
            }
            if(!window.plus) return;
            // 检查是否支持指纹识别
            if(plus.fingerprint) {
                if(!plus.fingerprint.isSupport()) {

                    plus.nativeUI.alert('此设备不支持指纹识别');
                    return;
                }
                // if(!plus.fingerprint.isKeyguardSecure()) {
                //     plus.nativeUI.alert('此设备未设置密码锁屏，无法使用指纹识别');
                //     return;
                // }
                if(!plus.fingerprint.isEnrolledFingerprints()) {
                    plus.nativeUI.alert('此设备未录入指纹，请到设置中开启');
                    return;
                }

                //开启指纹识别验证()
                this.showFinger = true
                this.fingertext = '请扫描指纹'

                var waiting = null;
                plus.fingerprint.authenticate(function() {
                    // _this.$toast('指纹识别成功');
                    // _this.zhiwen = true
                    // _this.showFinger = false;
                    _this.$emit('testState',1)
                }, function(e) {
                    switch(e.code) {
                        case e.AUTHENTICATE_MISMATCH:
                            _this.$toast('指纹匹配失败，请重试!');
                            _this.fingertext = '指纹匹配失败，请重试'
                            break;
                        case e.AUTHENTICATE_OVERLIMIT:
                            plus.nativeUI.alert('指纹识别失败次数超出限制，请使用其它方式进行认证');
                            _this.showFinger = false;
                            break;
                        default:
                            // _this.$toast('指纹识别失败');
                            _this.fingertext = '指纹识别失败'
                            break;
                    }
                })

            } else {
                plus.nativeUI.alert('当前环境不支持指纹识别API，请更新到最新版本');
            }
        },

    }
}
</script>
<style scoped lang="scss">
.container-fingerprint{
    .fingerprint-box{
        height: 200px;
        padding:10px 0;
        text-align: center;
        .fingerprint-img{
            width: 100px;
            height: 100px;
            margin: 20px auto;
            img{
            width: 100%;
            height: 100%;
            }
        }
        p{
            margin-top: 30px;
        }
    }
}
</style>