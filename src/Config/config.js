import 'phaser';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 1280,
  parent: 'game-container',
  pixelArt: true,
  backgroundColor: '#1d212d',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
    },
  },
};
