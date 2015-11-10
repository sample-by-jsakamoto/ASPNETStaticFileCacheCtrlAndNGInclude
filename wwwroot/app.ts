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
        .config(($httpProvider: ng.IHttpProvider) => {
            // Anti IE cache
            if (!$httpProvider.defaults.headers.get)
                $httpProvider.defaults.headers.get = <() => string>{};
            $httpProvider.defaults.headers.get['If-Modified-Since'] = (new Date(0)).toUTCString();
        })
        .controller('mainController', MainController);
}