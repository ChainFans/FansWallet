<template>
  <div>
    <van-tabs v-model="active" @change="changeTab">
    <van-tab :title="'标签' +index" v-for="(title,index) in titleData" :key="index" >
      
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="walletList"
      
        >
        <div class="list">
          <van-cell class="cell" v-for="item in transactionData" :key="item.blockNumber" :title="item.blockNumber" />
        </div>
        </van-list>


    </van-tab>
  </van-tabs>



  </div>
</template>
<script>
import {get_transferList, get_transferList_erc20, get_transferInfo, get_chainInfo } from '@/api/wallet'
export default {
  data(){
    return{
      titleData:[1,2,3,4],
      active:0,
      transactionData: [],
      loading: false,
      finished: false,
    }
  },
  mounted(){  
     this.walletList()
  },
  methods: {
    changeTab(){
      this.transactionData = []
      this.loading = true;
      this.finished = false;
      this.walletList()
      console.log(1111)
    },
    walletList(state){

     console.log(22222)

          let params = {
              PageCount:10,
              GetType:'After',
              PagingParams:this.transactionData.length,
              Address: '0x8410968a1f76436C3C9f6FAFb4F41F28747d6822',
              // ContractAddress: '0xFDc6851DF9d1eacD11A9216aDc80f9Ff035c4029',
              TransferType:this.active -1
          }
          get_transferList(params).then(res => {    //ERC20
             
              if(res.code === 0){
                  if(state){
                      this.transactionData = res.data
                  }else{
                      this.transactionData = this.transactionData.concat(res.data) 
                  }

                  this.loading = false;
                  if (this.transactionData.length >= res.totalCount) {   
                      this.finished = true;
                  }

              }else{
                  this.$toast(res.messages)
              }
          }).catch(err => {
              this.$toast('网络异常')
              this.$toast.clear();
          })

    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  }
}
</script>
<style scoped lang="scss">
.cell{
  height: 100px;
}
.list{
  // height: 600px;

}
</style>