'use strict';

/**
 * @ngdoc function
 * @name doorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doorApp
 */
angular.module('doorApp')
  .controller('ConfirmationCtrl', function ($scope, URLSession, $http) {
    $scope.image_src = URLSession.url;
    $scope.name = "";
  	$scope.confirmed = function() {
  		//SEND Url to Server for facial processing
  		//dm.ngrok.com/upload
  		$http.post(
            'http://daniel.ngrok.com/upload', 
            {
                img_url: URLSession.url,
                name: $scope.name
            }
        )
		  .success(function(response) {
  			console.log(response);
  		});
  	}

  });
