<template>
  <div>
    <footer>
      <van-nav-bar title="注册" left-arrow @click-left="$router.back()" />
    </footer>
    <main>
      <van-form @submit="onSubmit">
        <van-field v-model="username" label="账号" placeholder="请输入账号" />
        <van-field
          v-model="password"
          name="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
        />
        <van-field
          v-model="password1"
          type="password"
          label="确认密码"
          placeholder="请输入确认密码"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </main>
  </div>
</template>

<script>
import { getRegistered } from '@/api'
export default {
  name: 'registe',
  data() {
    return {
      username: '',
      password: '',
      password1: ''
    }
  },
  methods: {
    async onSubmit() {
      if (this.password !== this.password1) {
        return this.$toast('输入的两次密码不一致，请重新输入~')
      } else {
        try {
          const data = { username: this.username, password: this.password }
          const res = await getRegistered(data)
          console.log(res)
          this.$toast.success('创建账号成功~')
          this.$router.back()
        } catch (error) {
          this.$toast.fail('创建账号失败~')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
footer {
  :deep(.van-nav-bar) {
    background-color: #21b97a;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
}
</style>
