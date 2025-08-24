using Merum_BE.Data;
using Merum_BE.DTO;

namespace Merum_BE.BL
{
    public class LocationsService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly ILogger<LocationsService> _logger;

        public LocationsService (UnitOfWork unitOfWork, ILogger<LocationsService> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public List<BaseLocationDTO> GetAllLocationsService()
        {
            _logger.LogInformation("Getting all locations...");
            return _unitOfWork.LocationRepository.GetAllLocations();
        }

        public BaseLocationDTO GetLocationById(int id) 
        {
            return _unitOfWork.LocationRepository.GetLocationById(id);
        }
    }
}
