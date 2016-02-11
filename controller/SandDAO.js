var base = require('./BaseDAO.js');
var mysql = require('mysql');



exports.findSandByCity = function(cityArr, callback) {
	var sqlQuery = 'SELECT * FROM sand WHERE ((city_code = '
			+ mysql.escape(cityArr[0].city_id) + ' AND end_date >= '
			+ mysql.escape(cityArr[0].from);
	if (cityArr[0].to == undefined) {
		sqlQuery = sqlQuery + ')';
	} else {
		sqlQuery = sqlQuery + ' AND start_date <= '
				+ mysql.escape(cityArr[0].to) + ')';
	}

	for (var i = 1; i < cityArr.length; i++) {
		sqlQuery = sqlQuery + ' or (city_code = '
				+ mysql.escape(cityArr[i].city_id) + ' AND end_date >= '
				+ mysql.escape(cityArr[0].from);
		if (cityArr[i].to == undefined) {
			sqlQuery = sqlQuery + ')';
		} else {
			sqlQuery = sqlQuery + ' AND start_date <= '
					+ mysql.escape(cityArr[i].to) + ')';
		}
	}
	sqlQuery = sqlQuery + ') AND activated = ' + mysql.escape(true) + ' ORDER BY updated_time DESC';
	
	base.select(sqlQuery, callback);
};

exports.registerSand = function(sand , callback){
	
	var sqlQuery = 'INSERT INTO sand set ?';
	base.insert(sqlQuery, sand, callback);
};

exports.findMySand = function(inform , callback){
	
	var sqlQuery = 'SELECT * FROM sand WHERE nick = ' + mysql.escape(inform.nick) + 'ORDER BY updated_time DESC';
	base.select(sqlQuery , callback);
};

exports.deleteSand = function(inform , sandID , callback){
	
	var sqlQuery = 'DELETE FROM sand WHERE id = ' + mysql.escape(sandID) + ' AND nick = ' + mysql.escape(inform.nick);
	base.deletion(sqlQuery , callback);
};

exports.switchActivation = function(sandID , activation , callback){
	var sqlQuery = 'UPDATE sand SET activated = '
	if(activation == true){
		sqlQuery = sqlQuery + mysql.escape(false);
	} else{
		sqlQuery = sqlQuery + mysql.escape(true);
	}
	sqlQuery = sqlQuery + ' WHERE id = ' + mysql.escape(sandID);
	base.update(sqlQuery, callback);
} ;


