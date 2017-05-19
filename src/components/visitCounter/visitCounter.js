(function(){

    'use strict';

    // This directive should increment visit counter in cookies of the visitor and display these information
    angular.module('angular').directive('visitCounter', Directive);

    function Directive() {
        return {
            templateUrl: './components/visitCounter/visitCounter.html',
            controllerAs: 'ctrl',
            controller: ["$cookies", Ctrl]
        };

        function Ctrl($cookies) {
            var ctrl = this;

            /*
             * Called on each controller after all the controllers on an element have been constructed
             * and had their bindings initialized (and before the pre & post linking functions for the
             * directives on this element).
             *
             * This is a good place to put initialization code for your controller.
             *
             * see: https://docs.angularjs.org/api/ng/service/$compile
             */
            ctrl.$onInit = function init() {
                ctrl.userVisits = $cookies.get("visitCounter");

                if (!ctrl.userVisits) {
                    ctrl.userVisits = 0;
                }
                ctrl.userVisits++;

                $cookies.put("visitCounter", ctrl.userVisits);
            }
        }
    }

})();