<template>
  <div>
    <van-nav-bar title="地图找房" left-arrow @click-left="$router.back()" />
    <baidu-map class="map" :center="hotDiZhi1"></baidu-map>
  </div>
</template>
<script>
export default {
  name: 'Map',
  data() {
    return {
      hotDiZhi1: this.$store.state.city,
      city: 'AREA|88cff55c-aaa4-e2e0'
    }
  },
  methods: {
    async gethouseData() {
      const params = { id: this.city }
      const res = await this.$API.gethouseData(params)
      console.log(res)
    }
  },
  mounted() {
    this.gethouseData()
  },
  watch: {
    hotDiZhi1: {
      immediate: true,
      handler(newval) {
        if (newval === '上海') {
          this.city = 'AREA|dbf46d32-7e76-1196'
        } else if (newval === '广州') {
          this.city = 'AREA|e4940177-c04c-383d'
        } else if (newval === '深圳') {
          this.city = 'AREA|a6649a11-be98-b150'
        } else {
          this.city = 'AREA|88cff55c-aaa4-e2e0'
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.map {
  width: 100%;
  height: 400px;
}
:deep(.van-nav-bar) {
  position: sticky;
  top: 0;
  background-color: rgba(12, 181, 106, 0.9);
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.map[data-v-62496e35] {
  height: 17.7867rem;
}
</style>
