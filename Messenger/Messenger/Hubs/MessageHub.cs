using Messenger.Domain.Dtos;
using Messenger.Domain.Services;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Messenger.Hubs
{
    public class MessageHub : Hub<IChatActions>
    {
        private readonly IMessageService _messageService;

        public MessageHub(IMessageService messageService)
        {
            _messageService = messageService;
        }

        public override async Task OnConnectedAsync()
        {
            var messages = await _messageService.GetMessages();
            await Clients.Caller.Connected(messages);
        }

        public async Task SendMessage(AddMessageDto message)
        {
            var addedMessage = await _messageService.AddMessage(message);
            await Clients.All.MessageAdded(addedMessage);
        }
    }
}
