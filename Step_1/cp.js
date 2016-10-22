document.addEventListener("DOMContentLoaded", homeload);

var usrname;
var usrId;
var token;
var markers = [];
var content = [];
var centerLat = 38.6270;
var centerLng = -90.1994;
var map;
var infowindow;

//This functoon loads the map when the website is first loaded
function homeload(){
	//Centers at location
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: new google.maps.LatLng(centerLat, centerLng),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var pdata;
	$.ajax({type:'POST', url: 'fetchInfo.php', data: pdata, dataType: 'json', success: function(response) {

		var marker, i;

		for (i = 0; i < response.length; i++) {  
			//Creates each of the contents for each marker
			content[i] = '<div><div class=shelter_name>' + response[i].shelter_name + '</div>';
			content[i] += '<div class="beds">Beds: '+response[i].bed[0].bed_avail+'</div>';
			content[i] +='<div class="food">Food: '+ response[i].food[0].food_avail+'</div>';
			content[i] += '</div>';

			marker = new google.maps.Marker({
				position: new google.maps.LatLng(response[i].lat, response[i].lng),
				map: map
			});
			infowindow = new google.maps.InfoWindow();
			markers[i] = marker;
			infowindow.setContent(content[i]);
			infowindow.open(map, marker);
		}
	}});
//Updates the center for future loading
google.maps.event.addListener(map, "center_changed", function() {
	centerLat=map.getCenter().lat();
	centerLng=map.getCenter().lng();
});
}

//Helper function used for dealing with the logins
function toggleState(item){
	if($(item).attr("data-tog") == "0") {
		$(item).attr("data-tog","1");
	} 
	else {
		$(item).attr("data-tog", "0");
	}
}

$("#update").click( function(){
	var beds_update = $("#beds_update").val();
	var food_update = $("#food_update").val();
	var pdata = {
		beds_avail : beds_update,
		food_avail : food_update
	};
	if (beds_update === "" || food_update === ""){
		$("#updateMsg").empty();
		$("#updateMsg").append('<div class="failText">Failed</div>');
		return;
	}
	$.ajax({type:'POST', url: 'update_avail.php', data: pdata, dataType: 'json', success: function(response) {
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