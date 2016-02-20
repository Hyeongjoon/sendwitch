$(function(){
	$("#goToChatingMain").click(function(){
		location.replace("/chatMain");
	});
});


function reply(roomInfo , targetNick , myNick ){
	var contents = $("#chating-write").val();
	$("#chating-write").val('');
	if(contents==''){
		alert("내용을 입력해 주세요");
		return false;
	} else {
		data = {
				contents : contents,
				roomInfo : roomInfo,
				targetNick : targetNick,
				myNick : myNick
		}
		socket.emit('chatRoom' , data);
	}
}

$(function(){
	$("#chating-body").scrollTop($("#chating-body")[0].scrollHeight);
});

$(function(){
	socket.on('broadcast_msg', function (data){
		$("#chating-body").append("<li id='chating-others'>" + data + "</li>");
		$("#chating-body").scrollTop($("#chating-body")[0].scrollHeight);
	});
});


$(function(){
	socket.on('submitResult', function (data){
		if(data == false){
			var form = document.createElement("form");
			form.setAttribute("method", "get");
			form.setAttribute("action", "/error");
			document.body.appendChild(form);
			form.submit();
		} else{
			$("#chating-body").append("<li id='chating-mine'>" + data + "</li>");
			$("#chating-body").scrollTop($("#chating-body")[0].scrollHeight);
		}
	});
});