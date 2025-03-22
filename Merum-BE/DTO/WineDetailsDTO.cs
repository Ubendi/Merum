using Merum_BE.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Merum_BE.DTO
{
    public class WineDetailsDTO
    {
        public class WineDetailsEntity
        {
            public int Id { get; set; }
            public required WineEntity WineEntity { get; set; }
            public float RelativeDensity { get; set; }
            public float TotalAlcoholPercent { get; set; }
            public float RealAlcoholPercent { get; set; }
            public float TotalExtractGpl { get; set; }
            public float TotalAcidGpl { get; set; }
            public float VolatileAcidGpl { get; set; }
            public float TotalSDioxideMgpl { get; set; }
            public float FreeSDioxideMgpl { get; set; }
            public float Ph { get; set; }

        }
    }
}
