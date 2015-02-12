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
const fs = require("fs");

//HTTP Get
var httpGet = function(url, callback) {

    http.get(url, function(res){
        res.setEncoding("utf8");
        var wholeMessage = "";
        var wholeLength = 0;
        res.on("data", function(d){
            if(d) {
                wholeLength += d.length;
                wholeMessage += d.toString();
            }
        });

        res.on("end", function(e){
            if(callback)
                callback(null, url, wholeMessage);
        });

    }).on("error", function(e) { console.log("Got Error " + e.message)})
}

var logback = function(err, url, response) {
    console.log(response);
}

var char = null;
var charName = null;
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
        console.log(text);
        charName = text;
        bLogin = false;
    }
    else if(bCreate) {
        httpGet("http://localhost:3000/api/create/" + charName, logback);
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
                if(charName) {
                    httpGet("http://localhost:3000/api/battle/" + charName, logback);
                }
                else {
                    bLogin = true;
                    console.log(Dialog.printLoginMenu());
                }
                break;
            case "3":
                if(char) {
                    //Need to return the JSON Object of Char and convert it and print it.
                    console.log(Dialog.PrintDetailChar(char));
                }
                else {
                    console.log("No Character Loaded");
                }
                break;
            case "4":
                //Saves are done automatically on Server
                if(char) {
                    //client.set(char.name, JSON.stringify(char));
                    console.log("Character: " + charName + " Saved Successfully");
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


