using Merum_BE.Data;
using Merum_BE.DTO;

namespace Merum_BE.BL
{
    public class WinesService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly ILogger<WinesService> _logger;


        public WinesService (UnitOfWork unitOfWork, ILogger<WinesService> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public List<WineDTO> GetAllWinesService()
        {
            _logger.LogInformation("Getting all wines...");
            return _unitOfWork.WineRepository.GetAllWines();
        }

        public WineDTO GetWineByIdService(int id) 
        {
            return _unitOfWork.WineRepository.GetWineById(id);
        }

        public async Task<WineDTO> AddWineServiceAsync(AddWineDTO addWineDTO)
        {
            WineDTO wineDTO = await _unitOfWork.WineRepository.AddWineAsync(addWineDTO);
            _unitOfWork.Commit();
            _logger.LogInformation("Wine {0} with ID {1} added", wineDTO.Name, wineDTO.Id);
            return wineDTO;
        }

        public async Task<bool> DeleteWineByIdServiceAsync(WineDTO wineDTO)
        {
            _logger.LogInformation($"Deleting {wineDTO.Name}, {wineDTO.Year}...");
            return await _unitOfWork.WineRepository.DeleteWineByIdAsync(wineDTO);
        }

        public async Task<WineDTO> UpdateWineServiceAsync(UpdateWineDTO updateWineDTO)
        {
            WineDTO cur = GetWineByIdService(updateWineDTO.Id);
            _logger.LogInformation($"Updating wine (id: {updateWineDTO.Id})");
            return await _unitOfWork.WineRepository.UpdateWineAsync(updateWineDTO);
        }

    }
}
