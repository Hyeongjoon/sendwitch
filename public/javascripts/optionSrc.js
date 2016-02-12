$(function() {
	$("#option-menu2, #option-menu3, #option-menu4").click(function() {
		if ($(this).next('.option-submenu:hidden').is(":hidden")) {
			$(this).next('.option-submenu:hidden').slideDown("middle");
			return false;
		} else {
			$(this).next('.option-submenu').slideUp();
			return false;
		}
	});
});

function chkPassword(email) {
	if (!$("#passwordCorrect").is(":hidden")) {
		return false
	} else {
		if ($("#option-password").val().length < 2) {
			alert("올바른 패스워드를 적어주세요");
			return false;
		} else {
			var socket = io.connect('http://192.168.0.6:3001');
			var tmpData = {
				email : email,
				password : $("#option-password").val()
			};
			socket.emit('chkPassword', tmpData);
			socket.on('result', function(data) {
				if (data === true) {
					if (!$("#passwordworng").is(":hidden")) {
						$("#passwordworng").slideUp();
					}
					$("#passwordCorrect").slideDown("middle");
				} else {
					$("#passwordworng").slideDown("middle");
				}
			});
			return false;
		}
	}
}