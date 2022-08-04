<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="城市列表" left-arrow @click-left="onClickLeft" />

    <!-- 列表 -->
    <van-index-bar :index-list="city">
      <van-index-anchor index="当前城市" />
      <van-cell :title="val" />

      <van-index-anchor index="热门城市" />
      <div v-for="(item, index) in hotList" :key="index">
        <van-cell :title="item.label" @click="hotHouse" />
      </div>

      <div v-for="(item, index) in newObj" :key="index">
        <van-index-anchor :index="index"></van-index-anchor>
        <div v-for="(str, index) in item" :key="index">
          <van-cell :title="str" @click="fn" />
        </div>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
export default {
  name: 'city',
  data() {
    return {
      hotList: [],
      list: [],
      city: [
        '#',
        '热',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      city1: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      newCity: {},
      newObj: {},
      val: '北京'
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
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await this.$API.searchList(1)
        if (res.data.status === 200) {
          // 获取全部城市
          this.list = res.data.body
          // 遍历并赋值 item 字母
          this.city1.forEach((item) => {
            this.newCity[item] = []
            this.list.forEach((z) => {
              // 拿到第一个字母转成大写
              const firstZm = z.short.substring(0, 1).toUpperCase()
              if (item === firstZm) {
                this.newCity[item].push(z.label)
              }
            })
          })
          // console.log(this.newCity)
          this.$nextTick(() => {
            this.newObj = this.newCity
          })
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    // 下面情提示
    fn() {
      this.$toast.fail('该城市暂无房源')
    },
    // 点击热门城市切换当前城市
    hotHouse(e) {
      this.val = e.target.innerText
      this.$emit('hotlist', e.target.innerText)
      this.$router.back()
      this.$store.commit('HOTCITY', this.val)
      this.$bus.$emit('hotCityList', this.hotList)
    }
  },
  created() {
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
:deep(.van-index-bar__index) {
  margin: 0.08rem 0;
}
:deep(.van-index-bar__index--active) {
  color: #fff;
  background-color: #21b97a;
  display: block;
  font-size: 12px;
  height: .4rem;
}
:deep(.van-index-bar) {
max-height: calc(100vh - 46px);
  padding-bottom: 1.3333rem;
overflow: auto;
}
</style>
