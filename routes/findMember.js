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
			req.session.inform = {
				login : 'sucess',
				nick : tmp[0].nickname,
				email : tmp[0].email,
				interesting_city : tmp[0].interesting_city_code,
				dLang : tmp[0].default_language,
				addLang : tmp[0].addtional_language,
				pageLang : tmp[0].page_language,
				prohibit_account : tmp[0].prohibit_account
			};
			req.session.searchCity = results;
			res.redirect('/main');
		}
	});
});

router.get('/', function(req, res, next) {
	res.render('err');
});

module.exports = router;
