import Model from '../Model';

jest.mock('./__mocks__/Model');

const model = new Model();

describe('model', () => {
  // handles intializes and handles state of global data

  describe('constructor', () => {
    it('it initializes the soundOn global variable and sets the value to true', () => {
      expect(model.soundOn).toBe(true);
    });

    it('it initializes the musicOn global variable and sets the value to true', () => {
      expect(model.musicOn).toBe(true);
    });

    it('it initializes the bgMusicPlaying global variable and sets the value to false', () => {
      expect(model.bgMusicPlaying).toBe(false);
    });

    it('it initializes the playerName global variable and sets the value to null', () => {
      expect(model.playerName).toBe(null);
    });
  });

  describe('Setter Methods', () => {
    it('sets handles the value of musicOn', () => {
      model.musicOn = false;
      expect(model.musicOn).toBe(false);
    });

    it('sets handles the value of soundOn', () => {
      model.soundOn = false;
      expect(model.soundOn).toBe(false);
    });

    it('sets handles the value of playerName', () => {
      model.playerName = 'TestName';
      expect(model.playerName).toBe('TestName');
    });

    it('sets handles the value of bgMusicPlaying', () => {
      model.bgMusicPlaying = true;
      expect(model.bgMusicPlaying).toBe(true);
    });
  });
});
