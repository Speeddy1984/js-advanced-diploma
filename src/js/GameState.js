export default class GameState {
  constructor() {
    this.maxScore = 0;
    this.currentLevel = 0;
    this.isPlayerTurn = true;
    this.arrayOfPlayers = [];
}

  

  static from(object) {
    // TODO: create object
    // const gameState = new GameState();
    Object.assign(object);
    return object;
  }
}

