using System;
using System.Collections.Generic;
using System.Text;

namespace Messenger.Domain.Services
{
    public class LoggedUser
    {
        public LoggedUser(string login, string connectionId)
        {
            Login = login;
            ConnectionId = connectionId;
        }

        public string Login { get; set; }
        public string ConnectionId { get; set; }
    }
}
