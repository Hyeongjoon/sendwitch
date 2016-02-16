var express = require('express');
var router = express.Router();
var async = require('async');
var chat_roomDAO = require ('../controller/chat_roomDAO.js');
var chat_logDAO = require ('../controller/chat_logDAO.js');

router.post('/', function(req, res, next) {
	if(req.body.myNick == req.body.targetNick) {
		res.redirect('/error');
	} else if(req.session.inform.nick !== req.body.myNick){
		res.redirect('/error');
	} else{
		async.waterfall([function(callback){
			chat_roomDAO.findChatRoom(req.body.myNick , req.body.targetNick , callback);
		} , function(arg1 , callback){
				if(arg1 == '') {
				callback(null , null);
				}else{
					
				}
		}] , function(err , results){
			if(err){
				res.redirect('/error');
			} else if(results===null){
				existRoom = false;
			} else{
				existRoom = true;
			}
			  res.render('chatRoom' , 
					  { socketIP : req.session.socketIp, 
				  		existRoom :existRoom,
				  		roomInfo : results,
				  		targetNick : req.body.targetNick
					  }
			  );}
		);}
});

module.exports = router;
