exports.duplicationChkCityId = function (cityArray, cityID) {
	var tmp = cityArray.split(' ');
	for (var i = 0; i < tmp.length; i++) {
		if (tmp[i] == cityID) {
			return true;
		} 
	}
	return false;
}

exports.deleteCityId = function(cityArray , cityID){
		var tmp = cityArray.split(' ');
		for (var i = 0; i < tmp.length; i++) {
			if (tmp[i] == cityID) {
				tmp.splice(i,1);
				var result = '';
				for(var j= 0 ; j < tmp.length ; j++){
					result = result + tmp[j] + ' ';
				}
				result.replace(/^\s+/, "");
				return result;
			} 
		}
		return false;
}
