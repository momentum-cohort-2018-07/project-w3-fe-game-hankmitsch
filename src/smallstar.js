import Keyboarder from './keyboarder'

class SmallStar {
  constructor (game) {
    this.game = game
    this.keyboard = new Keyboarder()
    this.center = {
      x: Math.floor(Math.random() * 550),
      y: Math.floor(Math.random() * 550)
    }
    this.size = {
      x: 1,
      y: 1
    }
  }
  draw () {
    this.game.context.fillStyle = 'white'
    this.game.context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
  }
  update () {
    this.center.y += 0.2
    if (this.center.y >= 530) { this.center.y = 0; this.center.x = Math.floor(Math.random() * 550) }
    if (this.keyboard.isDown(Keyboarder.KEYS.UP)) {
      this.center.y += 0.5
    }
  }
}
export default SmallStar
