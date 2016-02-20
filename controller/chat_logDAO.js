var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.insertChatlog = function(roomNumber , myNick , targetNick , contents , callback){
	var data  = {
			room_number : roomNumber,
			from_user : myNick,
			to_user : targetNick,
			log_text : contents 
	};
	
	var sqlQuery = 'INSERT INTO chat_log SET ? ';
	base.insert(sqlQuery , data , callback);
};

exports.findChatLog = function(roomNumber, callback){
	var sqlQuery = 'SELECT * FROM chat_log WHERE room_number = ' + mysql.escape(roomNumber) + ' ORDER BY sended_time DESC LIMIT 20';
	base.select(sqlQuery , callback);
}