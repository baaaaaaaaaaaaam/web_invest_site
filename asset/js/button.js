



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
                location.href="http://192.168.0.5/web/main.html";
            }else if (return_value=="not permittion"){
                alert("승인대기중 입니다");
                
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


/////////////////////////////////////////////////

// 아이디 중복 체크 
var bool_check_id=false;
// 패스워드 중복체크 
var bool_check_pw=false;
// 이메일 체크 
var bool_check_email=false;

// 에러나 확인 메시지표시 
var m_caution = document.getElementById('m-caution');

// 회원가입할때 입력할 아이디 
var m_id=document.getElementById("m-id");


// 비밀번호 체크에서 포커스 벗어날경우 비밀번호와 같은지 확인
var m_pw = document.getElementById('m-pw');

var m_check_pw = document.getElementById('m-check_pw');

// 아이디 중복체크 버튼
var m_duplicate_check_id_btn =document.getElementById('duplicate_check_id_btn');


// 이메일주소 입력 
var m_email=document.getElementById("m-email");

// 이메일 주소로 인증번호를 보내는 버튼

var  m_email_btn = document.getElementById('m-email_btn');

// 이메일로 받은 난수를 입력하는공간 
var e_mail_auth = document.getElementById('m-e_mail_auth');

// 이메일 인증 확인버튼
var e_mail_auth_btn = document.getElementById('m-e_mail_auth_btn');

// php에서 만든 랜덤숫자
var rand_email_value;


// 시간 체크를 계속 진행할지여부 
var check_bool =true;


// 초기 세팅값
function setting_init(){
    bool_check_id=false;
    bool_check_pw=false;
    bool_check_email=false;
    m_id.value='';
    m_id.disabled=false;
    m_pw.value='';
    m_check_pw.value='';
    m_email.value='';
    check_bool=true;
    m_id.style.color="white";
    m_caution.value="";
    m_caution.style.display="none";
    e_mail_auth_btn.style.display="none";
    e_mail_auth.style.display="none";
    m_email_btn.style.display="block"
    m_duplicate_check_id_btn.style.display="block";
    m_email.disabled=false;
    e_mail_auth.disabled=false;
}

function duplicate_check_id(){

   
    
    
    $.ajax({
        type:"GET",
        url:"http://192.168.0.5/web/request.php",
        data : {request:'duplicate_check_id',id:m_id.value},
        
        // dataType : "text/plain",
        success: function(result){
           //  console.log(result);
            const obj = JSON.parse(result);
           
            var return_value=obj.result
            m_caution.style.display="block";
            if (return_value =="ok"){
                m_caution.innerText='';
                m_caution.innerText='사용 가능한 아이디 입니다.';
                // input field 클릭안됨
                m_id.disabled=true;
                m_id.style.color="green";
                m_duplicate_check_id_btn.style.display="none";
                bool_check_id=true;
            }else if (return_value=="no"){
                m_caution.innerText='';
                m_caution.innerText='이미 존재하는 아이디 입니다.';
            }
            
       
        },
        error: function(xhr, status, error) {
            console.log(error);
        }  
    });

}

// 패스워드확인에서 포커스가빠질경우 패스워드와 패스워드확인을 진행한다.
m_check_pw.onblur = function(){

    m_caution.style.display="block";
    if( (m_pw.value).length>=4 && m_pw.value == m_check_pw.value){
        m_caution.innerText="비밀번호가 일치합니다."
        bool_check_pw=true;
    }else{
        m_caution.innerText="비밀번호가 일치하지 않습니다."
    }

}





// 회워가입할때 이메일 체크하기 
function check_email(){
    // 이메일 양식 체크
    return_value=reg_email(m_email.value)

    if(return_value){
        // 양식에 맞으면 전송
        send_mail();
        email_time_thread();
        check_bool=true;
        
        e_mail_auth_btn.style.display="block";
        e_mail_auth.style.display="block";
        m_email_btn.style.display="none"

    }else{
        // 맞지 않으면 양식 재검사 요청
        m_email.innerText="";
        m_caution.style.display="block"
        m_caution.innerText='이메일 양식에 맞지 않습니다.';
    }
}
// 이메일 양식 체크 
function reg_email(email){
    var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if(!reg_email.test(email)) {                            
         return false;         
    }                            
    else {                       
         return true;         

    }               
}


function send_mail(){
    $.ajax({
        type:"GET",
        url:"http://192.168.0.5/web/request.php",
        data : {request:'send_mail',email_address:m_email.value},
        
        // dataType : "text/plain",
        success: function(result){
           //  console.log(result);
            const obj = JSON.parse(result);
           
            // php에서 전송한 난수 
            //사용자가 입력한 값과 비교할 것임
            rand_email_value=obj.result
           
            
        },
        error: function(xhr, status, error) {
            console.log(error);
        }  
    });
}
// 이메일 시간 체크 스레드 
function email_time_thread(){
    m_caution.innerText="";
    var time=180;
    var min = "";
    var sec = "";
    var x = setInterval(function(){
        if(!check_bool || time <0 ){
            m_caution.innerTex="시간초과 !!"
            clearInterval(x)
        }else{
            min = parseInt(time/60);
            sec=time%60;
            m_caution.style.display="block";
            m_caution.innerText=min+" 분 "+sec+" 초 ";
            time--;
        }
      
     

    },1000);
    
};

function auth_email(){
    // 타이머스레드가 멈추도록 하는 변수 
    check_bool=false;
    // 인증 확인 버튼 누를경우 서버에서 보낸 난수와 사용자가 입력한 난수가 같은지 다른 지 체크하여 
    // 다를 경우 인증 버튼 활성화 , 인증 확인, 인증 칸 비활성화
    if(rand_email_value==e_mail_auth.value){
        m_caution.innerText="이메일 인증 완료";
        m_email.disabled=true;
        e_mail_auth.disabled=true;
        bool_check_email=true;
    }else{
        e_mail_auth_btn.style.display="none";
        e_mail_auth.style.display="none";
        m_email_btn.style.display="block"
        m_caution.innerText="잘못입력하였습니다. 다시 시도해주세요.";
    }
 
}


function enroll(){
    if(bool_check_id){
        if(bool_check_pw){
            if(bool_check_email){
                $.ajax({
                    type:"GET",
                    url:"http://192.168.0.5/web/request.php",
                    data : {request:'enroll',id:m_id.value,pw:m_pw.value,email_address:m_email.value},
                    
                    success: function(result){
                        const obj = JSON.parse(result);
                       
                        // php에서 전송한 난수 
                        //사용자가 입력한 값과 비교할 것임
                        var result_value=obj.result
                        if(result_value=="ok"){
                            m_caution.innerText="회원 가입 성공 ~~~";
                            modal.style.display = "none";
                            setting_init();
                        }else if(result_value=="no"){
                            m_caution.innerText="회원 가입 실패 ㅅㅂ";
                        }
                       
                      
                        
                    },
                    error: function(xhr, status, error) {
                        console.log(error);
                    }  
                });
            }else if(!bool_check_email){
                m_caution.innerText="이메일 인증을 해주세요.";
            }
        }else if(!bool_check_pw){
            m_caution.innerText="패스워드가 일치하지 않습니다.";
        }
    }else if(!bool_check_id){
        m_caution.innerText="아이디 중복체크 해주세요 .";
    }
}
