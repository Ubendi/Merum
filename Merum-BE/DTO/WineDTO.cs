namespace Merum_BE.DTO
{
    public class BaseWineDTO
    {
        public required string Name { get; set; }
        public int Year { get; set; }
        public string? Description { get; set; }
        public float? RelativeDens { get; set; }
        public float? TotalAlc { get; set; }x
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

    public class WineDTO : BaseWineDTO
    {
        public int Id { get; set; }
        public BaseLocationDTO? Location { get; set; }
        public GrapeVarietyDTO? GrapeVariety { get; set; }
    }
    public class AddWineDTO : BaseWineDTO 
    {
        public int LocationEntityId {  get; set; }
        public int GrapeVarietyEntityId {  get; set; }
    }

    public class UpdateWineDTO : BaseWineDTO 
    {
        public int Id { get; set; }
        public int LocationEntityId { get; set; }
        public int GrapeVarietyEntityId { get; set; }
    }
}
