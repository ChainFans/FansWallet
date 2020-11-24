<template>
    <div class="container-outerChain">
        <div class="header van-hairline--bottom">
            <van-icon name="arrow-left" class="back" @click="back" />&emsp;
        </div>
        <iframe :src="$route.query.url" width="100%" frameborder="0" scrolling="auto" class="iframe" ></iframe>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            fromUrl:''
        }
    },
    created(){
        this.$toast.loading({
            mask: false,
            message: '加载中...',
            duration:600
        });
   
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.fromUrl = from.name
        })
    },
    methods:{
        back(){
            if(this.fromUrl == 'deployed'){
                this.$router.back()
            }else{
                this.$router.push({name:this.fromUrl})
            }
            
        }
    }

}
</script>
<style scoped lang="scss">
.container-outerChain{
    .iframe{
        height: calc(100vh - 40px ) ;
    }
    .header{
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 18px;
        padding: 0 10px;
        .back{
            font-size: 20px;
        }
    }
}
</style>