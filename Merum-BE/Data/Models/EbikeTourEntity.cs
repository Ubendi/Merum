using AutoMapper;
using Merum_BE.Data.Context;
using Merum_BE.DTO;
using System.ComponentModel.DataAnnotations;

namespace Merum_BE.Data.Models
{
    public class EbikeTourEntity
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        [Required]
        public string Stops { get; set; } = null!;
        public string? PicturePath { get; set; }
        [Required]
        public double DistanceKm { get; set; }
        [Required]
        public TimeSpan Duration { get; set; }
        public string? Difficulty { get; set; }
        public double? ElevationGain { get; set; }
        public double? ElevationLoss { get; set; }
    }

    public interface IEbikeTourRepository
    {
        List<BaseEbikeTourDTO> GetAllEbikeTours();
        BaseEbikeTourDTO GetEbikeTourById(int id);
        //Task<EbikeTourDTO> AddEbikeTourAsync(EbikeTourDTO.AddEbikeTourDTO addEbikeTourDTO);
        //Task<bool> DeleteEbikeTourByIdAsync(int id);
        //Task<EbikeTourDTO> UpdateEbikeTourAsync(EbikeTourDTO.UpdateEbikeTourDTO updateEbikeTourDTO);
    }

    public class EbikeTourRepository : IEbikeTourRepository
    {
        private readonly MerumDbContext _dbContext;
        private readonly IMapper _mapper;
        public EbikeTourRepository(MerumDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public List<BaseEbikeTourDTO> GetAllEbikeTours()
        {
            var ebikeTourEntities = _dbContext.Set<EbikeTourEntity>().ToList();
            return _mapper.Map<List<EbikeTourEntity>, List<BaseEbikeTourDTO>>(ebikeTourEntities);
        }
        public BaseEbikeTourDTO GetEbikeTourById(int id)
        {
            var ebikeTourEntity = _dbContext.Set<EbikeTourEntity>().Find(id);
            if (ebikeTourEntity == null)
            {
                throw new KeyNotFoundException($"Ebike tour with ID {id} not found.");
            }
            return _mapper.Map<EbikeTourEntity, BaseEbikeTourDTO>(ebikeTourEntity);
        }
        // Implement Add, Delete, Update methods as needed
    }
}
