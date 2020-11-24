<template>
  <div class="login">
    <Pageheader />
    <div class="login-operate">
    
        <van-field v-model="name" placeholder="请修改昵称(2-20位)" class="input"/>
   
    </div>
    <van-button class="login-btn" @click="sure">确认修改</van-button>
  </div>
</template>
<script>
import { setNickname } from "../../../../api/authorityValidation/user"
import Pageheader from "../../../../components/pageheader";
export default {
  data() {
    return {
      name: ""
    };
  },
  components: {
    Pageheader
  },
  methods: {
    sure() {
      if (!this.name) {
        this.$toast("昵称不能为空");
        return;
      }
      const params = {
        Nickname: this.name
      };
      setNickname(params).then(res => {
        if (res.code === 0) {
          this.$toast("昵称修改成功");
          this.$store.commit('userName',this.name)
          if(window.plus){
            let data = JSON.parse(plus.storage.getItem("userData"))
            data.nickname = this.name
            plus.storage.setItem("userData", JSON.stringify(data));
          }else{       
            let data = JSON.parse(localStorage.getItem("userData"))
            data.nickname = this.name
            localStorage.setItem("userData", JSON.stringify(data));
          }


          this.$router.push({
            name: "mycenter",
            params: {
              nameData: `${this.name}`,
              tag:"setname"
            }
          });
        } else {
          this.$toast(`${res.messages}`);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.pageheader {
  border-bottom: 1px solid #ebedf0;
}
.login-btn{
  background: #2364bc;
}
.input{
  margin-top: 10px;
}
/deep/.van-cell{
  padding: 12px 0;
}
</style>