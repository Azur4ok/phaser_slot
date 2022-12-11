import { Scene } from 'phaser'

interface Reel {
  container: Phaser.GameObjects.Container
  symbols: Phaser.GameObjects.Sprite[]
  position: number
  previousPosition: number
}

export class GameScene extends Scene {
  private static REEL_WIDTH: number = 180
  private static SYMBOL_SIZE: number = 170
  private static WIDTH: number = 1024
  private static HEIGHT: number = 768
  private isRunning: boolean = false
  private reels: Reel[] = []
  keys!: string[]

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

    const margin = (GameScene.HEIGHT - GameScene.SYMBOL_SIZE * 3) / 2

    reelContainer.y = margin + margin - 30
    reelContainer.x = Math.round(GameScene.WIDTH - GameScene.REEL_WIDTH * 5)

    const bottom = this.add.rectangle(
      0,
      GameScene.SYMBOL_SIZE * 3.5 + margin,
      GameScene.WIDTH * 2,
      margin + 10,
      0xccccc,
    )

    const top = this.add.rectangle(0, 0, GameScene.WIDTH * 2, margin + 155, 0xccccc)

    for (let i = 0; i < 5; i++) {
      const rc = new Phaser.GameObjects.Container(this)
      rc.x = i * GameScene.REEL_WIDTH
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

        symbol.x = Math.round((GameScene.SYMBOL_SIZE - symbol.width) / 2)
        symbol.y = j * GameScene.SYMBOL_SIZE

        symbol.scaleX = symbol.scaleY = Math.min(
          GameScene.SYMBOL_SIZE / symbol.width,
          GameScene.SYMBOL_SIZE / symbol.height,
        )

        reel.symbols.push(symbol)

        rc.add(symbol)
      }
      this.reels.push(reel)
    }
  }

  backout(amount: number): (t: number) => number {
    return (t: number) => --t * t * ((amount + 1) * t + amount) + 1
  }

  reelsComplete(): void {
    this.isRunning = false
  }

  create(): void {
    this.buildReels()
    for (let i = 0; i < this.reels.length; i++) {
      this.tweens.add({
        targets: this.reels[i].symbols,
        duration: 3000,
        y: 800,
        ease: 'Sine',
        onComplete: i === this.reels.length - 1 ? this.reelsComplete : null,
      })
    }

    const startPlayHandler = () => {
      if (this.isRunning) return
      this.isRunning = true

      // // for (let i = 0; i < this.reels.length; i++) {
      // //   const reel = this.reels[i]
      // //   const extra = Math.floor(Math.random() * 3)
      // //   const target = reel.position + 10 + i * 5 + extra
      // //   const time = 2500 + i * 600 + extra * 600
      // //   this.tweens.add({
      // //     targets: reel.symbols[i],
      // //     duration: time,
      // //     y: target,
      // //     ease: 'Power3',
      // //     onComplete: i === this.reels.length - 1 ? this.reelsComplete : null,
      // //   })
      // // }
    }

    const textButton = this.add.text(GameScene.WIDTH / 2.4, GameScene.HEIGHT - 70, 'start', {
      fontStyle: 'bold',
      fontSize: '36px',
      color: '#000',
    })

    textButton.setInteractive({
      cursor: 'pointer',
    })

    textButton.on('pointerdown', () => {
      startPlayHandler()
    })
  }

  // update(time: number, delta: number): void {
  //   if (!this.isRunning) return

  //   for (let i = 0; i < this.reels.length; i++) {
  //     const reel = this.reels[i]
  //     reel.previousPosition = reel.position

  //     for (let j = 0; j < reel.symbols.length; j++) {
  //       const symbol = reel.symbols[j]
  //       const previousY = symbol.y
  //       symbol.y =
  //         ((reel.position + j) % reel.symbols.length) * GameScene.SYMBOL_SIZE -
  //         GameScene.SYMBOL_SIZE
  //       if (symbol.y < 0 && previousY > GameScene.SYMBOL_SIZE) {
  //         symbol.setTexture(this.keys[Math.floor(Math.random() * this.keys.length)])
  //         symbol.scaleX = symbol.scaleY = Math.min(
  //           GameScene.SYMBOL_SIZE / symbol.width,
  //           GameScene.SYMBOL_SIZE / symbol.height,
  //         )
  //         symbol.x = Math.round((GameScene.SYMBOL_SIZE - symbol.width) / 2)
  //       }
  //     }
  //   }
  // }
}
