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

$( ".navbar-toggle" )
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

$(".navbar-inverse .navbar-brand #icon_logo").click(function(event) { // specific
	event.preventDefault();
	window.history.pushState({url:''}, "", "/");
	window.location.href="/";
});

$(".navbar-inverse .navbar-nav > li > a").click(function(event) { 
	if (!($(event.target).closest("#tab_resume").length || $(event.target).closest("#tab_blog").length)) { // specific
		event.preventDefault();
		var tab = $(event.target).html().toLowerCase();
		window.history.pushState({url:tab}, "", "/"+tab);
		window.location.href="/"+tab;
	}
});

 $(window).bind('popstate', function(event){
	var state = event.originalEvent.state;
    if (state !== null) {
		var url = state.url;
		window.location.href="/"+url;
	} else {
		window.location.href="/";
	}
});