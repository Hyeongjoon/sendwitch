var base = require('./BaseDAO.js');
var mysql = require('mysql');

exports.findChatRoom = function(myNick, targetNick, callback) {
	var sqlQuery = 'SELECT * from chat_room WHERE (nick1 = '
			+ mysql.escape(myNick) + ' AND nick2 = ' + mysql.escape(targetNick)
			+ ') OR ( nick1 = ' + mysql.escape(targetNick) + ' AND nick2 = '
			+ mysql.escape(myNick) + ')';
	base.select(sqlQuery, callback);
};

exports.createRoom = function(data, callback) {
	var tmp = {
		nick1 : data.myNick,
		nick2 : data.targetNick
	};
	var sqlQuery = 'INSERT INTO chat_room SET ?'
	base.insert(sqlQuery, tmp, callback);
}

exports.findMyChatRoom = function(myNick, callback) {
	var sqlQuery = 'SELECT * from chat_room WHERE (nick1 = '
			+ mysql.escape(myNick) + 'AND nick1_deleted = '
			+ mysql.escape(false) + ' ) OR ( nick2 = ' + mysql.escape(myNick)
			+ 'AND nick2_deleted = ' + mysql.escape(false)
			+ ') ORDER BY updated_time DESC LIMIT 10';
	base.select(sqlQuery, callback);
}

exports.alramZero = function(nick1, myNick, roomNum, callback) {
	var whatNick;
	if (nick1 == myNick) {
		whatNick = 'nick1';
	} else {
		whatNick = 'nick2';
	}
	var sqlQuery = 'UPDATE chat_room SET ' + whatNick + '_alram = '
			+ mysql.escape(0) + ' WHERE room_number = ' + mysql.escape(roomNum);
	base.update(sqlQuery, callback);
}

exports.updateAlramTime = function(dataInfo, roomInfo, callback) {
	var whatNick;
	var tmpAlram;
	if (dataInfo.targetNick == roomInfo.nick1) {
		whatNick = 'nick1';
		tmpAlram = roomInfo.nick1_alram;
	} else {
		whatNick = 'nick2';
		tmpAlram = roomInfo.nick2_alram;
	}
	var sqlQuery = 'UPDATE chat_room SET ' + whatNick + '_alram = '
			+ mysql.escape(tmpAlram + 1) + ' , updated_time  = '
			+ mysql.escape(new Date()) + ' WHERE room_number = '
			+ mysql.escape(roomInfo.room_number);
	base.update(sqlQuery, callback);
}