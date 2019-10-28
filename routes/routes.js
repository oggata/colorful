var app = module.parent.exports;
var passport = app.get("passport");
var crypto = require("crypto");
//var UserModel = require('../models/userModel.js');
//var UserPlanetModel = require('../models/userPlanetModel.js');
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream('debug.log', {
    flags: 'w'
});
var log_stdout = process.stdout;
console.log = function (d) {
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

/*
app.get('/detail/:id', function (req, res) {
	console.log(req.params.id);
    res.render('detail', {
        title: 'detail',
        charactor_id: req.params.id,
    });

res.render('planet', {
        title: 'AAAAAAAAA',
        charactor_id: req.params.id,
    });

});
*/


app.get('/play', function (req, res) {
    res.render('play', {
        title: 'play'
    });
});

app.get('/list', function (req, res) {
    res.render('list', {
        title: 'list'
    });
});


//<------------API2----------------->
var junkallstars = require('./junkallstars.js');
app.get('/opensea/tokens/:id', junkallstars.get_bot_json_data);



