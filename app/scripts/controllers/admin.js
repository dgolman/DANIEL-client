'use strict';

/**
 * @ngdoc function
 * @name doorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doorApp
 */
angular.module('doorApp')
  .controller('AdminCtrl', function ($scope, $http) {
    
  	$scope.takingPicture = true;
  	$scope.loading = false;
 	var width = 350;
    var height = 0;
    filepicker.setKey("AFxAZKXCOSgaCvOFwcdwCz");

    $scope.takepicture = function() {
      $scope.loading = true;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/png').split(',', 2)[1];
      filepicker.store(
        data,
        {
          mimetype: 'image/png',
          base64decode: true
        },
        function(new_blob){
          console.log(new_blob.url);
          $scope.url = new_blob.url;
          $http.post(
            'http://daniel.ngrok.com/verify', 
            {
                img_url: $scope.url
            }
	        )
			  .success(function(response) {
	  			console.log(response);
	  		});
          $scope.takingPicture = false;	
          $scope.loading = false;
          $scope.$apply();
          //Store url in database and send to server for facial detection
        }
      );

    }

    $scope.uploadpicture = function() {
    	$scope.loading = true;
      	filepicker.pickAndStore(
        {
          mimetype:"image/*",
          container: 'window',
          services: ['FACEBOOK','COMPUTER'],
          openTo: 'FACEBOOK',
          multiple: false,
        }, {},
        function(Blobs){
          $scope.url = Blobs[0].url;
          $scope.takingPicture = false;	
          $scope.loading = false;
          $scope.$apply();
          //Store url in database and send to server for facial detection
        }, function(errors) {
          console.log(JSON.stringify(errors));
        }
      );
    }

  	$scope.loadCamera = function() {

	    var streaming = false,
	        video        = document.querySelector('#video'),
	        canvas       = document.querySelector('#canvas'),
	        startbutton  = document.querySelector('#startbutton'),
	        uploadbutton = document.querySelector('#uploadbutton');

	    navigator.getMedia = ( navigator.getUserMedia ||
	                           navigator.webkitGetUserMedia ||
	                           navigator.mozGetUserMedia ||
	                           navigator.msGetUserMedia);

	    navigator.getMedia(
	      {
	        video: true,
	        audio: false
	      },
	      function(stream) {
	        if (navigator.mozGetUserMedia) {
	          video.mozSrcObject = stream;
	        } else {
	          var vendorURL = window.URL || window.webkitURL;
	          video.src = vendorURL.createObjectURL(stream);
	        }
	        video.play();
	      },
	      function(err) {
	        console.log("An error occured! " + err);
	      }
	    );

	    video.addEventListener('canplay', function(ev){
	      if (!streaming) {
	        height = video.videoHeight / (video.videoWidth/width);
	        video.setAttribute('width', width);
	        video.setAttribute('height', height);
	        canvas.setAttribute('width', width);
	        canvas.setAttribute('height', height);
	        streaming = true;
	      }
	    }, false);
  	}

  });
