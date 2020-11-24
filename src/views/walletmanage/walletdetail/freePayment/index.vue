<template>
  <div class="container">
    <Pageheader />  
    <van-cell title="指纹识别"  center>
      <van-switch v-model="fingerprint" size="22px" @change="fingerprint_change()" />  
    </van-cell>

    <fingerprint v-if="fingerprint_show" @testState="testState"></fingerprint>

  </div>
</template>
<script>
import Pageheader from "@/components/pageheader";
import fingerprint from "@/components/fingerprint";
export default {
    components: {
        Pageheader,
        fingerprint
    },
    data(){
        return{
            fingerprint:false,
            fingerprint_show:false,
        }
    },
    created(){
        this.fingerprint = this.public_js.GetStorage('isFingerprintPay') ? this.public_js.GetStorage('isFingerprintPay')==1?true:false:false;   
    },
    methods:{
        fingerprint_change(){
            if(window.plus){
                // 检查是否支持指纹识别
                if(plus.fingerprint) {
                    if(!plus.fingerprint.isSupport()) {
                        this.$toast('此设备不支持指纹识别');
                        this.fingerprint = false
                        return;
                    }
                    if(!plus.fingerprint.isEnrolledFingerprints()) {
                        this.$toast('此设备未录入指纹，请到设置中开启');
                        this.fingerprint = false
                        return;
                    }
                    this.fingerprint_show=true
                }
            }else{
                this.$toast('此设备不支持指纹识别');
                this.fingerprint = false
            }
        },
        //验证结果
        testState(state){
            this.fingerprint_show = false
            if(state==1){  //验证成功
                plus.storage.setItem("isFingerprintPay",JSON.stringify(this.fingerprint?1:0))
                this.$toast(this.fingerprint?'开启成功':'关闭成功')
            }else{
                this.fingerprint = !this.fingerprint
            }
        },
    }
}
</script>
<style lang="scss" scoped>

</style>