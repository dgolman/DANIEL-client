'use strict';

/**
 * @ngdoc overview
 * @name doorApp
 * @description
 * # doorApp
 *
 * Main module of the application.
 */
angular
  .module('doorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).directive('webcam', function() {
    return {
      restrict: 'A',
      link: function() {
        filepicker.setKey("AFxAZKXCOSgaCvOFwcdwCz");

        var streaming = false,
            video        = document.querySelector('#video'),
            canvas       = document.querySelector('#canvas'),
            startbutton  = document.querySelector('#startbutton'),
            uploadbutton = document.querySelector('#uploadbutton'),
            width = 320,
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

        function takepicture() {
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(video, 0, 0, width, height);
          var data = canvas.toDataURL('image/png');
          
          filepicker.store(
            data,
            {mimetype: 'image/*'},
            function(new_blob){
              console.log(new_blob.url);
            }
          );
        }

        function uploadpicture() {
          filepicker.pickAndStore(
            {
              mimetype:"image/*",
              container: 'window',
              services: ['FACEBOOK','COMPUTER'],
              openTo: 'FACEBOOK',
              multiple: false,
            },
            function(Blobs){
              console.log(JSON.stringify(Blobs));
            }, function(errors) {
              console.log(JSON.stringify(errors));
            }
          );
        }

        startbutton.addEventListener('click', function(ev){
            takepicture();
          ev.preventDefault();
        }, false);

        uploadbutton.addEventListener('click', function(ev){
            uploadpicture();
          ev.preventDefault();
        }, false);

      }
    }
  });
