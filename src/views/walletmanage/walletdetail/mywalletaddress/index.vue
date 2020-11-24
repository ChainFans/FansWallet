<template>
  <div class="mywalletaddress">
    <Pageheader />
    <div class="mywalletaddress-desc">
      <p>你可以在一个比特币钱包下添加多个不同的子地址来避免地址重用以及保护你的隐私;</p>
      <p>
        标记为
        <span></span>为未使用的地址;
      </p>
      <p>选中的地址将作为默认地址显示在收款页面</p>
      <p>左滑可导出私钥</p>
    </div>
    <!-- <p class="mywalletaddress-title">
      <span class="title-left">子地址</span>
      <span class="title-right" @click="refreshClick">刷新发现地址</span>
    </p>
    <van-nav-bar @click-left="leftClick">
      <van-icon name="plus" slot="left" class="plus" />
      <span slot="left" class="add">添加</span>
    </van-nav-bar>
    <van-swipe-cell>
      <van-cell icon="stop" title="37ficsdgfhuiwhjruoiewnkf" label="描述信息">
        <van-icon slot="right-icon" name="success" style="line-height: inherit;" />
      </van-cell>
      <template slot="right">
        <van-button square type="danger" text="导出私钥"  @click="onClick"/>
      </template>
    </van-swipe-cell> -->
    <van-dialog v-model="showpsd" @confirm="sure" title="请输入密码" show-cancel-button>
      <van-cell-group>
        <van-field v-model="value" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>
<script>
import Pageheader from "../../../../components/pageheader";
export default {
  data() {
    return {
     showpsd:false,
     value: ""
    };
  },
  components: {
    Pageheader
  },
  methods: {
    changeperson() {
      this.$router.push({ name: "setlanguage" });
    },
    leftClick() {
      this.$router.go(-1);
    },
    refreshClick() {
      this.$toast.loading({
        mask: false,
        message: "加载中..."
      });
      setTimeout(() => {
        this.$toast("扫描地址成功");
      }, 3000);
    },
    onClick() {
      this.showpsd = true;
      // confirm
    },
    sure(){
      // alert(123)
      this.$router.push({name:'backupprompt'})
    }
  }
};
</script>
<style lang="scss" scoped>
.van-cell-group{
  width: 90%;
  margin: 15px;
  // border-radius:25px;
  border:1px solid #ebedf0;
}
[class*=van-hairline]:after{
  border:none;
}
.mywalletaddress {
  background: #ececec;
  height: 100vh;
  .mywalletaddress-desc {
    height: 180px;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    line-height: 30px;
    color: #9c9f9e;
    span {
      background: #ef451f;
      width: 7px;
      height: 7px;
      display: inline-block;
      margin: 0 5px;
    }
  }
  .mywalletaddress-title {
    display: flex;
    span {
      flex: 1;
      line-height: 50px;
      font-size: 16px;
    }
    .title-left {
      margin-left: 10px;
      text-align: left;
      color: #666b6a;
    }
    .title-right {
      margin-right: 10px;
      text-align: right;
      color: #4b9dbe;
    }
  }
}
.van-button {
  // height:76.5px;
  height: inherit;
}
.add {
  margin-left: 5px;
  color: #0890dd;
}
.plus {
  float: left;
  margin-top: 18px;
}
.van-cell__left-icon {
  color: #ef451f;
}
.van-icon-success {
  color: #0484ea;
  font-size: 24px;
}
</style>     