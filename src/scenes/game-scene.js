import 'phaser';
 
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  preload () {
    this.load.image('logo', 'assets/tilemap/assets/platform.png');
  }
 
  create () {
    this.add.image(400, 300, 'logo');
  }
};
