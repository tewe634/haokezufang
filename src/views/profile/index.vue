<template>
  <div class="profile">
    <!-- 登入成功 -->
    <div class="My_title__39w3V" v-if="isShow">
      <div class="My_info__eOYeg">
        <van-image
          round
          width="70px"
          height="70px"
          fit="cover"
          :src="`http://liufusong.top:8080${obj.avatar}`"
        />
        <p class="My_name__3U2NB">{{ obj.nickname }}</p>
        <van-button
          size="small"
          round
          type="primary"
          color="#21b97a"
          @click="loginOut"
          >退出</van-button
        >
        <div class="My_edit__3wqlv">
          <span>编辑个人资料</span>
          <i class="iconfont icon-arrow"></i>
        </div>
      </div>
    </div>
    <!-- 登入 -->
    <div class="My-bg" v-else>
      <div class="My_info__eOYeg">
        <van-image
          round
          width="70px"
          height="70px"
          fit="cover"
          src="http://liufusong.top:8080/img/profile/avatar.png"
        />
        <p class="My_name__3U2NB">游客</p>
        <van-button
          size="normal"
          round
          type="primary"
          to="/login"
          color="#21b97a"
          >去登录</van-button
        >
      </div>
    </div>
    <!-- 小图片 -->
    <div>
      <van-row>
        <van-col
          span="8"
          type="flex"
          align="center"
          justify="center"
          @click="$router.push('/login')"
        >
          <i class="iconfont icon-coll" style="font-size: 20px"></i>
          <p>我的收藏</p>
        </van-col>
        <van-col
          span="8"
          type="flex"
          align="center"
          justify="center"
          @click="$router.push('/login')"
        >
          <i class="iconfont icon-ind" style="font-size: 20px"></i>
          <p>我的出租</p>
        </van-col>
        <van-col span="8" type="flex" align="center" justify="center">
          <i class="iconfont icon-record" style="font-size: 20px"></i>
          <p>看房记录</p>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8" type="flex" align="center" justify="center">
          <i class="iconfont icon-identity" style="font-size: 20px"></i>
          <p>成为房主</p>
        </van-col>
        <van-col span="8" type="flex" align="center" justify="center">
          <i class="iconfont icon-myinfo" style="font-size: 20px"></i>
          <p>个人资料</p>
        </van-col>
        <van-col span="8" type="flex" align="center" justify="center">
          <i class="iconfont icon-cust" style="font-size: 20px"></i>
          <p>联系我们</p>
        </van-col>
      </van-row>
    </div>
    <!-- 大图片 -->
    <div class="My_ad__1wZZj">
      <van-image
        width="345px"
        height="85px"
        src="http://liufusong.top:8080/img/profile/join.png"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data() {
    return {
      obj: {}
    }
  },
  methods: {
    loginOut() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否确认退出'
        })
        .then(async () => {
          const res = await this.$API.getLogout()
          console.log(res)
          this.$store.commit('SEND_TOKEN', '')
        })
        .catch(() => {})
    }
  },
  computed: {
    isShow() {
      return !!this.$store.state.token
    }
  },
  mounted() {
    this.$bus.$on('InfoList', (val) => (this.obj = val))
  }
}
</script>

<style scoped lang="less">
.My-bg {
  position: relative;
  width: 10rem;
  height: 8rem;
  background: url('../../assets/imgs/bg.png') no-repeat;
  background-size: 100% 5.0933rem;
  .My_info__eOYeg {
    position: absolute;
    background: #fff;
    width: 85%;
    height: 55%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px 3px #ddd;
    margin: 50px auto 0;
    padding: 0 20px;
    text-align: center;
    font-size: 13px;
    .van-image {
      position: relative;
      transform: translateY(-50%);
      border-radius: 50%;
      width: 70px;
      height: 70px;
      border: 5px solid #f5f5f5;
      display: inline-block;
      box-shadow: 0 2px 2px #bdbdbd;
    }
    .My_name__3U2NB {
      margin-top: -30px;
      margin-bottom: 10px;
      font-size: 0.3467rem;
    }
  }
}
:deep(.van-row) {
  padding: 0.4rem 0;
  i {
    text-align: center;
  }
  p {
    font-size: 13px;
    color: #333;
  }
}
.My_ad__1wZZj {
  text-align: center;
  margin-top: 10px;
}
.My_title__39w3V {
  position: relative;
  width: 100%;
  height: 10rem;
  background: url('../../assets/imgs/avatar.png') no-repeat center;
  background-size: 100% 100%;
  .My_info__eOYeg {
    position: absolute;
    background: #fff;
    width: 8.48rem;
    height: 5.5467rem;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px 3px #ddd;
    margin: 50px auto 0;
    padding: 0 20px;
    text-align: center;
    font-size: 13px;
    .van-image {
      position: relative;
      transform: translateY(-50%);
      border-radius: 50%;
      width: 70px;
      height: 70px;
      border: 5px solid #f5f5f5;
      display: inline-block;
      box-shadow: 0 2px 2px #bdbdbd;
    }
    .My_name__3U2NB {
      margin-top: -30px;
      margin-bottom: 10px;
      font-size: 0.3467rem;
    }
    :deep(.van-button--small) {
      width: 1.44rem;
      height: 0.5333rem;
      font-size: 0.32rem;
    }
    .My_edit__3wqlv {
      color: #999;
      font-size: 12px;
      margin-top: 20px;
    }
    i {
      font-size: 12px;
      vertical-align: middle;
    }
  }
}
</style>
