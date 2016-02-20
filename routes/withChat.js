var express = require('express');
var router = express.Router();
var async = require('async');
var chat_roomDAO = require('../controller/chat_roomDAO.js');
var chat_logDAO = require('../controller/chat_logDAO.js');

router.post('/', function(req, res, next) {           //여기로 넘어올려면 내 닉네임이랑 타겟닉네임 필요함
	
	var roomInfo;
	if (req.body.myNick == req.body.targetNick) {
		res.redirect('/error');
	} else if (req.session.inform.nick !== req.body.myNick) {
		res.redirect('/error');
	} else {
		var roomNumber;                       //view 에 보낼 변수
		async.waterfall([
				function(callback) {
					chat_roomDAO.findChatRoom(req.body.myNick, req.body.targetNick, callback);
				}, function(arg1, callback) {
					roomInfo = arg1;
					if (roomInfo == '') {
						callback(null, []);
						roomNumber = undefined;
					} else {
						roomNumber = roomInfo[0].room_number;
						chat_logDAO.findChatLog( roomInfo[0].room_number , callback );
					}
				} ], function(err, results) {	
			console.log(results);
			if (err) {
				res.redirect('/error');
			} else {
			res.render('chatRoom', {
				socketIP : req.session.socketIp,
				chatInfo : results,
				roomNumber : roomNumber,
				targetNick : req.body.targetNick,
				myNick : req.session.inform.nick
			});
			}
		});
	}
});

module.exports = router;