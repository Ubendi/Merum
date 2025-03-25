using Merum_BE.BL;
using Merum_BE.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Merum_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrapeVarietiesController(ILogger<GrapeVarietiesController> logger, GrapeVarietiesService grapeVarietyService) : Controller
    {
        private readonly ILogger<GrapeVarietiesController> _logger = logger;
        private readonly GrapeVarietiesService _grapeVarietyService = grapeVarietyService;

        //GET
        [HttpGet("getAllGrapeVarieties")]
        public List<GrapeVarietyDTO> GetAllGrapeVarieties() 
        {
            return _grapeVarietyService.GetAllGrapeVariety();
        }

        [HttpGet("getGrapeVarietyById/{id}")]
        public GrapeVarietyDTO GetGrapeVarietyById(int id)
        { 
            return _grapeVarietyService.GetGrapeVarietyById(id);        
        }
    }
}
