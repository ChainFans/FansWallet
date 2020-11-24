<template>
    <div class="main">
        <div class="container" :class="{active:this.$route.path==='/mycenter'}" >

        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>   
        <router-view v-if="!$route.meta.keepAlive"></router-view>
           
        </div>
        <tabbar></tabbar> 
    </div>
</template>
<script>
import Header from '@/components/header'
import Tabbar from '@/components/footer'
export default {
    name: 'Layout',
    data(){
        return{}
    },
    components: {
        Header,
        Tabbar
    },
    computed: {
        // title() {
        //     return this.$route.meta.title
        // },
        // name(){
        //     return this.$route.meta.name
        // },
    }
}
</script>

<style lang="scss" scoped>
.main {
    position: relative;
    width:100vw;
    height:100vh;
    .container{
        position: absolute;
        top:0px;
        right: 0;
        bottom:44px;
        left: 0;
        overflow-x: hidden;
        overflow-y:scroll;
    }
    .active{
        position: absolute;
        top:0;
        right: 0;
        bottom:50px;
        left: 0;
        overflow-x: hidden;
        overflow-y: scroll;
        height:100%;
    }
}
</style>