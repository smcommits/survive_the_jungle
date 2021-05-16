import 'phaser';

import Player from './Player'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('spike', 'assets/tilemap/spike.png');
    this.load.image('backdropImage', './assets/tilemap/assets/backdrop.png');
    this.load.image('backdropOneImage', './assets/tilemap/assets/backdrop1.png');
    this.load.image('backdropTwoImage', './assets/tilemap/assets/backdrop2.png');
    this.load.image('platformImage', './assets/tilemap/assets/platform.png');

     this.load.tilemapTiledJSON("map", "assets/tilemap/tilemap.json"); 

    this.load.spritesheet(
      'player',
      'assets/sprites/player/player.png',
      {
        frameWidth: 32,
        frameHeight: 32,
        margin: 1,
        spacing: 2,
      },
    );
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });

    // tilset creation
    const backdropTileset = map.addTilesetImage('backdropTileset', 'backdropImage');
    const backdropOneTileset = map.addTilesetImage('backdropOneTileset', 'backdropOneImage');
    const backdropTwoTileset = map.addTilesetImage('backdropTwo', 'backdropTwoImage');
    const platformTileset = map.addTilesetImage('platformTileset', 'platformImage');

    // layer creation
    const backdropLayer = map.createLayer('backdropLayer', backdropTileset, 0, 0);
    const backdropOneLayer = map.createLayer('backdropOneLayer', backdropOneTileset, 0, 0);
    const backdropTwoLayer = map.createLayer('backdropTwoLayer', backdropTwoTileset);
    const platformLayer = map.createLayer('platformLayer', platformTileset, 0, 0);

    this.player = new Player(this, 0, 0);




    platformLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player.sprite, platformLayer);

   
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update(time, delta) {
    if(this.isPlayerDead) return;

    this.player.update();
  }

}


