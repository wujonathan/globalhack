var usrname;
var usrId;
var token;

//Helper function used for dealing with the logins
function toggleState(item){
	if($(item).attr("data-tog") == "0") {
		$(item).attr("data-tog","1");
	} 
	else {
		$(item).attr("data-tog", "0");
	}
}

//Displays the login form
$("#login").click( function(){
	if ($(this).attr("data-tog") == "0"){
		$(".userLoginDetails").show();
	}
	else{
		$(".userLoginDetails").hide();
	}
	toggleState(this);
});

//Submits the login form and reloads the page
$("#submitLogin").click( function(){
	usrname = $("#username").val();
	var usrpass = $("#password").val();
	var pdata = {
		username : usrname,
		password : usrpass
	};
	if (usrname === "" || usrpass === ""){
		$("#loginUserMsg").empty();
		$("#loginUserMsg").append('<div class="failText">Invalid Username or Password</div>');
		return;
	}
	$.ajax({type:'POST', url: 'login.php', data: pdata, dataType: 'json', success: function(response) {
		if(response.success){ 
			token=response.token;
			$("#loggedUser").attr("data-tog","1");
			$(".userLoginDetails").hide();
			$(".logins").hide();
			$(".logouts").show();
			$("#loginUserMsg").empty();
			$("#userlogin")[0].reset();
			$("#loggedUser").append('<div>Hello '+usrname+'!</div>');
			usrId=response.usrId;
			toggleState($("#login"));
			load();
		}
		else{
			$("#loginUserMsg").empty();
			$("#loginUserMsg").append('<div class="failText">'+response.message+'</div>');
		}
	}
});
});

//Reset elements and load the default
$("#logout").click( function(){
	$.ajax({type:'POST', url: 'logout.php', dataType: 'json', success: function(response) {
		if(response.success){
			$(".logouts").hide();
			$(".logins").show();
			$("#loggedUser").empty();
			$("#loggedUser").attr("data-tog","0");
			homeload();
		}}
	});
});