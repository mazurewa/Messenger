using Messenger.Domain.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Messenger.Domain.Services
{
    public interface IMessageService
    {
        Task<MessageDto> AddMessage(AddMessageDto message);
        Task<IEnumerable<MessageDto>> GetMessages();
    }
}
