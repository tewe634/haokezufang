<template>
  <div>
    <Main :houseList="houseList"></Main>
  </div>
</template>

<script>
import Main from '@/components/main-house'
export default {
  name: 'Favorate',
  components: { Main },
  data() {
    return {
      houseList: []
    }
  },
  methods: {
    async getFavorites() {
      try {
        const { data } = await this.$API.getFavorites()
        if (data.status === 200) {
          this.houseList = data.body
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  created() {
    this.getFavorites()
  }
}
</script>

<style scoped lang="less"></style>
