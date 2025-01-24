using Microsoft.AspNetCore.Mvc;

namespace Merum_BE.Controllers
{
    [Route("api")]
    [ApiController]
    public class GenericController : ControllerBase
    {
        private readonly ILogger _logger;

        public GenericController(ILogger<GenericController> logger)
        {
            _logger = logger;
        }

        [HttpPost("upload")]
        public async Task<ActionResult> Upload (IFormFile file, [FromForm] string folder, [FromForm] string subFolder)
        {
            if (file == null || file.Length == 0) { return BadRequest("No file"); }

            var rootDir = Directory.GetCurrentDirectory();
            var uploadPath = Path.Combine(rootDir,folder,subFolder,file.FileName);

            if (!Directory.Exists(Path.Combine(rootDir, folder, subFolder))) 
            { Directory.CreateDirectory(Path.Combine(rootDir, folder, subFolder)); }

            using (FileStream stream = new FileStream(uploadPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { path = uploadPath });
        }
     
    }
}
