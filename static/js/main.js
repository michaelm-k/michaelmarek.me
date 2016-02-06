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
	//$("#dave").css("opacity", 0);
	//$("#dave").stop(true).animate( {opacity: "1"}, 2000); 	
	$(".content-text .fa-diamond, .content-text .fa-stack-overflow, .content-text .fa-linkedin-square, .content-text .fa-github-square").addClass("animated rubberBand");
	$.getScript("static/js/form.js")
		.done(function(data, textStatus, jqxhr) {
			/* console.log(data); // Data returned
			console.log(textStatus); // Success
			console.log(jqxhr.status); // 200
			console.log("Load was performed."); */
		})
		.fail(function() {
			location.reload();
		});
	$.ajax({
		url:"static/css/form.css",
		success:function(data){
			$("<style></style>").appendTo("head").html(data);
		},
		error:function() {
			location.reload();
		}
	});
}

$(".navbar-inverse .navbar-nav > li > a").click(function(event) { 
	if (!$(event.target).closest("#tab2").length && !$(event.target).closest("#tab5").length) {
		event.preventDefault();
		if ($(this).closest("li").hasClass("active")) {	
			if ($(window).scrollTop() !== 0 && scrolling==false) {
				scrollTop();
			}	
		} else {
			var tab = $(event.target).html().toLowerCase();
			var tabCapitalized = tab.charAt(0).toUpperCase() + tab.substr(1);	
			$("#content").load(tab + " #content", function() {
				window.history.pushState({url:tab}, "", "/"+tab);  
				document.title = tabCapitalized + " | Michael Marek";
				if ($(event.target).closest("#tab3").length) {
					$("#consilio, #rapitup").on("click", function(event) {
						var id = $(this).attr('id');
						$('#imagepreview').attr('src', $('#' + id + ' img').attr('src'));
						$('#imagemodal').modal('show');
					});
				} else if ($(event.target).closest("#tab4").length) {
					loadContact();
				}
				if ($(window).scrollTop() !== 0 && scrolling == false) {	
					scrollTop();
				}
			});	
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
		var url = state.url; // 'about', 'projects', or 'contact'
		var urlCapitalized = url.charAt(0).toUpperCase() + url.substr(1);
		$("#content").load(url + " #content", function() {
			$("li").removeClass( "active" );
			document.title = urlCapitalized + " | Michael Marek";
			if (url=='about') {
				$("#tab1").parent().addClass( "active" );
			} else if (url=='projects') {
				$("#tab3").parent().addClass( "active" );		
				$("#consilio, #rapitup").on("click", function(event) {
					var id = $(this).attr('id');
					$('#imagepreview').attr('src', $('#' + id + ' img').attr('src'));
					$('#imagemodal').modal('show');
				});
			} else if (url=='contact') {
				$("#tab4").parent().addClass( "active" );
				loadContact();	
			}
			if ($(window).scrollTop() !== 0 && scrolling == false) {	
				scrollTop();
			}
		});
		$("#content").css("padding-left",0);
		$("#content").css("padding-right",0);
	} else {
		window.location.href="/";
	}
});