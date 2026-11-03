using Merum_BE.BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Merum_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuesthouseController (ILogger<GuesthouseController> logger, GuesthouseService guesthouseService ) : ControllerBase
    {
        private readonly ILogger<GuesthouseController> _logger = logger;
        private readonly GuesthouseService _guesthouseService = guesthouseService;
        //GET
        [HttpGet("getAllGuesthouseImages")]
        public List<string?> GetGuesthouseImages()
        {
            System.Diagnostics.Debug.WriteLine("GetAllImages called");
            return _guesthouseService.GetGuesthouseImagesService();
        }
    }
}
