<template>
    <div class="container">
        <div class="banner">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>
              <van-image :src="require('@/assets/images/qka-1.png')" />
            </van-swipe-item>
            <van-swipe-item><van-image :src="require('@/assets/images/qka-2.png')" /></van-swipe-item>
            <van-swipe-item><van-image :src="require('@/assets/images/qka-3.png')" /></van-swipe-item>
          </van-swipe>
        </div>
        <div class="status-box">
          <van-button @click="$router.push({ path:'/identity',query:{type:1} })" type="primary" class="createBtn" round block>创建钱包</van-button>
          <van-button @click="$router.push({ path:'/identity',query:{type:2} })" type="primary" class="importBtn" round block>导入钱包</van-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
          
        }
    },
    created(){
        if(window.plus){
            this.$store.state.appTop = (plus.navigator.getStatusbarHeight()) + 'px'
            plus.navigator.setFullscreen(false);
        }

    },
}
</script>
<style lang="scss" scoped>
.container{
    .banner{
        .my-swipe .van-swipe-item {
          height: 380px;
          img{
            width: 100%;
            height: 100%;
          }
        }
    }
    .status-box{
        width: 280px;
        height: 140px;
        margin: 100px auto 0;
          .createBtn{
            background: rgb(52, 192, 235);
            margin: 15px 0;
            border: 0;
          }
          .importBtn{
            background: rgb(71, 206, 71);
            border: 0;
          }
    }
}
</style>