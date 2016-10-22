<?php
/*Logs in a user after retrieveing post data from the ajax call. Notifies success or failure as json array*/
header("Content-Type: application/json"); 
require 'database.php';

$safe_username = $mysqli->real_escape_string($_POST['username']);
$password = $_POST['password'];
$stmt = $mysqli->prepare("SELECT COUNT(*), id, password FROM users WHERE username=?");
if (!$stmt){
   echo json_encode(array(
		"success" => false,
		"message" => $mysqli->error	
		));
		exit;
}
$stmt->bind_param('s', $safe_username);
$stmt->execute();
$stmt->bind_result($cnt, $user_id, $pwd_hash);
$stmt->fetch();
$stmt->close();
if($cnt == 1 && crypt($password, $pwd_hash)==$pwd_hash){
	ini_set("session.cookie_httponly", 1);
	session_start();
	$_SESSION['username'] = $safe_username;
	$_SESSION['user_id'] = $user_id;
	$_SESSION['token'] = substr(md5(rand()), 0, 10);
	echo json_encode(array(
		"success" => true, "token" =>$_SESSION['token'], "usrId" =>$user_id
		));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "Incorrect Username or Password"
		));
	exit;
}
?>