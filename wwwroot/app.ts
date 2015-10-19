namespace ASPNETStaticFileCacheCtrlAndNGInclude {
    class MainController {
        public viewName: string;

        constructor(private $http: ng.IHttpService) {
            this.viewName = 'views/date-time.html';
        }

        public updateViews(): void {
            this.$http
                .post('api/updateViews', null)
                .success(() => {
                    alert('views are updated.');
                    window.location.reload(true);
                });
        }
    }

    angular
        .module('app', [])
        .controller('mainController', MainController);
}