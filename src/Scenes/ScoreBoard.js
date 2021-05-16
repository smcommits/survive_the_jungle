import Phaser from 'phaser';
import { getLeaderboardData, parseData } from '../API/Leaderboard';
import config from '../Config/config';
import Button from '../Objects/Button'

export default class ScoreBoard extends Phaser.Scene {
  constructor() {
    super('ScoreBoard');
  }

  create() {
    this.header = this.add.text(config.width * 0.45, config.height * 0.20, 'ScoreBoard');
    this.showData();
    this.createMainButton();

  }

  async showData() {
    let offsetY = config.height * 0.30;
    const data = await parseData();
    data.forEach((player) => {
      this.add.text(config.width * 0.45, offsetY, `${player.user} : ${player.score}`);
      offsetY += 50;
    });
  }

  createMainButton() {
    this.gameButton = new Button(this, config.width / 2, config.height * .70, 'blueButton1', 'blueButton2', 'Main Menu', 'Boot');
  }
}
