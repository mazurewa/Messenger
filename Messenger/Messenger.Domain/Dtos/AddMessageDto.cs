using System;
using System.Collections.Generic;
using System.Text;

namespace Messenger.Domain.Dtos
{
    public class AddMessageDto
    {
        public string Content { get; set; }
        public string From { get; set; }
    }
}
