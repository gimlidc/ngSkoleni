(function() {

    // ... strict mode is described in index.js
    'use strict';

    angular.module('angular').controller('newUserFormCtrl', Ctrl);

    // injection: i.e. assignment of values to function call.
    Ctrl.$inject = ["$scope", "$cookies", "$http", "$rootScope"];

    /**
     * Controller for newUserForm
     * @param $scope scope is used for watching changes in form fields
     * @param $cookies is used for storing of user data
     * @constructor
     */
    function Ctrl($scope, $cookies, $http, $rootScope) {

        var ctrl = this;

        /**
         * Watch function cares of variable value changing. First parameter contains value which should be tracked.
         * Second argument is callback which will be called on varaible value change.
         * For more see https://docs.angularjs.org/api/ng/type/$rootScope.Scope
         */
        $scope.$watch(function() {
            return ctrl.user;
        }, function(newValue) {
            if (newValue) {
                console.log(newValue);
            }
        }, true);

        /**
         * This function should be called on blur of vokativ field.
         * We expect, that leaved input contains value which can be used (not only partial changes).
         * If there is any value, we try to put it into cookies for further usage.
         */
        ctrl.setVokativIntoCookies = function setVokativIntoCookies() {
            if (ctrl.user && ctrl.user.vokativ) {
                console.log("Storing vokativ into cookies: " + ctrl.user.vokativ);
                $cookies.put("vokativ", ctrl.user.vokativ)
            }
        };

        ctrl.validateAndSet = function validateAndSet() {
            var req = {
                method: 'PUT',
                url: $rootScope.config.urls.be + $rootScope.config.endpoints.newUser,
                headers: {
                    'Content-Type': "application/json"
                },
                data: ctrl.user
            };

            $http(
                req
            ).then(function success(res) {
                ctrl.response = res;
            }, function fail(res) {
                ctrl.response = res;
            });


        }

    }

})();