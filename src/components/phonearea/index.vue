<template>
  <div class="phonearea">
    <div class="header">
        <van-icon name="arrow-left" class="back" @click="RClick()" />
       
    </div>
          

    <!-- <template> -->
      <van-index-bar>
        <van-index-anchor index="热门" />
        <van-cell
          v-for="(item,index) in HOTList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="A" />
        <van-cell
          v-for="(item,index) in AList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="B" />
        <van-cell
          v-for="(item,index) in BList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="C" />
        <van-cell
          v-for="(item,index) in CList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="D" />
        <van-cell
          v-for="(item,index) in DList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="E" />
        <van-cell
          v-for="(item,index) in EList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="F" />
        <van-cell
          v-for="(item,index) in FList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="G" />
        <van-cell
          v-for="(item,index) in GList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="H" />
        <van-cell
          v-for="(item,index) in HList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="I" />
        <van-cell
          v-for="(item,index) in IList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="J" />
        <van-cell
          v-for="(item,index) in JList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="K" />
        <van-cell
          v-for="(item,index) in KList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="M" />
        <van-cell
          v-for="(item,index) in MList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="N" />
        <van-cell
          v-for="(item,index) in NList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="O" />
        <van-cell
          v-for="(item,index) in OList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="P" />
        <van-cell
          v-for="(item,index) in PList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="Q" />
        <van-cell
          v-for="(item,index) in QList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="R" />
        <van-cell
          v-for="(item,index) in RList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="S" />
        <van-cell
          v-for="(item,index) in SList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="T" />
        <van-cell
          v-for="(item,index) in TList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="U" />
        <van-cell
          v-for="(item,index) in UList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="V" />
        <van-cell
          v-for="(item,index) in VList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="W" />
        <van-cell
          v-for="(item,index) in WList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />
        <van-cell title="无" />

        <van-index-anchor index="X" />
        <van-cell
          v-for="(item,index) in XList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />
        <van-cell title="无" />

        <van-index-anchor index="Y" />
        <van-cell
          v-for="(item,index) in YList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />

        <van-index-anchor index="Z" />
        <van-cell
          v-for="(item,index) in ZList"
          :key="index"
          :title="item.zh"
          :value="item.code"
          @click="RClick(index,item.code)"
        />
      </van-index-bar>
    <!-- </template> -->
  </div>
</template>
<script>
import list from "../../components/code.json";
export default {
  data() {
    return {
      list: list,
      RList: [],
      AList: [],
      BList: [],
      CList: [],
      DList: [],
      EList: [],
      FList: [],
      GList: [],
      HList: [],
      IList: [],
      JList: [],
      KList: [],
      MList: [],
      NList: [],
      OList: [],
      PList: [],
      QList: [],
      RList: [],
      SList: [],
      TList: [],
      UList: [],
      VList: [],
      WList: [],
      XList: [],
      YList: [],
      ZList: [],
      HOTList: [
        {
          en: "China",
          zh: "中国",
          locale: "CN",
          code: "+86"
        },
        {
          en: "Hongkong",
          zh: "香港",
          locale: "HK",
          code: "+852"
        },
        {
          en: "Macao",
          zh: "澳门",
          locale: "MO",
          code: "+853"
        },
        {
          en: "Taiwan",
          zh: "台湾省",
          locale: "TW",
          code: "+886"
        },
        {
          en: "Thailand",
          zh: "泰国",
          locale: "TH",
          code: "+66"
        },
        {
          en: "Singapore",
          zh: "新加坡",
          locale: "SG",
          code: "+65"
        },
        {
          en: "United States of America",
          zh: "美国",
          locale: "US",
          code: "+1"
        },
        {
          en: "United Kiongdom",
          zh: "英国",
          locale: "GB",
          code: "+44"
        },
        {
          en: "Maldives",
          zh: "马尔代夫",
          locale: "MV",
          code: "+960"
        }
      ],
      isshow: true
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    // console.log(num)
  },
  props: {
    showphonearea: {
      type: String
    }
  },
  methods: {
    getList() {
      this.list.forEach(element => {
        if (element.en.charAt(0) == "A") {
          this.AList.push(element);
        } else if (element.en.charAt(0) == "B") {
          this.BList.push(element);
        } else if (element.en.charAt(0) == "C") {
          this.CList.push(element);
        } else if (element.en.charAt(0) == "D") {
          this.DList.push(element);
        } else if (element.en.charAt(0) == "E") {
          this.EList.push(element);
        } else if (element.en.charAt(0) == "F") {
          this.FList.push(element);
        } else if (element.en.charAt(0) == "G") {
          this.GList.push(element);
        } else if (element.en.charAt(0) == "H") {
          this.HList.push(element);
        } else if (element.en.charAt(0) == "I") {
          this.IList.push(element);
        } else if (element.en.charAt(0) == "J") {
          this.JList.push(element);
        } else if (element.en.charAt(0) == "K") {
          this.KList.push(element);
        } else if (element.en.charAt(0) == "M") {
          this.MList.push(element);
        } else if (element.en.charAt(0) == "N") {
          this.NList.push(element);
        } else if (element.en.charAt(0) == "O") {
          this.OList.push(element);
        } else if (element.en.charAt(0) == "P") {
          this.PList.push(element);
        } else if (element.en.charAt(0) == "Q") {
          this.QList.push(element);
        } else if (element.en.charAt(0) == "R") {
          this.RList.push(element);
        } else if (element.en.charAt(0) == "S") {
          this.SList.push(element);
        } else if (element.en.charAt(0) == "T") {
          this.TList.push(element);
        } else if (element.en.charAt(0) == "U") {
          this.UList.push(element);
        } else if (element.en.charAt(0) == "V") {
          this.VList.push(element);
        } else if (element.en.charAt(0) == "W") {
          this.WList.push(element);
        } else if (element.en.charAt(0) == "X") {
          this.XList.push(element);
        } else if (element.en.charAt(0) == "Y") {
          this.YList.push(element);
        } else if (element.en.charAt(0) == "Z") {
          this.ZList.push(element);
        }
      });
    },
    RClick(index, val) {
      this.$emit("reviseValClick", val);
    }
  },

};
</script>
<style lang="scss" scoped>
    .header{
        height: 46px;
        border-bottom: 1px #eee solid;  
        background: #fff;  
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        .back{
            line-height: 50px;
            font-size: 22px;
           
            width: 30px;
        }
    }
.phonearea {
  background: #ebeff3;
}
.van-cell__title{
  padding-left: 10px;
}
.van-cell__value{
  padding-right: 10px;
}
</style>