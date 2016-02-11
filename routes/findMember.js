var express = require('express');
var router = express.Router();
var async = require('async');
var AccountDAO = require('../controller/AccountDAO.js');
var TownDAO = require('../controller/TownDAO.js');

router.post('/', function(req, res, next) {
	var tmp;
	async.waterfall([ function(callback) {
		AccountDAO.findAccount(req.body.useremail, req.body.userPWD, callback);
	}, function(args1, callback) {
		tmp = args1;
		if (tmp[0] == undefined) {
			callback(null, null);
		} else {
			if (args1[0].interesting_city_code == null) {
				callback(null, null);
			} else {
				TownDAO.findCityById(args1[0].interesting_city_code, callback);
			}
		}
	} ], function(err, results) {
		if (err) {
			res.redirect('/error');
		}
		if (tmp[0] == undefined) {
			res.render('loginErr', {});
		} else if (tmp.length >= 2) {
			res.render('loginErr', {});
		} else {
			if(tmp[0].interesting_city_code==null){
				tmp[0].interesting_city_code ='';
			}
			req.session.inform = {
				login : 'sucess',
				nick : tmp[0].nickname,
				email : tmp[0].email,
				interesting_city_code : tmp[0].interesting_city_code,
				interesting_city: [],
				dLang : tmp[0].default_language,
				addLang : tmp[0].addtional_language,
				pageLang : tmp[0].page_language,
				prohibit_account : tmp[0].prohibit_account
			};
			req.session.socketIp = "192.168.0.5";
			if (results != undefined) {
				var today = new Date();
				var month = today.getMonth() + 1;
				var day = today.getDate();
				if(month<10){
					month = '0' + month; 
				}
				if(day < 10){
					day = '0'+day;
				}
				var time = today.getFullYear() + '-' + month
						+ '-' + day;
				for (var i = 0; i < results.length; i++) {
					req.session.inform.interesting_city.push(results[i]);
					results[i].from = time;
					results[i].to = undefined;
				}
			}
			if(results ==undefined){
				results = [];
			}
			req.session.searchCity = results;
			res.redirect('/main');
		}
	});
});

router.get('/', function(req, res, next) {
	res.render('err');
});

module.exports = router;
