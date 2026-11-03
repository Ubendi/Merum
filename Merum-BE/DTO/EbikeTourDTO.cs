namespace Merum_BE.DTO
{
    public class BaseEbikeTourDTO
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
        public required string Stops { get; set; }
        public string? PicturePath { get; set; }
        public required double DistanceKm { get; set; }
        public required TimeSpan Duration { get; set; }
        public string? Difficulty { get; set; }
        public double? ElevationGain { get; set; }
        public double? ElevationLoss { get; set; }
    }

    public class AddEbikeTourDTO : BaseEbikeTourDTO { }

    public class UpdateEbikeTourDTO : BaseEbikeTourDTO
    {
        public int Id { get; set; }
    }
}
