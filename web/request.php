<?php

include('method.php');

$http_method = $_SERVER["REQUEST_METHOD"];

if($http_method == "GET"){
 
    $request = $_GET['request'];
 
}elseif($http_method=="POST"){
    $request = $_POST['request'];
}   


$check="retention_rate";


//로그인 시도할 경우 id/pw검사하여 count가 1일경우 ok
if ($request == "login") {
    $id = $_GET['id'];
    $pw = $_GET['pw'];
    $count = check_login($id,$pw);
 
    if($count==1){
        $reply=json_return("ok");
        echo json_encode($reply);
    }elseif($count!=1){
        $reply=json_return("no");
        echo json_encode($reply);
    }
    
} elseif ($request == "check_email"){
    echo "check_email";
    // 아이디  ,이메일 입력받고 
    // 1. 일치하는 아이디 있는지 검사

    // 2. 일치하는 아이디 있는경우 "가입된 아이디가 있습니다" 

    // 3. 일치하는 아이디 없는 경우 이메일 중복검사

    // 4. 일치하는 이메일 있는경우 "가입된 이메일이 있습니다" 

    // 5. 일치하는 이메일 없는 경우 "이메일로 난수 6자리 전송" 후 3분 카운팅

} elseif ($reqeust=="signup") {
    echo "signup";
   // 아이디 , 패스워드,이메일 입력받고 

   // db에 저장 
} elseif ($request == "stock_index") {   //stock_index_field 에는 daum_kospi ,daum_kospi200,daum_kosdaq이들어가야한다

    $stock_index_field = $_GET['stock_index_field'];
    $value=get_stock_index($stock_index_field);
    echo json_encode($value);

} elseif ($request == $check) { 
    
    $retention_rate_field = $_GET['retention_rate_field'];
    $value=get_retention_rate($retention_rate_field);
    echo json_encode($value);

} else{
    // echo "else1";
}



?>