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

// /user 获取用户信息 get
export const getInfo = () => request({ url: '/user', method: 'GET' })
// /user/logout 退出 post 带token
export const getLogout = () => request({ url: '/user/logout', method: 'POST' })

// 查询房屋具体信息 /houses/{id} get
export const getHouseId = (id) =>
  request({ url: `/houses/${id}`, method: 'GET' })

// /user/favorites 查看收藏列表 get
export const getFavorites = () =>
  request({ url: '/user/favorites', method: 'GET' })

// /user/houses 发布房源
export const getAllHouse = () => request({ url: '/user/houses', method: 'GET' })

// /user/favorites/{id} 添加收藏 post
export const addCollect = (id) =>
  request({ url: `/user/favorites/${id}`, method: 'POST' })

// /user/favorites/{id} 删除收藏 DELETE
export const delectCollect = (id) =>
  request({ url: `/user/favorites/${id}`, method: 'DELETE' })

// /user/favorites/{id} 房屋是否收藏
export const getIsShow = (id) =>
  request({ url: `/user/favorites/${id}`, method: 'GET' })
// /area/community 小区关键词查询
export const getCommunity = (params) =>
  request({ url: '/area/community', params, method: 'GET' })
//  /houses/params 发布房屋所需的条件
export const getParams = () => request({ url: '/houses/params' })

// /user/houses 发布房源 post data
export const releaseHouse = (data) =>
  request({ url: '/user/houses ', method: 'POST', data })

// /houses/image 上传图片
export const submitImg = (file) =>
  request({
    url: '/houses/image ',
    method: 'POST',
    data: file
  })
// /user/registered 用户注册 post
export const getRegistered = (data) =>
  request({ url: '/user/registered', method: 'POST', data })
// /area/map 查询房源数据
export const gethouseData = (params) =>
  request({ url: '/area/map', method: 'GET', params })
