var express = require('express');
var router = express.Router();
var accountDAO = require('../controller/AccountDAO.js');
var accountHelper = require('../helper/AccountHelper.js');
var async = require('async');

router.get('/', function(req, res, next) {

	res.render('myPage', {
		inform : req.session.inform,
		city : req.session.searchCity
	});

});

router.post('/deleteInteresting', function(req, res, next) {
	var tmp = req.body.number;

	if (req.session.inform.interesting_city.length == 0
			|| req.session.inform.interesting_city_code == null
			|| req.session.inform.interesting_city_code == ''
			|| tmp == undefined
			|| tmp >= req.session.inform.interesting_city.length) {
		res.redirect('/error');
	} else {
		var changedCity = accountHelper.deleteCityId(
				req.session.inform.interesting_city_code,
				req.session.inform.interesting_city[tmp].city_id);
		req.session.inform.interesting_city.splice(tmp, 1);
		if (changedCity === false) {
			res.redirect('/error');
		} else {
			async.waterfall([ function(callback) {
				accountDAO.changeInterestingCity(req.session.inform,
						changedCity, callback);
			} ], function(err, results) {
				if (results == true) {
					res.redirect('/myPage');
				} else {
					res.redirect('/error');
				}
			});
		}
	}
});

router.post('/addInteresting', function(req, res, next) {

	
	
});

module.exports = router;
