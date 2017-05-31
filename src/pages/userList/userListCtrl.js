/**
 * Created by gimli on 31/05/2017.
 */
(function() {

    'use strict';

    angular.module("angular").controller("userListCtrl", Ctrl);

    function Ctrl() {

        var ctrl = this;

        ctrl.users = [{
            name: "Pepa",
            surname: "Novák",
            birthYear: 1920
        },
        {
            name: "Franta",
            surname: "Liška",
            birthYear: 2010
        }];

    }

})();
