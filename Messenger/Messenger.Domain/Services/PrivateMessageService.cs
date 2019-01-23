using AutoMapper;
using Messenger.Domain.Dtos;
using Messenger.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Messenger.Domain.Services
{
    public class PrivateMessageService : IPrivateMessageService
    {
        private readonly MessengerContext _context;
        private readonly IMapper _mapper;

        public PrivateMessageService(MessengerContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<PrivateConversationDto>> GetMessages(string to, List<LoggedUser> loggedUsers)
        {
            var messages = await _context.PrivateMessages
                .Where(m => m.To == to || m.From == to)
                .OrderBy(m => m.DateCreated)
                .ToListAsync();

            var allParticipants = GetAllParticipants(to, messages);

            var messagesDto = _mapper.Map<List<PrivateMessageDto>>(messages);

            var usersFromConversations = allParticipants.Select(participant =>
            {
                return new PrivateConversationDto
                {
                    To = participant,
                    Messages = messagesDto.Where(x => x.From == participant || x.To == participant).ToList(),
                    IsActive = loggedUsers.Any(x => x.Login == participant)
                };
            }).ToList();

            var newUsers = loggedUsers.Where(x => !allParticipants.Contains(x.Login));

            var newActiveUserPrivateConversationDto = newUsers.Select(user =>
            {
                return new PrivateConversationDto
                {
                    To = user.Login,
                    Messages = new List<PrivateMessageDto>(),
                    IsActive = true
                };
            }).ToList();

            var result = messagesDto
                .GroupBy(m => m.From)
                .ToDictionary(grp => grp.Key, grp => grp.ToList());

            usersFromConversations.AddRange(newActiveUserPrivateConversationDto);

            return usersFromConversations;
        }

        public async Task<PrivateMessageDto> AddMessage(AddPrivateMessageDto message)
        {
            var messageToAdd = _mapper.Map<PrivateMessage>(message);
            _context.PrivateMessages.Add(messageToAdd);
            await _context.SaveChangesAsync();
            var result = _mapper.Map<PrivateMessageDto>(messageToAdd);
            return result;
        }

        private List<string> GetAllParticipants(string userName, List<PrivateMessage> messages)
        {
            var allSenders = messages.Select(x => x.From).Distinct();
            var allReceivers = messages.Select(x => x.To).Distinct();

            var allParticipants = allSenders.Union(allReceivers).Where(x => x != userName).ToList();

            return allParticipants;
        }
    }
}
