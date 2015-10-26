# Sample: ASP.NET/IIS - Static File Cache Control and AngularJS "ng-include" / 静的ファイルのキャッシュ制御と AngularJS の "ng-include"


## master branch - reproduction of problem / 問題の再現

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/?repository=https://github.com/sample-by-jsakamoto/ASPNETStaticFileCacheCtrlAndNGInclude)

On IE11 or Edge Web browser, If you reload the this Web site contents after click "Update 'date-time.html' and 'time.html'." button, you can see **'time.html' is still old content.**

I think, this problem caused by implementations of IE/Edge Web browser the case of no `cache-control` header in response.

IE11 または Edge Web ブラウザで、このリポジトリの Web サイトの「Update 'date-time.html' and 'time.html'.」ボタンをクリックしたのちにリロードすると、**'time.html' が更新されません。**

この問題は、`cache-control` ヘッダが無い場合の IE/Edge の実装によって発生するものと思われます。

## resolve-by-configure-iis-settings branch

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/?repository=https://github.com/sample-by-jsakamoto/ASPNETStaticFileCacheCtrlAndNGInclude/tree/resolve-by-configure-iis-settings)

This problem can resolve by [configure web.config to set `cacheControlMode` attrbite in `clientCache` node to `DisableCache`](https://github.com/sample-by-jsakamoto/ASPNETStaticFileCacheCtrlAndNGInclude/commit/6e0c02b454c325c1b656aae82d3d04a2fd4caaaa).

After this configuration, IE/Edge send request with `If-Modified-Since` header and receive HTTP 200 OK or 304 Not Modified expectancy.

この問題は、[Web.config 中の `clientCache` ノードにおける `cacheControlMode` 属性を `DisableCache` に設定する](https://github.com/sample-by-jsakamoto/ASPNETStaticFileCacheCtrlAndNGInclude/commit/6e0c02b454c325c1b656aae82d3d04a2fd4caaaa)ことで解決できます。

この設定変更後は、IE/Edge は期待どおり `If-Modified-Since` ヘッダ付きで要求を送信するようになり、そして HTTP 200 OK または 304 Not Modified を受け取るようになります。

## problem-2-when-enable-staticfilehandler branch

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/?repository=https://github.com/sample-by-jsakamoto/ASPNETStaticFileCacheCtrlAndNGInclude/tree/problem-2-when-enable-staticfilehandler)

If you configure web.config to handle requets for .html files by System.Web.StaticFileHandler for enabling "Browser Link" feature on Visual Studio, then you will reencounter the problem that `time.html` in browser keep old content.

Visual Studio の Browser Link 機能を有効化するために、.html ファイルへの要求を System.Web.StaticFileHandler で処理するよう web.config を構成すると、`time.html` の内容が古いまま更新されない問題が再び発生します。

## resolve-by-using-runallmodule-instead-staticfilehandler branch

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/?repository=https://github.com/sample-by-jsakamoto/ASPNETStaticFileCacheCtrlAndNGInclude/tree/resolve-by-using-runallmodule-instead-staticfilehandler)

This problem can resolve by configure web.config to enable `runAllManagedModulesForAllRequests` settings, and remove handlers setting of System.Web.StaticFileHandler for .html files.

この問題は、web.config の `runAllManagedModulesForAllRequests` 設定を有効化して、.html ファイルに対する System.Web.StaticFileHanlder を handlers 設定から削除することで解決できます。