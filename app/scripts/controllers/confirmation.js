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
  		$http.post('http://daniel.ngrok.com/upload', {img_url: 'https://www.filepicker.io/api/file/gsDm8qYTOuduxitthSIj', name: "Daniel"})
		.success(function(response) {
  			console.log(response);
  		});
  	}

  });
