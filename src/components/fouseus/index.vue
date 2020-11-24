<template>
    <section class="focusUs">
            <div class="focusUs-warp clearfix">
                <div class="focusUs-left">
                <p>关注我们</p>
                <img src="../../assets/images/code.png" alt="">
                </div>
                <div class="focusUs-right flex-common">
                <ul>
                    <li>服务热线：027-5976-2021</li>
                    <li>商务邮箱：business@chainfans.io</li>
                    <li>Copyright&copy;2019武汉迷链科技有限公司版权所有</li>
                </ul>
                </div>
            </div>
    </section>
</template>
<script>
</script>
<style lang="scss" scoped>
  .focusUs{
    // margin-top: 15px;
    // position: fixed;
    // bottom:120px;
    // left: 0;
    width:100vw;
    z-index:999;
    .focusUs-warp{
      display: flex;
      padding:10px 15px;
      box-sizing: border-box;
      color: #fff;
      font-size:16px;
      background: #3d78d1;
      .focusUs-left{
        float: left;
        p{
          padding-bottom: 25px;
        }
        img{
          width: 100px;
          height:100px;
          background: transparent;
        }
      }
      .focusUs-right{
        margin-left:30px;
        ul{
          box-sizing: border-box;
          padding-top:5px;
          li{
            line-height: 30px;
          }
        }
      }
    } 
  } 
</style>


