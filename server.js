var express = require('express');
var bodyParser = require('body-parser');
var orm = require('./config/connection.js');
var Sequelize = require('sequelize');


var app = express();
//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
var mysql      = require('mysql');


app.get('/', function(req,res) {

  console.log ("going to read everything");
    orm.readEverything( function (data) {
        res.render('index', {things : data});
    });
});

//post route -> back to home
app.post('/create', function(req, res) {
	console.log ("create res = ", req.body.task);
//	orm.insertRecord (req.body.task, false);  

	orm.insertRecord (req.body.task, false, function(err) {
		orm.readEverything( function (data) {
            console.log ("BEFORE RENDER")
    	   res.render('index', {things : data});
           console.log ("AFTER RENDER")
        });
    });
});


var port = 3000;
app.listen(port);
console.log ("listening on port 3000");
