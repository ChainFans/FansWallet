<template>
  <div id="sowingContain">
    <div class="tabContain-list">
      <div
        v-for="(item,index) in tabs"
        @click="tab(index)"
        :key="index"
        class="tabContain-listItem"
      >
        <img :src="index == num?item.urlone:item.url" alt class="tabContain-listItem__img" />
        <span class="tabspan" :class="{active:index == num}">{{item.title}}</span>
      </div>
    </div>
    <!--轮播 -->
    <template v-for="(item, index) in tabContents">
      <!-- <div class="tabCon" :key="index" :style='{ zIndex: index === num ? "1" : "-1" }'> -->
      <div class="tabCon" :key="index">
        <div id="certify">
          <div class="swiper-container" v-if="index === num">
            <div class="swiper-wrapper">
              <template v-for="(value, key) in item.children">
                <div class="swiper-slide" :key="key">
                  <img :src="value.url" />
                  <P class="tabCon-short">{{ value.title }}</P>
                  <P
                    class="swiperslide-content"
                    v-if="value.content?iscontent:null"
                  >{{ value.content }}</P>
                  <p class="tabCon-more">
                    <span>{{ value.more }}</span>
                  </p>
                </div>
              </template>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import "@/assets/style/css/certify.css";
// import Swiper from "Swiper";
export default {
  name: "tab",
  data() {
    return {
      tabs: [
        {
          id: 0,
          title: "区块链应用",
          url: require("../../assets/images/qkl.png"),
          urlone: require("../../assets/images/qkl-1.png")
        },
        {
          id: 1,
          title: "区块链解决方案",
          url: require("../../assets/images/jjfa.png"),
          urlone: require("../../assets/images/jjfa-1.png")
        },
        {
          id: 2,
          title: "Dapp专区",
          url: require("../../assets/images/dapp.png"),
          urlone: require("../../assets/images/dapp-1.png")
        },
        {
          id: 3,
          title: "超级节点",
          url: require("../../assets/images/cjjd.png"),
          urlone: require("../../assets/images/cjjd-1.png")
        }
      ],
      tabContents: [
        {
          id: 0,
          children: [
            {
              id: 0,
              title: "区块链商城",
              url: require("../../assets/images/qklsc.png"),
              content: "区块链商城采用区块链技术对商品进行溯源,防止假冒商品",
              more: "了解更多"
            },
            {
              id: 1,
              title: "数字资产钱包",
              url: require("../../assets/images/qkl-szzc.png"),
              content: "安全、便捷、高效的数字资产管理工具",
              more: "了解更多"
            },
            {
              id: 2,
              title: "交易平台",
              url: require("../../assets/images/jypt.png"),
              content: "主流数字资产BTC、ETH、EOS等交易",
              more: "了解更多"
            },
            {
              id: 3,
              title: "区块链矿池游戏",
              url: require("../../assets/images/qklyx.png"),
              content: "挖矿系统，多种算力任你选择",
              more: "了解更多"
            },
            {
              id: 4,
              title: "区块链资讯",
              url: require("../../assets/images/qkl-zx.png"),
              content:
                "自动采集海内外主流新闻媒体最新快讯、资讯、行情走势等数据",
              more: "了解更多"
            }
          ]
        },
        {
          id: 1,
          children: [
            {
              id: 0,
              title: "吸粉糖果系统",
              url: require("../../assets/images/xftg.png"),
              more: "了解更多"
            },
            {
              id: 1,
              title: "防伪查询",
              url: require("../../assets/images/certify02.png"),
              more: "了解更多"
            },
            {
              id: 2,
              title: "区块链官网定制",
              url: require("../../assets/images/certify03.png"),
              more: "了解更多"
            },
            {
              id: 3,
              title: "白皮书撰写",
              url: require("../../assets/images/bpszx.png"),
              more: "了解更多"
            }
          ]
        },
        {
          id: 2,
          children: [
            {
              id: 0,
              title: "宠物养成",
              url: require("../../assets/images/1.jpg"),
              more: "了解更多"
            },
            {
              id: 1,
              title: "社交平台",
              url: require("../../assets/images/2.png"),
              more: "了解更多"
            },
            {
              id: 2,
              title: "ETH以太坊智能合约",
              url: require("../../assets/images/3.jpg"),
              more: "了解更多"
            },
            {
              id: 3,
              title: "EOS柚子智能合约",
              url: require("../../assets/images/1.jpg"),
              more: "了解更多"
            }
          ]
        },
        {
          id: 3,
          children: [
            {
              id: 0,
              title: "企业共有链",
              url: require("../../assets/images/certify01.png"),
              more: "了解更多"
            },
            {
              id: 1,
              title: "企业联盟链",
              url: require("../../assets/images/certify02.png"),
              more: "了解更多"
            },
            {
              id: 2,
              title: "企业私有链",
              url: require("../../assets/images/certify03.png"),
              more: "了解更多"
            },
            {
              id: 3,
              title: "企业侧链",
              url: require("../../assets/images/certify04.png"),
              more: "了解更多"
            }
          ]
        }
      ],
      num: 0,
      iscontent: true
    };
  },
  methods: {
    tab(index) {
      this.num = index;
      // this.slides('.swiper-container')
      setTimeout(() => {
        this.slides(".swiper-container");
      }, 100);
    },
    slides(id) {
      let certifySwiper = new Swiper(`${id}`, {
        watchSlidesProgress: true,
        slidesPerView: "auto",
        centeredSlides: true,
        loop: true,
        loopedSlides: 5,
        // autoplay: {
        //     delay: 3000,//1秒切换一次
        // },
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        on: {
          progress(progress) {
            for (var i = 0; i < this.slides.length; i++) {
              const slide = this.slides.eq(i);
              const slideProgress = this.slides[i].progress;
              let modify = 1;
              if (Math.abs(slideProgress) > 1) {
                let modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
              }
              let translate = slideProgress * modify * 60 + "px";
              let scale = 1 - Math.abs(slideProgress) / 5;
              let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
              slide.transform(
                "translateX(" + translate + ") scale(" + scale + ")"
              );
              slide.css("zIndex", zIndex);
              slide.css("opacity", 1);
              if (Math.abs(slideProgress) > 3) {
                slide.css("opacity", 0);
              }
            }
          },
          setTransition(transition) {
            for (var i = 0; i < this.slides.length; i++) {
              const slide = this.slides.eq(i);
              slide.transition(transition);
            }
          }
        }
      });
      // certifySwiper.lazy.load();
    }
  },
  mounted() {
    this.slides(".swiper-container");
  }
};
</script>
<style lang="scss" scope>
.tabspan {
  display: block;
}
#sowingContain {
   background: #ffffff;
  .active {
    color: rgb(237, 113, 0);
  }
  .tabContain-list {
    margin-top: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    .tabContain-listItem {
      height:60px;
      width: 25%;
      text-align: center;
      display: inline-block;
      .tabContain-listItem__img {
        width:25px;
        height:25px;
        margin-top: 5px;
      }
    }
  }
  .tabCon {
    .tabCon-short {
      text-align: center;
      font-size:18px;
      margin-top: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .swiperslide-title {
      text-align: center;
      font-size:16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tabCon-more {
      margin-top: 10px;
      span {
        padding: 5px 10px;
        border: 1px solid #24acf2;
      }
    }
    .tabCon-img {
      height: 150px;
      width: 100%;
    }
  }
}
</style>


