/**
 * Created by dcasey on 1/30/15.
 */
var ItemModel = function(itmName,itmType){
    return {
        name : itmName,
        type : itmType,
        defense : 1,
        dex : 0,
        str : 0,
        int : 0,
        stam : 0,
        dmgMin : 0,
        dmgMax : 0,
        critChance : 0,
        hitChance : 0,
        level: 1
    }
}

module.exports = ItemModel;
