using AutoMapper;
using Merum_BE.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Merum_BE.DTO
{
    public class WineDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int Year { get; set; }
        public float Alcohol { get; set; }
        public LocationDTO Location { get; set; }
    }
    public class AddWineDTO
    {
        [MaxLength(20, ErrorMessage = "Max hossz: 20 karakter")]
        public required string Name { get; set; }
        public int Year { get; set; }
        public float Alcohol { get; set; }
        public int LocationEntityId { get; set; }
    }

    public class UpdateWineDTO
    {
        public int Id { get; set; }
        [MaxLength(20, ErrorMessage = "Max hossz: 20 karakter")]
        public required string Name { get; set; }
        public int Year { get; set; }
        public float Alcohol { get; set; }
        public int LocationEntityId { get; set; }
    }
}
