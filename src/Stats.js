/**
 * Created by dcasey on 1/30/15.
 */

function Stats(){}

function calcStat(min, max, rolls) {
    var stat = 0;
    for (var i = 0; i < rolls; i++) {
        stat += randomIntInc(min, max);
    }
    if (stat === 0) stat = 1;
    return stat;
}

function calcTotalItemStat(char, stat) {
    var total = 0;
    for (var i = 0; i < char.items.length; i++) {
        total += char.items[i][stat];
    }
    return total;
}

function calcModStatsForChar(char) {
    char.dex = char.baseDex + calcTotalItemStat(char, "dex");
    char.str = char.baseStr + calcTotalItemStat(char, "str");
    char.int = char.baseInt + calcTotalItemStat(char, "int");
    char.stam = char.baseStam + calcTotalItemStat(char, "stam");
    char.maxHP = char.stam * 10;
    char.currentHP = char.maxHP;

    char.dmgMin = char.dmgMin + calcTotalItemStat(char, "dmgMin");
    char.dmgMax = char.dmgMax + calcTotalItemStat(char, "dmgMax");
    char.defense = calcTotalItemStat(char, "defense");
    char.critChance = char.critChance + calcTotalItemStat(char, "critChance");
    char.hitChance = char.hitChance + calcTotalItemStat(char, "hitChance");
}

function ran100() {
    return randomIntInc(1, 100);
}

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

Stats.prototype = {
    calcStat : calcStat,
    calcTotalItemStat : calcTotalItemStat,
    calcModStatsForChar : calcModStatsForChar,
    ran100 : ran100,
    randomIntInc : randomIntInc
};

var Stats = new Stats();

module.exports = Stats;