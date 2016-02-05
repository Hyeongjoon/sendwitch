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

