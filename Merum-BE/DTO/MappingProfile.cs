using AutoMapper;
using Merum_BE.Data.Models;

namespace Merum_BE.DTO

{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<WineEntity, WineDTO>().
                ForMember(dest => dest.Location,
                opt => opt.MapFrom(src => src.LocationEntity));

            CreateMap<AddWineDTO, WineEntity>();

            CreateMap<LocationEntity, LocationDTO>();
        }
    }
}
