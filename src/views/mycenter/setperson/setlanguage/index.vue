<template>
  <div class="login">
    <Pageheader />
    <van-radio-group v-model="radio">
      <van-cell-group >
        <van-cell title="中文简体" clickable @click="radio = '1'" style="padding:10px 0">
          <van-radio slot="right-icon" name="1"  />
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <van-radio-group v-model="radio" disabled>
      <van-cell-group>
        <van-cell title="中文繁体" clickable @click="radio = '1'" style="padding:10px 0;color:#969799">
          <van-radio slot="right-icon" name="2" />
        </van-cell>
        <van-cell title="英语" clickable @click="radio = '1'" style="padding:10px 0;color:#969799">
          <van-radio slot="right-icon" name="3" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-button class="login-btn" @click="sure">保存</van-button>
  </div>
</template>
<script>
import Pageheader from "../../../../components/pageheader"
export default {
  name: 'HelloWorld',
  data() {
    return {
      radio:"1"
      // value2: false//false默认中文
    }
  },
  components:{
    Pageheader
  },
  methods:{
    sure(){
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.van-cell__title {
  padding-left: 10px;
}
.van-radio {
  padding-right: 10px;
}
.pageheader {
  border-bottom: 1px solid #ebedf0;
}
.login-btn{
  background: #2364bc;
}
</style>