using AutoMapper;
using Merum_BE.Data.Models;
using Merum_BE.DTO;

namespace Merum_BE.Data
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<WineEntity, WineDTO>().
                ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.LocationEntity));
            CreateMap<AddWineDTO, WineEntity>();
            CreateMap<UpdateWineDTO, WineEntity>();

            CreateMap<LocationEntity, LocationDTO>();

        }
    }
}
