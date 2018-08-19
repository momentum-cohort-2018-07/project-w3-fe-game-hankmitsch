const GRID_SIZE = 20
const TICKS_PER_MOVE = 10
const COLORS = {
}
const canvas = document.getElementById('game-canvas')
const screenSize = { x: canvas.width, y: canvas.height,
}

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
    // this.bullet = new Bullet(this)
    this.invader = [new Invader(this), new Invader(this), new Invader(this), new Invader(this), new Invader(this), new Invader(this)]
    this.star = [new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this), new Star(this)]
    this.ticks = 0
    
    let tick = () => {
        this.ticks++
        this.update()
        this.draw()
        window.requestAnimationFrame(this.tick.bind(this))
      }
      this.tick = tick
  }
  // outside the constructor 
start () {
    this.tick()
    }
    update () {
        this.player.update()

    }
    draw () {
        this.context.clearRect(0, 0, this.size.width, this.size.height)
        this.star.forEach(function(star){
            star.draw()
        })
        this.player.draw()
        // this.bullet.draw()
        this.invader.forEach(function(invader){
            invader.draw()
        })
    }
}

    class Player {
        constructor (game){
            this.game = game
            this.keyboard = new Keyboarder()
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
        
            if (this.keyboard.isDown(Keyboarder.KEYS.LEFT)){
                this.center.x -= 5 
                if (this.center.x < 0) this.center.x = 550
            } 
            if (this.keyboard.isDown(Keyboarder.KEYS.RIGHT)) {
                this.center.x += 5
                if (this.center.x > canvas.width) this.center.x = 0
            }
            if (this.keyboard.isDown(Keyboarder.KEYS.UP)) {
                this.center.y -= 3
                if (this.center.y <0) this.center.y = 530
            }
            if (this.keyboard.isDown(Keyboarder.KEYS.DOWN)) {
                this.center.y += 3
                if (this.center.y >= 530) this.center.y = 530
            }
        // }
    }
        
    
        
        draw () {
            this.game.context.fillStyle = "grey"
            this.game.context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)

        }
    }

    class Invader {
        constructor (game) {
            this.game = game
            this.center = {
                x: Math.floor(Math.random()*550),
                y: 10
            }
            this.size ={
                x: 20,
                y: 20,
            }
        }
        update() {
            if (startGame()) {
                this.center.y +=5
            }
        }
        draw () {
           this.game.context.fillStyle = 'red'
           this.game.context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y) 
        }
    }

    class Star {
        constructor (game){
            this.game = game
            this.center = {
                x: Math.floor(Math.random()*550),
                y: Math.floor(Math.random()*550)
            }
            this.size = {
                x: 3,
                y: 3
            }
        }
        draw () {
            this.game.context.fillStyle = 'white'
            this.game.context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
        }
        update () {
            this.center.y += 1
        }
    }

    // class Bullet {
    //     constructor(game) {
    //         this.game = game
    //         this.keyboard = new Keyboarder()
    //         this.center = {
    //             x: screenSize.x / 2 - 10,
    //             y: 520
    //         }
    //         this.size = {x: 4, y: 16 }
    //     }
    //     update (){
    //         if(this.keyboard.isDown(Keyboarder.KEYS.S)) {
    //             this.center.y +=5
    //         }
    //     }
    //     draw() {
    //         this.game.context.fillStyle  = 'red'
    //         this.game.context.fillRect(0, 0, this.size.x, this.size.y)
    //     }
    // }
startGame() 



   