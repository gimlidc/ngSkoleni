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
                "userZmiz": "=",
                "expand": "="
            },
            "controller": ["$http", "$rootScope", "$q", Ctrl],
            "controllerAs": "ctrl",
            "bindToController": true
        };

        function Ctrl($http, $rootScope, $q) {
            var ctrl = this;
            ctrl.expanded = false;

            ctrl.$onInit = function() {
                ctrl.toggleExpand(!!ctrl.expand);
            };

            ctrl.toggleExpand = function(newValue) {
                // switch to new value or make negative
                if (newValue === undefined) {
                    ctrl.expanded = !ctrl.expanded;
                } else {
                    ctrl.expanded = newValue;
                }

                //evaluate new state
                if (ctrl.expanded && !ctrl.detail) {
                    ctrl.detail = $http({
                        "method": "GET",
                        "url": $rootScope.config.urls.be + $rootScope.config.endpoints.userDetails.replace(":id", ctrl.data.id)
                    }).then(function success(data) {
                        ctrl.detail = data.data;
                        if (data.data && data.data.type === "admin") {
                            return $http({
                                "method": "GET",
                                "url": $rootScope.config.urls.be + $rootScope.config.endpoints.adminRoles.replace(":id", ctrl.data.id)
                            });
                        } else {
                            return $q.resolve({"data": {"roles": []}});
                        }
                    }).then(function success(rolesResponse) {
                        ctrl.roles = rolesResponse.data
                    });
                }

            }
        }
    }

})();