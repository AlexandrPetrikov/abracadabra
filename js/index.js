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
	var width = 1350;
	var animationSpeed = 400;
	var pause = 3000;
	var countSlide = 1;

	//cache DOM
	var $slider = $(".slider");
	var $slideContainer = $slider.find(".sliders");
	var $sliders = $slideContainer.find(".slide");
	
	var interval;

	function startSlider(){
		interval = setInterval(function(){
			$slideContainer.animate({marginLeft:"-="+width},animationSpeed, function(){
				countSlide++;
				if (countSlide === $sliders.length) {
					countSlide = 1;
					$slideContainer.css("margin-left", 0);
				};
			});
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

    $("")
});