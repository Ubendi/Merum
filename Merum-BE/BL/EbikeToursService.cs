using Merum_BE.Data;
using Merum_BE.DTO;

namespace Merum_BE.BL
{
    
    public class EbikeToursService (UnitOfWork unitOfWork, ILogger<EbikeToursService> logger)
    {
        private readonly UnitOfWork _unitOfWork = unitOfWork;
        private readonly ILogger<EbikeToursService> _logger = logger;

        public List<BaseEbikeTourDTO> GetAllEbikeTours()
        {
            _logger.LogInformation("Getting all e-bike tours...");
            return _unitOfWork.EbikeTourRepository.GetAllEbikeTours();
        }

        public BaseEbikeTourDTO GetEbikeTourById(int id)
        {
            _logger.LogInformation($"E-bike tour id {id}");
            return _unitOfWork.EbikeTourRepository.GetEbikeTourById(id);
        }
    }
}
