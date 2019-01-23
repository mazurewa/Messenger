using System;
using System.Collections.Generic;
using System.Text;

namespace Messenger.Domain.Dtos
{
    public class PrivateConversationDto
    {
        public string To { get; set; }
        public List<PrivateMessageDto> Messages { get; set; }
        public bool IsActive { get; set; }
    }
}
