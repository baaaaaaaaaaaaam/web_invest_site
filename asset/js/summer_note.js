$(document).ready(function() {
    $('#summernote').summernote({
  toolbar: [
        // [groupName, [list of button]]
        ['fontname', ['fontname']],
        ['fontsize', ['fontsize']],
        ['style', ['bold', 'italic', 'underline','strikethrough', 'clear']],
        ['color', ['forecolor','color']],
        ['table', ['table']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['insert',['picture','link','video']],
        ['view', ['fullscreen', 'help']]
      ],
    fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New','맑은 고딕','궁서','굴림체','굴림','돋음체','바탕체'],
    fontSizes: ['8','9','10','11','12','14','16','18','20','22','24','28','30','36','50','72'],
    height:550,
    disableResizeEditor: true
    });
});



var _user_name = document.getElementById('login_plain').innerText;
// 게시글 등록하기

document.getElementById('submit-btn').onclick=function(){
    var _content = $('#summernote').summernote('code');
    var _title = document.getElementsByClassName("input_text")[0]; 
    var _importance = document.getElementById("dropbtn").innerText; 
  
    if( _content.length!=0){

        if(_title.length!=0 ){

            if(_importance=="중요도"){
                alert("중요도를 선택하세요");
            }else{
                //  db에 저장
                $.ajax({
                    type:"POST",
                    url:"http://54.180.155.181/request.php",
                    data : {request:'insert_stock_info',title:_title.value,content:_content,importance:_importance,id:_user_name},
                    
                    // dataType : "text/plain",
                    success: function(result){
                    //  console.log(result);
                        const obj = JSON.parse(result);
                        
                        if(obj.result=="stock_info_insert_error"){
                            alter("저장되지않았습니다")
                        }else if(obj.result=="ok"){
                            alert("정상 저장되었습니다.")
                            location.href="http://54.180.155.181/invest_info_board.html";
                        }
                      
                    },
                    error: function(xhr, status, error) {
                        console.log(error);
                    }  
                });
            }
        }else{
            alert("제목을 입력하세요")
        }
    }else{
        alert("내용입력하세요")
    }
}




function drop_content(content_id){
   
    var content_num=content_id.substring(12);
    
    $('#dropbtn').text(importance_array[content_num]);
    $('#droplist').removeClass('show');
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

var importance_array=["최상","상","중","하","최하"]
function drop_content(content_id){
   
    var content_num=content_id.substring(12);
    
    $('#dropbtn').text(importance_array[content_num]);
    $('#droplist').removeClass('show');
}


document.getElementById('cancle-btn').onclick=function(){
    location.href="http://54.180.155.181/invest_info_board.html";
}

