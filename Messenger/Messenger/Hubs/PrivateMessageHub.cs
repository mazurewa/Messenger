using Messenger.Domain.Dtos;
using Messenger.Domain.Services;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Messenger.Hubs
{
    public class PrivateMessageHub : Hub<IPrivateChatActions>
    {
        private IUserManager _userManager;
        private readonly IPrivateMessageService _messageService;

        public PrivateMessageHub(IUserManager userManager, IPrivateMessageService privateMessageService)
        {
            _userManager = userManager;
            _messageService = privateMessageService;
        }

        public async Task Connect(string login)
        {
            var connectionId = Context.ConnectionId;

            var users = _userManager.GetAllUsers();
            var messages = await _messageService.GetMessages(login, users);

            await Clients.Caller.SelfConnected(messages);
            _userManager.AddUser(login, connectionId);
            await Clients.AllExcept(connectionId).NewUserConnected(login);
        }

        public async Task SendMessage(AddPrivateMessageDto message)
        {
            var connectionId = Context.ConnectionId;
            var from = _userManager.GetUserById(connectionId);
            message.From = from.Login;
            var addedMessage = await _messageService.AddMessage(message);

            var receiver = _userManager.GetUserByLogin(message.To);
            var toConnectionId = string.Empty;

            if (receiver != null)
            {
                toConnectionId = receiver.ConnectionId;
            }

            await Clients.Clients(toConnectionId, connectionId).MessageAdded(addedMessage);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;
            var login = _userManager.GetUserById(connectionId).Login;
            _userManager.RemoveUser(connectionId);
            await Clients.AllExcept(connectionId).UserDisconnected(login);
        }
    }
}
