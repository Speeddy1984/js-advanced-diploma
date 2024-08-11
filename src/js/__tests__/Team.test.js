import Team from "../Team";

test("add character", () => {
    const newCharacter = new Team();
    expect(newCharacter.add('Swordsman')).toEqual(Set ['Swordsman']);
  });

test("add double character", () => {
  const newCharacter = new Team();
  newCharacter.add('Swordsman');
  expect(() => newCharacter.add('Swordsman')).toThrow('Персонаж уже существует');
});

test("addAll some characters", () => {
  const newCharacter = new Team();
  expect(newCharacter.addAll('Swordsman', 'Magician', 'Swordsman', 'Daemon')).toEqual(Set ['Swordsman', 'Magician', 'Daemon']);
});

test("characters toArray", () => {
  const newCharacter = new Team();
  newCharacter.addAll('Swordsman', 'Magician', 'Swordsman', 'Daemon');
  expect(newCharacter.characters).toEqual(['Swordsman', 'Magician', 'Daemon']);
});