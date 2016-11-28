var $navbarToggle = $('.navbar-toggle');
var $navbar = $('.navbar');
var $navbarCollapse = $('.navbar-collapse');

$navbarToggle.click(function() {
    if ($navbarCollapse.hasClass('in')) {
		$(this).removeClass('menuActive');	
		$navbar.css('opacity', '0.95'); 		
	} else {	
		$(this).addClass('menuActive');
		$navbar.css('opacity', '1'); 
	}	
});

$navbarToggle
	.mouseover(function() {  
		$(this).addClass('menuHover');
	})
	.mouseout(function() {
		$(this).removeClass('menuHover');	   
	});

$('#icon_music').click(function() {
	window.open('player', 'player', 'location=no,width=365,height=487');
});