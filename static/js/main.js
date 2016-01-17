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
}
var app = angular.module('site', ['ajoslin.promise-tracker', 'ui.replaceWith', 'ngRoute']);

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

app
  .controller('formCtrl', function ($scope, $http, $log, promiseTracker, $timeout) {
	  alert('working');
    // Initiate the promise tracker to track form submissions.
    $scope.progress = promiseTracker();

	setContactQuestion();
	
    // Form submit handler.
    $scope.submit = function(form, $event) {
		$event.preventDefault();
		
		// Trigger validation flag.
		$scope.submitted = true;
		
		// If form is invalid, return and let AngularJS show validation errors.
		if (form.$invalid) {
			return;
		}

		// Default values for the request.
		var config = {
			params : {
				'name' : $scope.name,
				'email' : $scope.email,
				'message' : $scope.message,
				'answer' : $scope.answer
			},
		};
		
		var $promise = $http
		.post('/contact', {name: $scope.name, email: $scope.email, message: $scope.message})
		.success(function(response) {
			if (response.status == 200) {
				$scope.name = null;
				$scope.email = null;
				$scope.message = null;
				$scope.answer = null;
				setContactQuestion();
		
				$scope.form.$setPristine();
				$scope.alert = 'Your message has been sent!';
				$scope.submitted = false;
			} else {
				$scope.alert = 'Shit, something went wrong. Try again later.';
			}
		})
		.error(function(data, status, headers, config) {
			$scope.progress = data;
			$scope.alert = 'There was a network error. Try again later.';
			$log.error(data);
		})
		.finally(function() {
			// Hide status messages after three seconds.
			$timeout(function() {
				$scope.alert = null;
			}, 3000);
		});
		// Track the request and show its progress to the user.
		$scope.progress.addPromise($promise);
    };
});

function setContactQuestion() {
    var random1 = randomInt(1, 10);
    var random2 = randomInt(1, 10);
        
    document.getElementsByName('answer')[0].placeholder = 'What is ' + random1 + ' + ' + random2 + '?';
    document.getElementsByName('answer')[0].test = random1+random2;
}

app.directive('answerCorrect', function() { // returns a directive definition object
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(checkAnswer);
			ctrl.$formatters.unshift(checkAnswer);
	
			function checkAnswer(viewValue){
				var valid = viewValue == document.getElementsByName('answer')[0].test;
				ctrl.$setValidity('answerCorrect', valid); // tell controller that viewValue is valid	
				return valid ? viewValue : undefined; // return 'undefined' if viewValue is invalid, otherwise return viewValue
			}	
		}
	};
});

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}