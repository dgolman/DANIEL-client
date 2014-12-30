'use strict';

/**
 * @ngdoc function
 * @name doorApp.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the doorApp
 */
angular.module('doorApp')
  .controller('AddCtrl', function ($scope, URLSession, $location) {
    
    filepicker.setKey("AFxAZKXCOSgaCvOFwcdwCz");

    var streaming = false,
        video        = document.querySelector('#video'),
        canvas       = document.querySelector('#canvas'),
        startbutton  = document.querySelector('#startbutton'),
        uploadbutton = document.querySelector('#uploadbutton'),
        width = 350,
        height = 0;

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

    $scope.takepicture = function() {
      // canvas.width = width;
      // canvas.height = height;
      // canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/png').split(',', 2)[1];
      filepicker.store(
        data,
        {
          mimetype: 'image/png',
          base64decode: true
        },
        function(new_blob){
          var url = new_blob.url;
          URLSession.url = url;
          console.log(url);
          $location.path('/confirmation');
        }
      );
    }

    $scope.uploadpicture = function() {
      filepicker.pickAndStore(
        {
          mimetype:"image/*",
          container: 'window',
          services: ['FACEBOOK','COMPUTER'],
          openTo: 'FACEBOOK',
          multiple: false,
        }, {},
        function(Blobs){
          var url = Blobs[0].url;
          URLSession.url = url;
          console.log(url);
          $location.path('/confirmation');
        }, function(errors) {
          console.log(JSON.stringify(errors));
        }
      );
    }
});
