var mysql = require('mysql');
var Sequelize = require('sequelize');

//var connection = mysql.createConnection({
//	host: 'localhost',
//	user: 'armingutzmer',
//	password: 'Wildcats75',
//	database: 'doit_list_db'
//});

//
//connection.connect(function (err) {
//	if (err) {
//		console.error('error connecting: ' + err.stack);
//		return;
//	}
//	console.log('connected as id ' + connection.threadId);
//});

console.log ("beginning of connection");
var connection = new Sequelize ('doit_list_db', 'armingutzmer', 'Wildcats75');

var Mylist = connection.define ('mylist15v1', {checkbox: Sequelize.BOOLEAN, task: Sequelize.TEXT});

connection.sync().then(function() {
		Mylist.findAll().then(function(list) {		
			console.log ("list is ", list.length);
		});
	});

console.log ("end of connection");
module.exports = connection;
module.exports = Mylist;

var connection = require('./connection.js');

// object relational mapper (ORM)

var orm = {
	
	readEverything: function (cb) {
		console.log ("got to read everything");
		// connection.query('SELECT * FROM my_new_list;', function(err, data) {
			Mylist.findAll().then(function(data) {
					console.log ("doing the data callback");
		 	cb (data);
		});
	},



	insertRecord: function (taskLanguage, check_box, cb) {

	//	console.log ("task language = ", taskLanguage, "check_box = ", check_box);
	//	var x = "('" + taskLanguage + "', false)";

	//	var queryString = "INSERT INTO my_new_list (task, check_box) VALUES ";

	//	queryString = queryString.concat(x);
	//	console.log ( "queryString = ", queryString );

	//	connection.query(queryString, function (err, result) {
		Mylist.create ({
			task: taskLanguage });
			cb (0);
		}
};

module.exports = orm;
