<template>
    <div id="header" class="flex-box split-line">
        <div class="flex-title">         
            <span>首页</span>           
        </div>
           
        <!-- <div class="contact-btn">
            <a :href="'tel:' + 12345678" tag="span" class="flex-box">
                <van-icon name="phone"  id="header-phone" class="icon flex-log" size="25px"/>
            </a>
        </div> -->
        <div class="contact-btn">
            <div  class="flex-box" @click="$router.push({name:'consultation'})">
                <img src="@/assets/images/other/service.png" alt="">
            
            </div>
            <!-- <a href="http://plt.zoosnet.net/LR/Chatpre.aspx?id=PLT72450935&lng=cn" tag="span" class="flex-box" @click="$router.push({name:'consultation'})">
                <img src="@/assets/images/other/service.png" alt="">
            
            </a> -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>
#header{
    background: #fff;
    height:50px;
    padding: 0 10px; 
    box-sizing: border-box;
    position: fixed;
    width: inherit;
    z-index: 9999;
    border-bottom: 1px solid #dcdcdc;
    .logo {
        height:40px;   
    }
    .headerImg {
        height:30px;       
        // vertical-align: middle;
    }
    .flex-title{
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        font-size: 18px;
        span{
            line-height: 50px;
        }
        
    }
    .flex-log{
        display: flex;
        align-items: center;

        flex: 1;  

    }
    .contact-btn{
        display: block;
        width:35px;
        height:35px;
        position: absolute;
        top: 10px;
        right: 12px;
        width: 26px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
.flex-box{
    display: flex;
    align-items: center;
    -webkit-box-align: center;
}
// .split-line {
//     position: relative;
//     &::after {
//         content: '';
//         width: 100%;
//         border-bottom: 3px solid #e8e8e8;
//         position: absolute;
//         left: 0;
//         bottom: 0;
//         transform: scaleY(0.5);
//         transform-origin: 0 100%;
//         z-index: 9;
//     }
// }

</style>

