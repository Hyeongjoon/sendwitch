var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
	host : 'localhost',
	user : 'root',
	database : 'sendwitch',
	password : '1234'
});
//
//

router.post('/', function(req, res, next) {
	pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM account WHERE email = ' + mysql.escape(req.body.useremail) + 'AND password = ' + mysql.escape(req.body.userPWD) , function (err, rows) {
            if (err) {console.error("err : " + err);}
            	connection.release();
            if(rows[0]==undefined){
            	res.render('loginErr' , {});
            } else if(rows.length>=2){
            	res.render('loginErr' , {});
            } else{
            req.session.inform = {
            	login : 'sucess',
            	nick : rows[0].nickname,
            	email : rows[0].email,
            	interesting_city : rows[0].interesting_city,
            	dLang : rows[0].default_language,
            	addLang : rows[0].addtional_language,
            	pageLang : rows[0].page_language,
            	prohibit_account : rows[0].prohibit_account
            };
            res.render('index', {nickName: req.session.inform.nick, password: rows[0].password});
            
            // Don't use the connection here, it has been returned to the pool.
            }
        });
    });
});

router.get('/' , function(req, res, next){
	res.render('err');
	
});

module.exports = router;
