<template>
  <div class="uploading">
    <!-- <van-loading type="circular" color="#f4f4f4" class="loading" size="50px" /> -->
    <img v-show="isshow" src="../../assets/images/load.gif" alt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      isshow: true
    };
  },
  mounted() {
    setTimeout(() => {
        this.isshow = false;
    }, 5000);
  }
};
</script>
<style lang="scss" scoped>
.uploading {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.6);
  background: #fff;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
