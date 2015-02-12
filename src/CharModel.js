/**
 * Created by dcasey on 1/30/15.
 */

const ItemModel = require("./ItemModel.js");
const Globals = require("./Globals.js")

var CharModel = function(charName) {
    return {
        name: charName,
        baseDex : 1,
        baseStr : 1,
        baseInt : 1,
        baseStam : 1,
        dex : 1,
        str : 1,
        int : 1,
        stam : 1,
        maxHP: 1,
        currentHP: 1,
        dmgMin : 1,
        dmgMax : 1,
        defense: 0,
        critChance : 1,
        hitChance : 1,
        items : [new ItemModel("none", ITEM_TYPES[0]),
            ItemModel("none", ITEM_TYPES[1]),
            ItemModel("none", ITEM_TYPES[2]),
            ItemModel("none", ITEM_TYPES[3]),
            ItemModel("none", ITEM_TYPES[4]),
            ItemModel("none", ITEM_TYPES[5]),
            ItemModel("none", ITEM_TYPES[6]),
            ItemModel("none", ITEM_TYPES[7]),
            ItemModel("none", ITEM_TYPES[8])],
        exp : 0,
        level : 1
    }
}

module.exports = CharModel;