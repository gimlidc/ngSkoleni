(function(){

    // ... strict mode is described in index.js
    'use strict';

    // This directive should increment visit counter in cookies of the visitor and display these information
    angular.module('angular').directive('visitCounter', Directive);

    /**
     * Directive with a template corresponds to a small part of a page, which is reusable accross application
     * @returns {{templateUrl: string, controllerAs: string, controller: [string,*]}}
     * @constructor
     */
    function Directive() {
        return {
            scope: true,
            templateUrl: './components/visitCounter/visitCounter.html', // corresponding template - part of the DOM
            controllerAs: 'ctrl', // naming convention for accessing controller variables and functions in template
            controller: ["visitCounterService", Ctrl] // injection of dependencies and definition of a controller
        };

        /**
         * Definition of a controller is encapsulated into a function. Everything assigned into "ctrl" and "this" object
         * will be visible in the template.
         *
         * @param visitCounterService - singleton for handling visit counter
         * @constructor
         */
        function Ctrl(visitCounterService) {
            // this assignment makes controller visible in the template
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
                // we read visit counts
                ctrl.userVisits = visitCounterService.getVisitCount();
            }
        }
    }

})();