using Merum_BE.BL;
using Microsoft.AspNetCore.Mvc;

namespace Merum_BE.Controllers
{
    [Route("api")]
    [ApiController]
    public class GenericController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly FileService _uploadService;

        public GenericController(ILogger<GenericController> logger, FileService uploadService)
        {
            _logger = logger;
            _uploadService = uploadService;
        }

        [HttpPost("upload")]
        public async Task<ActionResult> UploadFile (IFormFile file, [FromForm] string folder, [FromForm] string subFolder, [FromForm] string? desiredName)
        {
            var relativePath = await _uploadService.UploadFileAsync(file, folder, subFolder, desiredName);
            return Ok(new { path = relativePath });
        }


     
    }
}
