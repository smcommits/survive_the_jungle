import 'phaser'
import config from './config/config'
import GameScene from './scenes/game-scene'
import BootScene from './scenes/boot-scene'
import PreloaderScene from './scenes/preloader-scene'
import TitleScene from './scenes/title-scene'
import OptionsScene from './scenes/option-scene'
import CreditsScene from './scenes/credits-scene'

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', TitleScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Game');
  }
}

window.game = new Game();
