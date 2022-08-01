<template>
  <div class="footer">
    <!-- 底部 -->
    <van-tabbar v-model="active" active-color="rgb(33, 185, 122)">
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" @click="goList"
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
  methods: {
    goList() {
      this.$router.push('/home/list')
      this.active = 1
    }
  },
  mounted() {
    this.$bus.$on('goNumber', (val) => (this.active = val))
    // 首页跳转到搜索页
    this.$bus.$on('goList', () => this.goList())
  },
  beforeDestroy() {
    this.$bus.$off('goNumber')
  }
}
</script>

<style></style>
