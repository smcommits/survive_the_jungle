import Phaser from 'phaser';

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
    this.map = this.make.tilemap({ key: 'map' });
    this.createTileset();
    this.createLayer();
    this.player = new Player(this, 20, 0);
    this.createPhysicsGroups();
    this.createCollectibles();
    this.createSpikes();
    this.createCollisions();
    this.createCameraConfig();
  }

  update() {
    if (this.isPlayerDead) return;
    this.player.update();
    this.checkForDeath();
  }

  createTileset() {
    this.backdropTileset = this.map.addTilesetImage('backdropTileset', 'backdropImage');
    this.backdropOneTileset = this.map.addTilesetImage('backdropOneTileset', 'backdropOneImage');
    this.backdropTwoTileset = this.map.addTilesetImage('backdropTwoTileset', 'backdropTwoImage');
    this.platformTileset = this.map.addTilesetImage('platformTileset', 'platformImage');
  }

  createLayer() {
    this.backdropLayer = this.map.createLayer('backdropLayer', this.backdropTileset, 0, 0);
    this.backdropOneLayer = this.map.createLayer('backdropOneLayer', this.backdropOneTileset, 0, 0);
    this.backdropTwoLayer = this.map.createLayer('backdropTwoLayer', this.backdropTwoTileset);
    this.platformLayer = this.map.createLayer('platformLayer', this.platformTileset, 0, 0);
    this.collectibleLayer = this.map.getObjectLayer('collectibles').objects;
    this.spikeObjects = this.map.getObjectLayer('spikes').objects;
  }

  createPhysicsGroups() {
    this.oranges = this.physics.add.staticGroup();
    this.spikes = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
  }

  createCollectibles() {
    this.collectibleLayer.forEach((object) => {
      const obj = this.oranges.create(object.x, object.y, 'collectible');
      obj.setScale(object.width / 32, object.height / 32);
      obj.setOrigin(-0.2, 1);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });
  }

  createSpikes() {
    this.spikeObjects.forEach((spikeObject) => {
      this.spikes.create(spikeObject.x, spikeObject.y - 10, 'spike').setOrigin(0, 0);
    });
  }

  createCollisions() {
    this.platformLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player.sprite, this.platformLayer);
    this.physics.add.overlap(this.player.sprite, this.oranges, collectCoin, null, this);
  }

  createCameraConfig() {
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  }

  checkForDeath() {
    if (
      this.player.sprite.y > this.platformLayer.height
      || this.physics.world.overlap(this.player.sprite, this.spikes)
    ) {
      this.isPlayerDead = true;

      const cam = this.cameras.main;
      cam.shake(100, 0.05);
      cam.fade(250, 0, 0, 0);

      this.player.freeze();

      cam.once('camerafadeoutcomplete', () => {
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
