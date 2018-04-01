using System;
using System.Web.Mvc;

namespace WebApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        //[Route("post-file/{strBase64}")]
        //[ActionName("PostBase64")]
        //[ResponseType(typeof(string))]
        public JsonResult PostBase64(string contentType, string strBase64)
        {
            byte[] bytes = Convert.FromBase64String(strBase64);

            System.IO.File.WriteAllBytes("/files/", bytes);
            return Json(new { status = true }, JsonRequestBehavior.AllowGet);
        }
    }
}