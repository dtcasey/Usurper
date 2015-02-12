/**
 * Created by dcasey on 1/30/15.
 */
var express = require('express');
var Engine = require("../src/Engine");

var router = express.Router();

/* GET api */
/*
router.get('/', function(req, res, next) {
    console.log(req.route);
    res.render('index', { title: 'Express' });
    next();
});
*/
router.get('/create/:name', function(req, res, next) {

    var callback = function(output) {
        if(output) {
            console.log( "Result Async" + output);
            //output = output.replace(/(\r\n|\n|\r)/gm,"<br>");
            //output += "</div>";
            console.log( "Final Log Before Render" + output);
            res.render('battle', { battle: output });
        }
        else
            res.render('battle', { battle: "No Output Returned: Error" });
    }

    Engine.createChar(req.params.name, callback);
});

router.get('/character/:name', function(req, res, next) {

    var callback = function(output) {
        if(output) {
            console.log( "Result Async" + output);
            //output = output.replace(/(\r\n|\n|\r)/gm,"<br>");
            //output += "</div>";
            console.log( "Final Log Before Render" + output);
            res.render('battle', { battle: output });
        }
        else
            res.render('battle', { battle: "No Output Returned: Error" });
    }

    //Dialog.printDetailChar(req.params.name, callback);
});

router.get('/battle/:name', function(req, res, next) {

    var callback = function(output) {
        if(output) {
            //output = output.replace(/(\r\n|\n|\r)/gm,"<br>");
            //output += "</div>";
            res.render('battle', { battle: output });
        }
        else
            res.render('battle', { battle: "No Output Returned: Error" });
    }

    Engine.doBattle(req.params.name, callback);
});

module.exports = router;