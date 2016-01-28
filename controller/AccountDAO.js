var base = require('./BaseDAO.js');
var mysql = require('mysql');

var sqlQuery = '';

exports.findAccount = function(userEmail , userPWD , callback){
   	sqlQuery = 'SELECT * from account WHERE email = ' + mysql.escape(userEmail) + 'AND password = ' + mysql.escape(userPWD);
	base.select(sqlQuery ,callback);
};

exports.certifyEmail = function (userEmail , callback){
 	sqlQuery = 'SELECT * from account WHERE email = ' + mysql.escape(userEmail);
	base.select(sqlQuery ,callback);
};

exports.certifyNick = function (nickname , callback){
	sqlQuery = 'SELECT * from account WHERE nickname = ' + mysql.escape(nickname);
	base.select(sqlQuery ,callback);
};

exports.register = function(inform , callback){
	sqlQuery = 'INSERT INTO account set ?'
	base.insert(sqlQuery , inform , callback);
};