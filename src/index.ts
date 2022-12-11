import { Types, Game, AUTO } from 'phaser'

import { GameScene } from './scenes/GameScene'

const WIDTH = 1024
const HEIGHT = 768

export const gameConfig: Types.Core.GameConfig = {
  type: AUTO,
  title: 'Phaser-slot',
  parent: 'app',
  backgroundColor: '#000',
  width: WIDTH,
  height: HEIGHT,
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
  },
  antialias: true,
  physics: {
    default: 'arcade',
  },
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [GameScene],
}

export default new Game(gameConfig)
