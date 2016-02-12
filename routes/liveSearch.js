var express = require('express');
var router = express.Router();
var async = require('async');
var TownDAO = require('../controller/TownDAO.js');
var accountDAO = require('../controller/AccountDAO.js');

var io = require('socket.io').listen(3001);

io.sockets.on('connection', function(socket) {
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
});

module.exports = router;