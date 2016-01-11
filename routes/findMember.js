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

router.post('/', function(req, res, next) {
	pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM account WHERE email = ' + mysql.escape(req.body.useremail)+ 'AND password = ' + mysql.escape(req.body.userPWD), function (err, rows) {
            if (err) {console.error("err : " + err);}
            	connection.release();
            if(rows[0]==undefined){
            	res.render('loginErr' , {});
            }else{
            res.render('index', {nickName: rows[0].nickname, password: rows[0].password});
            
            // Don't use the connection here, it has been returned to the pool.
            }
        });
    });
});

module.exports = router;
