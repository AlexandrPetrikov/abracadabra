/**
 * Created by alexandr on 14.01.16.
 */
$(function() {
    /* Load DOM elements through ajax*/
    $('footer').load('../../footer.html');
    $('header').load('../../header.html');
    $("aside").load('../../aside.html');
    setTimeout(function(){
        $('#link-games').css('color',"gold");
    },70);
});