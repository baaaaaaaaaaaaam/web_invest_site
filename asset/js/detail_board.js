$(document).ready(function() {
    getinfo()
 });

async function getinfo(){
    var _seq;
     _seq = await getParam('seq');
     await getDate(_seq)
}


function getParam(sname) {

    var params = location.search.substr(location.search.indexOf("?") + 1);

    var sval = "";

    params = params.split("&");

    for (var i = 0; i < params.length; i++) {

        temp = params[i].split("=");

        if ([temp[0]] == sname) { sval = temp[1]; }

    }

    return sval;

}

function getDate(_seq){
    $.ajax({
        type:"GET",
        url:"http://192.168.0.10/request.php",
        data : {request:'select_stock_info',seq:_seq},
        
        // dataType : "text/plain",
        success: function(result){
        //  console.log(result);
            const obj = JSON.parse(result);

            console.log(obj)
            // 난이도
            document.getElementById('importance').innerHTML=obj.result.importance
            document.getElementById('title').innerHTML=obj.result.title
            document.getElementById('date_time').innerHTML=obj.result.date_time
            document.getElementById('writer').innerHTML=obj.result.id
            // 제목
            // 작성자
            // 시간
            // 내용 
            var content=document.getElementsByClassName('view_summernote')[0]
            content.innerHTML=obj.result.content
           
            
           
        },
        error: function(xhr, status, error) {
            console.log(error);
        }  
    });
}
