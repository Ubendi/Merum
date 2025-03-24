using Merum_BE.Data;
using Merum_BE.DTO;

namespace Merum_BE.BL
{
    public class GrapeVarietiesService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly ILogger<GrapeVarietiesService> _logger;
        public GrapeVarietiesService(UnitOfWork unitOfWork, ILogger<GrapeVarietiesService> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public List<GrapeVarietyDTO> GetAllGrapeVariety()
        {
            _logger.LogInformation("Getting all grape varieties...");
            return _unitOfWork.GrapeVarietyRepository.GetAllGrapeVarieties();
        }

        public GrapeVarietyDTO GetGrapeVarietyById(int id)
        {
            _logger.LogInformation($"GrapeVariety id {id}");
            return _unitOfWork.GrapeVarietyRepository.GetGrapeVarietyById(id);
        }

        public List<GrapeVarietyDTO> GetGrapeVarietiesByIds(int[] ids)
        {
            _logger.LogInformation("Getting grape varieties...");
            return _unitOfWork.GrapeVarietyRepository.GetGrapeVarietiesByIdList(ids);
        }
    }
}
