<?php

//로그인 할 경우 ID/PW일치하는지 체크 
function check_login($id,$pw){

    require_once('invest_db.php');
    $select_query = "SELECT * FROM member where id='$id' and pw='$pw'";
    $result_set = mysqli_query($conn, $select_query);
    $count = mysqli_num_rows($result_set);
    mysqli_close($conn);
    return $count;
}


//메인페이지가 호출되면 선형 그래프를 그리는데 호출된다.
// type으로는 daum_kospi ,daum_kospi200,daum_kosdaq 이다
function get_stock_index($field){
    $value_array=array();
    require_once('invest_db.php');
    $sql = "SELECT date,point FROM $field order by date  limit 50";
    $result = mysqli_query($conn, $sql);
   
    while($row = mysqli_fetch_array($result)) {
        $tmp_array=array('date'=> $row['date'],'point'=>$row['point']);
    array_push($value_array,$tmp_array);
    }
    mysqli_close($conn);
    return $value_array;
}
function get_retention_rate($field){
    $value_array=array();
    require_once('invest_db.php');
    $sql = "SELECT  ant,organ,foreigner,date FROM $field order by date desc limit 5";
    $result = mysqli_query($conn, $sql);
   
    while($row = mysqli_fetch_array($result)) {
        $tmp_array=array('date'=>$row['date'],'ant'=> $row['ant'],'organ'=>$row['organ'],'foreigner'=> $row['foreigner']);
    array_push($value_array,$tmp_array);
    }
    mysqli_close($conn);
    return $value_array;
}


function json_return($data){
    if($data=="ok"){
        return $data=array('result' => 'ok');
    }
    elseif($data=="no"){
        return $data=array('result' => 'no');
    }
}

?>