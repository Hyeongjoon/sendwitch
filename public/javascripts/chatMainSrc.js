function withChat(myNickname, targetNick) {

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

$(function() {
	socket.on('contents', function(data) {
		if ($('.' + data.myNick + 'Contents').length > 0) {
			var tmp = $('.' + data.myNick + 'Number').text();
			tmp = tmp*1 +1;
			$("."+data.myNick +"Body").remove();
			if($('#chat-room').length>0){
				$('#chat-room').before(
						'<div id="chat-room" class="' + data.myNick + 'Body"><div id="chat-nickname">'
								+ data.myNick
								+ '</div><div id="chat-writing" class="'
								+ data.myNick + 'Contents"  onclick="withChat(' + '\''  
								+ data.targetNick + '\'' + ' ,  ' + '\'' + data.myNick + '\''
								+ ')" style="cursor: pointer">' + data.contents
								+ '</div>' + '<div id="chat-number" class = "' +data.myNick+'Number" >'+ tmp
								+ '</div><div id="chat-cancel">x</div></div>');	
			} else{
				$('#chat-body').append(
						'<div id="chat-room" class="' + data.myNick + 'Body"><div id="chat-nickname">'
								+ data.myNick
								+ '</div><div id="chat-writing" class="'
								+ data.myNick + 'Contents"  onclick="withChat(' + '\''  
								+ data.targetNick + '\'' + ' ,  ' + '\'' + data.myNick + '\''
								+ ')" style="cursor: pointer">' + data.contents
								+ '</div>' + '<div id="chat-number" class = "' +data.myNick+'Number" >'+ tmp
								+ '</div><div id="chat-cancel">x</div></div>');	
			}
		} else {
			if($("#chat-room-none").length>0){
				$("#chat-room-none").remove();
			}
			if($('#chat-room').length>0){
				$('#chat-room').before(
						'<div id="chat-room" class="' + data.myNick + 'Body"><div id="chat-nickname">'
								+ data.myNick
								+ '</div><div id="chat-writing" class="'
								+ data.myNick + 'Contents"  onclick="withChat(' + '\''  
								+ data.targetNick + '\'' + ' ,  ' + '\'' + data.myNick + '\''
								+ ')" style="cursor: pointer">' + data.contents
								+ '</div>' + '<div id="chat-number" class = "' +data.myNick+'Number" >'+ 1
								+ '</div><div id="chat-cancel">x</div></div>');	
			} else{
				$('#chat-body').append(
						'<div id="chat-room" class="' + data.myNick + 'Body"><div id="chat-nickname">'
								+ data.myNick
								+ '</div><div id="chat-writing" class="'
								+ data.myNick + 'Contents"  onclick="withChat(' + '\''  
								+ data.targetNick + '\'' + ' ,  ' + '\'' + data.myNick + '\''
								+ ')" style="cursor: pointer">' + data.contents
								+ '</div>' + '<div id="chat-number" class = "' +data.myNick+'Number" >'+ 1
								+ '</div><div id="chat-cancel">x</div></div>');	
			}
		}
	});
});