<template>
  <div class="Add">
    <van-nav-bar title="发布房源" left-arrow @click-left="onClickLeft" />
    <div class="height">
      <!-- 小区名称 -->
      <van-list>
        <van-cell title="房源信息" style="color: #21b97a"></van-cell>
        <van-cell
          title="小区名称"
          :to="{ path: '/rent/search' }"
          is-link
          :value="communityName ? communityName : '请输入小区名称'"
        />
      </van-list>
      <!-- 租金 -->
      <van-list>
        <van-row type="flex" justify="center" align="center">
          <van-col span="6">租 金</van-col>
          <van-col span="15">
            <van-cell-group>
              <van-field v-model="price" placeholder="请输入租金/月" />
            </van-cell-group>
          </van-col>
          <van-col span="3">￥/月</van-col>
        </van-row>
      </van-list>
      <!-- 建筑面积 -->
      <van-list>
        <van-row type="flex" justify="center" align="center">
          <van-col span="6">建筑面积</van-col>
          <van-col span="15">
            <van-cell-group>
              <van-field v-model="size" placeholder="请输入建筑面积" />
            </van-cell-group>
          </van-col>
          <van-col span="3">￥/月</van-col>
        </van-row>
      </van-list>
      <!-- 户型 -->
      <van-list>
        <van-cell
          @click="cityRoomType"
          title="户 型"
          is-link
          :value="roomType ? roomType : '请选择'"
        />
      </van-list>
      <!-- 所在楼层 -->
      <van-list>
        <van-cell
          @click="houseFloor"
          title="所在楼层"
          is-link
          :value="floor ? floor : '请选择'"
        />
      </van-list>
      <!-- 朝向 -->
      <van-list>
        <van-cell
          @click="houseOriented"
          title="朝 向"
          is-link
          :value="oriented ? oriented : '请选择'"
        />
        <van-cell title="房屋标题"></van-cell>
      </van-list>
      <!-- 房屋图像 -->
      <van-list>
        <van-cell-group>
          <van-field
            v-model="title"
            placeholder="请输入标题(例如：整租 小区名 2室 5000元)"
          />
        </van-cell-group>
        <van-cell title="房屋图像"></van-cell>
      </van-list>
      <!-- 房屋配置 -->
      <van-list>
        <van-uploader :after-read="afterRead" />
        <van-cell title="房屋配置"></van-cell>
      </van-list>
      <van-grid :column-num="5">
        <van-grid-item text="衣柜">
          <template #icon>
            <i class="iconfont icon-wardrobe" style="font-size: 23px"> </i>
          </template>
        </van-grid-item>
        <van-grid-item text="洗衣机">
          <template #icon>
            <i class="iconfont icon-wash" style="font-size: 23px"> </i>
          </template>
        </van-grid-item>
        <van-grid-item text="空调">
          <template #icon>
            <i class="iconfont icon-air" style="font-size: 23px"> </i>
          </template>
        </van-grid-item>
        <van-grid-item text="冰箱">
          <template #icon>
            <i class="iconfont icon-ref" style="font-size: 23px"> </i>
          </template>
        </van-grid-item>
        <van-grid-item text="天然气">
          <template #icon>
            <i class="iconfont icon-gas" style="font-size: 23px"> </i>
          </template>
        </van-grid-item>
      </van-grid>
      <van-grid :column-num="5">
        <van-grid-item text="暖气">
          <template #icon>
            <i class="iconfont icon-Heat" style="font-size: 23px"> </i>
          </template>
        </van-grid-item>
        <van-grid-item text="电视">
          <template #icon>
            <i class="iconfont icon-vid" style="font-size: 23px"> </i>
          </template>
        </van-grid-item>
        <van-grid-item text="热水器">
          <template #icon>
            <i class="iconfont icon-heater" style="font-size: 23px"> </i>
          </template>
        </van-grid-item>
        <van-grid-item text="宽带">
          <template #icon>
            <i class="iconfont icon-broadband" style="font-size: 23px"> </i>
          </template>
        </van-grid-item>
        <van-grid-item text="沙发">
          <template #icon>
            <i class="iconfont icon-sofa" style="font-size: 23px"> </i>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="footer">
        <!-- 房屋描述 -->
        <van-list>
          <van-cell title="房屋描述"></van-cell>
          <van-cell-group>
            <van-field v-model="description" placeholder="请输入房屋描述信息" />
          </van-cell-group>
        </van-list>
      </div>
      <div class="button">
        <van-row>
          <van-col span="12">
            <van-button type="default" size="large">主要按钮</van-button>
          </van-col>
          <van-col span="12">
            <van-button type="primary" size="large">默认按钮</van-button>
          </van-col>
        </van-row>
      </div>
      <van-picker
        v-if="isShow"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </div>
    <div class="deom">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import QRCode from 'qrcode'
export default {
  name: 'Add',
  data() {
    return {
      description: '',
      title: '', // 房屋标题
      size: '', // 面积大小
      price: '', // 租金价格
      communityName: '', // 搜索返回的名字
      community: '', // 发请求的nameid
      roomType: '', // 几室
      columns: [],
      isShow: false,
      floor: '', // 楼层
      num: 0,
      oriented: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      // const houseImg = await QRCode.toDataURL(file.content)
      // console.log(houseImg)
    },
    // 确认
    onConfirm(val) {
      if (this.num === 1) {
        this.roomType = val
      } else if (this.num === 2) {
        this.floor = val
      } else if (this.num === 3) {
        this.oriented = val
      }
      this.isShow = false
      this.columns = []
    },
    // 取消
    onCancel() {
      this.isShow = false
      this.columns = []
    },
    // 户型
    cityRoomType() {
      this.num = 1
      this.isShow = true
      this.columns = ['一室', '二室', '三室', '四室', '四室+']
    },
    // 楼层
    houseFloor() {
      this.num = 2
      this.isShow = true
      this.columns = ['高楼层', '中楼层', '低楼层']
    },
    // 朝向
    houseOriented() {
      this.num = 3
      this.isShow = true
      this.columns = ['东', '西', '南', '北', '东南', '西南', '东北', '西北']
    }
  },
  mounted() {
    this.communityName = this.$store.state.cityObj?.communityName
    this.community = this.$store.state.cityObj?.community
  }
}
</script>

<style scoped lang="less">
.Add {
  .height {
    max-height: calc(100vh - 46px - 50px);
    overflow: auto;
    :deep(.van-picker) {
      position: sticky;
      bottom: 0px;
      z-index: 9999;
    }
  }
  :deep(.van-nav-bar) {
    position: sticky;
    top: 0px;
    background-color: #21b97a;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
  :deep(.van-list) {
    .van-row {
      .van-col {
        font-size: 0.3733rem;
        color: #888;
      }
      .van-col--6 {
        padding-left: 0.4rem;
        color: #666;
      }
    }
  }
  .footer {
    margin-top: 0.5333rem;
    :deep(.van-field__control) {
      height: 3.4133rem;
    }
    ::placeholder {
      position: relative;
      top: -1.4933rem;
    }
  }
}
.button {
  position: fixed;
  bottom: 0px;
  width: 100%;
  z-index: 99;
}
</style>
