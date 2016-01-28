var express = require('express');
var router = express.Router();
var async = require('async');
var sandDAO = require('../controller/SandDAO.js')

router.get('/', function(req, res, next) {
	if (req.session.inform == undefined) {
		res.redirect('/error');
	} else {
		if (req.session.inform.login !== 'sucess') {
			res.redirect('/error');
		} else {
			async.waterfall([
					function(callback) {
						if (req.session.searchCity == undefined) {
							callback(null, null);
						} else {
							sandDAO.findSandByCity(req.session.searchCity, callback);
						}
					},
					function(arg1, callback) {
						if (arg1 == undefined) {
							callback(null, null);
						} else {
							sandDAO.filterByLanguage(arg1, req.session.inform, callback);
						}
					} ], function(err, results) {
				res.render('main', {
					inform : req.session.inform,
					city : req.session.searchCity,
					sand : results
				});
			});
		}
	}
});

router.post('/', function(req, res, next) {
	var tmp = req.body.number;
	if (tmp != undefined) {
		req.session.searchCity.splice(tmp, 1);
	}
	res.redirect('/main');
});

module.exports = router;
