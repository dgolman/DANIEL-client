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
  .config(function ($routeProvider, $httpProvider) {
    // We need to setup some parameters for http requests
    // These three lines are all you need for CORS support
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/confirmation', {
        templateUrl: 'views/confirmation.html',
        controller: 'ConfirmationCtrl'
      })
      .when('/detect', {
        templateUrl: 'views/verification.html',
        controller: 'VerificationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).service('URLSession', function () {
    this.url = "";
});
