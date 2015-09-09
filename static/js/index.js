$("#name").animate({opacity:1}, 1000, function() {});

/* START: SKIP_INTRO */
var skipped=false;
var tooLatetoSkip=false;

$(".skip_intro").css( "cursor", "pointer" );
$(".skip_intro").animate({opacity:1}, 2000); 

$(".skip_intro").click(function() {
	$(".skip_intro").addClass( "active" );
});

$( ".skip_intro" )
.mouseover(function() {   
	$(".skip_intro").addClass( "active" );
})
.mouseout(function() {
	$(".skip_intro").removeClass( "active" );
});

$(".skip_intro").click(function() { 
	if (tooLatetoSkip == false){
		skipped=true;
		$("#content").load("about #content", function() {
			window.history.replaceState("", "", "/about");	
			$(".navbar-inverse").removeClass("slideIn");	
			setTimeout(function(){
				$(".static-footer").slideToggle();
			},500);	
			$("#tab1").parent().addClass("active");
			$(window).on("beforeunload", function() {
				$(window).scrollTop(0);
			});		
		});
	}	
});
	
setTimeout(function(){
	tooLatetoSkip=true;
	$(".skip_intro").animate({opacity:0}, 2000);
	$(".skip_intro").css("cursor", "default");	
}, 15000);
/* END: SKIP_INTRO */

/* START: QUOTE */
setTimeout(function(){
	$("a.writer").css( "cursor", "pointer" );
	$(".writer").animate({opacity:1}, 2000); 
}, 15000);
	
$("a.writer").click(function() {
	$("a.writer").addClass( "active" );
});

$( "a.writer" )
.mouseover(function() {   
	$("a.writer").addClass( "active" );
})
.mouseout(function() {
	$("a.writer").removeClass( "active" );
});
/* END: QUOTE */
	
setTimeout(function(){
	if (skipped == false) {
		$(".navbar-inverse").removeClass("slideIn");
	}		
}, 15000);

setTimeout(function(){
	if (skipped == false) {
		$(".static-footer").slideToggle();
	}		
}, 15500);

// http://support.cargocollective.com/customer/portal/questions/1349490-animated-gif-for-header-img-force-gif-to-restart-on-refresh
$(function(){	
	// replace src with timestamped url to avoid cache
	$('#name').hide().attr('src', $('#name').attr('src') + '?_=' + Date.now());				
	// hide the image until the new one has loaded. Otherwise it'll look choppy when the new one loads.
	$('#name').one('load', function() {
		$(this).show();
	}).each(function() {	
		// also fire the function if the image is loaded before the event is bound.
		if (this.complete) {
			$(this).load();
		}
	});	
});	