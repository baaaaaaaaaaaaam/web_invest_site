var logout = document.getElementById('logout');

logout.onclick = function() {
  '<?php echo  session_destory(); ?>';
  location.href="http://54.180.155.181/";

}

//세션이 널 인경우 로그인 페이지로 이동
var login_plain=document.getElementById("login_plain");
if (login_plain.innerText==""){
    location.href="http://54.180.155.181/";
}



$("#main").click(function(){
    location.href="http://54.180.155.181/main.html";
  })
  

$("#info_invest_stock").click(function(){
  location.href="http://54.180.155.181/invest_info_board.html";
})

$("#info_news_korea").click(function(){
    location.href="http://54.180.155.181/korea_news_board.html";
  })

document.getElementById('finance_analysis').onclick = function(){
  location.href="http://54.180.155.181/finance_analysis.html";
}