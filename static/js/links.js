var clicked=0;
var hovering=0;

/* START: FOOTER */ 
$( ".static-footer .fa-soundcloud, .static-footer .fa-stack-overflow, .static-footer .fa-github-alt, .static-footer .fa-linkedin" )
	.mouseover(function() {  
		clicked=0;
		$(this).animate( {color: "#bdbcae"}, "200" ); 
	})
	.mouseout(function() {
		if (clicked==0){
			$(this).stop(true).animate( {color: "#ffffff"}, "200" );
		}	   
	});
	
$(".static-footer .fa-soundcloud, .static-footer .fa-stack-overflow, .static-footer .fa-github-alt, .static-footer .fa-linkedin").click(function() {   
	clicked=1;	  
	$(this).stop(true).animate( {color: "#ffffff"}, "200" );     
});
/* END: FOOTER */ 