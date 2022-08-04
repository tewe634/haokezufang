<template>
  <div class="list">
    <div class="search">
      <!-- 搜索框 -->
      <van-nav-bar left-arrow @click-left="onClickLeft"> </van-nav-bar>
      <van-search v-model="value" show-action placeholder="请输入小区或地址">
        <template #left-icon>
          <div @click="$router.push('/city')">
            <span>{{ hotDiZhi1 }}</span>
            <i class="iconfont icon-arrow"> | </i>
          </div>
        </template>
        <template #action>
          <span class="iconfont icon-map" @click="$router.push('/map')"></span>
        </template>
      </van-search>
    </div>
    <!-- 租房 -->
    <van-row>
      <van-col
        span="6"
        type="flex"
        justify="center"
        align="center"
        @click="areaHouse(0)"
        :class="{ active: currentIndex == 0 }"
      >
        <span>区域</span>
        <i class="iconfont icon-arrow"></i>
      </van-col>
      <van-col
        span="6"
        type="flex"
        justify="center"
        align="center"
        @click="madeHouse(1)"
        :class="{ active: currentIndex == 1 }"
      >
        <span>方式</span>
        <i class="iconfont icon-arrow"></i>
      </van-col>
      <van-col
        span="6"
        type="flex"
        justify="center"
        align="center"
        @click="rentalHouse(2)"
        :class="{ active: currentIndex == 2 }"
      >
        <span>租金</span>
        <i class="iconfont icon-arrow"></i>
      </van-col>
      <van-col
        span="6"
        type="flex"
        justify="center"
        align="center"
        @click="sortHouse(3)"
        :class="{ active: currentIndex == 3 }"
      >
        <span>筛选</span>
        <i class="iconfont icon-arrow"></i>
      </van-col>
    </van-row>
    <div class="deom" v-if="isShoww">
      <van-picker
        toolbar-position="bottom"
        :show-toolbar="true"
        :columns="columns"
        value-key="label"
        @confirm="affirm"
        @cancel="isShoww = false"
        ref="loading"
      />
    </div>
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '1020px', width: '295px' }"
    >
      <ul>
        <p>户型</p>
        <div>
          <li v-for="(item, index) in houseObj.roomType" :key="index">
            {{ item.label }}
          </li>
        </div>
      </ul>
      <ul>
        <p>朝向</p>
        <div>
          <li v-for="(item, index) in houseObj.oriented" :key="index">
            {{ item.label }}
          </li>
        </div>
      </ul>
      <ul>
        <p>楼层</p>
        <div>
          <li v-for="(item, index) in houseObj.rentType" :key="index">
            {{ item.label }}
          </li>
        </div>
      </ul>
      <ul>
        <p>房屋亮点</p>
        <div>
          <li v-for="(item, index) in houseObj.characteristic" :key="index">
            {{ item.label }}
          </li>
        </div>
      </ul>
      <div class="footer">
        <button class="clear">清除</button>
        <button class="show">确认</button>
      </div>
    </van-popup>
    <!-- 列表 -->
    <van-list
      v-model="loading"
      @load="onLoad"
      :immediate-check="false"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :to="{ name: `detail`, params: { code: item.houseCode } }"
      >
        <van-row type="flex" justify="center" align="center">
          <van-col span="8">
            <van-image
              width="106px"
              height="80px"
              :src="`http://liufusong.top:8080${item.houseImg}`"
            />
          </van-col>
          <van-col span="16" type="flex" justify="center">
            <h3 class="HouseItem_title__2dXar" style="margin: 0px">
              {{ item.title }}
            </h3>
            <span class="HouseItem_desc__5-mp4">{{ item.desc }}</span>
            <p class="HouseItem_tag__3MxYv HouseItem_tag1__3VDnD">
              {{ item.tags[0] }}
            </p>
            <p class="HouseItem_price__1_r8v">
              <span class="HouseItem_priceNum__RGpsE">{{ item.price }}</span>
              元/月
            </p>
          </van-col>
        </van-row>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
const deep = function (arr) {
  if (!arr[0]) return []
  arr[0].children[0].children = [{ label: '' }]
  arr[1].children[0].children = [{ label: '' }]
  return arr
}
export default {
  name: 'list',
  data() {
    return {
      value: '',
      isShoww: false,
      currentIndex: '2',
      columns: [],
      list: [],
      houseObj: {},
      show: false,
      hotDiZhi1: this.$store.state.city,
      city: 'AREA|88cff55c-aaa4-e2e0',
      start: 1,
      end: 20,
      hotCity: [],
      loading: false,
      finished: false,
      error: false,
      num: ''
    }
  },
  methods: {
    // 回退一个
    onClickLeft() {
      this.$router.go(-1)
    },
    // 根据条件查询房屋
    async searchHouse() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const params = { cityId: this.city, start: this.start, end: this.end }
        const res = await this.$API.getHouse(params)
        if (res.data.body.list.length >= 10) {
          this.list = res.data.body.list
          this.start = this.end
          this.end = this.end + 10
        } else {
          // 没有数据了
          this.finished = true
        }
      } catch (error) {
        // 请求失败
        this.error = true
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },
    // 获取房屋查询条件
    async searchTenement() {
      const res = await this.$API.getTenement(this.city)
      if (res.data.status === 200) {
        this.houseObj = res.data.body || {}
      }
    },
    // 区域
    areaHouse(val) {
      this.num = 0
      this.isShoww = true
      this.currentIndex = val
      this.columns = this.newArr
    },
    // 方式
    madeHouse(val) {
      this.num = 1
      this.isShoww = true
      this.currentIndex = val
      this.columns = this.houseObj.rentType
    },
    // 租金
    rentalHouse(val) {
      this.num = 2
      this.isShoww = true
      this.currentIndex = val
      this.columns = this.houseObj.price
    },
    // 筛选
    sortHouse(val) {
      this.num = 3
      this.isShoww = false
      this.currentIndex = val
      this.show = true
    },
    // 滚动事件
    async onLoad() {
      const params = { cityId: this.city, start: this.start, end: this.end }
      const { data } = await this.$API.getHouse(params)
      try {
        if (data.status === 200) {
          this.list.push(...data.body.list)
          this.start = this.end
          this.end = this.end + 10
          this.loading = false
        }
      } catch (error) {
        this.error = true
        console.log(error.message)
      }
    },
    // 确认
    async affirm() {
      const indexOf = this.$refs.loading.getIndexes()
      const index = indexOf[0]
      const index1 = indexOf[1]
      const index2 = indexOf[2]
      if (this.num === 1) {
        this.isShoww = false
        const rentType = this.houseObj.rentType[index].label
        const params = {
          cityId: this.city,
          rentType,
          start: this.start,
          end: this.end
        }
        const res = await this.$API.getHouse(params)
        this.list = res.data.body.list
        this.start = this.end
        this.end = this.end + 10
      } else if (this.num === 2) {
        this.isShoww = false
        const price = this.houseObj.price[index].label
        const params = {
          cityId: this.city,
          price,
          start: this.start,
          end: this.end
        }
        const res = await this.$API.getHouse(params)
        this.list = res.data.body.list
        this.start = this.end
        this.end = this.end + 10
      } else if (this.num === 0) {
        if (index === 0) {
          this.isShoww = false
          const area =
            this.houseObj.area.children[index1].children[index2].value
          const params = {
            cityId: this.city,
            area,
            start: this.start,
            end: this.end
          }
          const res = await this.$API.getHouse(params)
          this.list = res.data.body.list
          this.start = this.end
          this.end = this.end + 10
        } else {
          this.isShoww = false
          const subway =
            this.houseObj.subway.children[index1].children[index2].value
          const params = {
            cityId: this.city,
            subway,
            start: this.start,
            end: this.end
          }
          const res = await this.$API.getHouse(params)
          this.list = res.data.body.list
          this.start = this.end
          this.end = this.end + 10
        }
      }
    }
  },
  created() {
    this.searchTenement()
    this.searchHouse()
  },
  mounted() {
    this.$bus.$on('hotCityList', (val) => (this.hotCity = val))
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
  },
  computed: {
    newArr() {
      return deep([this.houseObj.area, this.houseObj.subway])
    },
    rentType() {
      return this.houseObj.rentType
    }
  }
}
</script>

<style scoped lang="less">
.list {
  .search {
    position: sticky;
    top: 0px;
  }
}
:deep(.van-nav-bar) {
  background-color: #21b97a;
  .van-icon {
    color: #fff;
  }
}
:deep(.van-search) {
  padding-bottom: 0px;
}
:deep(.van-search--show-action) {
  position: absolute;
  width: 9.04rem;
  height: 0.9067rem;
  top: 0.0267rem;
  left: 0.8rem;
  .icon-arrow {
    color: #bbb;
  }
}
:deep(.van-row) {
  height: 1.0667rem;
  span {
    font-size: 0.4533rem;
  }
  i {
    font-size: 0.32rem;
  }
  .active {
    color: #21b97a;
  }
}
:deep(.van-list) {
  padding-bottom: 1.3333rem;
  .HouseItem_title__2dXar {
    font-size: 0.4rem;
    color: #394043;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .HouseItem_desc__5-mp4 {
    font-size: 0.32rem;
    color: #afb2b3;
  }
  .HouseItem_tag__3MxYv {
    width: 1.2267rem;
    height: 0.5333rem;
    font-size: 12px;
    border-radius: 3px;
    padding: 4px 5px;
    margin-right: 5px;
    line-height: 0.5333rem;
    background-color: #e1f5f8;
  }
  .HouseItem_priceNum__RGpsE {
    font-size: 0.4267rem;
    color: #fa5741;
  }
  .HouseItem_price__1_r8v {
    font-size: 12px;
    color: #fa5741;
  }
  .van-cell {
    height: 3.2rem;
  }
}
:deep(.van-picker__columns) {
  // background-color: #fff;
  width: 10rem;
  height: 6.3467rem !important;
}
.deom {
  position: absolute;
  z-index: 99;
  border-top: 1px solid #e4e6f0;
}
:deep(.van-picker__toolbar) {
  display: flex;
  border-top: 0.0267rem solid #e9e9e9;
  .van-picker__confirm {
    flex: 1;
    background-color: #21b97a;
    color: #fff;
    font-size: 0.48rem;
  }
  .van-picker__cancel {
    width: 3.3333rem;
    font-size: 0.48rem;
    color: #21b97a;
  }
}
:deep(.van-popup--right) {
  padding: 0 0.4rem;
  ul {
    margin-top: 0.3733rem;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 0.3733rem;
    p {
      margin: 0.5333rem 0;
      font-size: 0.4rem;
      color: #333;
    }
    div {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      li {
        height: 0.8533rem;
        line-height: 0.8533rem;
        width: 30%;
        margin: 0 0.48rem 0.4rem 0;
        border: 0.0267rem solid #ddd;
        border-radius: 0.08rem;
        text-align: center;
        font-size: 0.32rem;
        color: #888;
      }
    }
  }
  .footer {
    position: sticky;
    display: flex;
    z-index: 999;
    bottom: 0;
    right: 0;
    margin-right: -0.4rem;
    .show {
      background-color: #21b97a;
      width: 5.2267rem;
      color: #fff;
    }
    .clear {
      background-color: #fff;
      width: 2.6133rem;
      color: #21b97a;
    }
    button {
      height: 1.3333rem;
      border: none;
      font-size: 0.48rem;
    }
  }
}
:deep(.van-list) {
  max-height: calc(100vh - 46px - 50px);
  padding-bottom: 1.4667rem;
  overflow: auto;
}
:deep(.van-ellipsis) {
  position: relative;
  top: -0.3467rem;
}
</style>
