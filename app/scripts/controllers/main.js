'use strict';

/**
 * @ngdoc function
 * @name doorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doorApp
 */
angular.module('doorApp')
  .controller('MainCtrl', function ($scope) {
    
    $(document).ready(function(){
        $('body').css("background", "url('/images/door_background.png') no-repeat fixed center center");
        $('body').css("background-size", "cover");
    });

  });
