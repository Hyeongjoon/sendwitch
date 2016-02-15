var express = require('express');
var router = express.Router();
var async = require('async');
var TownDAO = require('../controller/TownDAO.js');
var accountDAO = require('../controller/AccountDAO.js');

var io = require('../app.js').tmp;

io.on('connection', function(socket) {
	socket.on('findCity', function(data) {
		data = data.replace(/^\s+/, "");
		if (data.length > 1) {
			async.parallel([ function(callback) {
				TownDAO.findCityByName(data, callback);
			} ], function(err, results) {
				socket.emit('toclient', results[0]);
			});
		} else {
			socket.emit('toclient', null);
		}
	});

	socket.on('chkPassword', function(data) {
		if (data.password == null || data.password.length < 2) {
			socket.emit('result', false);
		} else {
			async.parallel([ function(callback) {
				accountDAO.findAccount(data.email, data.password, callback);
			} ], function(err, results) {
				if (err | results[0].length != 1) {
					socket.emit('result', false);
				} else {
					socket.emit('result', true);
				}
			})
		}
	});
	
	socket.on('changeDLang', function(data){
		if(data==null){
			socket.emit('DLangResult', false);
			return false;
		} else{
			data = data.replace(/^\s+/, "");
			
			var tmp = socket.handshake.session.inform.addLang.split(' ');
			var result = ''
			for(var i = 0 ; i < tmp.length ; i++){
				if(tmp[i]!==data){
					result = result + ' ' + tmp[i]
				}
			}
			result = result.replace(/^\s+/, "");
			async.parallel([ function(callback) {
				if(data === socket.handshake.session.inform.dLang){
					callback(null , true);
				} else{
					// 원래있던거랑 다른거 왔을때만 DB랑 연결
				accountDAO.changeDefalutLang(socket.handshake.session.inform.email , data , callback);
				}
			} , function(callback){
				if(result===socket.handshake.session.inform.addLang){
					callback(null , true);
				}else{
					// 원래있던거랑 다른거 왔을때만 DB랑 연결
				accountDAO.changeAddLang(socket.handshake.session.inform.email , result , callback);
				}
			}] , function(err, results){
				if((results[0]!==true) || (results[1]!==true)||err){
					socket.emit('DLangResult', false);
				} else{
				socket.handshake.session.inform.dLang = data;
				socket.handshake.session.inform.addLang = result;
				socket.handshake.session.save();
				var finalResult = {dLang : data , addLang : result};
				socket.emit('DLangResult', finalResult);
				return false;
				}
			});
		}
	});
	
	socket.on('addAddLang', function(data){
		data = data.replace(/^\s+/, "");
		if(data==null){
			socket.emit('addAddLangResult', false);
			return false;
		} else if(data==socket.handshake.session.inform.dLang){
			socket.emit('addAddLangResult', false);
			return false;
		} else if(socket.handshake.session.inform.addLang.indexOf(data)!==-1){
			socket.emit('addAddLangResult', false);
			return false;
		} else{
			var tmp = socket.handshake.session.inform.addLang + ' ' + data;
			tmp = tmp.replace(/^\s+/, "");
			async.parallel([ function(callback) {
				accountDAO.changeAddLang(socket.handshake.session.inform.email , tmp , callback);
			}] , function(err, results){
				if(results[0]!==true|| err ){
					socket.emit('addAddLangResult', false);
					return false;
				} else{
					socket.handshake.session.inform.addLang = tmp;
					socket.handshake.session.save();
					socket.emit('addAddLangResult', data);
					return false;
				}
			});
		}
	});
	socket.on('deleteAddLang', function(data){
		if(data==null){
			socket.emit('deleteAddLangResult', false);
			return false;
		} else if (data==socket.handshake.session.inform.dLang){
			socket.emit('deleteAddLangResult', false);
			return false;
		} else if (socket.handshake.session.inform.addLang.indexOf(data)==-1){
			socket.emit('deleteAddLangResult', false);
			return false;
		} else{
			data = data.replace(/^\s+/, "");
			
			var tmp = socket.handshake.session.inform.addLang.split(' ');
			var result = ''
			for(var i = 0 ; i < tmp.length ; i++){
				if(tmp[i]!==data){
					result = result + ' ' + tmp[i]
				}
			}
			result = result.replace(/^\s+/, "");
			async.parallel([ function(callback) {
				accountDAO.changeAddLang(socket.handshake.session.inform.email , result , callback);
			}], function(err,results){
				if(results[0]!==true || err){
					socket.emit('deleteAddLangResult', false);
					return false;
				} else{
					socket.handshake.session.inform.addLang = result;
					socket.handshake.session.save();
					socket.emit('deleteAddLangResult', true);
					return false;
				}
			});
		}
	});
	
	socket.on('deleteProhibit' , function(data){
		if(data == null){
			socket.emit('deleteProhibitResult', false);
			return false;
		} else if(socket.handshake.session.inform.prohibit_account.indexOf(data.prohibitNick)!==-1){
			var tmp = socket.handshake.session.inform.prohibit_account.split(' ');
			var result = ''
			for(var i = 0 ; i < tmp.length ; i++){
					if(tmp[i]!==data.prohibitNick){
						result = result + ' ' + tmp[i]
					}
				}
			result = result.replace(/^\s+/, "");
			async.parallel([ function(callback) {
				accountDAO.changeProhibitAccount(socket.handshake.session.inform.email , result , callback);
			}] , function(err,results){
				if(results[0]!==true||err){
					socket.emit('deleteProhibitResult', false);
					return false;
				} else{
					socket.handshake.session.inform.prohibit_account = result;
					socket.handshake.session.save();
					socket.emit('deleteProhibitResult', data.num);
					return false;
				}
			});
		} else{
			socket.emit('deleteProhibitResult', false);
			return false;
		}
	});
});



module.exports = router;