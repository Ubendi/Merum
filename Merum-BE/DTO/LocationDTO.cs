namespace Merum_BE.DTO
{
    public class LocationDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? City { get; set; }
        public int Area { get; set; }
        public string? Desc { get; set; }
    }

}
