var mysql = require('mysql');
var config = require('../helper/config.js');


connection = mysql.createConnection({
	host : config.mysql.host,
	user : config.mysql.user,
	database : config.mysql.database,
	password : config.mysql.password,
	port : config.mysql.port
});

exports.select = function(params, callback) {
	connection.query(params, function(err, rows, fields) {
		if (!err) {
			callback(null, rows);
		} else {
			console.log("err" + err);
			callback(err, false);
		}
	});
};

exports.insert = function(params, inform, callback){
	connection.query(params, inform , function(err, rows, fields) {
		if (!err) {
			console.log("err" + err);
			callback(null, true);
		} else {
			callback(err, false);
		}
	});	
};




