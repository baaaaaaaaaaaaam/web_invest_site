<?php

        $user_id = $_GET['user_id'];
        
        session_start();
        $_SESSION['user_id'] = $user_id;
   

?>