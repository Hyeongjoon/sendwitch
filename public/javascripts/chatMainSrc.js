function withChat(myNickname , targetNick){
	
	var form = document.createElement("form");
	
	var input = document.createElement("input");
	form.setAttribute("method", "post");
	form.setAttribute("action", "/withChat");
	input.type = "hidden";
	input.name = "myNick";
	input.value = myNickname;
	form.appendChild(input);
	
	var input2 = document.createElement("input");
	input2.type = "hidden";
	input2.name = "targetNick";
	input2.value = targetNick;
	form.appendChild(input2);
	
	document.body.appendChild(form);
	form.submit();
	
}