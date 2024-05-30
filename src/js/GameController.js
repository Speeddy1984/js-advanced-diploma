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
import cursors from './cursors';


export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.arrayOfPlayers = []; // сформированный массив игроков обеих команд
    this.humanTypes = [Bowman, Swordsman, Magician];
    this.computerTypes = [Daemon, Undead, Vampire];
    this.selectedCharacterOnCell = null;
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
  // Герой игрока? true/false
  isHumanCharacter(positionedCharacter) {
    return this.humanTypes.some(type => positionedCharacter.character instanceof type);
  }

  // Герой ПК? true/false
  isComputerCharacter(positionedCharacter) {
    return this.computerTypes.some(type => positionedCharacter.character instanceof type);
  }



  init() {

    // отрисовываем поле с темой
    this.gamePlay.drawUi(themes.prairie);
    
    // гененрируем 2 команды противников
    const humanTeam = generateTeam(this.humanTypes, 3, 2);
    const computerTeam = generateTeam(this.computerTypes, 3, 2);

    // генерируем позиции
    const usedPositions = new Set();

    const humanPositionedCharacter1 = new PositionedCharacter(humanTeam.characters[0], this.generateRandomPosition(this.gamePlay.boardSize, [0,1], usedPositions));
    const humanPositionedCharacter2 = new PositionedCharacter(humanTeam.characters[1], this.generateRandomPosition(this.gamePlay.boardSize, [0,1], usedPositions));
    const computerPositionedCharacter1 = new PositionedCharacter(computerTeam.characters[0], this.generateRandomPosition(this.gamePlay.boardSize, [this.gamePlay.boardSize - 2,this.gamePlay.boardSize - 1], usedPositions));
    const computerPositionedCharacter2 = new PositionedCharacter(computerTeam.characters[1], this.generateRandomPosition(this.gamePlay.boardSize, [this.gamePlay.boardSize - 2,this.gamePlay.boardSize - 1], usedPositions));

    this.arrayOfPlayers.push(humanPositionedCharacter1, humanPositionedCharacter2, computerPositionedCharacter1, computerPositionedCharacter2)
    
    // отрисовываем команды на поле
    this.gamePlay.redrawPositions(this.arrayOfPlayers);
    
    // TODO: add event listeners to gamePlay events
    // запускаем "слушателей"
    this.addEventListeners();

    // TODO: load saved stated from stateService
  }

  addEventListeners() {
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this)); // при клике
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)); // при наведении
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this)); // при покидании
  }
  onCellClick(index) {
    // TODO: react to click
    // clickedCharacterElement - элемент разметки с персонажем (div с классом character)
    // clickedCharacter - объект персонажа (класса PositionedCharacter), есть свойства 
    // character(объект дочернего класса Character), position
    // selectedCharacterOnCell - хранит активного в данный момент персонажа в определенной ячейке

    const clickedCharacterElement = this.gamePlay.cells[index].querySelector('.character');
    const clickedCharacter = this.arrayOfPlayers.find(
      (element) => element.position === index
    );

    if (clickedCharacterElement && this.isHumanCharacter(clickedCharacter)) {
           
      if (this.selectedCharacterOnCell) {
        this.gamePlay.deselectCell(this.selectedCharacterOnCell.position);
      }
      
      this.gamePlay.selectCell(index);
      this.selectedCharacterOnCell = clickedCharacter;

      return
    }

    if (!clickedCharacterElement && this.selectedCharacterOnCell) {
      if (this.selectedCharacterOnCell.characterCanMove(this.selectedCharacterOnCell.character, this.selectedCharacterOnCell.position, index, this.gamePlay.boardSize)) {
        this.moveCharacter(index);
      } else {
        GamePlay.showError('Недопустимое перемещение!');
      }
      return;
    }

    GamePlay.showError('Это не персонаж игрока!');
  }

  moveCharacter(targetPosition) {
    const characterIndex = this.arrayOfPlayers.findIndex(el => el.position === this.selectedCharacterOnCell.position);
    this.gamePlay.deselectCell(this.selectedCharacterOnCell.position);
    this.arrayOfPlayers[characterIndex].position = targetPosition;
    this.gamePlay.redrawPositions(this.arrayOfPlayers);
    this.selectedCharacterOnCell = null;
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    // enteredCharacterElement - элемент разметки с персонажем (div с классом character)
    // enteredCharacter - объект персонажа (класса PositionedCharacter), есть свойства 
    // character(объект дочернего класса Character), position
    // selectedCharacterOnCell - хранит активного в данный момент персонажа в определенной ячейке
    const enteredCharacterElement = this.gamePlay.cells[index].querySelector('.character');
    const enteredCharacter = this.arrayOfPlayers.find(
      (element) => element.position === index
    );
    if (enteredCharacterElement) {
      this.gamePlay.showCellTooltip(enteredCharacter.character.characterInfo, index);
    }
    
      switch (true) {
        case (
          enteredCharacterElement
          && this.isHumanCharacter(enteredCharacter)
        ): {
          this.gamePlay.setCursor(cursors.pointer);
          break;
        }
        case (
          enteredCharacterElement
          && this.isComputerCharacter(enteredCharacter)
          && Boolean(this.selectedCharacterOnCell)
          && this.selectedCharacterOnCell.characterCanAttack(this.selectedCharacterOnCell.character, this.selectedCharacterOnCell.position, index, this.gamePlay.boardSize)
        ): {
          this.gamePlay.selectCell(index, 'red');
          this.gamePlay.setCursor(cursors.crosshair);
          break;
        }
        case (
          !enteredCharacterElement
          && Boolean(this.selectedCharacterOnCell)
          && this.selectedCharacterOnCell.characterCanMove(this.selectedCharacterOnCell.character, this.selectedCharacterOnCell.position, index, this.gamePlay.boardSize)
        ): {
          this.gamePlay.selectCell(index, 'green');
          this.gamePlay.setCursor(cursors.pointer);
          break;
        }
        case Boolean(this.selectedCharacterOnCell): {
          this.gamePlay.setCursor(cursors.notallowed);
          break;
        }
        default: {
          this.gamePlay.setCursor(cursors.auto);
        }
      }
    
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);

    if (!this.gamePlay.cells[index].classList.contains('selected-yellow')) {
      this.gamePlay.deselectCell(index);
    }
  }
}