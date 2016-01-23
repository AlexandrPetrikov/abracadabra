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

	var pause = 5000;

	//cache DOM
	var $slider = $("#slider");
	var interval;
    var max = $slider.children().size();
    console.log(max);
    var n = 1;
	function startSlider(){
		interval = setInterval(function(){
            function showSlide(){
                if(n == max+1){
                    n = 1;
                    $(".slide[data-slide="+n+"]").animate({"opacity":"1"},1500);
                    $(".slide[data-slide='"+max+"']").animate({"opacity":"0"},1500);
                }else{
                    $(".slide[data-slide='"+n+"']").animate({"opacity":"1"},1500);
                    $(".slide[data-slide='"+(n-1)+"']").animate({"opacity":"0"},1500);
                };
                n++;
            }
            showSlide();
		}, pause);
	}
	function stopInterval(){
		clearInterval(interval);
	}
	$slider.on('mouseenter', stopInterval).on('mouseleave', startSlider);
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