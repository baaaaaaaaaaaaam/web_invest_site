$(document).ready(function() {
    getdata('daum_kospi')
    getdata('daum_kospi200')
    getdata('daum_kosdaq')
 });

async function getdata(name){
    arr=[];
    await $.ajax({
        type:"GET",
        url:"http://192.168.0.5/web/request.php",
        data : {request:'retention_rate',retention_rate_field:name},
     
        // dataType : "text/plain",
        success: function(result){
           //  console.log(result);
            const obj = JSON.parse(result);
           
            var return_value=obj

            var tmp_date = []
            var tmp_ant = []
            var tmp_organ = []
            var tmp_foreigner = []
            for (var i = 0; i < return_value.length; i++) {
                
                var _date=return_value[i]['date']
                var _ant=Number(return_value[i]['ant'])
                var _organ=Number(return_value[i]['organ'])
                var _foreigner=Number(return_value[i]['foreigner'])
                tmp_date.push(_date)
                tmp_ant.push(_ant)
                tmp_organ.push(_organ)
                tmp_foreigner.push(_foreigner)
               
            }
        
            arr.push(tmp_date)
            arr.push(tmp_ant)
            arr.push(tmp_organ)
            arr.push(tmp_foreigner)
            make_chart(arr,name)  
        },
        error: function(xhr, status, error) {
            console.log(error);
        }  
    });

    return arr
}
function make_chart(value,name)  {
      
    var chart = {
        type: 'bar'
     };
     var title = {
        text: name
     };   
     var xAxis = {
        categories: value[0]
     };
     var credits = {
        enabled: false
     };
     var series= [{
              name: '개인',
              data: value[1]
          }, {
              name: '기관',
              data: value[2]
          }, {
              name: '외국인',
              data: value[3]
        }
     ];     
     var chart_name="#"+name+"_round_chart"
     var json = {};   
     json.chart = chart; 
     json.title = title; 
     json.xAxis = xAxis;
     json.credits = credits;
     json.series = series;
     $(chart_name).highcharts(json); 
}
