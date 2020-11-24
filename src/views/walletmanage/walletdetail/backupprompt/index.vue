<template>
  <div class="prompt">
    <Pageheader />
    <div class="prompt-top">
      <p class="prompt-title">备份提示</p>
      <p class="prompt-desc">拥有{{exportType}}等于拥有钱包资产所有权</p>
      <div class="prompt-img">
        <img src="../../../../assets/images/wallet/1569727543(1).jpg" />
      </div>
    </div>
    <div class="prompt-main">
      <div>
        <p class="prompt-main__func">
          <span></span>
          备份{{exportType}}
        </p>
        <div class="prompt-func__desc">
          <p>使用纸和笔正确抄写{{exportType}}</p>
          <p>如果你的手机丢失、被盗、损坏、{{exportType}}将可以恢复你的资产</p>
        </div>
      </div>
      <div>
        <p class="prompt-main__func">
          <span></span>离线保管
        </p>
        <div class="prompt-func__desc">
          <p>妥善保管至隔离网络的安全地方</p>
          <p>请勿将{{exportType}}在联网环境下分享和存储，比如邮件、相册、社交应用等</p>
        </div>
      </div>
    </div>
    <van-button type="info" class="btn" @click="stepnext">下一步</van-button>
  </div>
</template>
<script>
import Pageheader from "../../../../components/pageheader";
export default {
  data() {
    return {
      showimg: false,
      showname: false,
      value: "",
      exportType:'',
    };
  },
  components: {
    Pageheader
  },
  created(){
 
    this.exportType = this.$route.query.tag
  },
  methods: {
    selectimgClick() {
      this.showimg = true;
    },
    changename() {
      this.showname = true;
    },
    stepnext() {
      if(this.$route.query.tag=="助记词"){
        this.$router.push({path:'/backupmnemonic'})
      }else{
        this.$router.push({path:'/exportprivatekey',query:{tag:this.$route.query.tag}})
      }
      // this.$dialog.confirm({
      //   title: "请勿截屏",
      //   message: "请勿截屏分享和存储，这将可能被第三方恶意软件收集，造成资产损失"
      // })
      //   .then(() => {
      //     // on confirm
      //     if(this.$route.params.tag=="助记词"){
      //       this.$router.push({name:'backupmnemonic'})
      //     }else{
      //       this.$router.push({name:'exportprivatekey',params:{tag:this.$route.params.tag}})
      //     }
      //   })
      //   .catch(() => {
      //     // on cancel
      //   });
    }
  }
};
</script>
<style lang="scss" scoped>
.van-cell-group {
  width: 90%;
  margin: 15px;
  border: 1px solid #ebedf0;
}
[class*="van-hairline"]:after {
  border: none;
}
.prompt {
  height: 100vh;
  .prompt-top {
    text-align: center;
    .prompt-title {
      font-size: 18px;
      font-weight: 900;
      line-height: 50px;
    }
    .prompt-desc {
      font-size: 15px;
      color: #7c7c7f;
    }
    .prompt-img {
      margin: 20px auto;
      width: 150px;
      height: 150px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .prompt-main {
    width: 90%;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(1, 100%);
    grid-template-rows: repeat(2, 120px);
    font-size: 16px;
    div {
      line-height: 30px;
    }
    .prompt-main__func {
      font-weight: 600;
      line-height: 30px;
      span {
        display: inline-block;
        width: 5px;
        height: 5px;
        background: #000;
        border-radius: 50%;
        margin-right: 5px;
        margin-bottom: 3px;
      }
    }
    .prompt-func__desc {
      margin-left: 20px;
      color: #717174;
    }
  }
  .btn {
    width: 90%;
    margin-left: 5%;
    position: absolute;
    bottom: 20px;
  }
}
</style>     