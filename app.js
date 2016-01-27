var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//var RedisStore = require('connect-redis')(session);
//var redis = require('redis').createClient();





var bodyParser = require('body-parser');


//EJS
var engine = require('ejs-locals');


var login = require('./routes/login');
var find = require('./routes/findMember');
var signUp = require('./routes/signUp');
var main = require('./routes/main');
var addSearching = require('./routes/addSearchingCity');
var liveSearch = require('./routes/liveSearch');

 
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));




//EJS
app.set('view engine', 'ejs');
 
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secretkey'));


app.use(session({
	//store: new RedisStore({
	//}),
	cookie:{
		maxAge: 1000 * 60 * 60
	},
	key : 'sid',
	resave : false,
    saveUninitialized : false,
    secret: 'keyboard cat'
}));

//EJS
app.engine('ejs', engine);



app.use(express.static(path.join(__dirname, 'public')));

app.use(':3001/' , liveSearch);
app.use('/' , login);
app.use('/findMember' , find);
app.use('/signUp' , signUp);
app.use('/main' , main);
app.use('/addSearching', addSearching);
app.get('/autocomplete', function(req, res,next){
	
	console.log("시발 ㅇ여긴 실행되냐??");
})


app.get('/error', function(req, res, next){
	res.render('err');
	req.session.destroy();
	res.clearCookie('sid');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
 
// error handlers
 
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);	
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
 
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
 
 
module.exports = app;