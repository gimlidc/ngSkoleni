(function() {

    // ... strict mode is described in index.js
    'use strict';

    // Inheritance of this controller into angular app
    angular.module('angular').controller('landingPageCtrl', Ctrl);

    // injection: i.e. assignment of values to function  variables
    Ctrl.$inject = ["$cookies"];

    function Ctrl($cookies) {
        var ctrl = this;

        // Lets load user name from cookies
        function init() {
            ctrl.vokativ = "dear user";
            // we try to read vokativ from cookies
            ctrl.vokativ = $cookies.get("vokativ");
        }

        // There is not used $onInit patter because there is a bug in angular-router
        init();
    }
})();