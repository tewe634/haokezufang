import request from '@/utils/requst'
// /home/swiper get 轮播图
export const getImG = () => request({ url: '/home/swiper', method: 'GET' })

// /home/groups get 租房小组
export const searchHome = () => request({ url: '/home/groups', method: 'GET' })

// /area/hot get 获取热门城市
export const searchHotCity = () => request({ url: '/area/hot', method: 'GET' })

// /area/city get 获取哪一级的城市，1 表示获取所有城市数据 2 表示城市下区的数据 get
export const searchList = (val) =>
  request({ url: `/area/city/?level=${val}`, method: 'GET' })

// /user/login post 登入 data{"username":,"password":}

export const getLongin = (data) =>
  request({ url: '/user/login', data, method: 'POST' })

// /houses 根据条件查询房屋  get
export const getHouse = (params) =>
  request({ url: '/houses', params, method: 'GET' })

// /houses/condition 获取房屋查询条件 get
export const getTenement = (id) =>
  request({ url: `/houses/condition/?id=${id}`, method: 'GET' })
