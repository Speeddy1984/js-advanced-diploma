import PositionedCharacter from '../PositionedCharacter';
import Bowman from '../characters/Bowman';
import Swordsman from '../characters/Swordsman';
import Magician from '../characters/Magician';


describe('PositionedCharacter', () => {
  test('should create PositionedCharacter instance with valid inputs', () => {
    const character = new Bowman(1);
    const position = 0;
    const positionedCharacter = new PositionedCharacter(character, position);

    expect(positionedCharacter.character).toBe(character);
    expect(positionedCharacter.position).toBe(position);
  });

  test('should throw error if character is not an instance of Character', () => {
    const character = {};
    const position = 0;

    expect(() => new PositionedCharacter(character, position)).toThrow(
      'character must be instance of Character or its children'
    );
  });

  test('should throw error if position is not a number', () => {
    const character = new Bowman(1);
    const position = 'not a number';

    expect(() => new PositionedCharacter(character, position)).toThrow(
      'position must be a number'
    );
  });

  test('characterCanMove should return true for valid move', () => {
    const character = new Swordsman(1);
    const positionedCharacter = new PositionedCharacter(character, 0);

    const boardSize = 8;
    const currentPosition = 0;
    const targetPosition = 9;

    expect(
      positionedCharacter.characterCanMove(character, currentPosition, targetPosition, boardSize)
    ).toBe(true);
  });

  test('characterCanMove should return false for invalid move', () => {
    const character = new Swordsman(1);
    const positionedCharacter = new PositionedCharacter(character, 0);

    const boardSize = 8;
    const currentPosition = 0;
    const targetPosition = 45;

    expect(
      positionedCharacter.characterCanMove(character, currentPosition, targetPosition, boardSize)
    ).toBe(false);
  });

  test('characterCanAttack should return true for valid attack', () => {
    const character = new Magician(1);
    const positionedCharacter = new PositionedCharacter(character, 0);

    const boardSize = 8;
    const currentPosition = 0;
    const targetPosition = 10;

    expect(
      positionedCharacter.characterCanAttack(character, currentPosition, targetPosition, boardSize)
    ).toBe(true);
  });

  test('characterCanAttack should return false for invalid attack', () => {
    const character = new Magician(1);
    const positionedCharacter = new PositionedCharacter(character, 0);

    const boardSize = 8;
    const currentPosition = 0;
    const targetPosition = 29;

    expect(
      positionedCharacter.characterCanAttack(character, currentPosition, targetPosition, boardSize)
    ).toBe(false);
  });

  test('getPossibleMoves should handle top-left corner', () => {
    // this.moveDistance = 4;
    
    const character = new Swordsman(1);
    const positionedCharacter = new PositionedCharacter(character, 0);
    
    const moves = positionedCharacter.getPossibleMoves(0, character.moveDistance, 8); // 0 4 8
    const expectedMoves = [1, 2, 3, 4, 8, 16, 24, 32, 9, 18, 27, 36];
    expectedMoves.forEach(move => expect(moves).toContain(move));
  });

  test('getPossibleMoves should handle top-right corner', () => {
    const character = new Swordsman(1);
    const positionedCharacter = new PositionedCharacter(character, 0);
    
    const moves = positionedCharacter.getPossibleMoves(7, character.moveDistance, 8);
    const expectedMoves = [6, 5, 4, 3, 15, 23, 31, 39, 14, 21, 28, 35];
    expectedMoves.forEach(move => expect(moves).toContain(move));
  });

  test('getPossibleMoves should handle bottom-left corner', () => {
    const character = new Swordsman(1);
    const positionedCharacter = new PositionedCharacter(character, 0);
    
    const moves = positionedCharacter.getPossibleMoves(56, character.moveDistance, 8);
    const expectedMoves = [48, 40, 32, 24, 57, 58, 59, 60, 49, 42, 35, 28];
    expectedMoves.forEach(move => expect(moves).toContain(move));
  });

  test('getPossibleMoves should handle bottom-right corner', () => {
    const character = new Swordsman(1);
    const positionedCharacter = new PositionedCharacter(character, 0);
    
    const moves = positionedCharacter.getPossibleMoves(63, character.moveDistance, 8);
    const expectedMoves = [62, 61, 60, 59, 55, 47, 39, 31, 54, 45, 36, 27];
    expectedMoves.forEach(move => expect(moves).toContain(move));
  });
});