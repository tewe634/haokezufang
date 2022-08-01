<template>
  <div class="home">
    <!-- 轮播图 -->
    <van-swipe
      v-if="$router.currentRoute.meta.isShow"
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      style="top: -59px"
      :style="{ height: h }"
    >
      <van-swipe-item v-for="item in list" :key="item.id">
        <van-image
          width="375px"
          height="212px"
          fit="contain"
          :src="`http://liufusong.top:8080${item.imgSrc}`"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 图片 -->
    <div class="flexable" v-if="$router.currentRoute.meta.isShow">
      <div>
        <img src="../../assets/imgs/2.png" alt="" @click="fn(1)" />
        <p>整租</p>
      </div>
      <div>
        <img src="../../assets/imgs/4.png" alt="" @click="fn(1)" />
        <p>合租</p>
      </div>
      <div>
        <img
          src="../../assets/imgs/3.png"
          alt=""
          @click="$router.push('/map')"
        />
        <p>地图找房</p>
      </div>
      <div>
        <img
          src="../../assets/imgs/1.png"
          alt=""
          @click="$router.push('/login')"
        />
        <p>去出租</p>
      </div>
    </div>
    <!-- 租房小图 -->
    <div class="grop" v-if="$router.currentRoute.meta.isShow">
      <h3 class="group-title">租房小组 <span class="more">更多</span></h3>
      <div class="am-grid">
        <div class="am-flexbox" v-for="item in groupsList" :key="item.id">
          <img :src="`http://liufusong.top:8080${item.imgSrc}`" alt="" />
          <div>
            <p>{{ item.desc }}</p>
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      list: [],
      h: '212px',
      groupsList: []
    }
  },
  methods: {
    // 轮播图
    async getimg() {
      try {
        const res = await this.$API.getImG()
        if (res.data.status === 200) {
          this.list = res.data.body
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    // 租房小组
    async searchList() {
      try {
        const res = await this.$API.searchHome()
        if (res.data.status === 200) {
          this.groupsList = res.data.body
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    fn(val) {
      this.$router.push('/home/list')
      this.$bus.$on('goNumber', val)
    }
  },
  mounted() {
    this.getimg()
    this.searchList()
  }
}
</script>

<style scoped lang="less">
.home {
  height: 0px;
}
:deep(.my-swipe) {
  height: 212px;
}
.flexable {
  display: flex;
  justify-content: space-evenly;
  margin-top: -1.0133rem;
  align-items: center;
  img {
    display: block;
    width: 1.6rem;
    height: 1.6rem;
  }
  p {
    font-size: 0.32rem;
    color: #333;
    text-align: center;
  }
}
.grop {
  background-color: #f6f5f6;
  overflow: hidden;
  padding: 0 0.2667rem;
}
.grop .group-title {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0.4rem 0 0.4rem 0.2667rem;
  font-size: 0.4rem;
}
.grop .more {
  color: #787d82;
  position: absolute;
  right: 0;
  font-size: 14px;
  font-weight: 400;
}
.am-grid {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .am-flexbox {
    display: flex;
    justify-content: space-around;
    width: 46%;
    height: 1.3333rem;
    background-color: #fff;
    margin-bottom: 10px;
    img {
      display: block;
      width: 1.3333rem;
      height: 1.3333rem;
    }
    p {
      font-size: 0.3733rem;
      line-height: 0.6667rem;
    }
  }
}
</style>
