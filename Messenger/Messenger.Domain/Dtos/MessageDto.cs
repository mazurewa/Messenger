using System;
using System.Collections.Generic;
using System.Text;

namespace Messenger.Domain.Dtos
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string From { get; set; }
    }
}
