using Merum_BE.Data.Models;
using Merum_BE.Data.Context;
using AutoMapper;

namespace Merum_BE.Data
{
    public class UnitOfWork
    {
        private readonly MerumDbContext _dbContext;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        private WineRepository? _wineRepository;
        private LocationRepository? _locationRepository;
        private GrapeVarietyRepository? _grapeVarietyRepository;
        private EbikeTourRepository? _ebikeTourRepository;

        public UnitOfWork (MerumDbContext dbContext, ILogger<UnitOfWork> logger, IMapper mapper)
        {
            _mapper = mapper;
            _logger = logger;
            _dbContext = dbContext;
        }
        public WineRepository WineRepository
        {
            get
            {
                _wineRepository ??= new WineRepository(_dbContext, _mapper);
                return _wineRepository;
            }
        }

        public LocationRepository LocationRepository
        {
            get
            {
                _locationRepository ??= new LocationRepository(_dbContext, _mapper);
                return _locationRepository;
            }
        }

        public GrapeVarietyRepository GrapeVarietyRepository
        {
            get
            {
                _grapeVarietyRepository ??= new GrapeVarietyRepository(_dbContext, _mapper);
                return _grapeVarietyRepository;
            }
        }

        public EbikeTourRepository EbikeTourRepository
        {
            get
            {
                _ebikeTourRepository ??= new EbikeTourRepository(_dbContext, _mapper);
                return _ebikeTourRepository;
            }
        }

        public async Task CommitAsync(CancellationToken cancellationToken = default)
        {
            _logger.LogDebug("Saving changes to DB...");
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
