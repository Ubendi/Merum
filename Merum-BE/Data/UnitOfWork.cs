using Merum_BE.Data.Models;
using Merum_BE.Data.Context;
using AutoMapper;

namespace Merum_BE.Data
{
    public class UnitOfWork : IDisposable
    {
        private readonly MerumDbContext _dbContext;
        private readonly ILogger _logger;
        private readonly IMapper? _mapper;

        private WineRepository? _wineRepository;
        private LocationRepository? _locationRepository;
        private GrapeVarietyRepository? _grapeVarietyRepository;

        #region Constructor
        //public UnitOfWork (MerumDbContext dbContext, ILogger<UnitOfWork> logger)
        //{
        //    _dbContext = dbContext;
        //    _logger = logger;
        //}

        public UnitOfWork (MerumDbContext dbContext, ILogger<UnitOfWork> logger, IMapper mapper)
        {
            _mapper = mapper;
            _logger = logger;
            _dbContext = dbContext;
        }
        #endregion

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

        public void Commit()
        {
            _logger.LogDebug("Saving changes to DB...");
            _dbContext.SaveChanges();
        }

        public void Dispose() 
        { 
            _dbContext.Dispose();
        }
    }
}
