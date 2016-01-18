$(function(){
    $('header').load('../../../header.html');
    $('footer').load('../../../footer.html');
});
function Progress(id){
    this.plus = function(idLevel,idTextProgress){
        /* variables */
        var currentVal = parseInt(id.val());

        id.val(currentVal + 1);
        if(currentVal == id.attr("max")){
            id.val(0);
            id.attr("max",+id.attr("max")+100);
            idLevel.text(+idLevel.text()+1);
        }
        idTextProgress.text(id.val() + "/" + id.attr("max"));

        //idTextProgress.text(currentVal + "/" + id.attr('max'));
    }
}
function Target(id) {
	/*Global variables for target*/
	var marginTop;
	var marginLeft;
	/*----------------------------*/
    id.css('display','inline-block');

	this.fly = function(){
		marginTop=Math.floor((Math.random()*490)+1);
		marginLeft=Math.floor((Math.random()*990)+1);
		id.css({'top':marginTop,
				'left':marginLeft});
	};
	this.posY = function(){
		return marginTop;
	};
	this.posX = function(){
		return marginLeft;
	};
	this.killFly = function(killerPosTop, killerPosLeft){
		if(marginTop > killerPosTop && marginTop < killerPosTop+100 && marginLeft > killerPosLeft && marginLeft < killerPosLeft+100){
			return true;
		};
	};
};
function Killer(id){
	var animateMove;//setInterval for animate move
	var killerPosLeft;
	var killerPosTop;
	var parentTargetWidth = parseInt(id.parent().width());
	var parentTargetHeight = parseInt(id.parent().height());

    id.css('display','block');
	/*killer move right*/
	this.right = function(){
		clearInterval(animateMove);
		animateMove = setInterval(function(){
			killerPosLeft = parseInt(id.css('left'));
			if(parseInt(id.css('left'))<=parentTargetWidth-100){
				id.css('left',killerPosLeft+1);
			}else{
				clearInterval(animateMove);
			};
		});
	};
	/*killer move bottom*/
	this.bottom = function(){
		clearInterval(animateMove);
		animateMove = setInterval(function(){
			killerPosTop = parseInt(id.css('top'));
			if(parseInt(id.css('top'))<=parentTargetHeight-100){
				id.css('top',killerPosTop+1);
			}
		});
        event.preventDefault();
	};
	/*killer move left*/
	this.left = function(){
		clearInterval(animateMove);
		animateMove = setInterval(function(){
			killerPosLeft = parseInt(id.css('left'));
			if(parseInt(id.css('left'))>0){
				id.css('left',killerPosLeft-1);
			}else{
				clearInterval(animateMove);
			};
		});
	};
	/*killer move top*/
	this.top = function(){
		clearInterval(animateMove);
		animateMove = setInterval(function(){
			killerPosTop = parseInt(id.css('top'));
			if(parseInt(id.css('top'))>0){
				id.css('top',killerPosTop-1);
			}
		});
	};
	/*killer pause || run*/
	this.center = function(){
		clearInterval(animateMove);
		if($(this).text()=="P"){
			$(this).text("R");
			$(this).siblings("button").prop("disabled",true);
		}else{
			$(this).text("P").siblings("button").prop("disabled",false);
		};
	};
	this.posY = function(){
		return killerPosTop;
	};
	this.posX = function(){
		return killerPosLeft;
	};
};
$(document).ready(function(){


    /*click "NEW GAME" || $start-new-game*/
    $('#choose-new-game').on('click',function(){
        var $animationSpeed = 500;
        /*if click "NEW GAME" then first menu hide, and second menu show*/
        $('#first-game-menu').animate({'height':0,'display':'none'},$animationSpeed,function(){
            $(this).css('display','none');
        });
        $('#second-game-menu').css('display','block')
                              .animate({'height':'110px'},$animationSpeed);
        $('#gender').animate({"top":"100px"},$animationSpeed);
    });

    /*click "START" || $start-game*/
    $("#start-game").on('click',function(){
        var $animationSpeed = 400;
       if(!!$("#choose-male").prop("checked") || !!$("#choose-female").prop("checked")){
          $("#game-menu").animate({"opacity":0},$animationSpeed,function(){
              $(this).css("display","none");
          });
           $("#gender").animate({"opacity":0},$animationSpeed,function(){
               $(this).css("display","none");
           });
           $("#game-block-overlay").css("display","none");
           setTimeout(function(){
               startNewGame();
           },1000);
           $("#game-block").animate({"opacity":0},300,function(){
               $(this).css({"background":"white","height":"640px"}).animate({"opacity":1},1000);;
               $("#info").css("display","block");
           });
       }else{
           alert("Choose gender");
       }
    });
    /* prime function for game */
    function startNewGame(){
        var tgAnim;//interval for emulation fly target
        var score = $('#score-text');
        var progress = new Progress($("#score"));

        /*new obj killer*/
        var killer = new Killer($('#killer'));

        /*control keyup killer*/
        $(document).keyup(function(e){
            var code = e.keyCode;
            switch(code){
                case 37:
                    killer.left();
                    break;
                case 38:
                    killer.top();
                    break;
                case 39:
                    killer.right();
                    break;
                case 40:
                    killer.bottom();
                    break;
                case 32:
                    killer.center();
                    break;
            }
        });
        /* for no control scroll browser*/
        $(document).keydown(function(e){
            var code = e.keyCode;
            switch(code){
                case 37:
                    return false;
                    break;
                case 38:
                    return false;
                    break;
                case 39:
                    return false;
                    break;
                case 40:
                    return false;
                    break;
            }
        });
        /*new obj target*/
        var target = new Target($('#target'));
        /*interval for return coord target and method fly()*/
        function targetAnimate (){
            clearInterval(tgAnim);
            tgAnim = setInterval(function(){
                target.fly();
            },3000);
            setInterval(function(){
                if(target.killFly(killer.posY(),killer.posX())){
                    target.fly();
                    score.text(+score.text()+1);
                    progress.plus($('#lvl-info'),$("#score-number"));
                };
            });
        };
        targetAnimate();
    };



});