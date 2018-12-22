import { AsyncStorage } from 'react-native'

class StorageService {
  set(key, value) {
    return AsyncStorage.setItem(key, value)
      .then(() => value)
  }

  setJson(key, value) {
    return this.set(key, JSON.stringify(value))
  }

  get(key) {
    return AsyncStorage.getItem(key)
  }

  getJson(key) {
    return this.get(key)
      .then(value => JSON.parse(value))
  }

  remove(key) {
    return AsyncStorage.removeItem(key)
  }

  clear() {
    return AsyncStorage.clear()
  }
}

export default new StorageService()
