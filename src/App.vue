<template>
  <div id="app">
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
