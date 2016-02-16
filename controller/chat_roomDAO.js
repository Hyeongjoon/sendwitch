var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findChatRoom = function (myNick , targetNick , callback) {
	var sqlQuery = 'SELECT * from chat_room WHERE (nick1 = ' + mysql.escape(myNick)
	+ ' AND nick2 = ' + mysql.escape(targetNick) + ') OR ( nick1 = ' + mysql.escape(targetNick) + ' AND nick2 = ' +mysql.escape(myNick) +')';
	base.select(sqlQuery, callback);
};