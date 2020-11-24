<template>
  <div>
    <div class="bg-box" :style="{'padding-top':$store.state.appTop }"></div>
    <div class="pageheader" :class="{'changeHeader':changeHeader  }" :style="{'padding-top':$store.state.appTop }">
        <span slot="left" class="icon" @click="back">
          <van-icon name="arrow-left" class="vanicon"/>
        </span>
        <span class="pageheader-headline">{{headline}}</span>
        <span class="pageheader-title icon" @click="isScan" v-if="title=='scan'">
          <van-icon name="scan" />
        </span>
        <span v-else class="pageheader-title icon">{{title}}</span>


    </div>

  </div>
</template>
<script>
export default {
  props:['goBack','changeHeader'],
  created(){

  },
  methods:{
    back(){
      if(this.goBack){
        this.$router.push({name:this.goBack})
      }else{
        this.$router.go(-1)
      }
    },
    isScan(){  
      
    }
  },
  computed:{
    title(){
      return this.$route.meta.title
    },
    headline(){
      return this.$route.meta.headline
    },


  }
};
</script>
<style lang="scss" scoped>
.changeHeader{
  background: rgba(0, 0, 0, 0)!important;
  color: #fff!important;
  .van-icon{
    color:#fff!important;}
}
.van-icon{
  color:#000 ;
}
// .vanicon{
//   position: relative;
//   left:-1px;
//   top:-1px;
//   font-size: 22px;
// }
.bg-box{
  height: 46px;
}
.pageheader{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  line-height: 46px;
  height: 46px;
  background: #fff;
  z-index: 999999;
  display: flex;
  justify-content:space-between;
  font-size: 16px;
  color:#111111;
  padding: 0 10px;
  .icon{
     font-size: 22px; 
     display: flex;
     align-items: center;
     width: 25px;
  }
}
// .pageheader-title{
//   font-size:16px;
//   color:#111111;
// }
// .pageheader-headline{
//   position: relative;
//   left:100%;

//   @extend .pageheader-title;
// }
</style>