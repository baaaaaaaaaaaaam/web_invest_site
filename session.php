<?php
        $user_id = $_GET['user_id'];
        ini_set('session.cookie_lifetime', 0) ;
        ini_set('session.gc_maxlifetime', 1440);
        ini_set('session.cache_expire', 180);
        session_start();
        $_SESSION['user_id'] = $user_id;
?>