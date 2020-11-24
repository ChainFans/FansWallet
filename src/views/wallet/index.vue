<template>
  <div class="container-nav">
    <div
      class="header"
      ref="header"
      :style="{ 'padding-top': $store.state.appTop }"
    >
      <van-icon
        name="balance-pay"
        class="header-ico"
        @click="$router.push({ path: 'walletmanage', query: { switch: 1 } })"
      />
      <span>钱包</span>
      <van-icon
        name="scan"
        class="header-ico"
        @click="
          $store.state.scanData = '';
          $router.push({ name: 'scan' });
        "
      />
    </div>

    <van-pull-refresh
      v-model="isLoading"
      @refresh="walletData()"
      :disabled="scrollTop > 0"
    >
      <div class="bg-box" ref="bgBox">
        <div class="wallet-box" ref="wallet">
          <div class="info-box">
            <div class="info-left">
              <p class="wallet-name">
                {{ walletInfo ? walletInfo.walletName : "" }}
                <span v-if="isHideAmount" @click="isHideAmount = !isHideAmount"
                  ><van-icon name="eye-o"
                /></span>
                <span v-else @click="isHideAmount = !isHideAmount"
                  ><van-icon name="closed-eye"
                /></span>
                <van-tag
                  color="#c8c9cc"
                  text-color="#666"
                  class="tag"
                  v-if="!$store.state.networkStatus"
                  >离线</van-tag
                >
              </p>
              <p class="address" @click="showQr">
                <span>{{
                  walletInfo.address
                    ? public_js.ellipsAddress(walletInfo.address)
                    : ""
                }}</span
                >&nbsp;
                <van-icon name="qr" />
              </p>
            </div>
            <div class="info-right">
              <p class="more">
                <van-icon name="ellipsis" @click="walletDetail" />
              </p>
              <p v-if="isHideAmount" class="wallet-price">
                ￥{{ parseFloat($store.state.totalPriceCny).toFixed(2) }}
              </p>
              <p v-else class="wallet-price">
                ￥<span class="hide-p">∗∗∗∗</span>
              </p>
            </div>
          </div>
          <div class="operation">
            <span
              @click="
                $router.push({
                  path: '/wallet_collection',
                  query: { walletInfo: walletInfo },
                })
              "
              ><van-icon
                :name="require('@/assets/images/wallet/receivables.png')"
                size="20"
              />&nbsp;收款</span
            >
            <span @click="goTransfer"
              ><van-icon
                :name="require('@/assets/images/wallet/transfer.png')"
                size="20"
              />&nbsp;转账</span
            >
          </div>
        </div>
        <p class="assets van-hairline--bottom" ref="assets">
          <span><b>资产</b></span>
          <van-icon
            v-if="walletInfo.walletType === 'ETH'"
            name="add-o"
            class="add-ico"
            @click="
              $router.push({
                path: '/add_assets',
                query: {
                  walletType: walletInfo.walletType,
                  address: walletInfo.address,
                },
              })
            "
          />
        </p>

        <div class="token-list" ref="tokenBox" @scroll="scroll">
          <div
            class="token-box van-hairline--bottom"
            v-for="(item, index) in walletInfo ? walletInfo.assetsToken : ''"
            :key="index"
            @click="select_assets(item, index)"
          >
            <van-swipe-cell :disabled="item.tokenProtocol == 'Main'">
              <van-cell center :border="false">
                <template slot="title" center>
                  <div class="left-logo">
                    <div class="left-img">
                      <img v-if="item.tokenLogo" :src="item.tokenLogo" />
                      <img
                        v-else
                        :src="
                          require('@/assets/images/token_logo/' +
                            item.tokenSymbol +
                            '.png')
                        "
                      />
                    </div>
                    <span
                      ><b>{{ item.tokenSymbol }}</b></span
                    >
                  </div>
                </template>
                <template slot="default">
                  <div class="right-price">
                    <b> {{ item ? parseFloat(item.totalAccount) : 0 }}</b
                    ><br />
                    ￥{{ Number(item.totalUsd).toFixed(2) }}
                  </div>
                </template>
              </van-cell>

              <template slot="right" v-if="index !== 0">
                <van-button
                  class="del-token"
                  square
                  type="danger"
                  text="删除"
                  @click="delToken(item, index)"
                />
              </template>
            </van-swipe-cell>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <div class="space-box" ref="space"></div>

    <!-- 地址二维码 -->
    <van-popup v-model="is_showQr" class="qr-box">
      <div class="qr-header">
        <p class="name">{{ walletInfo.walletName }}</p>
        <div
          class="address"
          v-clipboard:copy="walletInfo.address"
          v-clipboard:success.stop="onCopy"
        >
          <span>{{
            walletInfo.address
              ? public_js.ellipsAddress(walletInfo.address)
              : ""
          }}</span>
          <img src="@/assets/images/other/copy.png" alt="" />
        </div>
      </div>
      <div class="qr-content" ref="content">
        <div class="qr-text">收款地址</div>
        <div
          class="qrcode"
          ref="qrCodeUrl"
          :style="{ 'margin-top': qrcodeHeight }"
        ></div>
      </div>
    </van-popup>
    <!-- 版本更新 -->
    <van-dialog
      v-model="update_show"
      show-cancel-button
      class="update-box"
      :showCancelButton="isForce"
      confirm-button-text="立即更新"
      @confirm="installApk(versionData.url, 1)"
      @cancel="installApk(versionData.url, 0)"
    >
      <div class="update-content">
        <div class="update-img">
          <img src="@/assets/images/home/appUpdate.png" />
        </div>
        <div class="update-title">
          发现新版本 <br />
          <span>v{{ versionData.versionNo }}</span>
        </div>
        <p class="update-text" v-html="versionData.remark"></p>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import {
  get_walletData,
  set_default,
  set_walletTokens,
  get_chainInfo,
} from "@/api/mycenter/wallet";
import { log } from "util";
// import { setInterval } from 'timers';
export default {
  name: "wallet",
  data() {
    return {
      walletInfo: {},
      isHideAmount: true,
      is_showQr: false,
      changeQr: true,
      qrcodeHeight: 0,
      isLoading: false,
      scrollTop: 0,
      update_show: false, //更新弹框
      versionData: "", //更新返回数据
      isForce: false, //是否强制更新
      totalAmount: 0,
      totalPriceCny: 0,
      timer: null,
      tokenTimer: null,
    };
  },
  created() {
    this.isUpdate();
    this.walletInfo = this.public_js
      .GetStorage("walletInfo")
      .find((n) => n.isMain == 1);
    this.walletData();
    // if(!this.$store.state.new_walletInfo.length){
    this.timer = setInterval(() => {
      this.walletData();
    }, 5000);
    // }

    if (window.plus && plus.networkinfo.getCurrentType() == 1) {
      this.$store.state.networkStatus = false;
    }
    if (window.plus) {
      this.$store.state.appTop = plus.navigator.getStatusbarHeight() + "px";
      plus.navigator.setFullscreen(false);
    }
  },
  // activated() {
  //     this.walletInfo = this.public_js.GetStorage('walletInfo').find(n=> n.isMain ==1);

  // },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  mounted() {
    // this.$refs.bgBox.style.height = window.screen.height- this.$refs.header.clientHeight-50-parseInt(this.$store.state.appTop)+'px';
    this.$refs.tokenBox.style.height =
      window.screen.height -
      this.$refs.space.clientHeight -
      parseInt(this.$store.state.appTop) +
      "px";
  },
  methods: {
    scroll(event) {
      this.scrollTop = event.target.scrollTop;
    },
    goTransfer() {
      //转账
      let item = this.walletInfo;
      item.tokenIndex = 0;
      item.address = this.walletInfo.address;
      this.$router.push({
        path: "/wallet_transfer",
        query: { walletInfo: JSON.stringify(item) },
      });
    },
    delToken(item, index) {
      //删除当前资产
      let walletData = this.public_js.GetStorage("walletInfo");
      let i = walletData.findIndex((n) => n.isMain === 1);
      walletData[i].assetsToken.splice(index, 1);
      this.public_js.SetStorage("walletInfo", walletData);
      this.walletInfo = walletData.find((n) => n.isMain == 1);
    },
    onRefresh() {
      this.$toast("刷新成功");
      this.isLoading = false;
    },
    select_assets(item, index) {
      item.tokenIndex = index;
      item.address = this.walletInfo.address;
      this.$router.push({
        path: "/wallet_detail",
        query: { walletInfo: JSON.stringify(item) },
      });
    },
    //获取钱包数据
    walletData() {
      let params = {
        PageCount: 10,
        GetType: "After",
        PagingParams: 0,
        Address: this.walletInfo.address,
        ChainCode: this.walletInfo.walletType,
      };
      get_walletData(params)
        .then((res) => {
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
          if (res.code === 0) {
            this.$store.state.new_walletInfo = res.data;

            this.walletInfo.assetsToken.forEach((item) => {
              res.data.forEach((item2) => {
                if (item.contractAddress == item2.contractAddress) {
                  item.tokenSymbol = item2.tokenSymbol;
                  item.address = item2.address;
                  item.tokenDecimals = item2.tokenDecimals;
                  item.totalAccount = item2.amountToEth;
                  item.totalUsd = item2.tokenPriceCny * item2.amountToEth;
                  item.contractAddress = item2.contractAddress
                    ? item2.contractAddress
                    : "";
                }
              });
            });

            let totalPrice = 0;
            res.data.forEach((item) => {
              totalPrice += item.amountToEth * item.tokenPriceCny;
            });
            this.$store.state.totalPriceCny = totalPrice;

            let data = this.public_js.GetStorage("walletInfo");
            let i = data.findIndex((n) => n.isMain === 1);
            data[i] = this.walletInfo;

            this.public_js.SetStorage("walletInfo", data);
          } else {
            this.$toast(res.messages);
          }
        })
        .catch((err) => {
          // this.$toast('网络异常')
          this.isLoading = false;
        });
    },
    showQr() {
      this.is_showQr = true;
      if (this.changeQr) {
        setTimeout(() => {
          this.qrcodeHeight =
            (this.$refs.content.offsetHeight - 160) / 2 + "px";
          this.creatQrCode();
        });
      }
    },
    walletDetail() {
      this.$router.push({
        name: "walletdetail",
        query: { data: JSON.stringify(this.walletInfo) },
      });
    },
    onCopy(e) {
      this.$toast("复制成功");
    },
    creatQrCode() {
      const qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.walletInfo.address,
        width: 160,
        height: 160,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
      this.changeQr = false;
    },
    //下载安装
    installApk(url, forcedUpdate) {
      // plus.nativeUI.showWaiting("正在更新软件，请稍后...");
      this.$toast.loading({
        message: "正在更新，\n请稍后...",
        forbidClick: true,
        duration: 0,
      });
      var dtask = plus.downloader.createDownload(url, {}, (d, status) => {
        if (status == 200) {
          //  plus.nativeUI.closeWaiting();
          this.$toast.clear();
          var path = d.filename;
          console.log(d.filename);

          plus.runtime.install(
            path,
            { force: false },
            () => {
              this.$toast.clear();
              plus.runtime.restart();
            },
            function (e) {
              this.$toast.clear();
              plus.nativeUI.alert("安装wgt文件失败");
            }
          );
        } else {
          // plus.nativeUI.closeWaiting();
          this.$toast.clear();
          this.$dialog
            .confirm({
              title: "版本更新",
              message: "更新失败，是否重新下载",
            })
            .then(() => {
              this.installApk(url, forcedUpdate);
            })
            .catch(() => {
              //判断是否强制更新
              if (forcedUpdate !== 1) {
                plus.runtime.quit();
              }
            });
        }
      });
      dtask.start();
    },

    isUpdate() {
      //检测新版本
      if (window.plus) {
        this.versionData = JSON.parse(plus.storage.getItem("version_data"));
        if (this.versionData.app_version != this.versionData.versionNo) {
          this.update_show = true;
          if (this.versionData.forcedUpdate == 1) {
            this.isForce = true;
          }
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
.van-cell {
  line-height: 46px;
}
.container-nav {
  // height: calc(100vh-44px);
  height: 100%;
  position: relative;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;
    padding: 0 10px;
    font-size: 24px;
    span {
      font-size: 18px;
    }
  }
  .bg-box {
    // height: calc(100vh - 102px);
  }
  .wallet-box {
    width: 355px;
    height: 150px;
    background: url("../../assets/images/other/walletBg.png") 100%;
    margin: 5px auto;
    border-radius: 13px;
    color: #fff;
    font-size: 16px;
    .info-box {
      height: 100px;
      display: flex;
      justify-content: space-between;
      padding: 10px;
      box-sizing: border-box;
      position: relative;
      p:nth-child(2) {
        font-size: 12px;
      }
      .info-left {
        .wallet-name {
          display: flex;
          align-items: center;
          font-size: 24px;
          width: 180px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          span {
            display: flex;
            align-items: center;
            margin-left: 5px;
          }
          .tag {
            height: 20px;
          }
        }
        .address {
          margin-top: 32px;
          display: flex;
          align-items: center;
          height: 20px;
          span {
            display: inline-block;
            // width: 160px;
          }
        }
      }
      .info-right {
        text-align: right;
        .more {
          font-size: 22px;
        }
      }
      .wallet-price {
        font-size: 24px !important;

        position: absolute;
        top: 45px;
        right: 10px;
      }
      .conversion-price {
        font-size: 14px;
        color: #f3efef;
        line-height: 20px;
        position: absolute;
        top: 80px;
        right: 10px;
      }
      .hide-p {
        font-size: 18px;
      }
    }
    .operation {
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        // flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 170px;
        height: 36px;
        background: rgba(255, 255, 255, 0.305);
        border-radius: 10px;
      }
    }
  }
  .assets {
    height: 36px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    .add-ico {
      font-size: 22px;
    }
  }
  .token-list {
    // height: calc(100vh - 290px);
    overflow-y: scroll;
    .token-box {
      // border-bottom: 1px solid #eee;
      .left-logo {
        display: flex;
        align-items: center;
        .left-img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        span {
          font-size: 16px;
        }
      }
      .right-price {
        line-height: 16px;
        b {
          color: #000;
          font-size: 16px;
        }
      }
      .del-token {
        height: 100%;
      }

      // .title{
      //     display: flex;
      //     align-items: center;
      //     img{
      //         width: 30px;
      //         height: 30px;
      //     }
      //     span{
      //         font-size: 16px;
      //         margin-left: 10px;
      //     }
      // }
      .token-price {
        p:nth-child(2) {
          font-size: 14px;
          color: #666;
        }
        font-size: 18px;
        text-align: right;
      }
    }
  }
  .qr-box {
    width: 320px;
    height: 320px;
    border-radius: 10px;
    font-size: 16px;
    .qr-header {
      height: 80px;
      background: #2364bc;
      color: #fff;
      overflow: hidden;
      .name {
        text-align: center;
        margin-top: 10px;
      }
      .address {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        height: 30px;
        padding: 0 10px;
        span {
          // width: 300px;
          font-size: 12px;
        }
        img {
          width: 12px;
          height: 12px;
          margin-left: 3px;
        }
      }
    }
    .qr-content {
      height: 240px;
      overflow: hidden;
      position: relative;
      .qr-text {
        position: absolute;
        top: 2px;
        left: 50%;
        transform: translate(-50%);
      }
      .qrcode {
        display: flex;
        justify-content: center;
        // margin-top: 20px;
      }
    }
  }
  .update-box {
    height: 360px;
    .update-content {
      position: relative;
      .update-img {
        width: 100%;
        height: 130px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .update-title {
        position: absolute;
        top: 16px;
        left: 0;
        right: 0;
        text-align: center;
        color: #fff;
        font-size: 18px;
        span {
          font-size: 13px;
        }
      }
      .update-text {
        height: 180px;
        padding: 10px 20px;
        box-sizing: border-box;
        white-space: pre-wrap;
        overflow-y: auto;
      }
    }
  }
  .space-box {
    height: 286px;
    position: absolute;
  }
}
</style>