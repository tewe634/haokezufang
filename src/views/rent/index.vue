<template>
  <div>
    <!-- 头部 -->
    <div v-if="!$router.currentRoute.meta.isAdd">
      <div v-if="!$router.currentRoute.meta.isSearch">
        <van-nav-bar title="房屋管理" left-arrow @click-left="onClickLeft" />
        <HouseList></HouseList>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import HouseList from '@/components/house-List'
export default {
  name: 'rent',
  components: { HouseList },
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
// 头部
:deep(.van-nav-bar) {
  position: sticky;
  top: 0px;
  z-index: 99;
  background-color: #21b97a;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
</style>
