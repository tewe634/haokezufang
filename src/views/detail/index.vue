<template>
  <div class="detail">
    <!-- 头部 -->
    <van-nav-bar
      class="titles"
      :title="community"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="lessAuto">
      <!-- 轮播图 -->
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        :style="{ height: '252px' }"
      >
        <van-swipe-item v-for="(item, index) in houseImg" :key="index">
          <van-image
            width="100%"
            height="252px"
            :src="`http://liufusong.top:8080${item}`"
          />
        </van-swipe-item>
      </van-swipe>
      <!-- 详情 -->
      <van-cell-group>
        <van-cell :title="title">
          <template #label>
            <span
              class="HouseDetail_tag__o8UuR HouseDetail_tag1__2-k0O"
              v-for="(item, index) in tags"
              :key="index"
            >
              {{ item }}
            </span>
          </template>
        </van-cell>
        <van-grid :column-num="3">
          <van-grid-item text="租金">
            <template #icon>
              <span>{{ price }}/月</span>
            </template>
          </van-grid-item>
          <van-grid-item text="房型">
            <template #icon>
              <span>{{ roomType }}</span>
            </template>
          </van-grid-item>
          <van-grid-item text="面积">
            <template #icon>
              <span> {{ size }}平方 </span>
            </template>
          </van-grid-item>
        </van-grid>
        <div>
          <div class="address-list">
            <p>
              <span class="first">装修：</span>
              <span class="last">精装</span>
            </p>
            <p>
              <span class="first">朝向：</span>
              <span class="last">{{ oriented || ' ' }}</span>
            </p>
          </div>
          <div class="address-list">
            <p>
              <span class="first">楼层：</span>
              <span class="last">{{ floor }}</span>
            </p>
            <p>
              <span class="first">类型：</span>
              <span class="last">普通住宅</span>
            </p>
          </div>
        </div>
      </van-cell-group>
      <div class="plot">
        <p>小区：<span>天山星城</span></p>
      </div>
      <!-- 地图 -->

      <div class="HouseDetail_houseTitle__3dg6k">房源概况</div>
      <ul>
        <li>
          <i class="iconfont icon-wardrobe HousePackage_icon__2hT31"></i>
          <span>衣柜</span>
        </li>
        <li>
          <i class="iconfont icon-wash HousePackage_icon__2hT31"></i>
          <span>洗衣机</span>
        </li>
        <li>
          <i class="iconfont icon-air HousePackage_icon__2hT31"></i>
          <span>空调</span>
        </li>
        <li>
          <i class="iconfont icon-ref HousePackage_icon__2hT31"></i>
          <span>冰箱</span>
        </li>
      </ul>
      <div class="HouseDetail_houseTitle__3dg6k">房源概况</div>
      <van-row>
        <van-col span="10">
          <van-image
            width="52px"
            height="52px"
            src="http://liufusong.top:8080/img/avatar.png"
          />
          <div class="gires">
            <p>王女士</p>
            <i class="iconfont icon-auth"></i>
            已认证房主
          </div>
        </van-col>
        <van-col span="14">
          <van-button>发消息</van-button>
        </van-col>
      </van-row>
      <div class="name">
        <p>
          1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
          2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
          3.人车分流，环境优美。
          4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
        </p>
      </div>
      <div class="HouseDetail_houseTitle__3dg6k">猜你喜欢</div>
      <van-list>
        <van-cell>
          <van-row>
            <van-col span="8">
              <van-image
                width="100"
                height="100"
                src="http://liufusong.top:8080/img/message/1.png"
              />
            </van-col>
            <van-col span="16">
              <h4 style="margin: 0px" class="HouseItem_title__2dXar">
                安贞西里 3室1厅
              </h4>
              <span class="HouseItem_desc__5-mp4">72.32㎡/南 北/低楼层</span>
              <p class="HouseItem_tag__3MxYv HouseItem_tag1__3VDnD">随时看房</p>
              <p class="HouseItem_price__1_r8v"><span>4500</span>元/月</p>
            </van-col>
          </van-row>
        </van-cell>
      </van-list>
      <van-list>
        <van-cell>
          <van-row>
            <van-col span="8">
              <van-image
                width="100"
                height="100"
                src="http://liufusong.top:8080/img/message/2.png"
              />
            </van-col>
            <van-col span="16">
              <h4 style="margin: 0px" class="HouseItem_title__2dXar">
                天居园 2室1厅
              </h4>
              <span class="HouseItem_desc__5-mp4">83㎡/南/高楼层</span>
              <p class="HouseItem_tag__3MxYv HouseItem_tag1__3VDnD">近地铁</p>
              <p class="HouseItem_price__1_r8v"><span>7200</span>元/月</p>
            </van-col>
          </van-row>
        </van-cell>
      </van-list>
      <van-list>
        <van-cell>
          <van-row>
            <van-col span="8">
              <van-image
                width="100"
                height="100"
                src="http://liufusong.top:8080/img/message/3.png"
              />
            </van-col>
            <van-col span="16">
              <h4 style="margin: 0px" class="HouseItem_title__2dXar">
                角门甲4号院 1室1厅
              </h4>
              <span class="HouseItem_desc__5-mp4">52㎡/西南/低楼层</span>
              <p class="HouseItem_tag__3MxYv HouseItem_tag1__3VDnD">集中供暖</p>
              <p class="HouseItem_price__1_r8v"><span>4300</span>元/月</p>
            </van-col>
          </van-row>
        </van-cell>
      </van-list>
      <div class="footer">
        <van-row>
          <van-col span="8">
            <button @click="addFn">
              <img
                :src="
                  isShow
                    ? `http://liufusong.top:8080/img/star.png`
                    : `http://liufusong.top:8080/img/unstar.png`
                "
                alt=""
                style="width: 16px; height: 16px"
              />
              收藏
            </button>
          </van-col>
          <van-col span="8"><button>在线咨询</button></van-col>
          <van-col span="8"><button class="last">电话预约</button></van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      houseObj: {},
      isShow: false
    }
  },
  methods: {
    // 获取列表数据
    async getHouseId() {
      const { data } = await this.$API.getHouseId(this.$route.params.code)
      this.houseObj = data.body || {}
      this.getIsShow()
    },
    // 房屋是否收藏
    async getIsShow() {
      const { data } = await this.$API.getIsShow(this.houseCode)
      this.isShow = data.body.isFavorite
    },
    // 路由回退
    onClickLeft() {
      this.$router.back()
    },
    // 添加收藏或取消收藏
    async addFn() {
      this.isShow = !this.isShow
      if (this.isShow) {
        // 添加
        try {
          await this.$API.addCollect(this.houseCode)
          this.$toast.success('添加收藏成功~')
        } catch (error) {
          this.$toast.fail('添加收藏失败~')
        }
      } else {
        // 删除
        try {
          await this.$API.delectCollect(this.houseCode)
          this.$toast.success('删除收藏成功')
        } catch (error) {
          this.$toast.fail('删除收藏失败')
        }
      }
    }
  },
  created() {
    this.getHouseId()
  },
  computed: {
    community() {
      return this.houseObj.community
    },
    houseImg() {
      return this.houseObj.houseImg
    },
    title() {
      return this.houseObj.title
    },
    tags() {
      return this.houseObj.tags
    },
    price() {
      return this.houseObj.price
    },
    roomType() {
      return this.houseObj.roomType
    },
    size() {
      return this.houseObj.size
    },
    oriented() {
      return this.houseObj.oriented?.[0]
    },
    floor() {
      return this.houseObj.floor
    },
    houseCode() {
      return this.houseObj.houseCode
    }
  }
}
</script>

<style scoped lang="less">
:deep(.titles) {
  background-color: #21b97a;
  .van-icon {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
    font-size: 0.4267rem;
  }
}
.my-swipe .van-swipe-item {
  color: #ccc;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
.HouseDetail_tag__o8UuR {
  color: #39becd;
  background: #e1f5f8;
}
:deep(.van-grid-item__icon-wrapper) {
  span {
    font-size: 0.48rem;
    color: red;
  }
}
.address-list {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.3467rem;
  padding-left: 0.4rem;
  p {
    width: 50%;
    .first {
      display: inline-block;
      color: #999;
      padding-right: 5px;
      line-height: 26px;
    }
  }
}
.plot {
  padding-left: 0.4rem;
  margin-top: 0.2667rem;
  color: #666;
  font-size: 0.3733rem;
}
.HouseDetail_houseTitle__3dg6k {
  font-weight: 600;
  font-size: 0.4rem;
  margin-bottom: 10px;
  padding: 15px 0;
  border-bottom: 1px solid #cecece;
  padding: 0.4rem;
  margin-bottom: 0 0.2667rem 0.2667rem;
}
ul {
  display: flex;
  li {
    width: 25%;
    height: 1.36rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 0.3733rem;
      color: #333;
    }
    i {
      font-size: 0.6133rem;
    }
  }
}
.HouseDetail_houseTitle__3dg6k {
  font-weight: 600;
  font-size: 0.4rem;
  margin-bottom: 0.2667rem;
  padding: 0.4rem 0;
  border-bottom: 0.0267rem solid #cecece;
}
:deep(.van-col--10) {
  position: relative;
  display: flex;
  font-size: 0.32rem;
  justify-content: space-between;
  .gires {
    line-height: 0.3867rem;
    color: #fa5741;
    padding-top: 0.2133rem;
    p {
      color: #333;
    }
  }
}
:deep(.van-button--normal) {
  position: relative;
  left: 3.28rem;
  top: 0;
  width: 1.9733rem;
  height: 0.7733rem;
  font-size: 0.3733rem;
  padding: 0;
  color: #33be85;
  border: 1px solid #33be85;
}
.name {
  p {
    margin-top: 0.2667rem;
    font-size: 0.3733rem;
    color: #333;
  }
}
.HouseDetail_houseTitle__3dg6k {
  font-weight: 600;
  font-size: 0.4rem;
  margin-bottom: 0.2667rem;
  padding: 0.4rem 0;
  border-bottom: 0.0267rem solid #cecece;
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
.footer {
  width: 100%;
  position: fixed;
  bottom: 0px;
  button {
    width: 100%;
    height: 1.3333rem;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #ccc;
  }
  .last {
    background-color: #21b97a;
    color: #fff;
  }
}
.lessAuto {
  max-height: calc(100vh - 46px - 50px);
  overflow: auto;
}
</style>
