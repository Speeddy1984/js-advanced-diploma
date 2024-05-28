import themes from './themes';
import PositionedCharacter from './PositionedCharacter';
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire'
import { generateTeam } from './generators';
import GamePlay from './GamePlay';



export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.arrayOfPlayers = [];
    this.humanTypes = [Bowman, Swordsman, Magician];
    this.computerTypes = [Daemon, Undead, Vampire];
  }

  generateRandomPosition(boardSize, allowedColumns, usedPositions) {
    let position;
    do {
      const row = Math.floor(Math.random() * boardSize);
      const col = allowedColumns[Math.floor(Math.random() * allowedColumns.length)];
      position = row * boardSize + col;
    } while (usedPositions.has(position));
    usedPositions.add(position);
    return position;
  }

  isHumanCharacter(positionedCharacter) {
    return this.humanTypes.some(type => positionedCharacter.character instanceof type);
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);
    
    // гененрируем 2 команды противников
    const humanTeam = generateTeam(this.humanTypes, 3, 2);
    const computerTeam = generateTeam(this.computerTypes, 3, 2);

    // генерируем позиции
    const usedPositions = new Set();

    const humanPositionedCharacter1 = new PositionedCharacter(humanTeam.characters[0], this.generateRandomPosition(8, [0,1], usedPositions));
    const humanPositionedCharacter2 = new PositionedCharacter(humanTeam.characters[1], this.generateRandomPosition(8, [0,1], usedPositions));
    const computerPositionedCharacter1 = new PositionedCharacter(computerTeam.characters[0], this.generateRandomPosition(8, [6,7], usedPositions));
    const computerPositionedCharacter2 = new PositionedCharacter(computerTeam.characters[1], this.generateRandomPosition(8, [6,7], usedPositions));

    this.arrayOfPlayers.push(humanPositionedCharacter1, humanPositionedCharacter2, computerPositionedCharacter1, computerPositionedCharacter2)
    
    // отрисовываем команды на поле
    this.gamePlay.redrawPositions(this.arrayOfPlayers);
    
    // TODO: add event listeners to gamePlay events
    // запускаем "слушателей"
    this.addEventListeners();

    // TODO: load saved stated from stateService
  }

  addEventListeners() {
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
  }
  onCellClick(index) {
    // TODO: react to click
    const clickedCharacterElement = this.gamePlay.cells[index].querySelector('.character');
    const clickedCharacter = this.arrayOfPlayers.find(
      (element) => element.position === index
    );

    if (clickedCharacterElement && this.isHumanCharacter(clickedCharacter)) {
      const selectedCell = undefined;
           
      if (this.selectedCell) {
        this.gamePlay.deselectCell(this.selectedCell.position);
      }
      
      this.gamePlay.selectCell(index);
      this.selectedCell = clickedCharacter;
      
      return
    }

    GamePlay.showError('Это не персонаж игрока!');
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    const enteredCharacterElement = this.gamePlay.cells[index].querySelector('.character');
    const enteredCharacter = this.arrayOfPlayers.find(
      (element) => element.position === index
    );
    if (enteredCharacterElement) {
      this.gamePlay.showCellTooltip(enteredCharacter.character.characterInfo, index);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }
}