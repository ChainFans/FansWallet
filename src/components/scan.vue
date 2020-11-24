<template>
  <div>
   
      <div class="header">
          <van-icon name="arrow-left" class="back" @click="cancelScan" />
          <span>二维码</span>
          <span @click="galleryImg">相册</span>
      </div>  
   
    <!-- <div class="mui-content"> -->
      <div class="scan">
        <div id="bcid">
          <div class="content"></div>
          <p class="tip">...载入中...</p>
        </div>
        <!-- <footer>
          <button @click="startScan" v-show="isShow">点击扫描</button>
          <button @click="cancelScan">取消</button>
        </footer> -->
      </div>
    <!-- </div> -->




  </div>
</template>

<script  type='text/ecmascript-6'>

  let scan = null;
  //点手机虚拟返回键
     document.addEventListener("plusready", function() {
        // 注册返回按键事件
        plus.key.addEventListener('backbutton', function() {
            // 事件处理
            // window.history.back();
            
            scan.cancel();//关闭扫描
            scan.close();//关闭条码识别控件
        }, false);
    });
    
  export default{
      data(){
        return{
          codeUrl: '',
          isShow:false,
          scan:null
        }
      },

      mounted () {
        this.startScan()//进入页面就调取扫一扫
      },
      created(){
    
        // this.startRecognize();
        // this.startScan();
      },
      beforeDestroy(){
        console.log('back')
        // this.$router.back()
        scan.cancel();//关闭扫描
        scan.close();//关闭条码识别控件
      },
      methods: {
        galleryImg() {
          let that = this;
          plus.gallery.pick( function(path){
            	plus.barcode.scan( path, function(type,result) {
                that.$router.push({path:'/wallet_transfer',query:{qrAddress:result}})
                console.log("Scan success:("+type+")"+result);
              }, function(e){
                that.$toast('未识别到二维码!')
                console.log("Scan failed: "+JSON.stringify(e));
              } );

          }, function ( e ) {
            console.log( "取消选择图片" );
          }, {filter:"image"} );
        },

      //创建扫描控件
      startRecognize() {
        let that = this;
        if (!window.plus) return;
        // 创建条码扫描识别控件
        scan = new plus.barcode.Barcode('bcid',['QR'],{
          frameColor:'#2c93fb',
          scanbarColor:'#2c93fb'
        });
        // 条码识别成功
        scan.onmarked = onmarked;
        function onmarked(type, result, file) {
          switch (type) {
            case plus.barcode.QR:
              type = 'QR';
              break;
            case plus.barcode.EAN13:
              type = 'EAN13';
              break;
            case plus.barcode.EAN8:
              type = 'EAN8';
              break;
            default:
              type = '其它' + type;
              break;
          }
          result = result.replace(/\n/g, '');
          that.codeUrl = result;//扫描后返回值
            



        //   alert(result);
          scan.cancel();//关闭扫描
          scan.close();//关闭条码识别控件
          if(that.codeUrl){
            console.log(that.codeUrl)
            that.$router.replace({path:'/wallet_transfer',query:{qrAddress:that.codeUrl}})
          }
        }
      },
      //开始扫描
      startScan() {
        if (!window.plus) return;
        this.startRecognize()//创建控件
        scan.start();
      },

      cancelScan(){
        this.$router.back()
        // this.isShow=true;
        scan.cancel();//关闭扫描
        scan.close();//关闭条码识别控件
      }
    }
  };
</script>
<style scoped lang="scss">
.header{
    height: 50px;
    // border-bottom: 0.5px #333 solid;  
    background: rgba(0, 0, 0, 0.3);  
    display: flex;
    align-items: center; 
    color: #fff;  
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    .back{
        line-height: 50px;
        font-size: 22px;
        width: 30px;
    }
    span{
        font-size: 16px;
    }
}
//  .mui-content{
//   padding: 44px 0 60px 0;/*px*/
//   box-sizing: border-box;
//   // margin-top: 60px;/*px*/
// }
.scan {
    height: 100%;
}
.scan #bcid {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom:0;
      text-align: center;
      color: #fff;
      background: #ccc;
}
.scan footer {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: 1rem;
      width: 100%;
      height: 1rem;
      /*line-height: 2rem;*/
      z-index: 2;
      display: flex;
      justify-content: center;
}
.scan footer button{
  width: 45%;
  font-size: 20px;/*px*/
}
.clickBtn,.cancelBtn{
  margin-top:20px;/*px*/
  width: 150px;/*px*/
  height: 60px;/*px*/
  text-align: center;;
}
.cancelBtn{
  margin-left: 20px;/*px*/
}
</style>