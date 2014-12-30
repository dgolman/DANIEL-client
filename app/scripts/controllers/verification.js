'use strict';

/**
 * @ngdoc function
 * @name doorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doorApp
 */
angular.module('doorApp')
  .controller('VerificationCtrl', function ($scope) {
    
  	$scope.verify = function() {
  		$http.post(
            'http://daniel.ngrok.com/verify', 
            {
                img_url: URLSession.url
            }
        )
		  .success(function(response) {
  			console.log(response);
  		});
  	}

  });
