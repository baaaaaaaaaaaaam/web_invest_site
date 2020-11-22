var logout = document.getElementById('logout');

logout.onclick = function() {
  '<?php echo  session_destory(); ?>';
  location.href="http://192.168.0.5/web/";

}

//세션이 널 인경우 로그인 페이지로 이동
var login_plain=document.getElementById("login_plain");
if (login_plain.innerText==""){
    location.href="http://192.168.0.5/web/";
}



$("#main").click(function(){
    location.href="http://192.168.0.5/web/main.html";
  })
  

$("#info_invest_stock").click(function(){
  location.href="http://192.168.0.5/web/invest_info_board.html";
})

$("#info_news_korea").click(function(){
    location.href="http://192.168.0.5/web/korea_news_board.html";
  })

document.getElementById('finance_analysis').onclick = function(){
  location.href="http://192.168.0.5/web/finance_analysis.html";
}