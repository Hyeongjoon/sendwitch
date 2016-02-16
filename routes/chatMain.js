var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('chatMain' , {
		socketIP : req.session.socketIp
		});
});



module.exports = router;
