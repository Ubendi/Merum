using Merum_BE.BL;
using Merum_BE.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Merum_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EbikeToursController(ILogger<EbikeToursController> logger, EbikeToursService ebikeToursService) : Controller
    {
        private readonly ILogger<EbikeToursController> _logger = logger;
        private readonly EbikeToursService _ebikeToursService = ebikeToursService;

        //GET
        [HttpGet("getAllEbikeTours")]
        public List<BaseEbikeTourDTO> GetAllEbikeTours()
        {
            return _ebikeToursService.GetAllEbikeTours();
        }

        [HttpGet("getEbikeTourById/{id}")]
        public BaseEbikeTourDTO GetEbikeTourById(int id)
        {
            return _ebikeToursService.GetEbikeTourById(id);
        }
    }
}
