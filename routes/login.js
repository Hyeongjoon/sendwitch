var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log(req.headers);
	if (req.session.inform == undefined) {
		res.render('login', {
			title : 'sendwitch'
		});
	} else {
		if (req.session.inform.login == 'sucess') {
			res.redirect('/main');
		} else {
			res.render('login', {
				title : 'sendwitch'
			});
		}
	}
});


router.get('/logout', function(req, res, next) {
	req.session.destroy();  
	res.clearCookie('sid'); 
	res.redirect('/');
});

module.exports = router;
