/**
 * Created by gimli on 31/05/2017.
 */
(function() {

    'use strict';

    angular.module("angular").directive("userRow", Directive);

    function Directive() {

        return {
            "templateUrl": 'components/userRow/userRow.html',
            "scope": {
                "data": "=",
                "userZmiz": "="
            },
            "controller": Ctrl,
            "controllerAs": "ctrl",
            "bindToController": true
        };

        function Ctrl() {
            var ctrl = this;

            ctrl.$onInit = function() {
                console.log(ctrl.data);
            }
        }
    }

})();