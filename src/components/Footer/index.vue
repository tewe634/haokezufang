<template>
  <div class="footer">
    <!-- 底部 -->
    <van-tabbar v-model="active" active-color="rgb(33, 185, 122)">
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" to="/home/list"
        >找房</van-tabbar-item
      >
      <van-tabbar-item icon="newspaper-o" to="/home/news">资讯</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/home/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      active: this.$router.currentRoute.meta.num
    }
  },
  mounted() {
    this.$bus.$on('goNumber', (val) => (this.active = val))
  },
  beforeDestroy() {
    this.$bus.$off('goNumber')
  }
}
</script>

<style></style>
