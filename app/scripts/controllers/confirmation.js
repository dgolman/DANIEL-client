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
    
  	$scope.confirmed = function() {
  		//SEND Url to Server for facial processing
  		//dm.ngrok.com/upload
  		$http.post('http://dm.ngrok.com/upload', {data: URLSession.url, name: "Daniel"})
		.success(function(response) {
  			console.log(response);
  		});
  	}

  });
