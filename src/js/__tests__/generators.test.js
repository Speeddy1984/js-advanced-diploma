import { characterGenerator, generateTeam } from "../generators";
import Bowman from "../characters/Bowman";
import Swordsman from "../characters/Swordsman";
import Magician from "../characters/Magician";
import Character from "../Character";
import Team from "../Team";

describe('characterGenerator', () => {
    const playerTypes = [Bowman, Swordsman, Magician];
  
    test('generates characters of allowed types and levels', () => {
      const maxLevel = 2;
      const generator = characterGenerator(playerTypes, maxLevel);
      
      for (let i = 0; i < 100; i++) {
        const character = generator.next().value;
        expect(character).toBeInstanceOf(Character);
        expect(playerTypes.some(type => character instanceof type)).toBeTruthy();
        expect(character.level).toBeGreaterThanOrEqual(1);
        expect(character.level).toBeLessThanOrEqual(maxLevel);
      }
    });
  
    test('generates characters with correct types', () => {
      const generator = characterGenerator(playerTypes, 2);
      const types = new Set();
  
      for (let i = 0; i < 100; i++) {
        const character = generator.next().value;
        types.add(character.type);
      }
  
      expect(types.has('bowman')).toBe(true);
      expect(types.has('swordsman')).toBe(true);
      expect(types.has('magician')).toBe(true);
    });
  
    test('generates characters with levels within the range', () => {
      const maxLevel = 3;
      const generator = characterGenerator(playerTypes, maxLevel);
  
      for (let i = 0; i < 100; i++) {
        const character = generator.next().value;
        expect(character.level).toBeGreaterThanOrEqual(1);
        expect(character.level).toBeLessThanOrEqual(maxLevel);
      }
    });
  });

  jest.mock('../Team');

describe('generateTeam', () => {
  const allowedTypes = [Bowman, Swordsman, Magician];
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('generates a team of specified character count', () => {
    const maxLevel = 2;
    const characterCount = 3;

    const team = generateTeam(allowedTypes, maxLevel, characterCount);

    expect(team).toBeInstanceOf(Team);
    expect(Team).toHaveBeenCalledTimes(1);
    expect(Team.mock.calls[0][0]).toHaveLength(characterCount);
  });

  test('generates characters of allowed types and levels', () => {
    const maxLevel = 2;
    const characterCount = 100; // Generating a larger number for thorough testing

    const team = generateTeam(allowedTypes, maxLevel, characterCount);

    const characters = Team.mock.calls[0][0];

    characters.forEach(character => {
      expect(allowedTypes.some(type => character instanceof type)).toBeTruthy();
      expect(character.level).toBeGreaterThanOrEqual(1);
      expect(character.level).toBeLessThanOrEqual(maxLevel);
    });
  });

  test('generates an empty team when character count is zero', () => {
    const maxLevel = 2;
    const characterCount = 0;

    const team = generateTeam(allowedTypes, maxLevel, characterCount);

    expect(team).toBeInstanceOf(Team);
    expect(Team).toHaveBeenCalledTimes(1);
    expect(Team.mock.calls[0][0]).toHaveLength(0);
  });
});