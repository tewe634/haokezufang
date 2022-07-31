<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="城市列表" left-arrow @click-left="onClickLeft" />
    <!-- 列表 -->
    <van-index-bar>
      <van-index-anchor index="当前城市" />
      <van-cell title="文本" />

      <van-index-anchor index="热门城市" />
      <van-cell :title="item.label" v-for="(item,index) in hotList" :key="index" />
    </van-index-bar>
  </div>
</template>

<script>
export default {
  name: 'city',
  data() {
    return {
      hotList: [],
      list: []
    }
  },
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1)
    },
    // 获取热门城市
    async getHotCity() {
      try {
        const res = await this.$API.searchHotCity()
        if (res.data.status === 200) {
          this.hotList = res.data.body
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    // 获取城市列表
    async getCityList() {
      try {
        const res = await this.$API.searchList(1)
        if (res.data.status === 200) {
          this.list = res.data.body
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  mounted() {
    this.getHotCity()
    this.getCityList()
  }
}
</script>

<style scoped lang="less">
:deep(.van-nav-bar__content) {
  background-color: #21b97a;
  .van-icon {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
}
</style>
