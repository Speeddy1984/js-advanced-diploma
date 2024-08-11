import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import Bowman from "./characters/Bowman";
import Daemon from "./characters/Daemon";
import Magician from "./characters/Magician";
import Swordsman from "./characters/Swordsman";
import Undead from "./characters/Undead";
import Vampire from "./characters/Vampire";
import { generateTeam } from "./generators";
import GamePlay from "./GamePlay";
import cursors from "./cursors";
import GameState from "./GameState";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.arrayOfPlayers = []; // сформированный массив игроков обеих команд
    this.humanTypes = [Bowman, Swordsman, Magician];
    this.computerTypes = [Daemon, Undead, Vampire];
    this.selectedCharacterOnCell = null;
    this.gameState = new GameState();
    this.isPlayerTurn = true; // Отслеживает чей ход
    this.currentLevel = 0; // Инициализация текущего уровня
    this.isGameOver = false; // Флаг завершения игры
    this.addEventListeners();
  }

  generateRandomPosition(boardSize, allowedColumns, usedPositions) {
    let position;
    do {
      const row = Math.floor(Math.random() * boardSize);
      const col =
        allowedColumns[Math.floor(Math.random() * allowedColumns.length)];
      position = row * boardSize + col;
    } while (usedPositions.has(position));
    usedPositions.add(position);
    return position;
  }
  // Герой игрока? true/false
  isHumanCharacter(positionedCharacter) {
    return this.humanTypes.some(
      (type) => positionedCharacter.character instanceof type
    );
  }

  // Герой ПК? true/false
  isComputerCharacter(positionedCharacter) {
    return this.computerTypes.some(
      (type) => positionedCharacter.character instanceof type
    );
  }

  //Ход (движение) игрока
  moveCharacter(currentPosition, targetPosition) {
    const characterIndex = this.arrayOfPlayers.findIndex(
      (el) => el.position === currentPosition
    );
    if (characterIndex !== -1 && !this.isCellOccupied(targetPosition)) {
      this.gamePlay.deselectCell(currentPosition);
      this.arrayOfPlayers[characterIndex].position = targetPosition;
      this.gamePlay.redrawPositions(this.arrayOfPlayers);
    }
    this.selectedCharacterOnCell = null;
  }

  // Метод для обработки атаки
  async handleAttack(attacker, target) {
    // Вычисляем урон
    const damage = Math.max(
      attacker.character.attack - target.character.defence,
      attacker.character.attack * 0.1
    );

    // Уменьшаем здоровье цели на размер урона. Если становится отрицательным, равняем к нулю
    target.character.health -= damage;
    if (target.character.health < 0) target.character.health = 0;

    // Проверяем корректность позиции и существование ячейки
    if (target.position < 0 || target.position >= this.gamePlay.cells.length) {
      console.error("Invalid target position:", target.position);
      return;
    }

    // Отображаем урон
    await this.gamePlay.showDamage(target.position, damage);

    // Удаляем цель, если здоровье достигло нуля
    if (target.character.health === 0) {
      this.arrayOfPlayers = this.arrayOfPlayers.filter(
        (player) => player !== target
      );
      this.gamePlay.redrawPositions(this.arrayOfPlayers);
      console.log("The target is deliting");
      console.log("Checking end game if health = 0");
      this.checkEndGame();

      return; // Завершаем выполнение метода, если цель была удалена
    }

    // Перерисовываем позиции персонажей
    this.gamePlay.redrawPositions(this.arrayOfPlayers);
    console.log("Checking end game if health not equal 0");
    this.checkEndGame();
  }

  // Проверка на конец игры
  checkEndGame() {
    console.log("Checking end game function...");
    // Массив команды игрока
    const humanTeam = this.arrayOfPlayers.filter((player) =>
      this.isHumanCharacter(player)
    );
    // Массив команды компьютера
    const computerTeam = this.arrayOfPlayers.filter((player) =>
      this.isComputerCharacter(player)
    );

    // Если не поражение одной из команд, передаем ход
    if (humanTeam.length === 0) {
      if (!this.isGameOver) {
        GamePlay.showMessage("Вы проиграли!");
        this.blockGameField();
        const score = this.calculateScore();
        if (score > this.gameState.maxScore) {
          this.gameState.maxScore = score;
          console.log("MaxSxore:" + this.gameState.maxScore);
        }
        this.isGameOver = true; // Устанавливаем флаг завершения игры
      }
    } else if (computerTeam.length === 0) {
      const score = this.calculateScore();
      if (score > this.gameState.maxScore) {
        this.gameState.maxScore = score;
        console.log(this.gameState.maxScore);
      }

      if (this.currentLevel === 3) {
        if (!this.isGameOver) {
          GamePlay.showMessage("Вы прошли все уровни!");
          this.blockGameField();
          this.isGameOver = true; // Устанавливаем флаг завершения игры
        }
      } else {
        GamePlay.showMessage("Вы выиграли!");
        this.levelUpCharacters(humanTeam);
        this.nextLevel();
      }
    } else if (!this.isPlayerTurn) {
      this.computerMove();
    }
  }

  levelUpCharacters(humanTeam) {
    humanTeam.forEach((player) => player.character.levelUp());
  }

  nextLevel() {
    const themesArray = [
      themes.prairie,
      themes.desert,
      themes.arctic,
      themes.mountain,
    ];
    this.currentLevel = (this.currentLevel + 1) % themesArray.length;
    this.gamePlay.drawUi(themesArray[this.currentLevel]);

    const humanTeam = this.arrayOfPlayers.filter((player) =>
      this.isHumanCharacter(player)
    );
    const computerTeam = generateTeam(
      this.computerTypes,
      this.currentLevel + 1,
      humanTeam.length
    );

    const usedPositions = new Set();

    humanTeam.forEach((player) => {
      player.position = this.generateRandomPosition(
        this.gamePlay.boardSize,
        [0, 1],
        usedPositions
      );
    });

    computerTeam.characters.forEach((character) => {
      const positionedCharacter = new PositionedCharacter(
        character,
        this.generateRandomPosition(
          this.gamePlay.boardSize,
          [this.gamePlay.boardSize - 2, this.gamePlay.boardSize - 1],
          usedPositions
        )
      );
      this.arrayOfPlayers.push(positionedCharacter);
    });

    this.gamePlay.redrawPositions(this.arrayOfPlayers);
  }

  // Ход компьютера
  computerMove() {
    console.log("Computer move started...");
    this.isPlayerTurn = true; // Сразу переключаем на ход игрока, чтобы не допустить повторных вызовов

    const humanCharacters = this.arrayOfPlayers.filter((character) =>
      this.isHumanCharacter(character)
    );
    const computerCharacters = this.arrayOfPlayers.filter((character) =>
      this.isComputerCharacter(character)
    );

    let target = null;
    let attacker = null;

    // Ищем всех доступных для атаки персонажей игрока
    for (const computerCharacter of computerCharacters) {
      for (const humanCharacter of humanCharacters) {
        if (
          computerCharacter.characterCanAttack(
            computerCharacter.character,
            computerCharacter.position,
            humanCharacter.position,
            this.gamePlay.boardSize
          )
        ) {
          if (
            !target ||
            humanCharacter.character.health < target.character.health
          ) {
            target = humanCharacter;
            attacker = computerCharacter;
          }
        }
      }
    }

    // если нашли цель, атакуем, передаем ход игроку, проверяем конец игры, иначе ищем ход
    if (target && attacker) {
      this.handleAttack(attacker, target).then(() => {
        if (target.character.health === 0) {
          this.gamePlay.deselectCell(target.position); // снимаем выделение ячейки персонажа игрока
          this.isPlayerTurn = true; // Переключаем на ход игрока, если цель была убита
        }
        console.log("The turn is passing to human");
        console.log("Checking end game after human`s move");
        this.checkEndGame();
      });
    } else {
      let bestMove = null;
      let movingComputerCharacter = null;

      // ищем ход с условием, что в ячейке нет другого персонажа
      for (const computerCharacter of computerCharacters) {
        const possibleMoves = this.getPossibleMoves(
          computerCharacter,
          this.gamePlay.boardSize
        );

        // проверяем, что в ячейке нет другого персонажа
        for (const move of possibleMoves) {
          if (!this.isCellOccupied(move)) {
            bestMove = move;
            movingComputerCharacter = computerCharacter;
            break;
          }
        }
        if (bestMove) break;
      }

      if (bestMove && movingComputerCharacter) {
        this.moveCharacter(movingComputerCharacter.position, bestMove);
      }
    }
  }

  generateInitialPositions() {
    const humanTeam = generateTeam(this.humanTypes, 3, 2);
    const computerTeam = generateTeam(this.computerTypes, 3, 2);

    const usedPositions = new Set();

    const humanPositionedCharacter1 = new PositionedCharacter(
      humanTeam.characters[0],
      this.generateRandomPosition(
        this.gamePlay.boardSize,
        [0, 1],
        usedPositions
      )
    );
    const humanPositionedCharacter2 = new PositionedCharacter(
      humanTeam.characters[1],
      this.generateRandomPosition(
        this.gamePlay.boardSize,
        [0, 1],
        usedPositions
      )
    );
    const computerPositionedCharacter1 = new PositionedCharacter(
      computerTeam.characters[0],
      this.generateRandomPosition(
        this.gamePlay.boardSize,
        [this.gamePlay.boardSize - 2, this.gamePlay.boardSize - 1],
        usedPositions
      )
    );
    const computerPositionedCharacter2 = new PositionedCharacter(
      computerTeam.characters[1],
      this.generateRandomPosition(
        this.gamePlay.boardSize,
        [this.gamePlay.boardSize - 2, this.gamePlay.boardSize - 1],
        usedPositions
      )
    );

    this.arrayOfPlayers.push(
      humanPositionedCharacter1,
      humanPositionedCharacter2,
      computerPositionedCharacter1,
      computerPositionedCharacter2
    );

    return this.arrayOfPlayers;
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);
    this.isPlayerTurn = true;
    this.arrayOfPlayers = [];
    this.generateInitialPositions();
    this.gamePlay.redrawPositions(this.arrayOfPlayers);
  }

  addEventListeners() {
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addNewGameListener(() => this.init());
    this.gamePlay.addSaveGameListener(() => this.savingGame());
    this.gamePlay.addLoadGameListener(() => this.loadingGame());
  }

  // проверка на занятую ячейку
  isCellOccupied(position) {
    return this.arrayOfPlayers.some(
      (character) => character.position === position
    );
  }

  // возможные ходы кеомпьютера
  getPossibleMoves(character, boardSize) {
    const moves = [];
    const row = Math.floor(character.position / boardSize);
    const col = character.position % boardSize;

    for (let i = 1; i <= character.character.moveDistance; i++) {
      if (row + i < boardSize) moves.push((row + i) * boardSize + col);
      if (row - i >= 0) moves.push((row - i) * boardSize + col);
      if (col + i < boardSize) moves.push(row * boardSize + (col + i));
      if (col - i >= 0) moves.push(row * boardSize + (col - i));
    }

    return moves;
  }

  blockGameField() {
    this.gamePlay.cells.forEach((cell) => {
      cell.style.pointerEvents = "none";
    });
  }

  calculateScore() {
    return this.arrayOfPlayers.reduce((acc, player) => {
      if (this.isHumanCharacter(player)) {
        return acc + player.character.health;
      }
      return acc;
    }, 0);
  }

  onCellClick(index) {
    console.log(`${Date.now()} click!`);

    if (!this.isPlayerTurn) return;

    const clickedCharacterElement =
      this.gamePlay.cells[index].querySelector(".character");
    const clickedCharacter = this.arrayOfPlayers.find(
      (element) => element.position === index
    );

    if (clickedCharacterElement && this.isHumanCharacter(clickedCharacter)) {
      if (this.selectedCharacterOnCell) {
        this.gamePlay.deselectCell(this.selectedCharacterOnCell.position);
      }
      this.gamePlay.selectCell(index);
      this.selectedCharacterOnCell = clickedCharacter;
      return;
    }

    if (!clickedCharacterElement && this.selectedCharacterOnCell) {
      if (
        this.selectedCharacterOnCell.playerCanMove(
          this.selectedCharacterOnCell.character,
          this.selectedCharacterOnCell.position,
          index,
          this.gamePlay.boardSize
        )
      ) {
        this.moveCharacter(this.selectedCharacterOnCell.position, index);
        this.isPlayerTurn = false;
        console.log("Checking end game after human`s move");
        console.log("The turn is passing to PC");
        this.checkEndGame();
      } else {
        GamePlay.showError("Недопустимое перемещение!");
      }
      return;
    }

    if (
      clickedCharacterElement &&
      this.selectedCharacterOnCell &&
      this.isComputerCharacter(clickedCharacter)
    ) {
      if (
        this.selectedCharacterOnCell.characterCanAttack(
          this.selectedCharacterOnCell.character,
          this.selectedCharacterOnCell.position,
          index,
          this.gamePlay.boardSize
        )
      ) {
        this.handleAttack(this.selectedCharacterOnCell, clickedCharacter).then(
          () => {
            this.isPlayerTurn = false;
            console.log("Checking end game after human`s attack");
            this.checkEndGame();
          }
        );
      } else {
        GamePlay.showError("Недопустимая атака!");
      }
      return;
    }

    GamePlay.showError("Это не персонаж игрока!");
  }

  onCellEnter(index) {
    const enteredCharacterElement =
      this.gamePlay.cells[index].querySelector(".character");
    const enteredCharacter = this.arrayOfPlayers.find(
      (element) => element.position === index
    );

    if (enteredCharacterElement) {
      this.gamePlay.showCellTooltip(
        enteredCharacter.character.characterInfo,
        index
      );
    }

    switch (true) {
      case enteredCharacterElement && this.isHumanCharacter(enteredCharacter):
        this.gamePlay.setCursor(cursors.pointer);
        break;
      case enteredCharacterElement &&
        this.isComputerCharacter(enteredCharacter) &&
        Boolean(this.selectedCharacterOnCell) &&
        this.selectedCharacterOnCell.characterCanAttack(
          this.selectedCharacterOnCell.character,
          this.selectedCharacterOnCell.position,
          index,
          this.gamePlay.boardSize
        ):
        this.gamePlay.selectCell(index, "red");
        this.gamePlay.setCursor(cursors.crosshair);
        break;
      case !enteredCharacterElement &&
        Boolean(this.selectedCharacterOnCell) &&
        this.selectedCharacterOnCell.playerCanMove(
          this.selectedCharacterOnCell.character,
          this.selectedCharacterOnCell.position,
          index,
          this.gamePlay.boardSize
        ):
        this.gamePlay.selectCell(index, "green");
        this.gamePlay.setCursor(cursors.pointer);
        break;
      case Boolean(this.selectedCharacterOnCell):
        this.gamePlay.setCursor(cursors.notallowed);
        break;
      default:
        this.gamePlay.setCursor(cursors.auto);
    }
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);

    if (!this.gamePlay.cells[index].classList.contains("selected-yellow")) {
      this.gamePlay.deselectCell(index);
    }
  }

  savingGame() {
    console.log("Trying to save game");
    this.gameState = {
      currentLevel: this.currentLevel,
      arrayOfPlayers: this.arrayOfPlayers,
    };
    this.stateService.save(this.gameState);
    GamePlay.showMessage("Игра сохранена");
  }

  // Реконструируем объекты классов персонажей из json
  reconstructCharacter(data) {
    let character;
    switch (data.type) {
      case "bowman":
        character = new Bowman();
        break;
      case "swordsman":
        character = new Swordsman();
        break;
      case "magician":
        character = new Magician();
        break;
      case "daemon":
        character = new Daemon();
        break;
      case "undead":
        character = new Undead();
        break;
      case "vampire":
        character = new Vampire();
        break;
      default:
        throw new Error(`Неизвестный персонаж: ${data.type}`);
    }
    character.level = data.level;
    character.attack = data.attack;
    character.defence = data.defence;
    character.health = data.health;
    console.log(character);
    return character;
  }

  // Реконструируем объект PositionedCharacter из json
  reconstructPositionedCharacter(data) {
    const character = this.reconstructCharacter(data.character);
    return new PositionedCharacter(character, data.position);
  }

  loadingGame() {
    console.log("Trying to load game");
    const loadedState = this.stateService.load();
    const themesArray = [
      themes.prairie,
      themes.desert,
      themes.arctic,
      themes.mountain,
    ];
    if (!loadedState) {
      GamePlay.showError("Нет сохранений");
    }
    this.gameState = GameState.from(loadedState);
    this.arrayOfPlayers = [];
    this.arrayOfPlayers = this.gameState.arrayOfPlayers.map((data) =>
      this.reconstructPositionedCharacter(data)
    );
    this.currentLevel = this.gameState.currentLevel;
    this.isPlayerTurn = true;
    this.isGameOver = false;
    this.gamePlay.drawUi(themesArray[this.currentLevel]);
    this.gamePlay.redrawPositions(this.arrayOfPlayers);
  }
}
