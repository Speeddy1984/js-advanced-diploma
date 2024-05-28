import { calcTileType } from "../utils";

test('returns "top-left" for index 0 and board size 8', () => {
    expect(calcTileType(0, 8)).toBe('top-left');
})

test('returns "top-right" for index 9 and board size 9', () => {
    expect(calcTileType(8, 9)).toBe('top-right');
})

test('returns "bottom-left" for index 0 and board size 10', () => {
    expect(calcTileType(90, 10)).toBe('bottom-left');
})

test('returns "bottom-right" for index 0 and board size 11', () => {
    expect(calcTileType(120, 11)).toBe('bottom-right');
})

test('returns "left" for index 0 and board size 12', () => {
    expect(calcTileType(24, 12)).toBe('left');
})

test('returns "right" for index 0 and board size 13', () => {
    expect(calcTileType(25, 13)).toBe('right');
})

test('returns "top" for index 0 and board size 14', () => {
    expect(calcTileType(5, 14)).toBe('top');
})

test('returns "bottom" for index 0 and board size 15', () => {
    expect(calcTileType(220, 15)).toBe('bottom');
})

test('returns "center" for index 0 and board size 16', () => {
    expect(calcTileType(100, 16)).toBe('center');
})