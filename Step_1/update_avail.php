<?php
/*Adds a comment to the database after getting the post variables from the ajax request.*/
header("Content-Type: application/json");
require 'database.php';
require 'user_agent_test.php';

$beds_avail=$_POST['beds_avail'];
$food_avail=$_POST['food_avail'];
$user_id=$_POST['user_id'];

		//Inserts into database
$stmt = $mysqli->prepare("INSERT INTO comments (comment, picture_id, user_id) VALUES (?, ?, ?)");
if(!$stmt){
	echo json_encode(array(
		"success" => false,
		"message" => $mysqli->error
		));
	exit;
}
$stmt->bind_param('sii',$comment, $picture_id, $user_id);
$stmt->execute();
$stmt->close();

echo json_encode(array(	     	        
	"success" => true
	));				
exit;

?>