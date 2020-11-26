window.onload = function () {
   
    draw_char('daum_kospi')
    draw_char('daum_kospi200')
    draw_char('daum_kosdaq')
    
}

 function draw_char(name){
    google.charts.load('current', {'packages':['corechart']});
   google.charts.setOnLoadCallback(drawChart);
  
     async function drawChart() {
            var t=0;
            var arr=[]
            await $.ajax({
                type:"GET",
                url:"http://192.168.0.10/request.php",
                data : {request:'stock_index',stock_index_field:name},
             
                // dataType : "text/plain",
                success: function(result){
                   //  console.log(result);
                    const obj = JSON.parse(result);
                   
                    var return_value=obj
                  

                    console.log(return_value[0]['date'],return_value.length);

                    var tmp_arr = new Array(return_value.length+1);
                    tmp_arr[0] = new Array('date','point');
                    for (var i = 0; i < return_value.length; i++) {
                        var j=1+i;
                        tmp_arr[j] = new Array(return_value[i]['date'],Number(return_value[i]['point']));
                    }
                    
                    arr=tmp_arr
                },
                error: function(xhr, status, error) {
                    console.log(error);
                }  
            });
           
            var data = google.visualization.arrayToDataTable(arr)

          var options = {
            title: name,
            curveType: 'function',
            legend: { position: 'none'} ,
            backgroundColor: "transparent",
            vAxis: {title: "지수",},
            hAxis: {title: "날짜",textPosition: 'none'},
            fontSize: 14,
            colors: ['#fc0804']
          };
          
          var char_name = name + "_line_chart";
        
          var chart = new google.visualization.LineChart(document.getElementById(char_name));
  
          chart.draw(data, options);
        }

}
