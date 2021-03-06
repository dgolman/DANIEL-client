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
