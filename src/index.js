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
        "templates",
        'pascalprecht.translate' // ref: https://angular-translate.github.io/docs/#/guide/02_getting-started
    ]);

    appModule.config(Config);

    Config.$inject = ["$routeProvider", "$translateProvider"];

    function Config($routeProvider, $translateProvider) {
        function configuration($http, $rootScope) {
            return $http.get('config.json').then(function(res) {
                $rootScope.config = res.data;
            });
        }

        var commonResolve = {
            configuration: ["$http", "$rootScope", configuration]
        };

        $routeProvider
            .when('/user/new', {
                templateUrl: 'pages/newUserForm/newUserForm.html',
                controller: 'newUserFormCtrl',
                controllerAs: 'ctrl',
                resolve: commonResolve
            })
            .when('/users', {
                templateUrl: 'pages/userList/userList.html',
                controller: 'userListCtrl',
                controllerAs: 'ctrl',
                resolve: commonResolve
            })
            .otherwise({
                templateUrl: 'pages/landingPage/landingPage.html',
                controller: 'landingPageCtrl',
                controllerAs: 'ctrl',
                resolve: commonResolve
            });

        $translateProvider.useStaticFilesLoader({
            prefix: '/',
            suffix: '.json'
        });

        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.preferredLanguage("cs");
    }

})();