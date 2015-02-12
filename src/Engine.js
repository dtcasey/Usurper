/**
 * Created by dcasey on 1/27/15.
 *
 * MongoDB Login system http://www.quietless.com/kitchen/building-a-login-system-in-node-js-and-mongodb/
 */
const http = require("http");
const url = require("url");
const util = require("util");
const redis = require("redis");
const Battle = require("./Battle");
const Dialog = require("./Dialog");
const Create = require("./Create")

function Engine() {}

var char = null;
var client = null;


//Redis
function configureRedis(){
    if(!client) {
        client = redis.createClient();
        client.on("error", function (err) {
            console.log("Error " + err);
        });
    }
}

function createChar(charName, callback) {
    var char = Create.createChar(charName, 1);
    configureRedis();
    client.set(char.name, JSON.stringify(char));

    if(callback){
        callback( Dialog.printDetailChar(char));
    }
    else
        return Dialog.printDetailChar(char);
}

function doBattle(charName, callback)
{
    var output = "No Results";
    var charFight = null;
    configureRedis();
    client.get(charName, function (err, reply) {
        if (reply && reply.length > 0) {
            charFight = JSON.parse(reply);

            if (charFight) {
                output = Battle.fight(charFight, Create.createChar("random"), charFight.level - 1);
                Battle.postBattle(charFight, true);
                output += Dialog.printStatus(charFight);

                client.set(charName, JSON.stringify(charFight));
            }
            else {
                output += "No Character Loaded: " + charName;
            }
        }
        else {
            output = "Invalid Login Name: " + charName;
        }

        if(callback)
            callback(output);
        else
            return output;
    });
}




Engine.prototype = {
    doBattle : doBattle,
    createChar : createChar

}

var Engine = new Engine();

module.exports = Engine;





//Server
/*
var GameServer = function (port) {

    var server = http.createServer( function (req, res) {

        if (req.method != 'GET') {
            res.end(printMenu());
        }
        else
        {
            var urlPath = req.url;
            var parsedURL = url.parse(req.url, true);
            var stringify = "";
            var iso = parsedURL.query.iso;
            if( parsedURL.pathname === "/api/1") {
                char = createMob("Badass");
                stringify = "Character Created\n" + consoleMob(char);
            }
            else if( parsedURL.pathname === "/api/2") {
                var charFight = null;
                configureRedis();
                client.get(text, function (err, reply) {
                    if(reply && reply.length > 0) {
                        console.log(reply.toString());
                        charFight = JSON.parse(reply);
                    }
                    else
                    {
                        console.log("Invalid Login Name");
                    }
                });

                if(charFight) {
                    console.log(Battle.fight(charFight, Create.createChar("random"), charFight.level - 1));
                    Battle.postBattle(charFight,true);
                    console.log(Dialog.printStatus(charFight));
                    console.log(Dialog.printMenu());
                }
                else {
                    console.log("No Character Loaded");
                }

            }
            else if( parsedURL.pathname === "/api/3") {
                stringify = consoleMob(char);
            }
            else {
                stringify = printMenu();
            }
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(stringify);
        }
    });

    server.listen(port, function() {
    });
}
GameServer(process.argv[2]);
*/

/*
var bLogin = false;
var bCreate = false;
console.log(Dialog.printMenu());
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (text)
{
    //console.log('received data:', util.inspect(text));
    text = text.replace(/(\r\n|\n|\r)/gm,"");

    if(bLogin) {
        client.get(text, function (err, reply) {
            if(reply && reply.length > 0) {
                console.log(reply.toString());
                char = JSON.parse(reply);
            }
            else
            {
                console.log("Invalid Login Name");
            }
        });
        bLogin = false;
    }
    else if(bCreate) {
        client.get(text, function (err, reply) {
            if(reply && reply.length > 0) {
                console.log(reply.toString());
                char = JSON.parse(reply);
                console.log("Character already exists, character loaded.");
            }
            else
            {
                char = Create.createChar(text, 1);
                console.log(Dialog.printDetailChar(char));
            }
        });
        bCreate = false;
    }
    else
    {
        switch (text){
            case "1":
                bCreate = true;
                console.log(Dialog.printCreateMenu());
                break;
            case "2":

                break;
            case "3":
                if(char) {
                    console.log(Dialog.PrintDetailChar(char));
                }
                else {
                    console.log("No Character Loaded");
                }
                break;
            case "4":
                if( !client ) {
                    client = redis.createClient();
                }
                if(char) {
                    client.set(char.name, JSON.stringify(char));
                    console.log("Character: " + char.name + " Saved Successfully");
                }
                else {
                    console.log("Unable to save successfully");
                }
                break;
            case "5":
                bLogin = true;
                console.log(Dialog.printLoginMenu());
                break;
            case "quit":
                done();
                client.quit();
                break;
            default:
                console.log(Dialog.printMenu());
        }

    }
});

function done() {
    console.log('Now that process.stdin is paused, there is nothing more to do.');
    process.exit();
}

*/
