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
            birthYear: 1920,
            visible: true,
            editable: false
        },
        {
            name: "Franta",
            surname: "Liška",
            birthYear: 2010,
            visible: true,
            editable: false
        }];

        ctrl.userZmiz = function(user) {
            var index = ctrl.users.indexOf(user);
            ctrl.users.splice(index,1);
        };
    }

})();
