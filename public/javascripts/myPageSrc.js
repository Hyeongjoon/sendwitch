$(function() {
	$("#myPage-searchadd")
			.autocomplete(
					{
						source : function(request , response) {
							var tmp = request.term;
							tmp = tmp.replace(/^\s+/, "");
							if (tmp.length > 1) {
								connection(tmp, response);
							} 
						},
						select : function(event, ui) {
							var tmp = ui.item.english_city_name + ", "
									+ ui.item.english_country_name;
							$("#myPage-searchadd").val(tmp);
							$("#selectedCityName").val(
									ui.item.english_city_name);
							$("#selectedCountryName").val(
									ui.item.english_country_name);
							$("#selectedCityId").val(ui.item.city_id);
							return false;
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
						+ item.english_country_name + "</a>").appendTo(ul);}

	}
});

$(function() {
	$("#tool-bar")
			.autocomplete(
					{
						source : function(request , response) {
							var tmp = request.term;
							tmp = tmp.replace(/^\s+/, "");
							if (tmp.length > 1) {
								connection(tmp, response);
							} 
						},
						select : function(event, ui) {
							var tmp = ui.item.english_city_name + ", "
									+ ui.item.english_country_name;
							$("#tool-bar").val(tmp);
							$("#selectedCityName").val(
									ui.item.english_city_name);
							$("#selectedCountryName").val(
									ui.item.english_country_name);
							$("#selectedCityId").val(ui.item.city_id);
							return false;
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
						+ item.english_country_name + "</a>").appendTo(ul);}

	}
});

$(function() {
	$("#tool-from, #tool-to").datepicker({
		dateFormat : 'yy-mm-dd',
		minDate : '0d',
		maxDate : '1y',
		showMonthAfterYear : true,
		showAnim : "fold"
	});
	$('#tool-from').datepicker("option", "onClose", function(selectedDate) {
		if (selectedDate != 0) {
			$("#tool-to").datepicker("option", "minDate", selectedDate);
		} else {
			$("#tool-to").datepicker("option", "minDate", '0d');
		}
	});
});


function deleteInteresting(i){
	var form = document.createElement("form");
	var input = document.createElement("input");

	form.setAttribute("method", "post");
	form.setAttribute("action", "/myPage/deleteInteresting");
	input.type = "hidden";
	input.name = "number";
	input.value = i;
	form.appendChild(input);
	document.body.appendChild(form);
	form.submit();
}	

