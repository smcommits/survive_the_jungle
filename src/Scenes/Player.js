import Phaser from 'phaser';

/**
 * A class that wraps up our 2D platforming player logic. It creates, animates and moves a sprite in
 * response to WASD/arrow keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.score = 0;
    this.name = this.scene.game.globals.model.playerName;
    const { anims } = scene;
    anims.create({
      key: 'player-idle',
      frames: anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: 'player-run',
      frames: anims.generateFrameNumbers('player', { start: 8, end: 15 }),
      frameRate: 12,
      repeat: -1,
    });

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.physics.add
      .sprite(x, y, 'player', 0)
      .setBounce(0.2)
      .setDrag(1000, 0)
      .setMaxVelocity(300, 1000);

    // Track the arrow keys & WASD
    const {
      LEFT, RIGHT, UP, W, A, D, SPACE,
    } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      w: W,
      a: A,
      d: D,
      space: SPACE,
    });
  }

  freeze() {
    this.sprite.body.moves = false;
  }

  update() {
    const { keys, sprite } = this;
    const onGround = sprite.body.blocked.down;
    const acceleration = onGround ? 600 : 200;

    if (keys.left.isDown || keys.a.isDown) {
      sprite.setAccelerationX(-acceleration);
      sprite.setFlipX(true);
    } else if (keys.right.isDown || keys.d.isDown) {
      sprite.setAccelerationX(acceleration);
      sprite.setFlipX(false);
    } else {
      sprite.setAccelerationX(0);
    }

    if (onGround && (keys.up.isDown || keys.w.isDown)) {
      sprite.setVelocityY(-500);
    }

    if (onGround && keys.space.isDown) {
      sprite.setVelocityY(-1000);
    }

    if (onGround) {
      if (sprite.body.velocity.x !== 0) sprite.anims.play('player-run', true);
      else sprite.anims.play('player-idle', true);
    } else {
      sprite.anims.stop();
      sprite.setTexture('player', 10);
    }
  }

  destroy() {
    this.sprite.destroy();
  }

  jsonifyData() {
    return {
      user: this.name,
      score: this.score,
    };
  }
}
