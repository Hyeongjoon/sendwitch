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

exports.filterByLanguage = function(args, inform, callback) {
	var result = [];
	for (var i = 0; i < args.length; i++) {
		if (args[i].language == inform.dLang) {
			result.push(args[i]);
		}
	}
	if (inform.addLang != '') {
		var tmp = inform.addLang.split(' ');
		for (var i = 0; i < tmp.length; i++) {
			for (var j = 0; j < args.length; j++) {
				if(args[j].language == tmp[i]){
					result.push(args[j]);
				}
			}
		}
	}
	callback(null, result);
};