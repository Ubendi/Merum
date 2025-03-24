using AutoMapper;
using Merum_BE.Data.Context;
using Merum_BE.DTO;
using System.ComponentModel.DataAnnotations;

namespace Merum_BE.Data.Models
{
    public class GrapeVarietyEntity
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
    }

    public interface IGrapeVarietyRepository
    {
        List<GrapeVarietyDTO> GetAllGrapeVarieties();
        List<GrapeVarietyDTO> GetGrapeVarietiesByIdList(int[] ids);
        GrapeVarietyDTO GetGrapeVarietyById(int id);
    }

    public class GrapeVarietyRepository(MerumDbContext dbContext, IMapper mapper) : IGrapeVarietyRepository
    {
        private readonly MerumDbContext _dbContext = dbContext;
        private readonly IMapper _mapper = mapper;

        public List<GrapeVarietyDTO> GetAllGrapeVarieties() 
        { 
            var grapeVarietyEntities = _dbContext.Set<GrapeVarietyEntity>().ToList();
            return _mapper.Map<List<GrapeVarietyEntity>, List<GrapeVarietyDTO>>(grapeVarietyEntities);
        }

        public GrapeVarietyDTO GetGrapeVarietyById(int id)
        {
            var grapeVarietyEntity = _dbContext.Set<GrapeVarietyEntity>()
                .FirstOrDefault(gv => gv.Id == id);
            return grapeVarietyEntity == null
                ? throw new KeyNotFoundException($"GrapeVariety with ID {id} not found.")
                : _mapper.Map<GrapeVarietyEntity, GrapeVarietyDTO>(grapeVarietyEntity);
        }
        public List<GrapeVarietyDTO> GetGrapeVarietiesByIdList(int[] ids)
        {
            List<GrapeVarietyDTO> grapeVarietyDTOs = new List<GrapeVarietyDTO>();
            foreach (int id in ids) 
            { 
                var grapeVarietyDTO = this.GetGrapeVarietyById(id);
                grapeVarietyDTOs.Add(grapeVarietyDTO);
            }
            return grapeVarietyDTOs;
        }
    }
}
