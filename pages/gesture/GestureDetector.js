import directions from './direction'

export default class GestureDetector {
  /**
   * @param {Function} onPan - (angle, deltaX, moveX) => void
   * @param {Function} onSwipe - (direction, distance, velocity) => void
   */
  constructor(onPan, onSwipe) {
    this.onPan = onPan
    this.onSwipe = onSwipe
    console.log(onPan, onSwipe)
  }

  onTouchStart = (event) => {
    this.startTouchTime = Date.now()
    const { touches } = event
    // 仅支持单手指的手势
    if (touches.length > 1) { return }
    const { identifier, pageX, pageY } = touches[0]
    this.startX = pageX
    this.startY = pageY
    this.lastMoveX = pageX
    this.lastMoveY = pageY
    this.touchId = identifier
  }

  onTouchMove = (event) => {
    const { touches } = event
    const startPointer = touches.filter(touch => {
      return touch.identifier == this.touchId
    })
    // 触摸开始的手指从屏幕上移开了
    if (startPointer.length != 1) {
      this.onTouchEnd()
      return
    }
    const { pageX, pageY } = touches[0]
    // 如果手指只是在竖直方向移动，则不需要计算
    if (pageX == this.lastMoveX) { return }
    const deltaX = pageX - this.lastMoveX
    const deltaY = pageY - this.lastMoveY
    const angle = Math.abs(deltaY) / Math.abs(deltaX)
    if (this.onPan) {
      this.onPan(angle, deltaX, pageX - this.startX)
    }
    this.lastMoveX = pageX
  }

  onTouchEnd = (event) => {
    const duration = Date.now() - this.startTouchTime
    const distance = this.lastMoveX - this.startX
    const velocity = Math.abs(distance) / duration
    if (this.onSwipe) {
      const direction = distance > 0 ? directions.ltr : directions.rtl
      this.onSwipe(direction, distance, velocity)
    }
  }
}
