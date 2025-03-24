namespace Merum_BE.DTO
{
    public class GrapeVarietyDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
    }

    public class AddGrapeVarietyDTO
    {
        public required string Name { get; set; }
    }
}
