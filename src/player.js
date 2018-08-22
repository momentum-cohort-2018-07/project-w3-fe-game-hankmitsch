import Keyboarder from './keyboarder'
import { screenSize, canvas } from './constants'
class Player {
  constructor (game) {
    this.game = game
    this.keyboard = new Keyboarder()
    // this.bullet = new Bullet()
    this.center = {
      x: screenSize.x / 2 - 10,
      y: 520
    }
    this.size = {
      x: 20,
      y: 20
    }
  }
  update () {
    if (this.keyboard.isDown(Keyboarder.KEYS.LEFT)) {
      this.center.x -= 5
      if (this.center.x < 0) this.center.x = 550
    }
    if (this.keyboard.isDown(Keyboarder.KEYS.RIGHT)) {
      this.center.x += 5
      if (this.center.x > canvas.width) this.center.x = 0
    }
    if (this.keyboard.isDown(Keyboarder.KEYS.UP)) {
      this.center.y -= 3
      if (this.center.y < 0) this.center.y = 530
    }
    if (this.keyboard.isDown(Keyboarder.KEYS.DOWN)) {
      this.center.y += 3
      if (this.center.y >= 530) this.center.y = 530
    }
  }

  draw () {
    this.game.context.fillStyle = 'grey'
    this.game.context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
  }
}
export default Player
