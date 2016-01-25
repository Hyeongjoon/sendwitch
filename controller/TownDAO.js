var base = require('./BaseDAO.js');
var mysql = require('mysql');

var sqlQuery = '';

exports.findCityById = function(city_code, callback) {
	var tmp = city_code.split(' ');
	sqlQuery = 'SELECT * from town WHERE city_id = ' + mysql.escape(tmp[0]);
	for (var i = 1; i < tmp.length; i++) {
		sqlQuery = sqlQuery + ' or city_id = ' + mysql.escape(tmp[i]);
	}
	base.select(sqlQuery, callback);
}