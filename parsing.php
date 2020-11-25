<?php


require_once('invest_db.php');
if(!$conn){ 
    die("연결 실패 : ".mysqli_connect_error()); 
}

$url ='./asset/json/2020.json';

if(!file_exists($url)) {
    echo '파일이 없습니다.';
    exit;
}

// json_decode : JSON 문자열을 PHP 배열로 바꾼다
// json_decode 함수의 두번째 인자를 true 로 설정하면 무조건 array로 변환된다.
// $R : array data
$json_string = file_get_contents($url);
$R = json_decode($json_string, true);

// key 가 rates인 value를 rates에 담는다.
$rates = $R['rates'];


// rates 안의 key는 날자이다 (2018-12)
// foreach문을 사용하여 $rates에 들어있는 key들을 하나씩 불러오고  해당 key의 value를  $value에 담는다
//  $value안에 있는 모든 국가의 환율을 보기위해선 이중 foreach 문을 사용하여 $value as $country => $val 하면 아래와 같이 값을 꺼낼수있다.

// foreach ($rates as $key => $value) {
//     foreach ($value as $country => $val) {
//         echo $country . '=>' . $val . '<br/>';
//     }
//     echo '<br />'; 
// }
   

foreach ($rates as $key => $value) {
    $won = $value['KRW'];
    echo $key;
    $sql = "insert into won_rate(date,won) value ('$key',$won)";
    $result = mysqli_query($conn, $sql);
    echo '<br />';
    // mysql_close($conn);
    // echo $key . '=>' . $value['KRW'] . '<br/>';
  
    
}

 
// echo '<pre>';
// print_r($R);
// echo '</pre>';

mysqli_close($conn);
?>
