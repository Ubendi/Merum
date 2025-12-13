using Merum_BE.Data.Models;

namespace Merum_BE.DTO
{
    public class BaseLocationDTO
    {
        public int Id { get; set; }
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
    public class UpdateLocationDTO : BaseLocationDTO
    {
    }

    public class AddLocationDTO : BaseLocationDTO { }

}
