<template>
  <div class="list">
    <div>
      <!-- 搜索框 -->
      <van-nav-bar left-arrow @click-left="onClickLeft"> </van-nav-bar>
      <van-search v-model="value" show-action placeholder="请输入小区或地址">
        <template #left-icon>
          <div @click="$router.push('/city')">
            <span>北京</span>
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
      />
    </div>
    <!-- 列表 -->
    <van-list>
      <van-cell v-for="(item, index) in list" :key="index">
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
export default {
  name: 'list',
  data() {
    return {
      value: '',
      isShoww: false,
      currentIndex: '2',
      columns: [],
      list: [],
      houseObj: {}
    }
  },
  methods: {
    // 回退一个
    onClickLeft() {
      this.$router.go(-1)
    },
    // 根据条件查询房屋
    async searchHouse() {
      try {
        const params = { cityId: 'AREA|88cff55c-aaa4-e2e0' }
        const res = await this.$API.getHouse(params)
        if (res.data.status === 200) {
          this.list = res.data.body.list
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    // 获取房屋查询条件
    async searchTenement() {
      const res = await this.$API.getTenement('AREA|88cff55c-aaa4-e2e0')
      console.log(res)
      if (res.data.status === 200) {
        this.houseObj = res.data.body || {}
      }
    },
    // 区域
    areaHouse(val) {
      this.isShoww = true
      this.currentIndex = val
      this.columns = this.columns.push(this.houseObj.area)
      //  columns: [
      //   {
      //     text: '浙江',
      //     children: [
      //       {
      //         text: '杭州',
      //         children: [{ text: '西湖区' }, { text: '余杭区' }],
      //       },
      //       {
      //         text: '温州',
      //         children: [{ text: '鹿城区' }, { text: '瓯海区' }],
      //       },
      //     ],
      //   },
      //  ]
    },
    // 方式
    madeHouse(val) {
      this.isShoww = true
      this.currentIndex = val
      this.columns = this.houseObj.rentType.map((item) => item.label)
    },
    // 租金
    rentalHouse(val) {
      this.isShoww = true
      this.currentIndex = val
      this.columns = this.houseObj.price.map((item) => item.label)
    },
    // 筛选
    sortHouse(val) {
      this.isShoww = false
      this.currentIndex = val
    }
  },
  mounted() {
    this.searchHouse()
    this.searchTenement()
  }
}
</script>

<style scoped lang="less">
.list {
  height: 0px;
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
</style>
