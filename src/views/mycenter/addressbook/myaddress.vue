<template>
  <div class="myaddress">
    <div class="header" :style="{'padding-top':$store.state.appTop}">
      <van-icon name="arrow-left" size="22" @click="leftClick" />
      <span>地址薄</span>
      <van-icon name="plus" class="icon" size="22" slot="right" @click="rightClick" />
    </div>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="empty" v-if="list&&list.length==0">
        请添加钱包
      </div>
      <div class="refresh-load">
        <div class="walletmanage-list">
          <div
            class="walletmanage-list__item"
            v-for="(item,index) in list"
            :key="item.walletId"
            @click="walletClick(item.walletId,item)"
          >
            <van-swipe-cell>
              <van-cell
                :title="item.addressName"
                :value="item.addressType"
                :label="item.address"
              />
              <template slot="right">
                <van-button
                  square
                  type="danger"
                  text="删除"
                  @click="deleteitem(item.walletId,index)"
                />
              </template>
            </van-swipe-cell>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <!-- 列表 -->
  </div>
</template>
<script>
import {
  getWalletAddress,
  delateWalletAddress
} from "../../../api/mycenter/addressbook.js";
import Pageheader from "../../../components/pageheader";
export default {
  data() {
    return {
      list: [],
      wallettype: "",
      wallettypeval: "",
      isLoading: false,
      resLength:'10'
    };
  },
  created() {
    this.getAddress();
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        // this.count++;
        // this.getAddress()
      }, 500);
    },
    deleteitem(ID, index) {
      // const params = {
      //   WalletId: ID
      // };

      // delateWalletAddress(params).then(res => {
       
      //   if (res.code === 0) {
      //     this.list.splice(index, 1);
      //     this.$toast("删除成功");
      //   } else {
      //     this.$toast(`${res.messages}`);
      //   }
      // });
    },
    getAddress() {
      this.list = this.public_js.GetStorage('addressBook') || []



      // const params = {
      //   WalletType: ""
      // };
      //   this.$toast.loading({
      //     mask: true,
      //     message: '加载中...'
      //   });
      // getWalletAddress(params).then(res => {
      //    this.$toast.clear();
      //   if (res.code === 0) {
      //     this.list = this.list.concat(res.data);
      //   } else {
      //     this.$toast(`${res.messages}`);
      //   }
      // });
    },
    leftClick() {
      let link = this.$route.params.tag;
      if (link == "rev") {
        this.$router.push({ name: "mycenter" });
      }else if(link =='newAddress'){
        this.$router.push({ name: "mycenter" });
      } else {
        this.$router.go(-1);
      }
    },
    rightClick() {
      this.$router.push({ name: "myaddressnew" });
    },
    walletClick(walletId, item) {
      // if(window.plus){
      //   plus.storage.setItem("dataitem", JSON.stringify(item));
      // }else{
      //   localStorage.setItem("dataitem", JSON.stringify(item));
      // }

      
      this.$router.push({ name: "revisemyaddress",params:{data:item} });
    }
  },
  components: {
    Pageheader
  }
};
</script>
<style lang="scss" scoped>
/deep/.van-nav-bar .van-icon{
  color: #222;
  font-size: 22px;
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  padding: 0 10px;
  background: #fff;
  span{
    font-size: 16px;
  }
}
.empty{
  line-height: 50px;
  font-size: 16px;
  color: rgb(138, 137, 137);
  text-align: center;
}
.refresh-load {
  // height: calc(100vh-46px);
  // overflow-y: scroll;
}
.van-nav-bar {
  height: 46px;
}
.van-nav-bar__arrow {
  font-size: 18px;
  line-height: 46px;
}
.van-icon {
  color: #333;font-size: 22px;
}
.van-nav-bar__title {
  height: inherit;
  line-height: 50px;
  font-size: 16px;
  color: #393939;
}
.icon {
  font-size: 20px;
  line-height: 50px;
}
.van-button {
  height: 100%;
}
.walletmanage-list__item {
  color: #000;
  .remark {
    font-size: 14px;
    padding-left: 10px;
    margin-top: 6px;
  }
  .wl-item__address {
    margin-top: 6px;
    font-size: 13px;
    width: 280px;
    padding-left: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
}
</style>