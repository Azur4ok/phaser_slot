import { Scene } from 'phaser'

interface Reel {
  container: Phaser.GameObjects.Container
  symbols: Phaser.GameObjects.Sprite[]
  position: number
  previousPosition: number
}

export class GameScene extends Scene {
  private REEL_WIDTH: number = 160
  private SYMBOL_SIZE: number = 150
  private WIDTH: number = 1024
  private HEIGHT: number = 768
  private isRunning: boolean = false
  private reels: Reel[] = []
  private keys: string[] = []
  private textPlayButton!: Phaser.GameObjects.Text

  constructor() {
    super('game-scene')
  }

  preload(): void {
    this.load.baseURL = 'assets/'

    const images = {
      img0: 'eggHead.png',
      img1: 'flowerTop.png',
      img2: 'helmlok.png',
      img3: 'skully.png',
    }

    this.keys = Object.keys(images)

    for (let index = 0; index < this.keys.length; index++) {
      this.load.image(this.keys[index], images[this.keys[index] as keyof typeof images])
    }
  }

  buildReels(): void {
    const reelContainer = this.add.container()

    const margin = (this.HEIGHT - this.SYMBOL_SIZE * 3) / 2

    reelContainer.y = margin + (margin - 80)
    reelContainer.x = Math.round(this.WIDTH - this.REEL_WIDTH * 5.3)

    this.add.rectangle(0, this.SYMBOL_SIZE * 3.57 + margin, this.WIDTH * 2, margin, 0xccccc)

    this.add.rectangle(0, 0, this.WIDTH * 3, margin + this.REEL_WIDTH, 0xccccc)

    for (let i = 0; i < 5; i++) {
      const rc = new Phaser.GameObjects.Container(this)
      rc.x = i * this.REEL_WIDTH
      reelContainer.add(rc)

      const reel: Reel = {
        container: rc,
        symbols: [],
        position: 0,
        previousPosition: 0,
      }

      for (let j = 0; j < 4; j++) {
        const symbol = new Phaser.GameObjects.Sprite(
          this,
          0,
          0,
          this.keys[Math.floor(Math.random() * this.keys.length)],
        )

        symbol.x = Math.round((this.SYMBOL_SIZE - symbol.width) / 2)
        symbol.y = j * this.SYMBOL_SIZE

        symbol.scaleX = symbol.scaleY = Math.min(
          this.SYMBOL_SIZE / symbol.width,
          this.SYMBOL_SIZE / symbol.height,
        )

        reel.symbols.push(symbol)

        rc.add(symbol)
      }
      this.reels.push(reel)
    }
  }

  create(): void {
    this.buildReels()

    this.textPlayButton = this.add.text(this.WIDTH / 2.4, this.HEIGHT - 100, 'start', {
      fontStyle: 'bold',
      fontSize: '36px',
      color: '#000',
    })

    this.textPlayButton.setInteractive({
      cursor: 'pointer',
    })

    this.textPlayButton.on('pointerdown', () => {
      this.onStart()
    })
  }
  
  reelsComplete(): void | Function {
    this.isRunning = false  
  }

  onStart(): void | null {
    if (this.isRunning) return null
    this.isRunning = true

    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i]
      const extra = Math.floor(Math.random() * 3)
      const target = reel.position + 10 + i * 5 + extra
      const time = 2500 + i * 600 + extra * 600
      this.tweens.add({
        targets: reel,
        duration: time,
        position: target,
        ease: 'Back',
        onComplete: i === this.reels.length - 1 ? this.reelsComplete : null,
      })
    }
  }

  update(time: number, delta: number): void | null {
    if (!this.isRunning) return null

    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i]
      reel.previousPosition = reel.position

      for (let j = 0; j < reel.symbols.length; j++) {
        const symbol = reel.symbols[j]
        const previousY = symbol.y
        symbol.y =
          ((reel.position + j) % reel.symbols.length) * this.SYMBOL_SIZE -
          this.SYMBOL_SIZE
        if (symbol.y < 0 && previousY > this.SYMBOL_SIZE) {
          symbol.setTexture(this.keys[Math.floor(Math.random() * this.keys.length)])
          symbol.scaleX = symbol.scaleY = Math.min(
            this.SYMBOL_SIZE / symbol.width,
            this.SYMBOL_SIZE / symbol.height,
          )
          symbol.x = Math.round((this.SYMBOL_SIZE - symbol.width) / 2)
        }
      }
    }
  }
}
