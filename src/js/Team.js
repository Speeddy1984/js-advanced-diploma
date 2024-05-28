/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */

export default class Team {
  // TODO: write your logic here
  // реализовано в одном из ДЗ курса
  constructor(character = []) {
    this.members = new Set(character);
  }

  add(character) {
    if (this.members.has(character)) {
      throw new Error("Персонаж уже существует");
    }
    this.members.add(character);
  }

  addAll(...characters) {
    for (const character of characters) {
      this.members.add(character);
    }
  }

  get characters() {
    return Array.from(this.members);
  }
}
