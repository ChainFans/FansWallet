<template>
    <div class="container-outerChain">
        <div class="header van-hairline--bottom">
            <Pageheader />
        </div>
        <iframe src="http://plt.zoosnet.net/LR/Chatpre.aspx?id=PLT72450935&lng=cn" width="100%" frameborder="0" scrolling="auto" class="iframe" ></iframe>

    </div>
</template>
<script>
import Pageheader from "@/components/pageheader";
export default {
    components: {
        Pageheader,
    },
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
            this.$router.push({name:this.fromUrl})
            
        }
    }

}
</script>
<style scoped lang="scss">
.container-outerChain{
    .iframe{
        height: calc(100vh );
        position: absolute;
        top: 0px;

    }
    .header{
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 18px;
        padding: 0 10px;
        z-index: 999;
        background: #fff;
        .back{
            font-size: 20px;
        }
    }
}
</style>