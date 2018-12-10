using System;
using System.Collections.Generic;
using System.Text;

namespace Messenger.Domain.Models
{
    public class Message : BaseEntity
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string From { get; set; }
    }
}
