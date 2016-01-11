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

router.post('/register', function(req,res,next){
	var nick = req.body.usernickname;
	var email = req.body.useremail;
	var pwd = req.body.userPWD;
	var dLang = req.body.defalutLanguage;
	var aLang = req.body.finalAddtionL;
	
	var insert = {
		'nickname' : nick,
		'password' : pwd,
		'email' : email,
		'default_language' : dLang,
		'addtional_language' : aLang,
		'page_language' : dLang
	};
	//(nickname , password, email, default_language, addtional_language, page_language)
	pool.getConnection(function(err, connection) {
		connection.query('INSERT INTO account set ?', insert , function(err, result){
			connection.release();
			 if (err) {
	                console.error(err);
	                connection.rollback(function () {
	                    console.error('rollback error');
	                    res.render('loginErr' , {});
	                });}else {
			 console.log("로그부분 : 삽입됐다.");
			 res.render('success' , {});
	              }
		});
	});	
});


router.get('/', function(req, res, next) {

	res.render('signUp', {
		email : '',
		emailResult : '',
		nickResult : '',
		Nick : ''
	});
});

router.post('/', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query('SELECT * FROM account WHERE email = '
				+ mysql.escape(req.body.useremail), function(err, rows) {
			if (err) {
				console.error("err : " + err);
			}
			connection.release();
			if (rows[0] == undefined) {
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
				// Don't use the connection here, it has been returned to the
				// pool.
			}
		});
	});
});

router.post('/chkNick', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query('SELECT * FROM account WHERE nickname = '
				+ mysql.escape(req.body.usernickname), function(err, rows) {
			if (err) {
				console.error("err : " + err);
			}
			connection.release();
			if (rows[0] == undefined) {
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

});

module.exports = router;
