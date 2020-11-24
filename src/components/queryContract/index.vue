<template>
    <div class="container-contract">
        <pageheader></pageheader>
        
    </div>
</template>
<script>
import pageheader from '@/components/pageheader'
export default {
    components:{pageheader},
    data() {
        return {
            
        } 
    },
    created(){
        plus.webview.open(this.$route.query.url,'window',{top:'50px',bottom:'0px'}); 
   
    },
    beforeDestroy(){
        plus.webview.close( 'window' );
    },
    methods:{

    }

}
</script>
<style scoped lang="scss">
.container-contract{

}
</style>