

function addSearching(){
	var to = document.getElementById('to');
	var from = document.getElementById('from');
	
	if(from.value == 0){
		var today = new Date();
		var time = today.getFullYear() + '-' + (today.getMonth() + 1)
				+ '-' + today.getDate();
		from.value = time;
	}
	if($("#selectedCityName").val()==0||$("#selectedCityId").val()==0||$("#selectedCountryName").val()==0){
		alert("검색어를 선택해 주세요");
		return false;
	} else{
	
	var form = document.createElement("form");
	
	form.setAttribute("method" , "post");
	form.setAttribute("action", "/addSearching");
	
	var input1 = document.createElement("input");
	input1.type = "hidden";
	input1.name = "to";
	input1.value = to.value;
	form.appendChild(input1);
	
	var input2 = document.createElement("input");
	input2.type = "hidden";
	input2.name = "from";
	input2.value = from.value;
	form.appendChild(input2);
	
	var input3 = document.createElement("input");
	input3.type = "hidden";
	input3.name = "cityId";
	input3.value = $("#selectedCityId").val();
	form.appendChild(input3);
	
	var input4 = document.createElement("input");
	input4.type = "hidden";
	input4.name = "cityName";
	input4.value =  $("#selectedCityName").val();
	form.appendChild(input4);
	
	var input5 = document.createElement("input");
	input5.type = "hidden";
	input5.name = "countryName";
	input5.value =  $("#selectedCountryName").val();
	form.appendChild(input5);
	
	
	document.body.appendChild(form);
	form.submit();}
}

function connection(term, response){
	var socket = io.connect('http://192.168.0.22:3001');
	socket.emit('findCity', term);
	socket.on('toclient', function(data) {
		var result =[];
		for(var i = 0 ; i < data.length ; i++){
			var tmp = data[i].english_city_name + ", " + data[i].english_country_name;
			result.push(tmp);
		}
		response(data);
	});
}

$(function() {
	$("#from, #to").datepicker(
					{	dateFormat : 'yy-mm-dd',
						minDate : '0d',
						maxDate : '1y',
						showMonthAfterYear : true,
						showAnim: "fold",
						showOptions: { direction: "left" } 
						}
					);
    $('#from').datepicker("option", "onClose", function ( selectedDate ) {
    	if(selectedDate!=0){
        $("#to").datepicker( "option", "minDate", selectedDate );}
    	else {$("#to").datepicker( "option", "minDate", '0d' );}
    });
});


$(function() { 

    $( "#i-searchbar" ).autocomplete({
      source: function(request , response){
    	  var tmp = request.term;
    	  tmp = tmp.replace(/^\s+/, "");
    	  if(tmp.length>2){
    	  connection(tmp, response);
    	  }
    	  return false;
      },
      focus: function( event, ui ) {
      $( "#i-searchbar" ).val( ui.item.english_city_name );
       return false;
       },
      select: function( event, ui ) {
    	  var tmp = ui.item.english_city_name + ", " + ui.item.english_country_name;
           $( "#i-searchbar" ).val(tmp);
           $( "#selectedCityName").val(ui.item.english_city_name);
           $( "#selectedCountryName").val(ui.item.english_country_name);
           $( "#selectedCityId").val(ui.item.city_id);
           return false;
       },
      position: { my : "right bottom", at: "right top", collision: "none"},
      autoFocus: true,
      delay: 300,
      minLength: 0
    }).autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<a>" + item.english_city_name + ", " + item.english_country_name + "</a>" )
        .appendTo( ul );
    };
	   
  });
