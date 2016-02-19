$(function(){
	$("#goToChatingMain").click(function(){
		location.replace("/chatMain");
	});
});


function reply(existRoom ,roomInfo , targetNick , myNick ){
	var contents = $("#chating-write").val();
	if(contents==''){
		alert("내용을 입력해 주세요");
		return false;
	} else {
		data = {
				contents : contents,
				existRoom : existRoom,
				roomInfo : roomInfo,
				targetNick : targetNick,
				myNick : myNick
		}
		socket.emit('chatRoom' , data);
	}
}

$(function(){
	socket.on('broadcast_msg',function (data){
		console.log(data);
	});
});