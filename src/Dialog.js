/**
 * Created by dcasey on 1/30/15.
 */
const util = require("util");

function Dialog(){}

function printDetailChar(char) {
    var dialog = "";
    for(x in char) {
        if(x === "items") {
            dialog += "Items: \n";
            for(var i =0; i< char["items"].length; i++) {
                var item = char.items[i];
                for( itemX in item) {
                    dialog += util.format("   %s:%s \n", itemX, item[itemX]);
                }
                dialog += "\n";
            }
        }
        else {
            dialog += util.format("%s:%s \n", x, char[x]);
        }
    }
    return dialog;
}

function printHealth(char) {
    return util.format("%s HP: %d/%d", char.name, char.maxHP, char.currentHP);
}

function printStatus(char) {
    return util.format("%s Hp: %d/%d Exp: %d", char.name, char.maxHP, char.currentHP, char.exp);
}

function printMenu()
{
    return "Main Menu:\n1: Create new Char\n2: Fight\n3: Display Char\n4: Save\n5: Login\n\'quit\' to exit";
}

function printLoginMenu()
{
    return "Login Menu:\nPlease enter your character Name:";
}

function printCreateMenu()
{
    return "Create Menu:\nPlease enter the character Name you would like to create";
}

Dialog.prototype = {
    printDetailChar : printDetailChar,
    printHealth : printHealth,
    printStatus : printStatus,
    printMenu : printMenu,
    printLoginMenu : printLoginMenu,
    printCreateMenu : printCreateMenu
};

var Dialog = new Dialog();

module.exports = Dialog;