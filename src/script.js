// import Keyboarder from './keyboarder'
// function collision () {
//   var rect1 = this.player
//   var rect2 = this.invader

//   if (rect1.x < rect2.x + rect2.width &&
//         rect1.x + rect1.width > rect2.x &&
//         rect1.y < rect2.y + rect2.height &&
//         rect1.y + rect1.height > rect2.y) {
//     this.context.clearRect(0, 0, this.player.width, this.player.height)
//   }
// }

// class Bullet {
//   constructor (center, velocity) {
//     this.center = center
//     this.game = game
//     this.size = { x: 3, y: 3 }
//     this.velocity = velocity
//     this.keyboard = new Keyboarder()
//   }

//   // **update()** updates the state of the bullet for a single tick.
//   update () {
//     // Add velocity to center to move bullet.
//     this.center.x += this.velocity.x
//     this.center.y += this.velocity.y
//   }
//   draw () {
//     if (this.keyboarder.isDown(this.keyboarder.KEYS.S)) {
//       // ... create a bullet just above the player that will move upwards...
//       const bullet = new Bullet({ x: this.center.x, y: this.center.y - this.size.y - 10 },
//         { x: 0, y: -7 })
//     }
//   }
