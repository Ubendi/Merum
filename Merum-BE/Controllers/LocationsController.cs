using Merum_BE.BL;
using Merum_BE.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Merum_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly ILogger<LocationsController> _logger;
        private readonly LocationsService _locationService;

        public LocationsController(ILogger<LocationsController> logger, LocationsService locationService)
        {
            _logger = logger;
            _locationService = locationService;
        }

        //GET
        [HttpGet("getAllLocations")]
        public List<LocationDTO> GetAllLocations() 
        {
            _logger.LogInformation("GetAllLocations called...");
            return _locationService.GetAllLocationsService();
        }

        [HttpGet("getLocationById/{id}")]
        public LocationDTO GetLocation(int id)
        {
            return _locationService.GetLocationById(id);
        }
    }
}
