var express = require('express');
var router = express.Router();
var async = require('async');
var chat_roomDAO = require('../controller/chat_roomDAO.js');
var chat_logDAO = require('../controller/chat_logDAO.js');

router.post('/', function(req, res, next) {
	var roomInfo;
	if (req.body.myNick == req.body.targetNick) {
		res.redirect('/error');
	} else if (req.session.inform.nick !== req.body.myNick) {
		res.redirect('/error');
	} else {
		async.waterfall([
				function(callback) {
					chat_roomDAO.findChatRoom(req.body.myNick, req.body.targetNick, callback);
				}, function(arg1, callback) {
					roomInfo = arg1;
					if (roomInfo == '') {
						callback(null, []);
					} else {
						callback(null,true);
					}
				} ], function(err, results) {
			if (err) {
				res.redirect('/error');
			} else if (results == '' && roomInfo == '') {
				existRoom = false;
			} else if ((results == '' && roomInfo !== '')
					|| (results !== '' && roomInfo == '')) {
				res.redirect('/error');
			} else {
				existRoom = true;
			}
			if(roomInfo==''){
				roomInfo[0] = {};
			}
			res.render('chatRoom', {
				socketIP : req.session.socketIp,
				existRoom : existRoom,
				chatInfo : results,
				roomNumber : roomInfo[0].room_number,
				targetNick : req.body.targetNick,
				myNick : req.session.inform.nick
			});
		});
	}
});

module.exports = router;
