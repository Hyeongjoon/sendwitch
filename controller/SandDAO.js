var base = require('./BaseDAO.js');
var mysql = require('mysql');



exports.findSandByCity = function(cityArr, callback) {
	var sqlQuery = 'SELECT * FROM sand WHERE (city_code = '
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
	sqlQuery = sqlQuery + 'ORDER BY updated_time DESC'
	base.select(sqlQuery, callback);
};

exports.registerSand = function(sand , callback){
	
	sqlQuery = 'INSERT INTO sand set ?';
	base.insert(sqlQuery, sand, callback);
};

