<template>
    <div class="fingerprint-container">
        <p class="nickname"> {{nickname}} </p>
          <div class="fingerprint-img" @click="verify_finger()">
            <img src="@/assets/images/other/fingerprint.png" alt="">
          </div>
        <fingerprint v-if="fingerprint_show" @testState="testState"></fingerprint>
    </div>
</template>
<script>
import fingerprint from "@/components/fingerprint";
export default {
    components: {
        fingerprint
    },
    data(){
        return {
            fingerprint_show:false,
            nickname:''
        }
    },
    created(){
        setTimeout(()=> {
            this.fingerprint_show=true
        },300)
        if(window.plus){
            this.nickname = JSON.parse(plus.storage.getItem('userData')).nickname
        }else{
            this.nickname = JSON.parse(localStorage.getItem('userData')).nickname
        }
    },
    methods:{
        testState(state){
           this.fingerprint_show = false
            if(state==1){  //验证成功
                this.$router.push({name:'wallet'})
            }
        },
        verify_finger(){
            this.fingerprint_show=true;
            if(window.plus){
                plus.device.vibrate(500)
            }
        }
    }
}
</script>
<style scoped lang="scss">
.fingerprint-container{
    overflow: hidden;
    .nickname{
        position: absolute;
        top: 120px;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 26px;
        font-weight: 600;
    }
    .fingerprint-img{
        width: 100px;
        height: 100px;
        margin: 40vh auto;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .cancel{
        position: absolute;
        bottom: 30px;
        right: 50px;
        font-size: 16px;
    }
}  
</style>