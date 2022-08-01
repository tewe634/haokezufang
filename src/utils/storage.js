// 封装toktn
class Storage {
  get(key) {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
    // JSON.parse(localStorage.getItem(key))
  }

  set(key, value) {
    if (typeof value === 'string') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}
export default new Storage()
