$(document).ready(function(){
    /* Load DOM elements through ajax*/
    $('header').load('header.html');
    $('footer').load('footer.html').css('bottom',0);
    $("aside").load('aside.html');
    setTimeout(function(){
        $('#link-prime').css('color',"gold");
    },70);
    /* code for block popup */
   /*setTimeout(function(){
        $('#popup, #popup-overlay').fadeIn(100);
    },2000);
    $('#popup-overlay, #close-popup').click(function(){
        $('#popup, #popup-overlay').fadeOut(100);
    });*/
    /*-----------------------------------------*/

    /* code for slider */
	//configurations

	var pause = 4000;

	//cache DOM
	var $sliders = $("#sliders");
	var interval;
    var max = $sliders.children().size()-1;
    var n = $(".showSlide").index();
	function startSlider(){
		interval = setInterval(function(){
            function showSlide(){
                if(n == max){
                    n = 0;
                    $sliders.children().eq(n).animate({"opacity":1},400);
                    $sliders.children().eq(max).animate({"opacity":0},400);
                }else{
                    $sliders.children().eq(n).animate({"opacity":0},400);
                    $sliders.children().eq(n+1).animate({"opacity":1},400);
                    n++;
                }
            }
            showSlide();
		}, pause);
	}
    $("#right-carret").on('click',function(){
        clearInterval(interval);
        if(n == max){
            n = 0;
            $sliders.children().eq(n).animate({"opacity":1},600);
            $sliders.children().eq(max).animate({"opacity":0},600);
        }else{
            $sliders.children().eq(n).animate({"opacity":0},600);
            $sliders.children().eq(n+1).animate({"opacity":1},600);
            n++;
        }
        setTimeout(function(){
            stopInterval();
            startSlider();
        },5000);
    });
    $("#left-carret").on('click',function(){
        clearInterval(interval);
        if(n < 1){
            n = max;
            $sliders.children().eq(n).animate({"opacity":1},400);
            $sliders.children().eq(1).animate({"opacity":0},400);
        }else{
            $sliders.children().eq(n).animate({"opacity":0},400);
            $sliders.children().eq(n-1).animate({"opacity":1},400);
            n--;
        }
        setTimeout(function(){
            stopInterval();
            startSlider();
        },5000);
    });
	function stopInterval(){
		clearInterval(interval);
	}
	$sliders.on('mouseenter', stopInterval).on('mouseleave', function(){
        stopInterval();
        startSlider();
    });
	startSlider();
    /*---------------------------------------*/
    /*code for tabs*/
    $('#tab-top-text').find('li').click(function(){
        var currentNum = $(this).index();
        $(this).addClass("show-tab").siblings().removeClass("show-tab");
        $('.tab-content').eq(currentNum).addClass("show-tab-content")
                         .siblings().removeClass("show-tab-content");
    });
    /*--------------------------------------------------*/

});