<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        :autofocus="true"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <van-list v-if="list.length">
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.communityName"
        @click="addFn(item)"
      />
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      value: '',
      city: this.$store.state.city,
      cityId: 'AREA|88cff55c-aaa4-e2e0',
      list: []
    }
  },
  methods: {
    // 发请求获取数据列表
    async onSearch() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      const params = { name: this.value, id: this.cityId }
      const { data } = await this.$API.getCommunity(params)
      this.list = data.body
    },
    // 取消清空
    onCancel() {
      this.value = ''
    },
    // 选择地址
    addFn(item) {
      this.$store.commit('CITYNAME', item)
      this.$router.back()
    }
  },
  watch: {
    city: {
      immediate: true,
      handler(newval) {
        if (newval === '上海') {
          this.cityId = 'AREA|dbf46d32-7e76-1196'
        } else if (newval === '广州') {
          this.cityId = 'AREA|e4940177-c04c-383d'
        } else if (newval === '深圳') {
          this.cityId = 'AREA|a6649a11-be98-b150'
        } else {
          this.cityId = 'AREA|88cff55c-aaa4-e2e0'
        }
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
