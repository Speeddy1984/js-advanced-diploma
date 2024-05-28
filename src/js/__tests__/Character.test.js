import Character from "../Character";
import Bowman from "../characters/Bowman";

test('Create odject of Character throws error', () => {
  expect(new Character()).toThrow('Нельзя создавать объект класса родителя');  
})

test('characterInfo returns correct character info', () => {
  expect(new Bowman(2).characterInfo).toEqual(`\u{1F396}2 \u{2694}25 \u{1F6E1}25 \u{2764}50`);  
})
