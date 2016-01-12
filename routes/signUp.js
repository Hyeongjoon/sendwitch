var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit : 3,
	host : 'localhost',
	user : 'root',
	database : 'sendwitch',
	password : '1234'
});

router.get('/register', function(req, res, next) {
	res.render('err', {});
});

router.get('/chkNick', function(req, res, next) {
	res.render('err', {});
});

router.post('/register', function(req, res, next) {
	var nick = req.body.usernickname;
	var email = req.body.useremail;
	var pwd = req.body.userPWD;
	var pwdConfirm = req.body.userPWDconfirm;
	var dLang = req.body.defalutLanguage;
	var aLang = req.body.finalAddtionL;
	if (pwd.length < 8) {
		res.render('unCertified', {
			errMsg : '올바르지 못한 접근입니다. 다시 회원가입 작성해주세요'
		});
	} else if (pwd != pwdConfirm) {
		res.render('unCertified', {
			errMsg : '올바르지 못한 접근입니다. 다시 회원가입 작성해주세요'
		});
	} else if (req.session.chkEmail == 'uncertified'
			|| req.session.chkNick == 'uncertified') {
		res.render('unCertified', {
			errMsg : 'email인증과 nickName 인증을 해야합니다.'
		});
	} else if (req.session.email != email || req.session.nick != nick) {
		res.render('unCertified', {
			errMsg : '인증오류 입니다. 다시 해주세요'
		});
	} else {
		var insert = {
			'nickname' : nick,
			'password' : pwd,
			'email' : email,
			'default_language' : dLang,
			'addtional_language' : aLang,
			'page_language' : dLang
		};
		// (nickname , password, email, default_language, addtional_language,
		// page_language)
		pool.getConnection(function(err, connection) {
			connection.query('INSERT INTO account set ?', insert, function(err,
					result) {
				connection.release();
				if (err) {
					console.error(err);
					connection.rollback(function() {
						console.error('rollback error');
						res.render('loginErr', {});
					});
				} else {
					delete req.session.chkEmail;
					delete req.session.chkNick;
					delete req.session.email;
					delete req.session.nick;
					console.log("로그부분 : 삽입됐다.");
					res.render('success', {});
				}
			});
		});
	}
});

router.get('/', function(req, res, next) {
	req.session.chkEmail = 'uncertified';
	req.session.chkNick = 'uncertified';
	req.session.email = null;
	req.session.nick = null;
	res.render('signUp', {
		email : '',
		emailResult : '',
		nickResult : '',
		Nick : ''
	});

});

router.post('/', function(req, res, next) {
	var tmpValue = req.body.useremail;
	if (tmpValue.indexOf('@') != -1 && tmpValue.indexOf('.') != -1
			&& tmpValue.indexOf(' ') == -1) {
		if (tmpValue.indexOf('.') - tmpValue.indexOf('@') > 1) {
			if (tmpValue.indexOf('.') != (tmpValue.length - 1)
					&& tmpValue.indexOf('@') != 0) {
				pool.getConnection(function(err, connection) {
					connection.query('SELECT * FROM account WHERE email = '
							+ mysql.escape(req.body.useremail), function(err,
							rows) {
						if (err) {
							console.error("err : " + err);
						}
						connection.release();
						if (rows[0] == undefined) {
							req.session.chkEmail = 'certified';
							req.session.email = req.body.useremail;
							res.render('signUp', {
								email : req.body.useremail,
								Nick : req.body.usernickname,
								emailResult : 'you can use this Email',
								nickResult : req.body.resultNick
							});
						} else {
							res.render('signUp', {
								email : req.body.useremail,
								Nick : req.body.usernickname,
								emailResult : 'it is already used',
								nickResult : req.body.resultNick
							});
							// Don't use the connection here, it has been
							// returned to the
							// pool.
						}
					});
				});
			} else {
				res.render('signUp', {
					email : req.body.useremail,
					Nick : req.body.usernickname,
					emailResult : '',
					nickResult : req.body.resultNick
				});
			}

		} else {
			res.render('signUp', {
				email : req.body.useremail,
				Nick : req.body.usernickname,
				emailResult : '',
				nickResult : req.body.resultNick
			});
		}
	} else {
		res.render('signUp', {
			email : req.body.useremail,
			Nick : req.body.usernickname,
			emailResult : '',
			nickResult : req.body.resultNick
		});
	}

});

router.post('/chkNick', function(req, res, next) {
	
	var tmpValue = req.body.usernickname;
	if (tmpValue.length <= 0 || tmpValue > 19) {
		res.render('signUp', {
			email : req.body.useremail,
			Nick : req.body.usernickname,
			emailResult : req.body.resultEmail,
			nickResult : ''
		});
	} else {
		pool.getConnection(function(err, connection) {
			connection.query('SELECT * FROM account WHERE nickname = '
					+ mysql.escape(req.body.usernickname), function(err, rows) {
				if (err) {
					console.error("err : " + err);
				}
				connection.release();
				if (rows[0] == undefined) {
					req.session.chkNick = 'certified';
					req.session.nick = req.body.usernickname;
					res.render('signUp', {
						email : req.body.useremail,
						Nick : req.body.usernickname,
						emailResult : req.body.resultEmail,
						nickResult : 'you can use this Nickname'
					});
				} else {
					res.render('signUp', {
						email : req.body.useremail,
						Nick : req.body.usernickname,
						emailResult : req.body.resultEmail,
						nickResult : 'it is already used'
					});
					// Don't use the connection here, it has been returned to the
					// pool.
				}
			});
		});
	}
});

module.exports = router;
