using AutoMapper;
using Messenger.Domain.Dtos;
using Messenger.Domain.Models;

namespace Messenger.Domain.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Message, MessageDto>();
            CreateMap<AddMessageDto, Message>();
        }
    }
}
