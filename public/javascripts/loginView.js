$(document).ready(function() {
	
	var current=0;
	var slide_length = $('.slideshow img').length;
	
	function slide_image(){
		if(current == slide_length-1){
			current = 0;
		}
		else{
			current++;
		}
		$('.slideshow').find('img').removeClass('active');	
		$('.slideshow').find('img').eq(current).addClass('active');
	}

    setInterval(slide_image,3000);
    
    // $('#login_btn').click(function(e){
	// 	var input_id = document.getElementById('input_id');
	// 	var input_pwd = document.getElementById('input_pwd');
		
	// 	if(input_id.value=='master' && input_pwd.value=='mju12345' ){
	// 		location.href = 'index.html';
	// 	}
	// 	else{
	// 		alert("에러");
	// 	}
    // })
    
    $('#mju_logo').click(function(e){
        location.href = 'http://www.mju.ac.kr';
	})

	$('#search_id_check').click(function(e){
		var input_name = document.getElementById('name').value;

		if(input_name=='1'){
			window.open('http://www.mju.ac.kr');
		}
		else{
			alert("없음");
		}
	})


	
});
