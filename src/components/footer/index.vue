<template>
  <div class="footer">
    <!-- <van-popup
      v-model="$store.state.isLogin"
      position="right"
      :style="{ height: '100%',width:'100%' }"
    >
    <login></login>
    </van-popup> -->
    <div class="tabContain-list van-hairline--top" >
      <div
        v-for="(item) in tabs"
        @click="tabHandle(item)"
        :key="item.id"
        class="tabContain-listItem"
      > 
        <div class="tabContain-listItem__img">
          <img :src="($route.name === item.name )?item.urlone:item.url" alt />
        </div>
        <span class="tabspan" :class="{active:$route.name === item.name}">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>
<script>
// import login from '@/views/authorityvalidate/login'
export default {
  // components:{login},
  data() {
    return {
      goLogin:false,
      num:0,
      footerID: "",
      tabs: [
        // {
        //   id: 0,
        //   title: "首页",
        //   name: "chaincloud",
        //   url: require("../../assets/images/footer_img/home.png"),
        //   urlone: require("../../assets/images/footer_img/home-a.png")
        // },
        {
          id: 3,
          title: "钱包",
          name :"wallet",
          url: require("../../assets/images/footer_img/wallet.png"),
          urlone: require("../../assets/images/footer_img/wallet-a.png")
        },
        {
          id: 1,
          title: "行情",
          name: "chainworld",
          url: require("../../assets/images/footer_img/quotation.png"),
          urlone: require("../../assets/images/footer_img/quotation-a.png")
        },
        {
          id: 2,
          title: "Defi",
          name: "navigation",
          url: require("../../assets/images/footer_img/nav.png"),
          urlone: require("../../assets/images/footer_img/nav-a.png")
        },
        {
          id: 4,
          title: "我的",
          name: "mycenter",
          url: require("../../assets/images/footer_img/personal.png"),
          urlone: require("../../assets/images/footer_img/personal-a.png")
        }
      ]
    };
  },
  mounted(){
    window.onresize= ()=>{
      if(this.clientHeight>document.documentElement.clientHeight) {
          this.showBtn =false
      }else{
          this.showBtn = true
      }
    }
  },
  methods: {
    tabHandle(tabItem) {
      if(this.$route.name !== tabItem.name){
        this.$router.push({name: tabItem.name})
      }
      
    }
  }
};
</script>
<style lang='scss' scope>
.footer {
  .tabContain-list {
    position: fixed;
    z-index: 999;
    bottom: 0;
    height: 44px;
    width: 100vw;
    box-sizing: border-box;
    display: flex;
    background: #fff;
    .tabContain-listItem {
      flex: 1;
      text-align: center;
      .tabContain-listItem__img {
        width: 20px;
        height: 20px;
        margin: 5px auto;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .tabspan {
        color: #707070;
        display: block;
        font-size: 12px;
        margin-top: -5px;
      }
    }
    .active {
      color: #2364bc !important;
    }
  }
}
</style>
