<?php

		require 'database.php';

		$query = 'SELECT * FROM requests';
		$stmt = $mysqli->prepare($query);
		if (!$stmt) {
			printf("Query prep failed: %s\n", $mysqli->error);
			exit;
		}
		$stmt->execute();
		$stmt->bind_result($id, $name, $address);

		$requests = array();

		while ($stmt->fetch()) {
			$request = array("shelter_id"=>htmlspecialchars($id), "shelter_name"=>htmlspecialchars($name), "address"=>htmlspecialchars($address));
			array_push($requests, $request);		
		}
		echo json_encode($requests);	
?>