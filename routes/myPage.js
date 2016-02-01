var express = require('express');
var router = express.Router();
var TownDAO = require('../controller/TownDAO.js');
var async = require('async');

router.get('/', function(req, res, next) {
	
		res.render('myPage',{	
		inform : req.session.inform,
		city : req.session.searchCity
		});
	
});

router.post('/deleteInteresting' , function(req,res,next){
	var tmp = req.body.number;
	console.log(tmp);
	if (tmp != undefined) {
		req.session.infom.interesting_city.splice(tmp, 1);
	}
});

module.exports = router;
