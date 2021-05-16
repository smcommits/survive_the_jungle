import 'phaser';

import Player from './Player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('spike', 'assets/tilemap/assets/spike.png');
    this.load.image('backdropImage', './assets/tilemap/assets/backdrop.png');
    this.load.image('backdropOneImage', './assets/tilemap/assets/backdrop1.png');
    this.load.image('backdropTwoImage', './assets/tilemap/assets/backdrop2.png');
    this.load.image('platformImage', './assets/tilemap/assets/platform.png');
    this.load.image('collectible', './assets/tilemap/assets/orange.png');

    this.load.tilemapTiledJSON('map', 'assets/tilemap/tilemap.json');

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
    this.isPlayerDead = false;
    const map = this.make.tilemap({ key: 'map' });

    // tilset creation
    const backdropTileset = map.addTilesetImage('backdropTileset', 'backdropImage');
    const backdropOneTileset = map.addTilesetImage('backdropOneTileset', 'backdropOneImage');
    const backdropTwoTileset = map.addTilesetImage('backdropTwo', 'backdropTwoImage');
    const platformTileset = map.addTilesetImage('platformTileset', 'platformImage');

    // layer creation
    this.backdropLayer = map.createLayer('backdropLayer', backdropTileset, 0, 0);
    this.backdropOneLayer = map.createLayer('backdropOneLayer', backdropOneTileset, 0, 0);
    this.backdropTwoLayer = map.createLayer('backdropTwoLayer', backdropTwoTileset);
    this.platformLayer = map.createLayer('platformLayer', platformTileset, 0, 0);
    const collectibleLayer = map.getObjectLayer('collectibles').objects;

    const oranges = this.physics.add.staticGroup();

    collectibleLayer.forEach((object) => {
      const obj = oranges.create(object.x, object.y, 'collectible');
      obj.setScale(object.width/32, object.height/32);
      obj.setOrigin(-.2, 1);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });

    this.player = new Player(this, 20, 0);

    this.platformLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player.sprite, this.platformLayer);

    this.spikes = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    const spikeObjects = map.getObjectLayer('spikes')['objects'];
    
    spikeObjects.forEach(spikeObject => {
      // Add new spikes to our sprite group, change the start y position to meet the platform
      const spike = this.spikes.create(spikeObject.x, spikeObject.y - 10, 'spike').setOrigin(0, 0);
    });
    




   

    this.physics.add.overlap(this.player.sprite, oranges, collectCoin, null, this);

    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }
 
  update(time, delta) {
    if (this.isPlayerDead) return;

    this.player.update();

     if (
      this.player.sprite.y > this.platformLayer.height ||
      this.physics.world.overlap(this.player.sprite, this.spikes)
    ) {
      // Flag that the player is dead so that we can stop update from running in the future
      this.isPlayerDead = true;

      const cam = this.cameras.main;
      cam.shake(100, 0.05);
      cam.fade(250, 0, 0, 0);

      // Freeze the player to leave them on screen while fading but remove the marker immediately
      this.player.freeze();

      cam.once("camerafadeoutcomplete", () => {
        this.player.destroy();
        this.scene.restart();
      });
    }
  }
  
}

function collectCoin(player, oranges) {
    oranges.destroy(oranges.x, oranges.y); // remove the tile/coin
    return false;
}




