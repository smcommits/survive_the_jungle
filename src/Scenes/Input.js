import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class Input extends Phaser.Scene {
  constructor() {
    super('Input');
  }

  create() {
    this.createForm();
  }

  createForm() {
    this.model = this.sys.game.globals.model;
    this.text = this.add.text(config.width * .50, config.height * .20, "Please Enter Your Name")

    this.playerInput = this.add.dom(config.width * .50, config.height * .30, 'input',
    `background-color: #fff; 
    width: 50%; height: 50px; 
    font: 24px Arial; 
    border: none;
    padding: 10px;`);

    this.submitButton = this.add.dom(config.width * .50, config.height * .50, 'button', 
      `background-color: #fff;
      width: 220px;
      font: 20xp;
      padding: 10px;
    border: none;
    border-radius: 20px`,
    'Submit')

    this.submitButton.addListener('click');
    this.submitButton.on('click', this.validateInput );
  }


  validateInput() {
    let input = document.querySelector('input');
    if(input.value.length >= 3) {
      this.scene.game.globals.model.playerName = input.value;
      this.scene.scene.start("Game");
    } else {
      this.scene.displayError()
    }
  }

    displayError() {
      this.text = this.add.text(config.width * .50, config.height * .40, "Please Enter a Valid Name")
    }
  }


