function Input(){
	this.focus = function(id, imgID, srcImg){
		id.focus(function(){
			imgID.attr("src",srcImg);
		});
	};
	this.blur = function(id,imgID,srcImg){
		id.blur(function(){
			imgID.attr("src",srcImg);
		});
	}
};

function Hint(){
	this.show = function(id,leftPosArr,leftPosHint,topPos,srcImg){
		id.mouseover(function(){
			id.attr("src",srcImg)
			  .siblings("div.arrow")
			  .css({"left":leftPosArr,"top":topPos});

			id.siblings("div.hint-right")
			  .css("left",leftPosHint);
		})
	};
	this.hide = function(id,srcImg){
		id.mouseleave(function(){
			id.attr("src",srcImg)
			  .siblings("div.arrow").css("left","-9999px")
			id.siblings("div.hint-right").css("left","-9999px")
		})
	}
	this.decorationWarning = function(id, borderStyle, siblDiv, leftPos, topPos){
		id.css("border",borderStyle)
		  .siblings(siblDiv).css({"left":leftPos,"top":topPos});
	};
	this.decorationNormal = function(id,borderStyle,siblDiv){
		id.css("border",borderStyle)
		  .siblings(siblDiv).css("left","-9999px");
	}
};


$(document).ready(function(){

	var input = new Input();
	var hint = new Hint();

	input.focus($("#nickname"),$("#user-left"),"images/user2.jpg");
	input.focus($("#city"),$("#city-left"),"images/city2.jpg");
	input.focus($("#region"),$("#region-left"),"images/region2.jpg");
	input.focus($("#tel"),$("#phone-left"),"images/phone2.jpg");
	input.focus($("#email"),$("#email-left"),"images/mail2.jpg");
	input.focus($("#password"),$("#lock-left"),"images/lock2.jpg");

	input.blur($("#nickname"),$("#user-left"),"images/user1.jpg");
	input.blur($("#city"),$("#city-left"),"images/city1.jpg");
	input.blur($("#region"),$("#region-left"),"images/region1.jpg");
	input.blur($("#tel"),$("#phone-left"),"images/phone1.jpg");
	input.blur($("#email"),$("#email-left"),"images/mail1.jpg");
	input.blur($("#password"),$("#lock-left"),"images/lock1.jpg");

	hint.show($("#user-right"),"400px","420px","35px","images/info2.jpg");
	hint.show($("#city-right"),"400px","420px","35px","images/info2.jpg");
	hint.show($("#phone-right"),"400px","420px","35px","images/info2.jpg");
	hint.show($("#email-right"),"400px","420px","35px","images/info2.jpg");
	hint.show($("#lock-right"),"400px","420px","35px","images/info2.jpg");

	hint.hide($("#user-right"),"images/info1.jpg");
	hint.hide($("#city-right"),"images/info1.jpg");
	hint.hide($("#phone-right"),"images/info1.jpg");
	hint.hide($("#email-right"),"images/info1.jpg");
	hint.hide($("#lock-right"),"images/info1.jpg");

	var cityArr;

	$(function(){

		cityArr = [
			"Киев, Киевская область",
			"Харьков, Харьковская область",
			"Одеса, Одесская область",
			"Днепропетровск, Днепропетровская область",
			"Львов, Львовская область",
			"Николаев, Николаевская область",
			"Мариуполь, Мариупольская область",
			"Луганск, Луганская область",
			"Херсон, Херсонская область",
			"Полтава, Полтавская область",
			"Чернигов, Черниговская область",
			"Житомир, Житомирская область",
			"Сумы, Сумская область",
			"Краматорск, Краматорская область",
			"Ужгород, Ужгородская область",
			"Моего города нету в списке"
		];

		$("#city").autocomplete({
		    select: function( event, ui ) {
		    	/*hide and show block-region*/
		       if(ui.item.label == "Моего города нету в списке"){
		       		$("#block-region").css("display","inline-block");
		       }else{
		       		$("#block-region").css("display","none");
		       }
		       hint.decorationNormal($("#city"),"2px solid #cecece", "div.hint-left");
		    },
			source:cityArr
		});
		/* mask mob. tel*/
		$(function($) {
			$.mask.definitions['~']='[+-]';
			$('#tel').mask('+380(99)99-99-999');
		});
	});
	
	$("#send").on('click',function(){
		
		var nicknameBool = false;
		var cityBool = false;
		var regionBool = true;
		var mobileBool = false;
		var emailBool = false;
		var lockBool = false;
		var confidentBool = false;
		/* verify nickname value and return true or false in nicknameBool*/
		$("#nickname").each(function(){

			var thisVal = $(this).val();
			var length = thisVal.length;
			var at = thisVal.match(/[@]/);
			var dot = thisVal.match(/[.]/);
			var subRoad = thisVal.match(/[_]/);
			var lang = thisVal.match(/[a-zA-Z0-9]/);
			//console.log(typeof(length));
			if(at && dot && lang && subRoad && length > 5 && length < 20){
				nicknameBool = true;
			}else{
				hint.decorationWarning($("#nickname"),"2px solid red", "div.hint-left", "-115px", "22px");
			}
		});

		/*verify city value and return true or false in cityBool*/
		$("#city").each(function(){
			var thisVal = $(this).val();
			for(var n = 0; n < cityArr.length; n++){
				if($.trim(thisVal)== cityArr[n]){
					cityBool = true;
					break;
				}
			}
			/*if not city, then verify region*/
			if($(this).val() == "Моего города нету в списке"){
				regionBool = $("#region").val() == "" ? false:true;
			}
			/*if city is empty show left hint*/
			if(!cityBool){
				hint.decorationWarning($("#city"),"2px solid red", "div.hint-left", "-115px", "22px");
			}
			/*show left hint if checked region, and he is empty*/
			if(!regionBool){
				hint.decorationWarning($("#region"),"2px solid red", "div.hint-left", "-115px", "22px");
			}
		});

		/*verify for mobile telephone*/
		
		$("#tel").each(function(){
			mobileBool = !!$(this).val().match(/^\+380\((93|63|96|97|99|50|67)\)[0-9]{2}-[0-9]{2}-[0-9]{3}$/);
			/*show left hint if mobile is not UA country*/
			if(!mobileBool){
				hint.decorationWarning($("#tel"),"2px solid red", "div.hint-left", "-180px", "22px");	
			}
		})

		
		$("#email").each(function(){
			emailBool = !!$(this).val().match(/^\w+([\.\w]+)*\w@\w((\.\w)*\w+)*\.\w{2,3}$/);
			/*show left hint if email not verify */
			if(!emailBool){
				hint.decorationWarning($("#email"),"2px solid red", "div.hint-left", "-115px", "22px");
			}
		})

	
		$("#password").each(function(){
			var thVal = $(this).val();
			var upperSign = !!thVal.match(/[A-Z]/);
			/*show left hint if password substandart*/
			if(!upperSign || thVal.length > 20 || thVal.length < 8){
				hint.decorationWarning($("#password"),"2px solid red", "div.hint-left", "-115px", "22px");
			}else{
				lockBool = true;
			}
		});

		/*verify input type=checkbox*/
		$("#confident").each(function(){
			confidentBool = $(this).prop('checked');
			if(!confidentBool){
				hint.decorationWarning($("#confident"),"2px solid red", "div.hint-left", "-115px", "58px");
			}
		})

		if(nicknameBool && cityBool && regionBool && mobileBool && emailBool && lockBool && confidentBool){
			$("#sign-form").trigger('reset');
		}else{
			return false;
		};
	});
	/*
this.decorationNormal = function(id,borderStyle,siblDiv){
		id.css("border",borderStyle)
		  siblings(siblDiv).css("left":"-9999px");
	}
};
	*/
	$("#nickname").change(function(){
		hint.decorationNormal($("#nickname"),"2px solid #cecece", "div.hint-left");
	});
	$("#city").change(function(){
		hint.decorationNormal($("#city"),"2px solid #cecece", "div.hint-left");
	});
	$("#region").change(function(){
		hint.decorationNormal($("#region"),"2px solid #cecece", "div.hint-left");
	});
	$("#tel").change(function(){
		hint.decorationNormal($("#tel"),"2px solid #cecece", "div.hint-left");
	});
	$("#email").change(function(){
		hint.decorationNormal($("#email"),"2px solid #cecece", "div.hint-left");
	});
	$("#password").change(function(){
		hint.decorationNormal($("#password"),"2px solid #cecece", "div.hint-left");
	});
	$("#confident").change(function(){
		hint.decorationNormal($("#confident"), "none", "div.hint-left");
	});
	$("#password").keyup(function(){
		if($.trim($(this).val())!=""){
			$("#block-show-pass").css("display","inline-block");
			$("#lock-right").css("left","-9999px");
		}else{
			$("#block-show-pass").css("display","none");
			$("#lock-right").css("left","370px");
		}
	});
	$("#show-pass").change(function(){
		if($(this).prop('checked')){
			$("#password").attr("type","text");
		}else{
			$("#password").attr("type","password");
		}
	})

}); //end of ready