
// main 페이지에서 뉴스 크롤링
$.ajax({
  type:"GET",
  url:"http://192.168.0.10/request.php",
  data : {request:'main_get_news'},
  
  // dataType : "text/plain",
  success: function(result){
     //  console.log(result);
      const obj = JSON.parse(result);
     console.log(obj);
      make_list(obj);
     
  },
  error: function(xhr, status, error) {
      console.log(error);
  }  
});



// 메인페이지에서 크롤링을 테이블로 보여줌
function make_list(obj){
  var html="";
  for(var i=0;i<obj.length;i++){
    if((obj[i].title).length>33){
      obj[i].title=(obj[i].title).substr(0,30)+"...";
    }
    html += '<tr>';
    html += '<td>'+obj[i].newspaper+'</td>';
    html += '<td>'+'<a class="href_link" href="'+obj[i].urlPath+'" target="_black">'+obj[i].title+'</a>'+'</td>';
    html += '<td>'+obj[i].issue+'</td>';
  
    html += '</tr>';	            
             
   
  }
  $("#dynamicTbody").empty();
  $("#dynamicTbody").append(html);
}