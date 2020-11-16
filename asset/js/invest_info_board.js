
// 드랍박스 눌렀을때 
$('#dropbtn').click(function(){
    if($('#droplist').hasClass('show')){
        $('#droplist').removeClass('show');
    }else{
        $('#droplist').addClass('show');
    }
   
})



function drop_content(content_id){
    var content_array=["최상","상","중","하","최하"]
    var content_num=content_id.substring(12);
    
    $('#dropbtn').text(content_array[content_num]);
    $('#droplist').removeClass('show');
}



document.getElementById('searching-btn').onclick=function(){
    createSticky();
    
}

var stickiesArray = getStickiesArray(); 
for (var i=0; i<stickiesArray.length; i++) { 
    var key = stickiesArray[i]; 
    var value = JSON.parse(localStorage[key]); 
    addStickyToDOM(key, value); 
} 

function getStickiesArray() { 
    var stickiesArray = localStorage.getItem("stickiesArray"); 
    if (!stickiesArray) { 
        stickiesArray = []; 
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray)); 
    } else { 
        stickiesArray = JSON.parse(stickiesArray); 
    } 
     
    return stickiesArray; 
} 

function createSticky() {  
    var content = document.getElementsByClassName("input_text")[0].value; 
    var importance = document.getElementById("dropbtn").innerText; 
    var user_name = document.getElementById('login_plain').innerText;

    if(importance=="중요도"){
        alert("중요도를 선택하세요");
    }else{
        //  db에 저장
        $.ajax({
            type:"GET",
            url:"http://192.168.0.5/web/request.php",
            data : {request:'insert_stock_info',content:content,importance:importance,id:user_name},
            
            // dataType : "text/plain",
            success: function(result){
            //  console.log(result);
                const obj = JSON.parse(result);
                console.log(obj)
              
            },
            error: function(xhr, status, error) {
                console.log(error);
            }  
        });
    }
     
    // json으로 value와 color가 유지되는 스티키 노트를 생성 
    // var currentDate = new Date(); 

    // var key = "sticky_"+currentDate.getTime(); 
    // var stickyObj = { 
    //         "value" : value, 
    //         "color" : color 
    // }; 
    // localStorage.setItem(key, JSON.stringify(stickyObj)); 
     
    // // 새 스티키 노트를 배열에 추가하고 localStorage에 저장된 notes 배열을 업데이트함 
    // stickiesArray.push(key); 
    // localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray)); 
     
    // addStickyToDOM(key, stickyObj); 
} 

function deleteSticky(e) { 
    var key = e.target.id; 
    if (e.target.tagName.toLowerCase() == "span") { 
        key = e.target.parentNode.id; 
    } 
     
    var stickiesArray = getStickiesArray(); 
    if (stickiesArray) { 
        for (var i=0; i<stickiesArray.length; i++) { 
            if (key == stickiesArray[i]) { 
                stickiesArray.splice(i, 1); 
            } 
        } 
         
        localStorage.removeItem(key); 
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray)); 
        removeStickyFromDOM(key); 
    } 
} 

function addStickyToDOM(key, stickyObj) { 
    var stickies = document.getElementById("stickies"); 
    var sticky = document.createElement("li"); 
     
    // 스티키 배열에 저장된 아이디로 찾을 수 있게 id속성에 key값을 지정 
    sticky.setAttribute("id", key); 
     
    // stickyObj의 color를 이용해서 CSS 배경색 스타일을 지정 
    sticky.style.backgroundColor = stickyObj.color; 
     
    var span = document.createElement("span"); 
    span.setAttribute("class", "sticky"); 
     
    // stickyObj의 value를 이용해서 스티키 노트의 내용을 할당 
    span.innerHTML = stickyObj.value; 
     
    // 모든 것을 DOM에 추가 
    sticky.appendChild(span); 
    stickies.appendChild(sticky); 
     
    // 스티키 노트를 클릭하면 삭제되도록 이벤트 리스너를 붙임 
    sticky.onclick = deleteSticky; 
} 

function removeStickyFromDOM(key) { 
    var sticky = document.getElementById(key); 
    sticky.parentNode.removeChild(sticky); 
} 

function clearStickyNotes() { 
    localStorage.clear(); 
    var stickyList = document.getElementById("stickies"); 
    var stickies = stickyList.childNodes; 
    for (var i=stickies.length-1; i>=0; i--) { 
        stickyList.removeChild(stickies[i]); 
    } 
     
    // 스티키 배열을 초기화 
    var stickiesArray = getStickiesArray(); 
}