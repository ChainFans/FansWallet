<template>
  <div id="app">
     <!-- :style="{'padding-top':$store.state.appTop }" -->
    <!-- <div :style="{height:$store.state.appTop+'px',background:'#eee'}"></div> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>   
    <router-view v-if="!$route.meta.keepAlive"></router-view>

  </div>
</template>
<script>
export default {
  data() {
    return {
        
    };
  },
  created(){
    window.addEventListener('offline',() => {
        this.$store.state.networkStatus = false
    })
    window.addEventListener('online',() => {
        this.$store.state.networkStatus = true
    })
  },
  methods:{

  }

};
</script>
<style lang="scss">
#app{
  background: #fff;
}
</style>
