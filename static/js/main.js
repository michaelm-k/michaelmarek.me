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

var scrolling=false;

var scrollTop = function () {	 
	$("html, body").stop(true).animate({scrollTop : 0},800);	
};

(function() {        
    var timer;
    $(window).bind("scroll",function () {
        clearTimeout(timer);
        timer = setTimeout(refresh , 150);
		scrolling=true;
    });
    var refresh = function () { 
        scrolling=false;
    };
})();

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
		var urlCapitalized = url.charAt(0).toUpperCase() + url.substr(1);
		$("#content").load(url + " #content", function() {
			document.title = urlCapitalized + " | Michael Marek";
			$("li").removeClass("active");		
			$("#tab_"+url).parent().addClass("active");
			
			if (url == 'projects') { // specific
				$("#consilio, #rapitup").on("click", function(event) {
					var id = $(this).attr('id');
					$('#imagepreview').attr('src', $('#' + id + ' img').attr('src'));
					$('#imagemodal').modal('show');
				});
			}
			
			if ($(window).scrollTop() !== 0 && scrolling == false) {	
				scrollTop();
			}
		});
	} else {
		window.location.href="/";
	}
});