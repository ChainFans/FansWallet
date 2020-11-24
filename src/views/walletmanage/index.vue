<template>
  <div class="manage-wallet">
    <div class="header" :style="{'padding-top':$store.state.appTop}">
      <van-icon name="arrow-left" size="22" @click="$router.back()" />
      <span>{{ $route.query.switch?'选择钱包':'钱包管理' }}</span>
      <van-icon name="plus" class="icon" size="22" slot="right" @click="Popupbox = true" />
    </div>
    <van-tabs v-model="walletType" @change="changeWallet">
      <van-tab :name="token" v-for="token in tokenList" :key="token">
        <template #title> <img class="token-logo" :src="require(`@/assets/images/token_logo/${token}.png`)"> </template>
        <div class="main">
          <div class="module" v-for="(item,idnex) in walletList" :key="idnex" @click="switchWallet(item)" :style="{background:item.walletType=='ETH'?'#4eb8f5':'#ffca00' }">
            <div class="content">
              <img :src="require(`@/assets/images/token_logo/${item.walletType}.png`)" alt="">
              <div class="title"> {{item.walletName}} </div>
              <span class="more" @click.stop="$router.push({name:'walletdetail',query:{data:JSON.stringify(item)}})"><van-icon name="ellipsis" size="24" /></span>
              
            </div>
            <p class="address">
              <span>
                {{public_js.ellipsAddress(item.address,12)}}
                <van-icon v-clipboard:copy="item.address" v-clipboard:success.stop="onCopy" @click.stop class="icon" :name="require('@/assets/images/other/copy.png')" />
              </span>
            </p>
            <div class="defult" v-if="item.isMain"><van-icon name="passed" /></div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 添加钱包 -->
    <van-popup v-model="Popupbox" closeable class="add_wallet">
      <div class="add_title">
        <font size="4">添加钱包</font>
      </div>
      <div class="add_module" :class="{'disabled':item != 'ETH'&&item != 'BTC'}" v-for="(item,index) in tokenList.slice(1)" :key="index" @click="createWallet(item)">
        <div class="module_type">
          <img :src="require(`@/assets/images/token_logo/${item}.png`)" style="width:20px">
          <span>{{item}}</span>
        </div>
        <p v-if="item != 'ETH'&&item != 'BTC'">开发中</p>
      </div>
    </van-popup>
    <!-- 创建 -->
    <van-popup
      v-model="createWallet_show"
      position="bottom"
      closeable
      class="createWallet-box">
      
        <van-button type="default" plain size="large" class="createWallet-btn" @click="create_wallet()">创建</van-button>
        <van-button type="default" plain size="large" class="createWallet-btn" @click="$router.push({path:'/import_wallet',query:{walletToken:chekType}})">导入</van-button>
    </van-popup>

  </div>
</template>

<script>
import pageheader from '@/components/pageheader'
export default {
  components:{pageheader},
  data(){
    return{
      tokenList:['ALL','ETH','BTC','TRX','NEO','EOS'],
      walletType:'ALL',
      walletInfo:[],
      walletList:[],
      Popupbox:false,
      createWallet_show:false,
      chekType:'ETH',
    }
  },
  created(){
    this.walletInfo = this.walletList = this.public_js.GetStorage('walletInfo');
    this.createWallet_show = false
    this.Popupbox = false
  },
  methods:{
    changeWallet(name){
      if(name === 'ALL'){
        this.walletList = this.walletInfo
        return
      }
      this.walletList = this.walletInfo.filter(n => n.walletType === name); 
    },
    createWallet(item){   
      if(item != 'ETH' && item != 'BTC'){
        return
      }
      this.chekType = item;
      this.createWallet_show = true;
    },
    switchWallet(item){
      if(this.$route.query.switch){
        this.walletInfo.forEach(item => {
          item.isMain = 0
        })
        this.walletInfo.find(n => n.address == item.address).isMain = 1
        this.public_js.SetStorage('walletInfo',this.walletInfo)
        this.$router.push('wallet')
      }
    },
    create_wallet(){
      this.Popupbox=false;
      this.createWallet_show=false;
      this.$router.push({path:'/create_wallet',query:{wallet:this.chekType}})
    },
    onCopy(e) {
      this.$toast("地址复制成功");
    },
  }
}
</script>

<style lang="scss" scoped>
.manage-wallet{
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
    span{
      font-size: 16px;
    }
  }
  .token-logo{
    width: 26px;
  }
  .main{
    padding: 10px 15px 0;
    box-sizing: border-box;
    height: calc(100vh - 90px);
    overflow-y: auto;
    .module{
      width: 100%;
      height: 90px;
      background: rgb(78, 184, 245);
      border-radius: 7px;
      padding: 10px;
      box-sizing: border-box;
      margin-bottom: 10px;
      color: #fff;
      position: relative;
      .content{
        display: flex;
        justify-content: space-between;
        height: 50px;
        img{
          width: 30px;
          height: 30px;
        }
        .more{
          width: 30px;
        }
      }
      .address{
        font-size: 13px;
        .icon{
          width: 20px;
          height: 20px;
          margin-left: 3px;
        }
      }
      .defult{
        position: absolute;
        bottom: 5px;
        right: 15px;
        font-size: 18px;
      }
    }
  }
    .add_wallet{
    width: 95%;
    height: 60%;
    background: rgb(250, 250, 250);
    border-radius: 7px;
    .add_title{
      line-height: 50px;
      padding:0 20px;
      border-bottom: 1px solid #eee;
      background: #fff;
    }
    .add_module{
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      border-bottom: 1px solid #eee;
      background: #fff;
      .module_type{
        display: flex;
        align-items: center;
      }
      span{
        font-size: 16px;
        margin-left: 10px;        
      }
    }
    .disabled{
      opacity: 0.5;
    }
  }
  //钱包创建
  .createWallet-box{
    text-align: center;
    padding: 40px 0 0 ;
    box-sizing: border-box;
    height: 180px;
    .createWallet-btn{
      width: 350px;
      margin-top: 12px;
      color: rgb(48, 158, 201)
    }
  }
}
</style>