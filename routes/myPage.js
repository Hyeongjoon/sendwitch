var express = require('express');
var router = express.Router();
var accountDAO = require('../controller/AccountDAO.js');
var accountHelper = require('../helper/AccountHelper.js');
var sandDAO = require('../controller/SandDAO.js');
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
		req.session.inform.interesting_city_code = changedCity;
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
	var confirm = accountHelper.duplicationChkCityId(
			req.session.inform.interesting_city_code, req.body.CityId);
	if (confirm) {
		res.render('addInterestingErr', {});
	} else {
		var cityArr = accountHelper.addCityId(
				req.session.inform.interesting_city_code, req.body.CityId);
		req.session.inform.interesting_city_code = cityArr;
		var city = {
			city_id : req.body.CityId,
			english_country_name : req.body.CountryName,
			english_city_name : req.body.CityName,
			from : req.body.from
		};
		req.session.inform.interesting_city.push(city);
		req.session.searchCity.push(city);
		async.waterfall([ function(callback) {
			accountDAO.changeInterestingCity(req.session.inform,
					req.session.inform.interesting_city_code, callback);
		} ], function(err, results) {
			if (results != true) {
				res.redirect('/error');
				
			} else {
				res.redirect('/myPage');
			}
		});
	}
});

router.post('/addSand', function(req, res, next) {
	var newSand = {
		nick : req.session.inform.nick,
		contents : req.body.contents,
		language : req.body.language,
		city_code : req.body.sandCityId,
		start_date : req.body.sandFrom,
		end_date : req.body.sandTo
	};
	if (req.body.language == 'default') {
		newSand.language = req.session.inform.dLang;
	}
	async.waterfall([ function(callback) {
		sandDAO.registerSand(newSand , callback);
	} ], function(err, results) {
		if(results!=true){
			res.redirect('/error');
		} else {
			res.redirect('/myPage');
		}
	});
});

module.exports = router;
