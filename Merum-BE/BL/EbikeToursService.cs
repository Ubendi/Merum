using Merum_BE.Data;

namespace Merum_BE.BL
{
    
    public class EbikeToursService (UnitOfWork unitOfWork, ILogger<EbikeToursService> logger)
    {
        private readonly UnitOfWork _unitOfWork = unitOfWork;
        private readonly ILogger<EbikeToursService> _logger = logger;
    }
}
