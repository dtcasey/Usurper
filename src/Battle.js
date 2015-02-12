/**
 * Created by dcasey on 1/30/15.
 */
const Stats = require("./Stats");
const util = require("util");
const Dialog = require("./Dialog");
const LevelUp = require("./LevelUp");

function Battle(){}

function fight(attacker, defender) {
    var stillFighting = true;
    var dialog = "";
    while (continueFight(attacker, defender)) {
        dialog += " " + attack(attacker,defender);
        dialog += " " + Dialog.printHealth(attacker);
        dialog += " " + Dialog.printHealth(defender);

        if( continueFight(attacker, defender) ) {
            dialog += " " + attack(defender, attacker);
            dialog += " " + Dialog.printHealth(attacker);
            dialog += " " + Dialog.printHealth(defender);
        }
    }

    if(attacker.currentHP > 0) {
        dialog += " " + attacker.name + " Has won!\n";
        dialog += combatVictory(attacker);

    }
    else {
        dialog += " " + defender.name + " Has won!\n";
        dialog += combatVictory(defender);
    }
    return dialog;
}

function postBattle(char, heal)
{
    if(heal) {
        char.currentHP = char.maxHP;
    }
}

function combatVictory(victor) {
    victor.exp += 1;
    return LevelUp.levelUpCheck(victor);
}

function attack (attacker, defender){
    var dialog = "";

    if( Stats.ran100() <= attacker.hitChance ) {
        if( Stats.ran100() <= defender.dex) {
            dialog = util.format('%s has dodged an attack from %s\n', defender.name, attacker.name);
        }
        else {
            var dmg = 0;
            if( Stats.ran100() <= attacker.critChance ) {
                dmg = Stats.randomIntInc(attacker.dmgMin, attacker.dmgMax)*2;
                dialog =  util.format('%s had a Massive Critical Against %s for %d\n', attacker.name, defender.name, dmg);
            }
            else {
                dmg = Stats.randomIntInc(attacker.dmgMin, attacker.dmgMax);
                dialog =  util.format('%s hit %s for %d\n', attacker.name, defender.name, dmg);
            }
            defender.currentHP -= dmg;
        }
    }
    else
    {
        dialog =  util.format('%s missed %s\n', attacker.name, defender.name);
    }

    return dialog;
}

function continueFight(attacker, defender)
{
    if(attacker.currentHP <= 0 || defender.currentHP <= 0 ) {
        return false;
    }
    return true;
}


Battle.prototype = {
    fight : fight,
    postBattle : postBattle
}

var Battle = new Battle();

module.exports = Battle;