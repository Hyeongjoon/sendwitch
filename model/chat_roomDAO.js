var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findChatRoom = function (myNick , targetNick , callback) {
	var sqlQuery = 'SELECT * from chat_room WHERE (nick1 = ' + mysql.escape(myNick)
	+ ' AND nick2 = ' + mysql.escape(targetNick) + ') OR ( nick1 = ' + mysql.escape(targetNick) + ' AND nick2 = ' +mysql.escape(myNick) +')';
	base.select(sqlQuery, callback);
};

exports.createRoom = function(data , callback){
	var tmp = {
			nick1 : data.myNick,
			nick2 : data.targetNick
	};
	var sqlQuery = 'INSERT INTO chat_room SET ?'
	base.insert(sqlQuery , tmp , callback);
}

exports.findMyChatRoom = function (myNick , callback){
	var sqlQuery = 'SELECT * from chat_room WHERE (nick1 = ' + mysql.escape(myNick) + 
	'AND nick1_deleted = ' + mysql.escape(false) + ' ) OR ( nick2 = ' + mysql.escape(myNick) + 
    'AND nick2_deleted = ' + mysql.escape(false) + 
	') ORDER BY updated_time DESC LIMIT 10';
	base.select(sqlQuery , callback);
}