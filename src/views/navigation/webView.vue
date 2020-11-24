<template>
    <div>

    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        plus.webview.open('https://tokenlon.im/lon/dashboard?locale=zh-cn&utm_source=imtoken/','window1',{top:0,bottom:0,
            progress:{
				color:'#2364bc'
            } 
        }); 
    },
}
</script>
<style>

</style>