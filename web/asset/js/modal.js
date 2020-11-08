var modal = document.getElementById('myModal');
 

// 인증 및 경고 , 타이머 내용 찍는 공간
var m_caution = document.getElementById('m-caution');
m_caution.style.display="none";


var e_mail_auth_btn = document.getElementById('m-e_mail_auth_btn');
var e_mail_auth = document.getElementById('m-e_mail_auth');

e_mail_auth_btn.style.display="none";
e_mail_auth.style.display="none";
// Get the button that opens the modal
var btn = document.getElementById("signup");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];                                          

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


