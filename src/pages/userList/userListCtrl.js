/**
 * Created by gimli on 31/05/2017.
 */
(function() {

    'use strict';

    angular.module("angular").controller("userListCtrl", Ctrl);

    Ctrl.$inject = ["$http", "$rootScope"];

    function Ctrl($http, $rootScope) {

        var ctrl = this;

        $http({
            method: "GET",
            url: $rootScope.config.urls.be + $rootScope.config.endpoints.users
        }).then(function success(data) {
            ctrl.users = data.data;
        });

        ctrl.userZmiz = function(user) {
            var index = ctrl.users.indexOf(user);
            ctrl.users.splice(index,1);
        };
    }

})();
