<template>
  <div class="onlineask" :style="{'height':clinetHeight}">
    <!-- <van-nav-bar>
      <van-icon name="arrow-down" slot="right" @click="back"/>
    </van-nav-bar>
    <div class="onlineask-window" :style="{'height':clinetHeightone}"></div>
    <div class="onlineask-bottom clearfix">
      <div class="emoticon"></div>
      <van-cell-group>
        <van-field center v-model="value" placeholder="请在此输入..." />
      </van-cell-group>
      <div class="additional"></div>
    </div> -->
  </div>
</template>
<script>

export default {
  data() {
    return {
      // value: "",
      // isshow:true,
      // clinetHeight:null,
      // clinetHeightone:null,
    };
  },
  mounted(){
    // document.write('<div id="LR_Operator_Div"></div>');
    // this.clinetHeight = document.documentElement.clientHeight + 'px';
    // this.clinetHeightone = Number(document.documentElement.clientHeight-'115') +'px'
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scope>
.lr_operator_tr1 {}
.lr_operator_tr2 {background-color: #e6e6e6;}
.lr_operator_online {COLOR: red;}
.lr_operator_away {COLOR: blue;}
.lr_operator_busy {COLOR: purple;}
.lr_operator_offline {COLOR: gray;}
.lr_operator {margin-left:15px;font-size: 9pt;}
//  .clearfix::after {
//     content: ".";
//     display: block;
//     height: 0;
//     clear: both;
//     visibility: hidden;
//   }
// .onlineask {
//   height: 100%;
//   .van-cell-group{
//      width: 80%;
//      height:100px;
//      display: inline-block;
//     //  margin-left: 10%;
//     margin-top: 10px;
//   }
//   .van-cell{
//     height:inherit
//   }
//   .van-nav-bar {
//     height: 120px;
//     background-color: #393a3f;
//   }
//   .van-nav-bar__right {
//     font-size: 50px;
//     bottom: 35px;
//   }
//   .van-icon {
//     color: #fff !important;
//   }
//   [class*=van-hairline]::after {
//     border: none;
//     border-bottom: 1px solid #ccc;
//   }
//   .onlineask-window {
//     background: rgb(235, 235, 235);
//     overflow:auto;
//   }
//   .onlineask-bottom {
//     width: 100%;
//     position: fixed;
//     height: 150px;
//     bottom: 0;
//     border-top:1px solid #ccc;
//     .emoticon{
//       width:80px;
//       height:80px;
//       float: left;
//       margin-top:35px; 
//       border-radius: 50%;
//       background: #ccc;
//     }
//     .additional{
//       @extend .emoticon;
//       float: right
//     }
//   }
// }
</style>  