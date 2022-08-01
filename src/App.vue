<template>
  <div id="app">
    <!-- 搜索框 -->
    <van-search
      v-if="$router.currentRoute.meta.isShow"
      v-model="value"
      show-action
      placeholder="请输入小区或地址"
    >
      <template #left-icon>
        <div @click="$router.push('/city')">
          <span>{{ hotDiZhi }}</span>
          <i class="iconfont icon-arrow"> | </i>
        </div>
      </template>
      <template #action>
        <span class="iconfont icon-map" @click="$router.push('/map')"></span>
      </template>
    </van-search>

    <router-view @hotlist="hotlist"></router-view>
    <Footer v-if="$router.currentRoute.meta.footer"></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: { Footer },
  data() {
    return {
      value: '',
      hotDiZhi: '北京'
    }
  },
  methods: {
    hotlist(str) {
      this.hotDiZhi = str
    }
  }
  // mounted() {
  //   this.$bus.$on('hotDiZhi', (val) => (this.hotDiZhi = val))
  // },
  // beforeDestroy() {
  //   this.$bus.$off('hotDiZhi')
  // }
}
</script>

<style scoped lang="less">
#app {
  height: 0px;
}
:deep(.icon-map) {
  position: relative;
  top: 5px;
  font-size: 50px;
  color: #fff;
}
:deep(.van-search--show-action) {
  position: relative;
  z-index: 99;
}
:deep(.van-search) {
  background-color: transparent;
}
</style>
