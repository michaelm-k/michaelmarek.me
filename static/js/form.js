/**
 * AngularJS module to process a form.
 * https://www.lullabot.com/articles/processing-forms-in-angularjs
 */
var app = angular.module('site', ['ajoslin.promise-tracker', 'ui.replaceWith']);

app
  .controller('formCtrl', function ($scope, $http, $log, promiseTracker, $timeout) {
    // Initiate the promise tracker to track form submissions.
    $scope.progress = promiseTracker();
	
	setContactQuestion();
	
    // Form submit handler.
    $scope.submit = function(form) {
		// Trigger validation flag.
		$scope.submitted = true;
		
		// If form is invalid, return and let AngularJS show validation errors.
		if (form.$invalid) {
			return;
		}

		// Default values for the request.
		var config = {
			params : {
				//'callback' : 'JSON_CALLBACK',
				'name' : $scope.name,
				'email' : $scope.email,
				'message' : $scope.message,
				'answer' : $scope.answer
			},
		};
		
	var $promise = $http
	.post('/contact', {name: $scope.name, email: $scope.email, message: $scope.message})
    .success(function(data, status, headers, config) {
      if (data.status == 'OK') {
        $scope.name = null;
        $scope.email = null;
        $scope.message = null;
		$scope.answer = null;
		setContactQuestion();
			
        $scope.alert = 'Your message has been sent!';
        $scope.submitted = false;
      } else {
        $scope.alert = 'Shit, something went wrong. Try again later.';
        $log.error(data);
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
		
      // Perform JSONP request.
      /* var $promise = $http.jsonp('response.json', config)
        .success(function(data, status, headers, config) {
          if (data.status == 'OK') {
            $scope.name = null;
            $scope.email = null;
            $scope.message = null;
			$scope.answer = null;
			setContactQuestion();
			
            $scope.alert = 'Your form has been sent!';
            $scope.submitted = false;
          } else {
            $scope.alert = 'Oops, we received your request, but there was an error processing it. Try resending :S';
            $log.error(data);
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
        }); */

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