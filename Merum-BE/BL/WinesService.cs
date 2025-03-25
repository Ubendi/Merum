using Merum_BE.Data;
using Merum_BE.DTO;

namespace Merum_BE.BL
{
    public class WinesService(UnitOfWork unitOfWork, ILogger<WinesService> logger)
    {
        private readonly UnitOfWork _unitOfWork = unitOfWork;
        private readonly ILogger<WinesService> _logger = logger;

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
            var wine = _unitOfWork.WineRepository.GetWineByIdAsync(wineDTO.Id);
            if (wine == null)
            {
                return false;
            }
            _logger.LogInformation($"Deleting {wineDTO.Name}, {wineDTO.Year}...");
            bool isWineDeleted = await _unitOfWork.WineRepository.DeleteWineByIdAsync(wineDTO);
            if (wineDTO.PicturePath != null)
            {
                this.DeleteWinePicture(wineDTO.PicturePath);
            }
            return isWineDeleted;
        }

        public async Task<WineDTO> UpdateWineServiceAsync(UpdateWineDTO updateWineDTO)
        {
            WineDTO cur = GetWineByIdService(updateWineDTO.Id);
            _logger.LogInformation($"Updating wine (id: {updateWineDTO.Id})");
            return await _unitOfWork.WineRepository.UpdateWineAsync(updateWineDTO);
        }

        public bool DeleteWinePicture(string picturePath) 
        {
            var rootPath = Path.Combine(Directory.GetCurrentDirectory(), "Pics", "Wines");
            var fileName = Path.GetFileName(picturePath);
            if (_unitOfWork.WineRepository.IsWinePictureInUse(picturePath))
            {
                _logger.LogInformation($"{fileName} is in use by another wine");
                return false;
            }
            var fullPath = Path.Combine(rootPath, fileName);
            File.Delete(fullPath);
            _logger.LogInformation($"{fileName} is deleted");
            return true;
        }
    }
}
