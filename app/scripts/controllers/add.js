'use strict';

/**
 * @ngdoc function
 * @name doorApp.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the doorApp
 */
angular.module('doorApp')
  .controller('AddCtrl', function ($scope, URLSession, $window) {
    
    filepicker.setKey("AFxAZKXCOSgaCvOFwcdwCz");


    $scope.takepicture = function() {
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
          var url = new_blob.url;
          URLSession.url = url;
          $window.location = "#/confirmation";
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
          $window.location = "#/confirmation";
        }, function(errors) {
          console.log(JSON.stringify(errors));
        }
      );
    }
});
