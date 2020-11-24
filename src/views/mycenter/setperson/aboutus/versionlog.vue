<template>
  <div class="versionlog">
    <Pageheader />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="orderlist" v-for="(item,index) in list" :key="index">
          <div class="orderlist-top">
            <span class="num">{{item.versionNo}}</span>
            <span class="update">{{item.forcedUpdate==0?'自动更新':'手动更新'}}</span>
          </div>
          <div class="orderlist-content">
            <p style="white-space: pre-wrap;">{{item.remark}}</p>
          </div>
          <p class="orderlist-time">{{item.updateTime}}</p>
      </div>
    </van-list>
  </div>
</template>
<script>
import Pageheader from "../../../../components/pageheader"
import { getVersionhistory } from "../../../../api/mycenter/aboutus";
import qs from "querystring";
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
  components: {
    Pageheader
  },
  methods: {
    chargingrecord() {
      const params = {
          AppType:0,
          PageCount:10,
          GetType:'After',
          PagingParams:this.list.length,
      }  
      getVersionhistory(params)
        .then(res => {
          this.loading = false;
          if (res.code === 0) {
            this.list = this.list.concat(res.data);
            if (res.data.length < 5) {
              this.finished = true;
            }
          } else {
            this.finished = true;
            this.$toast(`${res.messages}`);
          }
          
        })
        .catch(() => {
          this.loading = false;
          this.finished = true;
        });
    },
    onLoad() {
      this.chargingrecord();
    }
  }
};
</script>
<style lang="scss" scoped>
.versionlog{
  background: #ececec;
}
.orderlist {
  height:auto;
  margin: 10px 10px 10px 10px;
  background: #ffffff;
  border-radius: 5px;
  .orderlist-top{
    height:35px;
    border-bottom: 1px solid #eeeeee;
    .num{
      color:#464646;
      font-size: 16px;
      margin-left: 20px;
      margin-top: 5px;
      display: inline-block;
    }
    .update{
      float: right;
      font-size: 14px;
      color:#888888;
      margin-top: 8px;
      margin-right: 10px;
    }
  }
  .orderlist-content{
    margin: 20px;
    p{
      font-size: 14px;
      color:#333333;
    }    
  }
  .orderlist-time{
    text-align: right;
    color:#a9a9a9;
    font-size: 14px;
    margin-right: 15px;
    height:30px;
  }
}
.orderlist p {
  font-size: 12px;
}
.orderlist .p1 {
  margin-bottom: 0.15rem;
}

.orderlist-one {
  height: 0.5rem;
  position: relative;
}
.orderlist-one .p3 {
  position: relative;
  bottom: 5px;
  margin-top: 10px;
}
.orderlist-one img {
  float: right;
  width: 0.2rem;
  height: 0.2rem;
  position: absolute;
  right: 0.1rem;
  top: 0.3rem;
}
</style>     