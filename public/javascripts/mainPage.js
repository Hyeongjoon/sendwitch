function deleteSearching(i) {
	var form = document.createElement("form");
	var input = document.createElement("input");

	form.setAttribute("method", "post");
	form.setAttribute("action", "/main");
	input.type = "hidden";
	input.name = "number";
	input.value = i;
	form.appendChild(input);
	document.body.appendChild(form);
	form.submit();
}

function calTime(i, time) {
	var minutes = 1000 * 60;
	var hours = minutes * 60;
	var days = hours * 24;
	var weeks = days * 7;
	var month = days * 30;
	var years = days * 365;
	var val;
	var currentTime = new Date();
	var updateTime = new Date(time);

	result = currentTime.getTime() - updateTime.getTime();
	if (result > years) {
		val = Math.floor(result/years);
		if(val ==1){
			val = val+" year ago";
		} else {
			val = val+" years ago";
		}
	} else if (result > month) {
		val = Math.floor(result/month);
		if(val ==1){
			val = val+" month ago";
		} else {
			val = val+" months ago";
		}
	} else if (result > weeks) {
		val = Math.floor(result/weeks);
		if(val ==1){
			val = val+" week ago";
		} else {
			val = val+" weeks ago";
		}
	} else if (result > days) {
		val = Math.floor(result/days);
		if(val ==1){
			val = val+" day ago";
		} else {
			val = val+" days ago";
		}
	} else if (result > hours) {
		val = Math.floor(result/hours);
		if(val ==1){
			val = val+" hour ago";
		} else {
			val = val+" hours ago";
		}
	} else if (reuslt > minutes) {
		val = Math.floor(result/minutes);
		if(val ==1){
			val = val+" miniute ago";
		} else {
			val = val+" miniutes ago";
		}
	} else {
		val = "few seconds ago";
	}
	$("#time-value" + i).append(val);
}

