// import Keyboarder from './keyboarder'
import Player from './Player'
// import { screenSize, canvas } from './constants'
import SmallStar from './SmallStar'
import Star from './Star'
import Invaders from './invaders'

function startGame () {
  let game = new Game('game-canvas')
  game.start()
}

class Game {
  constructor (canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.context = this.canvas.getContext('2d')
    this.size = { width: this.canvas.width, height: this.canvas.height }
    this.player = new Player(this)
    this.invaders = [new Invaders(this), new Invaders(this), new Invaders(this), new Invaders(this), new Invaders(this), new Invaders(this)]
    this.star = [new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this)]
    this.smallstar = [new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this), new SmallStar(this)]
    this.ticks = 0

    let tick = () => {
      this.ticks++
      this.update()
      this.draw()
      window.requestAnimationFrame(this.tick.bind(this))
    }
    this.tick = tick
  }
  start () {
    this.tick()
  }
  update () {
    this.player.update()
    this.invaders.forEach(function (invaders) {
      invaders.update()
    })
    this.star.forEach(function (star) {
      star.update()
    })
    this.smallstar.forEach(function (smallstar) {
      smallstar.update()
    })
  }
  draw () {
    this.context.clearRect(0, 0, this.size.width, this.size.height)
    this.star.forEach(function (star) {
      star.draw()
    })
    this.smallstar.forEach(function (smallstar) {
      smallstar.draw()
    })
    this.player.draw()
    this.invaders.forEach(function (invaders) {
      invaders.draw()
    })
  }
}
startGame()
export default Game
