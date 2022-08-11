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
          :value="roomType?.label ? roomType.label : '请选择'"
        />
      </van-list>
      <!-- 所在楼层 -->
      <van-list>
        <van-cell
          @click="houseFloor"
          title="所在楼层"
          is-link
          :value="floor?.label ? floor.label : '请选择'"
        />
      </van-list>
      <!-- 朝向 -->
      <van-list>
        <van-cell
          @click="houseOriented"
          title="朝 向"
          is-link
          :value="oriented?.label ? oriented.label : '请选择'"
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
        <van-uploader
          :after-read="afterRead"
          :multiple="true"
          v-model="files"
        />
        <van-cell title="房屋配置"></van-cell>
      </van-list>
      <van-grid square :column-num="5">
        <van-grid-item
          v-for="(item, index) in supporting"
          :key="index"
          :text="item.label"
          :class="{ active: classArr[index] }"
          @click="actionFn(index)"
        />
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
            <van-button type="default" size="large" @click="cancelFn"
              >取消</van-button
            >
          </van-col>
          <van-col span="12">
            <van-button type="primary" size="large" @click="submitHouse"
              >提交</van-button
            >
          </van-col>
        </van-row>
      </div>
      <van-picker
        v-if="isShow"
        show-toolbar
        :columns="columns"
        value-key="label"
        ref="pickers"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </div>
    <div class="deom">
      <router-view></router-view>
    </div>
    <van-dialog
      v-model="showBtn"
      title="提示"
      message="放弃发布房源?"
      show-cancel-button
      confirm-button-text="继续编辑"
      confirm-button-color="#108EE9"
      @confirm="confirmFn"
      @cancel="cancelFns"
    >
    </van-dialog>
    <van-dialog
      v-model="show"
      title="提示"
      message="房源发布成功"
      confirm-button-text="继续发布"
      confirmButtonColor="#108EE9"
      cancelButtonText="去查看"
      show-cancel-button
      @confirm="conmitFn"
      @cancel="$router.push('/home/list')"
    >
    </van-dialog>
  </div>
</template>

<script>
// import QRCode from 'qrcode'
export default {
  name: 'Add',
  data() {
    return {
      description: '', // 房屋描述
      title: '', // 房屋标题
      size: '', // 面积大小
      price: '', // 租金价格
      communityName: '', // 搜索返回的名字
      community: '', // 发请求的nameid
      roomType: {}, // 几室
      columns: [],
      isShow: false,
      floor: {}, // 楼层
      num: 0,
      oriented: {}, // 朝向
      houseObj: {},
      classArr: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      support: [],
      files: [],
      houseImg: '',
      showBtn: false,
      show: false
    }
  },
  methods: {
    // 路由回退
    onClickLeft() {
      this.$router.back()
    },
    // 获取图片
    async afterRead(file) {
      // this.files.push(file)
      const formData = new FormData()
      this.files?.forEach((item) => formData.append('file', item.file))
      const res = await this.$API.submitImg(formData)
      this.houseImg = res.data.body.join('|')
    },
    // 确认
    onConfirm() {
      const index = this.$refs.pickers.getIndexes()
      const indexOf = index[0]
      if (this.num === 1) {
        this.roomType = this.houseObj.roomType[indexOf]
      } else if (this.num === 2) {
        this.floor = this.houseObj.floor[indexOf]
      } else if (this.num === 3) {
        this.oriented = this.houseObj.oriented[indexOf]
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
      this.columns = this.houseObj.roomType
    },
    // 楼层
    houseFloor() {
      this.num = 2
      this.isShow = true
      this.columns = this.houseObj.floor
    },
    // 朝向
    houseOriented() {
      this.num = 3
      this.isShow = true
      this.columns = this.houseObj.oriented
    },
    // 搜索房屋所需的条件
    async getHouseParams() {
      const res = await this.$API.getParams()
      this.houseObj = res.data.body
    },
    // 点击切换类名
    actionFn(index) {
      this.classArr.splice(index, 1, !this.classArr[index])
      this.support.push(this.supporting[index].label)
    },
    // 提交
    async submitHouse() {
      if (this.houseImg === '') {
        this.$toast('请上传房源图片')
      } else {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        try {
          const str = this.support.join('|')
          const data = {
            title: this.title,
            description: this.description,
            houseImg: this.houseImg,
            oriented: this.oriented.value,
            supporting: str,
            price: this.price,
            roomType: this.roomType.value,
            size: this.size,
            floor: this.floor.value,
            community: this.community
          }
          await this.$API.releaseHouse(data)
          this.show = true
        } catch (error) {
          this.$toast.fail('发布房源失败~')
        }
      }
    },
    // 取消
    cancelFn() {
      this.showBtn = true
    },
    confirmFn() {
      this.showBtn = true
    },
    // 取消清空
    cancelFns() {
      this.$router.back()
    },
    // 继续发布
    conmitFn() {
      this.show = false
      this.title = ''
      this.description = ''
      this.files = []
      this.oriented = {}
      this.supporting = []
      this.price = ''
      this.roomType = {}
      this.size = ''
      this.floor = {}
      this.communityName = ''
    }
  },
  mounted() {
    this.communityName = this.$store.state.cityObj?.communityName
    this.community = this.$store.state.cityObj?.community
    this.getHouseParams()
  },
  computed: {
    supporting() {
      return this.houseObj?.supporting
    }
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
  :deep(.van-grid) {
    .active {
      .van-grid-item__text {
        color: #21b97a;
      }
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
