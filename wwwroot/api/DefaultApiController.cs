using System;
using System.IO;
using System.Web.Hosting;
using System.Web.Http;
using Microsoft.Owin;

namespace ASPNETStaticFileCacheCtrlAndNGInclude
{
    [RoutePrefix("api")]
    public class DefaultApiController : System.Web.Http.ApiController
    {
        internal static void UpdateViews()
        {
            var tasks = new[] {
                new { virtualPath = "~/views/date-time.html", content = DateTime.Now.ToString("G") },
                new { virtualPath = "~/views/time.html", content = DateTime.Now.ToString("T") }
            };

            foreach (var task in tasks)
            {
                var path = HostingEnvironment.MapPath(task.virtualPath);
                var dir = Path.GetDirectoryName(path);
                if (Directory.Exists(dir) == false) Directory.CreateDirectory(dir);

                File.WriteAllText(path, task.content);
            }
        }

        [HttpPost, Route("updateViews")]
        public IHttpActionResult UpdateViews(FormCollection _)
        {
            UpdateViews();
            return this.Ok();
        }
    }
}