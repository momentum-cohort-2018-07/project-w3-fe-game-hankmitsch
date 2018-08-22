import Keyboarder from './keyboarder'

class Star {
  constructor (game) {
    this.game = game
    this.center = {
      x: Math.floor(Math.random() * 550),
      y: Math.floor(Math.random() * 550)
    }
    this.keyboard = new Keyboarder()
    this.size = {
      x: 4,
      y: 4
    }
  }
  draw () {
    this.game.context.fillStyle = 'white'
    this.game.context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
  }
  update () {
    this.center.y += 1
    if (this.keyboard.isDown(Keyboarder.KEYS.UP)) {
      this.center.y += 1
    }
    if (this.keyboard.isDown(Keyboarder.KEYS.DOWN)) {
      this.center.y -= 0.25
    }
    if (this.center.y >= 530) { this.center.y = 0; this.center.x = Math.floor(Math.random() * 550) }
  }
}
export default Star
