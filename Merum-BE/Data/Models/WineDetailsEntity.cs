using AutoMapper;
using Merum_BE.Data.Context;
using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Merum_BE.Data.Models
{
    public class WineDetailsEntity
    {
        public int Id { get; set; }
        [Required]
        public int WineId {  get; set; }
        public float? RelativeDensity { get; set; }
        public float? TotalAlcoholPercent {  get; set; }
        public float? RealAlcoholPercent { get; set; }
        public float? TotalExtractGpl {  get; set; }
        public float? TotalAcidGpl {  get; set; }
        public float? VolatileAcidGpl { get; set; }
        public float? TotalSDioxideMgpl { get; set; }
        public float? FreeSDioxideMgpl { get; set; }
        public float? Ph {  get; set; }

    }

    public interface IWineDetailsRepository
    {

    }

    public class WineDetailsRepository(MerumDbContext dbContext, IMapper mapper) : IWineDetailsRepository
    {
        private readonly MerumDbContext _dbContext = dbContext;
        private readonly IMapper _mapper = mapper;



    }
}
