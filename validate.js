document.addEventListener("DOMContentLoaded", loadRequests);

function loadRequests(){
	var content = []
	var pdata;
	$.ajax({type:'POST', url: 'validate.php', data: pdata, dataType: 'json', success: function(response) {
		var i;
		for(i=0;i<response.length;i++){
			content[i] = '<div><div class="shelter_id"> ' + response[i].shelter_id+'</div>';
			content[i] +='<div class="shelter_name">'+response[i].shelter_name+'</div>';
			content[i] +='<div class="shelter_address">'+response[i].address+'</div>';
			content[i] += '</div>';
			document.getElementById("requests").innterHTML += content[i];
		}
		
	}
	});
}