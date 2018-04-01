using System.Web.Http;
using System.Web.Http.Description;

namespace WebApp.Controllers
{
    [RoutePrefix("api/file")]
    public class FileController : ApiController
    {
        [HttpPost]
        [Route("post-file/{strBase64}")]
        [ActionName("PostBase64")]
        [ResponseType(typeof(string))]
        public IHttpActionResult PostBase64(string strBase64)
        {
            //File.WriteAllBytes(path, Convert.FromBase64String(document.DocumentContent.Split((",").ToCharArray())[1]));

            string b64 = Request.Content.ReadAsStringAsync().Result;
            return Ok();
        }
    }
}
