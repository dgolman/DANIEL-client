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
      .when('/confirmation', {
        templateUrl: 'views/confirmation.html',
        controller: 'ConfirmationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).service('URLSession', function () {
    this.url = "";
});
