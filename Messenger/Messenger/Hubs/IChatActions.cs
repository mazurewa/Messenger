using Messenger.Domain.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Messenger.Hubs
{
    public interface IChatActions
    {
        Task Connected(IEnumerable<MessageDto> messages);
        Task MessageAdded(MessageDto message);
    }
}
