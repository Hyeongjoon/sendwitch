var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Session = require('express-session');
var sharedsession = require("express-socket.io-session");


var app = express();
app.set('port',80);
app.listen(app.get('port'));
/*var RedisStore = require('connect-redis')(Session);
var redis = require("redis").createClient({ host: "127.0.0.1",
	      port: 6379});*/




var session = new Session({
	/*store: new RedisStore({
	      client: redis,
	      //prefix : "session:",
	      db : 2
	}),*/
	cookie:{
		maxAge: 1000 * 60 * 60
	},
	key : 'sid',
	resave : false,
    saveUninitialized : false,
    secret : 'keyboard cat'
});
app.use(cookieParser());
app.set('trust proxy', 1) 
app.use(session);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var io = require('socket.io').listen(3001);
exports.tmp = io.use(sharedsession(session));






//EJS
var engine = require('ejs-locals');


var login = require('./routes/login');
var find = require('./routes/findMember');
var signUp = require('./routes/signUp');
var main = require('./routes/main');
var addSearching = require('./routes/addSearchingCity');
var myPage = require('./routes/myPage');
var option = require('./routes/option');
var chatMain = require('./routes/chatMain');
var withChat = require('./routes/withChat');
var liveSearch = require('./routes/liveSearch');
// view engine setup
app.set('views', path.join(__dirname, 'views'));


//EJS
app.set('view engine', 'ejs');
 
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));




//EJS
app.engine('ejs', engine);



app.use(express.static(path.join(__dirname, 'public')));

app.use(':3001/' , liveSearch);
app.use('/' , login);
app.use('/findMember' , find);
app.use('/signUp' , signUp);
app.use('/main' , main);
app.use('/addSearching', addSearching);
app.use('/myPage' , myPage);
app.use('/option' , option);
app.use('/chatMain' , chatMain);
app.use('/withChat' , withChat);


app.get('/error', function(req, res, next){
	res.render('err');
	req.session.destroy();
	res.clearCookie('sid');
});

//liveSearch


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