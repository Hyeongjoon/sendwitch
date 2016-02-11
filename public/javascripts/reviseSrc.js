$(function() {
	$("#i-searchbar")
			.autocomplete(
					{		source : function(request , response) {
							var tmp = request.term;
							tmp = tmp.replace(/(^\s*)|(\s*$)/gi, "");
							if (tmp.length > 1) {
								connection(tmp, response);
							} 
						},
						select : function(event, ui) {
							var tmp = ui.item.english_city_name + ", "
									+ ui.item.country_code;
							$("#i-searchbar").val(tmp);
							$("#selectedCityName").val(
									ui.item.english_city_name);
							$("#selectedCountryName").val(
									ui.item.country_code);
							$("#selectedCityId").val(ui.item.city_id);
							return false;
						},
						position : {
							my : "right bottom",
							at : "right top",
							collision : "none"
						},
						delay : 300,
						focus : function(event, ui) {
							return false;
						},
						minLength : 2
					}).autocomplete("instance")._renderItem = function(ul, item) {
		if(item.english_city_name==undefined){
			return $("<li>").append(
					"<a>" +"no result"+ "</a>").appendTo(ul);
		}else{
		return $("<li>").append(
				"<a>" + item.english_city_name + ", "
						+ item.country_code + "</a>").appendTo(ul);}

	}
});