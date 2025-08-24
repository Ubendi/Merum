using Microsoft.AspNetCore.Mvc;

namespace Merum_BE.Controllers
{
    public class EbikeTourController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
