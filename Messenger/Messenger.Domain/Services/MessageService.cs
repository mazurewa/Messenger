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
    public class MessageService : IMessageService
    {
        private readonly MessengerContext _context;
        private readonly IMapper _mapper;

        public MessageService(MessengerContext context)
        {
            _context = context;
        }

        public async Task<MessageDto> AddMessage(AddMessageDto message)
        {
            var messageToAdd = _mapper.Map<Message>(message);
            _context.Messages.Add(messageToAdd);
            await _context.SaveChangesAsync();
            var result = _mapper.Map<MessageDto>(messageToAdd);
            return result;
        }

        public async Task<IEnumerable<MessageDto>> GetMessages()
        {
            var messages = await _context.Messages
                .OrderBy(x => x.DateCreated)
                .ToListAsync();

            var result = _mapper.Map<List<MessageDto>>(messages);
            return result;
        }
    }
}
