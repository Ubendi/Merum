using AutoMapper;
using Merum_BE.Data.Context;
using Merum_BE.DTO;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Merum_BE.Data.Models
{
    public class WineEntity
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        public int Year { get; set; }
        public string? Description { get; set; }
        public int LocationEntityId { get; set; }
        [ForeignKey("LocationEntityId")]
        public required LocationEntity LocationEntity { get; set; }
        public int? GrapeVarietyEntityId { get; set; }
        [ForeignKey("GrapeVarietyEntityId")]
        public required GrapeVarietyEntity GrapeVarietyEntity { get; set; }
        public float? RelativeDens { get; set; }
        public float? TotalAlc { get; set; }
        public float? RealAlc { get; set; }
        public float? TotalExtract { get; set; }
        public float? TotalAcid { get; set; }
        public float? VolatileAcid { get; set; }
        public float? TotalSDiox { get; set; }
        public float? FreeSDiox { get; set; }
        public float? Ph { get; set; }
        public float? TotalSugar { get; set; }
        public float? SugarFreeExtract { get; set; }
        public float? TitratableAcid { get; set; }
        public string? PicturePath { get; set; }
    }

    public interface IWineRepository
    {
        List<WineDTO> GetAllWines();
        WineDTO GetWineById(int id);
        Task<WineDTO> AddWineAsync(AddWineDTO addWineDTO);
        Task<bool> DeleteWineByIdAsync(WineDTO wineDTO);
        Task<WineDTO> UpdateWineAsync(UpdateWineDTO updateWineDTO);
    }

    public class WineRepository(MerumDbContext dbContext, IMapper mapper) : IWineRepository
    {
        private readonly MerumDbContext _dbContext = dbContext;
        private readonly IMapper _mapper = mapper;

        public List<WineDTO> GetAllWines()
        {
            var wineEntities = _dbContext.Set<WineEntity>()
                .Include(w => w.LocationEntity)
                .Include(w => w.GrapeVarietyEntity)
                .ToList();
            return _mapper.Map<List<WineEntity>, List<WineDTO>>(wineEntities);
        }

        public WineDTO GetWineById(int id)
        {
            var wineEntity = _dbContext.Set<WineEntity>()
                .Include(w => w.LocationEntity)
                .Include(w => w.GrapeVarietyEntity)
                .FirstOrDefault(w => w.Id == id);
            return wineEntity == null
                ? throw new KeyNotFoundException($"Wine with ID {id} not found.")
                : _mapper.Map<WineEntity, WineDTO>(wineEntity);
        }

        public async Task<WineDTO> GetWineByIdAsync(int id)
        {
            var wineEntity = await _dbContext.Set<WineEntity>().Include(w => w.LocationEntityId)
                .FirstOrDefaultAsync(w => w.Id == id);
            if (wineEntity == null)
            {
                return null;
            }
            return _mapper.Map<WineEntity, WineDTO>(wineEntity); ;
        }

        public async Task<WineDTO> AddWineAsync(AddWineDTO addWineDTO)
        {
            WineEntity wineEntity = _mapper.Map<AddWineDTO, WineEntity>(addWineDTO);
            await _dbContext.AddAsync(wineEntity);
            return _mapper.Map<WineEntity, WineDTO>(wineEntity);
        }

        public async Task<bool> DeleteWineByIdAsync(WineDTO wineDTO)
        {
            var wineEntity = _dbContext.Set<WineEntity>()
                .FirstOrDefault(w => w.Id == wineDTO.Id);

            if (wineEntity != null)
            {
               _dbContext.Set<WineEntity>().Remove(wineEntity);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<WineDTO> UpdateWineAsync(UpdateWineDTO updateWineDTO)
        {
            var wineEntity = _dbContext.Set<WineEntity>()
                .Include(w => w.LocationEntity)
                .FirstOrDefault(w => w.Id == updateWineDTO.Id);
            _mapper.Map(updateWineDTO, wineEntity);

            _dbContext.Set<WineEntity>().Update(wineEntity);
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<WineEntity, WineDTO>(wineEntity);
        }

        public bool IsWinePictureInUse(string picturePath)
        {
            return _dbContext.Set<WineEntity>()
                .Any(w => w.PicturePath == picturePath);
        }

    }
}
