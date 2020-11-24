$(document).ready(function() {
    init_paging(0)
 });

//  검색에 사용되는 변수
 var category=document.getElementById('dropbtn').innerText
 var content=document.getElementsByClassName('input_text')[0];
 var boolean_search;
// 검색기능
document.getElementById('searching-btn').onclick=function(){

    if(content.value!=""){
        boolean_search=true;
    }else{
        boolean_search=false;
    }
    searching(0,category,content.value);
    // content.value="";
}


function searching(num,category,content){
    var _category;
    if(category=="날자"){
        _category="issue"
    }else if(category=="제목"){
        _category="title"
    }else if(category=="내용"){
        _category="content"
    }
    $.ajax({
        type:"GET",
        url:"http://3.34.136.114/request.php",
        data : {request:'search_finance_analysis',num:num,category:_category,content:content},
        
        // dataType : "text/plain",
        success: function(result){
        //  console.log(result);
            const obj = JSON.parse(result);
            
            
            if(obj.count==0){
                $("#dynamicTbody").empty();
            }else{
                make_list(obj.news_content);
                 make_paging(obj.count,num);
            }
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }  
    });
}

// 드랍박스 눌렀을때 
$('#dropbtn').click(function(){
    if($('#droplist').hasClass('show')){
        $('#droplist').removeClass('show');
    }else{
        $('#droplist').addClass('show');
    }
   
})
// 제목 누를경우
$('#drop_content1').click(function(){
    var tmp_name=$('#drop_content1').text()
    $('#dropbtn').text(tmp_name);
    $('#droplist').removeClass('show');
})
// 제목 누를경우
$('#drop_content2').click(function(){
    var tmp_name=$('#drop_content2').text()
    $('#dropbtn').text(tmp_name);
    $('#droplist').removeClass('show');
})

$('#drop_content3').click(function(){
    var tmp_name=$('#drop_content3').text()
    $('#dropbtn').text(tmp_name);
    $('#droplist').removeClass('show');
})


function init_paging(start_num){

    $.ajax({
        type:"GET",
        url:"http://3.34.136.114/request.php",
        data : {request:'finance_analysis',num:start_num},
        
        // dataType : "text/plain",
        success: function(result){
        //  console.log(result);
            const obj = JSON.parse(result);
            make_list(obj.finance_analysis);
            make_paging(obj.count,start_num);
        },
        error: function(xhr, status, error) {
            console.log(error);
        }  
    });
}


  
  
  // 메인페이지에서 크롤링을 테이블로 보여줌
  async function make_list(obj){
    // news_crawling 테이블의 seq 와 news_favorite 테이블에서 id를 로그인 한 유저의 id로 검색하여 seq를 받아오 비교한다.
    // news_favorite테이블에 where id 로 검사하기
    // login_user_news_favorite
    var user_name = document.getElementById('login_plain').innerText;
    var seq_list;

    // 해당 유저의 favorite list를 불러온다 
    await $.ajax({
        type:"GET",
        url:"http://3.34.136.114/request.php",
        data : {request:'finance_analysis_favorite_list',id:user_name},
        
        // dataType : "text/plain",
        success: function(result){
        //  console.log(result);
             seq_list = JSON.parse(result);
          
        },
        error: function(xhr, status, error) {
            console.log(error);
        }  
    });


    // 유저의favorite list와 불러온 news_crawling seq를 비교하여 같은값일 경우 tmp_check_bool=true , 다른값일경우 tmp_check_bool=false처리한다.  
        $("#dynamicTbody").empty();
    var html="";
    
    for(var i=0;i<obj.length;i++){
        var tmp_check_bool=false;
        for(var j=0;j<seq_list.length;j++){
            if(seq_list[j]==obj[i].seq){
                tmp_check_bool=true;
            }
        }
        
      html += '<tr>';
      if(tmp_check_bool){
        html += '<td><button id="seq_'+obj[i].seq+'" onClick="click_favorite(this.id)" style="border:none"><img src="./asset/image/favorite.png" height="30" width="30"></button></td>';
      }else{
        html += '<td><button id="seq_'+obj[i].seq+'" onClick="click_favorite(this.id)" style="border:none"><img src="./asset/image/un_favorite.png" height="30" width="30"></button></td>';
      }
      
      html += '<td><a class="href_link" href="'+obj[i].url+'" target="_black">'+obj[i].title+'</a>'+'</td>';
      html +=  '<td><a class="href_link" href="'+obj[i].url+'" target="_black">'+obj[i].content+'</a>'+'</td>';
      html += '<td>'+obj[i].issue+'</td>';
      html += '</tr>';	    
    }
    $("#dynamicTbody").append(html);
  }


  function click_favorite(clicked_id){
    //   seq 번호 가져오기
    var seq=clicked_id.substring(4)
    // 즐겨찾기 누른유저 아이디 가져오기
    var name = document.getElementById('login_plain').innerText;

    console.log(seq,name);
    // db에 전달하기
    
    if(seq=="" || name==""){
        // 둘중 하나라도 값이 없을경우 동작하지않음
        alert("오류")
    }else{
        // 디비에 
        $.ajax({
            type:"GET",
            url:"http://3.34.136.114/request.php",
            data : {request:'click_favorite_finance_analysis',seq_num:seq,id:name},
            
            // dataType : "text/plain",
            success: function(result){
            //  console.log(result);
                const obj = JSON.parse(result);
                // db전달 성공시 이미지 변경하기
                if(obj.result=="add"){
                    var a=document.getElementById(clicked_id).childNodes[0]
                    a.src="./asset/image/favorite.png";
                }else if(obj.result=="del"){
                    var a=document.getElementById(clicked_id).childNodes[0]
                    a.src="./asset/image/un_favorite.png";
                }
                else{
                    alert("오류")
                }
                
            },
            error: function(xhr, status, error) {
                console.log(error);
            }  
        });
    }
    
  }



function make_paging(count,start_num){
    $(".pagination").empty();
    // 총 페이지 수 ( count/15)
    var total_page_count;
    if(count%15==0){
        tmp_total_page_count=count/15;
    }else{
        tmp_total_page_count=count/15+1;
    }
    total_page_count=Math.floor(tmp_total_page_count)
    // paging_range 은 0부터 시작한다,  paging_range 0일때 1페이지 임으로 +15하면  paging_range= 0 +15 /15 하면 1이된다
    var paging_range;
    if(start_num==0){
        paging_range=1;
    }else{
        paging_range=start_num/15;
    }
  
    var current_page=start_num/15+1;

    //시작 페이지 계산
    var start_page ;
    var end_page;
    // 현재 페이지가 10 보다 작으면 시작은 1이고 end_page는 10 이다
    // 반대로 현재페이지가 11이면 11/10 ==> 1  , 1*10 +1 이된다 ,  만약 현재 페이지가 47이면 47/10 ==> 4*10+1
    if( paging_range<10){
        start_page=1
    }else{
        start_page=Math.floor(paging_range/10)*10+1
    }
    // 종료페이지 계산
    end_page=start_page+9;
    if(end_page>total_page_count){
        end_page=total_page_count
    }

    // 페이징 관리에 active 산출
    if(current_page%10==0){
        active_num=11;
    }else{
        active_num=current_page%10+1;
    }
   

    $('.pagination').append("<li><a class=\"prev\">Previous</a></li>");
    for(var i=start_page; i<=end_page; i++){
  
        $('.pagination').append("<li><a class=\"paging_number\">"+i+"</a></li>");
        //위에서 만든 구조에 속성을 만듬
        //li:nth-child(2) li 들중 2번째 일때 active 클래스를 추가해주겟다.
        $('.pagination li:nth-child(' +active_num + ')').addClass("active");
        $('.pagination a').addClass("pagination-link");
    }
  $('.pagination').append("<li><a class=\"next\">Next</a></li>");


    // 페이지 버튼 누를때 이벤트
    $('.paging_number').click(function(e){
        e.preventDefault();
        var num=jQuery(this).text();
        $('.pagination').empty()
        num = num*15-15
        if(boolean_search){
            searching(num,category,content.value);
        }else{
            init_paging(num)
        }
    })

  $('.prev').click('.prev',function(e){
    e.preventDefault();
    $('.pagination li:first-child').removeClass("active");
        if (start_page==1){
            // 아무 일도 일어나지 않는다
        }else{
            start_page=start_page-10;
            start_page-=1;
            start_page*=15;
            $('.pagination').empty()
            init_paging(start_page)
            
        }
    });

    $('.next').click('.next',function(e){
        e.preventDefault();
        $('.pagination li:first-child').removeClass("active");
            if(end_page%10!=0){
                // 만약 46개 페이지중 end_page가  41,42,43,44,45,46 일경우 next는 동작하지 않는다
            }else if(end_page==total_page_count){
                // 만약 50개의 페이지중 end_page가 50일경우 일경우 next가 동작하지 않는다  
            }else{
                // 만약 51개 페이지중 end_page가 50 일경우 동작
                $('.pagination').empty()
                init_paging(end_page*15)
                
            }
        });
        
}


