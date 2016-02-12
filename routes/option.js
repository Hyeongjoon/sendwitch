var express = require('express');
var router = express.Router();


router.get('/' , function(req , res , next){
	
	
	res.render('option' , {
		socketIP : req.session.socketIp,
		inform : req.session.inform
	});
});


module.exports = router;