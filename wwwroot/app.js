var ASPNETStaticFileCacheCtrlAndNGInclude;
(function (ASPNETStaticFileCacheCtrlAndNGInclude) {
    var MainController = (function () {
        function MainController($http) {
            this.$http = $http;
            this.viewName = 'views/date-time.html';
        }
        MainController.prototype.updateViews = function () {
            this.$http
                .post('api/updateViews', null)
                .success(function () {
                alert('views are updated.');
                window.location.reload(true);
            });
        };
        return MainController;
    })();
    angular
        .module('app', [])
        .controller('mainController', MainController);
})(ASPNETStaticFileCacheCtrlAndNGInclude || (ASPNETStaticFileCacheCtrlAndNGInclude = {}));
