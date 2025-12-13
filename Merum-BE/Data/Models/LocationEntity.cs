using AutoMapper;
using Merum_BE.Data.Context;
using Merum_BE.DTO;
using Microsoft.Build.ObjectModelRemoting;
using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;

namespace Merum_BE.Data.Models
{
    public class LocationEntity
    {
        public int Id { get; set; }
        [Required]
        public required string Title { get; set; }
        public required string Name { get; set; }
        public string? City { get; set; }
        public int Area { get; set; }
        public string? Altitude { get; set; }
        public string? Year { get; set; }
        public string? Orientation { get; set; }
        public string? Grade { get; set; }
        public ICollection<int>? GrapeVarietyEntityIds { get; set; }
        public string? CultivationMode { get; set; }
        public string? LineDistance { get; set; }
        public string? PlantationMethod { get; set; }
        public string? SoilType { get; set; }
        public string? Latitude { get; set; }
        public string? Longitude { get; set; }
    }

    public interface ILocationRepository
    {
        List<BaseLocationDTO> GetAllLocations();

        BaseLocationDTO GetLocationById(int id);
    }

    public class LocationRepository(MerumDbContext dbContext, IMapper mapper) : ILocationRepository
    {
        private readonly MerumDbContext _dbContext = dbContext;
        private readonly IMapper _mapper = mapper;
        public List<BaseLocationDTO> GetAllLocations()
        {
            var locationEntities = _dbContext.Set<LocationEntity>().ToList();
            return _mapper.Map<List<LocationEntity>, List<BaseLocationDTO>>(locationEntities);
        }

        public BaseLocationDTO GetLocationById(int id)
        {
            var location = _dbContext.Set<LocationEntity>()
                .FirstOrDefault(l => l.Id == id);
            return location == null 
                ? throw new KeyNotFoundException($"Location with ID {id} not found.")
                : _mapper.Map<LocationEntity,BaseLocationDTO>(location);
        }
    }
}
