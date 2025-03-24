using System.ComponentModel.DataAnnotations;

namespace Merum_BE.Data.Models
{
    public class GrapeVarietyEntity
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
    }
}
