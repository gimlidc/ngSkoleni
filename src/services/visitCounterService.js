(function() {
    'use strict';

    angular.module('angular').service('visitCounterService', Service);

    function Service($cookies) {

        var visitCount = 0;
        visitCount = $cookies.get("visitCounter");
        visitCount++;
        $cookies.put("visitCounter", visitCount);

        /**
         * Public method for accessing visit counter
         * @returns {number}
         */
        this.getVisitCount = function getVisitCount() {
            return visitCount;
        }

    }

})();
