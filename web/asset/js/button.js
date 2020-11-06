function login_click() {
    var input_id=document.getElementById("id").value;
    var input_pw=document.getElementById("pw").value;

    $.ajax({
        type:"GET",
        url:"http://192.168.0.5/web/request.php",
        data : {request:'login',id:input_id,pw:input_pw},
        
        // dataType : "text/plain",
        success: function(result){
           //  console.log(result);
            const obj = JSON.parse(result);
           
            var return_value=obj.result
            if(return_value=="ok"){
                console.log("오케오케이");
                location.href="http://192.168.0.5/web/main.html";
            }else{
                document.getElementById("caution").innerText = '';
                document.getElementById("caution").innerText = '아이디와 패스워드를 다시확인하세요';
            }
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }  
    });
}