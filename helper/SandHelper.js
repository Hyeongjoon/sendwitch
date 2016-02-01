exports.extractsCityId = function(sand){
	var results = sand[0].city_code;
	for (var i = 1 ; i < sand.length ; i++){
		
		results = results + ' ' + sand[i].city_code;
	}
	return results;
}


exports.filterByLanguage = function(args, inform) {
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
	return result;
};

exports.addCityNameInSand = function(town , sand){
	for(var i = 0 ; i < town.length ; i++){
		for(var j = 0 ; j < sand.length ; j++){
			if(town.city_name ==undefined){
				if(sand[j].city_id==town[i].city_code){
					sand[j].city_name = town[i].english_city_name;
				}
			}
		}
	}
	return sand;
}