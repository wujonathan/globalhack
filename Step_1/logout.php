<?php
//<!--This script logs out and destroys the session-->
        require 'user_agent_test.php';
        session_unset();   
        session_destroy();                
	echo json_encode(array(
                "success" => true
                  ));
        exit;
?>