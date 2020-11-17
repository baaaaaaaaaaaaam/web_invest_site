

$(document).ready(function() {
    init_paging(0)
 });

//  유저아이디
 var _user_name = document.getElementById('login_plain').innerText;
// 중요도
 var importance_array=["최상","상","중","하","최하"]
function init_paging(start_num){
    //  db에 저장
    $.ajax({
        type:"GET",
        url:"http://192.168.0.5/web/request.php",
        data : {request:'stock_info_list',num:start_num},
        
        // dataType : "text/plain",
        success: function(result){
        //  console.log(result);
            const obj = JSON.parse(result);
            
            console.log(obj)
                make_list(obj.stock_info);
                make_paging(obj.count,start_num);

               
         
          
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
        $('#droplist').removeClass('z-index-2')
    }else{
        $('#droplist').addClass('show');
        $('#droplist').addClass('z-index-2')
    }
   
})



function drop_content(content_id){
   
    var content_num=content_id.substring(12);
    
    $('#dropbtn').text(importance_array[content_num]);
    $('#droplist').removeClass('show');
}



document.getElementById('searching-btn').onclick=function(){

    createSticky();
    
}

var stickiesArray = getStickiesArray(); 
for (var i=0; i<stickiesArray.length; i++) { 
    var key = stickiesArray[i]; 
    var value = JSON.parse(localStorage[key]); 
    addStickyToDOM(key, value); 
} 

function getStickiesArray() { 
    var stickiesArray = localStorage.getItem("stickiesArray"); 
    if (!stickiesArray) { 
        stickiesArray = []; 
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray)); 
    } else { 
        stickiesArray = JSON.parse(stickiesArray); 
    } 
     
    return stickiesArray; 
} 

function createSticky() {  
    var _content = document.getElementsByClassName("input_text")[0]; 
    var _importance = document.getElementById("dropbtn").innerText; 
  

    if(_importance=="중요도"){
        alert("중요도를 선택하세요");
    }else{
        //  db에 저장
        $.ajax({
            type:"GET",
            url:"http://192.168.0.5/web/request.php",
            data : {request:'insert_stock_info',content:_content.value,importance:_importance,id:_user_name},
            
            // dataType : "text/plain",
            success: function(result){
            //  console.log(result);
                const obj = JSON.parse(result);
                
                if(obj.result=="stock_info_insert_error"){
                    alter("저장되지않았습니다")
                }else{
                    make_list(obj.result.stock_info);
                    make_paging(obj.result.count,0);
                    _content.value="";
                    
                }
              
            },
            error: function(xhr, status, error) {
                console.log(error);
            }  
        });
    }

} 

function deleteSticky(e) { 

    var result = confirm("정말 삭제하시겠습니까?");
    if(result){
        var _key = e.target.id; 
        console.log(_key,_user_name)
        $.ajax({
            type:"GET",
            url:"http://192.168.0.5/web/request.php",
            data : {request:'delete_stock_info',key:_key,id:_user_name},
            
            // dataType : "text/plain",
            success: function(result){
            //  console.log(result);
                const obj = JSON.parse(result);
                var sticky = document.getElementById(_key); 
                sticky.parentNode.removeChild(sticky); 
                if(obj.result=="stock_info_insert_error"){
                    alter("저장되지않았습니다")
                }else{
                    make_list(obj.result.stock_info);
                    make_paging(obj.result.count,0);
                    _content.value="";
                    
                }
              
            },
            error: function(xhr, status, error) {
                console.log(error);
            }  
        });
    }else{
        
    }
    
    

  
} 

function make_list(object) {
   
    $("#stickies").empty();
    var stickies = document.getElementById("stickies"); 
    for(var i=0; i<object.length;i++){
        
        // close 버튼 활성화 조건 검사 ( 작성자와 로그인한 유저의 id가같으면 true , 다르면 false)
        var check_close_btn;
        if(_user_name==object[i].id){
            check_close_btn=true;
        }else{
            check_close_btn=false;
        }

        var color;
        if(object[i].importance=="최상"){
            color="#31513F"
        }else if(object[i].importance=="상"){
            color="#6F557E"
        }else if(object[i].importance=="중"){
            color="#3B5064"
        }else if(object[i].importance=="하"){
            color="#9AAFC8"
        }else if(object[i].importance=="최하"){
            color="#BE9AB6"
        }
        var sticky = document.createElement("li"); 
        // 스티키 배열에 저장된 아이디로 찾을 수 있게 id속성에 key값을 지정 
        sticky.setAttribute("id", object[i].date_time); 
            
        // stickyObj의 color를 이용해서 CSS 배경색 스타일을 지정 
        sticky.style.backgroundColor = color; 


        // 작성자 / 아이디 / close 버튼 
        var top = document.createElement("div"); 
        top.setAttribute("class", "top");


        var writter = document.createElement("span"); 
        var writter_id = document.createElement("span");
        var close = document.createElement("span");
        close.setAttribute("class", "close"); 
        close.setAttribute("id", object[i].date_time); 

         // 내용 부분
        var center = document.createElement("div"); 
        center.setAttribute("class", "center");
        var span = document.createElement("span"); 
        span.setAttribute("class", "sticky"); 

        // 작성 시간 / 시간 부분
        var bottom = document.createElement("div"); 
        bottom.setAttribute("class", "bottom");
        var written_time = document.createElement("span"); 
        var time = document.createElement("span"); 
        
        // stickyObj의 value를 이용해서 스티키 노트의 내용을 할당 
        writter.innerHTML = "작성자: "
        writter_id.innerHTML=object[i].id;
        close.innerHTML="&times;"
        span.innerHTML = object[i].content; 
        written_time.innerHTML="작성시간 : "
        time.innerHTML=object[i].date_time

        // 모든 것을 DOM에 추가 
        top.appendChild(writter); 
        top.appendChild(writter_id); 

        // close 버튼 활성화 조건문
        if(check_close_btn){
            top.appendChild(close); 
        }
      
        center.appendChild(span); 
        bottom.appendChild(written_time); 
        bottom.appendChild(time); 

        sticky.appendChild(top); 
        sticky.appendChild(center); 
        sticky.appendChild(bottom); 
        
        stickies.appendChild(sticky); 
        
        // 스티키 노트를 클릭하면 삭제되도록 이벤트 리스너를 붙임 
        close.onclick = deleteSticky; 
    }
} 












// 페이징

function make_paging(count,start_num){
    $(".pagination").empty();
    // 총 페이지 수 ( count/9)
    var total_page_count;
    if(count%9==0){
        tmp_total_page_count=count/9;
    }else{
        tmp_total_page_count=count/9+1;
    }
    total_page_count=Math.floor(tmp_total_page_count)
    // paging_range 은 0부터 시작한다,  paging_range 0일때 1페이지 임으로 +9하면  paging_range= 0 +9 /9 하면 1이된다
    var paging_range;
    if(start_num==0){
        paging_range=1;
    }else{
        paging_range=start_num/9;
    }
  
    var current_page=start_num/9+1;

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
        num = num*9-9
        init_paging(num)
    })

  $('.prev').click('.prev',function(e){
    e.preventDefault();
    $('.pagination li:first-child').removeClass("active");
        if (start_page==1){
            // 아무 일도 일어나지 않는다
        }else{
            start_page=start_page-10;
            start_page-=1;
            start_page*=9;
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
                init_paging(end_page*9)
                
            }
        });
        
}


