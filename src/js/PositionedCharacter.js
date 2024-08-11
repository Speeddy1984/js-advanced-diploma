import Character from './Character';

export default class PositionedCharacter {
  constructor(character, position) {
    if (!(character instanceof Character)) {
      throw new Error('character must be instance of Character or its children');
    }

    if (typeof position !== 'number') {
      throw new Error('position must be a number');
    }

    this.character = character;
    this.position = position;
  }

  playerCanMove(character, currentPosition, targetPosition, boardSize) {
    const distance = character.moveDistance;
    const possibleMoves = this.getPossiblePlayerMoves(currentPosition, distance, boardSize);
    return possibleMoves.includes(targetPosition);
  }

  getPossiblePlayerMoves(position, distance, boardSize) {
    const moves = [];
    const row = Math.floor(position / boardSize);
    const col = position % boardSize;
  
    for (let d = 1; d <= distance; d++) {
      if (row - d >= 0) {
        moves.push((row - d) * boardSize + col);
        if (col - d >= 0) moves.push((row - d) * boardSize + (col - d));
        if (col + d < boardSize) moves.push((row - d) * boardSize + (col + d));
      }
      if (row + d < boardSize) {
        moves.push((row + d) * boardSize + col);
        if (col - d >= 0) moves.push((row + d) * boardSize + (col - d));
        if (col + d < boardSize) moves.push((row + d) * boardSize + (col + d));
      }
      if (col - d >= 0) moves.push(row * boardSize + (col - d));
      if (col + d < boardSize) moves.push(row * boardSize + (col + d));
    }
  
    return moves;
  }

  // проверяем, массив ячеек, которые можно атаковать, возвращаем массив
  characterCanAttack(character, currentPosition, targetPosition, boardSize) {
    const distance = character.attackDistance;
    const possibleAttacks = this.getPossibleAttacks(currentPosition, distance, boardSize);
    return possibleAttacks.includes(targetPosition);
  }

  getPossibleAttacks(position, distance, boardSize) {
    const attacks = [];
    const row = Math.floor(position / boardSize);
    const col = position % boardSize;
  
    for (let dRow = -distance; dRow <= distance; dRow++) {
      for (let dCol = -distance; dCol <= distance; dCol++) {
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
          attacks.push(newRow * boardSize + newCol);
        }
      }
    }
  
    return attacks;
  }
}
