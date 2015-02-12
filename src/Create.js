/**
 * Created by dcasey on 1/30/15.
 */
const CharModel = require("./CharModel");
const ItemModel = require("./ItemModel");
const Stats = require("./Stats");

function Create(){}

function createChar(charName, level)
{
    if(!level)
        level = 1;

    var mob = new CharModel(charName);
    mob.baseDex = Stats.calcStat(1,8,1 + level);
    mob.baseStr = Stats.calcStat(1,8,1 + level);
    mob.baseInt = Stats.calcStat(1,8,1 + level);
    mob.baseStam = Stats.calcStat(1,8,1 + level);
    mob.items[0] = createRandomItem("Sword of Random", ITEM_TYPES[0]);
    Stats.calcModStatsForChar(mob);
    return mob;
}

function createRandomItem(itemName, itemType)
{
    var itm = new ItemModel(itemName, itemType);
    itm.defense = Stats.calcStat(1,8,2);
    itm.dex = Stats.calcStat(1,8,2);
    itm.str = Stats.calcStat(1,8,2);
    itm.int = Stats.calcStat(1,8,2);
    itm.stam = Stats.calcStat(1,8,2);
    itm.dmgMax = Stats.calcStat(1,8,4);
    itm.dmgMin = Stats.calcStat(1,8,2);
    if( itm.dmgMin > itm.dmgMax) {
        itm.dmgMax = itm.dmgMin;
    }
    itm.critChance = Stats.calcStat(1,8,2);
    itm.hitChance = Stats.calcStat(1,8,10);
    return itm;
}

Create.prototype ={
    createChar : createChar,
    createRandomItem : createRandomItem
}

var create = new Create();

module.exports = create;