<template>
    <div class="container-quotation">
      <div class="header">
          <van-icon name="arrow-left" class="back" @click="$router.back()" />
      </div>
      <div class="nav-data">
          <div class="nav-top">
              <span>￥</span>
              <b>10000.05</b>
                 
              
              
          </div>
      </div>
      <div class="echarts-box">

      </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            
        }
    },
    methods:{
        
    }
}
</script>
<style scoped lang="scss">
.container-quotation{
    background: #eee;
    .header{
        height: 50px;
        border-bottom: 1px #eee solid;  
        background: #fff;     
        .back{
            line-height: 50px;
            font-size: 22px;
            margin-left: 10px;
            width: 30px;
        }
    }
    .nav-data{
        height: 150px;
        background: #fff;
        .nav-top{
            padding: 0 10px;
            span{
                font-size: 14px;
                color: red;
            }
            b{
                color: red;
                font-size: 24px;
            }
        }
    }
    .echarts-box{
        margin-top: 5px;
        height: 300px;
        background: #fff;
    }
}
</style>