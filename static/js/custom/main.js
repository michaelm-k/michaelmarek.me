/* START: NAVBAR TOGGLE BTN */
$(".navbar-toggle").click(function() {
    if ($(".navbar-toggle").hasClass("collapsed")) {
		$(this).addClass("menuActive");
		$(".navbar-inverse").css("opacity", "1"); 
	} else {	
		$(this).removeClass("menuActive");	
		$(".navbar-inverse").css("opacity", "0.95"); 
	}	
});

$(".navbar-toggle")
	.mouseover(function() {  
		$(this).addClass("menuHover");
	})
	.mouseout(function() {
		$(this).removeClass("menuHover");	   
	});
/* END: NAVBAR TOGGLE BTN */

function popup(){
	playerWindow = window.open("player", "player", "location=no,width=365,height=487");
}