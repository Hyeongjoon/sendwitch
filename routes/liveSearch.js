var express = require('express');
var router = express.Router();
var async = require('async');
var TownDAO = require('../controller/TownDAO.js');

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
});

module.exports = router;