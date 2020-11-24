<template>
  <div class="companyprofile">
    <Pageheader />
    <div class="companyprofile-warp">
      <p class="companyprofile-title">武汉迷链科技有限公司</p>
      <p class="companyprofile-content">{{content}}</p>
    </div>
  </div>
</template>
<script>
import Pageheader from "../../../../components/pageheader";
export default {
  data() {
    return {
      content: ""
    };
  },
  created() {
    
    if(window.plus){
      this.content = plus.storage.getItem("brief");
    }else{
      this.content = localStorage.getItem("brief");
    } 
  },
  components: {
    Pageheader
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.companyprofile {
  background: #ececec;
  height: 100vh;
  .companyprofile-warp {
    width: 90%;
    height: 360px;
    margin-left: 5%;
    margin-top: 20px;
    border-radius: 6px;
    background: #fff;
    padding: 0 10px;
    box-sizing: border-box;
    .companyprofile-title {
      text-align: center;
      font-size: 18px;
      height: 50px;
      line-height: 50px;
    }
    .companyprofile-content {
      font-size: 15px;
      color: #4e4e4e;
      line-height: 30px;
    }
  }
}
</style>     