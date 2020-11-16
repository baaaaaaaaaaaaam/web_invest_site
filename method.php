<?php

//로그인 할 경우 ID/PW일치하는지 체크 
function check_login($id,$pw){

    require_once('invest_db.php');
    $select_query = "SELECT * FROM member where id='$id' and pw='$pw'";
    $result_set = mysqli_query($conn, $select_query);
    $count = mysqli_num_rows($result_set);
    if($count==1){
        while($row= mysqli_fetch_array($result_set)){
            if ($row['lebel']=="3"){
                $count=1;
            }else{
                $count=-1;
            }
        }
    }
  
    mysqli_close($conn);
    return $count;
}

function duplicate_check_id($id){

    require_once('invest_db.php');
    $select_query = "SELECT * FROM member where id='$id'";
    $result_set = mysqli_query($conn, $select_query);
    $count = mysqli_num_rows($result_set);
    mysqli_close($conn);
    return $count;
}


function enroll($id,$pw,$email){

    require_once('invest_db.php');
    $select_query="insert into member (id,pw,email,created) value ('$id','$pw','$email',NOW())";

    $result = mysqli_query($conn, $select_query);
    if($result === false){
        return mysqli_error($conn);
    
    }else{
        return "ok";
    }
   
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

// 기관 외국인 개인 코스피 ,코스닥,코스피200 매입/매도 정보
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

// 메인 페이지에서 최신 10개뉴스 보여주는 기능
function main_get_news(){
       

    $value_array=array();
    require_once('invest_db.php');
    
    $sql = "select * from news_crawling order by issue desc limit 10";
    $result = mysqli_query($conn, $sql);
  
    while($row = mysqli_fetch_array($result)) {
        $tmp_array=array('title'=>$row['title'],'imgPath'=>$row['imgPath'],
        'urlPath'=>$row['urlPath'],'issue'=>$row['issue'],'newspaper'=>$row['newspaper']);    
        array_push($value_array,$tmp_array);
    }
        mysqli_close($conn);
      
        return $value_array;
}

// 국내 뉴스 주식 정보 요청
function korea_news($start_num){

    $total_array=array();
    // db에 저장된 뉴스 숫자;
    require_once('invest_db.php');
    $count=db_count($conn);

    $sql = "select * from news_crawling order by issue desc limit $start_num,15";
    $result = mysqli_query($conn, $sql);

    $content_array=array();
    while($row = mysqli_fetch_array($result)) {
        $tmp_array=array('seq'=>$row['seq'],'title'=>$row['title'],'imgPath'=>$row['imgPath'],
        'urlPath'=>$row['urlPath'],'issue'=>$row['issue'],'newspaper'=>$row['newspaper']);    
        array_push($content_array,$tmp_array);
    }
        mysqli_close($conn);
        
        $total_array=array('count' => $count,'news_content'=>$content_array);
        return $total_array;
}



// 국내 주식 뉴스 검색 기능
function search_korea_news($start_num,$category,$content){
    $total_array=array();
    // db에 저장된 뉴스 숫자;
    require_once('invest_db.php');
  

    // 카운트만
    $sql = "select * from news_crawling where $category like '%$content%' order by issue desc";
    $result = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($result);


    // 내용
    $sql = "select * from news_crawling where $category like '%$content%' order by issue desc limit $start_num,15";
    $result = mysqli_query($conn, $sql);
    $content_array=array();
    while($row = mysqli_fetch_array($result)) {
        $tmp_array=array('seq'=>$row['seq'],'title'=>$row['title'],'imgPath'=>$row['imgPath'],
        'urlPath'=>$row['urlPath'],'issue'=>$row['issue'],'newspaper'=>$row['newspaper']);    
        array_push($content_array,$tmp_array);
    }
        mysqli_close($conn);
        
        $total_array=array('count' => $count,'news_content'=>$content_array);
        return $total_array;
}


function db_count($conn){
   
    $sql = "select * from news_crawling";
    $result = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($result);
    return  $count;
}
function json_return($data){

    return $data=array('result' => $data);
   
}




// 즐겨 찾기 누를때마다 검사 
function click_favorite($seq,$id){
    require_once('invest_db.php');
 
    $select = "select * from member_news_favorite where id='$id' and seq=$seq";
     $result = mysqli_query($conn, $select);
     $count =mysqli_num_rows($result);
     mysqli_close($conn);
     if($count==1){
        $_value=click_favorite_del($seq,$id);
        return $_value;
     }elseif($count==0){
        $_value=click_favorite_add($seq,$id);
        return $_value;
     }else{
        return "click_favorite_error";
     }
}


// 뉴스 즐겨 찾기 추가 
function click_favorite_add($seq,$id){

    require('invest_db.php');
    $sql="insert into member_news_favorite(id,seq) value ('$id',$seq)";

    $result = mysqli_query($conn, $sql);
    mysqli_close($conn);
    if($result === false){
        return "insert_news_favorite_error";
    }else{
        return "add";
    }
}


// 뉴스 즐겨 찾기 삭제
function click_favorite_del($seq,$id){
    require('invest_db.php');
    $select_query="delete from member_news_favorite where id='$id' and seq=$seq";

    $result = mysqli_query($conn, $select_query);
    mysqli_close($conn);
    if($result === false){
        return "delete_news_favorite_error";
    }else{
        return "del";
    }
    
}


// 유저가 즐겨찾기한 전체 뉴스 조회
function news_favorite_list($id){
    require_once('invest_db.php');
    $select = "select * from member_news_favorite where id='$id'";
     $result = mysqli_query($conn, $select);
     $content_array=array();
     while($row = mysqli_fetch_array($result)) {
        $tmp_array=$row['seq'];
        array_push($content_array,$tmp_array);
    }
    mysqli_close($conn);
    return  $content_array;
}

function insert_stock_info($id,$content,$importance){
    echo $id,$content,$importance;
    require_once('invest_db.php');
    $sql = "insert into stock_info(id,content,importance,date_time) value ('$id','$content','$importance',now())";
    $result = mysqli_query($conn, $sql);
    if($result === false){
        return "add_insert_stock_info_error";
    }else{
        return "add";
    }
}

?>