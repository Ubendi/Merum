using Merum_BE.Data;

namespace Merum_BE.BL
{
    public class GenericService (UnitOfWork unitOfWork, ILogger logger)
    {
        private readonly UnitOfWork _unitOfWork = unitOfWork;
        private readonly ILogger _logger = logger;

    }
}
