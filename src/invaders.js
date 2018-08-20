class Invaders {
  constructor (game) {
    this.game = game
    this.center = {
      x: Math.floor(Math.random() * 550),
      y: 10
    }
    this.size = {
      x: 20,
      y: 20
    }
  }
  update () {
    this.center.y += 3
    if (this.center.y >= 530) { this.center.y = 0; this.center.x = Math.floor(Math.random() * 550) }
  }
  draw () {
    this.game.context.fillStyle = 'red'
    this.game.context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
  }
}
export default Invaders
