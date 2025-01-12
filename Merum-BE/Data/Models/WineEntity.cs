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
        public float Alcohol { get; set; }
        public int LocationEntityId { get; set; }
        [ForeignKey("LocationEntityId")]
        public required LocationEntity LocationEntity { get; set; }
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
            var wineEntities = _dbContext.Set<WineEntity>().
                Include(w => w.LocationEntity).ToList();
            return _mapper.Map<List<WineEntity>, List<WineDTO>>(wineEntities);
        }

        public WineDTO GetWineById(int id)
        {
            var wineEntity = _dbContext.Set<WineEntity>()
                .Include(w => w.LocationEntity)
                .FirstOrDefault(w => w.Id == id);

            return _mapper.Map<WineEntity, WineDTO>(wineEntity);
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

    }
}
