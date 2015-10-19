using System;
using System.Web.Http;

namespace ASPNETStaticFileCacheCtrlAndNGInclude
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            GlobalConfiguration.Configure(ConfigureWebApi);

            DefaultApiController.UpdateViews();
        }

        public static void ConfigureWebApi(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
        }
    }
}