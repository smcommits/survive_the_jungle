import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 1000,
  height: 640,
  parent: 'game-container',
  pixelArt: true,
  backgroundColor: '#1d212d',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
    },
  },
  dom: {
    createContainer: true
  },
};
