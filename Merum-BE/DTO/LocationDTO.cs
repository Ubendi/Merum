using Merum_BE.Data.Models;

namespace Merum_BE.DTO
{
    public class BaseLocationDTO
    {
        public required string Name { get; set; }
        public string? City { get; set; }
        public int Area { get; set; }
        public int Altitude { get; set; }
        public int Year { get; set; }
        public string? Orientation { get; set; }
        public string? Grade { get; set; }
        public ICollection<int>? GrapeVarietyEntityIds { get; set; }
        public string? CultivationMode { get; set; }
        public string? LineDistance { get; set; }
        public string? PlantationMethod { get; set; }
        public string? SoilType { get; set; }
    }
    public class LocationDTO : BaseLocationDTO
    {
        public int Id { get; set; }
    }

    public class AddLocationDTO : BaseLocationDTO { }

}
