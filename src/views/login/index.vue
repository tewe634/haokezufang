<template>
  <div>
    <!-- 导航栏 -->
    <div>
      <van-nav-bar
        title="账号登入"
        left-arrow
        border:false
        @click-left="onClickLeft"
        :style="{ 'background-color': color }"
      ></van-nav-bar>
    </div>
    <!-- 提交 -->
    <div>
      <van-form @submit="onSubmit" ref="form">
        <van-field
          v-model="username"
          name="username"
          center
          placeholder="请输入账号"
          :rules="[
            { pattern: /^[a-zA-Z0-9]{5,8}$/, message: '五到八位数字或字母' }
          ]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          center
          placeholder="请输入密码"
          :rules="[]"
        />
        <div style="margin: 16px">
          <van-button
            block
            type="info"
            native-type="submit"
            :style="{ 'background-color': color }"
            >登录</van-button
          >
        </div>
        <div class="foot">
          <router-link class="router" to="/registe"
            >还没有账号，去注册~</router-link
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      color: '#1cb676',
      username: '',
      password: ''
    }
  },
  methods: {
    // 登入
    async onSubmit() {
      // 加载提示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const data = { username: this.username, password: this.password }
        const res = await this.$API.getLongin(data)
        console.log(res)
        this.$store.commit('SEND_TOKEN', res.data.body.token)
        this.$router.push('/home/profile')
        this.$toast.success(res.data.description)
      } catch (error) {
        console.log(error)
      }
    },
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-nav-bar__content) {
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
:deep(.van-cell--center) {
  height: 1.6rem;
  margin-bottom: 0.24rem;
}
:deep(.van-button--info) {
  border: none;
}
:deep(.van-cell::after) {
  border: 0.0267rem solid #ddd;
}
:deep(.van-field__control) {
  font-size: 0.4533rem;
}
.foot {
  width: 100%;
  margin-top: 0.8rem;
  :deep(.router) {
    color: #666;
    font-size: 0.3467rem;
    display: block;
    text-align: center;
  }
}
</style>
