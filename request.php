<?php

include('method.php');

$http_method = $_SERVER["REQUEST_METHOD"];

if($http_method == "GET"){
    $request = $_GET['request'];
}else if($http_method=="POST"){
    $request = $_POST['request'];
}   

//로그인 시도할 경우 id/pw검사하여 count가 1일경우 ok
if ($request === "login") {
    $id = $_GET['id'];
    $pw = $_GET['pw'];
    $count = check_login($id,$pw);
 
    if($count==1){
        $reply=json_return("ok");
        echo json_encode($reply);

        //세션 전달
        $_GET['user_id']=$id;
        include('session.php');
        
    }else if($count==-1){
        $reply=json_return("not permittion");
        echo json_encode($reply);
    }else if($count!=1){
        $reply=json_return("no");
        echo json_encode($reply);
    }
    
}

// 아이디중복 체크 , 같은값이 있으면 1
if($request == 'duplicate_check_id'){
    $id = $_GET['id'];
    $count=duplicate_check_id($id);
    if($count==0){
        $reply=json_return("ok");
        echo json_encode($reply);
        
    }else if($count>0){
        $reply=json_return("no");
        echo json_encode($reply);
    }
}

// 회원강비
if($request === "enroll"){
    $id = $_GET['id'];
    $pw = $_GET['pw'];
    $email_address= $_GET['email_address'];
    $return_value=enroll($id,$pw,$email_address);

    if($return_value=="ok"){
        $reply=json_return("ok");
        echo json_encode($reply);
      
 
    }else{
        $reply=json_return("no");
        echo json_encode($reply);
    }
}




// 코스피 , 코스피200, 코스닥의 지수 비교 
 //stock_index_field 에는 daum_kospi ,daum_kospi200,daum_kosdaq이들어가야한다
if ($request === "stock_index") {  

    $stock_index_field = $_GET['stock_index_field'];
    $value=get_stock_index($stock_index_field);
    echo json_encode($value);

}

// 코스피 , 코스피200, 코스닥의 5일간 기관,개인,외국이 매입 매각 지수 비교
if ($request === 'retention_rate') { 
    
    $retention_rate_field = $_GET['retention_rate_field'];
    $value=get_retention_rate($retention_rate_field);
    echo json_encode($value);

}

// 이메일 인증을 진행하고 , 브라우저로 php에서만든 난수를 보내준다.
if ($request === "send_mail"){

    $email_address= $_GET['email_address'];
    $_GET['address']=$email_address;
    $check =include "send_mail.php";
    $data=array('result' => $check);
    echo json_encode($data);
} 




////////////////////////////////////////////////////국내 뉴스 //////////////////////////////////////////////////////////////

// 메인화면에서 최신뉴스 보여주기
if ($request === "main_get_news"){

    $value=main_get_news();
    echo json_encode($value);
} 
// 한국 뉴스 보여주기
if ($request === "korea_news"){
    $num=$_GET['num'];
    $value=korea_news($num);
    echo json_encode($value);
} 

// 뉴스 즐겨찾기 추가/삭제
if($request === "click_favorite"){
    $seq=$_GET['seq_num'];
    $id=$_GET['id'];
    
 
    $value=click_favorite($seq,$id);
    $return_value=json_return($value);
    echo json_encode($return_value);
}


// 로그인한 유저가 국내 뉴스 정보에 들어갔을때 member_news_favorite 에 조회한다.
if($request === "news_favorite_list"){
    $id=$_GET['id'];
    $return_value=news_favorite_list($id);
    echo json_encode($return_value);
   
}




// 한국 뉴스 검색 결과 보여주기
if ($request === "search_korea_news"){
    $num=$_GET['num'];
    $category=$_GET['category'];
    $content=$_GET['content'];
    $value=search_korea_news($num,$category,$content);
    echo json_encode($value);
} 



////////////////////////////////////////////////////국내 뉴스 //////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////주식 정보 //////////////////////////////////////////////////////////////


// 주식 정보 전체 리스트 요청
if($request === "stock_info_list"){
    $num=$_GET['num'];
    $value=stock_info_list($num);
    echo json_encode($value);
}
// 주식정보기록 입력 


if ($request === "insert_stock_info"){
    $content=$_POST['content'];
    $title=$_POST['title'];
    $importance=$_POST['importance'];
    $id=$_POST['id'];

    if($id==null){

    }else{
        $value=insert_stock_info($id,$content,$importance,$title);
        $return_value=json_return($value);
        echo json_encode($return_value);
    }
    
} 
// 주식정보기록 삭제 
if ($request === "delete_stock_info"){
    $seq=$_GET['seq'];
    $id=$_GET['id'];

    if($id==null){
        
    }else{
        $value=delete_stock_info($id,$seq);
        $return_value=json_return($value);
        echo json_encode($return_value);
    }
} 

//클릭한 주식 내용 불러오기
if ($request === "select_stock_info"){
    $seq=$_GET['seq'];

    if($seq==null){
        
    }else{
        $value=select_stock_info($seq);
        $return_value=json_return($value);
        echo json_encode($return_value);
    }
} 

/////////////////////////////////////////////////////주식 정보 //////////////////////////////////////////////////////////////


//////////////////////////////////////////////// 증권사 기업 분석 ////////////////////////////////////////////////////////////

// 메인화면에서 최신 finance_analysis 보여주기
if ($request === "main_get_finance_analysis"){

    $value=main_get_finance_analysis();
    echo json_encode($value);
} 


// finance_analysis 보여주기
if ($request === "finance_analysis"){
    $num=$_GET['num'];
    $value=finance_analysis($num);
    echo json_encode($value);
} 

// finance_analysis 즐겨찾기 추가/삭제
if($request === "click_favorite_finance_analysis"){
    $seq=$_GET['seq_num'];
    $id=$_GET['id'];
    
 
    $value=click_favorite_finance_analysis($seq,$id);
    $return_value=json_return($value);
    echo json_encode($return_value);
}


// 로그인한 유저가 증권사 기업분석 들어갔을때 member_news_favorite 에 조회한다.
if($request === "finance_analysis_favorite_list"){
    $id=$_GET['id'];
    $return_value=finance_analysis_favorite_list($id);
    echo json_encode($return_value);
   
}




// finance_analysis 검색 결과 보여주기
if ($request === "search_finance_analysis"){
    $num=$_GET['num'];
    $category=$_GET['category'];
    $content=$_GET['content'];
    $value=search_finance_analysis($num,$category,$content);
    echo json_encode($value);
} 





//////////////////////////////////////////////// 증권사 기업 분석 ////////////////////////////////////////////////////////////


//////////////////////////////////////////////// 텍스트 내용 입력 테스트 ////////////////////////////////////////////////////////////

// finance_analysis 검색 결과 보여주기

//////////////////////////////////////////////// 텍스트 내용 입력 테스트 ////////////////////////////////////////////////////////////
?>