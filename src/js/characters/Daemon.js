import Character from "../Character";

export default class Daemon extends Character {
    constructor (level) {
        super(level, 'daemon');
        this.level = level;
        this.attack = 10;
        this.defence = 10;
        this.moveDistance = 1;
        this.attackDistance = 4;
    }
}