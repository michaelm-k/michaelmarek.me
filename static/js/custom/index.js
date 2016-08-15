$("#name").animate({opacity:1}, 1000, function() {});

/* START: QUOTE */
setTimeout(function(){
	$("a.writer").css( "display", "block" );
	$(".writer").animate({opacity:1}, 2000); 
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
}, 15000);
/* END: QUOTE */

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