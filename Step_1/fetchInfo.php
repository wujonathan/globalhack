<?php
/*Fetches all of the information needed to generate all the markers and the content of those markers. Echos an array with picture information and comment arrays as entries*/
header("Content-Type: application/json");

require 'database.php';
require 'user_agent_test.php';

//fetches the picture info
$shelter_array=array();
$stmt = $mysqli->prepare("SELECT id, name, latitude, longitude FROM homeless_shelters");
if(!$stmt){
	echo json_encode(array(
		"success" => false,
		"message" => $mysqli->error						));
	exit;
}
$stmt->execute();
$stmt->bind_result($shelter_id, $shelter_name, $latitude, $longitude);
while($stmt->fetch()){
	$status =  array("shelter_id" => htmlspecialchars($shelter_id), "shelter_name" => htmlspecialchars($shelter_name), "lat" => htmlspecialchars($latitude), "lng" =>htmlspecialchars($longitude));		
	array_push($shelter_array, $status);
}
$stmt->close();

for($i=0;$i<sizeof($shelter_array);$i++){

	//fetches food for each shelter
	$food_array=array();
	$stmt2 = $mysqli->prepare("SELECT available FROM food WHERE shelter_id = ?");
	if(!$stmt2){
		echo json_encode(array(
			"success" => false,
			"message" => $mysqli->error						));
		exit;
	}
	$stmt2->bind_param('i', $shelter_array[$i]["shelter_id"]);
	$stmt2->execute();
	$stmt2->bind_result($available);
	while($stmt2->fetch()){
		$status2 =  array("food_avail" => htmlspecialchars($available));		
		array_push($food_array, $status2);
	}
	$stmt2->close();
	$shelter_array[$i]["food"]=$food_array;

	//fetches beds for each shelter
	$bed_array=array();
	$stmt2 = $mysqli->prepare("SELECT available FROM beds WHERE shelter_id = ?");
	if(!$stmt2){
		echo json_encode(array(
			"success" => false,
			"message" => $mysqli->error						));
		exit;
	}
	$stmt2->bind_param('i', $shelter_array[$i]["shelter_id"]);
	$stmt2->execute();
	$stmt2->bind_result($available);
	while($stmt2->fetch()){
		$status2 =  array("bed_avail" => htmlspecialchars($available));		
		array_push($bed_array, $status2);
	}
	$stmt2->close();
	$shelter_array[$i]["bed"]=$bed_array;
}
echo json_encode($shelter_array);

?>