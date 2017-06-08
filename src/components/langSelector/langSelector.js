(function() {

    angular.module("angular").directive("langSelector", Directive);

    function Directive() {
        return {
            template: "<select ng-model='ctrl.lang' ng-change='ctrl.changeLang()'><option value='cs'>cs</option><option value='en'>en</option></select>",
            controller: ["$translate", Ctrl],
            controllerAs: "ctrl"
        };

        function Ctrl($translate) {
            var ctrl = this;

            ctrl.lang = $translate.preferredLanguage();

            ctrl.changeLang = function changeLang() {
                console.log("changing preferred language: " + ctrl.lang);
                $translate.use(ctrl.lang);
            }


        }
    }

})();