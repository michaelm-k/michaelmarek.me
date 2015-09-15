/* START: NAVBAR TOGGLE BTN */
$(".navbar-toggle").click(function() {
    if ($( ".navbar-toggle" ).hasClass( "collapsed" )) {
		$(this).addClass("menuActive");
		$( ".navbar-inverse" ).css( "opacity", "1" ); 
	} else {	
		$(this).removeClass("menuActive");	
		$( ".navbar-inverse" ).css( "opacity", "0.95" ); 
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

var scrolling=false;

var scrollTop = function () {	 
	$("html, body").stop(true).animate({scrollTop : 0},800);	
};

(function() {        
    var timer;
    $(window).bind("scroll",function () {
        clearTimeout(timer);
        timer = setTimeout( refresh , 150 );
		scrolling=true;
    });
    var refresh = function () { 
        scrolling=false;
    };
})();

function loadContact() {
	$("#dave").stop(true).animate( {opacity: "1"}, 2000); 	
	$(".content-text .fa-diamond, .content-text .fa-stack-overflow, .content-text .fa-linkedin-square, .content-text .fa-github-square").addClass("animated rubberBand");
}

$(".navbar-inverse .navbar-nav > li > a").click(function(event) { 
	if (!$(event.target).closest("#tab2").length && !$(event.target).closest("#tab5").length) {
		event.preventDefault();
		if ($(this).closest("li").hasClass("active")) {	
			if ($(window).scrollTop() !== 0 && scrolling==false) {
				scrollTop();
			}	
		} else {
			if ($(event.target).closest("#tab1").length) {
				$("#content").load("about #content", function() {
					window.history.pushState({url:'about'}, "", "/about");  
					document.title = "About | Michael Marek";
					if ($(window).scrollTop() !== 0 && scrolling == false) {	
						scrollTop();
					}
				});	
			} else if ($(event.target).closest("#tab3").length) {
				$("#content").load("projects #content", function() {
					window.history.pushState({url:'projects'}, "", "/projects");
					document.title = "Projects | Michael Marek";		
					if ($(window).scrollTop() !== 0 && scrolling == false) {	
						scrollTop();
					}
					$("#consilio, #rapitup").on("click", function(event) {
						var id = $(this).attr('id');
						$('#imagepreview').attr('src', $('#' + id + ' img').attr('src'));
						$('#imagemodal').modal('show');
					});
				});
			} else if ($(event.target).closest("#tab4").length) {
				$("#content").load("contact #content", function() {
					window.history.pushState({url:'contact'}, "", "/contact");
					document.title = "Contact | Michael Marek";	
					$("#dave").css("opacity", 0);
					loadContact();	
					if ($(window).scrollTop() !== 0 && scrolling == false) {	
						scrollTop();
					}
				});
			}
			$("#content").css("padding-left",0);
			$("#content").css("padding-right",0);
			$("li").removeClass( "active" );
			$(this).closest("li").addClass( "active" );
		}	
	}
});

 $(window).bind('popstate', function(event){
	var state = event.originalEvent.state;
    if (state !== null) {
		var url = state.url;
		$("#content").load(url + " #content", function() {
			$("li").removeClass( "active" );
			if (url=='about') {
				$("#tab1").parent().addClass( "active" );
				document.title = "About | Michael Marek";
				if ($(window).scrollTop() !== 0 && scrolling == false) {	
					scrollTop();
				}
			} else if (url=='projects') {
				$("#tab3").parent().addClass( "active" );
				document.title = "Projects | Michael Marek";		
				if ($(window).scrollTop() !== 0 && scrolling == false) {	
					scrollTop();
				}
				$("#consilio, #rapitup").on("click", function(event) {
					var id = $(this).attr('id');
					$('#imagepreview').attr('src', $('#' + id + ' img').attr('src'));
					$('#imagemodal').modal('show');
				});
			} else if (url=='contact') {
				$("#tab4").parent().addClass( "active" );
				document.title = "Contact | Michael Marek";
				$("#dave").css("opacity", 0);
				loadContact();	
				if ($(window).scrollTop() !== 0 && scrolling == false) {	
					scrollTop();
				}
			}
		});
		$("#content").css("padding-left",0);
		$("#content").css("padding-right",0);
	} else {
		window.location.href="/";
	}
});