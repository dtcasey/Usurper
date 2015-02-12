/**
 * Created by dcasey on 1/30/15.
 */
const util = require("util");
const Stats = require("./Stats");

function LevelUp(){};

function levelUpCheck(character) {
    var dialog = "";
    console.log("Check: %d / %d", character.exp, character.level);

    if(!character.level)
        character.level = 1;

    if(character.exp >= character.level * 10 )
    {
        character.level++;
        character.exp = 0;
        levelUpCharStats(character);
        dialog = util.format("Congrats! %s has leveled to: %d\n", character.name, character.level);
    }
    return dialog;
}

function levelUpCharStats(character) {
    character.baseDex += Stats.calcStat(1,8,1);
    character.baseStr += Stats.calcStat(1,8,1);
    character.baseInt += Stats.calcStat(1,8,1);
    character.baseStam += Stats.calcStat(1,8,1);
    Stats.calcModStatsForChar(character);
}

LevelUp.prototype = {
    levelUpCheck : levelUpCheck,
    levelUpCharStats : levelUpCharStats
};

var LevelUp = new LevelUp();

module.exports = LevelUp;