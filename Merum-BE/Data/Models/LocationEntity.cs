using AutoMapper;
using Merum_BE.Data.Context;
using Merum_BE.DTO;
using System.ComponentModel.DataAnnotations;

namespace Merum_BE.Data.Models
{
    public class LocationEntity
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        public string? City { get; set; }
        public int Area { get; set; }
        public string? Desc { get; set; }
    }

    public interface ILocationRepository
    {
        List<LocationDTO> GetAllLocations();
    }

    public class LocationRepository(MerumDbContext dbContext, IMapper mapper) : ILocationRepository
    {
        private readonly MerumDbContext _dbContext = dbContext;
        private readonly IMapper _mapper = mapper;
        public List<LocationDTO> GetAllLocations()
        {
            var locationEntities = _dbContext.Set<LocationEntity>().ToList();
            return _mapper.Map<List<LocationEntity>, List<LocationDTO>>(locationEntities);
        }
    }
}
