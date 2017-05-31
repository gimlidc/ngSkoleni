/*
 * This encapsulation of the file is calle "closure":
 * https://www.w3schools.com/js/js_function_closures.asp
 */
(function(){

    /*
     * Strict mode makes several changes to normal JavaScript semantics:
     * - strict mode eliminates some JavaScript silent errors by changing them to throw errors.
     * - strict mode fixes mistakes that make it difficult for JavaScript engines to perform optimizations:
     *      - strict mode code can sometimes be made to run faster than identical code that's not strict mode.
     * - strict mode prohibits some syntax likely to be defined in future versions of ECMAScript.
     *
     * For more see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode
     */
    'use strict';

    var templates = angular.module("templates", []);

    // Creation of an angular module - in our case module containing whole application
    var appModule = angular.module('angular', [
        // in this array are listed all modules, which this module depends on

        'ngRoute', // ref: https://docs.angularjs.org/api/ngRoute
        'ngCookies', // ref: https://docs.angularjs.org/api/ngCookies
        "templates" // ref:
    ]);

    appModule.config(Config);

    Config.$inject = ["$routeProvider"];

    function Config($routeProvider) {
        $routeProvider
            .when('/user/new', {
                templateUrl: 'pages/newUserForm/newUserForm.html',
                controller: 'newUserFormCtrl',
                controllerAs: 'ctrl'
            })
            .when('/users', {
                templateUrl: 'pages/userList/userList.html',
                controller: 'userListCtrl',
                controllerAs: 'ctrl'
            })
            .otherwise({
                templateUrl: 'pages/landingPage/landingPage.html',
                controller: 'landingPageCtrl',
                controllerAs: 'ctrl'
            });
    }

})();