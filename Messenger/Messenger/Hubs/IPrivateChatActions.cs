using Messenger.Domain.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Messenger.Hubs
{
    public interface IPrivateChatActions
    {
        Task SelfConnected(List<PrivateConversationDto> messages);
        Task NewUserConnected(string login);
        Task UserDisconnected(string login);
        Task MessageAdded(PrivateMessageDto message);
    }
}
