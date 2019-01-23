using System.Collections.Generic;
using System.Threading.Tasks;
using Messenger.Domain.Dtos;

namespace Messenger.Domain.Services
{
    public interface IPrivateMessageService
    {
        Task<List<PrivateConversationDto>> GetMessages(string to, List<LoggedUser> loggedUsers);
        Task<PrivateMessageDto> AddMessage(AddPrivateMessageDto message);

    }
}

//nie uzywamy onconnectedasync bo nie mzoemy przekazac loginu, musielismy sami napisac Connect

    // struktury wiadomosci latwe dla frontendu