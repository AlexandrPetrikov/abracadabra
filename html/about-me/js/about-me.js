/**
 * Created by alexandr on 21.01.16.
 */
$(function(){
    $("header").load("../../header.html");
    $("aside").load("../../aside.html");
    $("footer").load("../../footer.html");
    setTimeout(function(){
        $('#about-me').css('color',"gold");
    },70);
});