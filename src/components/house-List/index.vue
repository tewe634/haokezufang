<template>
  <div>
    <!-- 列表 -->
    <van-list>
      <van-cell
        v-for="item in houseAll"
        :key="item.houseCode"
        :to="{ name: `detail`, params: { code: item.houseCode } }"
      >
        <van-row>
          <van-col span="8">
            <van-image
              width="100"
              height="100"
              :src="`http://liufusong.top:8080${item.houseImg}`"
            />
          </van-col>
          <van-col span="16">
            <h4 style="margin: 0px" class="HouseItem_title__2dXar">
              {{ item.title }}
            </h4>
            <span class="HouseItem_desc__5-mp4">{{ item.desc }}</span>
            <p class="HouseItem_tag__3MxYv HouseItem_tag1__3VDnD">
              {{ item.tags[0] }}
            </p>
            <p class="HouseItem_price__1_r8v">
              <span>{{ item.price }}</span
              >元/月
            </p>
          </van-col>
        </van-row>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'houseList',
  data() {
    return {
      houseAll: []
    }
  },
  methods: {
    async getAllHouse() {
      const { data } = await this.$API.getAllHouse()
      if (data.status === 200) {
        this.houseAll = data.body
      }
    }
  },
  created() {
    this.getAllHouse()
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
:deep(.van-list) {
  max-height: calc(100vh - 46px);
  overflow: auto;
  padding-bottom: 1.0667rem;
}
.HouseItem_title__2dXar {
  font-size: 0.4rem;
  color: #394043;
}
.HouseItem_desc__5-mp4 {
  display: block;
  font-size: 0.32rem;
  color: #afb2b3;
}
.HouseItem_tag__3MxYv {
  display: inline-block;
  font-size: 0.32rem;
  color: #39becd;
  background: #e1f5f8;
  margin-right: 0.1333rem;
}
.HouseItem_price__1_r8v {
  color: #fa5741;
  font-size: 0.32rem;
  span {
    font-size: 0.4267rem;
    margin-right: 0.08rem;
  }
}
</style>
