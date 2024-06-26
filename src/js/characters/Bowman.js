import Character from "../Character";

export default class Bowman extends Character {
    constructor (level) {
        super(level, 'bowman');
        this.level = level;
        this.attack = 25;
        this.defence = 25;
        this.moveDistance = 2;
        this.attackDistance = 2;
    }
}