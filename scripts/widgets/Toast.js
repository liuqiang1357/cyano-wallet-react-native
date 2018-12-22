import SimpleToast from 'react-native-simple-toast'

const THROTTLE_DURATION = 1000

export default class Toast {
  static SHORT = SimpleToast.SHORT
  static LONG = SimpleToast.LONG

  static lastMessage = null
  static lastShowTime = -Infinity

  static show(message, duration=SimpleToast.LONG) {
    if (!message) {
      return
    }
    const currentTime = Date.now()
    if (this.lastMessage === message) {
      if (currentTime - this.lastShowTime < THROTTLE_DURATION) {
        return
      }
    }
    this.lastMessage = message
    this.lastShowTime = currentTime
    SimpleToast.show(message, duration)
  }
}
