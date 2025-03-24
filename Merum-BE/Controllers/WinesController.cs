using Merum_BE.BL;
using Merum_BE.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Merum_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WinesController : ControllerBase
    {
        private readonly ILogger<WinesController> _logger;
        private readonly WinesService _winesService;

        public WinesController(ILogger<WinesController> logger, WinesService winesService)
        {
            _logger = logger;
            _winesService = winesService;
        }

        //GET
        [HttpGet("getAllWines")]
        public List<WineDTO> GetAllWines()
        {
            return _winesService.GetAllWinesService();
        }

        [HttpGet("getWineById/{id}")]
        public WineDTO GetWineById(int id)
        {
            return _winesService.GetWineByIdService(id);
        }

        //POST
        [HttpPost("addWine")]
        public async Task<WineDTO> AddWineAsync(AddWineDTO addWineDTO)
        {
            return await _winesService.AddWineServiceAsync(addWineDTO);
        }

        //PUT
        [HttpPut("updateWineById/{id}")]
        public async Task<WineDTO> UpdateWineAsync(UpdateWineDTO updateWineDTO)
        {
            return await _winesService.UpdateWineServiceAsync(updateWineDTO);
        } 

        //DELETE
        [HttpDelete("deleteWineById/{id}")]
        public async Task<bool> DeleteWineById(int id)
        {
            return await _winesService.DeleteWineByIdServiceAsync(GetWineById(id));
        }
    }
}
